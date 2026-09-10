"use client";
import { site } from "@/data/site";
import { trackPhoneClick } from "@/lib/analytics";

export function PhoneLink({ location, className = "", children }: { location: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={site.phoneHref} className={className} onClick={() => trackPhoneClick(location)} aria-label={`Call ${site.phone}`}>
      {children}
    </a>
  );
}
