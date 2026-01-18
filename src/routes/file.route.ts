import express, { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.ts";
import {
  downloadFile,
  fileUpload,
  getUserFiles,
} from "../controllers/file.controller.ts";
import { verifyAuth } from "../middlewares/auth.middleware.ts";

const router: Router = express.Router();

router.post("/upload", verifyAuth, upload.single("file"), fileUpload);
router.get("/user", verifyAuth, getUserFiles);
router.get("/download/:uuid", downloadFile);

export default router;
