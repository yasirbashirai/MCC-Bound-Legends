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
};
const FOOTER_DEFAULT = { src: "/images/footer/supercar-sunset.webp", alt: "Red supercar loading into an enclosed trailer on a Miami waterfront at sunset", desk: "object-[57%_50%]" };

export function FooterCarImage({ mobile = false }: { mobile?: boolean }) {
  const path = usePathname()?.replace(/\/$/, "") ?? "";
  const f = FOOTER_PHOTOS[path] ?? FOOTER_DEFAULT;
  return <Image src={f.src} alt={f.alt} fill unoptimized className={`object-cover ${mobile ? "object-right" : f.desk}`} />;
}
