import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { site } from "@/content/site";
import { describeEnquiry, typeLabels, type Enquiry } from "./schema";

export type StoredEnquiry = Omit<Enquiry, "website" | "token" | "turnstileToken"> & {
  reference: string;
  receivedAt: string;
  ip: string;
  userAgent: string;
};

type ChannelResult = { channel: string; ok: boolean; error?: string; ephemeral?: boolean };

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function subjectFor(e: StoredEnquiry) {
  const what = e.productCategory || e.service || e.enquiryType || e.category || typeLabels[e.type];
  return `[${e.reference}] ${typeLabels[e.type]} enquiry: ${what} – ${e.name}`;
}

export function textBody(e: StoredEnquiry) {
  const rows = describeEnquiry(e).map(([k, v]) => `${k}: ${v}`);
  return [`New website enquiry ${e.reference}`, "", ...rows, "", `Page: ${e.source ?? "-"}`, `Received: ${e.receivedAt}`].join("\n");
}

function htmlBody(e: StoredEnquiry) {
  const rows = describeEnquiry(e)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b6c62;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;color:#151515;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join("");
  return `<div style="font-family:Arial,sans-serif;font-size:14px"><p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#5e6123">${escapeHtml(site.legalName)} · website enquiry</p><h2 style="margin:4px 0 16px">${escapeHtml(e.reference)}</h2><table>${rows}</table><p style="color:#77786e;font-size:12px;margin-top:16px">Page: ${escapeHtml(e.source ?? "-")} · Received ${escapeHtml(e.receivedAt)}</p></div>`;
}

async function appendLog(dir: string, e: StoredEnquiry) {
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "enquiries.ndjson"), `${JSON.stringify(e)}\n`, "utf8");
}

async function toLog(e: StoredEnquiry): Promise<ChannelResult> {
  // Set ENQUIRY_LOG_DIR to an absolute path in production (npm start does this):
  // the standalone server runs from .next/standalone, which is replaced on every build.
  const dir = process.env.ENQUIRY_LOG_DIR?.trim() || path.join(process.cwd(), ".data");
  try {
    await appendLog(dir, e);
    return { channel: "log", ok: true };
  } catch (err) {
    // Serverless hosts (Netlify, Vercel…) have a read-only filesystem apart from /tmp.
    // /tmp is temporary, so this only keeps demo submissions from failing.
    try {
      await appendLog(path.join(tmpdir(), "mindraze-enquiries"), e);
      return { channel: "log", ok: true, ephemeral: true };
    } catch {
      return { channel: "log", ok: false, error: (err as Error).message };
    }
  }
}

async function toResend(e: StoredEnquiry): Promise<ChannelResult | null> {
  const key = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ENQUIRY_TO_EMAIL?.trim();
  if (!key || !to) return null;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL?.trim() || `${site.name} Website <onboarding@resend.dev>`,
        to: to.split(",").map((s) => s.trim()),
        reply_to: e.email || undefined,
        subject: subjectFor(e),
        text: textBody(e),
        html: htmlBody(e),
      }),
      signal: AbortSignal.timeout(10000),
    });
    return { channel: "email", ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (err) {
    return { channel: "email", ok: false, error: (err as Error).message };
  }
}

async function toWebhook(e: StoredEnquiry): Promise<ChannelResult | null> {
  const url = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: subjectFor(e), text: textBody(e), enquiry: e }),
      signal: AbortSignal.timeout(10000),
    });
    return { channel: "webhook", ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (err) {
    return { channel: "webhook", ok: false, error: (err as Error).message };
  }
}

/** Sends the enquiry to every configured channel. Succeeds if at least one channel stored it. */
export async function deliverEnquiry(e: StoredEnquiry) {
  const results = (await Promise.all([toLog(e), toResend(e), toWebhook(e)])).filter((r): r is ChannelResult => r !== null);
  for (const r of results) if (!r.ok) console.error(`[enquiry] ${e.reference}: ${r.channel} delivery failed: ${r.error}`);
  const durable = results.some((r) => r.ok && !r.ephemeral);
  if (!durable && results.some((r) => r.ok)) {
    // Nothing permanent received it (no email/webhook configured on a read-only host).
    // Print it so it can at least be read in the hosting provider's function logs.
    console.warn(`[enquiry] ${e.reference} stored only in temporary storage. Configure RESEND_API_KEY or ENQUIRY_WEBHOOK_URL.\n${textBody(e)}`);
  }
  return { ok: results.some((r) => r.ok), results };
}
