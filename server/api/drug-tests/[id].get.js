// server/api/users.js

import DrugTests from "../../models/drug-tests";

export default defineEventHandler(async (event) => {
  console.log("DRUG TESTS REQUEST: ", event.node.req.method);

  // awaitConnectToDatabase();

  const { id } = event.context.params;

  if (!id) {
    return {
      error:
        "Please provide an ID to GET the specific Drug Test you're looking for",
    };
  } else {
    console.log("ID PARAM: ", id);
  }

  try {
    // Fetch data using the Mongoose model
    const one_drug_test = await DrugTests.findOne({ _id: id });

    console.log("Drug Test Found: ", one_drug_test);

    return { one_drug_test };
  } catch (error) {
    console.error("Error locating Drug Test: ", error);
    return { status: "error", message: `Failed to locate Drug Test: ${error}` };
  }
});
