/**
 * Tiny isometric renderer (pure functions, server-safe) used for technical product
 * illustrations. Solids are built from extruded 2D sections; faces are back-face
 * culled against the iso viewer, flat-shaded with a fixed light and depth-sorted.
 */

export type V3 = [number, number, number];
export type V2 = [number, number];

export type Material = { dark: string; light: string; stroke?: string; smooth?: boolean };

export type Prim =
  | { kind: "face"; pts: V3[]; n: V3; mat: Material; bias?: number; opacity?: number; flat?: string }
  | { kind: "line"; pts: V3[]; stroke: string; width: number; bias?: number; opacity?: number; dash?: string }
  | { kind: "text"; at: V3; u: V3; v: V3; text: string; size: number; fill: string; bias?: number; weight?: number };

const C30 = Math.cos(Math.PI / 6);
export const project = ([x, y, z]: V3): V2 => [(x - y) * C30, (x + y) * 0.5 - z];
const VIEW: V3 = [1, 1, 1];
const LIGHT: V3 = (() => {
  const l: V3 = [0.5, 0.2, 1];
  const m = Math.hypot(...l);
  return [l[0] / m, l[1] / m, l[2] / m];
})();

const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const scale = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V3): V3 => {
  const m = Math.hypot(...a) || 1;
  return [a[0] / m, a[1] / m, a[2] / m];
};

