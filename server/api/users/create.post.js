import User from "../../models/users";

export default defineEventHandler(async (event) => {
  try {
    console.log("USERS REQUEST: ", event.node.req.method);

    const body = await readBody(event);

    // extract the api_key from the body
    const login_api_key = body.api_key;

    const hashed_api_key = await one_way_hash(login_api_key);

    // replace the api_key in the body with the hashed version
    body.api_key = hashed_api_key;

    const ip =
      event.node.req.headers["x-forwarded-for"] ||
      event.node.req.socket.remoteAddress;

    body.ip = ip;

    console.log("BODY PARAM: ", body);

    if (!body) {
      return { error: "Please provide a body for this POST request" };
    } else {
      console.log("BODY PARAM: ", body);
    }

    // Connect to the database
    // awaitConnectToDatabase();

    // Fetch data using the Mongoose model
    const created_user = await User.create(body);

    console.log("Created User: ", created_user);

    // delete created_user.password, created_user.encrypted_password, delete created_user.api_key
    const { password, encrypted_password, api_key, ...sanitized_user } =
      created_user.toObject();

    console.log("Sanitized User: ", sanitized_user);

    return {
      status: "success",
      message: "User created successfully",
      user: sanitized_user,
    };
  } catch (error) {
    console.error("Error creating user: ", error);
    return error;
  }
});
