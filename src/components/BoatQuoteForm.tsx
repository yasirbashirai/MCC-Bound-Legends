"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { trackQuoteSubmit } from "@/lib/analytics";
import { Anchor, Arrow, Calendar, Check, Lock, Mail, Phone, Pin, Ruler, Tag, Trailer, User } from "./Icons";

/**
 * Boat landing-page quote card. Client revision 2026-09-19: the placeholder-only
 * card "looked unprofessional", so every field now has a label above it, a leading
 * icon and the shared 46px control style from globals.css (.label / .field /
 * .field-icon). Posts to the same /api/quote/ endpoint as the main form; the
 * trailer answer decides the ship_type so the lead email reads correctly.
 */
const BOAT_TYPES = ["Center Console", "Sailboat", "Yacht / Mega Yacht", "Pontoon Boat", "Fishing Boat", "Speedboat", "Cabin Cruiser", "Jet Ski / PWC", "Other"];
const TRAILER = [["Yes, road-worthy", "boat-trailer"], ["Yes, not road-worthy", "boat-no-trailer"], ["No trailer", "boat-no-trailer"], ["Not sure", "boat-trailer"]] as const;

type FieldProps = { id: string; label: string; icon: React.ComponentType<{ className?: string }>; span?: boolean; children: React.ReactNode };
const Field = ({ id, label, icon: Icon, span, children }: FieldProps) => (
  <div className={span ? "sm:col-span-2" : ""}>
    <label htmlFor={id} className="label">{label}</label>
    <div className="field-icon"><Icon />{children}</div>
  </div>
);

export function BoatQuoteForm({ title = "How Much Does It Cost to Ship Your Boat to Florida?" }: { title?: string }) {
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

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
    <form id="quote" onSubmit={onSubmit} noValidate className="scroll-mt-28 rounded-2xl bg-white p-5 text-ink shadow-[0_24px_60px_-16px_rgb(0_0_0/0.55)] ring-1 ring-line sm:p-6 xl:p-5 hd:p-6">
      <h2 className="font-display text-[24px] font-extrabold leading-[1.08] text-royal">{title}</h2>
      <p className="mt-1.5 text-[14px] text-slate">Find out in 60 seconds — free, no deposit, no obligation.</p>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
        <Field id="bq-ymm" label="Year, Make & Model" icon={Tag} span>
          <input id="bq-ymm" name="ymm" autoComplete="off" placeholder="e.g. 2019 Boston Whaler 280" className="field" required />
        </Field>
        <Field id="bq-type" label="Boat Type" icon={Anchor}>
          <select id="bq-type" name="boat_type" defaultValue="" required className="field">
            <option value="" disabled>Select type</option>
            {BOAT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field id="bq-length" label="Length (ft)" icon={Ruler}>
          <input id="bq-length" name="length" type="number" min={1} max={250} inputMode="numeric" placeholder="e.g. 28" className="field" required />
        </Field>
        <Field id="bq-pz" label="Pick-up ZIP" icon={Pin}>
          <input id="bq-pz" name="pickup_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="e.g. 10001" className="field" required />
        </Field>
        <Field id="bq-dz" label="Drop-off ZIP" icon={Pin}>
          <input id="bq-dz" name="delivery_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="e.g. 33101" className="field" required />
        </Field>
        <Field id="bq-trailer" label="Trailer Available?" icon={Trailer}>
          <select id="bq-trailer" name="trailer_available" defaultValue="" required className="field">
            <option value="" disabled>Select</option>
            {TRAILER.map(([l]) => <option key={l}>{l}</option>)}
          </select>
        </Field>
        <Field id="bq-date" label="Pick-up Date" icon={Calendar}>
          <input id="bq-date" name="pickup_date" type="date" min={today} className="field" data-empty="true" onChange={(e) => { e.currentTarget.dataset.empty = e.currentTarget.value ? "false" : "true"; }} />
        </Field>
        <Field id="bq-name" label="Your Name" icon={User}>
          <input id="bq-name" name="name" autoComplete="name" placeholder="Full name" className="field" required />
        </Field>
        <Field id="bq-phone" label="Phone" icon={Phone}>
          <input id="bq-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-5555" className="field" required />
        </Field>
        <Field id="bq-email" label="Email Address" icon={Mail} span>
          <input id="bq-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" className="field" required />
        </Field>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-[12px] leading-snug text-slate">
        <input type="checkbox" name="sms_consent" value="yes" className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-blue" />
        <span>I consent to receive SMS messages from MCC Bound Legends LLC. Reply STOP to opt out. See <Link href="/privacy-policy/" className="underline">Privacy Policy</Link>.</span>
      </label>

      {error && <p role="alert" className="mt-3 rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-orange font-display mt-4 w-full py-3.5 text-[18px] font-bold tracking-wide disabled:opacity-70">
        {loading ? "Sending…" : "Get My Free Boat Shipping Quote"} <Arrow className="h-5 w-5" />
      </button>
      <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-muted">
        {["No deposit required", "Response within 2 hours"].map((t) => <li key={t} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" />{t}</li>)}
        <li className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" />Your info is secure</li>
      </ul>
    </form>
  );
}
