import Sessions from "../../models/sessions";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    // Fetch data using the Mongoose model with lean and virtuals enabled
    const users = await Sessions.find().lean();
    //   .select("-password -api_key -encrypted_password")

    return { users };
  } catch (error) {
    console.error("Error retrieving users list: ", error);
    return {
      status: "error",
      message: `Failed to retrieve users list: ${error}`,
    };
  }
});
