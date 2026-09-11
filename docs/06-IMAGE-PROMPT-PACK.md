# Image Prompt Pack

The site auto-detects photos in `public/images/photos/`. Generate each image below (ChatGPT / Midjourney / Higgsfield, same style as the two you already made), export **16:9 at 1920px** (or larger), and save with the **exact filename**. Convert to WebP if you can (`.png`/`.jpg` also work). No rebuild logic needed: if the file exists, the slot switches from illustration to photo.

## Style block (paste at the end of every prompt)
> Photorealistic, cinematic golden-hour lighting, dramatic sky, deep navy and electric-blue tones in the vehicle and shadows, warm orange sunset accents, slight motion blur on the road, ultra-detailed, 16:9, no text, no logos, no watermarks, no people's faces in focus.

---

## A. Homepage hero slideshow (`hero-1` … `hero-8`)
Already have: `hero-1` (car hauler, mountains), `hero-2` (boat + RAM, Florida causeway), `hero-3` (mirror of hero-1).
Replace `hero-3` and add the rest:

| File | Prompt |
|---|---|
| `hero-3.webp` | A large tracked excavator chained down on a lowboy RGN trailer pulled by a dark blue Peterbilt on an interstate at sunset, oversize-load banner, Florida pine flatlands, palm trees far in the background |
| `hero-4.webp` | A Class A luxury motorhome driven along a coastal Florida highway with the Atlantic Ocean and a bridge in the background at golden hour, wide cinematic shot |
| `hero-5.webp` | A white 26-foot box truck secured on a step-deck trailer behind a navy blue semi tractor on an open highway, mountains and sunset behind |
| `hero-6.webp` | Interior of an enclosed auto carrier with a red exotic sports car and a black cruiser motorcycle strapped down with soft tie-downs, dramatic light through the open ramp door |
| `hero-7.webp` | A 60-foot motor yacht on a hydraulic marine transport trailer leaving a Florida marina at sunrise, palms, travel lift crane in the background |
| `hero-8.webp` | Aerial drone view of a multi-car open transport trailer loaded with SUVs and pickups crossing a long bridge over turquoise water in Florida |

## B. Category cards + category page heroes (`cat-<slug>`)
Already have: `cat-auto-transport`, `cat-commercial-vehicle-transport`, `cat-boat-transport` (crops of your two images, replace when you have better).

| File | Prompt |
|---|---|
| `cat-auto-transport.webp` | Open car hauler loaded with a mix of sedans, SUVs and a pickup on a sunny highway, front three-quarter view |
| `cat-commercial-vehicle-transport.webp` | A white box truck and a bucket truck loaded on a step-deck trailer, dark blue semi tractor, industrial yard at golden hour |
| `cat-boat-transport.webp` | Center-console fishing boat on a triple-axle trailer towed by a black dually pickup on a Florida causeway, palms and marina behind |
| `cat-rv-transport.webp` | A fifth-wheel travel trailer being tow-away transported by a heavy-duty pickup on a desert-to-Florida interstate at sunset |
| `cat-motorcycle-transport.webp` | Three motorcycles (a cruiser, a sport bike, an adventure bike) secured with wheel chocks inside a clean enclosed trailer, dramatic side light |
| `cat-construction-equipment-transport.webp` | A yellow skid steer and a mini excavator chained on a gooseneck flatbed trailer behind a dark blue pickup, construction site at sunrise |
| `cat-heavy-equipment-transport.webp` | An oversized industrial machine on a multi-axle heavy-haul trailer with escort vehicles, "OVERSIZE LOAD" banner, long highway, dusk |

## C. Specific service page heroes (`svc-<slug>`) — optional, fall back to the category image

| File | Prompt |
|---|---|
| `svc-box-truck-transport.webp` | A 24-foot box truck on a step-deck trailer, navy semi, interstate, sunset |
| `svc-work-truck-transport.webp` | A utility bucket truck with boom folded, chained on a lowboy, industrial backdrop |
| `svc-semi-truck-transport.webp` | Two semi tractors piggyback (saddle-mount) being transported down a highway |
| `svc-fleet-vehicle-transport.webp` | A car hauler loaded with six identical white fleet vans at a dealership lot |
| `svc-enclosed-auto-transport.webp` | Exotic supercar rolling up a lift-gate into a hard-side enclosed carrier at dusk |
| `svc-non-running-vehicle-transport.webp` | A rollback flatbed winching a non-running classic muscle car, residential driveway, evening |
| `svc-auction-vehicle-transport.webp` | Rows of vehicles at a large auto auction yard with a car hauler loading at the gate |
| `svc-boat-transport-without-trailer.webp` | A travel lift lowering a cabin cruiser onto a hydraulic boat trailer at a Florida boatyard |
| `svc-yacht-transport.webp` | A large sportfish yacht on a specialized yacht hauler with pilot car, coastal highway |
| `svc-excavator-transport.webp` | A 40-ton excavator on an RGN trailer, boom folded, being driven onto the deck |
| `svc-skid-steer-transport.webp` | A compact track loader on a tilt trailer behind a pickup, job site |
| `svc-bulldozer-transport.webp` | A crawler dozer with blade angled on a multi-axle lowboy, oversize banners |
| `svc-forklift-transport.webp` | A telehandler and a warehouse forklift secured on a flatbed at a loading dock |

## D. Section backdrops
Already have: `section-florida`, `section-cab`, `section-skyline` (crops).

| File | Prompt |
|---|---|
| `section-florida.webp` | Wide aerial of a Florida coastal city skyline, marina full of boats and a causeway at sunset, no vehicles in foreground |
| `section-equipment.webp` | Flat-lay style wide shot of a truck yard: open carrier, enclosed carrier, step deck, lowboy and hydraulic boat trailer lined up at golden hour |
| `section-cab.webp` | Close-up of a navy blue semi tractor cab with chrome, sunset reflection in the windshield |

## E. About page
| File | Prompt |
|---|---|
| `about-office.webp` | Modern office building exterior at Cranes Roost Blvd-style suburban Florida business park, palms, blue sky (or use a real photo of the office) |
| `about-team.webp` | Real photo of Jeff / the team preferred. Otherwise skip. |

---
**Do not generate**: fake customer photos, fake trucks with MCC branding presented as company fleet (MCC is a broker), or fake awards/badges.
