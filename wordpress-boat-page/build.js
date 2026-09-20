#!/usr/bin/env node
/**
 * Builds a self-contained static copy of /boat-transport-florida/ for the OLD WordPress site
 * (Hostinger). Run with the Next.js dev server up:
 *
 *   node wordpress-boat-page/build.js http://localhost:3000   (whatever port `npm run dev` prints)
 *
 * Output: wordpress-boat-page/boat-transport-florida/  (index.html + images/ + thank-you/)
 *         wordpress-boat-page/boat-transport-florida-upload.zip
 *
 * What it does: takes the server-rendered HTML, inlines the compiled CSS, swaps next/image URLs
 * for plain files, rewrites internal links to the old site's real URLs, replaces the React form
 * with a FormSubmit POST, adds GTM/Ads tags + dataLayer events, and a tiny mobile menu.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ORIGIN = process.argv[2] || "http://localhost:3088";
const PAGE = "/boat-transport-florida/";
const SITE = "https://mccboundlegends.com";
const LEAD_EMAIL = "Jeff.c@mccboundlegends.com";
const GTM = "GTM-M44WB2FK";
const ADS = "AW-18234011636";
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(__dirname, "boat-transport-florida");

/** New flat URLs → pages that actually exist on the old WordPress site. */
const LINKS = {
  "/": `${SITE}/`,
  "/services/": `${SITE}/services/`,
  "/how-it-works/": `${SITE}/how-does-it-work/`,
  "/about-us/": `${SITE}/about-us/`,
  "/testimonials/": `${SITE}/testimonials/`,
  "/faq/": `${SITE}/faq/`,
  "/contact/": `${SITE}/contact-us/`,
  "/get-a-quote/": "#quote",
  "/privacy-policy/": `${SITE}/privacy-policy/`,
  "/terms-and-conditions/": `${SITE}/terms-and-condition/`,
  "/boat-transport-florida/": `${SITE}/boat-transport-florida/`,
  "/sitemap.xml": `${SITE}/sitemap.xml`,
  "/rv-transport/": `${SITE}/services/rv-transport/`,
  "/construction-equipment-transport/": `${SITE}/services/heavy-equipment-shipping/`,
  "/excavator-transport/": `${SITE}/services/heavy-equipment-shipping/`,
  "/skid-steer-transport/": `${SITE}/services/heavy-equipment-shipping/`,
  "/bulldozer-transport/": `${SITE}/services/heavy-equipment-shipping/`,
  "/forklift-transport/": `${SITE}/services/heavy-equipment-shipping/`,
  "/box-truck-transport/": `${SITE}/services/large-truck-suv-or-van-shipping/`,
  "/work-truck-transport/": `${SITE}/services/large-truck-suv-or-van-shipping/`,
  "/semi-truck-transport/": `${SITE}/services/large-truck-suv-or-van-shipping/`,
  "/fleet-vehicle-transport/": `${SITE}/services/large-truck-suv-or-van-shipping/`,
  "/non-running-vehicle-transport/": `${SITE}/services/car-shipping/`,
  "/auto-transport/": `${SITE}/services/car-shipping/`,
  "/enclosed-auto-transport/": `${SITE}/services/enclosed-car-transport/`,
  "/heavy-equipment-transport/": `${SITE}/services/heavy-equipment-shipping/`,
  "/motorcycle-transport/": `${SITE}/services/motorcycle-transport/`,
  "/auction-vehicle-transport/": `${SITE}/services/auction-auto-transport/`,
  "/commercial-vehicle-transport/": `${SITE}/services/large-truck-suv-or-van-shipping/`,
  "/boat-transport-without-trailer/": `${SITE}/boat-transport-florida/`,   // old WP boat page is being retired (client 2026-09-20)
  "/yacht-transport/": `${SITE}/boat-transport-florida/`,
  "/boat-transport/": `${SITE}/boat-transport-florida/`,
};
const fallbackLink = `${SITE}/services/`;

