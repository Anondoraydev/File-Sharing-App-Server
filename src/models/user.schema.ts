import mongoose, { Document } from "mongoose";
import bcryptjs, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.ts";

export interface IUser {
  displayName: string;
  email: string;
  password: string;
  emailVerification: {
    type: Boolean;
    default: false;
  };
  refreshToken?: string | null;
}

export interface IUserDocument extends Document {
  displayName: string;
  email: string;
  password: string;
  emailVerification: {
    type: Boolean;
    default: false;
  };
  refreshToken?: string | null;
  generateAccessToken(): string;
  comparePassword(password: string): Promise<boolean>;
  checkPassword(password: string): Promise<boolean>;
  generateRefreshToken(): string;
}

const { Schema, model, models } = mongoose;

const userSchema = new Schema<IUserDocument>(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    emailVerification: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
});

userSchema.methods.checkPassword = async function (password: string) {
  return await compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      displayName: this.displayName,
      emailVerification: this.emailVerification,
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      displayName: this.displayName,
      emailVerification: this.emailVerification,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN }
  );
};

userSchema.methods.comparePassword = async function (password: string) {
  return bcryptjs.compare(password, this.password);
};

export const User = models.User || model<IUserDocument>("User", userSchema);
