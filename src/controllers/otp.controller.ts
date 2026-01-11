import type { Request, Response } from "express";
import { sendOTP, verifyOTP } from "../services/otp.service.ts";

export const otpController = {
  // Send OTP to email
  sendOTP: async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    try {
      await sendOTP(email);
      return res.json({ success: true, message: "OTP sent to email" });
    } catch (err) {
      console.error("Send OTP Error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send OTP" });
    }
  },

  // Verify OTP
  verifyOTP: async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });

    try {
      const valid = await verifyOTP(email, otp); // <- now from otp.service
      if (!valid)
        return res.status(400).json({ success: false, message: "Invalid OTP" });

      return res.json({ success: true, message: "OTP verified successfully" });
    } catch (err) {
      console.error("Verify OTP Error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to verify OTP" });
    }
  },
};
