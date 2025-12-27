import type { IUserDocument} from "../models/user.schema.ts";
import { ZRagisterUser } from "../validators/auth.validators.ts";
import { ValidationError } from "../utils/errors/httpErrors.ts";
import { User } from "../models/user.schema.ts";
import type { IUser } from "../types/schema";
import { formatErrors } from "../utils/formatErrors.ts";

export async function registerService(userData: IUser): Promise<IUserDocument> {
  // Validate input
  const result = ZRagisterUser.safeParse(userData);
  if (!result.success) {
    throw new ValidationError("Validation error", formatErrors(result.error));
  }

  const validatedData = result.data;

  // Check if email exists
  const isEmailExists = await User.findOne({ email: validatedData.email });
  if (isEmailExists) {
    throw new ValidationError("Email already exists");
  }

  // Create user
  const user = await User.create(validatedData);

  return user;
}
