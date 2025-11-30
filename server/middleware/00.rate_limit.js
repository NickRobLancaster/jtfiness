// server/middleware/00.rate-limit.js
import {
  getRequestIP,
  getHeader,
  getRequestURL,
  setResponseHeader,
  setResponseStatus,
} from "h3";

import RateCounters from "../models/rate-counters";
import RateLimiters from "../models/rate-limiters";

// Candidate headers seen across providers
const IP_HEADER_CANDIDATES = [
  "x-forwarded-for",
  "x-real-ip",
  "cf-connecting-ip",
  "true-client-ip",
  "x-client-ip",
  "fastly-client-ip",
  "x-vercel-forwarded-for",
  "fly-client-ip",
  "x-azure-clientip",
  "x-appengine-user-ip",
];

function normalizeIp(val) {
  const first = String(val).split(",")[0].trim();
  const noPort = first.replace(/^\[?([^[\]]+)\]?:\d+$/, "$1").trim();
  return noPort.replace(/^::ffff:/i, "") || "unknown";
}

function getClientIp(event) {
  const h3Ip = getRequestIP(event, { xForwardedFor: true });
  if (h3Ip) return normalizeIp(h3Ip);

  for (const h of IP_HEADER_CANDIDATES) {
    const v = getHeader(event, h);
    if (v) return normalizeIp(v);
  }

  return "unknown";
}

// ----- CONFIG -----
const WINDOW_SECONDS = 60; // 1-minute window
const MAX_REQUESTS = 60; // max requests allowed per window
const BLOCK_SECONDS = 15 * 60; // block for 15 minutes
const LIMIT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const ONLY_API_PREFIX = "/api/";
const PER_PATH_LIMIT = true;

let ensured = false;
async function ensureIndexesOnce() {
  if (ensured) return;
  try {
    await RateCounters.ensureIndexes();
    await RateLimiters.ensureIndexes();
  } catch {
    // ignore race on serverless cold starts
  }
  ensured = true;
}

export default defineEventHandler(async (event) => {
  // ---- NEW: safe cross-platform method detection ----
  const method = (
    event.method ||
    event.node?.req?.method ||
    "GET"
  ).toUpperCase();
  const { pathname } = getRequestURL(event);
  if (!pathname.startsWith(ONLY_API_PREFIX)) return;
  if (!LIMIT_METHODS.includes(method)) return;

  await ensureIndexesOnce();

  const ip_address = getClientIp(event);

  // optional debug
  console.log("ip resolved", {
    ip: ip_address,
    xff: getHeader(event, "x-forwarded-for"),
    xri: getHeader(event, "x-real-ip"),
    cfi: getHeader(event, "cf-connecting-ip"),
    tci: getHeader(event, "true-client-ip"),
    vff: getHeader(event, "x-vercel-forwarded-for"),
  });

  const path = PER_PATH_LIMIT ? pathname : "*";
  const now = Date.now();

  // 1) Check active block
  const active = await RateLimiters.findOne({
    ip_address,
    ...(PER_PATH_LIMIT ? { path, method } : {}),
    blocked_until: { $gt: new Date(now) },
  })
    .select({ blocked_until: 1 })
    .lean();

  if (active) {
    const retryAfter = Math.max(
      1,
      Math.ceil((new Date(active.blocked_until).getTime() - now) / 1000)
    );
    setResponseStatus(event, 429);
    setResponseHeader(event, "Retry-After", String(retryAfter));
    setResponseHeader(event, "X-RateLimit-Limit", String(MAX_REQUESTS));
    setResponseHeader(event, "X-RateLimit-Remaining", "0");
    setResponseHeader(
      event,
      "X-RateLimit-Reset",
      String(Math.ceil(now / 1000) + retryAfter)
    );
    return {
      status: "error",
      message: "Too many requests. Please try again later.",
    };
  }

  // 2) Atomic counter
  const window_ms = WINDOW_SECONDS * 1000;
  const window_start_ms = Math.floor(now / window_ms) * window_ms;
  const window_start = new Date(window_start_ms);
  const expires_at = new Date(window_start_ms + window_ms + 5 * 60 * 1000);

  const filter = { ip_address, path, method, window_start };
  const update = {
    $setOnInsert: {
      ip_address,
      path,
      method,
      window_start,
      first_hit_at: new Date(now),
      expires_at,
    },
    $inc: { hit_count: 1 },
    $set: { last_hit_at: new Date(now) },
  };

  const doc = await RateCounters.findOneAndUpdate(filter, update, {
    upsert: true,
    new: true,
  }).lean();

  // 3) Headers for client awareness
  setResponseHeader(event, "X-RateLimit-Limit", String(MAX_REQUESTS));
  setResponseHeader(
    event,
    "X-RateLimit-Remaining",
    String(Math.max(0, MAX_REQUESTS - (doc?.hit_count || 1)))
  );
  setResponseHeader(
    event,
    "X-RateLimit-Reset",
    String(Math.ceil((window_start_ms + window_ms) / 1000))
  );

  // 4) Exceeded -> block + deny
  if ((doc?.hit_count || 1) > MAX_REQUESTS) {
    const blocked_until = new Date(now + BLOCK_SECONDS * 1000);
    try {
      await RateLimiters.create({
        ip_address,
        path,
        method,
        window_seconds: WINDOW_SECONDS,
        max_requests: MAX_REQUESTS,
        hit_count: doc.hit_count || 1,
        first_hit_at: doc.first_hit_at || new Date(window_start_ms),
        last_hit_at: new Date(now),
        blocked_until,
        reason: "rate_limit_exceeded",
        user_agent: getHeader(event, "user-agent"),
        x_forwarded_for: getHeader(event, "x-forwarded-for"),
        cf_connecting_ip: getHeader(event, "cf-connecting-ip"),
      });
    } catch (err) {
      console.error("rate_limit_persist_error:", err);
    }

    const retryAfter = Math.max(
      1,
      Math.ceil((blocked_until.getTime() - now) / 1000)
    );
    setResponseStatus(event, 429);
    setResponseHeader(event, "Retry-After", String(retryAfter));
    return {
      status: "error",
      message: "Too many requests. Please try again later.",
    };
  }

  // 5) Allow through
});
