import { config as dotenvConfig } from "dotenv";
import { z } from "zod";
import type { StringValue } from "ms";

dotenvConfig();

/**
 * Runtime env validation + static typing
 * Fails fast on boot if anything is missing or invalid
 */
const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  APP_URL: z.string().default("http://localhost:5000"),
  DATABASE_URL: z.string().min(1),

  NODE_ENV: z.enum(["development", "production"]).default("development"),

  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),

  ACCESS_TOKEN_EXPIRES_IN: z.string() as z.ZodType<StringValue>,
  REFRESH_TOKEN_EXPIRES_IN: z.string() as z.ZodType<StringValue>,

  // Redis
  REDIS_PORT: z.string().default("6379"),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_URL: z.string().optional(),
  REDIS_HOST: z.string().min(1),
  REDIS_USERNAME: z.string().min(1),

  // SMTP
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
});

export type Config = z.infer<typeof envSchema>;

export const config: Config = envSchema.parse(process.env);
