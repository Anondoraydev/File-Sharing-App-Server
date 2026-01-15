import express, { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { otpController } from "../controllers/otp.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { getMeController } from "../controllers/getMe.controller.ts";

const router: Router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/send-otp", otpController.sendOTP);
router.post("/verify-otp", otpController.verifyOTP);
router.get("/me", getMeController);
export default router;
