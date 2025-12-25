

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
