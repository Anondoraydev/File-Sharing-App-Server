import type { Request, Response, NextFunction } from "express";
import path from "path";
import { ValidationError, NotFoundError } from "../utils/errors/httpErrors.ts";
import {
  fileUploadService,
  getFileInfoService,
  getUserFilesService,
} from "../services/file.service.ts";
import { CreatedResponse, OKResponse } from "../utils/success/httpSuccess.ts";

// Upload a file
const fileUpload = async (req: Request, res: Response) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.file:", req.file);

    if (!req.user || !req.user.id) throw new Error("User not authenticated");
    if (!req.file) throw new Error("No file uploaded");

    const result = await fileUploadService(req.file, req.user.id);

    res.status(201).json({
      status: true,
      message: "File uploaded successfully",
      data: {
        uuid: result.uuid,
        fileShareUrl: ` ${req.protocol}://${req.get("host")}/api/v1/download/${
          result.uuid
        } `,
      },
    });
  } catch (err) {
    console.error("File upload error:", err);
    res
      .status(500)
      .json({ status: false, message: "Internal Server Error", errors: err });
  }
};

// Get all files of logged in user
const getUserFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new ValidationError("User not authenticated", {});

    const files = await getUserFilesService(userId);

    res.status(200).json(
      new OKResponse(
        "Files fetched successfully",
        files.map((f) => ({
          uuid: f.uuid,
          name: f.fileName,
          size: f.size,
          downloadUrl: `${req.protocol}://${req.get(
            "host"
          )}/api/files/download/${f.uuid}`,
        }))
      )
    );
  } catch (err) {
    console.error("Get user files error:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      errors: err instanceof Error ? err.message : err,
    });
  }
};

// Download file by UUID
const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid } = req.params;
    if (!uuid) throw new ValidationError("UUID is required", {});

    const file = await getFileInfoService(uuid);
    if (!file) throw new NotFoundError("File not found");

    console.log("Downloading file:", file.fileName, "path:", file.path);

    res.download(path.resolve(file.path), file.fileName);
  } catch (err) {
    console.error("Download file error:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      errors: err instanceof Error ? err.message : err,
    });
  }
};

export { fileUpload, getUserFiles, downloadFile };
