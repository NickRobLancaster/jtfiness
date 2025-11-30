// server/api/drugs.js

import Drugs from "../../models/drugs";

export default defineEventHandler(async (event) => {
  console.log("DRUGS REQUEST: ", event.node.req.method);

  // awaitConnectToDatabase();

  const { id } = event.context.params;

  if (!id) {
    return {
      error: "Please provide an ID to GET the specific drug you're looking for",
    };
  } else {
    console.log("ID PARAM: ", id);
  }

  try {
    // Fetch data using the Mongoose model
    const one_drug = await Drugs.findOne({ _id: id });

    console.log("Drug Tests Found: ", one_drug);

    return { one_drug };
  } catch (error) {
    console.error("Error locating Drug: ", error);
    return { status: "error", message: `Failed to locate Drug: ${error}` };
  }
});
