import type { NextFunction, Request, Response } from "express";
import { registerService } from "../services/register.service.ts";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerService(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const authController = { register };
