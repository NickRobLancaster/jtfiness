import Organization from "../../models/organizations";

export default defineEventHandler(async (event) => {
  try {
    console.log("USERS REQUEST: ", event.node.req.method);

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
    const created_organization = await Organization.create(body);

    console.log("Created Organization: ", created_organization);

    return {
      status: "success",
      message: "Organization created successfully",
      organization: created_organization,
    };
  } catch (error) {
    console.error("Error creating organization: ", error);
    return error;
  }
});
