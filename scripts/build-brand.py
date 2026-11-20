"""Generate brand assets from the supplied logo SVG.

Reads the optimised logo (geometry rounded to 4 decimals, visually identical
to Logo/logo-transparent-svg.svg) and writes:
  - public/brand/*.svg  (colour variants, original proportions)
  - src/components/brand/logo-data.ts (path data + facet polygons for the hero)
Usage: python3 scripts/build-brand.py scripts/source/logo-optimised.svg
(The optimised file was produced with: svgo --config {floatPrecision: 4, mergePaths: false})
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
src = Path(sys.argv[1]).read_text()

paths = re.findall(r'<path[^>]*d="([^"]+)"', src)
bull_d, word_d, tag_d = paths
BULL_T = (1.8282, 7.6504, 0.8492)  # translate x, translate y, scale

# Content bounds (root user units), measured in Chrome via getBBox.
FULL_VB = (1.865, 1.7158, 9.147, 7.949)
MARK_VB = (2.4454, 1.7158, 7.9774, 5.7219)
WORD_BOX = (1.865, 7.649, 9.147, 1.241)

def tokens(d):
    return re.findall(r'[MmLlHhVvCcZz]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?', d)

def subpaths_abs(d):
    """Parse path into absolute polygons (curves reduced to end points)."""
    toks = tokens(d); i = 0; cx = cy = 0.0; sx = sy = 0.0
    polys = []; cur = None; cmd = None
    def num():
        nonlocal i
        v = float(toks[i]); i += 1; return v
    while i < len(toks):
        t = toks[i]
        if re.match(r'[A-Za-z]', t):
            cmd = t; i += 1
            if cmd in 'Zz':
                cx, cy = sx, sy
                if cur: polys.append(cur); cur = None
                continue
        if cmd in 'Mm':
            x, y = num(), num()
            if cmd == 'm': x += cx; y += cy
            cx, cy = sx, sy = x, y
            if cur: polys.append(cur)
            cur = [(cx, cy)]
            cmd = 'L' if cmd == 'M' else 'l'
        elif cmd in 'Ll':
            x, y = num(), num()
            if cmd == 'l': x += cx; y += cy
            cx, cy = x, y; cur.append((cx, cy))
        elif cmd in 'Hh':
            x = num(); cx = x + (cx if cmd == 'h' else 0); cur.append((cx, cy))
        elif cmd in 'Vv':
            y = num(); cy = y + (cy if cmd == 'v' else 0); cur.append((cx, cy))
        elif cmd in 'Cc':
            vals = [num() for _ in range(6)]
            x, y = vals[4], vals[5]
            if cmd == 'c': x += cx; y += cy
            cx, cy = x, y; cur.append((cx, cy))
    if cur: polys.append(cur)
    return polys

def to_root(p):
    tx, ty, s = BULL_T
    return (tx + s * p[0], ty + s * p[1])

def area(poly):
    return 0.5 * sum(poly[k][0] * poly[k - 1][1] - poly[k - 1][0] * poly[k][1] for k in range(len(poly)))

polys = [[to_root(p) for p in poly] for poly in subpaths_abs(bull_d)]
# The largest polygon is the outer contour; the rest are the facet "holes".
polys.sort(key=lambda p: -abs(area(p)))
outline, facets = polys[0], polys[1:]

# Normalise into a 1000-wide space anchored at the mark's bounds.
mx, my, mw, mh = MARK_VB
k = 1000 / mw
norm = lambda p: [round((p[0] - mx) * k, 1), round((p[1] - my) * k, 1)]
facet_data = []
for poly in facets:
    pts = [norm(p) for p in poly]
    cxm = sum(p[0] for p in pts) / len(pts); cym = sum(p[1] for p in pts) / len(pts)
    facet_data.append({"points": pts, "c": [round(cxm, 1), round(cym, 1)], "a": round(abs(area(pts)), 1)})
facet_data.sort(key=lambda f: f["c"][0])
outline_pts = [norm(p) for p in outline]

def svg(vb, body, fill):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{" ".join(str(v) for v in vb)}" fill="{fill}">{body}</svg>\n'

bull_el = f'<path transform="translate({BULL_T[0]} {BULL_T[1]}) scale({BULL_T[2]})" fill-rule="evenodd" d="{bull_d}"/>'
word_el = f'<path d="{word_d}"/>'
tag_el = f'<path d="{tag_d}"/>'
full = bull_el + word_el + tag_el

out = ROOT / 'public' / 'brand'; out.mkdir(parents=True, exist_ok=True)
(out / 'mindraze-logo.svg').write_text(svg(FULL_VB, full, '#0e0904'))
(out / 'mindraze-logo-light.svg').write_text(svg(FULL_VB, full, '#f8f8f3'))
(out / 'mindraze-mark.svg').write_text(svg(MARK_VB, bull_el, '#0e0904'))
(out / 'mindraze-mark-light.svg').write_text(svg(MARK_VB, bull_el, '#f8f8f3'))
# Horizontal lockup (bull + wordmark, each uniformly scaled) and wordmark-only files
ws = (mh * 0.42) / WORD_BOX[3]
gap = mh * 0.16
lock_w = mw + gap + WORD_BOX[2] * ws
word_y = (mh - WORD_BOX[3] * ws) / 2 + WORD_BOX[3] * ws * 0.12
lockup = (f'<g transform="translate({-mx} {-my})">{bull_el}</g>'
          f'<g transform="translate({mw + gap:.4f} {word_y:.4f}) scale({ws:.5f}) translate({-WORD_BOX[0]} {-WORD_BOX[1]})">{word_el}</g>')
(out / 'mindraze-lockup.svg').write_text(svg((0, 0, round(lock_w, 4), mh), lockup, '#0e0904'))
(out / 'mindraze-wordmark.svg').write_text(svg(WORD_BOX, word_el, '#0e0904'))

bg = f'<rect x="{FULL_VB[0]-1.2}" y="{FULL_VB[1]-1.2}" width="{FULL_VB[2]+2.4}" height="{FULL_VB[3]+2.4}" fill="#b9bc5d"/>'
(out / 'mindraze-logo-olive.svg').write_text(svg((FULL_VB[0]-1.2, FULL_VB[1]-1.2, FULL_VB[2]+2.4, FULL_VB[3]+2.4), bg + full, '#0e0904'))

ts = f'''// AUTO-GENERATED by scripts/build-brand.py from Logo/logo-transparent-svg.svg.
// Geometry is the supplied logo, rounded to 4 decimals (visually identical). Do not edit by hand.

/** Bull symbol path (fill-rule evenodd) and the transform it sits under in the original artwork. */
export const BULL_PATH = {json.dumps(bull_d)};
export const BULL_TRANSFORM = "translate({BULL_T[0]} {BULL_T[1]}) scale({BULL_T[2]})";
/** "mindraze global" wordmark path. */
export const WORDMARK_PATH = {json.dumps(word_d)};
/** "Innovate. Evolve. Lead" tagline path. */
export const TAGLINE_PATH = {json.dumps(tag_d)};

/** viewBoxes cropped to content bounds (no scaling of the artwork). */
export const FULL_VIEWBOX = "{' '.join(str(v) for v in FULL_VB)}";
export const MARK_VIEWBOX = "{' '.join(str(v) for v in MARK_VB)}";
export const WORDMARK_BOX = {{ x: {WORD_BOX[0]}, y: {WORD_BOX[1]}, w: {WORD_BOX[2]}, h: {WORD_BOX[3]} }} as const;
export const MARK_BOX = {{ x: {MARK_VB[0]}, y: {MARK_VB[1]}, w: {MARK_VB[2]}, h: {MARK_VB[3]} }} as const;

/** Facets (negative-space polygons) of the bull, normalised to a 1000-unit-wide box. */
export const BULL_FACETS: {{ points: number[][]; c: number[]; a: number }}[] = {json.dumps(facet_data)};
/** Outer contour of the bull in the same normalised space. */
export const BULL_OUTLINE: number[][] = {json.dumps(outline_pts)};
export const BULL_NORM_HEIGHT = {round(mh * k, 1)};
'''
dst = ROOT / 'src' / 'components' / 'brand'; dst.mkdir(parents=True, exist_ok=True)
(dst / 'logo-data.ts').write_text(ts)
print('facets', len(facet_data), 'outline pts', len(outline_pts), 'norm height', round(mh * k, 1))
