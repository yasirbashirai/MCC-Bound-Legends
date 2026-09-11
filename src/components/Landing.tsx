import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { categories, type IconKey } from "@/data/services";
import { photo } from "@/lib/images";
import { HeroSlideshow } from "./HeroSlideshow";
import { QuoteForm } from "./QuoteForm";
import { PhoneLink } from "./PhoneLink";
import { Words } from "./Words";
import { Counter } from "./Counter";
import { Arrow, Bolt, Chat, Doc, Phone, Route, Ruler, Shield, Star, Users, VehicleIcon, Clock } from "./Icons";
import type { ShipType } from "@/data/services";

/* ── Reference-style hero: photo visible, white form, badge column ───── */
type HeroProps = {
  slides: { src: string; alt: string }[];
  eyebrow: string;
  lines: string[];              // headline lines
  accentLine?: number;          // index of line rendered in blue
  sub: string;
  formDefault?: ShipType;
  serviceName?: string;
  formTitle?: string;
  crumbs?: React.ReactNode;
  tagline?: [string, string];   // right column tagline
  fallbackIcon?: IconKey;       // shown when there is no photo yet
};

const BADGES = [
  { icon: Clock, t: "Fast", s: "Response times" },
  { icon: Route, t: "Nationwide", s: "Coverage, all 50 states" },
  { icon: Shield, t: "Verified", s: "Carrier insurance" },
  { icon: Ruler, t: "Right trailer", s: "Matched to real specs" },
];
const TRUST = [
  { icon: Shield, t: "Licensed & Bonded", s: "Freight Broker" },
  { icon: Users, t: "Vetted Carriers", s: "Nationwide" },
  { icon: Doc, t: "Carrier Insurance", s: "Verified Before Dispatch" },
  { icon: Star, t: "5-Star Rated", s: "on Google & Trustpilot" },
];

