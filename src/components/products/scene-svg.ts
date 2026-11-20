import type { VisualKind } from "@/content/types";
import { getScene } from "./product-scenes";

export const visualKinds: VisualKind[] = [
  "tmt", "flat-bar", "angle", "l-clamp", "square-rod", "round-rod",
  "solar-panel", "energy-meter", "acdb", "dcdb", "lightning-arrester", "earthing-pit",
  "dc-cable", "down-conductor", "conduit-pipe", "conduit-fitting", "ss-screw", "ss-bolt", "mounting-clamp",
];

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Standalone SVG document for a product illustration (served from /visuals/<kind>[-dark].svg). */
export function sceneSvg(kind: VisualKind, tone: "light" | "dark") {
  const s = getScene(kind);
  const shadow = `<ellipse cx="${s.shadow.cx.toFixed(1)}" cy="${s.shadow.cy.toFixed(1)}" rx="${s.shadow.rx.toFixed(1)}" ry="${s.shadow.ry.toFixed(1)}" fill="${tone === "dark" ? "#000" : "#151515"}" opacity="${tone === "dark" ? 0.45 : 0.12}"/>`;
  const body = s.items
    .map((it) => {
      if (it.t === "poly") return `<polygon points="${it.points}" fill="${it.fill}" stroke="${it.stroke}" stroke-width="${it.sw}" stroke-linejoin="round"${it.opacity !== undefined ? ` opacity="${it.opacity}"` : ""}/>`;
      if (it.t === "line") return `<polyline points="${it.points}" fill="none" stroke="${it.stroke}" stroke-width="${it.sw}" stroke-linecap="round" stroke-linejoin="round"${it.opacity !== undefined ? ` opacity="${it.opacity}"` : ""}${it.dash ? ` stroke-dasharray="${it.dash}"` : ""}/>`;
      return `<text transform="${it.transform}" font-size="${it.size}" fill="${it.fill}" font-weight="${it.weight}" font-family="JetBrains Mono, ui-monospace, monospace">${esc(it.text)}</text>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.viewBox}">${shadow}${body}</svg>`;
}

export const visualSrc = (kind: VisualKind, tone: "light" | "dark" = "light") => `/visuals/${kind}${tone === "dark" ? "-dark" : ""}.svg`;
