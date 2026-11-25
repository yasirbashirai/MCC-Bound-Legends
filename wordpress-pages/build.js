#!/usr/bin/env node
/**
 * Builds self-contained static copies of new-site pages for the OLD WordPress site (Hostinger).
 * Each page becomes a plain folder that sits next to WordPress in public_html/ and wins over the
 * WordPress permalink of the same name (Apache/LiteSpeed serve a real directory before index.php).
 *
 * Run with the Next.js dev server up:
 *
 *   node wordpress-pages/build.js http://localhost:3000            # all pages
 *   node wordpress-pages/build.js http://localhost:3000 faq        # just one
 *
 * Output per page: <outDir>/index.html + images/ + thank-you/index.html, plus a flat upload zip.
 *
 * What it does: takes the server-rendered HTML, inlines the compiled CSS, swaps next/image URLs for
 * plain files, rewrites internal links to the old site's real URLs, replaces the React form with a
 * POST to the folder's own send.php (PHP mail on Hostinger + a backup lead log), adds GTM/Ads tags +
 * dataLayer events, and a tiny mobile menu.
 *
 * NOTE: the boat page is built from here too, into wordpress-boat-page/ (its long-standing path, so
 * the existing UPLOAD-GUIDE + client PDF stay correct). wordpress-boat-page/build.js delegates here.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ORIGIN = process.argv[2] || "http://localhost:3000";
const ONLY = process.argv.slice(3);
const SITE = "https://mccboundlegends.com";
const LEAD_EMAIL = "Jeff.c@mccboundlegends.com";
const ALERT_EMAIL = "info@mccboundlegends.com";   // send.php re-sends a lead here if the email above fails
const GTM = "GTM-M44WB2FK";
const ADS = "AW-18234011636";
const ROOT = path.resolve(__dirname, "..");

/**
 * One entry per page we hand the client.
 *   route  = path on the Next.js dev server
 *   slug   = folder name in public_html/ (and therefore the live URL on the old site)
 *   outDir = where the built folder is written in this repo
 */
const PAGES = {
  "boat-transport-florida": {
    route: "/boat-transport-florida/",
    slug: "boat-transport-florida",
    outDir: path.join(ROOT, "wordpress-boat-page", "boat-transport-florida"),
    zip: path.join(ROOT, "wordpress-boat-page", "boat-transport-florida-upload.zip"),
    subject: "New Boat Transport Quote (mccboundlegends.com/boat-transport-florida/)",
    service: "Boat Transport to Florida (Snowbird)",
    preselect: "boat-trailer",   // same preselect the React page passes to StepQuoteForm
    shipFallback: "boat",
    drawerCta: "Get a Free Boat Quote →",
    ty: {
      title: "Thank You — Your Boat Quote Request Was Received",
      h1: "Thanks — your boat quote request is in.",
      body: "A transport specialist is reviewing your route and boat details now. Expect your quote by phone or email within 2 hours during business hours (Mon–Sat, 8 AM–6 PM ET).",
    },
  },
  "how-does-it-work": {
    route: "/how-it-works/",
    // Live folder chosen by the client on upload (2026-10-09): public_html/how-it-works/.
    // (Originally built for /how-does-it-work/; the old WP page still lives there.)
    slug: "how-it-works",
    outDir: path.join(__dirname, "how-it-works"),
    zip: path.join(__dirname, "how-it-works-upload.zip"),
    subject: "New Quote Request (mccboundlegends.com/how-it-works/)",
    service: "How It Works page",
    preselect: "",
    shipFallback: "vehicle",
    drawerCta: "Get a Free Quote →",
    ty: {
      title: "Thank You — Your Quote Request Was Received",
      h1: "Thanks — your quote request is in.",
      body: "A transport coordinator is reviewing your route and vehicle details now. Expect your quote by phone or email within 2 hours during business hours (Mon–Sat, 8 AM–6 PM ET).",
    },
  },
  faq: {
    route: "/faq/",
    // Live folder chosen by the client on upload (2026-10-09): public_html/faqs/.
    slug: "faqs",
    outDir: path.join(__dirname, "faqs"),
    zip: path.join(__dirname, "faqs-upload.zip"),
    subject: "New Quote Request (mccboundlegends.com/faqs/)",
    service: "FAQ page",
    preselect: "",
    shipFallback: "vehicle",
    drawerCta: "Get a Free Quote →",
    ty: {
      title: "Thank You — Your Quote Request Was Received",
      h1: "Thanks — your quote request is in.",
      body: "A transport coordinator is reviewing your route and vehicle details now. Expect your quote by phone or email within 2 hours during business hours (Mon–Sat, 8 AM–6 PM ET).",
    },
  },
};

