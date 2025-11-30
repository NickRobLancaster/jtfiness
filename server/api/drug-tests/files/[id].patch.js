import { readMultipartFormData } from "h3";
import DrugTests from "../../../models/drug-tests";

export default defineEventHandler(async (event) => {
  console.log("HELLO FROM THE FILE UPLOAD ENDPOINT!!!");

  try {
    const { id } = event.context.params;

    // Read the multipart/form-data from the request
    const formData = await readMultipartFormData(event);

    if (!formData) {
      return {
        status: "error",
        message: "Missing file in form data.",
      };
    }

    console.log("Multipart form data received:", formData);

    // Extract the file from the form data
    const fileData = formData.find((part) => part.filename);

    if (!fileData) {
      return {
        status: "error",
        message: "No file found in form data.",
      };
    }

    const scrubed_key = scrub_s3_key(formData[1].name);

    const file_name_prefix =
      `drug_tests/raw_gcms_data/${id}/` +
      (formData[1].name ? scrubed_key + "_" : "");

    const upload_result = await upload_to_s3(event, file_name_prefix);

    console.log("Upload Result Route:", upload_result);

    // Find the file field (assuming the field name is "file")
    const fileField = formData.find((part) => part.name === "file");

    console.log("Uploaded S3 File Field", fileField);

    if (!fileField) {
      return {
        status: "error",
        message: "File not found in form data.",
      };
    }

    // Log the file details so we know it has been received
    console.log("Uploaded file received on server:", fileField);

    // Create an object to push into the document. Customize as needed.
    const fileObj = {
      name: formData[1].name || "Unnamed file",
      file_name: fileField.filename,
      key: upload_result.key,
      url: upload_result.url,
      type: upload_result.contentType,
      bucket: upload_result.bucket,
      // size: fileField.size,
    };

    console.log("File OBJ CREATED:", fileObj);

    // Update the DrugTest document by pushing the file object into the raw_gcms_data array
    const updatedDrugTest = await DrugTests.findByIdAndUpdate(
      id,
      { $push: { "results_data.raw_gcms_data": fileObj } },
      { new: true }
    ).select("results_data.raw_gcms_data -_id");

    console.log("Updated Drug Test with raw GCMS data:", updatedDrugTest);

    return {
      status: "success",
      updated_files_list: updatedDrugTest.results_data.raw_gcms_data,
    };
  } catch (error) {
    console.error("Error updating Drug Test with GCMS data:", error);
    return {
      status: "error",
      message: `Failed to update Drug Test: ${error.message}`,
    };
  }
});
