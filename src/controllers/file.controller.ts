import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/errors/httpErrors.ts";
import { fileUploadService } from "../services/fileUpload.service.ts";
import { CreatedResponse, OKResponse } from "../utils/success/httpSuccess.ts";
import { getFileInfoService } from "../services/getInfoFile.service.ts";

const fileUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) {
      throw new ValidationError("No file uploaded", {});
    }

    const result = await fileUploadService(file);

    const fileShareUrl = `${req.protocol}://${req.get("host")}/api/v1/files/${
      result.uuid
    }`;

    return res.status(201).json(
      new CreatedResponse("File uploaded successfully", {
        uuid: result.uuid,
        fileShareUrl,
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

    const result = await getFileInfoService(uuid);

    const downloadUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/files/download/${uuid}`;

    return res.status(200).json(
      new OKResponse("File info fetched successfully", {
        ...result,
        downloadUrl,
      })
    );
  } catch (err) {
    next(err);
  }
};
const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      throw new ValidationError("UUID is required", {});
    }
    const result = await getFileInfoService(uuid);
    res.download(result.path);
  } catch (err) {
    next(err);
  }
};

export { fileUpload, getFileInfo, downloadFile };
