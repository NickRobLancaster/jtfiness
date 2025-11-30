// server/api/users.js

import DrugTests from "../../models/drug-tests";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    console.log("DRUG TESTS REQUEST: ", event.node.req.method);
    const { id } = event.context.params;

    if (!id) {
      return { error: "Please provide an ID for the Drug Test to update" };
    }

    console.log("ID PARAM: ", id);

    // Fetch data using the Mongoose model
    const deleted_drug_test = await DrugTests.deleteOne({
      _id: id,
    });

    console.log("Drug Test Deleted: ", deleted_drug_test);

    return { deleted_drug_test };
  } catch (error) {
    console.error("Error deleting Drug Test: ", error);
    return { status: "error", message: `Failed to delete Drug Test: ${error}` };
  }
});
