import { describe, expect, it } from "vitest";
import { issueToken, MAX_TOKEN_AGE_MS, MIN_FILL_MS, rateLimit, verifyToken } from "@/lib/enquiry/security";

describe("form tokens", () => {
  it("rejects missing and forged tokens", () => {
    expect(verifyToken(undefined)).toEqual({ ok: false, reason: "missing" });
    expect(verifyToken("123.abc.def")).toEqual({ ok: false, reason: "invalid" });
  });

  it("rejects submissions faster than the minimum fill time", () => {
    const t0 = 1_000_000;
    const token = issueToken(t0);
    expect(verifyToken(token, t0 + 500)).toEqual({ ok: false, reason: "too-fast" });
    expect(verifyToken(token, t0 + MIN_FILL_MS + 1)).toEqual({ ok: true });
  });

  it("expires old tokens", () => {
    const t0 = 2_000_000;
    expect(verifyToken(issueToken(t0), t0 + MAX_TOKEN_AGE_MS + 1)).toEqual({ ok: false, reason: "expired" });
  });

  it("detects tampering with the timestamp", () => {
    const token = issueToken(3_000_000);
    const [, nonce, sig] = token.split(".");
    expect(verifyToken(`2000000.${nonce}.${sig}`, 9_000_000)).toEqual({ ok: false, reason: "invalid" });
  });
});

describe("rateLimit", () => {
  it("allows five submissions per window, then blocks", () => {
    const ip = `test-${Math.random()}`;
    const now = 10_000_000;
    for (let i = 0; i < 5; i++) expect(rateLimit(ip, now + i).ok).toBe(true);
    const blocked = rateLimit(ip, now + 10);
    expect(blocked.ok).toBe(false);
    expect(rateLimit(ip, now + 11 * 60 * 1000).ok).toBe(true);
  });
});
