# Boat Transport landing page → add to the EXISTING WordPress site (Hostinger)

Goal: get `https://mccboundlegends.com/boat-transport-florida/` live on the current WordPress site for Google Ads,
without touching WordPress, the theme or any plugin. It is a plain HTML folder that sits next to WordPress.

Built from the Next.js page by `node wordpress-boat-page/build.js http://localhost:<dev port>` (re-run after any page change).
That now delegates to the shared builder in `wordpress-pages/`, which also produces the How It Works and FAQ folders —
`node wordpress-pages/build.js http://localhost:<dev port>` rebuilds all three. See `wordpress-pages/UPLOAD-GUIDE.md`.

**2026-09-19 rebuild:** includes the client's approved header (top bar + brand block + trust icons + nav), the new boat hero
(uncropped truck/yacht photo, Coast-to-Coast callout, feature strip) and the new site-wide footer (CTA banner, link columns,
truck/yacht visual, trust badges, mobile accordions). Header and footer are part of the page itself, not the WordPress theme.

## What's in this folder
```
boat-transport-florida-upload.zip     ← upload this
boat-transport-florida/
  index.html            the landing page (CSS + JS inline, identical to the new site's page)
  images/               23 webp images (logo, hero, 8 boat types, 3 options, band, CTA, footer backgrounds + 4 badges)
  thank-you/index.html  form success page = Google Ads conversion page
  send.php              form handler: emails the lead to Jeff + saves a backup copy (leads-log.php)
```

## Upload (Hostinger hPanel → Files → File Manager) — 5 minutes
1. hPanel → Websites → mccboundlegends.com → **File Manager**.
2. Open `public_html/` (WordPress lives here: wp-admin, wp-content, wp-includes).
3. Upload `boat-transport-florida-upload.zip` into `public_html/`, right-click it → **Extract** → folder name: `boat-transport-florida` (destination = public_html) → Extract. Delete the zip afterwards.
4. Result must be:
   `public_html/boat-transport-florida/index.html`
   `public_html/boat-transport-florida/images/…`
   `public_html/boat-transport-florida/thank-you/index.html`
5. Open `https://mccboundlegends.com/boat-transport-florida/` — it's live.

If it shows a WordPress 404 instead: hPanel → Advanced → **LiteSpeed cache purge**, and confirm no WordPress page uses the slug
`boat-transport-florida` (Pages → search). A real folder always wins over a WP permalink once the cache is cleared.

## Form → email (send.php on Hostinger, no plugin, no third party)

> **2026-10-09:** the forms used to post to FormSubmit, which delivers **nothing** until a one-time
> "Activate form" email is clicked. That email was never clicked, so leads were being dropped. The forms now
> post to a small `send.php` inside each folder, which runs on Hostinger itself. No activation step.

- `send.php` emails each lead to **Jeff.c@mccboundlegends.com** (Reply-To = the customer, so Jeff just hits
  Reply). The subject line says which page it came from, plus the customer's name.
- **Backup:** every lead is also saved to `leads-log.php` in the same folder *before* the email is sent, so
  nothing is lost if an email bounces or lands in spam. Open it in File Manager → Edit to read it. It cannot be
  read over the web.
- Bots are filtered by a hidden honeypot field. A post with no phone and no email is rejected.
- After submit the visitor lands on that folder's own `/thank-you/` (the Google Ads conversion page).
- To change the lead email: edit `LEAD_TO` and `MAIL_FROM` at the top of `send.php`. `MAIL_FROM` must be a
  real mailbox on mccboundlegends.com or Hostinger will refuse to send.
- Re-uploading a zip never deletes `leads-log.php` (it is not in the zip).

## Tracking (already wired, same IDs as the old site)
- GTM `GTM-M44WB2FK` + Google Ads tag `AW-18234011636` on both pages.
- dataLayer events (same names as the new site, so the GTM setup in `docs/gtm/` works for both):
  `phone_click` on every phone link, `quote_submit` on form submit, `generate_lead` on the thank-you page.
- Ads conversions: import `docs/gtm/mcc-gtm-sitewide-conversions.json` into GTM and paste the two conversion labels
  (see `docs/gtm/README.md`). Alternative without GTM work: conversion on page load of `/boat-transport-florida/thank-you/`.

## Links
Header/footer links point to the OLD site's real pages (`/how-does-it-work/`, `/contact-us/`, `/services/car-shipping/` …).
Pages that only exist on the new site fall back to the closest old service page or `/services/`. Footer "Sitemap" → `/sitemap.xml`.

## Before Jeff points ads at it
- [ ] Submit the form once with real details → lands on the thank-you page → email reaches Jeff (check spam the first time; mark "Not spam").
- [ ] Tap the phone number on a phone → dialer opens.
- [ ] "BBB Accredited" appears in the hero strip and footer (client's copy). If MCC is NOT BBB accredited, remove it.
- [ ] PageSpeed (pagespeed.web.dev) on the live URL, mobile > 70 — send the screenshot.

## Rollback
Delete `public_html/boat-transport-florida/`. WordPress is untouched.
