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
import { Arrow, Bolt, Chat, Doc, Phone, Route, Shield, Star, Users, VehicleIcon } from "./Icons";
import type { ShipType } from "@/data/services";

/* ── Hero — client revision brief §4–6 (2026-10-07) + round 2026-10-17 ──
   ONE shell for the homepage AND every service landing page, so all heroes share
   the exact same height, width, grid, paddings and type sizes (client: "use the
   homepage hero as the standard"). LEFT = eyebrow, H1, supporting copy, two buttons,
   lifted ~90px on desktop (client 2026-10-17). RIGHT = quote form pinned to the right
   edge. No badge column / tagline. Stacks on mobile: copy first, then the form. */
type ShellProps = { slides: { src: string; alt: string }[]; fallbackIcon?: IconKey; form: React.ReactNode; children: React.ReactNode };

function HeroShell({ slides, fallbackIcon, form, children }: ShellProps) {
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      {slides.length > 0 ? <HeroSlideshow slides={slides} light /> : (
        <div className="absolute inset-0 [--icon-bg:#0d1f35]" aria-hidden="true">
          <div className="road-grid absolute inset-0" />
          {fallbackIcon && <VehicleIcon name={fallbackIcon} className="absolute right-[-4%] top-[8%] h-[70%] w-[55%] text-blue/10" />}
        </div>
      )}
      <div className="wrap relative z-[2] grid items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12 lg:py-14 xl:grid-cols-[minmax(0,1fr)_440px] hd:grid-cols-[minmax(0,1fr)_460px] hd:py-16">
        <div className="max-w-[720px] lg:-translate-y-[90px]">{children}</div>
        <div className="reveal-right w-full lg:justify-self-end" style={{ ["--d" as string]: "250ms" }}>{form}</div>
      </div>
    </section>
  );
}

const HeroEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-blue-300 drop-shadow sm:text-[14px]">{children}</p>
);
const H1_CLS = "display mt-3 text-[38px] leading-[0.98] drop-shadow-[0_6px_28px_rgba(0,0,0,.55)] sm:text-[48px] xl:text-[54px] hd:text-[56px]";
const HeroButtons = () => (
  <div className="reveal-up mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" style={{ ["--d" as string]: "680ms" }}>
    <a href="#quote" className="btn-orange h-[50px] whitespace-nowrap px-7 text-[16px] font-bold uppercase tracking-[0.04em] lg:self-start xl:self-auto">Get My Free Quote <Arrow className="h-5 w-5" /></a>
    <PhoneLink location="hero" className="btn-ghost h-[50px] whitespace-nowrap border-white/80 bg-navy/40 px-7 text-[16px] font-bold uppercase tracking-[0.04em] backdrop-blur lg:self-start xl:self-auto"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
  </div>
);

/* Service landing pages: same shell + type as the homepage hero. */
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
  fallbackIcon?: IconKey;       // shown when there is no photo yet
};

export function LandingHero({ slides, eyebrow, lines, accentLine, sub, formDefault = "car", serviceName, formTitle, crumbs, fallbackIcon }: HeroProps) {
  return (
    <HeroShell slides={slides} fallbackIcon={fallbackIcon}
      form={<QuoteForm variant="white" minimal defaultType={formDefault} serviceName={serviceName} title={formTitle ?? "Get Your Transport Quote"} />}>
      {crumbs}
      <HeroEyebrow>{eyebrow}</HeroEyebrow>
      <h1 className={H1_CLS}>
        {lines.map((l, i) => (
          <span key={i} className={`block ${i === accentLine ? "text-blue" : ""}`}><Words text={l} start={i * 160} step={55} /></span>
        ))}
      </h1>
      <p className="reveal-up mt-5 max-w-[640px] text-[17px] font-medium leading-[1.6] text-white drop-shadow sm:text-[18px]" style={{ ["--d" as string]: "450ms" }}>{sub}</p>
      <HeroButtons />
    </HeroShell>
  );
}

