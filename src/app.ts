import express from "express";
import helmet from "helmet";
const app = express();
import cors from "cors";
import { config } from "./config/config.ts";
import cookieParser from "cookie-parser";

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
