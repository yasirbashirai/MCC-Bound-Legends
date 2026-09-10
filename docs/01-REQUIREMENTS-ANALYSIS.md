# MCC Bound Legends — Requirements Analysis

**Prepared:** 2026-09-11 · **Source:** the 2 client documents + our 2026-09-07 proposal + live site audit
**Read this first.** Everything the client asked for, where the two docs disagree, where they clash with our proposal, and what needs a decision before build.

---

## 0. The one-paragraph version

The client wants a **Google-Ads-first lead-generation website**, not a brochure. Every design choice in both docs serves one thing: a mobile visitor from a paid click fills the quote form or taps the phone number. The brand is **dark navy + orange**, the promise is **"We ship ANY vehicle" (boats, RVs, construction equipment, not just cars) with NO DEPOSIT**, and the site must ship in two phases: **Phase 1 = 15 pages** (home, services hub, 8 service pages, about, how-it-works, testimonials, FAQ, contact) then **Phase 2 = 11 long-tail vehicle pages** once ads are running. Conversion tracking (GA4 + GTM + Google Ads) is a hard gate before launch.

---

## 1. What the client sent

| # | Document | Created | What it is |
|---|---|---|---|
| 1 | `MCC_Bound_Legends_Homepage_Copy.docx` | 2026-09-05 | Section-by-section homepage copy, 13 sections, with "DEV NOTE" layout instructions, SEO settings, alt tags, 8 final dev notes |
| 2 | `MCC_Developer_Simple_Guide.docx` | 2026-09-06 | Whole-site build guide: page list with exact URLs (2 phases), 5-things-every-page-must-have, service page template, keyword tables, **full Google Ads plan (5 campaigns)**, technical checklist, "never do" list, go-live checklist |

Both docs have no comments, no hyperlinks, no images, author "Un-named". They were clearly produced by a consultant or AI tool for the client (Doc 1 says *"Build the homepage exactly as written here, following the mockup I showed you"*). **Doc 2 is one day newer and is the site-wide authority; Doc 1 is the homepage authority.**

⚠️ **We do not have the mockup Doc 1 refers to.** Ask for it (see Open Questions).

---

## 2. The brand and voice the client defined

| Element | Client spec |
|---|---|
| Nav background | Dark navy **#0D1F35** |
| Footer background | Very dark navy **#0A1628** |
| Hero | Dark navy → dark blue gradient, white text, centered |
| Accent | **Orange** — no hex given. Used for: top bar, "Bound" in logo, eyebrow pill, "Any Vehicle" in H1, primary buttons, icons, column titles, advantage banner, bottom CTA gradient |
| Success/yes | Green (dots, checkmarks, ✓ in table) |
| No | Red ✗ |
| Section rhythm | White ↔ light gray alternating, navy for hero / form card / comparison table, orange for banner + bottom CTA |
| Cards | White, light gray border, rounded, orange icon, navy title, gray text, orange border on hover |
| Logo | Text logo "MCC **Bound** Legends" with Bound in orange (implies no proper logo file — confirm) |
| Voice | Short, punchy, benefit-led, repetitive on purpose: *No deposit · Fully insured · Door-to-door · Zero hidden fees · Real-time updates · All 50 states · 2-hour response* |
| Phone | **(888) 785-0028** — appears 10+ times per page, always `tel:8887850028` |

---

## 3. Homepage — the 13 sections (Doc 1, authoritative)

Full verbatim copy is in `client-docs/extracted/01-homepage-copy.md`. Structure summary:

