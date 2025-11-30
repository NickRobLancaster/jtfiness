// server/models/RateCounter.js
import mongoose from "mongoose";

const RateCounterSchema = new mongoose.Schema(
  {
    ip_address: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true }, // use "*" for global
    method: {
      type: String,
      required: true,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      index: true,
    },

    // fixed window bookkeeping
    window_start: { type: Date, required: true }, // start time of the window
    hit_count: { type: Number, default: 0 }, // requests seen in the window

    // helpful metadata
    first_hit_at: { type: Date, default: Date.now },
    last_hit_at: { type: Date, default: Date.now },

    // TTL cleanup (expire whole document at this time)
    expires_at: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  }
);

// Unique per logical window (atomic $inc upsert target)
RateCounterSchema.index(
  { ip_address: 1, path: 1, method: 1, window_start: 1 },
  { unique: true, name: "ip_path_method_window_unique" }
);

// TTL: remove counters after the window (plus a buffer you set in code)
RateCounterSchema.index(
  { expires_at: 1 },
  { expireAfterSeconds: 0, name: "expires_at_ttl" }
);

export default mongoose.models.RateCounters ||
  mongoose.model("Rate_Counters", RateCounterSchema);
