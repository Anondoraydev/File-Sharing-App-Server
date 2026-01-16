import dotenv from "dotenv";
import type { Config } from "../types/config.ts";

dotenv.config();

const PORT = Number(process.env.PORT ?? 5000);
const NODE_ENV = (process.env.NODE_ENV ?? "development") as
  | "development"
  | "production";
const _config: Config = {
  /* ================== App ================== */
  PORT,
  NODE_ENV,
  APP_URL: process.env.APP_URL ?? `http://localhost:${PORT}`,

  /* ================== Database ================== */
  DATABASE_URL: process.env.DATABASE_URL!,

  /* ================== JWT ================== */
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",

  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN ?? "15m",

  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN ?? "30d",

  /* ================== Redis ================== */
  REDIS_HOST: process.env.REDIS_HOST ?? "127.0.0.1",
  REDIS_PORT: Number(process.env.REDIS_PORT ?? 6379),
  REDIS_USERNAME: process.env.REDIS_USERNAME ?? "",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? "",

  /* ================== SMTP ================== */
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 587),
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
};
export const config: Readonly<Config> = Object.freeze(_config);
