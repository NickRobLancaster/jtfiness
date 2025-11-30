import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.NUXT_AWS_REGION,
  endpoint: `https://s3.${process.env.NUXT_AWS_REGION}.amazonaws.com`,
  // forcePathStyle: true, // needed with minio?
  credentials: {
    accessKeyId: process.env.NUXT_AWS_KEY_ID,
    secretAccessKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
  },
});

export async function download_from_s3(key) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.NUXT_AWS_S3_BUCKET_NAME,
      Key: key,
    });

    // Generate a pre-signed URL that expires in 1 hour (3600 seconds)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 20 });
    return { url: signedUrl };
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return { status: "error", message: error.message };
  }
}
