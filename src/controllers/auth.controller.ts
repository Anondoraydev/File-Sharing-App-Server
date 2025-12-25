import type { Request, Response } from "express";
import { createUserZodSchema } from "../validators/auth.validators.ts";

const registerController = async (req: Request, res: Response) => {
  const userData = req.body;
  const result = createUserZodSchema.safeParse(userData);

  res.json(result.error!.issues);
};

export { registerController };
