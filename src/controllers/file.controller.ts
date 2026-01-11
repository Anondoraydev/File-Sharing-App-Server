import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/errors/httpErrors.ts";
import { fileUploadService } from "../services/fileUpload.service.ts";
import { ApiSuccess } from "../utils/success/apiSuccess.ts";

const fileUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) {
      throw new ValidationError("No file uploaded", {});
    }
    const result = await fileUploadService(file);
    res
      .status(201)
      .json(new ApiSuccess("File uploaded successfully", true, 201, result)) ;
  } catch (err) {
    return next(err);
  }
};

export { fileUpload };
