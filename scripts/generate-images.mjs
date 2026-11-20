/**
 * Generates Open Graph images, favicons and the organisation logo PNG from the
 * supplied logo and the site's photography, using a local Chrome via playwright-core.
 *
 *   npm i -D playwright-core   (once)
 *   CHROME_PATH=/usr/bin/google-chrome node scripts/generate-images.mjs
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const dataUrl = (p) => `data:image/jpeg;base64,${fs.readFileSync(path.join(root, p)).toString("base64")}`;

const logoLight = read("public/brand/mindraze-logo-light.svg");
const logoDark = read("public/brand/mindraze-logo.svg");
const markDark = read("public/brand/mindraze-mark.svg");
const markLight = read("public/brand/mindraze-mark-light.svg");

const font = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">`;
const baseCss = `*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;overflow:hidden;font-family:Manrope,sans-serif}.eyebrow{font-family:'JetBrains Mono',monospace;font-size:20px;letter-spacing:.2em;text-transform:uppercase}`;

const og = (title, eyebrow, photo) => `<!doctype html><html><head>${font}<style>${baseCss}
body{background:#080808;color:#f8f8f3;position:relative}
.bg{position:absolute;inset:0;background:url(${photo}) center/cover;filter:grayscale(.2)}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,#080808 0%,rgba(8,8,8,.92) 45%,rgba(8,8,8,.35) 100%)}
.wrap{position:absolute;inset:64px;display:flex;flex-direction:column;justify-content:space-between}
.logo svg{height:150px;width:auto}
h1{font-size:76px;line-height:.98;letter-spacing:-.04em;font-weight:600;max-width:820px;text-wrap:balance}
.eyebrow{color:#b9bc5d;margin-bottom:22px}
.bar{position:absolute;left:0;bottom:0;height:10px;width:100%;background:#b9bc5d}
</style></head><body><div class="bg"></div><div class="shade"></div><div class="wrap"><div class="logo">${logoLight}</div><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></div></div><div class="bar"></div></body></html>`;

const ogHome = `<!doctype html><html><head>${font}<style>${baseCss}
body{background:#b9bc5d;color:#0e0904;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:0 80px;gap:40px}
.logo svg{width:100%;height:auto}
h1{font-size:62px;line-height:1;letter-spacing:-.04em;font-weight:600}
ul{list-style:none;padding:0;margin-top:34px;display:grid;gap:12px}
li{font-size:24px;font-weight:600;display:flex;gap:14px;align-items:center}
li span{font-family:'JetBrains Mono',monospace;font-size:18px;opacity:.6}
</style></head><body><div class="logo">${logoDark}</div><div><h1>Three Industries. One Vision. Endless Possibilities.</h1><ul><li><span>01</span>Steel Trading</li><li><span>02</span>Solar Energy Solutions</li><li><span>03</span>IT Services & Digital Solutions</li></ul></div></body></html>`;

const square = (size, svg, pad, bg, radius = 0) => `<!doctype html><html><head><style>*{margin:0}body{width:${size}px;height:${size}px;background:transparent}div{width:${size}px;height:${size}px;background:${bg};border-radius:${radius}px;display:grid;place-items:center}svg{width:${size - pad * 2}px;height:auto}</style></head><body><div>${svg}</div></body></html>`;

const jobs = [
  { file: "public/og/mindraze-global.png", html: ogHome, w: 1200, h: 630 },
  { file: "public/og/steel-trading.png", html: og("Steel Solutions for Stronger Foundations.", "01 · Steel Trading", dataUrl("src/assets/images/steel/steel-beams.jpg")), w: 1200, h: 630 },
  { file: "public/og/solar-solutions.png", html: og("Make the Sun Work for You.", "02 · Solar Energy Solutions", dataUrl("src/assets/images/solar/solar-cells-sunlit.jpg")), w: 1200, h: 630 },
  { file: "public/og/it-services.png", html: og("Digital Ideas. Intelligent Solutions. Measurable Growth.", "03 · IT Services", dataUrl("src/assets/images/it/code-workspace.jpg")), w: 1200, h: 630 },
  { file: "public/brand/mindraze-logo-olive.png", html: square(1024, logoDark, 120, "#b9bc5d"), w: 1024, h: 1024 },
  { file: "src/app/apple-icon.png", html: square(180, markDark, 26, "#b9bc5d"), w: 180, h: 180 },
  { file: "public/icons/icon-192.png", html: square(192, markDark, 28, "#b9bc5d"), w: 192, h: 192 },
  { file: "public/icons/icon-512.png", html: square(512, markDark, 72, "#b9bc5d"), w: 512, h: 512 },
  { file: "public/icons/icon-maskable-512.png", html: square(512, markDark, 120, "#b9bc5d"), w: 512, h: 512 },
  { file: "scripts/.favicon-64.png", html: square(64, markLight, 6, "#151515", 14), w: 64, h: 64, transparent: true },
];

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
for (const job of jobs) {
  const page = await browser.newPage({ viewport: { width: job.w, height: job.h } });
  await page.setContent(job.html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.dirname(path.join(root, job.file)), { recursive: true });
  await page.screenshot({ path: path.join(root, job.file), omitBackground: Boolean(job.transparent) });
  await page.close();
  console.log("wrote", job.file);
}
await browser.close();
