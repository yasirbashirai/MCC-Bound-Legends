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
   public_html/how-it-works/index.html   + images/  + thank-you/index.html
   public_html/faqs/index.html           + images/  + thank-you/index.html
   ```
6. hPanel → Advanced → **LiteSpeed cache purge**, then open both URLs.

**Do NOT delete the old WordPress pages.** Leave them in place — they are simply shadowed by the folders.
Deleting them would strip "How It Works" and "FAQ" out of the WordPress menu.

If a URL still shows the old WordPress page, it is the cache: purge LiteSpeed again and hard-refresh
(Cmd/Ctrl + Shift + R).

## Form → email (FormSubmit, no plugin, no API key)

- Both pages carry the site's quote form, posting to `https://formsubmit.co/Jeff.c@mccboundlegends.com`.
- **First submission only**: FormSubmit emails Jeff an "Activate form" link. He clicks it once; after that
  every lead arrives as a table email. The subject line says which page it came from, and a `service`
  field records it too, so How It Works / FAQ / boat leads are easy to tell apart.
- After submit the visitor lands on that page's own `/thank-you/`.
- To change the lead email: edit `action="https://formsubmit.co/…"` in `index.html` (one line per page).
- SMS/text alerts are not possible with FormSubmit; the new Next.js site (Vercel) has Twilio SMS built in.

## Tracking (already wired, same IDs as the rest of the old site)

- GTM `GTM-M44WB2FK` + Google Ads tag `AW-18234011636` on every page including the thank-you pages.
- dataLayer events, same names as the new site, so the GTM setup in `docs/gtm/` covers these too:
  `phone_click` on every phone link, `quote_submit` on form submit, `generate_lead` on thank-you.

## Checks before calling it done

- [ ] Both URLs load with the new design, purge LiteSpeed if not.
- [ ] Menu links "How It Works" and "FAQ" land on the new pages.
- [ ] FAQ accordions open and close (they are plain HTML `<details>`, they work with JS disabled).
- [ ] Submit each form once, click the FormSubmit activation email, confirm the lead reaches Jeff (check spam).
- [ ] Tap the phone number on a phone → dialer opens.
- [ ] "BBB Accredited" appears in the footer badge row (client's copy). If MCC is **not** BBB accredited, remove it.

## Rollback

Delete `public_html/how-it-works/` and/or `public_html/faqs/`. The original WordPress pages come
straight back — they were never modified.
