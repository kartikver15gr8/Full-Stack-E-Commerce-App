import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Admins Secret Key
export const SECRET_KEY = "ILOVECODING";

// JWT Verification for Admins
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }

      if (!payload) {
        return res.sendStatus(403);
      }
      if (typeof payload === "string") {
        return res.sendStatus(403);
      }

      req.headers["user"] = payload.email;
      next();
    });
  } else {
    res.status(411);
  }
};

// export { SECRET_KEY, authenticate };
