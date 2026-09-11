# Boat Transport landing page — add to the OLD WordPress site (Hostinger)

Goal: get `https://mccboundlegends.com/boat-transport/` live on the current WordPress site for Google Ads,
without touching WordPress, the theme or any plugin.

## What's in this folder
```
boat-transport/
  index.html            the landing page (self-contained: CSS + JS inline)
  images/               15 webp images (logo, hero, boat types, section photos)
  thank-you/index.html  form success page = Google Ads conversion page
```

## Upload (Hostinger hPanel → Files → File Manager)
1. hPanel → Websites → mccboundlegends.com → **File Manager**.
2. Open `public_html/` (WordPress lives here: wp-admin, wp-content, wp-includes).
3. **Upload the whole `boat-transport` folder** into `public_html/` (drag the folder, or zip it, upload, right-click → Extract).
4. Result must be: `public_html/boat-transport/index.html`, `public_html/boat-transport/images/…`, `public_html/boat-transport/thank-you/index.html`.
5. Open `https://mccboundlegends.com/boat-transport/` — it's live.

If it shows a WordPress 404 instead: hPanel → Advanced → **LiteSpeed cache purge**, and confirm the folder name is exactly `boat-transport` (no page/slug with that name exists in WP, we checked).

## Form → email (FormSubmit, no plugin, no key)
- The form posts to `https://formsubmit.co/Jeff.c@mccboundlegends.com`.
- **First submission only**: FormSubmit emails Jeff an "Activate form" link. He clicks once, then every lead arrives as a table email. Do a test submit right after upload and tell Jeff to check inbox/spam.
- After submit the visitor lands on `/boat-transport/thank-you/`.
- To change the lead email: edit the `action="…"` line in index.html.

## Tracking (already wired, same IDs as the old site)
- GTM `GTM-M44WB2FK` + Google Ads tag `AW-18234011636` on both pages.
- dataLayer events pushed: `phone_click` (header / hero / routes / cta / sticky), `quote_form_submit`, `generate_lead` (thank-you page).
- **Ads conversion**: in Google Ads → Goals → Conversions → create "Boat quote lead" (Website, page load) OR in GTM add a conversion trigger on Page Path = `/boat-transport/thank-you/`. Optional direct tag: paste the conversion label into the commented line in `thank-you/index.html`.
- Phone conversion: GTM trigger on Custom Event `phone_click`.

## Before Jeff points ads at it
- [ ] "BBB Accredited" is in the hero trust strip because the reference has it. If MCC is NOT BBB accredited, delete that one `<li>` (search `BBB Accredited`).
- [ ] Photos are placeholders (client's reference crops + our earlier renders). Replace files in `images/` with same names when real/hi-res ones exist. Sizes: hero 1672×941, type thumbs ~720×246, opt cards ~600×160, band ~1500×500.
- [ ] Prices ($1,500–$5,000+) — confirm with Jeff.
- [ ] Test the form once and confirm the email lands.

## Rollback
Delete `public_html/boat-transport/`. The old site is untouched.
