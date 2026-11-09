import { getShipOption } from "@/data/quote";
/** GTM dataLayer helpers. Events are mapped to Google Ads conversions inside GTM. */
type DL = Record<string, unknown>;
declare global { interface Window { dataLayer?: DL[] } }

export function track(event: string, data: DL = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export const trackPhoneClick = (location: string) => track("phone_click", { click_location: location });
/**
 * Lead conversion (developer brief 2026-11-03, section 5.2): call ONLY after the server confirmed the lead.
 * GTM fires the Google Ads conversion "TechSol - Contact us form 38134" on the custom event `quote_submitted`.
 * `user_data` (email + phone) is there for enhanced conversions for leads: map it in GTM to a
 * "User-Provided Data" variable on the Google tag; Google hashes it before sending.
 */
export function trackQuoteSubmit(shipType: string, page: string, user?: { email?: string; phone?: string }) {
  const label = getShipOption(shipType)?.label ?? shipType; // old forms send the slug, the 3-step form the label
  const d = (user?.phone ?? "").replace(/\D/g, "");
  const phone = d.length === 10 ? `+1${d}` : d.length === 11 && d[0] === "1" ? `+${d}` : "";
  track("quote_submitted", {
    ship_type: label,
    form_page: page,
    ...(user?.email || phone ? { user_data: { ...(user?.email ? { email: user.email.trim().toLowerCase() } : {}), ...(phone ? { phone_number: phone } : {}) } } : {}),
  });
}
