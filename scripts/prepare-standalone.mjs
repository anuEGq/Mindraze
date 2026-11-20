// Copies static assets into the standalone server bundle (required by `output: "standalone"`).
import { cpSync, existsSync } from "node:fs";

if (process.env.NETLIFY) {
  console.log("Netlify build: skipping standalone copy (handled by the Netlify Next.js adapter)");
} else if (existsSync(".next/standalone")) {
  cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
  cpSync("public", ".next/standalone/public", { recursive: true });
  console.log("standalone bundle ready: node .next/standalone/server.js");
}
