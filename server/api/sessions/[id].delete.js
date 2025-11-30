// server/api/users.js

import Sessions from "../../models/sessions";
//ObjectId from mongoose
import { ObjectId } from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    const user_id = event.context.params.id;

    if (!user_id) {
      throw createError({ statusCode: 400, message: "Session ID is required" });
    }

    console.log("SESSION ID LOCATED: ", event.node.req.sessionID);

    const ended_session = await Sessions.deleteOne({
      _id: new ObjectId(event.node.req.sessionID),
    });

    console.log("Users Session Ended: ", ended_session);

    //parse session string as obj
    const session = JSON.parse(session_exists.session);

    return { ended_session };
  } catch (error) {
    console.error(`Error ending session for that ID: `, error);
    return {
      status: "error",
      message: `Failed to end session for that user: ${error}`,
    };
  }
});
