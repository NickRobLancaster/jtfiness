import mongoose from "mongoose";

const RequestLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    url: String,
    method: String,
    ip: String,
    first_name: String,
    last_name: String,
    api_username: String,
    module: String, // product endpoints - credit report, student loans, scrapers, etc.
    cost: Number, // cost of the request for billing
  },
  {
    strict: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default mongoose.models.RequestLog ||
  mongoose.model("Request_Log", RequestLogSchema);
