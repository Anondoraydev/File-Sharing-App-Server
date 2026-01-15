import { RefreshToken } from "../models/refreshToken.model.ts";
import { UnauthorizedError } from "../utils/errors/httpErrors.ts";

export const logoutService = async (refreshToken?: string) => {
  if (!refreshToken) {
    throw new UnauthorizedError("No refresh token found");
  }

  // delete refresh token from DB
  await RefreshToken.deleteOne({ token: refreshToken });
};
