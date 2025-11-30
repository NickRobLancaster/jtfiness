// server/api/drug-tests/files/download.get.js
export default defineEventHandler(async (event) => {
  try {
    const { key } = getQuery(event); // key should correspond to the object key in your bucket
    console.log("KEYYYY: ", key);
    
    // Call the utility function to get the pre-signed URL
    const result = await download_from_s3(key);
    if (result.url) {
      // Return the actual URL string rather than the wrapped object
      return { url: result.url };
    }
    // Otherwise, pass through any error info
    return result;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return { status: "error", message: error.message };
  }
});
