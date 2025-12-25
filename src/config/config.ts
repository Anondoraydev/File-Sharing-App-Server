
import { config as dotenvConfig } from "dotenv";
import type { StringValue } from "ms";
dotenvConfig();

type Config = {
  PORT: number | string;
  APP_URL: string;
  DATABASE_URL: string;
  NODE_ENV: "development" | "production";
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: StringValue;
  REFRESH_TOKEN_EXPIRES_IN: StringValue;
};

export const config: Config = {
  PORT: process.env.PORT || 5000,
  APP_URL: process.env.APP_URL || "http://localhost:5000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production") || "development",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "defaultsecret",
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || "defaultrefreshsecret",
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue,
};
