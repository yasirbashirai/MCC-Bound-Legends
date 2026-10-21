"use client";
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
