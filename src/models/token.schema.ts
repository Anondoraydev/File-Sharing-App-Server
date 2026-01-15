import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
});

export const TokenModel = model("Token", tokenSchema);