/** New flat URLs → pages that actually exist on the old WordPress site. */
const LINKS = {
  "/": `${SITE}/`,
  "/services/": `${SITE}/services/`,
  "/how-it-works/": `${SITE}/how-it-works/`,
  "/about-us/": `${SITE}/about-us/`,
  "/testimonials/": `${SITE}/testimonials/`,
  "/faq/": `${SITE}/faqs/`,
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
  "/boat-transport-without-trailer/": `${SITE}/boat-transport-florida/`, // old WP boat page retired (client 2026-09-20)
  "/yacht-transport/": `${SITE}/boat-transport-florida/`,
  "/boat-transport/": `${SITE}/boat-transport-florida/`,
};
const fallbackLink = `${SITE}/services/`;

/* ─────────────────────────────────────────────────────────────────────────────
 * Static 3-step quote form — the WordPress pages are plain HTML, so the React
 * component (src/components/StepQuoteForm.tsx) is reproduced here by hand,
 * 1:1 in looks, validation and payload. Keeping the field NAMES identical means
 * send.php, leads-log.php and every GTM variable built on those names keep
 * working without a single backend change.
 *
 *   Step 1 Route    ship_type · pickup_zip · delivery_zip
 *   Step 2 Details  vehicle / boat / equipment / something-else group (only the
 *                   matching one is enabled, so only its fields are posted)
 *   Step 3 Contact  pickup_date · name · phone · email · sms_consent
 *
 * Options post the same slugs the live pages already send (car, boat-trailer…),
 * so the lead email and Ads conversion data stay byte-for-byte compatible.
 * ──────────────────────────────────────────────────────────────────────────── */

/** value + label, in the same order as src/data/quote.ts */
const SHIP = [
  ["car", "Car / Sedan"],
  ["suv-pickup", "SUV / Pickup Truck"],
  ["classic-exotic", "Classic / Exotic / Luxury Car"],
  ["commercial-truck", "Box / Work / Commercial Truck"],
  ["semi-tractor", "Semi Tractor (Day Cab / Sleeper)"],
  ["van-bus", "Cargo Van / Bus / Shuttle"],
  ["boat-trailer", "Boat With Trailer"],
  ["boat-no-trailer", "Boat Without Trailer"],
  ["yacht", "Yacht / Large Vessel"],
  ["motorhome", "Motorhome (Class A / B / C)"],
  ["towable-rv", "Travel Trailer / Fifth Wheel"],
  ["motorcycle", "Motorcycle"],
  ["powersports", "ATV / UTV / Golf Cart"],
  ["construction", "Construction Equipment"],
  ["heavy-industrial", "Heavy / Industrial Machinery"],
  ["other", "Something Else"],
];
const BOAT_TYPES = ["Center Console", "Sailboat", "Yacht / Mega Yacht", "Pontoon Boat", "Fishing Boat", "Speedboat", "Cabin Cruiser", "Jet Ski / PWC", "Other"];
const TRAILER_OPTS = ["Yes, road-worthy", "Yes, not road-worthy", "No trailer", "Not sure"];
const TRANSPORT_OPTS = ["Open Carrier", "Enclosed Carrier", "Flatbed / Step Deck", "Not Sure"];
const CONDITION_OPTS = ["Running", "Non-Running"];

const SMS_CONSENT =
  "By checking this box, I agree to receive SMS messages from MCC Bound Legends LLC at the number provided. " +
  "Message frequency varies. Message and data rates may apply. Reply HELP for assistance or STOP to opt out.";

const opts = (list) => list.map((o) => `<option>${o}</option>`).join("");
const errBox = `<div class="mccq-err" aria-live="polite"></div>`;

