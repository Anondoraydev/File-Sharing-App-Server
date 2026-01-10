import { generateOTP } from "../utils/otpGenerator.ts";
import { sendOTPEmail } from "../utils/emailSender.ts";

export async function sendOTP(email: string) {
  const otp = await generateOTP(email);
  await sendOTPEmail(email, otp);
  console.log(`OTP sent to ${email}`);
}
