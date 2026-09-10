# Sitemap + 301 Redirect Map

Rule from client (Doc 2): flat URLs, nothing under `/services/`. Every old URL 301s to its new home.

## Phase 1 URLs (15 + 3 utility)

| New URL | Old URL on current site → 301 |
|---|---|
| `/` | `/` (no change) |
| `/services/` | `/services/` (keep; also 301 `/services-2/` duplicate here) |
| `/auto-transport/` | `/services/car-shipping/`, `/services/open-car-transport/`, `/services/large-truck-suv-or-van-shipping/` |
| `/enclosed-auto-transport/` | `/services/enclosed-car-transport/`, `/services/antique-and-classic-car-shipping/` |
| `/boat-transport/` | `/services/boat-and-yacht-transport/` |
| `/rv-transport/` | (new, no old page) |
| `/commercial-vehicle-transport/` | (new) |
| `/construction-equipment-transport/` | (new) |
| `/heavy-equipment-transport/` | `/services/heavy-equipment-shipping/` |
| `/motorcycle-transport/` | `/services/motorcycle-transport/`, `/services/atvs-and-utvs-transport/` |
| `/expedited-transport/` ★ | `/services/expedited-transport/` |
| `/military-transport/` ★ | `/services/military-and-veterans-transport/` |
| `/about-us/` | `/about-us/` (no change) |
| `/how-it-works/` | `/how-does-it-work/` |
| `/testimonials/` | `/testimonials/` (no change) |
| `/faq/` | `/faq/` (no change) |
| `/contact/` | `/contact-us/` |
| `/privacy-policy/` | `/privacy-policy/` (no change) |
| `/terms-and-conditions/` | `/terms-and-condition/` |
| `/thank-you/` (noindex) | (new) |
| `/auto-transport-tips/` | `/auto-transport-tips/` (keep; tips hub in Growth) |

★ = pulled forward from Phase 2 / added because the homepage grid links to them (see analysis §7).

## Phase 2 URLs (after ads run)

| New URL | Old URL → 301 |
|---|---|
| `/box-truck-transport/` | — |
| `/semi-truck-transport/` | — |
| `/fleet-vehicle-transport/` | — |
| `/excavator-transport/` | — |
| `/skid-steer-transport/` | — |
| `/bulldozer-transport/` | — |
| `/forklift-transport/` | — |
| `/yacht-transport/` | — |
| `/non-running-vehicle-transport/` | — |
| `/auction-vehicle-transport/` | `/services/auction-auto-transport/` (until built, 301 this old URL to `/auto-transport/`) |
| `/military-transport/` | already built in Phase 1 |

## Homepage links that must resolve

Doc 1 links (old style) → map to: `/services/car-shipping/`→`/auto-transport/` · `/services/boat-and-yacht-transport/`→`/boat-transport/` · `/services/rv-transport/`→`/rv-transport/` · `/services/commercial-vehicle-transport/`→`/commercial-vehicle-transport/` · `/services/heavy-equipment-shipping/`→`/construction-equipment-transport/` (card says "Construction Equipment") · `/services/motorcycle-transport/`→`/motorcycle-transport/` · `/services/enclosed-car-transport/`→`/enclosed-auto-transport/` · `/services/expedited-transport/`→`/expedited-transport/` · `/services/military-and-veterans-transport/`→`/military-transport/` · `/how-does-it-work/`→`/how-it-works/`

## Verified external links (from live site)

- Google reviews: `https://www.google.com/search?q=MCC+Bound+Legends+LLC+Reviews` (clean the long tracking URL)
- Trustpilot: `https://www.trustpilot.com/review/mccboundlegends.com`
- Yelp: `https://www.yelp.com/biz/mcc-bound-legends-altamonte-springs-2`
- UShip: `https://www.uship.com/service-provider/42830213-mcc-bound-legends-llc`
- BBB: **none exists on current site — ask client**
- Facebook: `https://www.facebook.com/profile.php?id=61588881759403`
- Instagram: `https://www.instagram.com/mccboundlegends`
- TikTok: `https://www.tiktok.com/@mcc_bound_legends`
