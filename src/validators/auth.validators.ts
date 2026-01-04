import z from "zod";



export const ZRagisterUser = z.object({
  displayName: z.string({ error: "display name is required" }),
  email: z.string({
    error: "email is required",
  }),
  password: z
    .string({
      error: "password is required",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        error:
          "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    )
    .min(8, {
      error: "password must be at least 8 characters long",
    })
    .max(32, {
      error: "password must be at most 32 characters long",
    })
});

export const ZLoginUser = z.object({
  email: z.string({
    error: "email is required",
  }),
  password: z
    .string({
      error: "password is required",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        error:
          "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    )
    .min(8, {
      error: "password must be at least 8 characters long",
    })
    .max(32, {
      error: "password must be at most 32 characters long",
    })
});
