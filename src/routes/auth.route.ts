import express, { Router } from "express";
import { registerController } from "../controllers/auth.controller.ts";

const router: Router = express.Router();

router.post("/auth/register", registerController);

export default router;
