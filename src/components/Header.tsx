"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { categories, childrenOf, situations } from "@/data/services";
import { Arrow, Chevron, Clock, Facebook, Instagram, Menu, Phone, Pin, Shield, TikTok, VehicleIcon, X, YouTube } from "./Icons";
import { PhoneLink } from "./PhoneLink";

const NAV = [
  { href: "/services/", label: "Services", mega: true },
  { href: "/how-it-works/", label: "How It Works" },
  { href: "/about-us/", label: "About Us" },
  { href: "/testimonials/", label: "Reviews" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

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
      {/* Top info bar */}
      <div className="hidden bg-navy-900 text-[13px] text-white/80 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2">
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-1.5 whitespace-nowrap xl:inline-flex"><Pin className="h-4 w-4 text-blue" />{site.address.full}</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><Shield className="h-4 w-4 text-blue" />USDOT {site.usdot} <span className="text-white/30">|</span> MC {site.mc} <span className="text-white/30">|</span> Licensed &amp; Bonded Broker</span>
          </div>
          <div className="flex items-center gap-5 pl-6">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><Clock className="h-4 w-4 text-blue" />{site.hours}</span>
            <span className="flex items-center gap-3 text-white/70">
              <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-blue"><Facebook className="h-4 w-4" /></a>
              <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-blue"><Instagram className="h-4 w-4" /></a>
              <a href={site.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="hover:text-blue"><TikTok className="h-4 w-4" /></a>
              <a href={site.social.youtube} target="_blank" rel="noopener" aria-label="YouTube" className="hover:text-blue"><YouTube className="h-4 w-4" /></a>
            </span>
            <span className="eyebrow hidden whitespace-nowrap text-blue-300 2xl:inline">{site.tagline}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`relative bg-white transition-shadow duration-500 ${scrolled ? "shadow-[0_8px_30px_-12px_rgb(13_31_53/0.35)]" : "shadow-[0_1px_0_#dbe3ee]"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 sm:px-8 lg:py-2.5">
          <Link href="/" className="relative flex shrink-0 items-center" aria-label={`${site.name} home`}>
            {/* Shield plate: overhangs the hero on desktop, like the reference */}
            <span className={`logo-plate relative block bg-white px-3 pb-2 pt-1 lg:absolute lg:-top-2.5 lg:left-0 lg:z-[60] lg:rounded-b-[28px] lg:px-5 lg:pb-4 lg:pt-3 lg:shadow-[0_18px_40px_-16px_rgb(13_31_53/0.55)] ${scrolled ? "lg:!rounded-b-2xl lg:!pb-2 lg:!pt-2" : ""}`}>
              <span className={`relative block h-12 w-[78px] transition-all duration-500 sm:h-14 sm:w-[92px] ${scrolled ? "lg:h-12 lg:w-[84px]" : "lg:h-[92px] lg:w-[150px]"}`}><Image src="/images/logo.webp" alt={`${site.name} logo`} fill sizes="150px" className="object-contain" priority /></span>
            </span>
            <span className="hidden lg:block lg:w-[190px]" aria-hidden="true" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((n) =>
              n.mega ? (
                <div key={n.href} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <Link href={n.href} className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[15px] font-semibold hover:text-blue ${path?.startsWith("/services") || mega ? "text-blue" : "text-navy"}`} aria-expanded={mega}>
                    {n.label} <Chevron className="h-4 w-4 opacity-70" />
                  </Link>
                  {mega && <MegaMenu />}
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={`whitespace-nowrap rounded-md px-2.5 py-2 text-[15px] font-semibold hover:text-blue ${path === n.href ? "text-blue underline decoration-blue decoration-2 underline-offset-8" : "text-navy"}`}>
                  {n.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <PhoneLink location="header" className="hidden items-center gap-2 whitespace-nowrap text-navy md:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-blue"><Phone className="h-5 w-5" /></span>
              <span className="leading-tight">
                <span className="block font-display text-[22px] font-bold tracking-wide">{site.phone}</span>
                <span className="hidden text-[11px] text-muted xl:block">Talk to a transport specialist</span>
              </span>
            </PhoneLink>
            <Link href="/get-a-quote/" className="btn-orange display-md whitespace-nowrap px-4 py-2.5 text-[15px] tracking-wide sm:px-6 sm:py-3 sm:text-lg">
              Get a Quote <Arrow className="h-4 w-4" />
            </Link>
            <button className="grid h-11 w-11 place-items-center rounded-lg text-navy lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
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
