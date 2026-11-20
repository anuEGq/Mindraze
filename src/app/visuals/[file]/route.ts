import { sceneSvg, visualKinds } from "@/components/products/scene-svg";
import type { VisualKind } from "@/content/types";

/** Product illustrations as static, cacheable SVG files (prerendered at build time). */
export function generateStaticParams() {
  return visualKinds.flatMap((k) => [{ file: `${k}.svg` }, { file: `${k}-dark.svg` }]);
}

export async function GET(_request: Request, { params }: RouteContext<"/visuals/[file]">) {
  const { file } = await params;
  const match = /^([a-z-]+?)(-dark)?\.svg$/.exec(file);
  const kind = match?.[1] as VisualKind | undefined;
  if (!match || !kind || !visualKinds.includes(kind)) return new Response("Not found", { status: 404 });
  return new Response(sceneSvg(kind, match[2] ? "dark" : "light"), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
