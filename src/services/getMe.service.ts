import { User } from "../models/user.schema.ts";
import {
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors/httpErrors.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/config.ts";

export const getMeService = {
  getMe: async (token: string) => {
    if (!token) throw new UnauthorizedError("No token provided");

    try {
      const decoded = jwt.verify(
        token,
        config.ACCESS_TOKEN_SECRET
      ) as JwtPayload;

      const user = await User.findById(decoded._id).select("-password ");
      if (!user) throw new NotFoundError("User not found");

      return user;
    } catch (err: any) {
      console.log("JWT verify error:", err.name, err.message);
      throw new UnauthorizedError("Token is invalid");
    }
  },
};
