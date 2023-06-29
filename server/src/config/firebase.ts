import admin from "firebase-admin";
import config from "./config.js";
import logging from "./logging.js";

const initFirebaseAdmin = () => {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(Buffer.from(config.admin, "base64").toString("ascii"))
    ),
  });
  logging.info("Firebase admin initialized");
};

export default initFirebaseAdmin;
