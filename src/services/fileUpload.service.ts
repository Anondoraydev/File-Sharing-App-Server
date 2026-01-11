import { v4 as uuidv4 } from "uuid";
import { File } from "../models/file.model.ts";

interface FileType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: any;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export const fileUploadService = async (file: FileType) => {
  const fileUploadResult = await File.create({
    fileName: file.filename,
    path: file.path,
    size: file.size,
    sender: file.originalname,
    receiver: file.originalname,
    whoUploaded: file.originalname,

    uuid: uuidv4(),
  });
  return fileUploadResult;
};
