import Sessions from "../models/sessions";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();
    const session_blacklist = await Sessions.find({
      active: false,
    })
      .select("jwt")
      .lean();

    const blacklist = session_blacklist.map((session) => session.jwt);

    return session_blacklist;
  } catch (error) {
    console.log("Error fetching blacklist: ", error);
    return {
      status: "error",
      message: "Error fetching blacklist",
    };
  }
});
