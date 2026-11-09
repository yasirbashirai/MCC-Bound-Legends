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
 * Footer car visual (all pages except the boat page).
 * Client round 2026-11-09: the auto transport page gets its own render; everywhere else keeps the sunset supercar.
 */
export function FooterCarImage({ className, autoClassName }: { className: string; autoClassName?: string }) {
  const path = usePathname()?.replace(/\/$/, "");
  const auto = path === "/auto-transport";
  return (
    <Image
      src={auto ? "/images/footer/auto-transport-footer.webp" : "/images/footer/supercar-sunset.webp"}
      alt={auto ? "Red sports car loading into an enclosed trailer on a Miami waterfront at sunset" : "Red supercar loading into an enclosed trailer on a Miami waterfront at sunset"}
      fill unoptimized className={auto && autoClassName ? autoClassName : className}
    />
  );
}
