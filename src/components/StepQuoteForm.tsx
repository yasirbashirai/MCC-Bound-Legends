"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { site } from "@/data/site";
import { shipOptions, smsConsent } from "@/data/quote";
import { readAttribution, ATTRIBUTION_KEYS } from "@/lib/attribution";
import { trackQuoteSubmit } from "@/lib/analytics";
import { PhoneLink } from "./PhoneLink";

/**
 * MCC 3-step quote form — built 1:1 from the client's developer brief (Website-Developer-Brief.pdf,
 * 2026-11-03) and its working mock (quote-form-preview.html, block MCC-QUOTE-FORM).
 *
 *   Step 1 Route    ship_type (preselected per page) · pickup_zip · delivery_zip
 *   Step 2 Details  fields depend on Step 1 (vehicle / boat / equipment / something else), all required
 *   Step 3 Contact  pickup_date (optional) · name · phone · email · sms_consent (unchecked, optional)
 *
 * Field names are the ones the site already sends, so /api/quote/ keeps working. The lead is sent
 * ONCE, on the Step 3 submit; `quote_submitted` is pushed to the dataLayer only after the server
 * confirms (never on a button click, Step 1/2 or a failed submit). Back keeps what was typed
 * (every field stays mounted; groups that do not apply are hidden + disabled so they are not sent).
 */
type Group = "vehicle" | "boat" | "equip" | "other";
const BOAT = ["Boat With Trailer", "Boat Without Trailer", "Yacht / Large Vessel"];
const EQUIP = ["Construction Equipment", "Heavy / Industrial Machinery"];
const groupOf = (v: string): Group => (BOAT.includes(v) ? "boat" : EQUIP.includes(v) ? "equip" : v === "Something Else" ? "other" : "vehicle");

const BOAT_TYPES = ["Center Console", "Sailboat", "Yacht / Mega Yacht", "Pontoon Boat", "Fishing Boat", "Speedboat", "Cabin Cruiser", "Jet Ski / PWC", "Other"];
const TRAILER = ["Yes, road-worthy", "Yes, not road-worthy", "No trailer", "Not sure"];
const TRANSPORT = ["Open Carrier", "Enclosed Carrier", "Flatbed / Step Deck", "Not Sure"];
const CONDITION = ["Running", "Non-Running"];

const digits = (s: string) => (s || "").replace(/\D/g, "");

/** Same rules + messages as the client's mock. */
function checkField(el: HTMLInputElement | HTMLSelectElement): string {
  if (el.disabled) return "";
  const v = (el.value || "").trim();
  const kind = el.getAttribute("data-check");
  if (el.required && !v) return el.tagName === "SELECT" ? "Please choose one." : "Please fill this in.";
  if (!v) return "";
  if (kind === "zip" && !/^\d{5}$/.test(v)) return "Enter a 5-digit ZIP code.";
  if (kind === "phone") { const d = digits(v); if (!(d.length === 10 || (d.length === 11 && d[0] === "1"))) return "Enter a 10-digit phone number."; }
  if (kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email address.";
  if (kind === "length") { const n = Number(v); if (!(n >= 5 && n <= 200)) return "Enter a length between 5 and 200 ft."; }
  return "";
}

/* Field helpers at module level so React keeps their identity (typed values survive re-renders / Back). */
type FieldProps = { id: string; label: string; error?: string; disabled: boolean };
const ErrBox = ({ msg }: { msg?: string }) => <div className="mccq-err" aria-live="polite">{msg ?? ""}</div>;
function SelectField({ id, name, label, options, error, disabled, defaultValue = "" }: FieldProps & { name: string; options: string[]; defaultValue?: string }) {
  return (
    <div className="mccq-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} required disabled={disabled} defaultValue={defaultValue} aria-invalid={error ? true : undefined}>
        <option value="">Select</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ErrBox msg={error} />
    </div>
  );
}
function YmmField({ id, label, placeholder, error, disabled }: FieldProps & { placeholder: string }) {
  return (
    <div className="mccq-field">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} name="ymm" placeholder={placeholder} required disabled={disabled} aria-invalid={error ? true : undefined} />
      <ErrBox msg={error} />
    </div>
  );
}

type Props = {
  /** ship_type label to preselect (one of the 16 options); empty = "Select shipment type" (homepage). */
  preselect?: string;
  /** Preset Step 2 condition, e.g. "Non-Running" on /non-running-vehicle-transport/. */
  presetCondition?: string;
  /** Hidden `service` field for the lead email (page name). */
  serviceName?: string;
  className?: string;
};

