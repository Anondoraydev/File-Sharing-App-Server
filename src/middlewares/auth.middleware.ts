import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors/httpErrors.ts";
import { config } from "../config/config.ts";

export interface AuthenticatedRequest extends Request {
  user?: { _id: string };
}

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization || req.cookies.accessToken;
  if (!accessToken) {
    return next(new UnauthorizedError("Token is missing"));
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      config.ACCESS_TOKEN_SECRET
    ) as JwtPayload;
    req.user = { _id: decoded._id };
    next();
  } catch (error) {
    return next(new UnauthorizedError("Token is invalid"));
  }
};

export const authGuard = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) throw new UnauthorizedError("Token required to logout");

  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
};
