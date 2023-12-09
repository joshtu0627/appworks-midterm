// this file contains the configuration for the s3 bucket
import { env } from "../utils/env.js";

export const s3Config = {
  Bucket: env.S3BUCKET,
  region: env.S3REGION,
  accessKeyId: env.S3ACCESS_KEY_ID,
  secretAccessKey: env.S3SECRET_ACCESS_KEY,
};
