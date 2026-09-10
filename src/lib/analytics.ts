/** GTM dataLayer helpers. Events are mapped to Google Ads conversions inside GTM. */
type DL = Record<string, unknown>;
declare global { interface Window { dataLayer?: DL[] } }

export function track(event: string, data: DL = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export const trackPhoneClick = (location: string) => track("phone_click", { click_location: location });
export const trackQuoteSubmit = (shipType: string, page: string) => track("quote_submit", { ship_type: shipType, page_path: page });
