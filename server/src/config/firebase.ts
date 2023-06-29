import { initializeApp, cert } from "firebase-admin/app";
import config from "./config.js";
import logging from "./logging.js";

const initFirebaseAdmin = () => {
  initializeApp({
    credential: cert(
      JSON.parse(Buffer.from(config.admin, "base64").toString("ascii"))
    ),
  });
  logging.info("Firebase admin initialized");
};

export default initFirebaseAdmin;