/** `id` is unique per group; `name` is the field send.php reads. */
const selectField = (id, name, label, list, { disabled = false, preset = "" } = {}) => `<div class="mccq-field">
<label for="${id}">${label}</label>
<select id="${id}" name="${name}" required${disabled ? " disabled" : ""}>
<option value="">Select</option>${list.map((o) => `<option${o === preset ? " selected" : ""}>${o}</option>`).join("")}
</select>${errBox}
</div>`;

const ymmField = (id, label, placeholder, disabled) => `<div class="mccq-field">
<label for="${id}">${label}</label>
<input type="text" id="${id}" name="ymm" placeholder="${placeholder}" required${disabled ? " disabled" : ""}>${errBox}
</div>`;

/** Which Step 2 group a ship_type belongs to — mirrors groupOf() in StepQuoteForm.tsx. */
const groupOf = (v) =>
  ["boat-trailer", "boat-no-trailer", "yacht"].includes(v) ? "boat" : ["construction", "heavy-industrial"].includes(v) ? "equip" : v === "other" ? "other" : "vehicle";

/** The whole card, same markup the React component renders (minus the inline success panel: here send.php redirects to thank-you/). */
function stepFormHtml(cfg) {
  const ship = SHIP.map(([v, l]) => `<option value="${v}"${v === cfg.preselect ? " selected" : ""}>${l}</option>`).join("");
  const active = groupOf(cfg.preselect ?? "");
  const off = (g) => (active === g ? "" : " hidden");
  const dis = (g) => (active === g ? "" : " disabled");
  return `<div class="mccq">
<form id="quote" class="mccq-form" action="send.php" method="POST" novalidate>
<input type="hidden" name="page" value="/${cfg.slug}/">
<div class="mccq-hp" aria-hidden="true"><label for="mccq-company-website">Company website</label><input type="text" id="mccq-company-website" name="company_website" tabindex="-1" autocomplete="off"></div>
<input type="hidden" name="gclid"><input type="hidden" name="utm_source"><input type="hidden" name="utm_campaign"><input type="hidden" name="landing_page">

<div class="mccq-head">
<p class="mccq-eyebrow">Free quote &middot; No deposit</p>
<h2 class="mccq-title">Get your free transport quote</h2>
</div>

<ol class="mccq-progress" aria-label="Quote progress">
<li class="is-active" aria-current="step"><span>Route</span></li>
<li><span>Details</span></li>
<li><span>Contact</span></li>
</ol>

<fieldset class="mccq-step" data-step="1">
<legend class="mccq-legend">Step 1 of 3: Route</legend>
<div class="mccq-field">
<label for="mccq-ship-type">What are you shipping?</label>
<select id="mccq-ship-type" name="ship_type" required><option value="">Select shipment type</option>${ship}</select>${errBox}
</div>
<div class="mccq-row">
<div class="mccq-field">
<label for="mccq-pickup-zip">Pick-up ZIP</label>
<input type="text" id="mccq-pickup-zip" name="pickup_zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" placeholder="e.g. 48226" required data-check="zip">${errBox}
</div>
<div class="mccq-field">
<label for="mccq-delivery-zip">Drop-off ZIP</label>
<input type="text" id="mccq-delivery-zip" name="delivery_zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" placeholder="e.g. 33602" required data-check="zip">${errBox}
</div>
</div>
<button type="button" class="mccq-btn" data-next>Get my quote &rarr;</button>
<p class="mccq-trust"><b>No deposit</b> &middot; USDOT 4464266 &middot; MC 1760960 &middot; Licensed &amp; insured carriers</p>
</fieldset>

<fieldset class="mccq-step" data-step="2" hidden>
<legend class="mccq-legend">Step 2 of 3: Details</legend>

<div class="mccq-group" data-group="vehicle"${off("vehicle")}>
${ymmField("mccq-ymm-vehicle", "Year, make &amp; model", "e.g. 2021 Ford F-150", !!dis("vehicle"))}
<div class="mccq-row">
${selectField("mccq-operable-vehicle", "operable", "Condition", CONDITION_OPTS, { disabled: !!dis("vehicle") })}
${selectField("mccq-transport-vehicle", "transport_type", "Transport type", TRANSPORT_OPTS, { disabled: !!dis("vehicle") })}
</div>
</div>

<div class="mccq-group" data-group="boat"${off("boat")}>
${ymmField("mccq-ymm-boat", "Year, make &amp; model", "e.g. 2019 Boston Whaler", !!dis("boat"))}
<div class="mccq-row">
${selectField("mccq-boat-type", "boat_type", "Boat type", BOAT_TYPES, { disabled: !!dis("boat") })}
<div class="mccq-field">
<label for="mccq-length">Length (ft)</label>
<input type="number" id="mccq-length" name="length" inputmode="numeric" min="5" max="200" placeholder="e.g. 24" required data-check="length"${dis("boat")}>${errBox}
</div>
</div>
${selectField("mccq-trailer", "trailer_available", "Do you have a trailer?", TRAILER_OPTS, { disabled: !!dis("boat"), preset: cfg.preselect === "boat-no-trailer" ? "No trailer" : "" })}
</div>

<div class="mccq-group" data-group="equip"${off("equip")}>
${ymmField("mccq-ymm-equip", "Make &amp; model", "e.g. CAT 320 excavator", !!dis("equip"))}
<div class="mccq-row">
${selectField("mccq-operable-equip", "operable", "Condition", CONDITION_OPTS, { disabled: !!dis("equip") })}
${selectField("mccq-transport-equip", "transport_type", "Transport type", TRANSPORT_OPTS, { disabled: !!dis("equip") })}
</div>
</div>

<div class="mccq-group" data-group="other"${off("other")}>
${ymmField("mccq-ymm-other", "Describe what you're shipping", "e.g. 20 ft shipping container", !!dis("other"))}
${selectField("mccq-transport-other", "transport_type", "Transport type", TRANSPORT_OPTS, { disabled: !!dis("other") })}
</div>

<div class="mccq-nav">
<button type="button" class="mccq-back" data-back>&larr; Back</button>
<button type="button" class="mccq-btn" data-next>Continue &rarr;</button>
</div>
</fieldset>

<fieldset class="mccq-step" data-step="3" hidden>
<legend class="mccq-legend">Step 3 of 3: Contact</legend>
<div class="mccq-field">
<label for="mccq-pickup-date">Preferred pickup date <span class="mccq-opt">(leave blank if flexible)</span></label>
<input type="date" id="mccq-pickup-date" name="pickup_date">
</div>
<div class="mccq-field">
<label for="mccq-name">Your name</label>
<input type="text" id="mccq-name" name="name" autocomplete="name" required>${errBox}
</div>
<div class="mccq-row">
<div class="mccq-field">
<label for="mccq-phone">Phone</label>
<input type="tel" id="mccq-phone" name="phone" autocomplete="tel" placeholder="(555) 555-5555" required data-check="phone">${errBox}
</div>
<div class="mccq-field">
<label for="mccq-email">Email</label>
<input type="email" id="mccq-email" name="email" autocomplete="email" required data-check="email">${errBox}
</div>
</div>
<input type="hidden" name="sms_consent" value="no" id="mccq-sms-no">
<label class="mccq-check" for="mccq-sms">
<input type="checkbox" id="mccq-sms" name="_sms_ok" value="yes">
<span>${SMS_CONSENT} Please review our <a href="${SITE}/privacy-policy/">Privacy Policy</a> and <a href="${SITE}/terms-and-condition/">Terms &amp; Conditions</a>.</span>
</label>
<div class="mccq-nav">
<button type="button" class="mccq-back" data-back>&larr; Back</button>
<button type="submit" class="mccq-btn">Get my free quote</button>
</div>
</fieldset>
</form>
</div>`;
}

