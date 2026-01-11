import type { Request, Response, NextFunction } from "express";
import type { CookieOptions } from "express";
import { sendOTP, verifyOTP } from "../services/otp.service.ts";
import { loginService } from "../services/login.service.ts";
import { registerService } from "../services/register.service.ts";
import { User } from "../models/user.schema.ts";
import { config } from "../config/config.ts";
import { ApiSuccess } from "../utils/success/apiSuccess.ts";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, otp } = req.body;

    const result = await loginService({ email, password });

    // Require OTP if not verified yet
    if (!result.user.emailVerification) {
      if (!otp) {
        // Send OTP to email if not provided
        try {
          await sendOTP(email);
        } catch (err) {
          console.error("Failed to send OTP:", err);
        }
        return res.status(200).json({
          success: true,
          message: "You are not verified yet. Please check your email for OTP.",
        });
      }

      const valid = await verifyOTP(email, otp);
      if (!valid) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }

      // mark user as verified
      await User.findByIdAndUpdate(result.user._id, {
        emailVerification: true,
      });
      result.user.emailVerification = true;
    }

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
      .json(new ApiSuccess("User login successfully", true, 200, result));
  } catch (err) {
    return next(err);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerService(req.body);
    return res
      .status(201)
      .json(new ApiSuccess("User registered successfully", true, 201, result));
  } catch (err) {
    return next(err);
  }
};

export const AuthController = {
  login,
  register,
};
