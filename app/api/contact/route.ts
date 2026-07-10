import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  message: z.string().min(10).max(4000),
  // honeypot — real users leave this empty
  company: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { name, email, message, company } = parsed.data;

  // Silently accept honeypot hits (likely bots) without sending.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  // Not configured → tell the client to use its mailto: fallback.
  if (!apiKey || !to) {
    return NextResponse.json({ ok: false, fallback: true }, { status: 200 });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to: [to],
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ ok: false, fallback: true }, { status: 200 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Package missing or transient failure → graceful fallback.
    return NextResponse.json({ ok: false, fallback: true }, { status: 200 });
  }
}
