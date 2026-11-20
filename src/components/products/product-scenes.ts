import type { VisualKind } from "@/content/types";
import {
  M,
  add,
  box,
  circle,
  cone,
  cylinder,
  extrude,
  hexagon,
  line,
  planar,
  rect,
  render,
  type Prim,
  type RenderedScene,
  type V2,
  type V3,
} from "./iso";

const X: V3 = [1, 0, 0];
const Y: V3 = [0, 1, 0];
const Z: V3 = [0, 0, 1];

// ---------------------------------------------------------------- steel
function ribbedBar(cy: number, cz: number, r: number, len: number, x0 = 0): Prim[] {
  const prims = cylinder("x", cy, cz, r, x0, len, M.tmt, 22);
  // transverse ribs on the visible side
  for (let x = x0 + 6; x < x0 + len - 4; x += 7) {
    const pts: V3[] = [];
    for (let k = 0; k <= 6; k++) {
      const th = (-35 + k * 25) * (Math.PI / 180);
      pts.push([x + k * 0.55, cy + r * 1.06 * Math.cos(th), cz + r * 1.06 * Math.sin(th)]);
    }
    prims.push(line(pts, "#b3b5ab", 0.9, 0.2, 0.55));
  }
  // longitudinal rib
  const th = (45 * Math.PI) / 180;
  prims.push(line([[x0 + 2, cy + r * 1.05 * Math.cos(th), cz + r * 1.05 * Math.sin(th)], [x0 + len - 1, cy + r * 1.05 * Math.cos(th), cz + r * 1.05 * Math.sin(th)]], "#c9cbc1", 0.8, 0.25, 0.5));
  return prims;
}

function tmt(): Prim[] {
  const r = 6.2;
  const pos: [number, number][] = [
    [0, r], [13, r], [26, r], [39, r],
    [6.5, r + 11.3], [19.5, r + 11.3], [32.5, r + 11.3],
    [13, r + 22.6], [26, r + 22.6],
  ];
  const prims: Prim[] = [];
  pos.forEach(([y, z], i) => prims.push(...ribbedBar(y, z, r, 170, (i % 3) * 3)));
  // binding wire bands
  for (const bx of [36, 132]) {
    // only the half of the band that faces the viewer
    const pts: V3[] = [];
    for (let k = 0; k <= 20; k++) {
      const th = ((-60 + k * 10.5) * Math.PI) / 180;
      pts.push([bx, 19.5 + 25.5 * Math.cos(th), 15 + 25.5 * Math.sin(th)]);
    }
    prims.push(line(pts, "#b9bc5d", 1.8, 60, 0.95));
  }
  // brand tag
  prims.push(planar([150, 46, 24], X, Z, rect(0, -14, 18, 0), M.olive, 40, "#b9bc5d"));
  prims.push(line([[150, 46, 24], [148, 40, 30]], "#b9bc5d", 0.8, 40));
  return prims;
}

function flatBar(): Prim[] {
  const prims: Prim[] = [];
  [0, 1, 2].forEach((i) => prims.push(...extrude(rect(i * 4, i * 5, i * 4 + 30, i * 5 + 4.5), "x", i * 8, 175, M.steel)));
  return prims;
}

function angle(): Prim[] {
  const L: V2[] = [[0, 0], [32, 0], [32, 4.5], [4.5, 4.5], [4.5, 32], [0, 32]];
  return [
    ...extrude(L, "x", 0, 175, M.steel),
    ...extrude(L.map(([u, v]) => [u + 40, v] as V2), "x", 14, 175, M.steel),
  ];
}

function holeOn(origin: V3, U: V3, V: V3, cu: number, cv: number, r: number): Prim {
  return planar(origin, U, V, circle(r, 18, cu, cv), M.ink, 0.6, "#0d0d0c");
}

function lClamp(): Prim[] {
  const prims: Prim[] = [];
  const make = (oy: number, w: number, leg1: number, leg2: number) => {
    const t = 4;
    const L: V2[] = [[0, 0], [leg1, 0], [leg1, t], [t, t], [t, leg2], [0, leg2]];
    prims.push(...extrude(L.map(([u, v]) => [u + oy, v] as V2), "x", 0, w, M.chrome));
    // holes on the horizontal leg (top face at z = t) and vertical leg inner face (y = oy + t)
    prims.push(holeOn([0, oy, t], X, Y, w / 2, leg1 * 0.66, 3.2));
    prims.push(holeOn([0, oy + t, 0], X, Z, w / 2, leg2 * 0.62, 3.2));
  };
  make(0, 26, 46, 40);
  make(58, 20, 34, 30);
  return prims;
}

