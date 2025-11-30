import RequestLog from "../../models/request_log";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    // Fetch data using the Mongoose model with lean and virtuals enabled
    const request_log = await RequestLog.find().lean();
    //   .select("-password -api_key -encrypted_password")

    return { request_log };
  } catch (error) {
    console.error("Error retrieving request log list: ", error);
    return {
      status: "error",
      message: `Failed to retrieve request log list: ${error}`,
    };
  }
});
