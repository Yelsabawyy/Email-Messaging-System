import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { subject, emails, message, yourEmail, smtpPassword } =
      await req.json();
    if (
      !subject ||
      !emails ||
      emails.length === 0 ||
      !message ||
      !yourEmail ||
      !smtpPassword
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: yourEmail,
        pass: smtpPassword,
      },
    });

    for (const email of emails) {
      await transporter.sendMail({
        from: `<${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        text: message,
      });
    }

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
