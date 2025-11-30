import DrugTests from "../../models/drug-tests";

export default defineEventHandler(async (event) => {
  try {
    console.log("DRUG TESTS REQUEST: ", event.node.req.method);

    const body = await readBody(event);

    console.log("BODY PARAM: ", body);

    if (!body) {
      return { error: "Please provide a body for this POST request" };
    } else {
      console.log("BODY PARAM: ", body);
    }

    // start a loop that generates a unique sample_id and checks if it already exists, if it does, it will generate a new one until it finds a unique one
    let sample_id = "";
    let isUnique = false;
    while (!isUnique) {
      sample_id = generate_sample_id();
      const existing_sample = await DrugTests.findOne({ sample_id });
      if (!existing_sample) {
        isUnique = true;
        body.sample_id = sample_id;
      }
    }

    // Fetch data using the Mongoose model
    const created_drug_test = await DrugTests.create(body)
      .then((result) => {
        console.log("Drug Test created successfully:", result);
        return result;
      })
      .catch((error) => {
        console.error("Error creating Drug Test:", error);
        throw error;
      });

    console.log("Created User: ", created_drug_test);

    return { created_drug_test };
  } catch (error) {
    console.error("Error creating Drug Test: ", error);
    return error;
  }
});
