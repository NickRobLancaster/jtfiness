import DrugTests from "../../models/drug-tests";
import Labels from "../../models/labels";

export default defineEventHandler(async (event) => {
  try {
    console.log("DRUG TESTS REQUEST: ", event.node.req.method);

    const body = await readBody(event);
    console.log("BODY PARAM: ", body);

    if (!body) {
      return { error: "Please provide a body for this POST request" };
    }

    const { number_of_tests, collection_organization, batch_name } = body;

    const count =
      Number.isInteger(number_of_tests) && number_of_tests >= 2
        ? number_of_tests
        : 1;

    // 1. Fetch all existing sample_ids in the DB once.
    //    This allows you to avoid multiple queries later.
    const existingSampleIds = await DrugTests.distinct("sample_id");

    // 2. Put them in a Set for O(1) lookups.
    const existingIdsSet = new Set(existingSampleIds);

    // 3. Prepare the array of documents to create.
    const docsToCreate = [];

    // 4. For each document:
    //    - Keep generating a candidate sample_id
    //    - Check if it's in our Set
    //    - If it is, generate again; if not, finalize it
    for (let i = 0; i < count; i++) {
      let sample_id;
      do {
        sample_id = generate_sample_id();
      } while (existingIdsSet.has(sample_id));

      // Add it to the set so that no other doc in this batch reuses it.
      existingIdsSet.add(sample_id);

      // Create the document object
      docsToCreate.push({
        collection_organization,
        batch: true,
        sample_id,
      });
    }

    const sampleIdsForLabels = docsToCreate.flatMap((doc) =>
      Array(4).fill(doc.sample_id)
    );
    await Labels.create({ name: batch_name, sample_ids: sampleIdsForLabels });

    // 5. Insert all documents at once
    const created_drug_tests = await DrugTests.create(docsToCreate)
      .then((result) => {
        console.log("Drug Test(s) created successfully:", result);
        return result;
      })
      .catch((error) => {
        console.error("Error creating Drug Test(s):", error);
        throw error;
      });

    console.log("Created Drug Tests:", created_drug_tests);

    return { created_drug_tests, labels: sampleIdsForLabels };
  } catch (error) {
    console.error("Error creating Drug Test(s):", error);
    return { error: error.message || error };
  }
});
