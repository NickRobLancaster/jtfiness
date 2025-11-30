import mongoose from "mongoose";

const SessionLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.models.SessionLog ||
  mongoose.model("Session_Log", SessionLogSchema);