/* Homepage hero. "Equipment Transport" in the nav-active blue (client 2026-10-17). */
export function HomeHero({ slides }: { slides: { src: string; alt: string }[] }) {
  return (
    <HeroShell slides={slides} form={<QuoteForm variant="white" minimal title="Get Your Transport Quote" />}>
      <HeroEyebrow>Nationwide Vehicle and Equipment Transport</HeroEyebrow>
      <h1 className={H1_CLS}>
        <span className="block"><Words text="Nationwide Car, Boat" step={55} /></span>
        <span className="block"><Words text="&" start={160} step={55} /><Words text="Equipment Transport" start={215} step={55} className="text-blue" /></span>
      </h1>
      <p className="reveal-up mt-5 max-w-[640px] text-[17px] font-medium leading-[1.6] text-white drop-shadow sm:text-[18px]" style={{ ["--d" as string]: "450ms" }}>Reliable transportation for cars, commercial vehicles, boats, RVs, motorcycles and heavy equipment across all 50 states.</p>
      <p className="reveal-up mt-3 max-w-[640px] text-[16px] leading-[1.6] text-white/85 drop-shadow sm:text-[17px]" style={{ ["--d" as string]: "560ms" }}>MCC Bound Legends coordinates your shipment with vetted carriers and equipment matched to your vehicle, dimensions and route.</p>
      <HeroButtons />
    </HeroShell>
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
            <span className="flex flex-1 items-start gap-2 px-3.5 py-3">
              <span className="min-w-0 flex-1">
                <span className="display-md block text-[16px] leading-[1.1] text-navy">{c.title}</span>
                <span className="mt-1 block text-[13px] leading-snug text-slate">{c.sub}</span>
              </span>
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue text-white transition group-hover:bg-orange"><Arrow className="h-3.5 w-3.5" /></span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const categoryCards = (exclude?: string): TypeCard[] =>
  categories.filter((c) => c.slug !== exclude).map((c) => ({ href: `/${c.slug}/`, title: c.name, sub: c.short, img: photo(`thumb-${c.slug}`) ?? photo(`cat-${c.slug}`), icon: c.icon }));

/** Homepage service cards: exact titles + descriptions from the client revision brief §7 (2026-10-07). */
const HOME_CARD_COPY: Record<string, [string, string]> = {
  "auto-transport": ["Auto Transport", "Cars, SUVs, pickups, classics and luxury vehicles"],
  "commercial-vehicle-transport": ["Commercial Vehicle Transport", "Box trucks, work trucks, vans, buses and fleets"],
  "boat-transport-florida": ["Boat & Yacht Transport", "Center consoles, yachts, pontoons, sailboats and PWC"],
  "rv-transport": ["RV & Motorhome Transport", "Class A, B and C motorhomes, travel trailers and RVs"],
  "motorcycle-transport": ["Motorcycle & Powersports", "Motorcycles, ATVs, UTVs and side-by-sides"],
  "construction-equipment-transport": ["Construction Equipment", "Excavators, skid steers, bulldozers and forklifts"],
  "heavy-equipment-transport": ["Heavy Equipment", "Oversized and specialized machinery"],
};
export const homeCategoryCards = (): TypeCard[] =>
  categoryCards().map((c) => {
    const copy = HOME_CARD_COPY[c.href.slice(1, -1)];
    return copy ? { ...c, title: copy[0], sub: copy[1] } : c;
  });

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
      <div className="wrap flex min-h-[104px] flex-col justify-center gap-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:py-4">
        <ul className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {items.map((it, i) => (
            <li key={it.l} className="reveal-up flex items-center gap-3.5 lg:justify-center lg:px-4 lg:first:justify-start lg:first:pl-0 xl:px-6" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <it.icon className="h-9 w-9 shrink-0 text-blue" />
              <span className="leading-tight">
                <span className="display block text-[30px] leading-none text-blue-400 sm:text-[34px]">{it.big}</span>
                <span className="mt-1 block text-[14px] font-semibold sm:text-[15px] lg:whitespace-nowrap">{it.l}</span>
                <span className="block text-[13px] text-white/65 lg:whitespace-nowrap">{it.s}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="display-md shrink-0 text-[20px] tracking-[0.16em] text-white lg:border-l lg:border-white/10 lg:pl-8">Safe. Reliable. <span className="text-blue-400">Nationwide.</span><span className="mt-2 block h-1 w-14 bg-blue" /></p>
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
      <div className="wrap relative py-14 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal-left">
            <p className="font-display text-[14px] font-bold uppercase tracking-[0.16em] text-blue-400">{eyebrow}</p>
            <h2 className="display mt-2 text-[34px] leading-[1] sm:text-[40px]">{title}</h2>
          </div>
          <Link href="/get-a-quote/" className="btn-orange reveal-right h-[50px] shrink-0 self-start px-7 text-[16px] font-bold uppercase tracking-[0.04em] lg:self-auto">Get a Free Quote <Arrow className="h-5 w-5" /></Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">
          {pts.map((p, i) => (
            <li key={p.t} className="reveal-up flex items-start gap-4 border-t border-white/15 pt-6" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-blue/70 bg-navy/60 text-blue-400"><p.icon className="h-6 w-6" /></span>
              <span className="leading-snug"><span className="block text-[16px] font-bold">{p.t}</span><span className="mt-1 block text-[14px] leading-relaxed text-white/80">{p.s}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
