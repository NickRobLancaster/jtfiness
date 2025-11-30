import mongoose from "mongoose";
import Sessions from "../../models/sessions";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    const { sid } = get_jwt_payload(event);

    console.log("SESSION DELETING IS: ", sid);

    const session_record = await Sessions.findOneAndDelete({
      _id: sid,
    });

    if (!session_record) {
      return {
        status: "error",
        message: "Error fetching session record",
      };
    }

    //set the session cookie to a past date
    setCookie(event, "session", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return {
      status: "success",
      message: "Session is destroyed",
    };
  } catch (error) {
    console.log("Error fetching session record: ", error);
    return {
      status: "error",
      message: "Error fetching session record",
    };
  }
});
