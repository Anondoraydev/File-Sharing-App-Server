import crypto from "crypto";
import { redisClient, connectRedis } from "../config/redis.config.ts";

/**
 * Generate a numeric OTP and store it in Redis with TTL
 * @param email - User's email address
 * @param ttlSeconds - OTP expiration time in seconds (default: 5 minutes)
 * @returns OTP string
 */
export async function generateOTP(
  email: string,
  ttlSeconds = 300
): Promise<string> {
  // Generate a 6-digit numeric OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Ensure Redis connection
  await connectRedis();

  // Save OTP in Redis with expiration (use setEx)
  await redisClient.setEx(`otp:${email}`, ttlSeconds, otp);

  return otp;
}

/**
 * Verify the OTP entered by the user
 * @param email - User's email
 * @param inputOTP - OTP entered by user
 * @returns boolean - true if OTP is valid, false otherwise
 */
export async function verifyOTP(
  email: string,
  inputOTP: string
): Promise<boolean> {
  // Ensure Redis connection
  await connectRedis();

  // Get stored OTP from Redis
  const storedOTP = await redisClient.get(`otp:${email}`);

  if (!storedOTP) return false; // OTP expired or not generated
  if (storedOTP !== inputOTP) return false; // OTP mismatch

  // OTP verified, remove from Redis to prevent reuse
  await redisClient.del(`otp:${email}`);

  return true;
}
