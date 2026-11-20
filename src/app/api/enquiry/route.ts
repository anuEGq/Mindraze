import { randomBytes } from "node:crypto";
import { connection } from "next/server";
import { enquirySchema } from "@/lib/enquiry/schema";
import { deliverEnquiry, type StoredEnquiry } from "@/lib/enquiry/deliver";
import { clientIp, issueToken, rateLimit, verifyToken, verifyTurnstile } from "@/lib/enquiry/security";

const json = (body: unknown, status = 200, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

/** Issues a signed form token. Called when a visitor starts filling in a form. */
export async function GET() {
  await connection();
  return json({ token: issueToken() });
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  const limited = rateLimit(ip);
  if (!limited.ok) {
    return json({ ok: false, error: "Too many enquiries from this connection. Please try again in a few minutes, or contact us on WhatsApp." }, 429, { "Retry-After": String(limited.retryAfter) });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, 422);
  }
  const data = parsed.data;

  // Honeypot filled in: pretend success so bots learn nothing.
  if (data.website) return json({ ok: true, reference: `MG-${randomBytes(3).toString("hex").toUpperCase()}` });

  const token = verifyToken(data.token);
  if (!token.ok) {
    const message =
      token.reason === "expired"
        ? "This form has been open for a long time. Please refresh the page and try again."
        : "We couldn't verify this submission. Please refresh the page and try again.";
    return json({ ok: false, error: message, code: token.reason }, 400);
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json({ ok: false, error: "Please complete the verification check and try again." }, 400);
  }

  // Drop anti-spam fields before storing.
  const { website, token: _token, turnstileToken, ...clean } = data;
  void website;
  void _token;
  void turnstileToken;
  const record: StoredEnquiry = {
    ...clean,
    reference: `MG-${Date.now().toString(36).toUpperCase().slice(-4)}${randomBytes(2).toString("hex").toUpperCase()}`,
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? "",
  };

  const result = await deliverEnquiry(record);
  if (!result.ok) {
    return json({ ok: false, error: "We couldn't send your enquiry right now. Please try again shortly, or reach us on WhatsApp." }, 502);
  }
  return json({ ok: true, reference: record.reference });
}
