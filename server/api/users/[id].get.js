// server/api/users.js

import User from "../../models/users";

export default defineEventHandler(async (event) => {
  console.log("USERS REQUEST: ", event.node.req.method);

  // awaitConnectToDatabase();

  const { id } = event.context.params;

  if (!id) {
    return {
      error: "Please provide an ID to GET the specific user you're looking for",
    };
  } else {
    console.log("ID PARAM: ", id);
  }

  try {
    // Fetch data using the Mongoose model
    const one_user = await User.findOne({ _id: id }).select("-api_key");

    console.log("User Found: ", one_user);

    return { one_user };
  } catch (error) {
    console.error("Error locating user: ", error);
    return { status: "error", message: `Failed to locate user: ${error}` };
  }
});
