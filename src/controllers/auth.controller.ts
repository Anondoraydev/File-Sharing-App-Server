import type { Request, Response, NextFunction } from "express";
import { registerService } from "../services/register.service.ts";
import { loginService } from "../services/login.service.ts";
import { OKResponse } from "../utils/success/httpSuccess.ts";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json(new OKResponse("User registered successfully", user));
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(new OKResponse("User login successfully", result));
  } catch (err) {
    return next(err);
  }
};

export const AuthController = {
  register,
  login,
};
