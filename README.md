# MCC BOUND LEGENDS — website build

Client: **MCC Bound Legends LLC** — nationwide auto, boat, RV, commercial & construction-equipment transport.
283 Cranes Roost Blvd Suite 111, Altamonte Springs, FL 32701 · (888) 785-0028 · USDOT 4464266 · MC 1760960 · mccboundlegends.com

Google-Ads-first lead-gen website rebuild. Navy + orange. Phase 1 = 15 pages, Phase 2 = 11 long-tail vehicle pages.

## Start here
1. `docs/01-REQUIREMENTS-ANALYSIS.md` — everything the client asked for, conflicts, risks, our calls
2. `docs/02-SITEMAP-AND-REDIRECTS.md` — final URL list + 301 map
3. `docs/03-OPEN-QUESTIONS.md` — what to ask the client before build
4. `docs/04-SCOPE-FIT-GROWTH-PACKAGE.md` — requirements vs. package
5. `docs/05-BUILD-NOTES-AND-LAUNCH.md` — how the site is built + launch checklist
6. `client-docs/` — the 2 original client .docx files, our proposal PDF, and `extracted/` verbatim text

## Status
- 2026-09-07 proposal sent · Growth package ($1,130) agreed
- 2026-09-11 full client brief received (logo, palette, tagline, 4-layer structure, feature list)
- 2026-09-11 **v1 site built**: 33 URLs, smart quote form, full SEO layer, 301 map. See `docs/05-BUILD-NOTES-AND-LAUNCH.md`
- Next: client review → env vars (GTM, Resend) → Vercel deploy → real photos

## Stack
Next.js 16 + Tailwind v4 + TypeScript, Vercel. Form → email (Resend) + SMS (Twilio) + optional CRM webhook. GA4 + GTM + Google Ads conversions via dataLayer events.

## Structure
```
src/app/          routes (home, [slug] service template, core pages, api/quote, sitemap, robots)
src/components/   Header (mega menu), Footer, StickyBar, QuoteForm, Sections, Icons, UsaMap
src/data/         site.ts · services.ts (ALL pages) · quote.ts · reviews.ts · faqs.ts
src/lib/          seo.ts · schema.ts · analytics.ts
public/images/    logo.webp, og-default.png (photos go here)
components/       → symlink to src/components
docs/             analysis, sitemap, questions, scope fit, build notes, screenshots
client-docs/      client source documents
```
