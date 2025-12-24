import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config/config.ts";

const app: Application = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: config.APP_URL,
    credentials: true,
    maxAge: 86400,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