export function LandingHero({ slides, eyebrow, lines, accentLine, sub, formDefault = "car", serviceName, formTitle, crumbs, tagline = ["Moving America Forward", "One shipment at a time."], fallbackIcon }: HeroProps) {
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      {slides.length > 0 ? <HeroSlideshow slides={slides} light /> : (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="road-grid absolute inset-0" />
          {fallbackIcon && <VehicleIcon name={fallbackIcon} className="absolute right-[-4%] top-[8%] h-[70%] w-[55%] text-blue/10" />}
        </div>
      )}
      <div className="relative z-[2] mx-auto grid max-w-7xl items-start gap-8 px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-[1.05fr_400px] lg:pb-12 lg:pt-12 xl:grid-cols-[1fr_400px_170px]">
        {/* Left: message */}
        <div className="lg:pt-24">
          {crumbs}
          <p className="display-md text-lg tracking-wide text-blue-400 drop-shadow sm:text-xl">{eyebrow}</p>
          <h1 className="display mt-2 text-[46px] leading-[0.92] drop-shadow-[0_6px_28px_rgba(0,0,0,.55)] sm:text-6xl lg:text-[68px] xl:text-[74px]">
            {lines.map((l, i) => (
              <span key={i} className={`block ${i === accentLine ? "text-blue-400" : ""}`}><Words text={l} start={i * 160} step={55} /></span>
            ))}
          </h1>
          <p className="reveal-up mt-5 max-w-xl text-lg font-medium leading-snug text-white drop-shadow sm:text-[21px]" style={{ ["--d" as string]: "600ms" }}>{sub}</p>
          <div className="reveal-up mt-6 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "720ms" }}>
            <a href="#quote" className="btn-orange display-md px-7 py-4 text-xl tracking-wide">Get a Free Quote <Arrow className="h-5 w-5" /></a>
            <PhoneLink location="hero" className="btn-ghost display-md border-white/70 bg-navy/40 px-7 py-4 text-xl tracking-wide backdrop-blur"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
          </div>
          <ul className="reveal-up mt-8 flex flex-wrap gap-x-7 gap-y-4" style={{ ["--d" as string]: "860ms" }}>
            {TRUST.map((b) => (
              <li key={b.t} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue text-white shadow-[0_6px_18px_-6px_rgba(14,165,233,.9)]"><b.icon className="h-5 w-5" /></span>
                <span className="leading-tight"><span className="block whitespace-nowrap text-[15px] font-bold">{b.t}</span><span className="block whitespace-nowrap text-[13px] text-white/80">{b.s}</span></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle: white quote card */}
        <div className="reveal-right lg:pt-4" style={{ ["--d" as string]: "250ms" }}>
          <QuoteForm variant="white" minimal defaultType={formDefault} serviceName={serviceName} title={formTitle ?? "Get Your Transport Quote"} />
        </div>

        {/* Right: badge column (xl only) */}
        <aside className="reveal-right hidden xl:flex xl:flex-col xl:gap-5 xl:pt-8" style={{ ["--d" as string]: "450ms" }}>
          {BADGES.map((b) => (
            <div key={b.t} className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-blue/50 bg-navy/60 text-blue-400 backdrop-blur"><b.icon className="h-6 w-6" /></span>
              <span className="leading-tight"><span className="display-md block text-[15px] tracking-wide">{b.t}</span><span className="block text-[11px] text-white/75">{b.s}</span></span>
            </div>
          ))}
          <div className="mt-2 border-t-2 border-blue pt-4">
            <p className="display-md text-[17px] leading-tight tracking-wide text-blue-400">{tagline[0]}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/85">{tagline[1]}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ── Row of photo cards with white caption strip (reference style) ────── */
export type TypeCard = { href: string; title: string; sub: string; img: string | null; icon: IconKey };

export function PhotoCardRow({ cards, cols = 7 }: { cards: TypeCard[]; cols?: 6 | 7 }) {
  const colCls = cols === 7 ? "xl:grid-cols-7" : "xl:grid-cols-6";
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 ${colCls}`}>
      {cards.map((c, i) => (
        <li key={c.href + c.title} className="reveal-up flex" style={{ ["--d" as string]: `${i * 50}ms` }}>
          <Link href={c.href} className="group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-[var(--shadow-card)] ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-blue/60">
            <span className="relative block aspect-[16/9] overflow-hidden bg-navy">
              {c.img ? (
                <Image src={c.img} alt={c.title} fill sizes="(max-width:640px) 50vw, (max-width:1280px) 25vw, 15vw" className="object-cover transition duration-700 group-hover:scale-110" />
              ) : (
                <span className="absolute inset-0 grid place-items-center bg-[radial-gradient(300px_140px_at_70%_0%,rgba(14,165,233,.4),transparent_60%),linear-gradient(160deg,#17385f,#0d1f35)] text-blue-400" style={{ ["--icon-bg" as string]: "#0d1f35" }}>
                  <VehicleIcon name={c.icon} className="h-14 w-24 transition duration-500 group-hover:scale-110" />
                </span>
              )}
            </span>
            <span className="flex flex-1 items-center gap-2 px-3 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="display-md block text-[14px] leading-[1.05] text-navy">{c.title}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-slate">{c.sub}</span>
              </span>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue text-white transition group-hover:bg-orange"><Arrow className="h-3 w-3" /></span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const categoryCards = (exclude?: string): TypeCard[] =>
  categories.filter((c) => c.slug !== exclude).map((c) => ({ href: `/${c.slug}/`, title: c.name, sub: c.short, img: photo(`thumb-${c.slug}`) ?? photo(`cat-${c.slug}`), icon: c.icon }));

/* ── Stats band: REAL numbers only ────────────────────────────────────── */
export function StatsBand() {
  const items = [
    { icon: Route, big: <><Counter to={50} /></>, l: "States covered", s: "Nationwide coordination" },
    { icon: Bolt, big: <><Counter to={7} /></>, l: "Transport categories", s: "Cars to heavy machinery" },
    { icon: Doc, big: <>$<Counter to={0} /></>, l: "Deposit to book", s: "Pay when carrier assigned" },
    { icon: Star, big: <>5-Star</>, l: "Google & Trustpilot", s: "Verified public reviews" },
  ];
  return (
    <section className="bg-navy-800 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <ul className="grid flex-1 grid-cols-2 gap-6 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {items.map((it, i) => (
            <li key={it.l} className="reveal-up flex items-center gap-4 lg:px-6 lg:first:pl-0" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <it.icon className="h-10 w-10 shrink-0 text-blue" />
              <span className="leading-tight">
                <span className="display block text-4xl text-blue-400 sm:text-[44px]">{it.big}</span>
                <span className="block whitespace-nowrap text-[15px] font-semibold">{it.l}</span>
                <span className="block text-[12px] text-white/55">{it.s}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="display-md shrink-0 border-l-0 text-xl tracking-[0.2em] text-white lg:border-l lg:border-white/10 lg:pl-8">Safe. Reliable. <span className="text-blue-400">Nationwide.</span><span className="mt-2 block h-1 w-14 bg-blue" /></p>
      </div>
    </section>
  );
}

/* ── Why band with photo backdrop and 4 icon points ───────────────────── */
export function WhyBand({ eyebrow = "Why choose MCC Bound Legends?", title = <>More than transport.<br />A partner you can trust.</>, points }: { eyebrow?: string; title?: React.ReactNode; points?: { icon: React.ComponentType<{ className?: string }>; t: string; s: string }[] }) {
  const bg = photo("section-cab");
  const pts = points ?? [
    { icon: Users, t: "Experienced network", s: "Vetted, professional carriers" },
    { icon: Route, t: "Multiple transport options", s: "Open, enclosed, flatbed, specialized" },
    { icon: Chat, t: "Real support", s: "A real person who knows your shipment" },
    { icon: Shield, t: "Focused on safety", s: "Planning, permits, carrier verification" },
  ];
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {bg && <Image src={bg} alt="" fill sizes="100vw" className="object-cover opacity-40" aria-hidden="true" />}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.97)_0%,rgba(13,31,53,.9)_40%,rgba(13,31,53,.6)_100%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(240px,0.9fr)_2.4fr_auto]">
        <div className="reveal-left">
          <p className="display-md text-lg tracking-wide text-blue-400">{eyebrow}</p>
          <h2 className="display mt-1 text-4xl sm:text-[40px]">{title}</h2>
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {pts.map((p, i) => (
            <li key={p.t} className="reveal-up flex items-start gap-3" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-blue/70 bg-navy/60 text-blue-400"><p.icon className="h-6 w-6" /></span>
              <span className="leading-snug"><span className="display-md block text-[15px] tracking-wide">{p.t}</span><span className="block text-[13px] text-white/80">{p.s}</span></span>
            </li>
          ))}
        </ul>
        <Link href="/get-a-quote/" className="btn-orange display-md reveal-right px-7 py-4 text-xl tracking-wide">Get a Quote <Arrow className="h-5 w-5" /></Link>
      </div>
    </section>
  );
}
