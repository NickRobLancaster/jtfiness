import Labels from "../../../models/labels.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    return { error: "Please provide a body for this POST request" };
  }

  const { batch_name, labels_ids } = body;

  const sampleIdsForLabels = labels_ids.flatMap((id) => Array(4).fill(id));

  await Labels.create({ name: batch_name, sample_ids: sampleIdsForLabels });

  return {
    labels: sampleIdsForLabels,
  };
});
