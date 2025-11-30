import Drugs from "../../models/drugs";

export default defineEventHandler(async (event) => {
  try {
    console.log("DRUG REQUEST: ", event.node.req.method);

    const body = await readBody(event);

    console.log("BODY PARAM: ", body);

    if (!body) {
      return { error: "Please provide a body for this POST request" };
    } else {
      console.log("BODY PARAM: ", body);
    }

    // Connect to the database
    // awaitConnectToDatabase();

    // Fetch data using the Mongoose model
    const created_drug = await Drugs.create(body);

    console.log("Created Drug: ", created_drug);

    return { created_drug };
  } catch (error) {
    console.error("Error creating user: ", error);
    return error;
  }
});