/** Step logic — same rules and messages as checkField() in the React component. */
function mccqJs(cfg) {
  return `<script>
(function(){
  var form=document.getElementById('quote');
  if(!form||!form.classList.contains('mccq-form'))return;
  var dl=window.dataLayer=window.dataLayer||[];
  var steps=[].slice.call(form.querySelectorAll('.mccq-step'));
  var bar=[].slice.call(form.querySelectorAll('.mccq-progress li'));
  var ship=form.querySelector('[name="ship_type"]');
  var groups={vehicle:form.querySelector('[data-group="vehicle"]'),boat:form.querySelector('[data-group="boat"]'),equip:form.querySelector('[data-group="equip"]'),other:form.querySelector('[data-group="other"]')};
  var BOAT=['boat-trailer','boat-no-trailer','yacht'],EQUIP=['construction','heavy-industrial'];
  var step=1;
  function digits(s){return (s||'').replace(/\\D/g,'');}
  function groupOf(v){return BOAT.indexOf(v)>-1?'boat':EQUIP.indexOf(v)>-1?'equip':v==='other'?'other':'vehicle';}
  function box(el){return el.closest('.mccq-field')||el.closest('.mccq-check')||el.parentNode;}
  function errOf(el){var b=box(el);return b?b.querySelector('.mccq-err'):null;}
  function showErr(el,msg){var b=errOf(el);if(b)b.textContent=msg||'';if(msg)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid');}
  function check(el){
    if(el.disabled)return '';
    var v=(el.value||'').trim(),kind=el.getAttribute('data-check');
    if(el.required&&!v)return el.tagName==='SELECT'?'Please choose one.':'Please fill this in.';
    if(!v)return '';
    if(kind==='zip'&&!/^\\d{5}$/.test(v))return 'Enter a 5-digit ZIP code.';
    if(kind==='phone'){var d=digits(v);if(!(d.length===10||(d.length===11&&d[0]==='1')))return 'Enter a 10-digit phone number.';}
    if(kind==='email'&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v))return 'Enter a valid email address.';
    if(kind==='length'){var n=Number(v);if(!(n>=5&&n<=200))return 'Enter a length between 5 and 200 ft.';}
    return '';
  }
  function validate(n){
    var fs=form.querySelector('[data-step="'+n+'"]');if(!fs)return true;
    var first=null;
    [].forEach.call(fs.querySelectorAll('input,select'),function(el){
      if(el.type==='checkbox'||el.type==='hidden')return;
      var m=check(el);showErr(el,m);
      if(m&&!first)first=el;
    });
    if(first)first.focus();
    return !first;
  }
  function go(n){
    step=n;
    steps.forEach(function(fs){fs.hidden=Number(fs.getAttribute('data-step'))!==n;});
    bar.forEach(function(li,i){
      li.className=i+1===n?'is-active':i+1<n?'is-done':'';
      if(i+1===n)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');
    });
    var fs=form.querySelector('[data-step="'+n+'"]');
    var first=fs&&fs.querySelector('input:not([type="hidden"]):not(:disabled),select:not(:disabled)');
    if(first){try{first.focus({preventScroll:true});}catch(e){first.focus();}}
    if(form.getBoundingClientRect().top<0)form.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function syncGroups(){
    var g=groupOf(ship?ship.value:'');
    Object.keys(groups).forEach(function(k){
      var gbox=groups[k];if(!gbox)return;
      var hide=k!==g;
      gbox.hidden=hide;
      [].forEach.call(gbox.querySelectorAll('input,select'),function(el){
        el.disabled=hide;
        if(hide)showErr(el,'');
      });
    });
    if(ship&&ship.value==='boat-no-trailer'){
      var tr=form.querySelector('#mccq-trailer');
      if(tr&&!tr.value)tr.value='No trailer';
    }
  }
  form.querySelectorAll('[data-next]').forEach(function(b){b.addEventListener('click',function(){if(validate(step))go(step+1);});});
  form.querySelectorAll('[data-back]').forEach(function(b){b.addEventListener('click',function(){go(step-1);});});
  if(ship)ship.addEventListener('change',function(){showErr(ship,check(ship));syncGroups();});
  // Same payload as the React form: sms_consent is "yes" only when the box is ticked, otherwise "no".
  var smsBox=form.querySelector('#mccq-sms'),smsHidden=form.querySelector('#mccq-sms-no');
  function syncSms(){if(smsBox&&smsHidden)smsHidden.value=smsBox.checked?'yes':'no';}
  if(smsBox)smsBox.addEventListener('change',syncSms);
  syncSms();
  form.addEventListener('input',function(e){
    var el=e.target;
    if(el.getAttribute&&el.getAttribute('data-check')==='zip')el.value=digits(el.value).slice(0,5);
    if(el.getAttribute&&el.getAttribute('aria-invalid')==='true')showErr(el,check(el));
  });
  form.addEventListener('keydown',function(e){
    if(e.key!=='Enter'||step>=3)return;
    var t=e.target;
    if(t.tagName!=='INPUT'||t.type==='submit'||t.type==='checkbox')return;
    e.preventDefault();
    if(validate(step))go(step+1);
  });
  // One POST per lead: a second click (or Enter) while the first is in flight used to create a duplicate
  // lead and a duplicate Ads conversion. Latch only on the real Step 3 submit.
  form.addEventListener('submit',function(e){
    if(step<3){e.preventDefault();if(validate(step))go(step+1);return;}
    if(!validate(3)){e.preventDefault();return;}
    if(form.getAttribute('data-submitting')==='1'){e.preventDefault();return;}
    form.setAttribute('data-submitting','1');
    var b=form.querySelector('button[type="submit"]');
    if(b){b.disabled=true;b.textContent='Sending\\u2026';}
    dl.push({event:'quote_submit',ship_type:(ship&&ship.value)||'${cfg.shipFallback}',page_path:'/${cfg.slug}/'});
  });
  try{
    var q=new URLSearchParams(location.search);
    ['gclid','utm_source','utm_campaign'].forEach(function(k){
      var el=form.elements.namedItem(k);if(el)el.value=q.get(k)||'';
    });
    var lp=form.elements.namedItem('landing_page');if(lp)lp.value=location.pathname;
    var d=form.elements.namedItem('pickup_date');
    if(d){var t=new Date();d.min=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');}
  }catch(e){}
  syncGroups();
})();
</script>`;
}

