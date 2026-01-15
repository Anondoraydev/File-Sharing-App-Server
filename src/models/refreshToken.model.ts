import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const RefreshToken = model("RefreshToken", refreshTokenSchema);
