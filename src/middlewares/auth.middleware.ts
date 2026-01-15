import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors/httpErrors.ts";
import { config } from "../config/config.ts";

export interface AuthenticatedRequest extends Request {
  user?: { _id: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Token is missing"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token as string,
      config.ACCESS_TOKEN_SECRET
    ) as JwtPayload & {
      _id?: string;
    };

    if (!decoded._id) {
      return next(new UnauthorizedError("Invalid token"));
    }

    req.user = { _id: decoded._id };
    next();
  } catch (err: any) {
    return next(new UnauthorizedError("Invalid token"));
  }
};
