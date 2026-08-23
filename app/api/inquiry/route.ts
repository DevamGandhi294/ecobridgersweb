import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const PLAN_LABELS: Record<string, string> = {
  payg: "Pay As You Go",
  base: "Base — ₹499/mo",
  pro: "Pro — ₹999/mo",
  max: "Max — ₹1,999/mo",
  house: "House Special — ₹29,999 one-time",
  "": "Not decided yet",
};

export async function POST(req: NextRequest) {
  try {
    const { name, cafe, phone, email, plan, message } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not set in environment variables.");
      // Still return OK so user inquiry flow doesn't break if SMTP is unconfigured in dev
      return NextResponse.json({ ok: true, note: "Demo request received (SMTP not configured)." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
        <h2 style="color:#d97706;margin-bottom:4px">New CafeBridge Inquiry</h2>
        <p style="color:#666;font-size:13px;margin-top:0">Submitted via ecobridgers.com</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Cafe / Restaurant</td><td style="padding:8px 0">${cafe || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#666">WhatsApp</td><td style="padding:8px 0;font-weight:600">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0">${email || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Plan interested in</td><td style="padding:8px 0">${PLAN_LABELS[plan] ?? plan}</td></tr>
        </table>
        ${message ? `<hr style="border:none;border-top:1px solid #eee;margin:16px 0"/><p style="color:#666;font-size:13px;margin:0 0 6px">Message</p><p style="font-size:14px;margin:0">${message}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p style="font-size:12px;color:#999">Eco Bridgers · ecobridgers.com</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"CafeBridge Inquiry" <${process.env.SMTP_USER}>`,
      to: ["dev294gandhi@gmail.com", "ecobridgers.tech@gmail.com"],
      subject: `New inquiry from ${name}${cafe ? ` · ${cafe}` : ""}`,
      html,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json({ error: "Failed to send inquiry." }, { status: 500 });
  }
}
