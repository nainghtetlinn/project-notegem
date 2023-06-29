import "colors";
import express, { Express, Request, Response } from "express";
import cors from "cors";

import config from "./config/config.js";
import logging from "./config/logging.js";
import connectDB from "./config/db.js";
import initFirebaseAdmin from "./config/firebase.js";

import noteRoute from "./routes/note.js";
import errorHandler from "./middlewares/error.js";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/api/note", noteRoute);

app.use(errorHandler);

connectDB()
  .then((conn) => {
    logging.info(`MongoDB connected: ${conn.connection.host}`.green);
    initFirebaseAdmin();
    app.listen(config.port, () => {
      logging.info(`⚡️[server]: Server is running at port: ${config.port}`);
    });
  })
  .catch((error) => {
    logging.error(error);
    process.exit(1);
  });
