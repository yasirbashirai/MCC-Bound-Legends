/**
 * Ad attribution for every quote form (developer brief 2026-11-03, section 5.4).
 * Stored in a first-party cookie when the visitor lands, so the values survive if they browse to
 * another page before submitting. Same logic as the client's quote-form mock (cookie "mccq_attr", 90 days):
 *   gclid · utm_source · utm_campaign from the URL, landing_page = first page visited.
 */
export const ATTRIBUTION_KEYS = ["gclid", "utm_source", "utm_campaign", "landing_page"] as const;
export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;
const COOKIE = "mccq_attr";

export function readAttribution(): Attribution {
  if (typeof document === "undefined") return {};
  let data: Attribution = {};
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )" + COOKIE + "=([^;]*)"));
    if (m) data = JSON.parse(decodeURIComponent(m[1])) || {};
  } catch { data = {}; }
  try {
    const p = new URLSearchParams(window.location.search);
    const fresh = { gclid: p.get("gclid"), utm_source: p.get("utm_source"), utm_campaign: p.get("utm_campaign") };
    if (fresh.gclid || fresh.utm_source || !data.landing_page) {
      data.gclid = fresh.gclid || data.gclid || "";
      data.utm_source = fresh.utm_source || data.utm_source || "";
      data.utm_campaign = fresh.utm_campaign || data.utm_campaign || "";
      data.landing_page = data.landing_page && !fresh.gclid ? data.landing_page : window.location.pathname;
      document.cookie = COOKIE + "=" + encodeURIComponent(JSON.stringify(data)) + "; max-age=" + 60 * 60 * 24 * 90 + "; path=/; SameSite=Lax";
    }
  } catch { /* cookies blocked: the form still works, just without attribution */ }
  return data;
}
