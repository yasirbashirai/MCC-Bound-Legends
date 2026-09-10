import { NextResponse } from "next/server";
import { site } from "@/data/site";

/**
 * Quote intake. Delivers the lead by email (Resend) and optionally SMS (Twilio),
 * both configured through environment variables. Fails soft: if a provider is
 * not configured the lead is still logged so nothing is silently lost.
 *
 *   RESEND_API_KEY, LEAD_TO_EMAIL (comma separated), LEAD_FROM_EMAIL
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, LEAD_TO_SMS
 *   CRM_WEBHOOK_URL (optional: JSON POST of the full lead to any CRM/Zapier/Make endpoint)
 */
const FIELDS = ["ship_type","pickup_zip","delivery_zip","pickup_date","operable","year","make","model","ymm","length","width","height","weight","trailer_available","loading_equipment","attachments","name","phone","email","notes","sms_consent","page","service"] as const;

export async function POST(req: Request) {
  let data: Record<string, string>;
  try { data = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  // Honeypot + basic validation
  if (data.company_website) return NextResponse.json({ ok: true });
  if (!data.name || !data.phone || !data.email || !data.pickup_zip || !data.delivery_zip) return NextResponse.json({ ok: false, error: "missing" }, { status: 422 });

  const lead = Object.fromEntries(FIELDS.map((k) => [k, (data[k] ?? "").toString().slice(0, 500)]));
  const when = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const lines = Object.entries(lead).filter(([, v]) => v).map(([k, v]) => `${k.replace(/_/g, " ").toUpperCase()}: ${v}`);
  const subject = `New quote: ${lead.ship_type} ${lead.pickup_zip} → ${lead.delivery_zip} (${lead.name})`;
  const text = `${subject}\n${when} ET\n\n${lines.join("\n")}`;

  const jobs: Promise<unknown>[] = [];

  if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL) {
    jobs.push(fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL ?? `MCC Website <leads@${new URL(site.url).hostname}>`, to: process.env.LEAD_TO_EMAIL.split(","), reply_to: lead.email, subject, text }),
    }));
  }

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM && process.env.LEAD_TO_SMS) {
    const body = new URLSearchParams({ From: process.env.TWILIO_FROM, To: process.env.LEAD_TO_SMS, Body: `MCC lead: ${lead.name} ${lead.phone} · ${lead.ship_type} ${lead.pickup_zip}→${lead.delivery_zip}${lead.pickup_date ? " · " + lead.pickup_date : ""}` });
    jobs.push(fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: { Authorization: "Basic " + Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }));
  }

  if (process.env.CRM_WEBHOOK_URL) {
    jobs.push(fetch(process.env.CRM_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...lead, received_at: when }) }));
  }

  if (jobs.length === 0) console.log("[quote] no delivery provider configured\n" + text);
  const results = await Promise.allSettled(jobs);
  results.forEach((r) => { if (r.status === "rejected") console.error("[quote] delivery failed", r.reason); });

  return NextResponse.json({ ok: true });
}
