import express, { type Request, type Response } from "express";
import { registerController } from "../controllers/auth.controller.ts";

const router = express.Router();

//register route
router.post("/auth/register", registerController);

export default router;
