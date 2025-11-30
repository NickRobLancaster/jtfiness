import Sessions from "../models/sessions"; // your user model

export async function wipe_old_session(event) {
  try {
    // awaitConnectToDatabase(); // Uncomment if you're explicitly handling DB connections

    const { sid } = get_jwt_payload(event);

    console.log("Attempting to destroy session with ID:", sid);

    const session_record = await Sessions.findOneAndDelete({
      _id: sid,
    });

    if (!session_record) {
      // If no record is found, still remove the cookie and return success
      setCookie(event, "session", "", {
        httpOnly: true,
        expires: new Date(0), // effectively deletes the cookie
      });

      return {
        status: "success",
        message: "No session record found, cookie has been removed anyway.",
      };
    }

    // If a record was found and deleted, remove the cookie
    setCookie(event, "session", "", {
      httpOnly: true,
      expires: new Date(0), // effectively deletes the cookie
    });

    return {
      status: "success",
      message: "Session record was found and destroyed. Cookie removed.",
    };
  } catch (error) {
    console.log("Error fetching/deleting session:", error);
    return {
      status: "error",
      message: "There was a problem deleting the session record.",
    };
  }
}
