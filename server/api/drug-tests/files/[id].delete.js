import DrugTests from "../../../models/drug-tests";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params; // ID of the main DrugTests doc
    const { key, upload_id } = await readBody(event); // Key and the subdoc _id to remove

    // 1) Delete the file from S3 (if needed)
    const s3Deleted = await delete_from_s3(key);
    if (!s3Deleted) {
      return { status: "error", message: "Failed to delete file from S3" };
    }

    // 2) Pull the matching subdocument from `results_data.raw_gcms_data`
    //    The first object is our "find" criteria: { _id: id }
    //    The second is the update operation: { $pull: { ... } }
    const updatedDrugTest = await DrugTests.findOneAndUpdate(
      { _id: id }, // find the main doc
      {
        $pull: {
          "results_data.raw_gcms_data": {
            _id: upload_id, // Mongoose will cast this to ObjectId automatically
          },
        },
      },
      { new: true }
    ).select("results_data.raw_gcms_data");

    console.log("Updated Drug Test:", updatedDrugTest);

    // 3) Return status
    return {
      status: "success",
      message: "File deleted and subdocument removed",
      updated_files_list: updatedDrugTest.results_data.raw_gcms_data,
    };
  } catch (error) {
    console.error("Error deleting file or subdocument:", error);
    return {
      status: "error",
      message: `Failed to delete file or subdocument: ${error.message}`,
    };
  }
});
