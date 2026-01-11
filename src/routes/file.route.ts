import express, { Router } from "express";
import type { Request, Response } from "express";
import { upload } from "../middlewares/multer.middlewares.ts";
import { fileUpload } from "../controllers/file.controller.ts";

const router: Router = express.Router();

router.route("/file-share").post(upload.single("file"), fileUpload);

export default router;
