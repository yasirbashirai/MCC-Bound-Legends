import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { categories, pages } from "@/data/services";
import { Facebook, Instagram, Mail, Phone, Pin, Clock, Shield, TikTok, YouTube, Chevron, Truck, Usa, LinkIcon, Gear, Flag } from "./Icons";
import { PhoneLink } from "./PhoneLink";

/**
 * Site footer — built 1:1 from the client's approved footer handoff (2026-09-18):
 * client-docs/footer-handoff-2026-09-18. Desktop = 01_DESKTOP_FINAL_REFERENCE.png,
 * mobile = 02_MOBILE_FINAL_REFERENCE.png. All copy/links are live HTML; images are
 * only used for the logo, the two scenic backgrounds, the truck/yacht photo and badges.
 *
 * Breakpoints: < xl (1280) = the stacked mobile reference (phones + tablets),
 * xl = compact desktop, hd (1600+) = the reference's exact desktop sizing.
 */

const quick = [
  ["Home", "/"], ["Services", "/services/"], ["Get a Quote", "/get-a-quote/"], ["How It Works", "/how-it-works/"],
  ["About Us", "/about-us/"], ["Reviews", "/testimonials/"], ["FAQ", "/faq/"], ["Contact", "/contact/"],
];

const legal = [
  ["Privacy Policy", "/privacy-policy/"], ["Terms & Conditions", "/terms-and-conditions/"], ["Sitemap", "/sitemap.xml"],
];

const trust = [
  { label: <>Licensed<br />&amp; Insured</>, icon: Shield },
  { label: <>Vetted<br />Carriers</>, icon: Truck },
  { label: <>Nationwide<br />Coverage</>, icon: Usa },
  { label: <>On-Time<br />Delivery</>, icon: Clock },
];

// Badge heights: phone / xl desktop / hd desktop (reference proportions)
const badges = [
  { src: "/images/footer/badge-bbb.webp", alt: "BBB Accredited Business", w: 480, h: 195, cls: "h-[56px] xl:h-[60px] hd:h-[80px]" },
  { src: "/images/footer/badge-google.webp", alt: "Google 5-Star Rated", w: 480, h: 334, cls: "h-[72px] xl:h-[74px] hd:h-[94px]" },
  { src: "/images/footer/badge-trustpilot.webp", alt: "Trustpilot five stars", w: 480, h: 190, cls: "h-[52px] xl:h-[54px] hd:h-[68px]" },
  { src: "/images/footer/badge-nationwide.webp", alt: "Nationwide coverage — all 50 states", w: 480, h: 461, cls: "h-[78px] xl:h-[78px] hd:h-[100px]" },
];

const social = [
  [site.social.facebook, Facebook, "Facebook"], [site.social.instagram, Instagram, "Instagram"],
  [site.social.tiktok, TikTok, "TikTok"], [site.social.youtube, YouTube, "YouTube"],
] as const;

