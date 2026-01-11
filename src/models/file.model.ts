import mongoose, { model, Schema } from "mongoose";
import type { IFileUser } from "../types/schema.ts";

const fileSchema = new Schema<IFileUser>({
  fileName: { type: String, trim: true },
  path: { type: String, trim: true },
  sender: { type: String, trim: true },
  receiver: { type: String, trim: true },
  size: { type: Number },
  whoUploaded: { type: String, trim: true, default: null },
  uuid: { type: String, trim: true },
});

export const File =
  mongoose.models.File || model<IFileUser>("File", fileSchema);
