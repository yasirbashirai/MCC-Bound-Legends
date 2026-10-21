"use client";
import { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { ShipType } from "@/data/services";
import { getShipOption, shipGroups, shipOptions, smsConsent } from "@/data/quote";
import { trackQuoteSubmit } from "@/lib/analytics";
import Link from "next/link";
import { Arrow, Calendar, Gear, Layers, Lock, Mail, Note, Phone, Pin, Ruler, Tag, Trailer, User, Weight } from "./Icons";
import { DateField, Field, TrustStrip } from "./FormBits";

/**
 * Main quote / contact form. Same visual system as the boat page card (client form
 * reference 2026-09-19): placeholder-only fields with a navy leading icon, custom
 * selects, big consent checkbox, orange CTA, grey trust strip. Conditional
 * dimension / trailer / attachment fields per ship type (src/data/quote.ts).
 */
type Props = {
  defaultType?: ShipType;
  serviceName?: string;      // e.g. "Excavator Transport" -> heading + hidden field
  variant?: "card" | "page" | "white"; // card = navy hero card, page = full light form, white = reference-style white hero card
  compact?: boolean;         // hero: single year/make/model field
  minimal?: boolean;         // hero: the compact reference form (client 2026-10-19)
  title?: string;
};

const years = Array.from({ length: 60 }, (_, i) => String(new Date().getFullYear() + 1 - i));

export function QuoteForm({ defaultType, serviceName, variant = "card", compact = false, minimal = false, title }: Props) {
  const router = useRouter();
  const path = usePathname();
  // Minimal hero form with no preset (homepage) starts on "Select shipment type"
  const [type, setType] = useState<ShipType | "">(defaultType ?? (minimal ? "" : "car"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const opt = useMemo(() => getShipOption(type), [type]);
  const has = (g: string) => opt?.fields.includes(g as never) ?? false;
  const dark = variant === "card";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    if (!type) { setError("Please choose what you are shipping."); return; }
    if (!fd.get("sms_consent")) { setError("Please check the consent box so we can text you about your quote."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/quote/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, page: path, service: serviceName ?? "" }) });
      if (!res.ok) throw new Error("bad");
      trackQuoteSubmit(type as ShipType, path ?? "/");
      router.push(`/thank-you/?t=${encodeURIComponent(type)}`);
    } catch {
      setError("Something went wrong sending your request. Please call (888) 785-0028 and we will quote you right away.");
      setLoading(false);
    }
  }

  const shell = dark
    ? "form-dark rounded-2xl border border-white/15 bg-navy-800/75 p-5 shadow-[var(--shadow-glow)] backdrop-blur-xl sm:p-6"
    : variant === "white"
      ? "rounded-2xl bg-white p-5 shadow-[0_30px_60px_-20px_rgb(13_31_53/0.55)] ring-1 ring-line sm:p-6"
      : "card p-6 sm:p-8";

  const consent = (
    <span>{smsConsent} Please review our <Link href="/privacy-policy/" className={`underline ${dark ? "text-cyan" : "text-royal"}`}>Privacy Policy</Link> and <Link href="/terms-and-conditions/" className={`underline ${dark ? "text-cyan" : "text-royal"}`}>Terms &amp; Conditions</Link>.</span>
  );

  /* Compact hero form — client reference 2026-10-19 (client-docs/revision-2026-10-21/Screenshot…png):
     navy title band, one "What are you shipping?" label, pill fields in pairs, short consent, one CTA,
     single "secure" line. Same row count as the reference; Vehicle Condition (brief §2) sits beside
     Year/Make/Model so the form stays as short as the reference. */
  if (minimal) return (
    <form id="quote" onSubmit={onSubmit} className="form-pill @container scroll-mt-28 rounded-2xl bg-white p-4 shadow-[0_30px_60px_-20px_rgb(13_31_53/0.55)] ring-1 ring-line sm:p-5" noValidate>
      <div className="rounded-xl bg-navy px-4 py-3.5 text-center">
        <h2 className="font-display text-[20px] font-extrabold leading-[1.15] text-white sm:text-[21px]">{title ?? "Get Your Free Shipping Quote"}</h2>
        <p className="mt-1.5 text-[11.5px] font-bold uppercase tracking-[0.08em] text-blue-300">No upfront deposit · Nationwide service</p>
      </div>

      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label htmlFor="qf-type" className="mb-1.5 mt-4 block text-[13.5px] font-bold text-navy">What are you shipping?</label>
      <div className="grid grid-cols-2 gap-2.5">
        <select id="qf-type" name="ship_type" value={type} onChange={(e) => setType(e.target.value as ShipType)} className="field col-span-2" required>
          <option value="" disabled>Select shipment type</option>
          {shipGroups.map((g) => (
            <optgroup key={g} label={g}>
              {shipOptions.filter((o) => o.group === g).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </optgroup>
          ))}
        </select>
        <input name="ymm" placeholder="Year, Make & Model" aria-label="Year, make and model" className="field col-span-2 @min-[360px]:col-span-1" />
        <select name="operable" defaultValue="" aria-label="Vehicle condition" className="field col-span-2 @min-[360px]:col-span-1">
          <option value="" disabled>Vehicle Condition</option><option>Running</option><option>Non-Running</option>
        </select>
        <input name="pickup_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="Pickup ZIP" aria-label="Pickup ZIP code" className="field" required />
        <input name="delivery_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="Delivery ZIP" aria-label="Delivery ZIP code" className="field" required />
        <DateField placeholder="Pickup Date" className="col-span-2 @min-[360px]:col-span-1" />
        <select name="transport_type" defaultValue="" aria-label="Transport type" className="field col-span-2 @min-[360px]:col-span-1">
          <option value="" disabled>Transport Type</option><option>Open Carrier</option><option>Enclosed Carrier</option><option>Flatbed / Step Deck</option><option>Not Sure</option>
        </select>
        <input name="name" autoComplete="name" placeholder="Full Name" aria-label="Full name" className="field col-span-2" required />
        <input name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" aria-label="Phone number" className="field" required />
        <input name="email" type="email" autoComplete="email" placeholder="Email Address" aria-label="Email address" className="field" required />
      </div>

      <label className="mt-3 flex items-start gap-2.5 text-[11.5px] leading-[1.45] text-slate">
        <input type="checkbox" name="sms_consent" value="yes" className="consent-box !h-[19px] !w-[19px]" />
        {consent}
      </label>

      {error && <p role="alert" className="mt-3 rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-orange mt-3.5 h-[50px] w-full rounded-xl text-[16px] font-bold uppercase tracking-[0.04em] disabled:opacity-70">
        {loading ? "Sending…" : "Get My Free Quote"} <Arrow className="h-5 w-5" />
      </button>
      <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[13px] font-medium text-slate"><Lock className="h-4 w-4 text-navy" /> Your information is secure</p>
    </form>
  );

  return (
    <form id="quote" onSubmit={onSubmit} className={`@container scroll-mt-28 ${shell}`} noValidate>
      <div className="mb-5">
        <h2 className={`font-display text-[22px] font-extrabold leading-[1.1] sm:text-[24px] ${dark ? "text-white" : "text-navy"}`}>
          {title ?? (serviceName ? `Get Your ${serviceName} Quote` : "Get Your Free Transport Quote")}
        </h2>
        <p className={`mt-2 text-[15px] ${dark ? "text-white/70" : "text-slate"}`}>Get a fast, free quote in 60 seconds — no deposit, no obligation.</p>
      </div>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-3 @min-[420px]:grid-cols-2">
        <Field icon={Layers} className="@min-[420px]:col-span-2">
          <select name="ship_type" value={type} onChange={(e) => setType(e.target.value as ShipType)} aria-label="What are you shipping?" className="field" required>
            {shipGroups.map((g) => (
              <optgroup key={g} label={g}>
                {shipOptions.filter((o) => o.group === g).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </optgroup>
            ))}
          </select>
        </Field>

        <Field icon={Pin}><input name="pickup_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="Pick-up ZIP Code" aria-label="Pick-up ZIP code" className="field" required /></Field>
        <Field icon={Pin}><input name="delivery_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="Drop-off ZIP Code" aria-label="Drop-off ZIP code" className="field" required /></Field>

        <DateField />
          <Field icon={Gear}>
            <select name="operable" defaultValue="" aria-label="Vehicle condition" className="field">
              <option value="" disabled>Vehicle Condition</option>
              <option>Running</option>
              <option>Non-Running</option>
            </select>
          </Field>

        {/* Vehicle identity */}
        {has("vehicle") && !compact && (<>
          <Field icon={Calendar}>
            <select name="year" defaultValue="" aria-label="Year" className="field"><option value="">Year</option>{years.map((y) => <option key={y}>{y}</option>)}</select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field icon={Tag}><input name="make" placeholder="Make" aria-label="Make" className="field" /></Field>
            <Field><input name="model" placeholder="Model" aria-label="Model" className="field" /></Field>
          </div>
        </>)}
        {compact && (
          <Field icon={Tag} className="@min-[420px]:col-span-2">
            <input name="ymm" placeholder="Year, Make & Model (e.g. 2019 Ford F-350)" aria-label="Year, make and model" className="field" />
          </Field>
        )}

        {/* Conditional: dimensions (commercial, marine, RV, equipment) */}
        {has("dimensions") && (
          <fieldset className={`@min-[420px]:col-span-2 rounded-xl border p-3.5 ${dark ? "border-blue/30 bg-blue/10" : "border-blue/30 bg-blue-100/40"}`}>
            <legend className={`px-1.5 text-xs font-bold uppercase tracking-wider ${dark ? "text-blue-300" : "text-blue"}`}>Dimensions help us match the right trailer</legend>
            <div className="grid grid-cols-2 gap-3 @min-[640px]:grid-cols-4">
              {([["length", "Length (ft)", Ruler], ["width", "Width (ft)", Ruler], ["height", "Height (ft)", Ruler], ["weight", "Weight (lbs)", Weight]] as const).map(([n, l, I]) => (
                <Field key={n} icon={I}><input name={n} inputMode="decimal" placeholder={l} aria-label={l} className="field" /></Field>
              ))}
            </div>
            {(has("trailer") || type.startsWith("boat") || type === "yacht") && (
              <div className="mt-3 grid gap-3 @min-[420px]:grid-cols-2">
                <Field icon={Trailer}>
                  <select name="trailer_available" defaultValue="" aria-label="Trailer available?" className="field">
                    <option value="" disabled>Trailer available?</option><option>Yes, road-worthy</option><option>Yes, not road-worthy</option><option>No trailer</option>
                  </select>
                </Field>
                {has("loading") && (
                  <Field icon={Layers}>
                    <select name="loading_equipment" defaultValue="" aria-label="Loading equipment on site?" className="field">
                      <option value="" disabled>Loading equipment on site?</option><option>Ramp / dock available</option><option>Forklift or loader available</option><option>Crane / travel lift available</option><option>None, please arrange</option><option>Not sure</option>
                    </select>
                  </Field>
                )}
              </div>
            )}
            {has("attachments") && (
              <Field icon={Note} className="mt-3"><input name="attachments" placeholder="Attachments included (e.g. 2 buckets, hydraulic hammer, forks)" aria-label="Attachments included" className="field" /></Field>
            )}
          </fieldset>
        )}

        <div className={`@min-[420px]:col-span-2 grid gap-3 @min-[420px]:grid-cols-2 @min-[640px]:grid-cols-3`}>
          <Field icon={User}><input name="name" autoComplete="name" placeholder="Your Name" aria-label="Your name" className="field" required /></Field>
          <Field icon={Phone}><input name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" aria-label="Phone number" className="field" required /></Field>
          <Field icon={Mail} className="@min-[420px]:col-span-2 @min-[640px]:col-span-1"><input name="email" type="email" autoComplete="email" placeholder="Email Address" aria-label="Email address" className="field" required /></Field>
        </div>

        {!compact && (
          <Field className="@min-[420px]:col-span-2"><textarea name="notes" rows={3} placeholder="Additional details (optional) — modifications, deadlines, auction lot number, marina name, anything that helps us plan." aria-label="Additional details" className="field" /></Field>
        )}

        <label className={`@min-[420px]:col-span-2 mt-1 flex items-start gap-3 text-[13px] leading-[1.45] ${dark ? "text-white/70" : "text-slate"}`}>
          <input type="checkbox" name="sms_consent" value="yes" className="consent-box" />
          {consent}
        </label>
      </div>

      {error && <p role="alert" className="mt-3 rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-orange mt-4 h-[52px] w-full rounded-xl text-[16px] font-bold uppercase tracking-[0.04em] disabled:opacity-70">
        {loading ? "Sending…" : "Get My Free Quote Now"} <Arrow className="h-5 w-5" />
      </button>
      <TrustStrip dark={dark} />
    </form>
  );
}
