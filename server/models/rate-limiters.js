// server/models/RateLimiter.js
import mongoose from "mongoose";

const RateLimiterSchema = new mongoose.Schema(
  {
    // who/what was blocked
    ip_address: { type: String, required: true, index: true },
    path: { type: String, default: "*", index: true }, // per-path or "*" for global
    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      default: "GET",
      index: true,
    },

    // policy that was violated (for observability)
    window_seconds: { type: Number, required: true }, // e.g., 60
    max_requests: { type: Number, required: true }, // e.g., 60

    // request counters captured at the time of block (optional but useful)
    hit_count: { type: Number, default: 0 },
    first_hit_at: { type: Date, default: Date.now },
    last_hit_at: { type: Date, default: Date.now },

    // block window – when this time passes, MongoDB TTL deletes the doc automatically
    blocked_until: { type: Date, required: true },

    // diagnostics
    reason: { type: String, default: "rate_limit_exceeded" },
    user_agent: { type: String },
    x_forwarded_for: { type: String },
    cf_connecting_ip: { type: String },

    // optional bag for anything else you want to log
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  }
);

/**
 * TTL: Automatically delete the record once `blocked_until` is in the past.
 * `expireAfterSeconds: 0` means "expire at the time specified by the field".
 * Partial filter ensures index only applies when the field exists.
 */
RateLimiterSchema.index(
  { blocked_until: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { blocked_until: { $type: "date" } },
  }
);

// Helpful compound index for quick queries by ip+path+method
RateLimiterSchema.index({ ip_address: 1, path: 1, method: 1 });

export default mongoose.models.RateLimiters ||
  mongoose.model("Rate_Limiters", RateLimiterSchema);
