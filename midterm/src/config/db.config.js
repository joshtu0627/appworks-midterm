// this file contains the configuration for the database connection
import { env } from "../utils/env.js";

export const dbConfig = {
  host: env.DBHOST,
  user: env.DBUSER,
  database: env.DBNAME,
  password: env.DBPASSWORD,
  port: env.DBPORT,
};
