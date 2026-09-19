/**
 * Single source of truth for business facts.
 * Every phone number, address, credential and link on the site reads from here.
 */
export const site = {
  name: "MCC Bound Legends",
  legalName: "MCC Bound Legends LLC",
  tagline: "Putting Trust in Motion",
  url: "https://mccboundlegends.com",
  category:
    "Nationwide Transportation Brokerage / Vehicle & Specialty Equipment Transport Coordination",
  phone: "(888) 785-0028",
  phoneHref: "tel:8887850028",
  email: "info@mccboundlegends.com",
  contact: { name: "Jeffrey Coicou", email: "Jeff.c@mccboundlegends.com" },
  address: {
    street: "283 Cranes Roost Blvd, Suite 111",
    city: "Altamonte Springs",
    state: "FL",
    zip: "32701",
    full: "283 Cranes Roost Blvd, Suite 111, Altamonte Springs, FL 32701",
  },
  hours: "Mon–Sat, 8:00 AM–6:00 PM ET",
  hoursSchema: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" }],
  usdot: "4464266",
  mc: "1760960",
  social: {
    facebook: "https://www.facebook.com/mccboundlegends/",
    instagram: "https://www.instagram.com/mccboundlegends/",
    tiktok: "https://www.tiktok.com/@mcc_bound_legends",
    youtube: "https://www.youtube.com/@MCCBoundLegends",
  },
  reviews: {
    google: "https://www.google.com/search?q=MCC+Bound+Legends+LLC+Reviews",
    trustpilot: "https://www.trustpilot.com/review/mccboundlegends.com",
    /** BBB profile not verified yet — search link until the client sends the real profile URL. */
    bbb: "https://www.bbb.org/search?find_country=USA&find_text=MCC+Bound+Legends",
    yelp: "https://www.yelp.com/biz/mcc-bound-legends-altamonte-springs-2",
    uship: "https://www.uship.com/service-provider/42830213-mcc-bound-legends-llc",
  },
  /** Accurate brokerage trust points. Never claim MCC is the motor carrier or the insurer. */
  trust: [
    { label: "Licensed & Bonded Freight Broker", sub: `USDOT ${"4464266"} · MC ${"1760960"}` },
    { label: "Vetted Motor Carriers", sub: "Nationwide network" },
    { label: "Carrier Insurance Verified", sub: "Before every dispatch" },
    { label: "No Deposit to Book", sub: "Pay when your carrier is assigned" },
  ],
  /** Florida markets get local authority; nationwide comes first in all copy. */
  floridaMarkets: [
    "Altamonte Springs", "Orlando", "Sanford", "Lake Mary", "Tampa", "Miami",
    "Fort Lauderdale", "West Palm Beach", "Jacksonville", "Daytona Beach", "Sarasota", "Naples",
  ],
  nationalMarkets: [
    "Florida", "New York", "New Jersey", "Texas", "California", "Georgia", "North Carolina",
    "South Carolina", "Pennsylvania", "Massachusetts", "Michigan", "Illinois", "Arizona", "Colorado",
  ],
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
};

export type Site = typeof site;
