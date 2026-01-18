// services/file.service.ts
import { v4 as uuidv4 } from "uuid";
import { File, type IFile } from "../types/file.schema.ts";

export const fileUploadService = async (
  file: Express.Multer.File,
  userId: string
): Promise<IFile> => {
  const newFile = await File.create({
    uuid: uuidv4(),
    userId,
    fileName: file.originalname,
    path: file.path,
    size: file.size,
  });
  return newFile;
};

export const getFileInfoService = async (
  uuid: string
): Promise<IFile | null> => {
  return await File.findOne({ uuid });
};

export const getUserFilesService = async (userId: string): Promise<IFile[]> => {
  return await File.find({ userId }).sort({ createdAt: -1 });
};
