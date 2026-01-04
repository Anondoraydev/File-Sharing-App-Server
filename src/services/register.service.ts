import type { IUserDocument } from "../models/user.schema.ts";
import { ZRagisterUser } from "../validators/auth.validators.ts";
import { ValidationError } from "../utils/errors/httpErrors.ts";
import { User } from "../models/user.schema.ts";
import type { IUser } from "../types/schema";
import { formatErrors } from "../utils/formatErrors.ts";

export async function registerService(userData: IUser): Promise<IUserDocument> {
  const result = ZRagisterUser.safeParse(userData);

  if (!result.success) {
    throw new ValidationError("Validation error", formatErrors(result.error));
  }

  const validatedData = result.data;

  const isEmailExists = await User.findOne({ email: validatedData.email });
  if (isEmailExists) {
    throw new ValidationError("Email already exists");
  }

  const createdUser = await User.create(validatedData);
  const user = createdUser.toObject();
  delete user.password;
  return user;
}
