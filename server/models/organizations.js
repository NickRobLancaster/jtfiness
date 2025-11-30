// server/models/Organization.js

import mongoose from "mongoose";

import bcrypt from "bcrypt";

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    type: {
      type: String,
      //   enum: [
      //     "Harm Reduction",
      //     "Public Health",
      //     "Mutual Aid",
      //     "Community Org/Non-profit",
      //     "Drug User Union",
      //     "Tribal",
      //   ],
    },
    populations_served: {
      type: Array,
      //   enum: [
      //     "Unhoused People",
      //     "LGBTQIA+",
      //     "Party and Play",
      //     "Sex Workers",
      //     "Recently Released from Incarceration",
      //     "Recently Released from Treatment",
      //     "Youth (24 years and younger)",
      //     "People in Recovery",
      //   ],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    // strict: false,
  }
);

OrganizationSchema.pre("save", async function (next) {
  //   if (this.isModified("api_username") || this.isModified("api_key")) {
  //     const salt = await bcrypt.genSalt(10);
  //     const secret = `${this.api_username}${this.api_key}`;
  //     this.encrypted_password = await bcrypt.hash(secret, salt);
  //   }
  next();
});

OrganizationSchema.pre("findOneAndUpdate", async function (next) {
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

  next();
});

// Ensure virtuals are included when documents are converted
// OrganizationSchema.set("toJSON", { virtuals: true });
// OrganizationSchema.set("toObject", { virtuals: true });

export default mongoose.models.Organization ||
  mongoose.model("Organization", OrganizationSchema);
