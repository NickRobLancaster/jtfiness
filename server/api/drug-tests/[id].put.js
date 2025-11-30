// server/api/users.js

import DrugTests from "../../models/drug-tests";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    console.log("DRUG TESTS PUT: ", event.node.req.method);

    const { id } = event.context.params;

    const body = await readBody(event);

    if (!id) {
      return {
        error:
          "Please provide the ID of the Drug Test to complete a PUT request",
      };
    } else {
      console.log("ID PARAM: ", id);
    }

    if (!body) {
      return {
        error:
          "Please provide the BODY payload of the request to update the Drug Test",
      };
    } else {
      console.log("BODY PARAM: ", body);
    }

    // Fetch data using the Mongoose model
    const updated_drug_test = await DrugTests.findOneAndUpdate(
      { _id: id },
      body
    );

    console.log("Updated Drug Test: ", updated_drug_test);

    return { updated_drug_test };
  } catch (error) {
    console.error("Error updating Drug Test: ", error);
    return { status: "error", message: `Failed to update Drug Test: ${error}` };
  }
});
