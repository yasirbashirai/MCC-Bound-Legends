import type { Metadata } from "next";
import { site } from "@/data/site";

/** Uniform metadata: canonical, OG, Twitter. Path must start and end with "/". */
export function meta(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type: "website", locale: "en_US", images: [{ url: `${site.url}/images/og-default.png`, width: 1200, height: 630, alt: `${site.name}, ${site.tagline}` }] },
    twitter: { card: "summary_large_image", title, description },
  };
}