async function main() {
  const html = await (await fetch(ORIGIN + PAGE)).text();
  const cssHrefs = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
  let css = "";
  for (const h of cssHrefs) css += (await (await fetch(ORIGIN + h)).text()) + "\n";
  // next/font @font-face blocks point at /_next/static/media → drop them, Google Fonts is linked instead
  css = css.replace(/@font-face\s*{[^}]*(\/_next\/|\/media\/)[^}]*}/g, "");
  css += `\n/* fonts (Google) */\n:root{--font-barlow:"Barlow Condensed","Arial Narrow",sans-serif;--font-inter:"Inter",system-ui,sans-serif;--font-script:"Kaushan Script","Brush Script MT",cursive}\n`;
  css += `.wp-drawer{position:fixed;inset:0;z-index:60;display:none}.wp-drawer.open{display:block}.wp-drawer .bg{position:absolute;inset:0;background:rgba(8,19,31,.7)}.wp-drawer .panel{position:absolute;right:0;top:0;height:100%;width:86%;max-width:360px;background:#fff;padding:20px;overflow:auto;box-shadow:-10px 0 40px rgba(0,0,0,.3)}.wp-drawer .panel a{display:block;padding:14px 0;border-bottom:1px solid #dbe3ee;font-weight:600;color:#1e63d6;text-decoration:none}.wp-drawer .close{float:right;border:0;background:#eef2f7;border-radius:8px;width:40px;height:40px;font-size:22px;cursor:pointer}\n`;

  const images = new Set();
  const toLocal = (u) => {
    // /_next/image/?url=%2Fimages%2Fphotos%2Fx.webp&w=..  |  /images/logo.webp
    const m = u.match(/url=([^&"]+)/);
    const src = decodeURIComponent(m ? m[1] : u);
    if (!src.startsWith("/images/")) return u;
    const rel = path.basename(src);
    images.add(src);
    return `images/${rel}`;
  };

  let out = html;
  // ── head ──────────────────────────────────────────────────────────────
  out = out.replace(/<link rel="preload" as="image"[^>]*>/g, "");
  out = out.replace(/<link rel="preload" as="script"[^>]*>/g, "");
  out = out.replace(/<link rel="stylesheet"[^>]*>/g, "");
  out = out.replace(/<link rel="icon" href="\/favicon.ico"\/>/, `<link rel="icon" href="${SITE}/wp-content/uploads/2026/05/cropped-Untitled-design-69-150x150.webp" sizes="32x32"/>`);
  out = out.replace(/<link rel="apple-touch-icon"[^>]*>/, "");
  out = out.replace(/<html lang="en" class="[^"]*">/, '<html lang="en">');
  // Next scripts (dev hmr, hydration payloads) — keep only JSON-LD
  out = out.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "");
  out = out.replace(/<template[^>]*>[\s\S]*?<\/template>/g, "");
  out = out.replace(/<next-route-announcer[^>]*>[\s\S]*?<\/next-route-announcer>/g, "");
  const head = `
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Kaushan+Script&display=swap" rel="stylesheet">
<style>${css}</style>
<!-- Google Tag Manager (same container as the rest of the site) -->
<script>window.dataLayer=window.dataLayer||[];(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${ADS}"></script>
<script>function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ADS}');</script>
</head>`;
  out = out.replace("</head>", head);

  // ── images ────────────────────────────────────────────────────────────
  out = out.replace(/ srcSet="[^"]*"/g, "").replace(/ sizes="[^"]*"/g, "");
  out = out.replace(/ src="(\/_next\/image\/\?[^"]+|\/images\/[^"]+)"/g, (_, u) => ` src="${toLocal(u.replace(/&amp;/g, "&"))}"`);
  out = out.replace(/ data-nimg="[^"]*"/g, "").replace(/ decoding="async"/g, "");

  // ── links ─────────────────────────────────────────────────────────────
  out = out.replace(/ href="(\/[^"#]*\/?)"/g, (_, h) => ` href="${LINKS[h] ?? fallbackLink}"`);

  // ── header: hamburger → simple drawer; drop BackToTop button ──────────
  out = out.replace(/<button class="[^"]*lg:hidden" aria-label="Open menu">/, '<button class="grid h-11 w-11 place-items-center rounded-lg text-navy lg:hidden" aria-label="Open menu" onclick="document.getElementById(\'wpDrawer\').classList.add(\'open\')">');
  const drawer = `<div id="wpDrawer" class="wp-drawer"><div class="bg" onclick="this.parentNode.classList.remove('open')"></div><div class="panel"><button class="close" aria-label="Close menu" onclick="document.getElementById('wpDrawer').classList.remove('open')">×</button><p style="font-family:var(--font-barlow);font-weight:800;font-size:22px;color:#0d1f35;margin:6px 0 10px">MCC Bound Legends</p>
<a href="${SITE}/">Home</a><a href="${SITE}/services/">Services</a><a href="${SITE}/about-us/">About Us</a><a href="${SITE}/faq/">FAQ</a><a href="${SITE}/testimonials/">Reviews</a><a href="${SITE}/contact-us/">Contact</a><a href="${SITE}/how-does-it-work/">How It Works</a><a href="#quote" onclick="document.getElementById('wpDrawer').classList.remove('open')" style="color:#f97316">Get a Free Boat Quote →</a></div></div>`;

  // ── form → FormSubmit ─────────────────────────────────────────────────
  out = out.replace(/<form id="quote"(?: noValidate="")? class="([^"]*)">/, (m, c) => `<form id="quote" action="https://formsubmit.co/${LEAD_EMAIL}" method="POST" class="${c}">
<input type="hidden" name="_subject" value="New Boat Transport Quote (mccboundlegends.com/boat-transport-florida/)">
<input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false">
<input type="hidden" name="_next" value="${SITE}/boat-transport-florida/thank-you/">
<input type="hidden" name="page" value="/boat-transport-florida/"><input type="hidden" name="service" value="Boat Transport to Florida (Snowbird)">
<input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">`);
  out = out.replace(/<input type="text" name="company_website"[^>]*>/, "");
  out = out.replace(/(<input type="checkbox" name="sms_consent" value="yes")/, "$1 required");
  out = out.replace(/(<input name="pickup_date" type="text")/, '$1 onfocus="this.type=\'date\'" onblur="if(!this.value)this.type=\'text\'"');
  // BackToTop (client-only button) has no job here
  out = out.replace(/<button[^>]*aria-label="Back to top"[^>]*>[\s\S]*?<\/button>/, "");

  // ── behaviour: dataLayer events (same names as the Next site → same GTM triggers) ──
  const js = `<script>
(function(){
  var dl=window.dataLayer=window.dataLayer||[];
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){a.addEventListener('click',function(){dl.push({event:'phone_click',click_location:a.closest('header')?'header':a.closest('form')?'form':'page'});});});
  var f=document.getElementById('quote');
  if(f){f.addEventListener('submit',function(){dl.push({event:'quote_submit',ship_type:(f.querySelector('[name=trailer_available]')||{}).value||'boat',page_path:'/boat-transport-florida/'});});}
  document.querySelectorAll('a[href="#quote"]').forEach(function(a){a.addEventListener('click',function(e){var q=document.getElementById('quote');if(q){e.preventDefault();q.scrollIntoView({behavior:'smooth',block:'start'});var first=q.querySelector('input:not([type=hidden])');if(first)setTimeout(function(){first.focus({preventScroll:true})},500);}});});
})();
</script>`;
  out = out.replace("</body>", `${drawer}\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n${js}\n</body>`);

  // ── write ─────────────────────────────────────────────────────────────
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, "images"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "thank-you"), { recursive: true });
  fs.writeFileSync(path.join(OUT, "index.html"), out);
  for (const src of images) fs.copyFileSync(path.join(ROOT, "public", src), path.join(OUT, "images", path.basename(src)));
  fs.writeFileSync(path.join(OUT, "thank-you", "index.html"), thankYou());
  const zip = path.join(__dirname, "boat-transport-florida-upload.zip");
  fs.rmSync(zip, { force: true });
  // Flat zip (index.html at the root, no wrapper folder): Hostinger's File Manager "Extract" asks for a folder name and
  // creates it, so the client types `boat-transport-florida` and gets public_html/boat-transport-florida/index.html.
  execSync(`cd "${__dirname}/boat-transport-florida" && zip -qr "${zip}" . -x "*.DS_Store"`);
  console.log(`built ${OUT}\n  images: ${images.size}\n  zip: ${zip}`);
}