/** The .mccq rules live at the end of src/app/globals.css — read them from there so there is one source of truth. */
function mccqCss() {
  const g = fs.readFileSync(path.join(ROOT, "src/app/globals.css"), "utf8");
  const i = g.indexOf("/* ── 3-step quote form");
  if (i < 0) throw new Error("3-step form CSS block not found in src/app/globals.css");
  return g.slice(i) + "\n#quote{scroll-margin-top:90px}\n";
}

/** Find the quote form block and return [start, end) — handles both shapes the routes produce:
 *  the old `QuoteForm` (<form id="quote">) and the boat page's `StepQuoteForm` (<div class="mccq" id="quote"><form>), which is already 3-step. */
function quoteBlockRange(html) {
  let start = html.search(/<form[^>]*\bid="quote"/);
  let tag = "form";
  if (start < 0) {
    start = html.search(/<div[^>]*\bclass="mccq[^"]*"[^>]*\bid="quote"|<div[^>]*\bid="quote"[^>]*\bclass="mccq[^"]*"/);
    tag = "div";
  }
  if (start < 0) return null;
  // Walk the tags of the same name until the opening one is closed again.
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, "g");
  re.lastIndex = start;
  let depth = 0;
  let m;
  while ((m = re.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return [start, m.index + m[0].length];
  }
  return null;
}

