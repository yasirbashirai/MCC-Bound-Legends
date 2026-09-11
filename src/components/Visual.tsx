import Image from "next/image";
import Link from "next/link";
import { categories, type ServicePage } from "@/data/services";
import { site } from "@/data/site";
import { categoryPhoto, photo } from "@/lib/images";
import { Arrow, Check, VehicleIcon } from "./Icons";
import { Counter } from "./Counter";
import { UsaMap } from "./UsaMap";

/* ── Image category cards (photo when available, illustrated fallback otherwise) ── */
export function CategoryPhotoGrid({ exclude }: { exclude?: string }) {
  const list = categories.filter((c) => c.slug !== exclude);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((c, i) => {
        const img = categoryPhoto(c.slug);
        const big = i === 0 && !exclude;
        return (
          <Link key={c.slug} href={`/${c.slug}/`} className={`img-card reveal-scale group block min-h-[250px] ${big ? "sm:col-span-2 sm:row-span-2 min-h-[360px] lg:min-h-full" : ""}`} style={{ ["--d" as string]: `${i * 60}ms` }}>
            {img ? (
              <Image src={img} alt={`${c.name}: ${c.short}`} fill sizes={big ? "(max-width:1024px) 100vw, 50vw" : "(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"} className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_80%_0%,rgba(14,165,233,.35),transparent_60%),linear-gradient(160deg,#17385f,#0d1f35)]">
                <VehicleIcon name={c.icon} className="absolute -right-6 -top-4 h-40 w-64 text-blue/15 transition duration-700 group-hover:scale-110 group-hover:text-blue/25" />
              </div>
            )}
            <div className="relative z-[2] flex h-full flex-col justify-end p-6">
              <span className="mb-3 grid h-12 w-16 place-items-center rounded-lg bg-white/10 text-blue-300 backdrop-blur transition group-hover:bg-blue group-hover:text-white" style={{ ["--icon-bg" as string]: "#0d1f35" }}><VehicleIcon name={c.icon} className="h-8 w-12" /></span>
              <span className={`display text-white ${big ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{c.name}</span>
              <span className="mt-1.5 text-sm text-white/70">{c.short}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 transition group-hover:gap-3 group-hover:text-white">Explore {c.name.split(" ")[0].toLowerCase()} transport <Arrow className="h-4 w-4" /></span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/* ── Facts strip: only REAL numbers ───────────────────────────────────── */
export function FactsStrip() {
  const facts = [
    { v: <Counter to={50} />, l: "States covered", s: "Nationwide coordination" },
    { v: <Counter to={7} />, l: "Transport categories", s: "Cars to heavy machinery" },
    { v: <Counter to={0} prefix="$" />, l: "Deposit to book", s: "Pay when carrier assigned" },
    { v: <>Mon–Sat</>, l: "8 AM–6 PM ET", s: "A real coordinator answers" },
  ];
  return (
    <div className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
      {facts.map((f, i) => (
        <div key={f.l} className="reveal-up px-4 py-6 text-center lg:px-8" style={{ ["--d" as string]: `${i * 80}ms` }}>
          <div className="display text-5xl text-white sm:text-6xl">{f.v}</div>
          <div className="mt-1 text-sm font-semibold text-blue-300">{f.l}</div>
          <div className="text-xs text-white/50">{f.s}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Split photo band: image one side, content the other ─────────────── */
export function PhotoSplit({ img, alt, side = "left", children, eyebrow, title }: { img: string | null; alt: string; side?: "left" | "right"; children: React.ReactNode; eyebrow: string; title: React.ReactNode }) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 ${side === "right" ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className={`${side === "left" ? "reveal-left" : "reveal-right"} relative`}>
        <div className="img-card aspect-[16/11] shadow-[var(--shadow-lift)]">
          {img ? <Image src={img} alt={alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /> : <div className="hero-bg absolute inset-0" />}
        </div>
        <div className="floaty absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-4 shadow-[var(--shadow-lift)] sm:block lg:-right-8">
          <p className="eyebrow text-blue">Licensed &amp; bonded</p>
          <p className="display-md mt-1 text-xl text-navy">USDOT {site.usdot} · MC {site.mc}</p>
        </div>
      </div>
      <div className={side === "left" ? "reveal-right" : "reveal-left"}>
        <p className="eyebrow mb-3 text-blue">{eyebrow}</p>
        <h2 className="display text-4xl text-navy sm:text-5xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

/* ── Equipment matching, as a vertical "vehicle → trailer" list ──────── */
const MATCH = [
  { v: "Standard sedan", e: "Open auto carrier", icon: "car" as const },
  { v: "High-roof box truck", e: "Step deck or lowboy", icon: "boxtruck" as const },
  { v: "Boat without a trailer", e: "Hydraulic marine trailer + lift", icon: "boatlift" as const },
  { v: "Class A motorhome", e: "Professional drive-away", icon: "rv" as const },
  { v: "40-ton excavator", e: "RGN + permits + escorts", icon: "excavator" as const },
];
export function MatchList() {
  return (
    <ul className="space-y-2.5">
      {MATCH.map((m, i) => (
        <li key={m.v} className="reveal-right group flex items-center gap-4 rounded-xl border border-line bg-white p-3.5 transition hover:border-blue/50 hover:shadow-[var(--shadow-card)]" style={{ ["--d" as string]: `${i * 70}ms` }}>
          <span className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-navy text-blue-400" style={{ ["--icon-bg" as string]: "#0d1f35" }}><VehicleIcon name={m.icon} className="h-8 w-12" /></span>
          <span className="min-w-0 flex-1 text-[15px] font-semibold text-navy">{m.v}</span>
          <Arrow className="h-5 w-5 shrink-0 text-orange transition group-hover:translate-x-1" />
          <span className="w-[42%] text-[14px] font-medium text-slate">{m.e}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Coverage with Florida photo backdrop ─────────────────────────────── */
export function CoverageBand() {
  const bg = photo("section-florida");
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white">
      {bg && <Image src={bg} alt="" fill sizes="100vw" className="object-cover opacity-30" aria-hidden="true" />}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.97)_0%,rgba(13,31,53,.85)_50%,rgba(13,31,53,.6)_100%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="reveal-left">
          <p className="eyebrow mb-3 text-blue-300">Nationwide first, Florida rooted</p>
          <h2 className="display text-5xl sm:text-6xl">Coast to coast.<br /><span className="text-blue-400">Every state.</span></h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75">MCC Bound Legends coordinates transport throughout the United States. Our home base in Altamonte Springs sits in one of the busiest vehicle, boat and RV markets in the country, and our carrier network reaches every state from there.</p>
          <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/85 sm:grid-cols-3">
            {site.nationalMarkets.map((m) => <li key={m} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-400" />{m}</li>)}
          </ul>
          <p className="mt-6 text-sm text-white/55">Florida daily: {site.floridaMarkets.join(" · ")}.</p>
        </div>
        <div className="reveal-scale text-white"><UsaMap className="w-full drop-shadow-[0_0_30px_rgba(14,165,233,.25)]" /></div>
      </div>
    </section>
  );
}

/* ── Timeline (how it works) with animated progress line ─────────────── */
const STEPS = [
  { t: "Tell us what is moving", d: "Quote form or a call. Vehicle, ZIPs, dates, dimensions if oversized. No deposit to book." },
  { t: "We plan and match a vetted carrier", d: "Specs, route, permits and loading evaluated. Carrier authority and insurance verified before dispatch." },
  { t: "Pickup, updates, delivery", d: "Condition report at pickup, updates in transit, inspection at delivery. One coordinator the entire way." },
];
export function Timeline() {
  return (
    <div className="reveal relative">
      <div className="absolute left-[8.33%] right-[8.33%] top-6 hidden h-0.5 bg-line md:block"><div className="timeline-line h-full bg-gradient-to-r from-orange via-blue to-blue" /></div>
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.t} className="relative text-center md:px-4">
            <span className="display-md relative z-[1] mx-auto grid h-12 w-12 place-items-center rounded-full bg-orange text-lg text-white shadow-[0_0_0_8px_#f8fafc,0_10px_30px_-10px_rgba(249,115,22,.8)]">{i + 1}</span>
            <h3 className="mt-6 text-xl font-bold text-navy">{s.t}</h3>
            <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Specific pages with photo thumbs when available ─────────────────── */
export function SpecificPhotoGrid({ items }: { items: ServicePage[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => {
        const img = photo(`svc-${s.slug}`) ?? (s.parent ? categoryPhoto(s.parent) : null);
        return (
          <li key={s.slug} className="reveal-up" style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
            <Link href={`/${s.slug}/`} className="card card-hover group flex h-full items-stretch overflow-hidden">
              <span className="relative w-28 shrink-0 overflow-hidden bg-navy">
                {img ? <Image src={img} alt="" fill sizes="112px" className="object-cover transition duration-700 group-hover:scale-110" /> : null}
                <span className="absolute inset-0 grid place-items-center bg-navy/40 text-blue-300" style={{ ["--icon-bg" as string]: "#0d1f35" }}><VehicleIcon name={s.icon} className="h-9 w-14 drop-shadow" /></span>
              </span>
              <span className="flex min-w-0 flex-1 flex-col justify-center p-4">
                <span className="font-semibold text-navy">{s.name}</span>
                <span className="mt-0.5 text-[13px] text-muted">{s.short}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue transition group-hover:gap-2">View page <Arrow className="h-3.5 w-3.5" /></span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
