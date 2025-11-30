// server/api/organizations.js

import Organization from "../../models/organizations";

export default defineEventHandler(async (event) => {
  console.log("USERS REQUEST: ", event.node.req.method);

  // awaitConnectToDatabase();

  const { id } = event.context.params;

  if (!id) {
    return {
      error: "Please provide an ID to GET the specific organization you're looking for",
    };
  } else {
    console.log("ID PARAM: ", id);
  }

  try {
    // Fetch data using the Mongoose model
    const one_organization = await Organization.findOne({ _id: id });

    console.log("Organization Found: ", one_organization);

    return { one_organization };
  } catch (error) {
    console.error("Error locating organization: ", error);
    return { status: "error", message: `Failed to locate organization: ${error}` };
  }
});
