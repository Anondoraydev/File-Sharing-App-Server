import z, { ZodError } from "zod";

export function formetErrors(errors: ZodError) {
  return z.flattenError(errors);
}
