import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/errors/httpErrors.ts";
import { fileUploadService } from "../services/fileUpload.service.ts";
import { CreatedResponse } from "../utils/success/httpSuccess.ts";
import { getFileInfoService } from "../services/getInfoFile.service.ts";

const fileUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) {
      throw new ValidationError("No file uploaded", {});
    }

    const result = await fileUploadService(file);

    const downloadUrl = `${req.protocol}://${req.get("host")}/api/v1/files/${
      result.uuid
    }`;

    return res.status(201).json(
      new CreatedResponse("File uploaded successfully", {
        uuid: result.uuid,
        downloadUrl,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getFileInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      throw new ValidationError("UUID is required", {});
    }

    const file = await getFileInfoService(uuid);

    return res.status(200).json({
      success: true,
      data: file,
    });
  } catch (err) {
    next(err);
  }
};

export { fileUpload, getFileInfo };
