import RequestKits from "../../../models/kit-requests";

export default defineEventHandler(async (event) => {
  try {
    console.log("REQUEST_KIT REQUEST: ", event.node.req.method);

    const body = await readBody(event);

    console.log("BODY PARAM: ", body);

    if (!body) {
      return { error: "Please provide a body for this POST request" };
    } else {
      console.log("BODY PARAM: ", body);
    }

    // Connect to the database
    // awaitConnectToDatabase();

    // Create new kit request
    const created_request_kit = await RequestKits.create(body);

    console.log("Created Request Kit: ", created_request_kit);

    return {
      status: "success",
      message: "Kit request created successfully",
    };
  } catch (error) {
    console.error("Error creating request kit: ", error);
    return {
      status: "error",
      message: "Error creating kit request",
      error: error.message || error,
    };
  }
});
