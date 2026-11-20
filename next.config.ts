import { randomBytes } from "node:crypto";
import type { NextConfig } from "next";

// One random secret per build, inherited by build workers, used to sign enquiry form tokens
// when ENQUIRY_SECRET isn't set. Only referenced from server-only code.
process.env.ENQUIRY_BUILD_SECRET ||= randomBytes(32).toString("hex");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Self-contained server bundle in .next/standalone for VPS/Apache-proxy deployments.
  output: "standalone",
  // Never copy the local enquiry log (customer data) into the deployable bundle.
  outputFileTracingExcludes: { "*": [".data/**", "tests/**", "scripts/**", "Logo/**", "docs/**"] },
  poweredByHeader: false,
  // Fixed at build time so serverless re-renders (which only see runtime variables) match the build.
  env: {
    ENQUIRY_BUILD_SECRET: process.env.ENQUIRY_BUILD_SECRET,
    BUILD_SITE_URL: process.env.URL ?? "",
    SITE_NOINDEX: process.env.SITE_NOINDEX ?? "",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/brand/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
