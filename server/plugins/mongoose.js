export default defineNitroPlugin(async () => {
  // console.log("NITRO PLUGIN | Mongoose Connecting: ");

  try {
    await connectToDatabase();
    console.log("NITRO PLUGIN - RUNTIME - Connected to mongodb successfully");
  } catch (error) {
    console.log("NITRO PLUGIN - RUNTIME - Error connecting to mongodb ", error);
  }
});
