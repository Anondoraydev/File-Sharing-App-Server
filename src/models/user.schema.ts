import { Schema, model, models } from "mongoose";
import bcryptjs from "bcryptjs";
import { config } from "../config/config.ts";
import { sign } from "jsonwebtoken";
import type { IUser } from "../types/schema";

// Schema
const userSchema = new Schema<IUser>(
  {
    displayName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    emailVarification: { type: Date, default: null },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

// Password hashing before save
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
});

// JWT Access Token generator
userSchema.methods.generateAccessToken = function () {
  return sign(
    {
      _id: this._id,
      displayName: this.displayName,
      emailVarification: this.emailVarification,
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN }
  );
};

// Password comparison
// userSchema.methods.comparePassword = async function (password: string) {
//   return bcryptjs.compare(password, this.password);
// };
// Export model
export const User = models.User || model<IUser>("User", userSchema);
