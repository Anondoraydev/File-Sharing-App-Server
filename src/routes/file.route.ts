import express, { Router } from "express";
import type { Request, Response } from "express";
import { upload } from "../middlewares/multer.middlewares.ts";

const router: Router = express.Router();

router
  .route("/file-share")
  .post(upload.single("file"), (req: Request, res: Response) => {
    console.log(req.file);
    res.send("File uploaded successfully");
  });

export default router;
