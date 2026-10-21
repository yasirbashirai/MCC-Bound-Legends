import fs from "node:fs";
import path from "node:path";

/**
 * Photo registry with auto-detection (server only).
 * Drop a file into public/images/photos/ with the right name and the slot fills itself;
 * missing files fall back to the illustrated treatment. Names:
 *   home-hero-1..3.webp               homepage hero slideshow (hero-1/2 still used by other sections)
 *   cat-<category-slug>.webp          category cards + category page hero
 *   svc-<service-slug>.webp           service page hero (falls back to parent category image)
 *   section-florida.webp, section-cab.webp, section-skyline.webp, section-equipment.webp
 * See docs/06-IMAGE-PROMPT-PACK.md for the generation prompts.
 */
const DIR = path.join(process.cwd(), "public", "images", "photos");
const EXT = [".webp", ".jpg", ".jpeg", ".png", ".avif"];

function find(name: string): string | null {
  for (const e of EXT) if (fs.existsSync(path.join(DIR, name + e))) return `/images/photos/${name}${e}`;
  return null;
}

export const photo = (name: string) => find(name);
export const categoryPhoto = (slug: string) => find(`cat-${slug}`);
export const servicePhoto = (slug: string, parent?: string) => find(`svc-${slug}`) ?? (parent ? find(`cat-${parent}`) : null) ?? null;

/** Homepage hero, in the client's order (round 2026-10-21): auto, boat, heavy equipment. */
export function heroSlides(): { src: string; alt: string }[] {
  const alts = [
    "Car hauler loaded with SUVs and pickups on a mountain highway at sunset",
    "Pickup truck towing a center console boat along a Florida waterfront drive",
    "Excavator on a lowboy trailer hauled through the city at sunset",
  ];
  return alts.flatMap((alt, i) => { const src = find(`home-hero-${i + 1}`); return src ? [{ src, alt }] : []; });
}
