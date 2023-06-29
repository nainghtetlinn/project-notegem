import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
  admin: process.env.FIREBASE_ADMIN,
};

export default config;
