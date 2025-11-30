import Labels from "../../../models/labels.js";

export default defineEventHandler(async (event) => {
  //get all records from the labels collection
  const labels = await Labels.find({}).lean();

  return {
    labels,
  };
});
