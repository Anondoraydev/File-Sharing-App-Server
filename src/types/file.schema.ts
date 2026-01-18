// models/File.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  uuid: string;
  userId: string;
  fileName: string;
  path: string;
  size: number;
  createdAt: Date;
}

const FileSchema = new Schema<IFile>(
  {
    uuid: { type: String, required: true },
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

export const File = mongoose.model<IFile>("File", FileSchema);
