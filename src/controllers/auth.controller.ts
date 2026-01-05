import type { Request, Response, NextFunction, CookieOptions } from "express";
import { registerService } from "../services/register.service.ts";
import { loginService } from "../services/login.service.ts";
import { OKResponse } from "../utils/success/httpSuccess.ts";
import { config } from "../config/config.ts";

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
    const options: CookieOptions = {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    };
    res
      .status(200)
      .cookie("accessToken", result.accessToken, {
        ...options,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", result.refreshToken, {
        ...options,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(new OKResponse("User login successfully", result));
  } catch (err) {
    return next(err);
  }
};

export const AuthController = {
  register,
  login,
};
