import type { Request, Response, NextFunction } from "express";
import { registerService } from "../services/register.service.ts";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    next(err); // MUST pass error to Express
  }
};

export const AuthController = { register };
