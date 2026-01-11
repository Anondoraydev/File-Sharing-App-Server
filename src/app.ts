import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config/config.ts";
import type { Application, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.ts";
import router from "./routes/auth.route.ts";
import fileShareRouter from "./routes/file.route.ts";

const app: Application = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: config.APP_URL,
    credentials: true,
    maxAge: 3600,
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  console.log(req.cookies);
  return res.send("Server is running!!!");
});

app.use("/api/v1/", router);
app.use("/api/v1/", fileShareRouter);
app.use(errorHandler);

export default app;
