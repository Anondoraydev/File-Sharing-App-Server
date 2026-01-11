import nodemailer from "nodemailer";
import { config } from "../config/config.ts";

export async function sendOTPEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT),
    secure: Number(config.SMTP_PORT) === 465, // true only for 465
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
  });

  await transporter.sendMail({
    from: `"Your App" <${config.SMTP_USER}>`,
    to: email,
    subject: "Your Secure OTP",
    text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
    html: `
<div style="background:#0f172a; padding:48px 16px;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0"
    style="max-width:560px; background:#ffffff; border-radius:16px; box-shadow:0 20px 40px rgba(15,23,42,0.35); overflow:hidden;">

    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6); padding:32px; text-align:center;">
        <h1 style="margin:0; font-size:22px; color:#ffffff; letter-spacing:0.4px;">
          Your Secure OTP
        </h1>
        <p style="margin:8px 0 0; font-size:14px; color:#e0e7ff;">
          Complete your verification
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:36px 32px 24px; text-align:center;">
        <p style="margin:0 0 20px; font-size:15px; color:#374151;">
          Use the one-time password below to continue
        </p>

        <div style="
          display:inline-block;
          background:#f8fafc;
          border-radius:14px;
          padding:18px 28px;
          box-shadow:inset 0 0 0 1px #e5e7eb, 0 10px 20px rgba(99,102,241,0.15);
        ">
          <span style="
            font-size:36px;
            font-weight:800;
            letter-spacing:8px;
            color:#111827;
          ">
            ${otp}
          </span>
        </div>

        <p style="margin:24px 0 0; font-size:14px; color:#6b7280;">
          Expires in <b>5 minutes</b>
        </p>
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding:0 32px;">
        <div style="height:1px; background:#e5e7eb;"></div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:24px 32px 32px; text-align:center;">
        <p style="margin:0; font-size:13px; color:#6b7280; line-height:1.6;">
          If you didn’t request this code, your account is still safe.
          No action is required.
        </p>
      </td>
    </tr>
  </table>

  <p style="text-align:center; margin-top:20px; font-size:12px; color:#9ca3af;">
    © ${new Date().getFullYear()} Your App · Secure Authentication
  </p>
</div>
    `,
  });
}