| # | Section | Background | Key content |
|---|---|---|---|
| 1 | Top bar | Orange | "🚛 Nationwide Vehicle Transport — Cars, Boats, RVs, Commercial & Construction Equipment \| No Deposit Required \| (888) 785-0028" |
| 2 | Nav | Navy | Logo · Services · About Us · How It Works · Reviews · FAQ · **orange phone button** |
| 3 | Hero | Navy gradient | Eyebrow pill "🏆 Florida's #1 Full-Service Vehicle Transport Company" · **H1 "We Ship Any Vehicle Anywhere in the USA — Guaranteed."** · sub · 2 buttons (quote scroll / tel) · 5 trust pills with green dots |
| 4 | Vehicle selector | Light gray | "WHAT CAN WE SHIP FOR YOU?" · 6 clickable icon cards → service pages |
| 5 | **Quote form** | White page, navy card 640px | Heading "How Much Does It Cost to Ship Your Vehicle?" · 8 fields in 2×(2-col) grids · SMS consent checkbox · full-width orange submit · 4 reassurance badges |
| 6 | Advantage banner | Orange | 6 ✅ items in one row |
| 7 | Why choose us | White | H2 + 6 cards (3×2) |
| 8 | **Comparison table** | Navy | MCC vs Montway vs AmeriFreight, 10 rows, MCC column orange-tinted |
| 9 | Reviews | Light gray | 3 cards + platform links (Google · Trustpilot · BBB · Yelp · UShip) |
| 10 | Services grid | White | H2 + 9 cards, each "Get a Quote →" |
| 11 | How it works | Light gray | 3 numbered steps + link to how-it-works page |
| 12 | Bottom CTA | Orange gradient | H2 + 2 buttons |
| 13 | Footer | #0A1628 | 4 columns (company / quick links / 13 services / social) + bottom bar |

**Homepage quote form spec (exact):**
- Vehicle Type ▾: Car/Sedan, Boat/Yacht, RV/Motorhome, Commercial Vehicle, Construction Equipment, Motorcycle, Truck/SUV, ATV/UTV, Heavy Equipment, Classic/Antique Car
- Transport Type ▾: Open Trailer, Enclosed Trailer, Flatbed, With Trailer, Without Trailer
- Pick-Up Zip (placeholder `e.g. 32701`) · Drop-Off Zip (`e.g. 90210`) · Preferred Pick-Up Date · Your Name · Phone · Email
- SMS consent checkbox **(legal — keep existing text)**. Pulled from the live site verbatim:
  > By checking this box, I consent to receive SMS messages from MCC Bound Legends LLC related to Follow-up messages and day-to-day messages at the phone number provided above. The SMS frequency may vary. Data rates may apply. For assistance reply HELP. Reply STOP to opt out of receiving text messages. Please review our Privacy Policy and Terms & Conditions.
- Submit: "Get My Free Quote Now →"
- Badges: ✓ Fully insured · ✓ No deposit required · ✓ We respond within 2 hours · ✓ No hidden fees

**Doc 1 final dev notes (all 8 are requirements):** mobile first · form must work and be tested · both quote buttons go to same form · WebP + caching + speed · **sticky mobile call bar** · test iPhone + Android · **GA + GTM conversion on form submit before any ads** · comparison table is "biggest selling point", make it clean.

---

## 4. Site architecture (Doc 2, authoritative)

### Phase 1 — build first (15 pages)

| URL | Browser title | Notes |
|---|---|---|
| `/` | Nationwide Vehicle & Equipment Transport \| MCC Bound Legends | Homepage |
| `/services/` | Nationwide Transport Services \| MCC Bound Legends | Hub linking all services |
| `/auto-transport/` | Nationwide Auto Transport & Car Shipping \| MCC | Main car page · Ads Campaign 4 landing |
| `/enclosed-auto-transport/` | Enclosed Auto Transport for Luxury & Classic Cars \| MCC | Absorbs classic/antique |
| `/boat-transport/` | Nationwide Boat Transport & Yacht Shipping \| MCC | **Ads Campaign 1 landing (week 1)** |
| `/rv-transport/` | RV, Motorhome & Travel Trailer Transport \| MCC | Ads Campaign 3 landing |
| `/commercial-vehicle-transport/` | Commercial Vehicle & Truck Transport \| MCC | Ads Campaign 5 landing |
| `/construction-equipment-transport/` | Construction Equipment Transport \| MCC | Ads Campaign 2 landing |
| `/heavy-equipment-transport/` | Heavy Equipment & Machinery Transport \| MCC | Industrial / oversized |
| `/motorcycle-transport/` | Motorcycle, ATV & UTV Transport \| MCC | Absorbs ATV/UTV |
| `/about-us/` | About MCC Bound Legends \| Vehicle Transport | |
| `/how-it-works/` | How Vehicle Transport Works \| MCC Bound Legends | Note: current site is `/how-does-it-work/` |
| `/testimonials/` | Customer Reviews & Testimonials \| MCC | |
| `/faq/` | Vehicle Transport FAQ \| MCC Bound Legends | |
| `/contact/` | Get a Free Transport Quote \| MCC Bound Legends | Full quote form, main contact page. Current is `/contact-us/` |