function squareRod(): Prim[] {
  const prims: Prim[] = [];
  [[0, 0], [17, 0], [8.5, 15]].forEach(([y, z], i) => prims.push(...extrude(rect(y, z, y + 14, z + 14), "x", i * 6, 175, M.steel)));
  return prims;
}

function roundRod(): Prim[] {
  const prims: Prim[] = [];
  [[0, 7], [16, 7], [8, 20.5]].forEach(([y, z], i) => prims.push(...cylinder("x", y, z, 7.2, i * 6, 175, M.steel, 26)));
  return prims;
}

// ---------------------------------------------------------------- solar
function solarPanel(): Prim[] {
  const W = 150, D = 92, tilt = (24 * Math.PI) / 180, base = 26, T = 3.5;
  const zAt = (y: number) => base + (D - y) * Math.tan(tilt);
  const P = (x: number, y: number, dz = 0): V3 => [x, y, zAt(y) + dz];
  const prims: Prim[] = [];
  // legs
  prims.push(...box([10, 6, 0], 4, 4, zAt(8), M.aluminium), ...box([W - 14, 6, 0], 4, 4, zAt(8), M.aluminium));
  prims.push(...box([10, D - 10, 0], 4, 4, zAt(D - 8), M.aluminium), ...box([W - 14, D - 10, 0], 4, 4, zAt(D - 8), M.aluminium));
  // frame slab: top face and two visible edges
  const n: V3 = [0, Math.sin(tilt), Math.cos(tilt)];
  prims.push({ kind: "face", pts: [P(0, 0), P(W, 0), P(W, D), P(0, D)], n, mat: M.aluminium, bias: 1 });
  prims.push({ kind: "face", pts: [P(0, D), P(W, D), P(W, D, -T), P(0, D, -T)], n: [0, 1, 0], mat: M.aluminium, bias: 0.5 });
  prims.push({ kind: "face", pts: [P(W, 0), P(W, 0, -T), P(W, D, -T), P(W, D)], n: [1, 0, 0], mat: M.aluminium, bias: 0.5 });
  // cells
  const cols = 10, rows = 6, m = 3, g = 1.1;
  const cw = (W - 2 * m - (cols - 1) * g) / cols;
  const ch = (D - 2 * m - (rows - 1) * g) / rows;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x0 = m + c * (cw + g);
      const y0 = m + r * (ch + g);
      const t = (c + (rows - r)) / (cols + rows);
      prims.push({
        kind: "face",
        pts: [P(x0, y0, 0.3), P(x0 + cw, y0, 0.3), P(x0 + cw, y0 + ch, 0.3), P(x0, y0 + ch, 0.3)],
        n,
        mat: M.cell,
        bias: 1000,
        flat: t > 0.62 ? "#2a2d2a" : t > 0.45 ? "#1a1c1b" : "#101111",
      });
      // busbars
      prims.push(line([P(x0 + cw / 3, y0, 0.4), P(x0 + cw / 3, y0 + ch, 0.4)], "#55574f", 0.35, 1001, 0.8));
      prims.push(line([P(x0 + (2 * cw) / 3, y0, 0.4), P(x0 + (2 * cw) / 3, y0 + ch, 0.4)], "#55574f", 0.35, 1001, 0.8));
    }
  }
  // sunlight glint
  prims.push(line([P(18, 10, 0.6), P(70, 50, 0.6)], "#e8e9c9", 2.2, 1002, 0.35));
  prims.push(line([P(30, 8, 0.6), P(66, 36, 0.6)], "#e8e9c9", 1, 1002, 0.3));
  return prims;
}

