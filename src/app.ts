import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config/config.ts";
import type { Application, Request, Response } from "express";
import { ApiError } from "./utils/apiError.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

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

app.get("/helth", (req: Request, res: Response) => {
  throw new ApiError("something went wrong", 500);
  // throw new ApiError("something went wrong", 500);
  res.send("Hello World!");
});

app.use(errorHandler)

export default app;
