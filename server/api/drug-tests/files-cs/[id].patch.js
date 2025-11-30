import DrugTests from "../../../models/drug-tests";

export default defineEventHandler(async (event) => {
  console.log("HELLO FROM THE FILE UPLOAD ENDPOINT!!!");

  try {
    const { id } = event.context.params;

    const { file_ref_obj } = await readBody(event);

    console.log("ABOUT TO STORE THIS REFERENCE FILE: ", file_ref_obj);

    // Update the DrugTest document by pushing the file object into the raw_gcms_data array
    const updatedDrugTest = await DrugTests.findByIdAndUpdate(
      id,
      { $push: { "results_data.raw_gcms_data": file_ref_obj } },
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
