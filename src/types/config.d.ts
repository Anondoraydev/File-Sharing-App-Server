export type Environment = "development" | "test" | "production";

export interface Config {
  PORT: number;
  NODE_ENV: Environment;
  APP_URL: string;

  DATABASE_URL: string;

  ACCESS_TOKEN_SECRET: Secret;
  ACCESS_TOKEN_EXPIRES_IN: StringValue;

  REFRESH_TOKEN_SECRET: Secret;
  REFRESH_TOKEN_EXPIRES_IN: StringValue;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;

  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
}
