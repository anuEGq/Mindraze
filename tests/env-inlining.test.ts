import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Next.js only inlines `process.env.NAME` written literally. Dynamic access such as
 * `process.env[key]` is undefined in the browser and on serverless re-renders, which
 * silently hides configured contact details and the preview noindex flag.
 */
describe("site configuration env access", () => {
  const source = readFileSync(path.resolve(__dirname, "../src/content/site.ts"), "utf8");

  it("never reads process.env dynamically", () => {
    expect(source).not.toMatch(/process\.env\[/);
  });

  it("reads every public setting with a literal process.env reference", () => {
    for (const name of [
      "NEXT_PUBLIC_SITE_URL",
      "NEXT_PUBLIC_CONTACT_PHONE",
      "NEXT_PUBLIC_CONTACT_EMAIL",
      "NEXT_PUBLIC_WHATSAPP_NUMBER",
      "NEXT_PUBLIC_OFFICE_ADDRESS",
      "NEXT_PUBLIC_MAP_EMBED_URL",
      "NEXT_PUBLIC_SOCIAL_FACEBOOK",
      "NEXT_PUBLIC_SOCIAL_INSTAGRAM",
      "NEXT_PUBLIC_SOCIAL_LINKEDIN",
      "NEXT_PUBLIC_SOCIAL_YOUTUBE",
      "SITE_NOINDEX",
    ]) {
      expect(source).toContain(`process.env.${name}`);
    }
  });
});