function energyMeter(): Prim[] {
  const w = 40, d = 26, h = 58;
  const prims: Prim[] = [...box([0, 0, 0], w, d, h, M.plastic)];
  const o: V3 = [0, d, 0];
  // Layered details on the front face; biases keep layers in order on the same plane.
  prims.push(planar(o, X, Z, rect(6, 32, 34, 48), M.ink, 100, "#16170f"));
  for (let i = 0; i < 5; i++) prims.push(planar(o, X, Z, rect(9 + i * 5, 37, 12.5 + i * 5, 43), M.olive, 200, "#b9bc5d"));
  prims.push(planar(o, X, Z, circle(1.8, 14, 30, 26), M.olive, 200, "#b9bc5d"));
  prims.push(planar(o, X, Z, rect(4, 4, 36, 18), M.plastic, 100, "#d9dad2"));
  for (let i = 0; i < 4; i++) prims.push(planar(o, X, Z, circle(1.6, 12, 9 + i * 7.5, 11), M.ink, 200, "#3a3b35"));
  return prims;
}

function distributionBox(label: "AC" | "DC"): Prim[] {
  const w = 62, d = 20, h = 52;
  const prims: Prim[] = [...box([0, 0, 0], w, d, h, M.plastic)];
  const o: V3 = [0, d, 0];
  prims.push(planar(o, X, Z, rect(4, 4, w - 4, h - 4), M.plastic, 100, "#ececE5".toLowerCase()));
  prims.push(planar(o, X, Z, rect(8, 16, w - 8, 36), M.ink, 200, "#1c1d18"));
  const n = label === "DC" ? 5 : 4;
  const slot = (w - 20) / n;
  for (let i = 0; i < n; i++) {
    const x0 = 11 + i * slot;
    prims.push(planar(o, X, Z, rect(x0, 19, x0 + slot - 3, 33), M.plastic, 300, "#f2f2ec"));
    prims.push(planar(o, X, Z, rect(x0 + (slot - 3) / 2 - 1.6, 24, x0 + (slot - 3) / 2 + 1.6, 29.5), M.olive, 400, label === "DC" ? "#b9bc5d" : "#555650"));
  }
  prims.push(planar(o, X, Z, rect(8, 39, 28, 47), M.olive, 200, "#b9bc5d"));
  prims.push({ kind: "text", at: [10, d, 41], u: X, v: Z, text: `${label}DB`, size: 5.4, fill: "#0e0f08", bias: 500, weight: 700 });
  return prims;
}

function lightningArrester(): Prim[] {
  const prims: Prim[] = [];
  prims.push(...box([-16, -16, 0], 32, 32, 4, M.aluminium));
  prims.push(...cylinder("z", 0, 0, 4.2, 4, 10, M.chrome));
  prims.push(...cylinder("z", 0, 0, 2.6, 14, 88, M.copper, 20));
  prims.push(...cylinder("z", 0, 0, 5, 102, 6, M.chrome, 20));
  const tips: [number, number][] = [[0, 0], [9, 0], [-9, 0], [0, 9], [0, -9]];
  tips.forEach(([u, v], i) => {
    const h = i === 0 ? 34 : 20;
    if (i) prims.push(...cylinder("z", u, v, 1.1, 104, 6, M.copper, 12));
    prims.push(...cone("z", u, v, i === 0 ? 2.4 : 1.4, i === 0 ? 108 : 110, h, M.copper, 16));
  });
  // arms
  prims.push(line([[-9, 0, 108], [9, 0, 108]], "#c88d5a", 2.2, 0.5));
  prims.push(line([[0, -9, 108], [0, 9, 108]], "#c88d5a", 2.2, 0.5));
  return prims;
}

function earthingPit(): Prim[] {
  const prims: Prim[] = [];
  prims.push(planar([-30, -30, 0], X, Y, rect(0, 0, 130, 130), M.concrete, -200, "#e3e3da"));
  prims.push(...box([0, 0, 0], 70, 70, 14, M.concrete));
  prims.push(...box([6, 6, 14], 58, 58, 4, M.concrete));
  prims.push(planar([6, 6, 18], X, Y, rect(14, 26, 44, 32), M.ink, 0.5, "#2f302b"));
  prims.push(...cylinder("z", 35, 35, 4.5, 18, 34, M.copper, 20));
  prims.push(...cylinder("z", 35, 35, 6.5, 40, 6, M.chrome, 20));
  prims.push(line([[35, 41, 43], [35, 62, 43], [35, 86, 30], [35, 104, 20]], "#151515", 3.2, 1));
  prims.push(planar([2, 70, 6], X, Z, rect(4, 0, 30, 6), M.olive, 0.4, "#b9bc5d"));
  return prims;
}

