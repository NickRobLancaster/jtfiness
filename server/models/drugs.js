// server/models/User.js

import mongoose from "mongoose";

import bcrypt from "bcrypt";

const DrugSchema = new mongoose.Schema(
  {
    drug: {
      type: String,
      required: true,
      unique: true,
    },

    categories_of_drug: {
      type: Array,
      required: true,
    },

    drug_information: {
      type: String,
      required: true,
    },

    alternative_names: {
      type: Array,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: false,
  }
);

DrugSchema.pre("save", async function (next) {
  // example usage of pre-save hook
  // if (this.isModified("api_username") || this.isModified("api_key")) {
  //   const salt = await bcrypt.genSalt(10);
  //   const secret = `${this.api_username}${this.api_key}`;
  //   this.encrypted_password = await bcrypt.hash(secret, salt);
  // }
  next();
});

DrugSchema.pre("findOneAndUpdate", async function (next) {
  // example usage of pre-findOneAndUpdate hook
  // try {
  //   const originalDoc = await this.model.findOne(this.getQuery());

  //   if (originalDoc) {
  //     const update = this.getUpdate();
  //     if (update.api_username || update.api_key) {
  //       const salt = await bcrypt.genSalt(10);
  //       const secret = `${update.api_username || originalDoc.api_username}${
  //         update.api_key || originalDoc.api_key
  //       }`;
  //       update.encrypted_password = await bcrypt.hash(secret, salt);
  //     }
  //   }
  // } catch (error) {
  //   return next(error);
  // }

  next();
});

// Ensure virtuals are included when documents are converted
// DrugSchema.set("toJSON", { virtuals: true });
// DrugSchema.set("toObject", { virtuals: true });

export default mongoose.models.Drugs || mongoose.model("Drugs", DrugSchema);
