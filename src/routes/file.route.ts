import express, { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.ts";
import { fileUpload, getFileInfo } from "../controllers/file.controller.ts";

const router: Router = express.Router();

router.post("/files", upload.single("file"), fileUpload);
router.get("/files/:uuid", getFileInfo);

export default router;
