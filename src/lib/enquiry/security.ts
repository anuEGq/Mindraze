import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Anti-spam helpers: a signed "form opened at" token (proves a real page load and
 * a human-plausible fill time), an in-memory rate limiter and optional Turnstile.
 */

let secret: string | undefined;
function getSecret() {
  if (secret) return secret;
  // ENQUIRY_SECRET if set; otherwise a random secret generated once per build (next.config.ts),
  // so tokens stay valid across all serverless instances of the same deployment.
  secret = process.env.ENQUIRY_SECRET?.trim() || process.env.ENQUIRY_BUILD_SECRET;
  if (!secret) {
    secret = randomBytes(32).toString("hex");
    if (process.env.NODE_ENV === "production") console.warn("[enquiry] ENQUIRY_SECRET is not set; form tokens reset whenever the server restarts.");
  }
  return secret;
}

export const MIN_FILL_MS = 2500;
export const MAX_TOKEN_AGE_MS = 1000 * 60 * 60 * 6;

const sign = (payload: string) => createHmac("sha256", getSecret()).update(payload).digest("base64url");

export function issueToken(now = Date.now()) {
  const payload = `${now}.${randomBytes(6).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

export type TokenCheck = { ok: true } | { ok: false; reason: "missing" | "invalid" | "too-fast" | "expired" };

export function verifyToken(token: string | undefined, now = Date.now()): TokenCheck {
  if (!token) return { ok: false, reason: "missing" };
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "invalid" };
  const [ts, nonce, sig] = parts;
  const expected = sign(`${ts}.${nonce}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false, reason: "invalid" };
  const age = now - Number(ts);
  if (!Number.isFinite(age) || age < MIN_FILL_MS) return { ok: false, reason: "too-fast" };
  if (age > MAX_TOKEN_AGE_MS) return { ok: false, reason: "expired" };
  return { ok: true };
}

// ------------------------------------------------------------- rate limiting
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return { ok: false as const, retryAfter: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return { ok: true as const };
}

/**
 * Client IP for rate limiting. Behind a reverse proxy, have the proxy set a header it
 * controls (e.g. Apache: RequestHeader set X-Real-IP "%{REMOTE_ADDR}s") and keep Node
 * bound to 127.0.0.1 so clients cannot reach it directly with forged headers.
 * CLIENT_IP_HEADER overrides the header name (e.g. "cf-connecting-ip" behind Cloudflare).
 */
export function clientIp(headers: Headers) {
  const preferred = process.env.CLIENT_IP_HEADER?.trim().toLowerCase();
  const pick = (name: string) => headers.get(name)?.split(",")[0]?.trim();
  return (preferred && pick(preferred)) || pick("x-real-ip") || pick("x-forwarded-for") || "unknown";
}

// ------------------------------------------------------------- Turnstile
export const turnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!turnstileEnabled()) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
