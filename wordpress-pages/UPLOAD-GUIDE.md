# How It Works + FAQ → add to the EXISTING WordPress site (Hostinger)

Same method as the boat landing page: each one is a plain HTML folder that sits next to WordPress in
`public_html/`. Nothing in WordPress, the theme or any plugin is touched.

Built from the Next.js pages with:

```
npm run dev                                          # note the port it prints
node wordpress-pages/build.js http://localhost:3000  # builds all three pages
```

## What goes live where

| Zip | Extract as | Live URL |
|---|---|---|
| `how-it-works-upload.zip` | `how-it-works` | `https://mccboundlegends.com/how-it-works/` |
| `faqs-upload.zip` | `faqs` | `https://mccboundlegends.com/faqs/` |

> **2026-10-09 update.** The first build targeted `/how-does-it-work/` and `/faq/`, but the client uploaded
> the folders as `how-it-works` and `faqs`. The form's thank-you redirect still pointed at the old folders →
> 404 after submit ("form not working"). The pages are now built for the live folders, and the form also
> works out the thank-you URL from whatever folder the page sits in, so a different folder name can't break
> it again. The old WordPress pages at `/how-does-it-work/` and `/faq/` are still live, so the WP menu
> links should be pointed at `/how-it-works/` and `/faqs/` (Appearance → Menus → edit the two Custom Links).

## Upload (Hostinger hPanel → Files → File Manager) — 5 minutes each

1. hPanel → Websites → mccboundlegends.com → **File Manager**.
2. Open `public_html/` (WordPress lives here: wp-admin, wp-content, wp-includes).
3. Upload `how-it-works-upload.zip` into `public_html/`, right-click → **Extract** → folder name:
   `how-it-works` (destination = `public_html`) → Extract → **overwrite** the existing files. Delete the zip afterwards.
4. Repeat with `faqs-upload.zip` → folder name `faqs`.
5. Result must be:
   ```
   public_html/how-it-works/index.html   + send.php + images/ + thank-you/index.html
   public_html/faqs/index.html           + send.php + images/ + thank-you/index.html
   ```
6. hPanel → Advanced → **LiteSpeed cache purge**, then open both URLs.

**Do NOT delete the old WordPress pages.** Leave them in place — they are simply shadowed by the folders.
Deleting them would strip "How It Works" and "FAQ" out of the WordPress menu.

If a URL still shows the old WordPress page, it is the cache: purge LiteSpeed again and hard-refresh
(Cmd/Ctrl + Shift + R).

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

## Tracking (already wired, same IDs as the rest of the old site)

- GTM `GTM-M44WB2FK` + Google Ads tag `AW-18234011636` on every page including the thank-you pages.
- dataLayer events, same names as the new site, so the GTM setup in `docs/gtm/` covers these too:
  `phone_click` on every phone link, `quote_submit` on form submit, `generate_lead` on thank-you.

## Checks before calling it done

- [ ] Both URLs load with the new design, purge LiteSpeed if not.
- [ ] Menu links "How It Works" and "FAQ" land on the new pages.
- [ ] FAQ accordions open and close (they are plain HTML `<details>`, they work with JS disabled).
- [ ] Submit the form once with real details → lands on the thank-you page → email reaches Jeff (check spam the first time; mark "Not spam").
- [ ] Tap the phone number on a phone → dialer opens.
- [ ] "BBB Accredited" appears in the footer badge row (client's copy). If MCC is **not** BBB accredited, remove it.

## Rollback

Delete `public_html/how-it-works/` and/or `public_html/faqs/`. The original WordPress pages come
straight back — they were never modified.
