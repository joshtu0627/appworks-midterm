import AWS from "aws-sdk";

import { s3Config } from "../config/s3.config.js";

/**
 * Handles request to upload file to S3.
 *
 * @param {Object} file - The file object.
 * @returns {string} - The url of the uploaded file.
 */
const uploadToS3 = (file) => {
  // set AWS credentials
  AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  });

  const s3 = new AWS.S3();

  // set new file name to prevent duplicate
  const fileName = file.originalname.split(".")[0];
  const fileExtension = file.originalname.split(".")[1];
  const date = Date.now();
  const newFileName = `${fileName}-${date}.${fileExtension}`;

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: s3Config.Bucket,
        region: s3Config.region,
        Key: newFileName,
        Body: file.buffer,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // return the url of the uploaded file
          resolve(data.Location);
        }
      }
    );
  });
};

export default uploadToS3;
