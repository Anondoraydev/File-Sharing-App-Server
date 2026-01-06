
import { config } from "../config/config.ts";
import nodemailer  from 'nodemailer';

export async function sendOTPEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE, // boolean
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Your App" <${config.SMTP_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    html: `
      <div>
        <h3>Your OTP Code</h3>
        <p><b>${otp}</b></p>
        <p>This code will expire in 5 minutes.</p>
      </div>
    `,
  });
}
