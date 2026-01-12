import { File } from "../models/file.model.ts";
import { NotFoundError } from "../utils/errors/httpErrors.ts";

export const getFileInfoService = async (uuid: string) => {
  const file = await File.findOne({ uuid }).lean();

  if (!file) {
    throw new NotFoundError("File not found");
  }

  return file;
};
