import type { Request, Response, NextFunction } from "express";
import { registerService } from "../services/register.service.ts";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err); // ❗ THIS IS THE FIX
  }
};