function hexToRgb(h: string) {
  const v = parseInt(h.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
export function mixHex(a: string, b: string, t: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return `#${A.map((v, i) => Math.round(v + (B[i] - v) * Math.min(1, Math.max(0, t))).toString(16).padStart(2, "0")).join("")}`;
}

export function shadeColor(mat: Material, n: V3) {
  const b = 0.18 + 0.82 * Math.max(0, dot(norm(n), LIGHT));
  return mixHex(mat.dark, mat.light, b);
}

// ---------------------------------------------------------------- materials
export const M = {
  steel: { dark: "#24251f", light: "#d6d8cf" },
  tmt: { dark: "#141513", light: "#8e9087" },
  chrome: { dark: "#3a3b36", light: "#f4f5ef" },
  olive: { dark: "#3d3f12", light: "#e8e9c9" },
  oliveBright: { dark: "#6f7230", light: "#f3f4dc" },
  ink: { dark: "#050505", light: "#33352d" },
  cell: { dark: "#07080a", light: "#2b2e2c" },
  plastic: { dark: "#7d7e76", light: "#fbfbf6" },
  pvc: { dark: "#8a8b84", light: "#f4f4ee" },
  concrete: { dark: "#4d4e48", light: "#c4c5bc" },
  copper: { dark: "#4a2a12", light: "#e7b07c" },
  cableBlack: { dark: "#060606", light: "#3e3f3a" },
  cableRed: { dark: "#3d120b", light: "#b5503a" },
  aluminium: { dark: "#4f514b", light: "#eceee6" },
} satisfies Record<string, Material>;

// ---------------------------------------------------------------- builders
type Axis = "x" | "y" | "z";

/** Map 2D section coords (u, v) at position s along the axis into 3D (right-handed frames). */
function frame(axis: Axis, u: number, v: number, s: number): V3 {
  if (axis === "x") return [s, u, v];
  if (axis === "y") return [v, s, u];
  return [u, v, s];
}
function axisVec(axis: Axis): V3 {
  return axis === "x" ? [1, 0, 0] : axis === "y" ? [0, 1, 0] : [0, 0, 1];
}
function signedArea(poly: V2[]) {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

/** Extrude a 2D section along an axis from `start` for `len`, offset by `origin`. */
export function extrude(section: V2[], axis: Axis, start: number, len: number, mat: Material, origin: V3 = [0, 0, 0], smoothSides = false): Prim[] {
  const sec = signedArea(section) < 0 ? [...section].reverse() : section;
  const a0 = sec.map(([u, v]) => add(frame(axis, u, v, start), origin));
  const a1 = sec.map(([u, v]) => add(frame(axis, u, v, start + len), origin));
  const ax = axisVec(axis);
  const prims: Prim[] = [
    { kind: "face", pts: [...a0].reverse(), n: scale(ax, -1), mat },
    { kind: "face", pts: a1, n: ax, mat },
  ];
  for (let i = 0; i < sec.length; i++) {
    const j = (i + 1) % sec.length;
    const eu = sec[j][0] - sec[i][0];
    const ev = sec[j][1] - sec[i][1];
    const n2 = frame(axis, ev, -eu, 0);
    prims.push({ kind: "face", pts: [a0[i], a0[j], a1[j], a1[i]], n: n2, mat: smoothSides ? { ...mat, smooth: true } : mat });
  }
  return prims;
}

export const circle = (r: number, n = 28, cu = 0, cv = 0, rot = 0): V2[] =>
  Array.from({ length: n }, (_, i) => {
    const t = rot + (i / n) * Math.PI * 2;
    return [cu + r * Math.cos(t), cv + r * Math.sin(t)];
  });

export const rect = (u0: number, v0: number, u1: number, v1: number): V2[] => [
  [u0, v0],
  [u1, v0],
  [u1, v1],
  [u0, v1],
];

export const hexagon = (r: number, cu = 0, cv = 0) => circle(r, 6, cu, cv, Math.PI / 6);

export function box(o: V3, w: number, d: number, h: number, mat: Material) {
  return extrude(rect(o[0], o[1], o[0] + w, o[1] + d), "z", o[2], h, mat);
}

export function cylinder(axis: Axis, cu: number, cv: number, r: number, start: number, len: number, mat: Material, segs = 28) {
  return extrude(circle(r, segs, cu, cv), axis, start, len, mat, [0, 0, 0], true);
}

/** Cone along an axis: base circle at `start`, apex at start+len. */
export function cone(axis: Axis, cu: number, cv: number, r: number, start: number, len: number, mat: Material, segs = 24): Prim[] {
  const base = circle(r, segs, cu, cv).map(([u, v]) => frame(axis, u, v, start));
  const apex = frame(axis, cu, cv, start + len);
  const ax = axisVec(axis);
  const prims: Prim[] = [{ kind: "face", pts: [...base].reverse(), n: scale(ax, -1), mat }];
  for (let i = 0; i < segs; i++) {
    const p = base[i];
    const q = base[(i + 1) % segs];
    const n = norm(cross(sub(q, p), sub(apex, p)));
    prims.push({ kind: "face", pts: [p, q, apex], n, mat: { ...mat, smooth: true } });
  }
  return prims;
}

/** A flat polygon lying on a plane: origin + u*U + v*V for each (u,v). */
export function planar(origin: V3, U: V3, V: V3, poly: V2[], mat: Material, bias = 0.5, flat?: string): Prim {
  const pts = poly.map(([u, v]) => add(origin, add(scale(U, u), scale(V, v))));
  let n = norm(cross(U, V));
  // Detail planes are always meant to face the viewer.
  if (dot(n, VIEW) < 0) n = scale(n, -1);
  return { kind: "face", pts, n, mat, bias, flat };
}

export function line(pts: V3[], stroke: string, width = 1, bias = 0.6, opacity = 1, dash?: string): Prim {
  return { kind: "line", pts, stroke, width, bias, opacity, dash };
}

// ---------------------------------------------------------------- render
export type RenderedScene = {
  viewBox: string;
  items: (
    | { t: "poly"; points: string; fill: string; stroke: string; sw: number; opacity?: number }
    | { t: "line"; points: string; stroke: string; sw: number; opacity?: number; dash?: string }
    | { t: "text"; x: number; y: number; transform: string; text: string; size: number; fill: string; weight: number }
  )[];
  shadow: { cx: number; cy: number; rx: number; ry: number };
};

const fmt = (p: V2) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;

export function render(prims: Prim[], pad = 18): RenderedScene {
  const visible = prims.filter((p) => p.kind !== "face" || dot(p.n, VIEW) > 1e-6);
  const depth = (p: Prim) => {
    const pts = p.kind === "text" ? [p.at] : p.pts;
    const c = pts.reduce((s, q) => s + q[0] + q[1] + q[2], 0) / pts.length;
    return c + (p.bias ?? 0);
  };
  visible.sort((a, b) => depth(a) - depth(b));

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, maxGround = -Infinity;
  const items: RenderedScene["items"] = [];
  for (const p of visible) {
    if (p.kind === "text") {
      const [x, y] = project(p.at);
      const [ux, uy] = project(p.u);
      const [vx, vy] = project(p.v);
      // text x-axis -> U, text y-axis (down) -> -V
      items.push({ t: "text", x: 0, y: 0, transform: `matrix(${ux.toFixed(3)} ${uy.toFixed(3)} ${(-vx).toFixed(3)} ${(-vy).toFixed(3)} ${x.toFixed(1)} ${y.toFixed(1)})`, text: p.text, size: p.size, fill: p.fill, weight: p.weight ?? 600 });
      continue;
    }
    const proj = p.pts.map(project);
    for (const [x, y] of proj) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    for (const q of p.pts) if (q[2] <= 0.5) maxGround = Math.max(maxGround, project(q)[1]);
    if (p.kind === "line") {
      items.push({ t: "line", points: proj.map(fmt).join(" "), stroke: p.stroke, sw: p.width, opacity: p.opacity, dash: p.dash });
    } else {
      const fill = p.flat ?? shadeColor(p.mat, p.n);
      const stroke = p.mat.smooth ? fill : p.mat.stroke ?? mixHex(fill, "#000000", 0.35);
      items.push({ t: "poly", points: proj.map(fmt).join(" "), fill, stroke, sw: p.mat.smooth ? 0.6 : 0.7, opacity: p.opacity });
    }
  }
  const w = maxX - minX;
  const h = maxY - minY;
  const groundY = Number.isFinite(maxGround) ? maxGround : maxY;
  return {
    viewBox: `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(w + pad * 2).toFixed(1)} ${(h + pad * 2).toFixed(1)}`,
    items,
    shadow: { cx: minX + w / 2, cy: groundY + 4, rx: w * 0.42, ry: Math.max(6, w * 0.07) },
  };
}