Plus required but uncounted: `/privacy-policy/`, `/terms-and-conditions/` (current is `/terms-and-condition/`), and a **`/thank-you/` page (noindex)** — needed for GTM conversion firing.

**Rule: flat URLs.** *"Do not put them under /services/ or any other folder."* Every current `/services/xxx/` URL must 301 to its new flat URL. Full map in `02-SITEMAP-AND-REDIRECTS.md`.

### Phase 2 — only after Phase 1 is live AND ads are running (11 pages)

`/box-truck-transport/` · `/semi-truck-transport/` · `/fleet-vehicle-transport/` · `/excavator-transport/` · `/skid-steer-transport/` · `/bulldozer-transport/` · `/forklift-transport/` · `/yacht-transport/` · `/non-running-vehicle-transport/` · `/auction-vehicle-transport/` · `/military-transport/`

### The 5 things every page must have (no exceptions)
1. **One H1** that matches the Google Ad headline
2. **Quote form near the top**, visible without scrolling
3. **Trust signals**: BBB badge, star rating, USDOT number, No Deposit badge
4. **Click-to-call** `tel:8887850028`
5. **Orange CTA** "Get My Free Quote Now"

### Service page template
- Title: `[Service] Nationwide | MCC Bound Legends`
- H1: `[Service] for [Vehicle Types] Nationwide`
- 1–2 sentence opener → orange CTA "Get My Free [Service] Quote Now →" → bulleted list of everything transported → **the same quote form** → trust strip `No Deposit Required | Fully Insured | BBB Accredited | 5-Star Rated | USDOT: 4464266`
- Breadcrumbs `Home > Services > Boat Transport` · internal links to related services

### Keywords supplied (5 pages)
Keyword tables with priority + CPC exist for: auto-transport, boat-transport, rv-transport, commercial-vehicle-transport, construction-equipment-transport. **None supplied for enclosed, heavy-equipment, motorcycle** — we write those. All tables are in `client-docs/extracted/02-developer-guide.md` Step 3.

---

## 5. Google Ads plan (Doc 2 Step 4) — context we must build for

| # | Campaign | Launch | Daily budget | Landing page | Ad H1 must match page H1 |
|---|---|---|---|---|---|
| 1 | Boat & Yacht | Week 1 | $30–40 | `/boat-transport/` | "Boat Transport — Free Quote" |
| 2 | Construction Equipment | Week 2 | $20–30 | `/construction-equipment-transport/` | "Construction Equipment Transport" |
| 3 | RV | Week 3 | $20–30 | `/rv-transport/` | "RV Transport — Get a Free Quote" |
| 4 | Car Shipping | Month 2 | $40–60 | `/auto-transport/` | "Car Shipping — No Deposit Required" |
| 5 | Commercial | Month 2 | $20–30 | `/commercial-vehicle-transport/` | "Commercial Vehicle Transport" |

→ Full rollout ≈ **$130–190/day** ad spend. Exact + phrase match only, US targeting, call extensions, 6 negative-keyword groups (job seekers, DIY, cheap/free, rentals/sales, international, competitors).

**Why this matters for the build:** the 5 landing pages are the money pages. Their H1s must contain the ad headline phrase; their forms must convert; their tracking must be verified before campaign 1 goes live.

**Ads management is NOT in our proposal** ("Paid ad spend and campaign management" excluded). The client's doc says "for whoever is setting up the Google Ads account". This is an open question and an upsell.

---

## 6. Technical requirements (Doc 2 Step 5 + Doc 1 notes)

**Every page:** one H1 · unique title <60 chars · unique meta <160 chars · exact URLs · form above fold · `tel:` link · sticky mobile bar (orange, phone **+ quote button**) · WebP images · PageSpeed pass, <3s · iPhone + Android tested · HTTPS · 301s for changed URLs · internal links · breadcrumbs.

**Tracking (hard gate before ads):** GA4 · GTM · form-submit conversion · phone-click conversion · Search Console verified · XML sitemap submitted · noindex thank-you page · Organization schema (name, address, phone, URL).

