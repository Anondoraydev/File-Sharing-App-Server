import type { Request, Response, NextFunction } from "express";
import { registerService } from "../services/register.service.ts";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerService(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err); // ❗ ONLY error goes here
  }
};

export const authController = { register };
