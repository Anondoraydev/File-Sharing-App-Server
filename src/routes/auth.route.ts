import express, { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";

const router: Router = express.Router();

router.post("/auth/register", AuthController.register);

export default router;
