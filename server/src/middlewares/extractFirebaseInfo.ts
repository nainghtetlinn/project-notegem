import { Request, Response, NextFunction } from "express";
import asyncHander from "express-async-handler";
import { getAuth } from "firebase-admin/auth";

const extractFirebaseInfo = asyncHander(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      getAuth()
        .verifyIdToken(token)
        .then((result) => {
          if (result) {
            res.locals.firebase = result;
            next();
          } else {
            return res.status(401).json({
              message: "Unauthorized",
            });
          }
        })
        .catch((error) => {
          return res.status(401).json({
            error,
            message: "Unauthorized",
          });
        });
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export default extractFirebaseInfo;
