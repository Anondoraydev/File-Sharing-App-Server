import type { Request, Response, NextFunction } from "express";
import { getMeService } from "../services/getMe.service.ts";
import { UnauthorizedError } from "../utils/errors/httpErrors.ts";

export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Raw token from header or cookie
    const token = req.headers.authorization || req.cookies.refreshToken;

    if (!token) {
      console.error("No token provided");
      throw new UnauthorizedError("No token provided");
    }

    const user = await getMeService.getMe(token);
    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Custom error handler middleware for UnauthorizedError
export const unauthorizedErrorHandler = (
  err: UnauthorizedError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  } else {
    next(err);
  }
};
