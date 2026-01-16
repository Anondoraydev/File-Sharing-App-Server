import { User } from "../models/user.schema.ts";
import {
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors/httpErrors.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/config.ts";

interface JwtUserPayload extends JwtPayload {
  _id: string;
}

export const getMeService = {
  getMe: async (token: string) => {
    if (!token) {
      console.error("No token provided");
      throw new UnauthorizedError("No token provided");
    }

    try {
      const decoded = jwt.verify(
        token,
        config.REFRESH_TOKEN_SECRET
      ) as JwtUserPayload;

      if (!decoded._id) {
        console.error("Token payload invalid: missing _id");
        throw new UnauthorizedError("Token payload invalid");
      }

      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        console.error("User not found for token: ", decoded._id);
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (err: any) {
      console.error("JWT verify error:", err.name, err.message);
      console.log(token)
      throw new UnauthorizedError("Token is invalid");
    }
  },
};
