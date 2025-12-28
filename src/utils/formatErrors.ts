import z, { ZodError } from "zod";

export function formatErrors(errors: ZodError) {
  return z.flattenError(errors);
}
