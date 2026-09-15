# Build Notes + Launch Checklist

## Stack
Next.js 16 (App Router, static export per page) · Tailwind v4 · TypeScript · deployed on Vercel.
Fonts: Barlow Condensed (display) + Inter (body).

## Visual system v3 (2026-09-11, matches client's reference concept)
- White header with overhanging shield logo plate, navy links, orange display CTA.
- `LandingHero` (Landing.tsx): photo visible, left message + 4 trust items, white minimal quote card (type, ZIPs, name, phone, email + SMS consent), right badge column (xl). Used on home AND every category/service page (with breadcrumbs, page-specific form preselect + tagline).
- `PhotoCardRow`: 7 photo cards with white caption strips (home: categories; category pages: vehicle types, boat page uses 6 boat-type thumbs).
- `StatsBand` (real numbers only) and `WhyBand` (photo backdrop, 4 icon points, orange CTA).
- Placeholder thumbs `thumb-*.webp` / `type-*.webp` were extracted from the client's own reference concepts; replace with generated images from the prompt pack.
- `iconFor()` in services.ts maps any vehicle label to the best silhouette for fallback cards.

## Visual system v2 (2026-09-11)
- **Hero**: full-bleed Ken Burns crossfade slideshow (`HeroSlideshow.tsx`) with scroll parallax, staggered word-reveal headline, glass quote card, category ribbon.
- **Photos auto-detect** from `public/images/photos/` (`src/lib/images.ts`). Missing files fall back to the illustrated treatment. Filenames + prompts: `docs/06-IMAGE-PROMPT-PACK.md`. Currently loaded: hero-1/2/3, cat-auto, cat-commercial, cat-boat, section-florida/cab/skyline (all derived from the client's 2 images).
- **Motion**: reveal variants (up/left/right/scale + stagger via `--d`), count-up facts strip (real numbers only), animated timeline line, review carousel (auto, swipe), brand ticker, CTA shimmer, image-card zoom + gradient underline, back-to-top.
- **Bento category grid**: photo cards, first card 2x2.

## Architecture (client's 4-layer structure)
| Layer | Where | Count |
|---|---|---|
| What are you shipping? | `src/data/services.ts` kind `category` | 7 |
| What exactly is it? | kind `service` | 9 |
| Special situation | kind `situation` | 5 |
| Where (state/region/route) | NOT built at launch, add when GSC/Ads data justifies | 0 |

Total live URLs: 33 (20 service pages + home, services, get-a-quote, how-it-works, about-us, testimonials, faq, contact, privacy, terms, thank-you + sitemap/robots).
**To add a page:** add one object to `pages[]` in `src/data/services.ts`. Route, sitemap, breadcrumbs, schema, mega menu, footer, internal links and form preselection all follow automatically.

## Quote form (`src/components/QuoteForm.tsx`)
- Page-aware: each service page passes `formDefault` → correct vehicle preselected.
- Conditional fields per ship type (`src/data/quote.ts`): dimensions, trailer, loading equipment, attachments.
- SMS consent text kept verbatim from the old site; honeypot; posts to `/api/quote/`.
- Delivery (`src/app/api/quote/route.ts`): Resend email + Twilio SMS + optional CRM webhook, all via env vars. Without env vars the lead is logged to server console (never lost silently).
- On success → `/thank-you/` (noindex) and pushes `quote_submit` to `dataLayer`. Phone clicks push `phone_click`.

## SEO built in
One H1 per page · unique title/meta (absolute, no template doubling) · canonical · OG/Twitter · `sitemap.xml` · `robots.txt` · JSON-LD Organization/LocalBusiness on every page, BreadcrumbList + Service + FAQPage on service pages · breadcrumbs UI · 301 map for every old WordPress URL (`next.config.ts`) · security headers · trailing-slash URLs · crawlable HTML links everywhere (no JS-only filters).

## Brand + language rules enforced in code
- Palette: navy #0D1F35, electric blue #0EA5E9, orange #F97316 **only on conversion CTAs**, light gray #F8FAFC.
- Brokerage language only: "licensed & bonded freight broker", "vetted motor carriers", "carrier insurance verified before dispatch". Never "we deliver", never "fully insured" as if MCC insures, never guaranteed dates.
- No fake numbers. Reviews are the 7 real Google reviews (`src/data/reviews.ts`).
- Nationwide first; Florida named as home base (footer strip + coverage section), no city/route doorway pages.

## Launch checklist
- [ ] Copy `.env.example` → Vercel env: `NEXT_PUBLIC_GTM_ID`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, (`TWILIO_*`, `LEAD_TO_SMS`), (`CRM_WEBHOOK_URL`)
- [ ] Verify sending domain in Resend (mccboundlegends.com) so lead emails don't land in spam
- [ ] GTM: create GA4 tag + two Google Ads conversion tags fired by `quote_submit` and `phone_click` events
- [ ] Submit a live test quote on production → confirm email/SMS arrives → confirm conversion shows in Ads
- [ ] Point domain DNS to Vercel; confirm HTTPS
- [ ] Verify Search Console (DNS record), submit `https://mccboundlegends.com/sitemap.xml`
- [ ] Run PageSpeed on `/`, `/boat-transport-florida/`, `/excavator-transport/` (mobile) — client wants > 70 mobile + screenshot
- [ ] Test old URLs redirect (e.g. `/services/boat-and-yacht-transport/` → `/boat-transport-florida/`). `/boat-transport/` itself is gone on purpose (client: no 301 needed, it had no traffic)
- [ ] GTM: import `docs/gtm/mcc-gtm-sitewide-conversions.json`, paste the two Google Ads conversion labels, Preview-test, publish (see `docs/gtm/README.md`)
- [ ] Real photos from client → `public/images/`, swap into hero/category cards (slots designed for it)
- [ ] Client confirms: BBB status (currently NOT shown anywhere), military discount (not claimed), HI/AK coverage

## Local dev
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## 2026-09-12 — /boat-transport/ rebuilt to the client's reference mockup
- Dedicated page: `src/app/boat-transport/page.tsx` (+ `src/components/BoatQuoteForm.tsx`). The `[slug]` route skips this slug.
- Section order = mockup: hero + white quote card → 8 boat types → 8 snowbird routes → price tiers → "Big boats" band → how it works + shipping options + coverage/review sidebar → CTA band. Site header/footer stay global.
- Changed on purpose: mockup typo fixed ("Florpon to Floridy"); review = Christopher Smith (real Google review) not "Robert L."; "BBB Accredited" kept in the trust strip pending client confirmation (remove from `TRUST` in page.tsx if not accredited).
- New photo slots (placeholders cropped from the mockup, replace with same names): `boat-type-speedboat`, `boat-type-cabin-cruiser`, `boat-type-no-trailer`, `boat-band-semi-yacht`, `boat-opt-open`, `boat-opt-enclosed`, `boat-opt-oversize`, `boat-cta-boat`.
- Heading blue token `--color-royal` (#1e63d6) added for reference-style blue headings.
- `wordpress-boat-page/boat-transport/` = the same page as one static HTML file for dropping into the old WordPress host as an interim Ads page (see `wordpress-boat-page/UPLOAD-GUIDE.md`).

## 2026-09-15 — Client revision round (boat page)
- **URL moved** to `/boat-transport-florida/` (client: all Ads point here; exact match required). Folder `src/app/boat-transport-florida/`,
  data slug `boat-transport-florida` (category slug renamed everywhere: services.ts, [slug] route, footer/mega-menu derive from it,
  photo files `cat-`/`thumb-boat-transport-florida.webp`). Old `/boat-transport/` deleted, no redirect (client decision). Old-site
  redirect `/services/boat-and-yacht-transport/` now → new URL.
- Title: `Boat Shipping to Florida — Free Quote | MCC Bound Legends` (client message; their docx says "Boat Transport to Florida — Free Quote…" — confirm which).
  Canonical `https://mccboundlegends.com/boat-transport-florida/`.
- Boat-type photos replaced with the client's 7 new photos (`type-*` / `boat-type-*`), cards are 3:2 = photo ratio (no crop/zoom).
  "Boats Without Trailers" → "Boats With Trailers" (`boat-type-with-trailer.webp` = crop of hero photo, no client photo for it yet).
  All 8 type cards, 8 route cards and 3 price tiers scroll to `#quote` (no subpages until Month 2, per client dev guide).
- Quote form: new required `Year, Make & Model` field (`ymm`) above Boat Type (`boat_type`) + Length; both land in the lead email.
- Sections rebuilt to the client's 2026-09-15 reference: Shipping Options | How Boat Shipping Works (4 steps) → 4-review row →
  2-column FAQ accordion (8 client FAQs verbatim, also in FAQPage schema). Sidebar map card dropped (not in the new reference).
- Reviews on the boat page = 4 REAL boat reviews: Christopher Smith (Google), Malik / Anna Carlson / Emmanuel Rosario (Trustpilot).
  The mockup's "Melissa R. / James T. / Karen L." do not exist — not used. Source label is truthful per card.
- Route names now `text-royal` (dark blue). Footer description = client's paragraph verbatim (includes "BBB Accredited" — still unverified).
- Site-wide: `--container-7xl: 100rem` (1600px) — client asked for a wider layout. Header logo enlarged (188×116 desktop).
- Hero / big-boats band: photo placed in the gap between copy and form/cards with a soft mask, so the truck+boat are fully visible
  and the form no longer covers them. Band + CTA + shipping-option images are still low-res mockup crops → need client originals.
- GTM: `docs/gtm/` = importable container (Conversion Linker, 2 Google Ads conversion tags, GA4) on sitewide custom events
  `quote_submit` + `phone_click` (all forms, all tel links, every page).
- Verified locally: title/canonical, 1 H1, 25 `#quote` anchors → form exists, 8 accordions, single tel target, phone_click pushed to
  dataLayer, boat form POST → 200 → `/thank-you/` with YMM + boat type in the lead.
