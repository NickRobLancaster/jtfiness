// server/api/users.js

import DrugTests from "../../models/drug-tests";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    console.log("DELETE ALL DRUG TESTS REQUEST: ", event.node.req.method);
    const { id } = event.context.params;

    console.log("ID PARAM: ", id);

    // Delete all records in the DrugTests collection
    const all_deleted_drug_tests = await DrugTests.deleteMany({});

    console.log("Drug Test Deleted: ", all_deleted_drug_tests);

    return { all_deleted_drug_tests };
  } catch (error) {
    console.error("Error deleting All Drug Tests: ", error);
    return {
      status: "error",
      message: `Failed to delete All Drug Tests: ${error}`,
    };
  }
});
