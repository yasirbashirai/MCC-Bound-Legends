import fs from "node:fs";
import path from "node:path";

/**
 * Photo registry with auto-detection (server only).
 * Drop a file into public/images/photos/ with the right name and the slot fills itself;
 * missing files fall back to the illustrated treatment. Names:
 *   hero-1..hero-8.webp               homepage hero slideshow
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

export function heroSlides(): { src: string; alt: string }[] {
  const alts: Record<string, string> = {
    "hero-1": "Car hauler carrying SUVs and pickups on a mountain highway at sunset",
    "hero-2": "Pickup truck towing a sportfish boat across a Florida causeway with a city skyline",
    "hero-3": "Multi-car transport trailer on an open highway at golden hour",
    "hero-4": "Excavator secured on a lowboy trailer",
    "hero-5": "Class A motorhome on the interstate",
    "hero-6": "Box truck on a step deck trailer",
    "hero-7": "Motorcycles secured inside an enclosed carrier",
    "hero-8": "Yacht on a hydraulic trailer leaving a marina",
  };
  const out: { src: string; alt: string }[] = [];
  for (let i = 1; i <= 8; i++) { const s = find(`hero-${i}`); if (s) out.push({ src: s, alt: alts[`hero-${i}`] ?? "MCC Bound Legends transport" }); }
  return out;
}
