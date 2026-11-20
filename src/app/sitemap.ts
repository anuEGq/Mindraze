import type { MetadataRoute } from "next";
import { routes } from "@/content/routes";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
