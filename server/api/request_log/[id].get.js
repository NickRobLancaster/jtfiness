// server/api/users.js

import RequestLog from "../../models/request_log";

export default defineEventHandler(async (event) => {
  console.log("USERS REQUEST: ", event.node.req.method);

  // awaitConnectToDatabase();

  const { id } = event.context.params;

  if (!id) {
    return {
      error:
        "Please provide a user ID to GET the specific users logs you're looking for",
    };
  } else {
    console.log("ID PARAM: ", id);
  }

  try {
    // Fetch data using the Mongoose model
    const one_user = await RequestLog.find({ user_id: id });

    console.log("Requst Log Found: ", one_user);

    return { one_user };
  } catch (error) {
    console.error("Error locating logs by user: ", error);
    return { status: "error", message: `Failed to locate user: ${error}` };
  }
});