export function Footer() {
  const specific = pages.filter((p) => p.kind !== "category");
  const columns: { title: string; icon: React.ComponentType<{ className?: string }>; items: [string, string][] }[] = [
    { title: "Quick Links", icon: LinkIcon, items: quick as [string, string][] },
    { title: "What We Coordinate", icon: Gear, items: categories.map((c) => [c.name, `/${c.slug}/`]) },
    { title: "Specific Transport", icon: Truck, items: specific.map((s) => [s.name, `/${s.slug}/`]) },
  ];

  return (
    <footer className="bg-marine text-frost">
      {/* ── 1. CTA banner (skyline / water) ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Image src="/images/footer/cta-desktop.webp" alt="" fill sizes="100vw" className="hidden object-cover object-[50%_35%] md:block" />
        <Image src="/images/footer/cta-mobile.webp" alt="" fill sizes="100vw" className="object-cover object-[50%_20%] md:hidden" />
        {/* darkening so the white copy stays legible, fading into the navy footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-marine/25 via-marine/40 to-marine/85 xl:from-marine/10 xl:via-marine/20 xl:to-marine/75" />
        <div className="footer-wrap relative flex flex-col items-center gap-5 pb-8 pt-12 text-center md:pt-16 xl:min-h-[150px] xl:flex-row xl:gap-5 xl:py-5 xl:text-left hd:min-h-[168px] hd:gap-8 hd:py-6 2xl:gap-10">
          <div className="xl:shrink-0">
            <h2 className="whitespace-nowrap text-[25px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.45)] min-[400px]:text-[27px] sm:text-[38px] xl:text-[32px] hd:text-[42px] 2xl:text-[46px]">
              Ready to Ship Your <span className="text-cyan">Boat?</span>
            </h2>
            <p className="mt-1.5 text-[15px] text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,.5)] sm:text-[19px] xl:text-[17px] hd:text-[20px] 2xl:text-[22px]">
              Get a free, no-obligation quote in 60 seconds.
            </p>
          </div>

          <Link
            href="/get-a-quote/"
            data-cta="footer-quote"
            className="inline-flex h-[56px] w-full max-w-[560px] items-center justify-center gap-3 rounded-[14px] border border-white/60 bg-gradient-to-r from-cyan via-[#1f8fff] to-royal px-8 text-[19px] font-bold text-white shadow-[0_10px_34px_-6px_rgba(18,184,255,.75),inset_0_1px_0_rgba(255,255,255,.45)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-6px_rgba(18,184,255,.95)] sm:text-[20px] xl:h-[54px] xl:w-auto xl:shrink-0 xl:px-6 xl:text-[18px] hd:h-[62px] hd:px-10 hd:text-[20px] 2xl:px-14"
          >
            Get a Quote Now
            <Chevron className="h-5 w-5 -rotate-90" />
          </Link>

          {/* desktop trust items + tagline sit inside the banner */}
          <ul className="hidden xl:flex xl:items-center xl:border-l xl:border-white/40 xl:pl-1 hd:pl-2 2xl:pl-4">
            {trust.map(({ label, icon: Icon }, i) => (
              <li key={i} className="flex flex-col items-center gap-1.5 border-r border-white/40 px-2.5 text-center last:border-r-0 hd:px-4 2xl:px-6">
                <Icon className="h-8 w-8 text-white hd:h-9 hd:w-9" />
                <span className="whitespace-nowrap text-[13px] font-medium leading-[1.2] text-white hd:text-[14px] 2xl:text-[15.5px]">{label}</span>
              </li>
            ))}
          </ul>
          <Tagline className="hidden xl:block xl:ml-auto xl:mt-2 hd:mr-4" />
        </div>
      </section>

      {/* ── 2. Mobile / tablet trust strip ───────────────────────────────── */}
      <div className="border-b border-white/10 bg-marine xl:hidden">
        <div className="footer-wrap flex flex-col items-center gap-5 py-7 sm:flex-row sm:justify-center sm:gap-8">
          <ul className="grid w-full max-w-[420px] grid-cols-4 gap-1 max-[360px]:grid-cols-2 max-[360px]:gap-y-5 sm:w-auto">
            {trust.map(({ label, icon: Icon }, i) => (
              <li key={i} className="flex flex-col items-center gap-2 border-r border-white/20 px-2 text-center last:border-r-0 max-[360px]:border-r-0">
                <Icon className="h-9 w-9 text-white" />
                <span className="whitespace-nowrap text-[14px] font-medium leading-[1.25] text-white">{label}</span>
              </li>
            ))}
          </ul>
          <Tagline className="mt-2 sm:mt-0 sm:border-l sm:border-white/20 sm:pl-8" />
        </div>
      </div>

      {/* ── 3. Main footer ───────────────────────────────────────────────── */}
      <div className="footer-wrap pt-10 xl:grid xl:grid-cols-[minmax(0,1.5fr)_minmax(0,3.3fr)_minmax(0,1.4fr)] xl:gap-x-6 xl:pt-0 hd:grid-cols-[minmax(0,1.7fr)_minmax(0,3fr)_minmax(0,2fr)] hd:gap-x-8 2xl:gap-x-12">
        {/* Company / contact ------------------------------------------------ */}
        <div className="min-w-0 xl:pb-7 xl:pt-8">
          {/* desktop: big logo + one-line wordmark */}
          <Link href="/" className="hidden items-center gap-3 xl:flex hd:gap-4">
            <span className="relative block h-[80px] w-[80px] shrink-0 hd:h-[112px] hd:w-[112px] 2xl:h-[124px] 2xl:w-[124px]"><Image src="/images/logo.webp" alt={`${site.name} logo`} fill sizes="124px" className="object-contain" /></span>
            <span className="min-w-0">
              <span className="display block whitespace-nowrap text-[24px] leading-none text-white hd:text-[34px] 2xl:text-[38px]">MCC <span className="text-cyan">Bound</span> Legends</span>
              <span className="display-md mt-1.5 block whitespace-nowrap text-[10.5px] tracking-[0.2em] text-cyan hd:text-[13px] hd:tracking-[0.3em] 2xl:text-[14px]">Nationwide Vehicle Shipping</span>
            </span>
          </Link>
          <p className="mt-5 hidden max-w-[470px] text-[14.5px] leading-[1.5] xl:block hd:text-[16px]">
            {site.legalName} is a licensed and bonded transport company — coordinating vehicle, marine, RV, commercial, and heavy equipment transport nationwide. No deposit required. Every shipment fully insured. Free quote in 60 seconds. Vetted motor carriers perform the physical transport. BBB Accredited. 5-Star Rated on Google and Trustpilot.
          </p>

          {/* mobile: logo left, wordmark + short intro right */}
          <div className="flex items-start gap-4 xl:hidden">
            <Link href="/" className="relative block h-[96px] w-[96px] shrink-0 sm:h-[128px] sm:w-[128px]"><Image src="/images/logo.webp" alt={`${site.name} logo`} fill sizes="128px" className="object-contain" /></Link>
            <div className="min-w-0 pt-0.5">
              <p className="display whitespace-nowrap text-[24px] leading-none text-white min-[400px]:text-[26px] sm:text-[34px]">MCC <span className="text-cyan">Bound</span> Legends</p>
              <p className="display-md mt-1.5 whitespace-nowrap text-[10.5px] tracking-[0.2em] text-cyan sm:text-[13px] sm:tracking-[0.28em]">Nationwide Vehicle Shipping</p>
              <p className="mt-3 text-[15px] leading-[1.5] sm:text-[16px]">
                Reliable, nationwide transport for vehicles, boats, RVs, commercial equipment and more. Fully insured. No deposits required. Get a free quote in 60 seconds.
              </p>
            </div>
          </div>

          {/* desktop contact list */}
          <ul className="mt-5 hidden space-y-2 text-[14.5px] xl:block hd:text-[15.5px]">
            <li className="flex items-start gap-3"><Pin className="mt-0.5 h-5 w-5 shrink-0 text-cyan" /><span>{site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}</span></li>
            <li><PhoneLink location="footer" className="flex items-center gap-3 hover:text-white"><Phone className="h-5 w-5 text-cyan" />{site.phone}</PhoneLink></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white"><Mail className="h-5 w-5 text-cyan" />{site.email}</a></li>
            <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-cyan" />{site.hours}</li>
            <li className="flex items-center gap-3"><Shield className="h-5 w-5 text-cyan" />USDOT {site.usdot} &nbsp;•&nbsp; MC {site.mc}</li>
          </ul>

          {/* mobile contact row */}
          <ul className="mt-6 flex flex-wrap items-start justify-center gap-x-7 gap-y-4 text-[15.5px] xl:hidden">
            <li><PhoneLink location="footer" className="flex min-h-11 items-center gap-3 hover:text-white"><Phone className="h-6 w-6 text-cyan" />{site.phone}</PhoneLink></li>
            <li><a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 hover:text-white"><Mail className="h-6 w-6 text-cyan" />{site.email}</a></li>
            <li className="flex items-start gap-3"><Pin className="mt-0.5 h-6 w-6 shrink-0 text-cyan" /><span>{site.address.street},<br />{site.address.city}, {site.address.state} {site.address.zip}</span></li>
          </ul>

          <div className="mt-6 flex items-center justify-center gap-4 xl:justify-start">
            {social.map(([href, Icon, label]) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-white transition hover:bg-cyan hover:text-marine">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns (desktop) + badge row ------------------------------- */}
        {/* columns size to their content and the leftover space is split evenly between them,
            so the three gaps are always equal (client 2026-09-19: "even out the spacing") */}
        <div className="hidden min-w-0 xl:grid xl:grid-cols-[auto_auto_auto] xl:grid-rows-[auto_1fr] xl:justify-between xl:gap-x-6 xl:pb-7 xl:pt-8 hd:gap-x-10">
          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h3 className="display-md text-[16px] tracking-[0.14em] text-cyan hd:text-[18px] 2xl:text-[19px]">{col.title}</h3>
              <span className="mt-2.5 block h-[3px] w-9 rounded-full bg-cyan" />
              <ul className="mt-4 space-y-[5px] whitespace-nowrap text-[14px] leading-tight text-white hd:text-[16px]">
                {col.items.map(([l, h]) => <li key={h}><Link href={h} className="transition hover:text-cyan">{l}</Link></li>)}
              </ul>
            </div>
          ))}
          {/* trust badges: full width under the three link columns */}
          <div className="col-span-3 self-end border-t border-white/15 pt-5">
            <BadgeRow />
          </div>
        </div>

        {/* Mobile accordions --------------------------------------------- */}
        <div className="mt-8 space-y-3 xl:hidden">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <details key={col.title} className="group rounded-xl border border-white/15 bg-marine-700/60">
                <summary className="flex min-h-14 cursor-pointer items-center gap-4 px-4 text-white">
                  <Icon className="h-7 w-7 shrink-0 text-cyan" />
                  <span className="display-md text-[17px] tracking-[0.1em] sm:text-[18px]">{col.title}</span>
                  <Chevron className="ml-auto h-5 w-5 shrink-0 -rotate-90 text-cyan transition-transform group-open:rotate-0" />
                </summary>
                <ul className="space-y-1 border-t border-white/10 px-4 pb-3 pt-2">
                  {col.items.map(([l, h]) => <li key={h}><Link href={h} className="flex min-h-11 items-center pl-11 text-[16px] text-white/90 hover:text-cyan">{l}</Link></li>)}
                </ul>
              </details>
            );
          })}
        </div>

        {/* Truck / yacht visual (desktop, bleeds to the right edge) ---------- */}
        <div className="footer-bleed-right relative hidden min-h-[520px] xl:block">
          {/* portrait render shows the whole truck + yacht at this column shape, like the reference */}
          <Image src="/images/footer/truck-yacht-mobile.webp" alt="Black RAM pickup towing a luxury yacht along a coastal highway" fill sizes="(min-width:1280px) 30vw, 0px" className="object-cover object-[50%_62%]" />
          {/* fade into navy on the left + bottom so it reads as part of the footer */}
          <div className="absolute inset-0 bg-gradient-to-r from-marine via-marine/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-marine to-transparent" />
          <Slogan className="absolute bottom-7 right-6 hd:right-8 2xl:right-12" />
        </div>
      </div>

      {/* ── 4. Mobile truck / yacht visual + badges ──────────────────────── */}
      <div className="mt-9 xl:hidden">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/8]">
          <Image src="/images/footer/truck-yacht-mobile.webp" alt="Black RAM pickup towing a luxury yacht along a coastal highway" fill sizes="100vw" className="object-cover object-[50%_58%] sm:hidden" />
          <Image src="/images/footer/truck-yacht-desktop.webp" alt="" fill sizes="100vw" className="hidden object-cover object-[50%_60%] sm:block" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-marine to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-marine to-transparent" />
          <Slogan className="absolute bottom-4 right-5" small />
        </div>
        <div className="footer-wrap pb-8 pt-2">
          <BadgeRow mobile />
        </div>
      </div>

      {/* ── 5. Legal bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-white/12 bg-[#04122a]">
        <div className="footer-wrap py-6 text-center text-[14px] xl:flex xl:items-center xl:justify-between xl:gap-3 xl:py-5 xl:text-left xl:text-[13px] hd:gap-6 hd:text-[15.5px]">
          <p className="flex items-center justify-center gap-3 text-white xl:shrink-0">
            <Flag className="h-[22px] w-[34px] shrink-0 rounded-[3px] shadow" />
            Nationwide transport coordination across all 50 states.
          </p>
          <p className="mt-4 leading-[1.6] text-white/85 xl:mt-0 xl:whitespace-nowrap xl:border-l xl:border-white/25 xl:px-3 xl:text-center hd:px-8 2xl:px-12">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.<br />
            Licensed &amp; bonded. <span className="whitespace-nowrap">USDOT {site.usdot} &nbsp;•&nbsp; MC {site.mc}.</span>
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center xl:mt-0 xl:shrink-0 xl:border-l xl:border-white/25 xl:pl-2 hd:pl-4">
            {legal.map(([l, h]) => (
              <li key={h} className="border-l border-white/25 px-2.5 first:border-l-0 sm:px-4 xl:px-2.5 hd:px-6">
                <Link href={h} className="inline-flex min-h-11 items-center whitespace-nowrap text-[13.5px] text-cyan transition hover:text-white sm:text-[inherit] xl:min-h-0">{l}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

/** "Putting Trust in Motion" brush-script tagline with the blue swoosh underline. */
function Tagline({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span className="relative inline-block -rotate-[6deg] whitespace-nowrap font-hand text-[32px] leading-[0.95] text-cyan [text-shadow:0_2px_4px_rgba(0,0,0,.75),0_0_18px_rgba(0,0,0,.6)] sm:text-[36px] xl:text-[28px] hd:text-[34px] 2xl:text-[40px]">
        <span className="block">Putting Trust</span>
        <span className="block pl-8">in Motion</span>
        <svg viewBox="0 0 200 14" className="absolute -bottom-3 left-6 h-3 w-[84%] text-cyan drop-shadow-[0_2px_3px_rgba(0,0,0,.7)]" aria-hidden="true"><path d="M2 10 C 60 2, 140 2, 198 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
      </span>
    </span>
  );
}

/** "SAFE TRANSPORT. / HAPPIER DESTINATIONS." overlay on the truck/yacht visual. */
function Slogan({ className = "", small = false }: { className?: string; small?: boolean }) {
  return (
    <p className={`display-md text-right italic tracking-[0.04em] drop-shadow-[0_2px_10px_rgba(0,0,0,.6)] ${small ? "text-[24px] sm:text-[30px]" : "text-[26px] hd:text-[30px] 2xl:text-[34px]"} ${className}`}>
      <span className="block text-white">&ldquo;Safe Transport.</span>
      <span className="block text-cyan">Happier Destinations.&rdquo;</span>
      <svg viewBox="0 0 300 12" className="mt-1 ml-auto h-2.5 w-[88%] text-cyan" aria-hidden="true"><path d="M2 9 C 80 2, 200 2, 298 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
    </p>
  );
}

function BadgeRow({ mobile = false }: { mobile?: boolean }) {
  return (
    <ul className={mobile ? "grid grid-cols-4 items-center gap-2 max-[420px]:grid-cols-2 max-[420px]:gap-y-6" : "flex items-center justify-between gap-3"}>
      {badges.map((b, i) => (
        <li key={b.src} className={`flex min-w-0 items-center justify-center ${mobile ? "border-r border-white/20 px-1 last:border-r-0 max-[420px]:[&:nth-child(2)]:border-r-0" : `border-r border-white/20 px-3 last:border-r-0 last:pr-0 hd:px-4 2xl:px-6 ${i === 0 ? "pl-0" : ""}`}`}>
          <Image src={b.src} alt={b.alt} width={b.w} height={b.h} className={`w-auto max-w-full ${b.cls}`} />
        </li>
      ))}
    </ul>
  );
}
