import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config/config.ts";
import type { Application, Request, Response } from "express"; // { Application } from "express";

const app: Application = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: config.APP_URL,
    credentials: true,
    maxAge: 86400,
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
