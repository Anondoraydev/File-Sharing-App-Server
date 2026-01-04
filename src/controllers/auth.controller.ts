import type { Request, Response, NextFunction } from "express";
import { registerService } from "../services/register.service.ts";
import { loginService } from "../services/login.service.ts";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

export const AuthController = {
  register,
  login,
};
