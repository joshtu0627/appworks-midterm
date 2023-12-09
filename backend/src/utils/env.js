import dotenv from "dotenv";

dotenv.config();

export const env = {
  DBHOST: process.env.DBHOST,
  DBUSER: process.env.DBUSER,
  DBPORT: process.env.DBPORT,
  DBPASSWORD: process.env.DBPASSWORD,
  DBNAME: process.env.DBNAME,

  S3BUCKET: process.env.S3BUCKET,
  S3REGION: process.env.S3REGION,
  S3ACCESS_KEY_ID: process.env.S3ACCESS_KEY_ID,
  S3SECRET_ACCESS_KEY: process.env.S3SECRET_ACCESS_KEY,

  JWTSECRET: process.env.JWTSECRET,

  TAPPAYPARTNER_KEY: process.env.TAPPAYPARTNER_KEY,
  TAPPAYMERCHANT_ID: process.env.TAPPAYMERCHANT_ID,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  SECRET_KEY: process.env.SECRET_KEY,
};
