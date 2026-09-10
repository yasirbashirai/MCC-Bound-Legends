import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { pages } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["", "services", "get-a-quote", "how-it-works", "about-us", "testimonials", "faq", "contact"];
  const legal = ["privacy-policy", "terms-and-conditions"];
  return [
    ...core.map((p) => ({ url: `${site.url}/${p}${p ? "/" : ""}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...pages.map((p) => ({ url: `${site.url}/${p.slug}/`, lastModified: now, changeFrequency: "weekly" as const, priority: p.kind === "category" ? 0.9 : 0.8 })),
    ...legal.map((p) => ({ url: `${site.url}/${p}/`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
