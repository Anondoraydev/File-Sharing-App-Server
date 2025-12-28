import { config } from "../config/config.ts";
import { ApiError } from "../utils/errors/apiError.ts";
import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      name: err.name,
      status: err.status,
      message: err.message,
      errors: err.errors,
      ...(config.NODE_ENV == "development" && { stack: err.stack }),
    });
  }

  const message = err instanceof Error ? err.message : "Internal Server Error";
  return res.status(500).json({
    name: err.name,
    success: false,
    message,
    ...(config.NODE_ENV == "development" && {
      stack: err instanceof Error ? err.stack : String(err),
    }),
  });
};
