import { ZRagisterUser } from "../validators/auth.validators.ts";
import { ValidationError } from "../utils/errors/httpErrors.ts";
import { User } from "../models/user.schema.ts";
import { formatErrors } from "../utils/formatErrors.ts";

export async function registerService(userData: unknown) {
  // 1️⃣ Validate incoming data with Zod
  const result = ZRagisterUser.safeParse(userData);
  if (!result.success) {
    throw new ValidationError("Validation error ", formatErrors(result.error));
  }
  const user = result.data;

  try {
    // 2️⃣ Attempt to create the user (atomic, single DB hit)
    const user = await User.create(result.data);
    return {
      id: user._id.toString(),
      displayName: user.displayName,
      email: user.email,
    };
  } catch (err: any) {
    if (err.code === 11000 && err.keyPattern?.email) {
      throw new ValidationError("Email already exists");
    }
    throw err;
  }
}
