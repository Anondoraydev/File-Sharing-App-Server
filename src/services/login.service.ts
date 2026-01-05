import type { IUserDocument } from "../models/user.schema.ts";
import { ZLoginUser } from "../validators/auth.validators.ts";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../utils/errors/httpErrors.ts";
import { User } from "../models/user.schema.ts";
import { formatErrors } from "../utils/formatErrors.ts";

export async function loginService(userData: unknown) {
  const result = ZLoginUser.safeParse(userData);
  if (!result.success) {
    throw new ValidationError("Validation error", formatErrors(result.error));
  }
  const { email, password } = result.data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Email not found");
  }

  try {
    // 2️⃣ Attempt to create the user (atomic, single DB hit)
    const user = await User.findOne({ email: result.data.email });

    if (!user) {
      throw new NotFoundError("Email not found", {});
    }

    const isPasswordVerified = await user.checkPassword(result.data.password);

    if (!isPasswordVerified) {
      throw new ValidationError("Invalid password", {});
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const finalUser = user.toObject();
    delete finalUser.password;
    delete finalUser.refreshToken;

    return { user: finalUser, accessToken, refreshToken };
  } catch (err: any) {
    throw err;
  }
}
