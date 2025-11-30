import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NUXT_AWS_REGION,
  endpoint: `https://s3.${process.env.NUXT_AWS_REGION}.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.NUXT_AWS_KEY_ID,
    secretAccessKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
  },
});

export async function delete_from_s3(key) {
  try {
    if (!key) {
      console.error("Missing S3 key parameter");
      return false;
    }

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.NUXT_AWS_S3_BUCKET_NAME,
        Key: key,
      })
    );

    console.log("DELETED S3 FILE: ");

    // If no error is thrown, assume success
    return true;
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    return false;
  }
}