export function StepQuoteForm({ preselect = "", presetCondition = "", serviceName = "", className = "" }: Props) {
  const path = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1);
  const [ship, setShip] = useState(shipOptions.some((o) => o.label === preselect) ? preselect : "");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [doneName, setDoneName] = useState<string | null>(null);
  const group = groupOf(ship);

  // Attribution hidden fields (gclid / utm / landing page) + today's date as the date-picker minimum
  useEffect(() => {
    const a = readAttribution();
    ATTRIBUTION_KEYS.forEach((k) => { const el = formRef.current?.elements.namedItem(k) as HTMLInputElement | null; if (el) el.value = a[k] ?? ""; });
    const t = new Date();
    const date = formRef.current?.elements.namedItem("pickup_date") as HTMLInputElement | null;
    if (date) date.min = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }, []);

  // "Boat Without Trailer" presets the trailer answer to "No trailer" (only if still empty)
  useEffect(() => {
    const tr = formRef.current?.elements.namedItem("trailer_available") as HTMLSelectElement | null;
    if (tr && ship === "Boat Without Trailer" && !tr.value) tr.value = "No trailer";
  }, [ship]);

  const keyOf = (el: Element) => el.id;
  const setErr = (el: HTMLInputElement | HTMLSelectElement, msg: string) => setErrs((e) => (e[keyOf(el)] === msg ? e : { ...e, [keyOf(el)]: msg }));

  function validate(n: number): boolean {
    const box = formRef.current?.querySelector(`[data-step="${n}"]`);
    if (!box) return true;
    const next: Record<string, string> = {};
    let first: HTMLInputElement | HTMLSelectElement | null = null;
    box.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select").forEach((el) => {
      if (el.type === "checkbox" || el.type === "hidden") return;
      const msg = checkField(el);
      next[keyOf(el)] = msg;
      if (msg && !first) first = el;
    });
    setErrs((e) => ({ ...e, ...next }));
    if (first) (first as HTMLElement).focus();
    return !first;
  }

  function go(n: number) {
    setStep(n);
    requestAnimationFrame(() => {
      const box = formRef.current?.querySelector(`[data-step="${n}"]`);
      const firstEl = box?.querySelector<HTMLElement>('input:not([type="hidden"]):not(:disabled), select:not(:disabled)');
      try { firstEl?.focus({ preventScroll: true }); } catch { firstEl?.focus(); }
      const top = rootRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  const next = () => { if (validate(step)) go(step + 1); };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 3) { next(); return; }
    if (!validate(3)) return;
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => { data[k] = String(v); });
    if (!data.sms_consent) data.sms_consent = "no";
    setFormErr("");

    const finish = () => { setDoneName((data.name || "").trim().split(/\s+/)[0] || ""); requestAnimationFrame(() => rootRef.current?.querySelector<HTMLElement>(".mccq-done")?.focus({ preventScroll: true })); };
    // Spam trap filled in: act as if it worked, send nothing, track nothing
    if (data.company_website) { finish(); return; }

    setSending(true);
    try {
      const res = await fetch("/api/quote/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, page: path, service: serviceName }) });
      if (!res.ok) throw new Error("bad status");
      trackQuoteSubmit(data.ship_type, path ?? "/", { email: data.email, phone: data.phone });
      finish();
    } catch {
      setFormErr(`We couldn't send your request. Please try again, or call ${site.phone}.`);
    } finally {
      setSending(false);
    }
  }

  // Live re-check of a field that is already flagged; ZIPs keep digits only
  function onInput(e: React.FormEvent<HTMLFormElement>) {
    const el = e.target as HTMLInputElement | HTMLSelectElement;
    if (el.getAttribute("data-check") === "zip") el.value = digits(el.value).slice(0, 5);
    if (el.getAttribute("aria-invalid") === "true") setErr(el, checkField(el));
  }
  function onKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter" && step < 3 && (e.target as HTMLElement).tagName === "INPUT") { e.preventDefault(); next(); }
  }

  /* ── small field helpers ───────────────────────────────────────── */
  const err = (id: string) => <ErrBox msg={errs[id]} />;
  const inv = (id: string) => (errs[id] ? { "aria-invalid": true as const } : {});
  const off = (g: Group) => group !== g;

  const done = doneName !== null;
  return (
    <div ref={rootRef} className={`mccq ${className}`} id="quote">
      <form ref={formRef} className="mccq-form" noValidate onSubmit={onSubmit} onInput={onInput} onKeyDown={onKeyDown}>
        <div className="mccq-head" hidden={done}>
          <p className="mccq-eyebrow">Free quote · No deposit</p>
          <h2 className="mccq-title">Get your free transport quote</h2>
        </div>

        <ol className="mccq-progress" aria-label="Quote progress" hidden={done}>
          {["Route", "Details", "Contact"].map((t, i) => (
            <li key={t} className={i + 1 === step ? "is-active" : i + 1 < step ? "is-done" : ""} aria-current={i + 1 === step ? "step" : undefined}><span>{t}</span></li>
          ))}
        </ol>

        {/* Spam trap + attribution (filled from the first-party cookie on mount) */}
        <div className="mccq-hp" aria-hidden="true">
          <label htmlFor="mccq-company-website">Company website</label>
          <input type="text" id="mccq-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
        </div>
        {ATTRIBUTION_KEYS.map((k) => <input key={k} type="hidden" name={k} />)}

        {/* STEP 1 — Route */}
        <fieldset className="mccq-step" data-step="1" hidden={done || step !== 1}>
          <legend className="mccq-legend">Step 1 of 3: Route</legend>
          <div className="mccq-field">
            <label htmlFor="mccq-ship-type">What are you shipping?</label>
            <select id="mccq-ship-type" name="ship_type" required value={ship} onChange={(e) => { setShip(e.target.value); setErr(e.target, e.target.getAttribute("aria-invalid") ? checkField(e.target) : ""); }} {...inv("mccq-ship-type")}>
              <option value="">Select shipment type</option>
              {shipOptions.map((o) => <option key={o.value}>{o.label}</option>)}
            </select>
            {err("mccq-ship-type")}
          </div>
          <div className="mccq-row">
            <div className="mccq-field">
              <label htmlFor="mccq-pickup-zip">Pick-up ZIP</label>
              <input type="text" id="mccq-pickup-zip" name="pickup_zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="e.g. 48226" required data-check="zip" {...inv("mccq-pickup-zip")} />
              {err("mccq-pickup-zip")}
            </div>
            <div className="mccq-field">
              <label htmlFor="mccq-delivery-zip">Drop-off ZIP</label>
              <input type="text" id="mccq-delivery-zip" name="delivery_zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="e.g. 33602" required data-check="zip" {...inv("mccq-delivery-zip")} />
              {err("mccq-delivery-zip")}
            </div>
          </div>
          <button type="button" className="mccq-btn" onClick={next}>Get my quote →</button>
          <p className="mccq-trust"><b>No deposit</b> · USDOT {site.usdot} · MC {site.mc} · Licensed &amp; insured carriers</p>
        </fieldset>

        {/* STEP 2 — Details (one group shows, based on Step 1) */}
        <fieldset className="mccq-step" data-step="2" hidden={done || step !== 2}>
          <legend className="mccq-legend">Step 2 of 3: Details</legend>

          <div className="mccq-group" hidden={off("vehicle")}>
            <YmmField id="mccq-ymm-vehicle" label="Year, make & model" placeholder="e.g. 2021 Ford F-150" error={errs["mccq-ymm-vehicle"]} disabled={off("vehicle")} />
            <div className="mccq-row">
              <SelectField id="mccq-operable-vehicle" name="operable" label="Condition" options={CONDITION} defaultValue={presetCondition} error={errs["mccq-operable-vehicle"]} disabled={off("vehicle")} />
              <SelectField id="mccq-transport-vehicle" name="transport_type" label="Transport type" options={TRANSPORT} error={errs["mccq-transport-vehicle"]} disabled={off("vehicle")} />
            </div>
          </div>

          <div className="mccq-group" hidden={off("boat")}>
            <YmmField id="mccq-ymm-boat" label="Year, make & model" placeholder="e.g. 2019 Boston Whaler" error={errs["mccq-ymm-boat"]} disabled={off("boat")} />
            <div className="mccq-row">
              <SelectField id="mccq-boat-type" name="boat_type" label="Boat type" options={BOAT_TYPES} error={errs["mccq-boat-type"]} disabled={off("boat")} />
              <div className="mccq-field">
                <label htmlFor="mccq-length">Length (ft)</label>
                <input type="number" id="mccq-length" name="length" inputMode="numeric" min={5} max={200} placeholder="e.g. 24" required data-check="length" disabled={off("boat")} {...inv("mccq-length")} />
                {err("mccq-length")}
              </div>
            </div>
            <SelectField id="mccq-trailer" name="trailer_available" label="Do you have a trailer?" options={TRAILER} defaultValue={preselect === "Boat Without Trailer" ? "No trailer" : ""} error={errs["mccq-trailer"]} disabled={off("boat")} />
          </div>

          <div className="mccq-group" hidden={off("equip")}>
            <YmmField id="mccq-ymm-equip" label="Make & model" placeholder="e.g. CAT 320 excavator" error={errs["mccq-ymm-equip"]} disabled={off("equip")} />
            <div className="mccq-row">
              <SelectField id="mccq-operable-equip" name="operable" label="Condition" options={CONDITION} defaultValue={presetCondition} error={errs["mccq-operable-equip"]} disabled={off("equip")} />
              <SelectField id="mccq-transport-equip" name="transport_type" label="Transport type" options={TRANSPORT} error={errs["mccq-transport-equip"]} disabled={off("equip")} />
            </div>
          </div>

          <div className="mccq-group" hidden={off("other")}>
            <YmmField id="mccq-ymm-other" label="Describe what you're shipping" placeholder="e.g. 20 ft shipping container" error={errs["mccq-ymm-other"]} disabled={off("other")} />
            <SelectField id="mccq-transport-other" name="transport_type" label="Transport type" options={TRANSPORT} error={errs["mccq-transport-other"]} disabled={off("other")} />
          </div>

          <div className="mccq-nav">
            <button type="button" className="mccq-back" onClick={() => go(1)}>← Back</button>
            <button type="button" className="mccq-btn" onClick={next}>Continue →</button>
          </div>
        </fieldset>

        {/* STEP 3 — Contact */}
        <fieldset className="mccq-step" data-step="3" hidden={done || step !== 3}>
          <legend className="mccq-legend">Step 3 of 3: Contact</legend>
          <div className="mccq-field">
            <label htmlFor="mccq-pickup-date">Preferred pickup date <span className="mccq-opt">(leave blank if flexible)</span></label>
            <input type="date" id="mccq-pickup-date" name="pickup_date" />
          </div>
          <div className="mccq-field">
            <label htmlFor="mccq-name">Your name</label>
            <input type="text" id="mccq-name" name="name" autoComplete="name" required {...inv("mccq-name")} />
            {err("mccq-name")}
          </div>
          <div className="mccq-row">
            <div className="mccq-field">
              <label htmlFor="mccq-phone">Phone</label>
              <input type="tel" id="mccq-phone" name="phone" autoComplete="tel" placeholder="(555) 555-5555" required data-check="phone" {...inv("mccq-phone")} />
              {err("mccq-phone")}
            </div>
            <div className="mccq-field">
              <label htmlFor="mccq-email">Email</label>
              <input type="email" id="mccq-email" name="email" autoComplete="email" required data-check="email" {...inv("mccq-email")} />
              {err("mccq-email")}
            </div>
          </div>
          <label className="mccq-check" htmlFor="mccq-sms">
            <input type="checkbox" id="mccq-sms" name="sms_consent" value="yes" />
            <span>{smsConsent} Please review our <Link href="/privacy-policy/">Privacy Policy</Link> and <Link href="/terms-and-conditions/">Terms &amp; Conditions</Link>.</span>
          </label>
          <div className="mccq-err" aria-live="polite">{formErr}</div>
          <div className="mccq-nav">
            <button type="button" className="mccq-back" onClick={() => go(2)}>← Back</button>
            <button type="submit" className="mccq-btn" disabled={sending}>{sending ? "Sending…" : "Get my free quote"}</button>
          </div>
        </fieldset>

        {/* Success */}
        <div className="mccq-done" hidden={!done} tabIndex={-1}>
          <div className="mccq-done-icon" aria-hidden="true" />
          <h3>Quote request received</h3>
          <p>{doneName ? `Thanks, ${doneName}. ` : ""}We&apos;ll call you shortly with your quote.</p>
          <p>Need it faster? Call us:</p>
          <PhoneLink location="quote_thank_you" className="mccq-phone">{site.phone}</PhoneLink>
        </div>
      </form>
    </div>
  );
}
