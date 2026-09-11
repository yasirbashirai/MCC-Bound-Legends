"use client";
import { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { ShipType } from "@/data/services";
import { getShipOption, shipGroups, shipOptions, smsConsent } from "@/data/quote";
import { trackQuoteSubmit } from "@/lib/analytics";
import Link from "next/link";
import { Arrow, Check, Lock } from "./Icons";

type Props = {
  defaultType?: ShipType;
  serviceName?: string;      // e.g. "Excavator Transport" -> heading + hidden field
  variant?: "card" | "page"; // card = navy hero card, page = full light form
  compact?: boolean;         // hero: hide year/make/model until step 2
};

const years = Array.from({ length: 60 }, (_, i) => String(new Date().getFullYear() + 1 - i));

export function QuoteForm({ defaultType = "car", serviceName, variant = "card", compact = false }: Props) {
  const router = useRouter();
  const path = usePathname();
  const [type, setType] = useState<ShipType>(defaultType);
  const [operable, setOperable] = useState("yes");
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const opt = useMemo(() => getShipOption(type), [type]);
  const has = (g: string) => opt?.fields.includes(g as never) ?? false;
  const dark = variant === "card";

  const label = dark ? "label text-white/60" : "label";
  const field = dark ? "field border-white/10 bg-white/95" : "field";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    if (!fd.get("sms_consent")) { setError("Please check the consent box so we can text you about your quote."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/quote/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, page: path, service: serviceName ?? "" }) });
      if (!res.ok) throw new Error("bad");
      trackQuoteSubmit(type, path ?? "/");
      router.push(`/thank-you/?t=${encodeURIComponent(type)}`);
    } catch {
      setError("Something went wrong sending your request. Please call (888) 785-0028 and we will quote you right away.");
      setLoading(false);
    }
  }

  return (
    <form id="quote" onSubmit={onSubmit} className={`scroll-mt-28 ${dark ? "rounded-2xl border border-white/15 bg-navy-800/75 p-5 shadow-[var(--shadow-glow)] backdrop-blur-xl sm:p-6" : "card p-6 sm:p-8"}`} noValidate>
      <div className="mb-5">
        <h2 className={`display-md text-2xl ${dark ? "text-white" : "text-navy"}`}>
          {serviceName ? `Get Your ${serviceName} Quote` : "Get Your Free Transport Quote"}
        </h2>
        <p className={`mt-1 text-sm ${dark ? "text-white/65" : "text-slate"}`}>Fast. Free. No deposit to book. A real person reviews every request.</p>
      </div>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor={`type-${variant}`}>What are you shipping?</label>
          <select id={`type-${variant}`} name="ship_type" value={type} onChange={(e) => setType(e.target.value as ShipType)} className={field} required>
            {shipGroups.map((g) => (
              <optgroup key={g} label={g}>
                {shipOptions.filter((o) => o.group === g).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor={`pz-${variant}`}>Pickup ZIP</label>
          <input id={`pz-${variant}`} name="pickup_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="e.g. 32701" className={field} required />
        </div>
        <div>
          <label className={label} htmlFor={`dz-${variant}`}>Delivery ZIP</label>
          <input id={`dz-${variant}`} name="delivery_zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="e.g. 10001" className={field} required />
        </div>

        <div>
          <label className={label} htmlFor={`date-${variant}`}>Preferred pickup date</label>
          <input id={`date-${variant}`} name="pickup_date" type="date" className={field} min={new Date().toISOString().slice(0, 10)} />
        </div>
        <div>
          <label className={label}>Runs &amp; drives?</label>
          <div className={`grid grid-cols-2 gap-1 rounded-lg p-1 ${dark ? "bg-white/10" : "bg-mist"}`}>
            {[["yes", "Operational"], ["no", "Non-running"]].map(([v, l]) => (
              <label key={v} className={`cursor-pointer rounded-md py-2 text-center text-sm font-semibold transition ${operable === v ? "bg-blue text-white shadow" : dark ? "text-white/70" : "text-slate"}`}>
                <input type="radio" name="operable" value={v} checked={operable === v} onChange={() => setOperable(v)} className="sr-only" />{l}
              </label>
            ))}
          </div>
        </div>

        {/* Vehicle identity */}
        {has("vehicle") && !compact && (
          <>
            <div>
              <label className={label} htmlFor={`year-${variant}`}>Year</label>
              <select id={`year-${variant}`} name="year" className={field} defaultValue=""><option value="">Year</option>{years.map((y) => <option key={y}>{y}</option>)}</select>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <div><label className={label} htmlFor={`make-${variant}`}>Make</label><input id={`make-${variant}`} name="make" placeholder="Make" className={field} /></div>
              <div><label className={label} htmlFor={`model-${variant}`}>Model</label><input id={`model-${variant}`} name="model" placeholder="Model" className={field} /></div>
            </div>
          </>
        )}
        {compact && (
          <div className="sm:col-span-2">
            <label className={label} htmlFor={`ymm-${variant}`}>Year / Make / Model</label>
            <input id={`ymm-${variant}`} name="ymm" placeholder="e.g. 2019 Ford F-350 or 2015 Sea Ray 310" className={field} />
          </div>
        )}

        {/* Conditional: dimensions (commercial, marine, RV, equipment) */}
        {has("dimensions") && (
          <fieldset className={`sm:col-span-2 rounded-xl border p-3.5 ${dark ? "border-blue/30 bg-blue/10" : "border-blue/30 bg-blue-100/40"}`}>
            <legend className={`px-1.5 text-xs font-bold uppercase tracking-wider ${dark ? "text-blue-300" : "text-blue"}`}>Dimensions help us match the right trailer</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["length", "Length (ft)"], ["width", "Width (ft)"], ["height", "Height (ft)"], ["weight", "Weight (lbs)"]].map(([n, l]) => (
                <div key={n}><label className={label} htmlFor={`${n}-${variant}`}>{l}</label><input id={`${n}-${variant}`} name={n} inputMode="decimal" placeholder="—" className={field} /></div>
              ))}
            </div>
            {(has("trailer") || type.startsWith("boat") || type === "yacht") && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor={`trailer-${variant}`}>Trailer available?</label>
                  <select id={`trailer-${variant}`} name="trailer_available" value={trailer} onChange={(e) => setTrailer(e.target.value)} className={field}>
                    <option value="">Select</option><option>Yes, road-worthy</option><option>Yes, not road-worthy</option><option>No trailer</option>
                  </select>
                </div>
                {has("loading") && (
                  <div>
                    <label className={label} htmlFor={`load-${variant}`}>Loading equipment on site?</label>
                    <select id={`load-${variant}`} name="loading_equipment" className={field} defaultValue="">
                      <option value="">Select</option><option>Ramp / dock available</option><option>Forklift or loader available</option><option>Crane / travel lift available</option><option>None, please arrange</option><option>Not sure</option>
                    </select>
                  </div>
                )}
              </div>
            )}
            {has("attachments") && (
              <div className="mt-3"><label className={label} htmlFor={`att-${variant}`}>Attachments included</label><input id={`att-${variant}`} name="attachments" placeholder="e.g. 2 buckets, hydraulic hammer, forks" className={field} /></div>
            )}
          </fieldset>
        )}

        <div className="sm:col-span-2 grid gap-3.5 sm:grid-cols-3">
          <div><label className={label} htmlFor={`name-${variant}`}>Your name</label><input id={`name-${variant}`} name="name" autoComplete="name" placeholder="Full name" className={field} required /></div>
          <div><label className={label} htmlFor={`phone-${variant}`}>Phone</label><input id={`phone-${variant}`} name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-5555" className={field} required /></div>
          <div><label className={label} htmlFor={`email-${variant}`}>Email</label><input id={`email-${variant}`} name="email" type="email" autoComplete="email" placeholder="you@email.com" className={field} required /></div>
        </div>

        {!compact && (
          <div className="sm:col-span-2"><label className={label} htmlFor={`notes-${variant}`}>Additional details</label><textarea id={`notes-${variant}`} name="notes" rows={3} placeholder="Modifications, deadlines, auction lot number, marina name, anything that helps us plan." className={field} /></div>
        )}

        <label className={`sm:col-span-2 flex items-start gap-2.5 text-[11.5px] leading-snug ${dark ? "text-white/60" : "text-slate"}`}>
          <input type="checkbox" name="sms_consent" value="yes" className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-blue" />
          <span>{smsConsent} Please review our <Link href="/privacy-policy/" className="underline">Privacy Policy</Link> and <Link href="/terms-and-conditions/" className="underline">Terms &amp; Conditions</Link>.</span>
        </label>
      </div>

      {error && <p role="alert" className="mt-3 rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-orange mt-4 w-full py-4 text-lg disabled:opacity-70">
        {loading ? "Sending…" : "Get My Free Quote Now"} <Arrow className="h-5 w-5" />
      </button>

      <ul className={`mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[12px] ${dark ? "text-white/60" : "text-muted"}`}>
        {["No deposit to book", "Carrier insurance verified", "Response within business hours"].map((t) => (
          <li key={t} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" />{t}</li>
        ))}
        <li className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" />Your information is safe</li>
      </ul>
    </form>
  );
}
