// server/models/User.js

import mongoose from "mongoose";

const DrugTestsSchema = new mongoose.Schema(
  {
    // sample_id is just _id but
    sample_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    collection_date: {
      type: Date,
      default: "",
    },

    street_name: {
      type: Array,
      default: [],
      // enum: [
      //   "Dope",
      //   "White Pill",
      //   "Meth",
      //   "m30",
      //   "Unknown",
      //   "Other - Specific",
      // ],
    },
    expected_to_be: {
      type: Array,
      default: [],
      // enum: [
      //   "Herion",
      //   "Fentanyl",
      //   "Nitazene",
      //   "Cocaine",
      //   "Cocaine",
      //   "Crack (Freebase Cocaine)",
      //   "Methamphetamine",
      //   "Katamine",
      //   "Benzo",
      //   "MDMA/Ecstasy",
      //   "PCP",
      //   "PHC/Cannabis",
      //   "Other - Specific",
      // ],
    },

    color: {
      type: String, // just a typed in color
      default: "",
    },

    markings: {
      type: String, // textarea
      default: "",
    },

    appearance: {
      type: Array,
      default: [],
      // enum: [
      //   "Crystals",
      //   "Prescription Pill",
      //   "Fake Pill",
      //   "Powder(Chunky, Fluffy, Flaky, Shiny, Dull)",
      //   "Oil/Wax",
      //   "Tar",
      //   "Liquid",
      //   "Other - Specific",
      // ],
    },

    sensations: {
      type: Array, // textarea
      default: [],
      // enum: [
      //   "Normal",
      //   "Weaker",
      //   "Stronger",
      //   "Longer",
      //   "Shorter",
      //   "Fast",
      //   "Slow",
      //   "More up",
      //   "More down",
      //   "Unusual Taste",
      //   "Unusual Smell",
      //   "Weird",
      //   "Hallucinations",
      //   "Sedating",
      //   "Dizzy",
      //   "Pulsing/WaWa",
      //   "Burning",
      //   "Itchy",
      //   "Pins and Needles",
      //   "Stomach/Bathroom",
      //   "Other - Specific",
      // ],
    },

    route_of_administration: {
      type: Array,
      default: [],
      // enum: [
      //   "Oral", "Sublingual", "Smoke", "Nasal", "Rectum", "Injection"
      // ],
    },

    mass: {
      before_sample: {
        type: String,
        default: "",
      },
      after_sample: {
        type: String,
        default: "",
      },
      // difference: {
      //   type: String,
      //   default: "",
      // },
      // measured_in_mg: {
      //   type: String,
      //   default: "",
      // },
    },

    city: {
      type: String,
      default: "",
    },

    zip_code: {
      type: String,
      default: "",
    },

    neighborhood: {
      type: String,
      default: "",
    },

    collection_organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizations",
    },

    status: {
      type: String,
      default: "Waiting for Return",
      // enum: [
      //   "waiting-for-return", "processing", "complete", "abandoned"
      // ],
    },

    results_data: {
      testing_date: {
        type: Date,
        default: "",
      },
      // category: {
      //   type: String,
      //   default: "",
      //   // enum: [
      //   //   "Stimulant",
      //   //   "Depressant",
      //   //   "Opioid",
      //   //   "Psychedelic",
      //   //   "Cannabinoid",
      //   //   "Dissociative",
      //   //   "Other - Specific",
      //   // ],
      // },
      pre_screening_results: {
        strips: [
          {
            name: {
              type: String,
              default: "",
            },
            result: {
              type: Boolean,
              default: false,
            },
          },
        ],

        reagents: [
          {
            reagent_used: {
              type: String,
              default: "",
            },
            color_result: {
              type: String,
              // enum: [
              //   "Marquis",
              //   "Mecke",
              //   "Mandelin",
              //   "Simon's",
              // ],
              default: "",
            },
          },
        ],
      },

      major_identified_substances: [
        {
          major_drug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drugs", // Reference the Organizations collection
          },
          ratio: {
            type: String,
            default: "",
          },
          quantitative: {
            type: String,
            default: "",
          },
        },
      ],

      trace_identified_substances: [
        {
          trace_drug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drugs", // Reference the Organizations collection
          },
          ratio: {
            type: String,
            default: "",
          },
          quantitative: {
            type: String,
            default: "",
          },
        },
      ],

      identified_fillers: [
        {
          filler: {
            type: String,
            default: "",
          },
          ratio: {
            type: String,
            default: "",
          },
          quantitative: {
            type: String,
            default: "",
          },
        },
      ],

      //they asked me to deprecate
      // gcms_graph: {
      //   type: String,
      //   default: "",
      // },

      //lists csv files and references to them
      raw_gcms_data: [
        {
          // front facing label for the uploaded document
          name: {
            type: String,
            default: "",
          },
          // the actual file name
          file_name: {
            type: String,
            default: "",
          },
          bucket: {
            type: String,
            default: "",
          },
          type: {
            type: String,
            default: "",
            //csv's only
          },
          url: {
            type: String,
            default: "",
          },
          // success - best
          upload_status: {
            type: String,
            default: "",
          },
          key: {
            type: String,
            default: "",
          },
          size: {
            type: Number,
            default: 0,
          },
        },
      ],

      lab_comments: {
        type: String,
        default: "",
      },
    },

    batch: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

DrugTestsSchema.pre("save", async function (next) {
  // example usage of pre-save hook
  // if (this.isModified("api_username") || this.isModified("api_key")) {
  //   const salt = await bcrypt.genSalt(10);
  //   const secret = `${this.api_username}${this.api_key}`;
  //   this.encrypted_password = await bcrypt.hash(secret, salt);
  // }
  next();
});

DrugTestsSchema.pre("findOneAndUpdate", async function (next) {
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
// DrugTestsSchema.set("toJSON", { virtuals: true });
// DrugTestsSchema.set("toObject", { virtuals: true });

export default mongoose.models.DrugTests ||
  mongoose.model("Drug_Tests", DrugTestsSchema);
