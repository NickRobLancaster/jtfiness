// server/api/drugs.js

import Drugs from "../../models/drugs";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    const { id } = event.context.params;

    if (!id) {
      return { error: "Please provide an ID" };
    }

    console.log("ID PARAM: ", id);

    // Fetch data using the Mongoose model
    const deleted_drugs = await Drugs.deleteOne({
      _id: id,
    });

    console.log("Drugs Deleted: ", deleted_drugs);

    return { deleted_drugs };
  } catch (error) {
    console.error("Error deleting drug: ", error);
    return { status: "error", message: `Failed to delete drug: ${error}` };
  }
});
