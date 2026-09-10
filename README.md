# MCC BOUND LEGENDS — website build

Client: **MCC Bound Legends LLC** — nationwide auto, boat, RV, commercial & construction-equipment transport.
283 Cranes Roost Blvd Suite 111, Altamonte Springs, FL 32701 · (888) 785-0028 · USDOT 4464266 · MC 1760960 · mccboundlegends.com

Google-Ads-first lead-gen website rebuild. Navy + orange. Phase 1 = 15 pages, Phase 2 = 11 long-tail vehicle pages.

## Start here
1. `docs/01-REQUIREMENTS-ANALYSIS.md` — everything the client asked for, conflicts, risks, our calls
2. `docs/02-SITEMAP-AND-REDIRECTS.md` — final URL list + 301 map
3. `docs/03-OPEN-QUESTIONS.md` — what to ask the client before build
4. `client-docs/` — the 2 original client .docx files, our proposal PDF, and `extracted/` verbatim text

## Status
- 2026-09-07 proposal sent ($740 Foundation / $1,130 Growth)
- 2026-09-11 client docs received and analysed → **awaiting answers to open questions + package decision**
- Next: design system + homepage preview

## Stack (planned)
React (Next.js) + Tailwind, deployed on Vercel. Form → email + SMS. GA4 + GTM + Google Ads conversions.

## Structure
```
src/          app code
public/       images (WebP), favicon
components/   shared UI
docs/         analysis, sitemap, questions
client-docs/  client source documents
```
