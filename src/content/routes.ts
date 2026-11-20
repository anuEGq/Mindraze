/** Public, indexable routes (used by the sitemap). */
export const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/businesses/steel-trading", priority: 0.9, changeFrequency: "monthly" },
  { path: "/businesses/solar-solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/businesses/it-services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products-services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/businesses", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
];