function coil(cx: number, cy: number, z0: number, turns: number, r: number, mat: { dark: string; light: string }, wire = 4.6): Prim[] {
  const prims: Prim[] = [];
  for (let t = 0; t < turns; t++) {
    const z = z0 + t * (wire * 0.95);
    const pts = circle(r, 40, cx, cy).map(([u, v]) => [u, v, z] as V3);
    prims.push(line([...pts, pts[0]], mat.dark, wire + 1.2, t * 0.01, 1));
    prims.push(line([...pts, pts[0]].slice(4, 22), mat.light, wire * 0.45, t * 0.01 + 0.005, 0.9));
  }
  return prims;
}

function dcCable(): Prim[] {
  const prims: Prim[] = [];
  prims.push(...coil(0, 0, 0, 7, 32, { dark: M.cableBlack.dark, light: M.cableBlack.light }));
  prims.push(...coil(78, 36, 0, 5, 24, { dark: M.cableRed.dark, light: M.cableRed.light }));
  prims.push(line([[30, 18, 30], [52, 30, 34], [62, 40, 38]], "#050505", 5.4, 40));
  prims.push(...cylinder("x", 40, 38, 1.6, 62, 9, M.copper, 12).map((p) => ({ ...p, bias: 41 })));
  return prims;
}

function downConductor(): Prim[] {
  const prims: Prim[] = [];
  prims.push(...box([0, 0, 0], 90, 10, 130, M.concrete).map((p) => ({ ...p, bias: -50 })));
  prims.push(planar([-12, 10, 0], X, Y, rect(0, 0, 114, 60), M.concrete, -200, "#e6e6dd"));
  // strip running down the wall face (y = 10) and bending out along the ground
  prims.push(...box([40, 10, 4], 10, 1.6, 126, M.copper));
  prims.push(...box([40, 11.6, 0], 10, 34, 2, M.copper));
  for (const z of [26, 66, 106]) prims.push(...box([37, 10, z], 16, 4, 6, M.chrome));
  prims.push(...box([38, 40, -1], 14, 14, 5, M.concrete));
  return prims;
}

function conduitPipe(): Prim[] {
  const prims: Prim[] = [];
  [[0, 11], [24, 11], [12, 31.5]].forEach(([y, z], i) => {
    prims.push(...cylinder("x", y, z, 10.5, i * 10, 160, M.pvc, 30));
    prims.push(planar([160 + i * 10 + 0.4, 0, 0], Y, Z, circle(8.2, 24, y, z), M.ink, 0.5, "#6f706a"));
    prims.push(planar([160 + i * 10 + 0.6, 0, 0], Y, Z, circle(8.2, 24, y + 1.4, z - 1.2), M.ink, 0.6, "#3b3c37"));
  });
  return prims;
}

function conduitFitting(): Prim[] {
  const prims: Prim[] = [];
  // round junction box with two spouts
  prims.push(...cylinder("z", 0, 0, 22, 0, 16, M.pvc, 36));
  prims.push(...cylinder("z", 0, 0, 23, 16, 3, M.plastic, 36));
  prims.push(planar([0, 0, 19.2], X, Y, circle(3, 16, -11, 0), M.ink, 0.5, "#9d9e97"), planar([0, 0, 19.2], X, Y, circle(3, 16, 11, 0), M.ink, 0.5, "#9d9e97"));
  prims.push(...cylinder("x", 0, 8, 7.5, 20, 16, M.pvc, 24));
  prims.push(...cylinder("y", 8, 0, 7.5, 20, 16, M.pvc, 24));
  // coupler and bend
  prims.push(...cylinder("x", 60, 9, 9, 40, 22, M.pvc, 26));
  prims.push(...cylinder("x", 60, 9, 7.2, 30, 10, M.plastic, 24));
  return prims;
}

function hexHead(axis: "x" | "z", r: number, start: number, len: number, cu = 0, cv = 0) {
  return extrude(hexagon(r, cu, cv), axis, start, len, M.chrome);
}

