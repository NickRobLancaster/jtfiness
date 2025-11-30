// server/models/Sessions.js

import mongoose from "mongoose";

const SessionsSchema = new mongoose.Schema(
  {
    jwt: {
      type: String,
    },
    payload: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    },
    active: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Create TTL index on createdAt field
SessionsSchema.index(
  { created_at: 1 },
  { expireAfterSeconds: Number(process.env.NUXT_JWT_EXPIRATION_TIME) }
);

export default mongoose.models.Sessions ||
  mongoose.model("Sessions", SessionsSchema);
