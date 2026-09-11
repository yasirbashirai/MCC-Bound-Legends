"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { trackQuoteSubmit } from "@/lib/analytics";
import { Arrow, Lock } from "./Icons";

/**
 * Boat landing-page quote card (client reference: white card, placeholder-labelled
 * fields, two columns). Posts to the same /api/quote/ endpoint as the main form;
 * the trailer answer decides the ship_type so the lead email reads correctly.
 */
const BOAT_TYPES = ["Center Console", "Sailboat", "Yacht / Mega Yacht", "Pontoon Boat", "Fishing Boat", "Speedboat", "Cabin Cruiser", "Jet Ski / PWC", "Other"];
const TRAILER = [["Yes, road-worthy", "boat-trailer"], ["Yes, not road-worthy", "boat-no-trailer"], ["No trailer", "boat-no-trailer"], ["Not sure", "boat-trailer"]] as const;

const field = "h-10 w-full rounded-md border border-line bg-white px-2.5 text-[12.5px] font-medium text-ink placeholder:text-muted focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/15";
const select = `${field} appearance-none pl-2.5 pr-5 text-[12px]`;
const arrow = { backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%231e63d6'%3E%3Cpath d='M5.5 7.5l4.5 4.5 4.5-4.5'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 5px center", backgroundSize: "14px" } as const;

export function BoatQuoteForm({ title = "How Much Does It Cost to Ship Your Boat to Florida?" }: { title?: string }) {
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateType, setDateType] = useState<"text" | "date">("text");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (!fd.get("sms_consent")) { setError("Please check the consent box so we can text you about your quote."); return; }
    const shipType = TRAILER.find(([l]) => l === body.trailer_available)?.[1] ?? (body.ymm?.startsWith("Yacht") ? "yacht" : "boat-trailer");
    setLoading(true);
    try {
      const res = await fetch("/api/quote/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, ship_type: shipType, page: path, service: "Boat Transport to Florida (Snowbird)" }) });
      if (!res.ok) throw new Error("bad");
      trackQuoteSubmit(shipType, path ?? "/boat-transport/");
      router.push(`/thank-you/?t=${encodeURIComponent(shipType)}`);
    } catch {
      setError("Something went wrong sending your request. Please call (888) 785-0028 and we will quote you right away.");
      setLoading(false);
    }
  }

  return (
    <form id="quote" onSubmit={onSubmit} noValidate className="scroll-mt-28 rounded-xl bg-white p-4 pb-3 text-ink shadow-[0_24px_60px_-16px_rgb(0_0_0/0.55)] ring-1 ring-line">
      <h2 className="font-display text-[24px] font-extrabold leading-[1.08] text-navy">{title}</h2>
      <p className="mb-3 mt-1 text-[13px] text-slate">Find out in 60 seconds — free, no deposit, no obligation.</p>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <select name="ymm" defaultValue="" required aria-label="Boat type" className={select} style={arrow}>
          <option value="" disabled>Boat Type</option>
          {BOAT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <input name="length" type="number" min={1} max={250} inputMode="numeric" placeholder="Boat Length (ft)" aria-label="Boat length in feet" className={field} required />
        <input name="pickup_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="Pick-up ZIP Code" aria-label="Pick-up ZIP code" className={field} required />
        <input name="delivery_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="Drop-off ZIP Code" aria-label="Drop-off ZIP code" className={field} required />
        <select name="trailer_available" defaultValue="" required aria-label="Do you have a trailer?" className={select} style={arrow}>
          <option value="" disabled>Do you have a trailer?</option>
          {TRAILER.map(([l]) => <option key={l}>{l}</option>)}
        </select>
        <input name="pickup_date" type={dateType} onFocus={() => setDateType("date")} onBlur={(e) => { if (!e.currentTarget.value) setDateType("text"); }} min={new Date().toISOString().slice(0, 10)} placeholder="Preferred Pick-up Date" aria-label="Preferred pick-up date" className={field} />
        <input name="name" autoComplete="name" placeholder="Your Name" aria-label="Your name" className={field} required />
        <input name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" aria-label="Phone number" className={field} required />
        <input name="email" type="email" autoComplete="email" placeholder="Email Address" aria-label="Email address" className={`${field} sm:col-span-2`} required />
      </div>

      <label className="mt-2.5 flex items-start gap-2 text-[11px] leading-snug text-slate">
        <input type="checkbox" name="sms_consent" value="yes" className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-blue" />
        <span>I consent to receive SMS messages from MCC Bound Legends LLC. Reply STOP to opt out. See <Link href="/privacy-policy/" className="underline">Privacy Policy</Link>.</span>
      </label>

      {error && <p role="alert" className="mt-2 rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-orange font-display mt-3 w-full py-3 text-[18px] font-bold tracking-wide disabled:opacity-70">
        {loading ? "Sending…" : "Get My Free Boat Shipping Quote"} <Arrow className="h-5 w-5" />
      </button>
      <p className="mt-2 flex items-center justify-center gap-1 text-center text-[10.5px] text-muted"><Lock className="h-3 w-3" /> Your information is secure &nbsp;|&nbsp; No deposit required &nbsp;|&nbsp; We respond within 2 hours</p>
    </form>
  );
}
