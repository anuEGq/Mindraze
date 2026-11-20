<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes (Mindraze Global LLP website)

- Read `README.md` and `docs/ARCHITECTURE.md` first. All copy and catalogue data lives in `src/content/`.
- Content rule from the client brief: never invent customer counts, testimonials, certifications, awards,
  company history, specifications, prices or stock. Missing business details stay as labelled placeholders
  (`src/content/site.ts`, env vars in `.env.example`).
- Logo: never edit `Logo/`. Regenerate derived assets with `npm run brand`; render the logo with `BrandMask`.
- Pages are fully static (Cache Components). Avoid `Date.now()`/`Math.random()` in server components.
- Up to three visited routes stay mounted (hidden): keep anchor and SVG `id`s unique per page/instance.
- GSAP: use `useGsap(setup, ref, deps, mediaQuery)` from `src/lib/gsap.ts` so it only loads where needed.
- Verify with `npm run lint && npm run typecheck && npm test && npm run build`.
