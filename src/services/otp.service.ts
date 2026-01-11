import crypto from "crypto";
import { redisClient, connectRedis } from "../config/redis.config.ts";
import { sendOTPEmail } from "../utils/emailSender.ts";
import { User } from "../models/user.schema.ts";

const OTP_TTL_SECONDS = 2 * 60;
const OTP_PREFIX = "otp";

/**
 * Generate a 6-digit OTP
 */
function createOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Store OTP in Redis
 */
async function storeOTP(email: string, otp: string, ttl = OTP_TTL_SECONDS) {
  await redisClient.setEx(`${OTP_PREFIX}:${email}`, ttl, otp);
}

/**
 * Send OTP to email
 */
export async function sendOTP(email: string): Promise<void> {
  await connectRedis();

  const otp = createOTP();
  await storeOTP(email, otp);

  await sendOTPEmail(email, otp);
}

/**
 * Verify OTP
 */
export async function verifyOTP(
  email: string,
  inputOTP: string
): Promise<boolean> {
  await connectRedis();

  const key = `${OTP_PREFIX}:${email}`;
  const storedOTP = await redisClient.get(key);

  if (!storedOTP) return false;
  if (storedOTP !== inputOTP) return false;

  // prevent replay
  await redisClient.del(key);
  try {
    // mark user as verified in DB after successful OTP verification
    await User.findOneAndUpdate({ email }, { emailVerification: true });
  } catch (err) {
    console.error(
      "Failed to update user emailVerification after verifying OTP:",
      err
    );
  }
  return true;
}
