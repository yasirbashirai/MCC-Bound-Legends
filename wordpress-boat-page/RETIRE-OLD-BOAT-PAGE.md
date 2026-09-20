# Retire the old WordPress boat page

Old page: `https://mccboundlegends.com/services/boat-and-yacht-transport/`
New page: `https://mccboundlegends.com/boat-transport-florida/`

Don't just delete it. It has Google history and inbound links; a 301 redirect passes all of that to the new page.

## 1. Add the 301 (Hostinger File Manager, 2 minutes)
1. hPanel → File Manager → `public_html/` → open **`.htaccess`** (enable "show hidden files" if you don't see it).
2. Paste this block at the VERY TOP, above `# BEGIN WordPress`:

```apache
# Old boat page → new boat landing page (2026-09-20)
Redirect 301 /services/boat-and-yacht-transport/ https://mccboundlegends.com/boat-transport-florida/
```
3. Save. Open the old URL in a private window: it must land on the new page.

Alternative without touching files: WordPress → Plugins → install **Redirection** (free) → Tools → Redirection →
Source `/services/boat-and-yacht-transport/` → Target `/boat-transport-florida/` → Add.

## 2. Trash the old page
WordPress → Pages → search "Boat" → Trash. (The redirect keeps working because it runs before WordPress.)

## 3. Fix the menu
WordPress → Appearance → Menus (or Elementor header) → the "Services → Boat & Yacht Transport" item →
change its URL to `/boat-transport-florida/`. Do the same for any homepage service card that points to the old page.

## 4. Anything else pointing at the old URL
- Google Ads: any ad/sitelink using the old URL → switch final URL to the new page.
- Google Business Profile services / social bios → update the link.
- The new landing page itself already links to `/boat-transport-florida/` (rebuilt 2026-09-20).

## Check
- Old URL → 301 → new page (test in a private window).
- `mccboundlegends.com/sitemap.xml` no longer lists the old page (WordPress regenerates it once the page is trashed;
  purge LiteSpeed cache if it still shows).
