"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { trackQuoteSubmit } from "@/lib/analytics";
import { Arrow, BoatSm, Calendar, Mail, Phone, Pin, Ruler, Trailer, User } from "./Icons";
import { Field, TrustStrip } from "./FormBits";

/**
 * Boat landing-page quote card — 1:1 to the client's form reference (2026-09-19,
 * client-docs/form-reference-2026-09-19.png): navy title, placeholder-only fields
 * with a navy leading icon, two columns, big consent checkbox, orange CTA, grey
 * trust strip. Posts to the same /api/quote/ endpoint as the main form; the
 * trailer answer decides the ship_type so the lead email reads correctly.
 */
const BOAT_TYPES = ["Center Console", "Sailboat", "Yacht / Mega Yacht", "Pontoon Boat", "Fishing Boat", "Speedboat", "Cabin Cruiser", "Jet Ski / PWC", "Other"];
const TRAILER = [["Yes, road-worthy", "boat-trailer"], ["Yes, not road-worthy", "boat-no-trailer"], ["No trailer", "boat-no-trailer"], ["Not sure", "boat-trailer"]] as const;

export function BoatQuoteForm({ title = "How Much Does It Cost to Ship Your Boat to Florida?" }: { title?: string }) {
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // date field shows its placeholder until focused (type=date has no placeholder)
  const [dateType, setDateType] = useState<"text" | "date">("text");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (!fd.get("sms_consent")) { setError("Please check the consent box so we can text you about your quote."); return; }
    const shipType = TRAILER.find(([l]) => l === body.trailer_available)?.[1] ?? (body.boat_type?.startsWith("Yacht") ? "yacht" : "boat-trailer");
    setLoading(true);
    try {
      const res = await fetch("/api/quote/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, ship_type: shipType, page: path, service: "Boat Transport to Florida (Snowbird)" }) });
      if (!res.ok) throw new Error("bad");
      trackQuoteSubmit(shipType, path ?? "/boat-transport-florida/");
      router.push(`/thank-you/?t=${encodeURIComponent(shipType)}`);
    } catch {
      setError("Something went wrong sending your request. Please call (888) 785-0028 and we will quote you right away.");
      setLoading(false);
    }
  }

  return (
    <form id="quote" onSubmit={onSubmit} noValidate className="@container form-compact scroll-mt-28 rounded-2xl bg-white p-5 text-ink shadow-[0_24px_60px_-16px_rgb(0_0_0/0.55)] ring-1 ring-line sm:p-6">
      <h2 className="font-display text-[26px] font-extrabold leading-[1.08] text-navy sm:text-[28px]">{title}</h2>
      <p className="mt-2 text-[15px] text-slate">Get a fast, free quote in 60 seconds — no deposit, no obligation.</p>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-5 grid grid-cols-1 gap-3 @min-[400px]:grid-cols-2">
        <Field icon={BoatSm} className="@min-[400px]:col-span-2">
          <input name="ymm" autoComplete="off" placeholder="Year, Make & Model (e.g. 2019 Boston Whaler)" aria-label="Boat year, make and model" className="field" required />
        </Field>
        <Field icon={BoatSm}>
          <select name="boat_type" defaultValue="" required aria-label="Boat type" className="field">
            <option value="" disabled>Boat Type</option>
            {BOAT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field icon={Ruler}>
          <input name="length" type="number" min={1} max={250} inputMode="numeric" placeholder="Boat Length (ft)" aria-label="Boat length in feet" className="field" required />
        </Field>
        <Field icon={Pin}>
          <input name="pickup_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="Pick-up ZIP Code" aria-label="Pick-up ZIP code" className="field" required />
        </Field>
        <Field icon={Pin}>
          <input name="delivery_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="Drop-off ZIP Code" aria-label="Drop-off ZIP code" className="field" required />
        </Field>
        <Field icon={Trailer}>
          <select name="trailer_available" defaultValue="" required aria-label="Do you have a trailer?" className="field">
            <option value="" disabled>Have a trailer?</option>
            {TRAILER.map(([l]) => <option key={l}>{l}</option>)}
          </select>
        </Field>
        <Field icon={Calendar}>
          <input name="pickup_date" type={dateType} onFocus={() => setDateType("date")} onBlur={(e) => { if (!e.currentTarget.value) setDateType("text"); }} min={new Date().toISOString().slice(0, 10)} placeholder="Preferred Pick-up Date" aria-label="Preferred pick-up date" className="field" />
        </Field>
        <Field icon={User}>
          <input name="name" autoComplete="name" placeholder="Your Name" aria-label="Your name" className="field" required />
        </Field>
        <Field icon={Phone}>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" aria-label="Phone number" className="field" required />
        </Field>
        <Field icon={Mail} className="@min-[400px]:col-span-2">
          <input name="email" type="email" autoComplete="email" placeholder="Email Address" aria-label="Email address" className="field" required />
        </Field>
      </div>

      <label className="mt-4 flex items-start gap-3 text-[13px] leading-[1.45] text-slate">
        <input type="checkbox" name="sms_consent" value="yes" className="consent-box" />
        <span>I consent to receive SMS messages from MCC Bound Legends LLC. Reply STOP to opt out. See <Link href="/privacy-policy/" className="text-royal underline">Privacy Policy</Link>.</span>
      </label>

      {error && <p role="alert" className="mt-3 rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-orange font-display mt-4 w-full rounded-xl py-4 text-[19px] font-bold tracking-wide disabled:opacity-70">
        {loading ? "Sending…" : "Get My Free Boat Shipping Quote"} <Arrow className="h-5 w-5" />
      </button>
      <TrustStrip compact />
    </form>
  );
}
