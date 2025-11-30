// server/api/users.js

import Organization from "../../models/organizations";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    console.log("USERS REQUEST: ", event.node.req.method);

    const { id } = event.context.params;

    const body = await readBody(event);

    if (!id) {
      return {
        error: "Please provide the ID of the user to complete a PUT request",
      };
    } else {
      console.log("ID PARAM: ", id);
    }

    if (!body) {
      return {
        error:
          "Please provide the BODY payload of the request to update the user",
      };
    } else {
      console.log("BODY PARAM: ", body);
    }

    // Fetch data using the Mongoose model
    const updated_user = await Organization.findOneAndUpdate({ _id: id }, body);

    console.log("Updated Organization: ", updated_user);

    return { updated_user };
  } catch (error) {
    console.error("Error updating user: ", error);
    return { status: "error", message: `Failed to update user: ${error}` };
  }
});