**SEO:** Homepage title `Nationwide Vehicle & Equipment Transport | MCC Bound Legends` (60 chars) · meta `Nationwide transport coordination for cars, commercial vehicles, boats, RVs, motorcycles, construction equipment and heavy machinery. Request a free quote.` (needs 5-char trim) · alt tags per Doc 1.

**Never do:** state-swap doorway pages · all ad traffic to homepage · broad match · ads without tracking · cheap backlinks · copied competitor content.

---

## 7. Where the two documents disagree (and the call)

| Topic | Doc 1 (homepage, Sep 5) | Doc 2 (guide, Sep 6) | Our call |
|---|---|---|---|
| Service URLs | `/services/car-shipping/`, `/services/boat-and-yacht-transport/`, `/how-does-it-work/` (= current site) | Flat: `/auto-transport/`, `/boat-transport/`, `/how-it-works/`, explicitly "do NOT put under /services/" | **Doc 2.** Newer + explicit. 301 all old URLs. |
| Homepage title | 107 chars | 60 chars | **Doc 2** (Doc 2 also mandates <60) |
| Meta description | 170 chars | 165 chars | **Doc 2, trimmed to ≤160** |
| Homepage sections | All 13 | Only 8 (no vehicle selector, comparison table, services grid, how-it-works, footer) | **Build all 13 from Doc 1.** Doc 2 is a summary, not a cut. |
| Review wording | Full quotes | Shortened quotes | Use real, unaltered reviews (see §8) |
| Services in Phase 1 | Homepage grid shows 9 incl. **Expedited** and **Military** | Phase 1 has 8 pages; Military is Phase 2; **Expedited appears nowhere**; text says "all 9 service pages" but table lists 8 | **Build 10 service pages in Phase 1** (8 + Expedited + Military) so no homepage card is a dead link. Both were already in our Growth scope. |
| Footer services list | 13 items incl. Classic Car, Heavy Equipment, Auction, ATVs & UTVs | Classic → folded into Enclosed; ATV → into Motorcycle; Auction → Phase 2 | Footer links point to the merged pages (with anchor) until Phase 2 exists |
| Sticky mobile bar | Call only | Phone + quote button | **Two-button bar** |
| Form placement on homepage | Hero (centered, no form) → vehicle cards → form is section 5 | "Quote form near the top — not buried, visible without scrolling" on **every** page | ⚠️ **Tension.** Recommend a 2-column hero on desktop with the form on the right (industry standard, satisfies Doc 2); on mobile, hero CTA scrolls to form which sits right after the hero. Confirm with client since Doc 1 said "exactly as written". |
| Nav labels | "Reviews" | Page is `/testimonials/`; footer says "Testimonials" | Nav "Reviews" → `/testimonials/` |

---

## 8. Claims in the copy that need verifying before we publish them

These come from the client's own copy. If wrong, they are the client's legal exposure but they land on **our** build, and several conflict with what our own audit found on 2026-09-07.

| Claim in copy | Reality check | Risk | Recommendation |
|---|---|---|---|
| "BBB accredited" (hero pill, trust strip, badge on every page) | **Zero BBB mentions on current site**, no BBB link. | Displaying a BBB seal without accreditation = trademark misuse | Ask for BBB profile URL. If not accredited, drop from all 4 places it appears. |
| "Hundreds of verified 5-star reviews on Google, Trustpilot, BBB, and Yelp" | Current site says **"EXCELLENT Based on 9 reviews"**; our audit found a 2-review aggregateRating | False advertising | Rewrite to a true count or "5-star rated on Google, Trustpilot and Yelp" without a number |
| "Florida's #1 Full-Service Vehicle Transport Company" | Unsubstantiated superlative | FTC / Ads policy gray zone | Keep only if client accepts it as puffery; safer: "Florida's Full-Service Vehicle Transport Company" |
| H1 "…— Guaranteed." | Guarantee of what? Not defined anywhere | Misleading if no written guarantee | Ask client to define (price-lock? on-time? insured?) or footnote it |
| **Comparison table naming Montway & AmeriFreight** with ✗ for boats / RVs / no-deposit / hidden fees | Third-party factual claims. Montway lists boat & RV transport on its site; AmeriFreight's deposit policy varies | **Highest risk item** — false comparative advertising about named competitors | Verify every cell with screenshots, or change columns to "MCC vs. typical car-only broker" (unnamed). Client calls this the "biggest selling point", so raise carefully. |
| "Real-Time Tracking" (advantage banner) | Our proposal explicitly excludes live GPS tracking; the "Why us" card says "Real-Time **Updates**" | Over-promise | Use "Real-Time Updates" everywhere |
| Review card 3 | Stitches **two different reviewers** (Joshua Flowers + Sally Sampath) into one quote, attributed to "Verified Customer" | Fabricated testimonial (FTC endorsement rules) | Use the real reviews with real names: Christopher Smith (boat), Jennifer K (RV), Joshua Flowers (auto). All three exist verbatim on the current site. |
| "Military & veteran discounts ✓" | No discount defined on current site | Must exist if claimed | Get the actual discount % |
| "All 50 states" | Hawaii + Alaska require ocean freight | Minor | Confirm they actually book HI/AK |
| "We respond within 2 hours" | Operational promise, Mon–Sat 8–6 | Minor | Add "during business hours" |

