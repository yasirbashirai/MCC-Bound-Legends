"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { categories, childrenOf, situations } from "@/data/services";
import { Arrow, Chevron, Clock, Facebook, Group, Headset, Instagram, Mail, Menu, Phone, Pin, Shield, TikTok, Truck, TruckSolid, VehicleIcon, X, YouTube } from "./Icons";
import { PhoneLink } from "./PhoneLink";

/* Nav order per the client header reference (2026-09-19). How It Works stays reachable from the footer. */
const NAV = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services", mega: true },
  { href: "/about-us/", label: "About Us" },
  { href: "/faq/", label: "FAQ" },
  { href: "/testimonials/", label: "Reviews" },
  { href: "/contact/", label: "Contact" },
];

/* Mini trust icons between the brand block and the nav (client header reference). */
const TRUST = [
  { icon: Shield, label: <>Licensed &amp;<br />Insured</> },
  { icon: Group, label: <>Vetted<br />Carriers</> },
  { icon: Truck, label: <>Door-to-Door<br />Service</> },
  { icon: Headset, label: <>Real People<br />Real Support</> },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  // The boat Ads page carries the client's boat-specific brand line; everything else stays generic.
  const boat = path === "/boat-transport-florida/" || path === "/boat-transport-florida";
  const brand = boat
    ? { l1: "Nationwide", l2: "Boat Shipping", sub: "Safe boats. Happier destinations.", where: "Nationwide Boat Shipping" }
    : { l1: "Nationwide", l2: "Vehicle Shipping", sub: "Putting trust in motion.", where: "Nationwide Vehicle Shipping" };

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
      {/* Top info bar — client header reference: contact · coverage · credentials · hours · socials · tagline */}
      <div className="bg-navy text-[13px] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 sm:px-6 lg:py-2 xl:px-8">
          <div className="flex min-w-0 items-center gap-3 overflow-hidden lg:gap-0 lg:divide-x lg:divide-white/30">
            <PhoneLink location="topbar" className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium hover:text-blue-300 lg:pr-4"><Phone className="h-[15px] w-[15px] text-white" />{site.phone}</PhoneLink>
            <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 whitespace-nowrap hover:text-blue-300 min-[540px]:inline-flex lg:px-4"><Mail className="h-[15px] w-[15px]" />{site.email}</a>
            <span className="hidden items-center gap-1.5 whitespace-nowrap md:inline-flex lg:px-4"><Pin className="h-[15px] w-[15px]" />{brand.where}</span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap xl:inline-flex xl:px-4"><TruckSolid className="h-[15px] w-[15px]" />USDOT {site.usdot} <span className="px-1 text-white/40">|</span> MC {site.mc}</span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap min-[1400px]:inline-flex min-[1400px]:px-4"><Shield className="h-[15px] w-[15px]" />Licensed &amp; Bonded</span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap min-[1750px]:inline-flex min-[1750px]:px-4"><Clock className="h-[15px] w-[15px]" />{site.hours}</span>
          </div>
          <div className="flex shrink-0 items-center gap-4 lg:gap-0 lg:divide-x lg:divide-white/30">
            <span className="flex items-center gap-3.5 text-white lg:pr-4">
              <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-blue-300"><Facebook className="h-4 w-4" /></a>
              <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-blue-300"><Instagram className="h-4 w-4" /></a>
              <a href={site.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="hover:text-blue-300"><TikTok className="h-4 w-4" /></a>
              <a href={site.social.youtube} target="_blank" rel="noopener" aria-label="YouTube" className="hover:text-blue-300"><YouTube className="h-4 w-4" /></a>
            </span>
            <span className="eyebrow hidden whitespace-nowrap text-blue-300 lg:inline lg:pl-4">{site.tagline}™</span>
          </div>
        </div>
      </div>

      {/* Main bar — logo plate · brand block · mini trust icons · nav · CTA + phone */}
      <div className={`relative bg-white transition-shadow duration-500 ${scrolled ? "shadow-[0_8px_30px_-12px_rgb(13_31_53/0.35)]" : "shadow-[0_1px_0_#dbe3ee]"}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:gap-4 lg:py-2.5 xl:px-8">
          <Link href="/" className="relative flex shrink-0 items-center" aria-label={`${site.name} home`}>
            {/* Shield logo on a transparent background, inside the white bar (client 2026-09-20: no white plate / overhang) */}
            <span className={`relative block h-[68px] w-[72px] transition-all duration-500 sm:h-[84px] sm:w-[90px] ${scrolled ? "lg:h-16 lg:w-[70px]" : "lg:h-[92px] lg:w-[100px]"}`}><Image src="/images/logo.webp" alt={`${site.name} logo`} fill sizes="100px" className="object-contain" priority /></span>
          </Link>

          {/* Brand block */}
          <div className="hidden min-w-0 min-[440px]:block lg:border-r lg:border-line lg:pr-4">
            <p className="display-md whitespace-nowrap text-[17px] leading-[1.05] text-navy sm:text-[21px] xl:text-[22px]">{brand.l1}<br /><span className="text-blue">{brand.l2}</span></p>
            <p className="display-md mt-1 whitespace-nowrap text-[9px] tracking-[0.08em] text-navy sm:text-[10.5px]">{brand.sub}</p>
          </div>

          {/* Mini trust icons */}
          <ul className="hidden items-center gap-3 md:flex lg:hidden hd:flex hd:gap-4 hd:border-r hd:border-line hd:pr-4">
            {TRUST.map(({ icon: Icon, label }, i) => (
              <li key={i} className="flex flex-col items-center gap-1 text-center">
                <Icon className="h-7 w-7 text-navy" />
                <span className="display-md whitespace-nowrap text-[9.5px] leading-[1.15] tracking-[0.04em] text-navy">{label}</span>
              </li>
            ))}
          </ul>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
            {NAV.map((n) =>
              n.mega ? (
                <div key={n.href} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <Link href={n.href} className={`display-md inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-[15px] tracking-[0.03em] hover:text-blue xl:px-2.5 xl:text-[16px] ${path?.startsWith("/services") || mega ? "text-blue" : "text-navy"}`} aria-expanded={mega}>
                    {n.label} <Chevron className="h-4 w-4 opacity-70" />
                  </Link>
                  {mega && <MegaMenu />}
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={`display-md whitespace-nowrap rounded-md px-2 py-2 text-[15px] tracking-[0.03em] hover:text-blue xl:px-2.5 xl:text-[16px] ${path === n.href ? "text-blue" : "text-navy"}`}>
                  {n.label}
                </Link>
              )
            )}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0 lg:flex-col lg:items-center lg:gap-1.5 lg:border-l lg:border-line lg:pl-4 xl:pl-5">
            <Link href="/get-a-quote/" className="btn-orange display-md whitespace-nowrap rounded-lg px-3.5 py-2.5 text-[15px] tracking-[0.04em] sm:px-5 sm:py-3 sm:text-[17px] lg:px-6 lg:text-[19px]">
              Get a Quote <Arrow className="h-4 w-4" />
            </Link>
            <PhoneLink location="header" className="hidden items-center gap-1.5 whitespace-nowrap text-navy lg:inline-flex">
              <Phone className="h-5 w-5" />
              <span className="font-display text-[21px] font-bold tracking-wide">{site.phone}</span>
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
              <Link href="/get-a-quote/" className="btn-orange py-3 text-sm">Get a Quote</Link>
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
