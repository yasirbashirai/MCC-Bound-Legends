"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { categories, childrenOf, situations } from "@/data/services";
import { Arrow, Chevron, Clock, Facebook, Instagram, Menu, Phone, Pin, Shield, TikTok, VehicleIcon, X, YouTube } from "./Icons";
import { PhoneLink } from "./PhoneLink";

/* Primary navigation, client homepage revision brief §3 (2026-10-07). */
const NAV = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Transport Services", mega: true },
  { href: "/about-us/", label: "About" },
  { href: "/how-it-works/", label: "How It Works" },
  { href: "/testimonials/", label: "Reviews" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  // The boat Ads page carries the client's boat-specific brand line; everything else stays generic.
  const boat = path === "/boat-transport-florida/" || path === "/boat-transport-florida";
  // Boat page keeps its approved 1600px header; every other page uses the wide site wrapper
  const barWrap = boat ? "mx-auto max-w-7xl px-4 sm:px-6 xl:px-8" : "wrap";
  const brand = boat
    ? { l1: "Nationwide", l2: "Boat Shipping", sub: "Safe boats. Happier destinations.", where: "Nationwide Boat Shipping" }
    : { l1: "Nationwide", l2: "Transportation", sub: "Putting trust in motion.", where: "Nationwide Transport" };

  // Close menus on navigation (deferred so it is not a synchronous set-state in the effect)
  useEffect(() => { const t = window.setTimeout(() => { setOpen(false); setMega(false); }, 0); return () => window.clearTimeout(t); }, [path]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", f, { passive: true });
    const t = window.setTimeout(f, 0);
    return () => { window.removeEventListener("scroll", f); window.clearTimeout(t); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar — brief §2: ~32px tall, 13px text, phone · coverage · licensed · hours · socials · tagline */}
      <div className="bg-navy text-[13px] text-white">
        <div className={`flex min-h-[32px] items-center justify-between gap-4 ${barWrap}`}>
          <div className="flex min-w-0 items-center gap-4 overflow-hidden lg:gap-0 lg:divide-x lg:divide-white/25">
            <PhoneLink location="topbar" className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold hover:text-blue-300 lg:pr-5"><Phone className="h-[15px] w-[15px]" />{site.phone}</PhoneLink>
            <span className="hidden items-center gap-1.5 whitespace-nowrap sm:inline-flex lg:px-5"><Pin className="h-[15px] w-[15px] text-blue-300" />{brand.where}</span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap md:inline-flex lg:px-5"><Shield className="h-[15px] w-[15px] text-blue-300" />Licensed &amp; Bonded</span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap xl:inline-flex xl:px-5"><Clock className="h-[15px] w-[15px] text-blue-300" />{site.hours}</span>
          </div>
          <div className="flex shrink-0 items-center gap-4 lg:gap-0 lg:divide-x lg:divide-white/25">
            <span className="flex items-center gap-4 text-white lg:pr-5">
              <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-blue-300"><Facebook className="h-4 w-4" /></a>
              <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-blue-300"><Instagram className="h-4 w-4" /></a>
              <a href={site.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="hover:text-blue-300"><TikTok className="h-4 w-4" /></a>
              <a href={site.social.youtube} target="_blank" rel="noopener" aria-label="YouTube" className="hover:text-blue-300"><YouTube className="h-4 w-4" /></a>
            </span>
            <span className="hidden whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-blue-300 lg:inline lg:pl-5">{site.tagline}™</span>
          </div>
        </div>
      </div>

      {/* Main bar — brief §3: ~80px tall · logo · brand block · 15px nav · GET A FREE QUOTE + CALL buttons */}
      <div className={`relative bg-white transition-shadow duration-500 ${scrolled ? "shadow-[0_8px_30px_-12px_rgb(13_31_53/0.35)]" : "shadow-[0_1px_0_#dbe3ee]"}`}>
        <div className={`flex min-h-[72px] items-center gap-3 py-1.5 lg:min-h-[80px] lg:gap-5 ${barWrap}`}>
          <Link href="/" className="relative flex shrink-0 items-center" aria-label={`${site.name} home`}>
            <span className="relative block h-[60px] w-[64px] lg:h-[68px] lg:w-[74px]"><Image src="/images/logo.webp" alt={`${site.name} logo`} fill sizes="80px" className="object-contain" priority /></span>
          </Link>

          {/* Brand block */}
          <div className="hidden min-w-0 min-[440px]:block lg:hidden xl:block xl:border-r xl:border-line xl:pr-5">
            <p className="display-md whitespace-nowrap text-[18px] leading-[1.05] text-navy sm:text-[21px]">{brand.l1}<br /><span className="text-blue">{brand.l2}</span></p>
            <p className="mt-1 whitespace-nowrap font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-slate">{brand.sub}</p>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1 min-[1440px]:gap-2" aria-label="Primary">
            {NAV.map((n) =>
              n.mega ? (
                <div key={n.href} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <Link href={n.href} className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-2 text-[14px] font-semibold hover:text-blue xl:px-2 xl:text-[15px] min-[1440px]:px-2.5 ${path?.startsWith("/services") || mega ? "text-blue" : "text-navy"}`} aria-expanded={mega}>
                    {n.label} <Chevron className="h-4 w-4 opacity-70" />
                  </Link>
                  {mega && <MegaMenu />}
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={`whitespace-nowrap rounded-md px-1.5 py-2 text-[14px] font-semibold hover:text-blue xl:px-2 xl:text-[15px] min-[1440px]:px-2.5 ${path === n.href ? "text-blue" : "text-navy"}`}>
                  {n.label}
                </Link>
              )
            )}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2.5 lg:ml-0">
            <Link href="/get-a-quote/" className="btn-orange whitespace-nowrap rounded-lg px-4 py-2.5 text-[14px] font-bold uppercase tracking-[0.03em] sm:px-5 sm:py-3 sm:text-[15px] lg:px-4 xl:px-5">
              Get a Free Quote <Arrow className="hidden h-4 w-4 sm:block" />
            </Link>
            {/* Call button: full "CALL (888) 785-0028" on wide screens, the number alone where space is tight */}
            <PhoneLink location="header" className="hidden items-center gap-2 whitespace-nowrap rounded-lg border-2 border-navy px-3.5 py-[10px] text-[15px] font-bold uppercase tracking-[0.02em] text-navy transition hover:bg-navy hover:text-white min-[1366px]:inline-flex">
              <Phone className="h-[18px] w-[18px]" /><span className="hidden hd:inline">Call&nbsp;</span>{site.phone}
            </PhoneLink>
            <PhoneLink location="header" className="hidden h-[46px] w-[46px] place-items-center rounded-lg border-2 border-navy text-navy transition hover:bg-navy hover:text-white lg:grid min-[1366px]:hidden!">
              <Phone className="h-5 w-5" />
            </PhoneLink>
            <button className="grid h-11 w-11 place-items-center rounded-lg text-navy lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="display text-xl text-navy">MCC <span className="text-blue">Bound</span> Legends</span>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-lg bg-mist text-navy" aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <p className="eyebrow mb-2 text-muted">What are you shipping?</p>
              <ul className="mb-5 grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}/`} className="flex items-center gap-2 rounded-xl border border-line bg-cloud px-3 py-2.5 text-[13px] font-semibold text-navy">
                      <VehicleIcon name={c.icon} className="h-6 w-9 shrink-0 text-blue" />{c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="divide-y divide-line border-y border-line">
                {NAV.map((n) => (
                  <li key={n.href}><Link href={n.href} className="flex items-center justify-between py-3.5 font-semibold text-navy">{n.label}<Arrow className="h-4 w-4 text-blue" /></Link></li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 text-sm text-slate">
                <p className="flex items-start gap-2"><Pin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />{site.address.full}</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue" />{site.hours}</p>
                <p className="flex items-center gap-2"><Shield className="h-4 w-4 text-blue" />USDOT {site.usdot} · MC {site.mc}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-line p-4">
              <PhoneLink location="mobile_menu" className="btn-outline py-3 text-sm"><Phone className="h-4 w-4" /> Call Now</PhoneLink>
              <Link href="/get-a-quote/" className="btn-orange py-3 text-sm">Get a Free Quote</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[900px] -translate-x-1/2 pt-3">
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-lift)]">
        <div className="grid grid-cols-[1.35fr_1fr]">
          <div className="p-6">
            <p className="eyebrow mb-3 text-muted">What are you shipping?</p>
            <ul className="grid grid-cols-2 gap-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`} className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-cloud">
                    <span className="grid h-11 w-14 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue group-hover:bg-blue group-hover:text-white" style={{ ["--icon-bg" as string]: "#e0f2fe" }}>
                      <VehicleIcon name={c.icon} className="h-7 w-11" />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-navy">{c.name}</span>
                      <span className="block text-xs leading-snug text-muted">{c.short}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l border-line bg-cloud p-6">
            <p className="eyebrow mb-3 text-muted">Specific vehicles &amp; situations</p>
            <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-[13.5px]">
              {[...situations, ...categories.flatMap((c) => childrenOf(c.slug).filter((s) => s.kind === "service"))].slice(0, 13).map((s) => (
                <li key={s.slug}><Link href={`/${s.slug}/`} className="flex items-center gap-2 text-slate hover:text-blue"><span className="h-1.5 w-1.5 rounded-full bg-blue" />{s.name}</Link></li>
              ))}
            </ul>
            <Link href="/services/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-navy">View all services <Arrow className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-line bg-navy px-6 py-3 text-sm text-white">
          <span>Not sure which category? Call and describe it, we will tell you how it moves.</span>
          <PhoneLink location="mega_menu" className="font-display text-lg font-bold tracking-wide text-blue-300">{site.phone}</PhoneLink>
        </div>
      </div>
    </div>
  );
}