function thankYou() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Thank You — Your Boat Quote Request Was Received | MCC Bound Legends</title>
<meta name="robots" content="noindex,nofollow"><link rel="canonical" href="${SITE}/boat-transport-florida/thank-you/">
<link rel="icon" href="${SITE}/wp-content/uploads/2026/05/cropped-Untitled-design-69-150x150.webp" sizes="32x32">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<script>window.dataLayer=window.dataLayer||[];(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${ADS}"></script>
<script>function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ADS}');
dataLayer.push({event:'generate_lead',page_path:'/boat-transport-florida/thank-you/'});
/* Optional direct Ads conversion (else use GTM on Page Path = /boat-transport-florida/thank-you/): */
/* gtag('event','conversion',{send_to:'${ADS}/PASTE_CONVERSION_LABEL'}); */</script>
<style>body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f8fafc;color:#0f172a}.wrap{max-width:640px;margin:0 auto;padding:60px 20px;text-align:center}.logo{width:120px;margin:0 auto 20px}h1{font-family:"Barlow Condensed",sans-serif;font-weight:800;font-size:40px;line-height:1.05;color:#1e63d6;margin:0 0 12px}p{font-size:17px;line-height:1.6;color:#475569}.btn{display:inline-block;margin-top:22px;background:#f97316;color:#fff;font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:20px;letter-spacing:.02em;padding:14px 26px;border-radius:10px;text-decoration:none}.btn.alt{background:#0d1f35;margin-left:8px}.tip{margin-top:28px;font-size:14px;color:#64748b}</style></head>
<body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<div class="wrap"><img class="logo" src="../images/logo.webp" alt="MCC Bound Legends"><h1>Thanks — your boat quote request is in.</h1>
<p>A transport specialist is reviewing your route and boat details now. Expect your quote by phone or email within 2 hours during business hours (Mon–Sat, 8 AM–6 PM ET).</p>
<p>Need it faster? Call us directly.</p>
<a class="btn" href="tel:8887850028">Call (888) 785-0028</a><a class="btn alt" href="${SITE}/">Back to Home</a>
<p class="tip">No deposit is required to book. Payment is arranged once your vetted carrier is assigned.</p></div></body></html>`;
}

main().catch((e) => { console.error(e); process.exit(1); });
