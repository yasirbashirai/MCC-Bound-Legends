import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";

/**
 * Quote intake. Same behaviour as the old WordPress pages' send.php: the lead is emailed to the
 * business inbox over AUTHENTICATED SMTP (the Hostinger mailbox), with Reply-To = the customer.
 *
 * Why SMTP first: unauthenticated / "activation" style senders silently dropped every lead on the
 * old site (FormSubmit, bare PHP mail(), 2026-10-09). A logged-in mailbox is what actually delivers.
 *
 *   SMTP_HOST (default smtp.hostinger.com), SMTP_PORT (default 465), SMTP_USER, SMTP_PASS
 *   LEAD_TO_EMAIL (comma separated, default Jeff.c@), LEAD_FROM_EMAIL (default SMTP_USER)
 *   Optional extra channels: RESEND_API_KEY · TWILIO_* + LEAD_TO_SMS · CRM_WEBHOOK_URL
 *
 * Never fakes success: if no email/webhook channel delivered the lead, the API answers 502 and the
 * form tells the visitor to call instead of showing a thank-you page for a lead nobody received.
 */
const FIELDS = ["ship_type","pickup_zip","delivery_zip","pickup_date","operable","transport_type","year","make","model","ymm","boat_type","length","width","height","weight","trailer_available","loading_equipment","attachments","name","phone","email","notes","sms_consent","page","service"] as const;

const LABELS: Record<string, string> = {
  ship_type: "Shipping", pickup_zip: "Pickup ZIP", delivery_zip: "Delivery ZIP", pickup_date: "Pickup date",
  operable: "Vehicle condition", transport_type: "Transport type", ymm: "Year / Make / Model", boat_type: "Boat type", trailer_available: "Trailer",
  loading_equipment: "Loading equipment", sms_consent: "SMS consent",
};
const label = (k: string) => LABELS[k] ?? k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(req: Request) {
  let data: Record<string, string>;
  try { data = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  // Honeypot + basic validation
  if (data.company_website) return NextResponse.json({ ok: true });
  if (!data.name || !data.phone || !data.email || !data.pickup_zip || !data.delivery_zip) return NextResponse.json({ ok: false, error: "missing" }, { status: 422 });

  const lead = Object.fromEntries(FIELDS.map((k) => [k, oneLine((data[k] ?? "").toString().slice(0, 500))]));
  const when = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const rows = Object.entries(lead).filter(([, v]) => v);
  const subject = `New quote: ${lead.ship_type} ${lead.pickup_zip} → ${lead.delivery_zip} (${lead.name})`;
  const text = `${subject}\n${when} ET\n\n${rows.map(([k, v]) => `${label(k)}: ${v}`).join("\n")}`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0f172a"><h2 style="color:#0d1f35;margin:0 0 12px">${esc(subject)}</h2>`
    + `<table style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #dbe3ee;background:#f4f7fb;font-weight:600;white-space:nowrap">${esc(label(k))}</td><td style="padding:8px 12px;border:1px solid #dbe3ee">${esc(v)}</td></tr>`).join("")}`
    + `<tr><td style="padding:8px 12px;border:1px solid #dbe3ee;background:#f4f7fb;font-weight:600">Submitted</td><td style="padding:8px 12px;border:1px solid #dbe3ee">${esc(when)} ET</td></tr></table>`
    + `<p style="color:#64748b;font-size:13px">Hit Reply to answer the customer directly.</p></div>`;

  const to = (process.env.LEAD_TO_EMAIL ?? site.contact.email).split(",").map((s) => s.trim()).filter(Boolean);
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) ? { name: lead.name, address: lead.email } : undefined;

  /** Channels that count as "the lead was delivered". */
  const delivery: { name: string; run: () => Promise<unknown> }[] = [];

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    delivery.push({ name: "smtp", run: async () => {
      const port = Number(process.env.SMTP_PORT ?? 465);
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "smtp.hostinger.com", port, secure: port === 465,
        auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
      });
      await transport.sendMail({ from: process.env.LEAD_FROM_EMAIL ?? `MCC Bound Legends Website <${process.env.SMTP_USER}>`, to, replyTo, subject, text, html });
    } });
  }

  if (process.env.RESEND_API_KEY) {
    delivery.push({ name: "resend", run: async () => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL ?? `MCC Website <leads@${new URL(site.url).hostname}>`, to, reply_to: lead.email, subject, text, html }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
    } });
  }

  if (process.env.CRM_WEBHOOK_URL) {
    delivery.push({ name: "webhook", run: async () => {
      const res = await fetch(process.env.CRM_WEBHOOK_URL!, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...lead, received_at: when }) });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } });
  }

  // SMS is a bonus alert, never the only record of a lead
  const sms = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM && process.env.LEAD_TO_SMS
    ? fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: "POST",
        headers: { Authorization: "Basic " + Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ From: process.env.TWILIO_FROM, To: process.env.LEAD_TO_SMS, Body: `MCC lead: ${lead.name} ${lead.phone} · ${lead.ship_type} ${lead.pickup_zip}→${lead.delivery_zip}${lead.pickup_date ? " · " + lead.pickup_date : ""}` }),
      }).catch((e) => console.error("[quote] sms failed", e))
    : Promise.resolve();

  // The full lead always lands in the server log (Vercel → Logs), so it can be recovered by hand
  console.log("[quote] lead\n" + text);

  const results = await Promise.allSettled(delivery.map((d) => d.run()));
  await sms;
  results.forEach((r, i) => { if (r.status === "rejected") console.error(`[quote] ${delivery[i].name} delivery failed`, r.reason); });

  if (!results.some((r) => r.status === "fulfilled")) {
    console.error(delivery.length ? "[quote] EVERY delivery channel failed" : "[quote] no delivery channel configured (set SMTP_USER + SMTP_PASS)");
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
