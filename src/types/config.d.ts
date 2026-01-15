export type StringValue = string;

export type Config = {
  PORT: number;
  APP_URL: string;
  DATABASE_URL: string;
  NODE_ENV: "development" | "production";
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: StringValue;
  REFRESH_TOKEN_EXPIRES_IN: StringValue;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  REDIS_URL?: string;
  REDIS_HOST: string;
  REDIS_USERNAME: string;
};
