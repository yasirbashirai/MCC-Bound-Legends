# Delete the old WordPress boat page

Old page: `https://mccboundlegends.com/services/boat-and-yacht-transport/`
New page: `https://mccboundlegends.com/boat-transport-florida/`

Decision (Yasir, 2026-09-20): delete outright, NO redirect.

## Steps
1. WordPress → **Pages** → search "Boat" → hover the page → **Trash**.
2. Pages → **Trash** tab → **Delete Permanently**.
3. **Appearance → Menus** (or the Elementor header) → remove the "Boat & Yacht Transport" item, or point it to
   `/boat-transport-florida/`. Same for any homepage service card that links to the old page.
4. hPanel → Advanced → **purge LiteSpeed cache**.

## Result
- Old URL returns 404; Google drops it from results over the following weeks.
- Any Google Ads ad/sitelink, social bio or Business Profile link still using the old URL must be switched to the new page.
- The new landing page already links only to `/boat-transport-florida/` (rebuilt 2026-09-20).