/** Swap the old single-screen form for the 3-step one, and make sure its CSS + step JS are on the page. */
function finalizeHtml(html, cfg) {
  let out = html;
  const range = quoteBlockRange(out);
  if (!range) throw new Error(`${cfg.slug}: quote form not found — was the page built from a route with a form?`);
  out = out.slice(0, range[0]) + stepFormHtml(cfg) + out.slice(range[1]);
  if (!/\.mccq-form\s*\{/.test(out)) out = out.replace("</head>", `<style>${mccqCss()}</style>\n</head>`);
  if (!out.includes("data-next")) throw new Error(`${cfg.slug}: 3-step markup missing`);
  if (!out.includes("syncGroups")) out = out.replace("</body>", `${mccqJs(cfg)}\n</body>`);
  return out;
}

async function buildPage(key, cfg) {
  const html = await (await fetch(ORIGIN + cfg.route)).text();
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
    images.add(src);
    return `images/${path.basename(src)}`;
  };

  let out = html;
  // ── head ──────────────────────────────────────────────────────────────
  out = out.replace(/<link rel="preload" as="image"[^>]*>/g, "");
  out = out.replace(/<link rel="preload" as="script"[^>]*>/g, "");
  out = out.replace(/<link rel="stylesheet"[^>]*>/g, "");
  out = out.replace(/<link rel="icon" href="\/favicon.ico"\/>/, `<link rel="icon" href="${SITE}/wp-content/uploads/2026/05/cropped-Untitled-design-69-150x150.webp" sizes="32x32"/>`);
  out = out.replace(/<link rel="apple-touch-icon"[^>]*>/, "");
  out = out.replace(/<html lang="en" class="[^"]*">/, '<html lang="en">');
  // canonical must point at the OLD site's URL for this page, not the new-site route
  out = out.replace(/<link rel="canonical" href="[^"]*"\/?>/, `<link rel="canonical" href="${SITE}/${cfg.slug}/"/>`);
  // og:url + breadcrumb JSON-LD carry the new-site route too → point them at the live folder
  if (cfg.route !== `/${cfg.slug}/`) out = out.split(`${SITE}${cfg.route}"`).join(`${SITE}/${cfg.slug}/"`);
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
<a href="${SITE}/">Home</a><a href="${SITE}/services/">Services</a><a href="${SITE}/about-us/">About Us</a><a href="${SITE}/faqs/">FAQ</a><a href="${SITE}/testimonials/">Reviews</a><a href="${SITE}/contact-us/">Contact</a><a href="${SITE}/how-it-works/">How It Works</a><a href="#quote" onclick="document.getElementById('wpDrawer').classList.remove('open')" style="color:#f97316">${cfg.drawerCta}</a></div></div>`;

  // ── form → 3-step, posting to send.php in the same folder ─────────────
  // FormSubmit was dropped 2026-10-09: it delivers nothing until a one-time activation email is clicked,
  // so the live pages lost every lead. send.php runs on the client's Hostinger, no third party involved.
  // Relative action = works in whatever folder the client extracts the zip into.
  // The React single-screen form is replaced entirely (see stepFormHtml) — same field names as before,
  // so send.php / leads-log.php / GTM variables need no change.
  out = finalizeHtml(out, cfg);
  // BackToTop (client-only button) has no job here
  out = out.replace(/<button[^>]*aria-label="Back to top"[^>]*>[\s\S]*?<\/button>/, "");

  // ── behaviour: dataLayer events (same names as the Next site → same GTM triggers) ──
  const js = `<script>
(function(){
  var dl=window.dataLayer=window.dataLayer||[];
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){a.addEventListener('click',function(){dl.push({event:'phone_click',click_location:a.closest('header')?'header':a.closest('form')?'form':'page'});});});
  var f=document.getElementById('quote');
  // Record the real folder the page was uploaded to (send.php redirects to <that folder>/thank-you/ itself)
  if(f&&f.page){var pth=location.pathname;if(pth.slice(-5)==='.html')pth=pth.slice(0,pth.lastIndexOf('/')+1);if(pth.slice(-1)!=='/')pth+='/';f.page.value=pth;}
  // The submit latch + quote_submit event live in the 3-step script (they must only fire on the Step 3 submit).
  document.querySelectorAll('a[href="#quote"]').forEach(function(a){a.addEventListener('click',function(e){var q=document.getElementById('quote');if(q){e.preventDefault();q.scrollIntoView({behavior:'smooth',block:'start'});var first=q.querySelector('input:not([type=hidden]),select');if(first)setTimeout(function(){first.focus({preventScroll:true})},500);}});});
})();
</script>`;
  out = out.replace("</body>", `${drawer}\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n${js}\n</body>`);

  // ── guard rails: fail loudly instead of shipping a broken page ────────
  const problems = [];
  if (!/class="mccq-form"/.test(out)) problems.push("3-step form was not injected");
  if (!/data-step="3"/.test(out)) problems.push("step 3 missing");
  if (!/name="ship_type"/.test(out)) problems.push("ship_type field missing (send.php + GTM depend on it)");
  if (!/name="sms_consent"/.test(out)) problems.push("sms_consent field missing");
  if (/class="field-icon/.test(out) && !/mccq-form/.test(out)) problems.push("old single-screen form survived");
  if (/formsubmit/i.test(out)) problems.push("a FormSubmit reference survived");
  if (/\/_next\//.test(out)) problems.push("a /_next/ URL survived (image or asset would 404)");
  if (/href="\/(?!\/)/.test(out)) problems.push("a root-relative href survived (would break on the old site)");
  if (!out.includes(GTM)) problems.push("GTM container missing");
  if (problems.length) throw new Error(`${key}: ${problems.join("; ")}`);

  // ── write ─────────────────────────────────────────────────────────────
  fs.rmSync(cfg.outDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(cfg.outDir, "images"), { recursive: true });
  fs.mkdirSync(path.join(cfg.outDir, "thank-you"), { recursive: true });
  fs.writeFileSync(path.join(cfg.outDir, "index.html"), out);
  for (const src of images) fs.copyFileSync(path.join(ROOT, "public", src), path.join(cfg.outDir, "images", path.basename(src)));
  fs.writeFileSync(path.join(cfg.outDir, "thank-you", "index.html"), thankYou(cfg));
  fs.writeFileSync(path.join(cfg.outDir, "send.php"), sendPhp(cfg));
  fs.rmSync(cfg.zip, { force: true });
  // Flat zip (index.html at the root, no wrapper folder): Hostinger's File Manager "Extract" asks for a
  // folder name and creates it, so the client types the slug and gets public_html/<slug>/index.html.
  execSync(`cd "${cfg.outDir}" && zip -qr "${cfg.zip}" . -x "*.DS_Store"`);
  const kb = Math.round(fs.statSync(cfg.zip).size / 1024);
  console.log(`✓ ${key.padEnd(24)} → ${path.relative(ROOT, cfg.outDir)}  (${images.size} images, ${kb} KB zip)`);
}

/** send.php for one page: the shared template with this page's subject/service baked in (PHP single-quoted strings). */
function sendPhp(cfg) {
  const q = (s) => s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  return fs.readFileSync(path.join(__dirname, "send.php.tpl"), "utf8")
    .split("__LEAD_EMAIL__").join(q(LEAD_EMAIL))
    .split("__ALERT_EMAIL__").join(q(ALERT_EMAIL))
    .split("__SUBJECT__").join(q(cfg.subject))
    .split("__SERVICE__").join(q(cfg.service));
}

function thankYou(cfg) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${cfg.ty.title} | MCC Bound Legends</title>
<meta name="robots" content="noindex,nofollow"><link rel="canonical" href="${SITE}/${cfg.slug}/thank-you/">
<link rel="icon" href="${SITE}/wp-content/uploads/2026/05/cropped-Untitled-design-69-150x150.webp" sizes="32x32">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<script>window.dataLayer=window.dataLayer||[];(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${ADS}"></script>
<script>function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ADS}');
dataLayer.push({event:'generate_lead',page_path:'/${cfg.slug}/thank-you/'});
/* Optional direct Ads conversion (else use GTM on Page Path = /${cfg.slug}/thank-you/): */
/* gtag('event','conversion',{send_to:'${ADS}/PASTE_CONVERSION_LABEL'}); */</script>
<style>body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f8fafc;color:#0f172a}.wrap{max-width:640px;margin:0 auto;padding:60px 20px;text-align:center}.logo{width:120px;margin:0 auto 20px}h1{font-family:"Barlow Condensed",sans-serif;font-weight:800;font-size:40px;line-height:1.05;color:#1e63d6;margin:0 0 12px}p{font-size:17px;line-height:1.6;color:#475569}.btn{display:inline-block;margin-top:22px;background:#f97316;color:#fff;font-family:"Barlow Condensed",sans-serif;font-weight:700;font-size:20px;letter-spacing:.02em;padding:14px 26px;border-radius:10px;text-decoration:none}.btn.alt{background:#0d1f35;margin-left:8px}.tip{margin-top:28px;font-size:14px;color:#64748b}</style></head>
<body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<div class="wrap"><img class="logo" src="../images/logo.webp" alt="MCC Bound Legends"><h1>${cfg.ty.h1}</h1>
<p>${cfg.ty.body}</p>
<p>Need it faster? Call us directly.</p>
<a class="btn" href="tel:8887850028">Call (888) 785-0028</a><a class="btn alt" href="${SITE}/">Back to Home</a>
<p class="tip">No deposit is required to book. Payment is arranged once your vetted carrier is assigned.</p></div></body></html>`;
}

async function main() {
  const keys = ONLY.length ? ONLY : Object.keys(PAGES);
  for (const k of keys) {
    if (!PAGES[k]) throw new Error(`unknown page "${k}" — known: ${Object.keys(PAGES).join(", ")}`);
    await buildPage(k, PAGES[k]);
  }
}
main().catch((e) => { console.error("✗ " + e.message); process.exit(1); });
