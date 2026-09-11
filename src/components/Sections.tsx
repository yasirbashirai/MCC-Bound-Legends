import Link from "next/link";
import { site } from "@/data/site";
import { categories, pages, type ServicePage } from "@/data/services";
import { featuredReviews, type Review } from "@/data/reviews";
import type { FAQ } from "@/data/services";
import { Arrow, Chat, Check, Chevron, Doc, Phone, Route, Ruler, Shield, Star, Users, VehicleIcon } from "./Icons";
import { PhoneLink } from "./PhoneLink";
import { Container } from "./Container";
import { UsaMap } from "./UsaMap";
import Image from "next/image";
import { photo } from "@/lib/images";

/* ── Section heading ─────────────────────────────────────────────────── */
export function SectionHead({ eyebrow, title, sub, light = false, align = "center" }: { eyebrow: string; title: React.ReactNode; sub?: string; light?: boolean; align?: "center" | "left" }) {
  return (
    <div className={`reveal mb-10 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className={`eyebrow mb-3 ${light ? "text-blue-300" : "text-blue"}`}>{eyebrow}</p>
      <h2 className={`display text-4xl sm:text-5xl ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-slate"}`}>{sub}</p>}
    </div>
  );
}

/* ── Trust strip: accurate brokerage trust points ────────────────────── */
export function TrustStrip({ dark = false, cols = 4 }: { dark?: boolean; cols?: 2 | 4 }) {
  return (
    <ul className={`grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : ""} ${dark ? "text-white" : "text-navy"}`}>
      {site.trust.map((t) => (
        <li key={t.label} className="flex items-start gap-3">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${dark ? "bg-blue/20 text-blue-300" : "bg-blue-100 text-blue"}`}><Shield className="h-5 w-5" /></span>
          <span><span className="block text-[15px] font-semibold leading-tight">{t.label}</span><span className={`block text-xs ${dark ? "text-white/55" : "text-muted"}`}>{t.sub}</span></span>
        </li>
      ))}
    </ul>
  );
}

/* ── "What are you shipping?" category grid ──────────────────────────── */
export function CategoryGrid({ title = "What are you shipping?", exclude }: { title?: string; exclude?: string }) {
  const list = categories.filter((c) => c.slug !== exclude);
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7" role="list" aria-label={title}>
      {list.map((c, i) => (
        <Link key={c.slug} href={`/${c.slug}/`} role="listitem" className="card card-hover reveal group flex flex-col items-center px-3 py-6 text-center" style={{ transitionDelay: `${i * 50}ms` }}>
          <span className="grid h-16 w-24 place-items-center rounded-xl bg-navy text-blue-400 transition group-hover:bg-blue group-hover:text-white" style={{ ["--icon-bg" as string]: "#0d1f35" }}>
            <VehicleIcon name={c.icon} className="h-11 w-[68px]" />
          </span>
          <span className="display-md mt-4 text-[15px] leading-tight text-navy">{c.name}</span>
          <span className="mt-1.5 text-[12px] leading-snug text-muted">{c.short}</span>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-bold text-blue transition group-hover:gap-2">Learn more <Arrow className="h-3.5 w-3.5" /></span>
        </Link>
      ))}
    </div>
  );
}

/* ── Specific vehicles: "What exactly is it?" ─────────────────────────── */
export function SpecificGrid({ items, heading }: { items: ServicePage[]; heading?: string }) {
  return (
    <div>
      {heading && <p className="eyebrow mb-4 text-muted">{heading}</p>}
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <li key={s.slug}>
            <Link href={`/${s.slug}/`} className="card card-hover reveal group flex items-center gap-4 p-4">
              <span className="grid h-14 w-20 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue transition group-hover:bg-navy group-hover:text-blue-400" style={{ ["--icon-bg" as string]: "#e0f2fe" }}>
                <VehicleIcon name={s.icon} className="h-9 w-14" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-navy">{s.name}</span>
                <span className="block truncate text-[13px] text-muted">{s.short}</span>
              </span>
              <Arrow className="h-5 w-5 shrink-0 text-blue transition group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Why MCC: brand competes on trust, expertise, communication, versatility, planning ── */
const WHY = [
  { icon: Ruler, title: "We match equipment to the real specs", text: "Height, weight, running condition, ground clearance and loading needs are checked before a carrier is chosen. The right trailer shows up the first time." },
  { icon: Shield, title: "Licensed, bonded, carriers verified", text: "MCC Bound Legends is a licensed and bonded freight broker. Every carrier's authority and insurance is verified before dispatch." },
  { icon: Chat, title: "One coordinator, start to finish", text: "You talk to a person who knows your shipment, not a call-center queue. Updates by phone, text or email from pickup to delivery." },
  { icon: Route, title: "Everything that moves on wheels, tracks or water", text: "Cars and box trucks, boats without trailers, motorhomes, excavators and oversized machinery. One company for all of it." },
  { icon: Doc, title: "Permits, lifts and paperwork handled", text: "Oversize permits, escorts, marina lifts and auction releases are arranged as part of the plan, not left for you to figure out." },
  { icon: Users, title: "Built for individuals and businesses", text: "Private owners, dealers, fleet managers, contractors, marinas and auction buyers get the same direct, knowledgeable service." },
];
export function WhyUs() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {WHY.map((w, i) => (
        <div key={w.title} className="card reveal p-6" style={{ transitionDelay: `${i * 60}ms` }}>
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-blue-400"><w.icon className="h-6 w-6" /></span>
          <h3 className="mt-4 text-lg font-bold leading-snug text-navy">{w.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate">{w.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Different vehicles, different equipment (the client's core differentiator) ── */
const MATCH = [
  { v: "Standard sedan", e: "Open auto carrier", icon: "car" as const },
  { v: "High-roof box truck", e: "Step deck or lowboy", icon: "boxtruck" as const },
  { v: "Boat without a trailer", e: "Hydraulic marine trailer + lift", icon: "boatlift" as const },
  { v: "Class A motorhome", e: "Professional drive-away", icon: "rv" as const },
  { v: "40-ton excavator", e: "RGN + permits + escorts", icon: "excavator" as const },
];
export function EquipmentMatch() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
      {MATCH.map((m, i) => (
        <div key={m.v} className="reveal rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur" style={{ transitionDelay: `${i * 70}ms` }}>
          <VehicleIcon name={m.icon} className="h-10 w-16 text-blue-400" />
          <p className="mt-4 text-[15px] font-semibold text-white">{m.v}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] text-blue-300"><Arrow className="h-3.5 w-3.5" />{m.e}</p>
        </div>
      ))}
    </div>
  );
}

/* ── How it works ─────────────────────────────────────────────────────── */
const STEPS = [
  { n: "01", t: "Tell us what is moving", d: "Use the quote form or call. Vehicle or equipment, ZIP codes, dates, dimensions if it is oversized. No deposit to book." },
  { n: "02", t: "We plan and match a vetted carrier", d: "We evaluate specs, route, permits and loading, then dispatch a carrier whose authority and insurance we have verified." },
  { n: "03", t: "Pickup, updates, delivery", d: "A condition report at pickup, updates in transit, inspection at delivery. One coordinator the entire way." },
];
export function HowItWorks({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {STEPS.map((s, i) => (
        <li key={s.n} className="card reveal relative overflow-hidden p-6" style={{ transitionDelay: `${i * 80}ms` }}>
          <span className="display absolute -right-2 -top-4 text-[96px] text-blue/10">{s.n}</span>
          <span className="display-md inline-grid h-11 w-11 place-items-center rounded-full bg-orange text-lg text-white">{i + 1}</span>
          <h3 className="mt-4 text-lg font-bold text-navy">{s.t}</h3>
          {!compact && <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.d}</p>}
        </li>
      ))}
    </ol>
  );
}

/* ── Reviews ──────────────────────────────────────────────────────────── */
export function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="card reveal flex h-full flex-col p-6">
      <div className="flex text-orange" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4.5 w-4.5" />)}</div>
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">“{r.text}”</blockquote>
      <figcaption className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span><span className="block font-semibold text-navy">{r.name}</span><span className="text-muted">{r.service}</span></span>
        <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-slate">{r.source} review</span>
      </figcaption>
    </figure>
  );
}
export function Reviews() {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{featuredReviews.map((r) => <ReviewCard key={r.name} r={r} />)}</div>
      <p className="reveal mt-8 text-center text-sm text-muted">
        Read more on{" "}
        {Object.entries(site.reviews).map(([k, v], i, a) => (
          <span key={k}><a href={v} target="_blank" rel="noopener" className="font-semibold capitalize text-blue hover:text-navy">{k === "uship" ? "uShip" : k}</a>{i < a.length - 1 ? " · " : ""}</span>
        ))}
        {" "}or <Link href="/testimonials/" className="font-semibold text-navy underline decoration-blue underline-offset-4">see all reviews</Link>.
      </p>
    </>
  );
}

/* ── FAQ accordion (native details, crawlable) ────────────────────────── */
export function FaqList({ faqs, light = false }: { faqs: FAQ[]; light?: boolean }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy hover:bg-cloud">
            {f.q}<Chevron className="chev h-5 w-5 shrink-0 text-blue transition" />
          </summary>
          <p className={`px-5 pb-5 text-[15px] leading-relaxed ${light ? "text-slate" : "text-slate"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ── Nationwide coverage block ────────────────────────────────────────── */
export function Coverage() {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="reveal">
        <p className="eyebrow mb-3 text-blue-300">Nationwide first, Florida rooted</p>
        <h2 className="display text-4xl text-white sm:text-5xl">Coast to coast.<br /><span className="text-blue-400">Every state.</span></h2>
        <p className="mt-5 text-lg leading-relaxed text-white/70">
          MCC Bound Legends coordinates transport throughout the United States. Our home base in Altamonte Springs puts us in the middle of one of the busiest vehicle, boat and RV markets in the country, and our carrier network reaches every state from there.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/80 sm:grid-cols-3">
          {site.nationalMarkets.map((m) => <li key={m} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-400" />{m}</li>)}
        </ul>
        <p className="mt-6 text-sm text-white/55">Florida markets we serve daily: {site.floridaMarkets.join(" · ")}.</p>
      </div>
      <div className="reveal text-white"><UsaMap className="w-full" /></div>
    </div>
  );
}

/* ── Who we serve ─────────────────────────────────────────────────────── */
const AUDIENCE = {
  Individuals: ["Relocating to another state", "Snowbirds", "Online and auction vehicle buyers", "Classic and specialty owners", "Boat, RV and motorcycle owners", "Equipment buyers"],
  Businesses: ["Auto and truck dealerships", "Fleet managers and rental companies", "Construction contractors", "Equipment dealers and rental yards", "Marinas, boatyards and yacht brokers", "Utility companies and relocating businesses"],
};
export function WhoWeServe() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {Object.entries(AUDIENCE).map(([k, list]) => (
        <div key={k} className="card reveal p-6">
          <h3 className="display-md text-2xl text-navy">{k}</h3>
          <ul className="mt-4 grid gap-2 text-[15px] text-slate sm:grid-cols-2">{list.map((l) => <li key={l} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-blue" />{l}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

/* ── CTA band ─────────────────────────────────────────────────────────── */
export function CtaBand({ title = "Ready to move it? Get your free quote.", sub = "No deposit to book. Carrier insurance verified before dispatch. A real coordinator on every shipment." }: { title?: string; sub?: string }) {
  const bg = photo("section-cab");
  return (
    <section className="relative overflow-hidden bg-navy">
      {bg && <Image src={bg} alt="" fill sizes="100vw" className="object-cover opacity-30" aria-hidden="true" />}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.96),rgba(13,31,53,.75))]" aria-hidden="true" />
      <div className="road-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative flex flex-col items-center gap-6 py-16 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="display text-4xl text-white sm:text-5xl">{title}</h2>
          <p className="mt-3 max-w-xl text-white/70">{sub}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/get-a-quote/" className="btn-orange px-7 py-4 text-lg">Get My Free Quote <Arrow className="h-5 w-5" /></Link>
          <PhoneLink location="cta_band" className="btn-ghost px-7 py-4 text-lg"><Phone className="h-5 w-5" /> {site.phone}</PhoneLink>
        </div>
      </Container>
    </section>
  );
}

/* ── Breadcrumbs ──────────────────────────────────────────────────────── */
export function Breadcrumbs({ items, light = false }: { items: { name: string; href: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] ${light ? "text-white/60" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? <span aria-current="page" className={light ? "text-white" : "text-navy"}>{it.name}</span> : <Link href={it.href} className="hover:underline">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── Also coordinated (future pages as crawlable text, not doorway pages) ── */
export function AlsoCoordinated({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => <li key={i} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-slate">{i}</li>)}
    </ul>
  );
}

export const allSpecific = pages.filter((p) => p.kind !== "category");
