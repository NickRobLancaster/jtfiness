import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

import { extname } from "path";

const s3 = new S3Client({
  region: process.env.NUXT_AWS_REGION,
  endpoint: `https://s3.${process.env.NUXT_AWS_REGION}.amazonaws.com`,
  // forcePathStyle: true, // needed with minio?
  credentials: {
    accessKeyId: process.env.NUXT_AWS_KEY_ID,
    secretAccessKey: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
  },
});

export async function upload_to_s3(event, fileNamePrefix = "misc") {
  try {
    const formData = await readMultipartFormData(event);
    const fileData = formData.find((part) => part.filename);

    if (!fileData) {
      throw createError({
        statusCode: 400,
        message: "No file content provided",
      });
    }

    const contentType = fileData.type || "application/octet-stream";
    const fileExt = extname(fileData.filename || "") || ".bin";
    const key = `${fileNamePrefix}_${randomUUID()}${fileExt}`;

    const uploadParams = {
      Bucket: process.env.NUXT_AWS_S3_BUCKET_NAME,
      Key: key,
      Body: fileData.data,
      ContentType: contentType,
    };

    const s3_command_result = await s3.send(new PutObjectCommand(uploadParams));

    console.log("Upload Result Utility:", s3_command_result);

    const fileUrl = `https://${process.env.NUXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NUXT_AWS_REGION}.amazonaws.com/${key}`;

    console.log("SUCCESS WERE RETURNING");

    const doc_record_obj = {
      key,
      url: fileUrl,
      contentType,
      bucket: process.env.NUXT_AWS_S3_BUCKET_NAME,
    };

    console.log("doc_record_obj", doc_record_obj);

    return doc_record_obj;
  } catch (error) {
    console.log("Error uploading file to S3:", error);
    return {
      status: "error",
      message: "Failed to upload file to S3",
      error: error.message,
    };
  }
}
