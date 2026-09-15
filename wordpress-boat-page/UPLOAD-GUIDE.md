# Boat Transport landing page → add to the EXISTING WordPress site (Hostinger)

Goal: get `https://mccboundlegends.com/boat-transport-florida/` live on the current WordPress site for Google Ads,
without touching WordPress, the theme or any plugin. It is a plain HTML folder that sits next to WordPress.

Built from the Next.js page by `node wordpress-boat-page/build.js http://localhost:3088` (re-run after any page change).

## What's in this folder
```
boat-transport-florida-upload.zip     ← upload this
boat-transport-florida/
  index.html            the landing page (CSS + JS inline, identical to the new site's page)
  images/               15 webp images (logo, hero, 8 boat types, 3 options, band, CTA)
  thank-you/index.html  form success page = Google Ads conversion page
```

## Upload (Hostinger hPanel → Files → File Manager) — 5 minutes
1. hPanel → Websites → mccboundlegends.com → **File Manager**.
2. Open `public_html/` (WordPress lives here: wp-admin, wp-content, wp-includes).
3. Upload `boat-transport-florida-upload.zip` into `public_html/`, right-click it → **Extract**. Delete the zip afterwards.
4. Result must be:
   `public_html/boat-transport-florida/index.html`
   `public_html/boat-transport-florida/images/…`
   `public_html/boat-transport-florida/thank-you/index.html`
5. Open `https://mccboundlegends.com/boat-transport-florida/` — it's live.

If it shows a WordPress 404 instead: hPanel → Advanced → **LiteSpeed cache purge**, and confirm no WordPress page uses the slug
`boat-transport-florida` (Pages → search). A real folder always wins over a WP permalink once the cache is cleared.

## Form → email (FormSubmit, no plugin, no API key)
- The form posts to `https://formsubmit.co/Jeff.c@mccboundlegends.com`.
- **First submission only**: FormSubmit emails Jeff an "Activate form" link. He clicks it once; from then on every lead
  arrives as a table email (Year/Make/Model, boat type, length, ZIPs, trailer, date, name, phone, email, consent).
- After submit the visitor lands on `/boat-transport-florida/thank-you/`.
- To change the lead email: edit `action="https://formsubmit.co/…"` in index.html (one line).
- SMS/text alerts are not possible with FormSubmit; the Next.js site (Vercel) has Twilio SMS built in.

## Tracking (already wired, same IDs as the old site)
- GTM `GTM-M44WB2FK` + Google Ads tag `AW-18234011636` on both pages.
- dataLayer events (same names as the new site, so the GTM setup in `docs/gtm/` works for both):
  `phone_click` on every phone link, `quote_submit` on form submit, `generate_lead` on the thank-you page.
- Ads conversions: import `docs/gtm/mcc-gtm-sitewide-conversions.json` into GTM and paste the two conversion labels
  (see `docs/gtm/README.md`). Alternative without GTM work: conversion on page load of `/boat-transport-florida/thank-you/`.

## Links
Header/footer links point to the OLD site's real pages (`/how-does-it-work/`, `/contact-us/`, `/services/car-shipping/` …).
Pages that only exist on the new site fall back to `/services/`.

## Before Jeff points ads at it
- [ ] Test the form once, click the FormSubmit activation email, confirm the lead lands in Jeff's inbox (check spam).
- [ ] Tap the phone number on a phone → dialer opens.
- [ ] "BBB Accredited" appears in the hero strip and footer (client's copy). If MCC is NOT BBB accredited, remove it.
- [ ] PageSpeed (pagespeed.web.dev) on the live URL, mobile > 70 — send the screenshot.

## Rollback
Delete `public_html/boat-transport-florida/`. WordPress is untouched.
