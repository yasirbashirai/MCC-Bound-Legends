"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Renders its children only on the boat Ads page. Used for the footer's "Ready to Ship Your Boat?"
 * banner: the homepage revision brief §21 (2026-10-07) keeps boat-specific content on
 * /boat-transport-florida/ so general pages stay about every transport category.
 */
export function BoatOnly({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return path?.replace(/\/$/, "") === "/boat-transport-florida" ? <>{children}</> : null;
}

/** The opposite of BoatOnly: every page except the boat Ads page. */
export function NotBoat({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return path?.replace(/\/$/, "") === "/boat-transport-florida" ? null : <>{children}</>;
}

/**
 * Footer photo (all pages except the boat page).
 * Client rounds 2026-11-09: some category pages get their own render; everywhere else keeps the sunset supercar.
 * `desk` = object-position in the tall desktop column; mobile always anchors right.
 */
const FOOTER_PHOTOS: Record<string, { src: string; alt: string; desk: string }> = {
  "/auto-transport": { src: "/images/footer/auto-transport-footer.webp", alt: "Red sports car loading into an enclosed trailer on a Miami waterfront at sunset", desk: "object-[64%_50%]" },
  "/commercial-vehicle-transport": { src: "/images/footer/commercial-vehicle-transport-footer.webp", alt: "Box truck loaded on a step-deck trailer on a highway at sunset", desk: "object-[90%_50%]" },
  "/rv-transport": { src: "/images/footer/rv-transport-footer.webp", alt: "Class A motorhome hauled on a lowboy trailer at sunset", desk: "object-[71%_50%]" },
  "/motorcycle-transport": { src: "/images/footer/motorcycle-transport-footer.webp", alt: "Enclosed trailer loaded with motorcycles, ramp down at sunset", desk: "object-[88%_50%]" },
  "/construction-equipment-transport": { src: "/images/footer/construction-equipment-transport-footer.webp", alt: "Excavator hauled on a lowboy trailer at sunset", desk: "object-[90%_50%]" },
  "/heavy-equipment-transport": { src: "/images/footer/heavy-equipment-transport-footer.webp", alt: "Heavy industrial machinery hauled on a multi-axle lowboy at sunset", desk: "object-[70%_50%]" },
  // Service + situation pages (client round 2026-11-11)
  "/auction-vehicle-transport": { src: "/images/footer/auction-vehicle-transport-footer.webp", alt: "Car carrier loading vehicles at an auction yard at sunset", desk: "object-[75%_50%]" },
  "/box-truck-transport": { src: "/images/footer/box-truck-transport-footer.webp", alt: "Box truck hauled on a step-deck trailer along a highway at sunset", desk: "object-[80%_50%]" },
  "/bulldozer-transport": { src: "/images/footer/bulldozer-transport-footer.webp", alt: "Bulldozer on a lowboy trailer at sunset", desk: "object-[78%_50%]" },
  "/enclosed-auto-transport": { src: "/images/footer/enclosed-auto-transport-footer.webp", alt: "Sports car being secured inside a lit enclosed trailer at dusk", desk: "object-[68%_50%]" },
  "/excavator-transport": { src: "/images/footer/excavator-transport-footer.webp", alt: "Excavator hauled on a multi-axle lowboy at sunset", desk: "object-[80%_50%]" },
  "/fleet-vehicle-transport": { src: "/images/footer/fleet-vehicle-transport-footer.webp", alt: "Car carrier loaded with fleet vehicles at a distribution lot at sunset", desk: "object-[75%_50%]" },
  "/forklift-transport": { src: "/images/footer/forklift-transport-footer.webp", alt: "Forklifts and a telehandler secured on a lowboy trailer at sunset", desk: "object-[72%_50%]" },
  "/non-running-vehicle-transport": { src: "/images/footer/non-running-vehicle-transport-footer.webp", alt: "Non-running car on a rollback tow truck at dusk", desk: "object-[72%_50%]" },
  "/semi-truck-transport": { src: "/images/footer/semi-truck-transport-footer.webp", alt: "Semi tractor hauling another tractor on a lowboy at sunset", desk: "object-[72%_50%]" },
  "/skid-steer-transport": { src: "/images/footer/skid-steer-transport-footer.webp", alt: "Compact track loader on a gooseneck trailer behind a pickup at sunset", desk: "object-[72%_50%]" },
  "/work-truck-transport": { src: "/images/footer/work-truck-transport-footer.webp", alt: "Service body work truck hauled on a step-deck trailer at sunset", desk: "object-[75%_50%]" },
};
const FOOTER_DEFAULT = { src: "/images/footer/supercar-sunset.webp", alt: "Red supercar loading into an enclosed trailer on a Miami waterfront at sunset", desk: "object-[57%_50%]" };

export function FooterCarImage({ mobile = false }: { mobile?: boolean }) {
  const path = usePathname()?.replace(/\/$/, "") ?? "";
  const f = FOOTER_PHOTOS[path] ?? FOOTER_DEFAULT;
  return <Image src={f.src} alt={f.alt} fill unoptimized className={`object-cover ${mobile ? "object-right" : f.desk}`} />;
}
