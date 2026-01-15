import type { AuthenticatedRequest } from "../middlewares/auth.middleware.ts";
import { User } from "../models/user.schema.ts";
import { NotFoundError } from "../utils/errors/httpErrors.ts";

export const getMeService = {
  getMe: async (req: AuthenticatedRequest) => {
    if (!req.user) {
      throw new NotFoundError("ব্যবহারকারী প্রমাণীকৃত নয়");
    }

    const user = await User.findById(req.user._id).select("-password -__v");
    if (!user) {
      throw new NotFoundError("ব্যবহারকারী পাওয়া যায়নি");
    }

    return user;
  },
};
