// this just get's the pre signed url
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const CONFIG = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    console.log("WHOLE BODY REQ: ", body);

    const { id, new_name, file_type, original_file_name } = body;

    const missingParams = [];
    if (!file_type) missingParams.push("file_type");
    if (!new_name) missingParams.push("new_name");
    if (!id) missingParams.push("id");

    if (missingParams.length > 0) {
      return {
        status: "error",
        message: `Missing required parameter(s): ${missingParams.join(", ")}`,
      };
    }

    const name_used = new_name ? new_name : original_file_name;

    const scrubbedKey = scrub_s3_key(name_used);
    const key = `${
      CONFIG.NUXT_ENV !== "production" ? "staging" : "production"
    }/drug_tests/raw_gcms_data/${id}/${scrubbedKey}`;

    const s3Client = new S3Client({
      region: process.env.NUXT_AWS_REGION,
      credentials: {
        accessKeyId: process.env.NUXT_AWS_KEY_ID,
        secretAccessKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.NUXT_AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: file_type,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return {
      status: "success",
      url: signedUrl,
      key,
      bucket: process.env.NUXT_AWS_S3_BUCKET_NAME,
    };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
});
