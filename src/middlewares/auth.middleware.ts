// middlewares/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/config.ts";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email?: string };
    }
  }
}

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Authorization header বা custom header থেকে token নিন
    const token = req.headers.authorization || req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }

    console.log("Token received:", token);

    // JWT verify
    const decoded = jwt.verify(token as string, config.REFRESH_TOKEN_SECRET) as  JwtPayload;
    console.log("Decoded JWT:", decoded);

    // req.user set করুন
    req.user = { id: decoded._id, email: decoded.email };
    next();
  } catch (err) {
    console.error("verifyAuth error:", err);
    return res
      .status(401)
      .json({ status: false, message: "Invalid token", errors: err });
  }
};
