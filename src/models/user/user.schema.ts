import { Schema } from "mongoose";
import type { IUser } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    displayName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
