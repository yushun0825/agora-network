import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Body {
  email?: string;
  source?: string;
}

// Optional Resend integration. Configured only if env var present.
async function notifyResend(email: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return false;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: from,
        subject: `[AGORA waitlist] ${email}`,
        text: `New waitlist signup: ${email}\n\nTimestamp: ${new Date().toISOString()}`,
      }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "メールアドレスをご確認ください。" },
      { status: 400 },
    );
  }

  // Persistence path 1: Resend notification (free tier 100/day)
  const sent = await notifyResend(email);

  // Persistence path 2: structured log (Vercel captures stdout in logs)
  // This works even when no env vars are configured.
  console.log(
    JSON.stringify({
      kind: "agora.waitlist.signup",
      email,
      source: body.source ?? "landing",
      delivered: sent,
      ts: new Date().toISOString(),
    }),
  );

  return NextResponse.json({
    ok: true,
    message:
      "招待リストに登録しました。クローズドβ開始時にご案内いたします。",
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "AGORA waitlist API. POST to subscribe." });
}
