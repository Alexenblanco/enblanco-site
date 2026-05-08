import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

import { CONTACT_EMAIL } from "@/lib/site-config";
import { isValidEmail, normalizeEmail } from "@/lib/email-validation";
import { getSiteUrl } from "@/lib/seo";

/**
 * Required env vars:
 * - RESEND_API_KEY: API key used to send emails via Resend.
 */
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 20 * 60 * 1000; // 20 min
const MAX_BODY_BYTES = 64 * 1024;
const NAME_MIN = 2;
const MESSAGE_MIN = 10;

const rateLimitMap = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let timestamps = rateLimitMap.get(ip) ?? [];
  timestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");

  // In production, browser POSTs should include Origin. Tests/dev tooling may omit it.
  if (!origin) return process.env.NODE_ENV !== "production";

  try {
    const allowedOrigins = new Set([
      new URL(getSiteUrl()).origin,
      request.nextUrl.origin,
    ]);
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function hasAcceptableBodySize(request: NextRequest): boolean {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return true;
  const bytes = Number(contentLength);
  return Number.isFinite(bytes) && bytes <= MAX_BODY_BYTES;
}

function escapePlain(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .slice(0, 50_000);
}

type ResendClient = {
  emails: {
    send: (params: {
      from: string;
      to: string;
      subject: string;
      text: string;
      replyTo?: string | string[];
      headers?: Record<string, string>;
    }) => Promise<{ error: unknown }> | { error: unknown };
  };
};
type ResendFactory = (apiKey: string) => ResendClient;
let createResendClient: ResendFactory = (apiKey) => new Resend(apiKey);

/** Test hook to inject a mocked Resend client factory. */
export function __setResendFactoryForTests(factory?: ResendFactory) {
  createResendClient = factory ?? ((apiKey: string) => new Resend(apiKey));
}

export type LeadType = "project" | "contact" | "talent";

export interface LeadPayload {
  lang: string;
  pageUrl: string;
  type: LeadType;
  name: string;
  email: string;
  phone?: string;
  company?: string; // honeypot
  servicesInterested?: string[];
  message: string;
  acceptPrivacyPolicy: boolean;
}

function validate(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "validation" };
  const b = body as Record<string, unknown>;
  const type = b.type as string | undefined;
  if (type !== "project" && type !== "contact" && type !== "talent")
    return { ok: false, error: "validation" };
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = normalizeEmail(b.email);
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const acceptPrivacyPolicy = b.acceptPrivacyPolicy === true;
  if (name.length < NAME_MIN) return { ok: false, error: "validation" };
  if (!isValidEmail(email)) return { ok: false, error: "validation" };
  if (message.length < MESSAGE_MIN) return { ok: false, error: "validation" };
  if (!acceptPrivacyPolicy) return { ok: false, error: "validation" };
  if (type === "project") {
    const services = b.servicesInterested;
    if (!Array.isArray(services) || services.length === 0) return { ok: false, error: "validation" };
  }
  const honeypot = typeof b.company === "string" ? b.company.trim() : "";
  if (honeypot.length > 0) return { ok: false, error: "validation" };

  const phone = typeof b.phone === "string" ? b.phone.trim() || undefined : undefined;
  const servicesInterested =
    type === "project" && Array.isArray(b.servicesInterested)
      ? (b.servicesInterested as string[]).filter((s) => typeof s === "string")
      : undefined;
  const lang = typeof b.lang === "string" ? b.lang : "es";
  const pageUrl = typeof b.pageUrl === "string" ? b.pageUrl : "";

  return {
    ok: true,
    data: {
      lang,
      pageUrl,
      type,
      name,
      email,
      phone,
      servicesInterested,
      message,
      acceptPrivacyPolicy,
    },
  };
}

function buildEmailBody(data: LeadPayload): string {
  const lines: string[] = [
    `Tipo de lead: ${data.type}`,
    `Idioma: ${data.lang}`,
    `Nombre: ${escapePlain(data.name)}`,
    `Email: ${escapePlain(data.email)}`,
    data.phone ? `Teléfono: ${escapePlain(data.phone)}` : "",
    data.servicesInterested?.length
      ? `Servicios de interés: ${data.servicesInterested.map(escapePlain).join(", ")}`
      : "",
    "",
    "Mensaje (texto original):",
    "---",
    data.message,
    "---",
    "",
    `URL de envío: ${data.pageUrl || "(no indicada)"}`,
    `Timestamp: ${new Date().toISOString()}`,
  ];
  return lines.filter(Boolean).join("\n");
}

function getSubject(type: LeadType): string {
  const labels: Record<LeadType, string> = {
    project: "Proyecto",
    contact: "Contacto",
    talent: "Talento",
  };
  return `[enblanco] Nuevo lead — ${labels[type]}`;
}

async function persistFailedLead(data: LeadPayload): Promise<void> {
  try {
    const dir = join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    const file = join(dir, "failed-leads.json");
    const line = JSON.stringify({ ...data, failedAt: new Date().toISOString() }) + "\n";
    await writeFile(file, line, { flag: "a" });
  } catch {
    // En serverless (Vercel) el filesystem puede no ser persistente o ser de solo lectura.
    // Considerar Vercel KV/Blob para producción. Aquí solo registramos y no bloqueamos.
    console.error("[lead] Failed to persist failed lead (fallback store)");
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  if (!hasAcceptableBodySize(request)) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const validated = validate(body);
  if (!validated.ok) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
  }
  const data = validated.data;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = "Web Enblanco <web@agenciaenblanco.com>";

  if (!apiKey) {
    await persistFailedLead(data);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }

  const resend = createResendClient(apiKey);
  const subject = getSubject(data.type);
  const text = buildEmailBody(data);

  let error: unknown = null;
  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_EMAIL,
      subject,
      text,
      replyTo: data.email,
      headers: { "X-Lead-Type": data.type },
    });
    error = result.error;
  } catch (sendError) {
    error = sendError;
  }

  if (error) {
    await persistFailedLead(data);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