function threads(x0: number, x1: number, r: number, pitch = 3.2): Prim[] {
  const out: Prim[] = [];
  for (let x = x0; x < x1; x += pitch) {
    const pts: V3[] = [];
    for (let k = 0; k <= 8; k++) {
      const th = (-50 + k * 22) * (Math.PI / 180);
      pts.push([x + k * 0.35, r * 1.04 * Math.cos(th), r * 1.04 * Math.sin(th)]);
    }
    out.push(line(pts, "#6e6f68", 0.7, 0.3, 0.8));
  }
  return out;
}

function ssScrew(): Prim[] {
  const prims: Prim[] = [];
  const shift = (ps: Prim[], d: V3) =>
    ps.map((p) => (p.kind === "face" ? { ...p, pts: p.pts.map((q) => add(q, d)) } : p.kind === "line" ? { ...p, pts: p.pts.map((q) => add(q, d)) } : p));
  const one = (): Prim[] => [
    ...cylinder("x", 0, 0, 11, 0, 3, M.cableBlack, 28),
    ...cylinder("x", 0, 0, 10, 3, 2.5, M.chrome, 28),
    ...hexHead("x", 7, 5.5, 8),
    ...cylinder("x", 0, 0, 4, -62, 62, M.chrome, 20).map((p) => ({ ...p, bias: -1 })),
    ...threads(-50, -4, 4),
    ...cone("x", 0, 0, 4, -62, -12, M.chrome, 18),
  ];
  prims.push(...shift(one(), [70, 0, 12]));
  prims.push(...shift(one(), [92, 36, 12]));
  return prims;
}

function ssBolt(): Prim[] {
  const prims: Prim[] = [];
  prims.push(...hexHead("x", 12, 0, 9));
  prims.push(...cylinder("x", 0, 0, 6.5, 9, 92, M.chrome, 24));
  prims.push(...threads(50, 98, 6.5, 3.6));
  prims.push(...cylinder("x", 0, 0, 13, 58, 2.2, M.chrome, 30));
  prims.push(...hexHead("x", 11, 60.2, 10));
  return prims.map((p) => (p.kind === "face" ? { ...p, pts: p.pts.map((q) => add(q, [0, 0, 14])) } : p.kind === "line" ? { ...p, pts: p.pts.map((q) => add(q, [0, 0, 14])) } : p));
}

function mountingClamp(): Prim[] {
  const prims: Prim[] = [];
  const mid: V2[] = [[-4, 0], [4, 0], [4, 26], [19, 26], [19, 31], [-19, 31], [-19, 26], [-4, 26]];
  prims.push(...extrude(mid, "x", 0, 42, M.aluminium));
  prims.push(...hexHead("z", 6.5, 31, 5.5, 21, 0));
  const endC: V2[] = [[0, 0], [26, 0], [26, 4], [5, 4], [5, 26], [18, 26], [18, 31], [0, 31]];
  prims.push(...extrude(endC.map(([u, v]) => [u + 34, v] as V2), "x", 6, 34, M.aluminium));
  prims.push(...hexHead("z", 6, 4, 5, 23, 49));
  return prims;
}

const builders: Record<VisualKind, () => Prim[]> = {
  tmt,
  "flat-bar": flatBar,
  angle,
  "l-clamp": lClamp,
  "square-rod": squareRod,
  "round-rod": roundRod,
  "solar-panel": solarPanel,
  "energy-meter": energyMeter,
  acdb: () => distributionBox("AC"),
  dcdb: () => distributionBox("DC"),
  "lightning-arrester": lightningArrester,
  "earthing-pit": earthingPit,
  "dc-cable": dcCable,
  "down-conductor": downConductor,
  "conduit-pipe": conduitPipe,
  "conduit-fitting": conduitFitting,
  "ss-screw": ssScrew,
  "ss-bolt": ssBolt,
  "mounting-clamp": mountingClamp,
};

const cache = new Map<VisualKind, RenderedScene>();

export function getScene(kind: VisualKind): RenderedScene {
  let s = cache.get(kind);
  if (!s) {
    s = render(builders[kind]());
    cache.set(kind, s);
  }
  return s;
}
