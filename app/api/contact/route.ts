import { NextResponse } from "next/server";
import { z } from "zod";
import { site } from "@/data/site";
import { budgetRanges, MESSAGE_MIN_LENGTH, projectTypes } from "@/lib/contact";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  projectType: z.enum(projectTypes),
  budget: z.enum(budgetRanges),
  message: z.string().trim().min(MESSAGE_MIN_LENGTH).max(5000),
  locale: z.enum(["en", "ar"]).default("en"),
  /** Honeypot: real users never see or fill this field. */
  company: z.string().max(0).optional(),
});

// Best-effort rate limit per server instance (serverless instances don't share memory).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

async function deliver(lead: z.infer<typeof schema>) {
  const text = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Project type: ${lead.projectType}`,
    `Budget: ${lead.budget}`,
    `Language: ${lead.locale}`,
    "",
    lead.message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY not set — logging lead instead of emailing it:\n" + text);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? site.contact.email],
      reply_to: lead.email,
      subject: `New project enquiry — ${lead.name} (${lead.projectType})`,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot looks like success to the bot but is silently dropped.
    if (parsed.error.issues.some((issue) => issue.path[0] === "company")) {
      return NextResponse.json({ ok: true });
    }
    const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))];
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 422 });
  }

  try {
    await deliver(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
