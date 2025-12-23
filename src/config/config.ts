import "dotenv/config";

const _config: Config = {
  PORT: process.env.PORT || 5000,
  APP_URL: process.env.APP_URL || "http://localhost:5000",
};

export const config: Readonly<Config> = Object.freeze(_config);
