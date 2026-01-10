import express, { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { otpController } from "../controllers/otp.controller.ts";

const router: Router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/send-otp", otpController.sendOTP);
router.post("/verify-otp", otpController.verifyOTP);

export default router;
