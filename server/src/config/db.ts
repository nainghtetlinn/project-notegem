import mongoose from "mongoose";
import config from "./config.js";
import logging from "./logging.js";

const connectDB = () => {
  mongoose.set("strictQuery", true);
  logging.info("Connecting to mongodb server ... ");
  return mongoose.connect(config.mongo);
};

export default connectDB;
