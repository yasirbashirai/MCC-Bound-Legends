"use client";
import { useState } from "react";
import { Calendar, Clock, NoDeposit, Shield } from "./Icons";

/**
 * Shared pieces for every quote / contact form — built to the client's form
 * reference (client-docs/form-reference-2026-09-19.png): placeholder-only
 * fields with a big navy leading icon, and a grey 3-item trust strip.
 */
type IconType = React.ComponentType<{ className?: string }>;

/** Leading-icon wrapper: `<Field icon={Pin}><input className="field" … /></Field>` */
export const Field = ({ icon: Icon, className = "", children }: { icon?: IconType; className?: string; children: React.ReactNode }) =>
  Icon ? <div className={`field-icon ${className}`}><Icon />{children}</div> : <div className={className}>{children}</div>;

/**
 * "Preferred Pickup Date" — always a real date input, so tapping it opens the
 * calendar right away (showPicker on desktop, native wheel/calendar on phones).
 * While empty, the native mm/dd/yyyy text is hidden and a placeholder shows instead.
 */
export function DateField({ className = "" }: { className?: string }) {
  const [empty, setEmpty] = useState(true);
  const open = (e: React.SyntheticEvent<HTMLInputElement>) => { try { e.currentTarget.showPicker?.(); } catch { /* not allowed (e.g. no user gesture): native fallback */ } };
  return (
    <div className={`field-icon ${className}`}>
      <Calendar />
      <input name="pickup_date" type="date" min={new Date().toISOString().slice(0, 10)} aria-label="Preferred pickup date" className="field" data-empty={empty}
        onClick={open} onChange={(e) => setEmpty(!e.currentTarget.value)} />
      {empty && <span className="date-placeholder" aria-hidden="true">Preferred Pickup Date</span>}
    </div>
  );
}

const TRUST: [IconType, string][] = [[Shield, "Your information is secure"], [NoDeposit, "No deposit required"], [Clock, "We respond within 2 hours"]];

/** Grey strip under the submit button (reference: shield / no-deposit / clock, divided). */
export const TrustStrip = ({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) => (
  <ul className={`mt-4 grid grid-cols-1 rounded-xl px-3 @min-[400px]:grid-cols-3 @min-[400px]:px-0.5 @min-[400px]:py-3 ${dark ? "bg-white/10 text-white/85" : "bg-[#e8edf3] text-ink"}`}>
    {TRUST.map(([Icon, t]) => (
      <li key={t} className={`flex items-center py-2.5 font-medium leading-[1.25] @min-[400px]:py-0 [&+&]:border-t @min-[400px]:[&+&]:border-l @min-[400px]:[&+&]:border-t-0 ${compact ? "gap-2 text-[12px] @min-[400px]:gap-1.5 @min-[400px]:px-2 @min-[400px]:text-[11.5px]" : "gap-2.5 text-[13px] @min-[400px]:gap-2 @min-[400px]:px-2.5 @min-[400px]:text-[12px] @min-[560px]:gap-2.5 @min-[560px]:text-[13px]"} ${dark ? "border-white/20" : "border-[#c9d3df]"}`}>
        <Icon className={`shrink-0 ${compact ? "h-[22px] w-[22px]" : "h-6 w-6 @min-[560px]:h-7 @min-[560px]:w-7"} ${dark ? "text-cyan" : "text-navy"}`} />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);
