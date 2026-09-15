# Google Ads conversion tracking (sitewide) — setup guide

The site already pushes two `dataLayer` events on **every page**, so one GTM setup covers the
boat page and every page built later:

| Event | Fired by | Where |
|---|---|---|
| `quote_submit` | `trackQuoteSubmit()` after a successful POST to `/api/quote/` | main quote form (`QuoteForm.tsx`, homepage / all landing pages / `/get-a-quote/`) **and** the boat form (`BoatQuoteForm.tsx`) |
| `phone_click` | `trackPhoneClick()` on click | every `tel:` link on the site goes through `PhoneLink.tsx` (header, hero, sticky mobile bar, footer, CTA bands, routes line) |

Extra data sent with each event: `ship_type`, `page_path` (quote) · `click_location` (phone).

GTM container ID (from the old WordPress site, reuse it): **GTM-M44WB2FK**
Google Ads account ID (from the old site): **AW-18234011636**

## 1. Create the two conversion actions in Google Ads (5 min)
Google Ads → Goals → Conversions → **+ New conversion action** → *Website* → enter `mccboundlegends.com` →
scroll to **"Add a conversion action manually"** and create:

1. **Quote Form Submit** — Category *Submit lead form* · Value: none (or a fixed value) · Count: *One* · Attribution: *Data-driven*
2. **Phone Click** — Category *Contact* · Count: *Every* (a person can click twice) · Attribution: *Data-driven*

Choose **"Use Google Tag Manager"** on the setup screen. Copy the **Conversion label** for each
(the Conversion ID is the same for both: `18234011636`).

## 2. Import the container file (2 min)
GTM → container **GTM-M44WB2FK** → Admin → **Import Container** → choose
`mcc-gtm-sitewide-conversions.json` → workspace *Existing (Default)* → **Merge → Rename conflicting**.

Then open **Variables** and replace the two placeholders:
- `Const – Label: Quote Submit` → paste the Quote Form Submit label
- `Const – Label: Phone Click` → paste the Phone Click label
- `Const – GA4 Measurement ID` → the GA4 `G-…` ID (create a GA4 property if none exists; skip GA4 tags if not wanted)

What the import adds:
- Tags: Conversion Linker · Google Ads Conversion (Quote) · Google Ads Conversion (Phone) · GA4 config · GA4 `generate_lead` · GA4 `phone_click`
- Triggers: Custom Event `quote_submit` · Custom Event `phone_click` (no page restriction → sitewide)
- Variables: Data Layer `ship_type`, `page_path`, `click_location` + the constants above

## 3. Test before publishing (5 min)
1. GTM → **Preview** → enter the site URL (Vercel preview or live).
2. Click the phone number → Tag Assistant shows `phone_click` → both *Phone* tags fired.
3. Submit a test quote → `quote_submit` → both *Quote* tags fired (the site redirects to `/thank-you/`).
4. **Publish** the container.
5. Google Ads → Conversions: within ~3 hours the test shows as *Recording conversions*.

## 4. Site env var
Vercel → Project → Settings → Environment Variables → `NEXT_PUBLIC_GTM_ID = GTM-M44WB2FK` → redeploy.
The GTM snippet only renders when this is set (`src/app/layout.tsx`).

## Notes
- Because the triggers are custom events with no URL filter, every future page (route pages, boat-type pages) is
  tracked automatically as long as it uses `PhoneLink` and one of the two quote forms.
- Google Ads "Enhanced conversions" can be switched on later inside the two conversion tags (needs a hashed email
  variable; the form already collects email).
