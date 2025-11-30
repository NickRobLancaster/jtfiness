// server/models/User.js

import mongoose from "mongoose";

const KitRequestSchema = new mongoose.Schema(
  {
    how_can_we_assist: {
      type: String,
    },
    organization_type: {
      type: String,
    },
    role: {
      type: String,
    },
    organization_name: {
      type: String,
    },
    organization_street_address: {
      type: String,
    },
    organization_address_2: {
      type: String,
    },
    organization_city: {
      type: String,
    },
    organization_state: {
      type: String,
    },
    organization_zip: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    opt_in: {
      type: Boolean,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: false,
  }
);

export default mongoose.models.KitRequests ||
  mongoose.model("Kit_Requests", KitRequestSchema);
