import { config } from "../config/config.ts";
import { ApiError } from "../utils/errors/apiError.ts";
import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      name: err.name,
      success: err.status,
      message: err.message,
      errors: err.errors,
      ...(config.NODE_ENV !== "production" && { stack: err.stack }),
    });
  }

  return res.status(500).json({
    name: err instanceof Error ? err.name : "Error",
    success: false,
    message: err instanceof Error ? err.message : "Internal Server Error",
    errors: {},
    ...(config.NODE_ENV !== "production" && {
      stack: err instanceof Error ? err.stack : String(err),
    }),
  });
};