---

## 9. Where the client docs clash with OUR proposal

| Our proposal (2026-09-07) | Client docs | What to do |
|---|---|---|
| Growth package includes **6 city pages + 2 route pages** (Orlando, Tampa, Miami, FL→CA…) | Doc 2 **IMPORTANT**: never create location-variant pages; "use Google Ads data later to decide if any state pages are truly needed" | **Swap.** Replace the 8 local pages with the **11 Phase 2 vehicle pages**. Same or more value, and aligned with their ad plan. Growth still = 28 pages (15 + 11 + cost page + tips hub). |
| Custom build (we build Next.js on Vercel) | Doc 2 assumes **WordPress** (Yoast/RankMath, "WordPress plugins do this automatically") | It's an assumption, not a requirement. Our build gives them the <3s speed they demand (the current WP + Airlift setup is why mobile is grey). Confirm they don't need to self-edit pages in WP. |
| "Multi-step quote form" (short steps) | Single 8-field form, 2×2-col grids, exactly specified | **Follow the client.** Single form, their fields. Can still do progressive layout on mobile. |
| Video reviews that play | Docs don't mention video at all | Drop unless client supplies working videos |
| "Cost to ship a car" page | Not in their list | Keep as our added value (Growth) |
| Ads conversion tracking = Growth only | Doc 1 + Doc 2 make it a **launch gate for every build** | Include tracking in whichever package they pick; it's non-negotiable in their eyes |
| SMS lead alerts = Growth only | Docs silent on where leads go | Confirm: email `info@mccboundlegends.com` + SMS to owner's phone |
| Foundation = 15 pages | Phase 1 = exactly 15 pages | ✅ Matches perfectly |

---

## 10. What they will give us vs. what we still need

**Already have (from docs + live site):**
- Every word of homepage copy · page list + titles · keywords for 5 pages · ad copy · SMS consent text · review platform links (Google, Trustpilot, Yelp, UShip) · social links (FB, IG, TikTok) · address, phone, email, hours, USDOT/MC · 9 real named Google reviews.

**Still need from the client (see `03-OPEN-QUESTIONS.md`):**
- The **mockup** Doc 1 references · exact **orange hex** / any brand file · logo source file · **BBB profile** (or confirmation it doesn't exist) · truck / load / boat **photos** · body copy for about, FAQ, how-it-works, service pages (docs give templates, not text) · where leads go (email + which phone for SMS) · Google Ads / GA4 / GTM / Search Console account access · hosting decision · guarantee definition · military discount % · package decision + deposit.

---

## 11. Recommended build order (once the package is signed)

1. **Design system + homepage** (all 13 sections, desktop + mobile) → client preview
2. **Quote form + delivery** (email + SMS) + `/thank-you/` + GTM events → live test lead
3. **5 ad landing pages first**: boat → construction → RV → auto → commercial (matches campaign order)
4. Remaining Phase 1: enclosed, heavy equipment, motorcycle, expedited, military, services hub, about, how-it-works, testimonials, FAQ, contact, privacy, terms
5. 301 map, sitemap, schema, Search Console, PageSpeed pass, iPhone/Android QA
6. Launch → client turns on Campaign 1
7. **Phase 2** (11 pages) after ads have data

---

*Related files: `02-SITEMAP-AND-REDIRECTS.md` · `03-OPEN-QUESTIONS.md` · `client-docs/extracted/` for the verbatim client text.*
