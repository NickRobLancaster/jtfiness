// server/models/User.js

import mongoose from "mongoose";

import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      // required: true,
    },
    last_name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    email_secondary: {
      type: String,
    },
    phone: {
      type: String,
      // required: true,
      unique: true,
    },
    phone_secondary: {
      type: String,
    },
    /*
    super = JTFIT - create, read, update, delete
    admin = (Dr Conley) - create, read, update
    user = - read, update
    */
    role: {
      type: String,
      enum: ["super", "admin", "user"],
      default: "user",
    },
    api_username: {
      type: String,
      unique: true,
    },
    api_key: String,

    active: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    // strict: false,
  }
);

// UserSchema.pre("save", async function (next) {
//   if (this.isModified("api_username") || this.isModified("api_key")) {
//     const salt = await bcrypt.genSalt(10);
//     const secret = `${this.api_username}${this.api_key}`;
//     this.encrypted_password = await bcrypt.hash(secret, salt);
//   }
//   next();
// });

// UserSchema.pre("findOneAndUpdate", async function (next) {
//   try {
//     const originalDoc = await this.model.findOne(this.getQuery());

//     if (originalDoc) {
//       const update = this.getUpdate();
//       if (update.api_username || update.api_key) {
//         const salt = await bcrypt.genSalt(10);
//         const secret = `${update.api_username || originalDoc.api_username}${
//           update.api_key || originalDoc.api_key
//         }`;
//         update.encrypted_password = await bcrypt.hash(secret, salt);
//       }
//     }
//   } catch (error) {
//     return next(error);
//   }

//   next();
// });

// Ensure virtuals are included when documents are converted
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
