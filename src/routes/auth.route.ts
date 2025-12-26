import express from "express";
import { registerService } from "../services/register.service.ts";

const router = express.Router();

//register route
router.post("/auth/register", registerService);

export default router;
