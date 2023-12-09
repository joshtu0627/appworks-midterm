// this file contains the configuration for the payment gateway
import { env } from "../utils/env.js";

export const paymentConfig = {
  partner_key: env.TAPPAYPARTNER_KEY,
  merchant_id: env.TAPPAYMERCHANT_ID,
};
