import { ApiError } from "../utils/apiError.ts";
import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(process.env.NODE_ENV == "development" && { stack: err.stack }),
    });
  }

  const message = err instanceof Error ? err.message : "Internal Server Error";
  return res.status(500).json({
    success: false,
    message,
    ...(process.env.NODE_ENV == "development" && {
      stack: err instanceof Error ? err.stack : String(err),
    }),
  });
};
