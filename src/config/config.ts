import "dotenv/config";

const _config: Config = {
  PORT: process.env.PORT || 5000,
  APP_URL: process.env.APP_URL || "http://localhost:5000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  nodeEnv: process.env.NODE_ENV || "development",
};

export const config: Config = Object.freeze(_config);
