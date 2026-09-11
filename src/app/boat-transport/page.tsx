import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { getPage } from "@/data/services";
import { reviews } from "@/data/reviews";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { photo } from "@/lib/images";
import { JsonLd } from "@/components/JsonLd";
import { PhoneLink } from "@/components/PhoneLink";
import { BoatQuoteForm } from "@/components/BoatQuoteForm";
import { UsaMap } from "@/components/UsaMap";
import { Arrow, Check, Phone, Star, Users } from "@/components/Icons";

/**
 * /boat-transport/ — Google-Ads landing page built 1:1 to the client's reference
 * mockup (snowbird boat transport to Florida). Section order, copy and layout
 * follow the mockup; header/footer come from the site layout.
 */
const P = getPage("boat-transport")!;
const PATH = "/boat-transport/";

export const metadata: Metadata = meta(
  "Boat Transport to Florida | Snowbird Boat Shipping | MCC Bound Legends",
  "Snowbird boat transport to Florida from New York, New Jersey, Michigan, Ohio, Massachusetts and all northern states. Door-to-door, fully insured, no deposit. Free boat shipping quote in 60 seconds.",
  PATH,
);

const TRUST = ["No Deposit Required", "5-Star Rated on Google & Trustpilot", "BBB Accredited", "Fully Insured", `USDOT ${site.usdot}`, "All 50 States"];

const TYPES = [
  ["Center Consoles", "type-center-console"], ["Sailboats", "type-sailboat"], ["Yachts and Mega Yachts", "type-yacht"], ["Pontoon Boats", "type-pontoon"],
  ["Fishing Boats", "type-fishing-boat"], ["Speedboats", "boat-type-speedboat"], ["Cabin Cruisers", "boat-type-cabin-cruiser"], ["Boats Without Trailers", "boat-type-no-trailer"],
] as const;
const TYPE_HREF: Record<string, string> = { "Yachts and Mega Yachts": "/yacht-transport/", "Boats Without Trailers": "/boat-transport-without-trailer/" };

const ROUTES = ["New York", "New Jersey", "Michigan", "Ohio", "Massachusetts", "Connecticut", "Illinois", "Pennsylvania"];

const TIERS = [["Small Boats", "(up to 25 ft)", "$1,500 – $2,500"], ["Medium Boats", "(26 – 35 ft)", "$2,500 – $3,500"], ["Large Boats & Yachts", "(36+ ft)", "$3,500 – $5,000+"]];

const STEPS = [
  ["Get a Quote", "Fill out our quick form or call us for a free quote.", "form"],
  ["We Assign a Carrier", "We match you with a vetted, insured carrier.", "truck"],
  ["Pick Up & Ship", "Your boat is picked up and shipped safely.", "pin"],
  ["Delivery Complete", "You receive your boat at the destination.", "done"],
] as const;

const OPTIONS = [
  ["Open Shipping", "boat-opt-open", ["Cost-effective option", "Safe and reliable", "Ideal for most boats"]],
  ["Enclosed Shipping", "boat-opt-enclosed", ["Maximum protection", "Ideal for high-value boats", "Protects from weather and road debris"]],
  ["Oversize & Specialized", "boat-opt-oversize", ["For large boats and yachts", "Permits and escorts if required", "Experienced carriers", "Nationwide service"]],
] as const;

const COVERAGE = ["Coastal & Island", "Inland & Great Lakes", "Cross-Country Hauls", "Seasonal Relocations", "Marinas & Boat Shows", "And Everywhere In Between"];

/* Small inline glyphs the shared icon set does not have */
const Glyph = ({ name, className = "" }: { name: "dollar" | "usa" | "truck" | "form" | "pin" | "done"; className?: string }) => {
  const d: Record<string, string> = {
    dollar: "M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm1 17.5h-2v-1.6c-1.6-.3-2.9-1.3-3-3h2c.1.9.8 1.4 2 1.4 1.3 0 1.9-.6 1.9-1.3 0-.8-.5-1.2-2.3-1.6-2-.5-3.5-1.2-3.5-3.1 0-1.5 1.2-2.6 2.9-2.9V5h2v1.5c1.5.3 2.6 1.3 2.7 2.9h-2c-.1-.8-.6-1.3-1.8-1.3-1.1 0-1.7.5-1.7 1.2 0 .7.5 1 2.2 1.5 2.1.5 3.6 1.2 3.6 3.2 0 1.6-1.2 2.7-3 3v1.5z",
    usa: "M2 6l5-1.5 4 .8 6-2.2 7 1.5 5-1.5 4 .8 3 3 7 .8 4 3-2.3 3.8-1.5 4.5-3.8 3-3.8 6-2.2-.8-1.5 3-3-3.8-6-1.5-5.3 2.2-4.5-1.5-5.3 1.5-1.5-4.5-3-4.5-.8-4.5z",
    truck: "M20 8h-3V4H3a2 2 0 0 0-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zM7 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM17 12V9.5h2.5l2 2.5H17z",
    form: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z",
    pin: "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
    done: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z",
  };
  return <svg viewBox={name === "usa" ? "0 0 64 40" : "0 0 24 24"} className={className} fill="currentColor" aria-hidden="true"><path d={d[name]} /></svg>;
};

const CheckDot = ({ className = "h-4 w-4", color = "bg-success" }: { className?: string; color?: string }) => (
  <span className={`grid shrink-0 place-items-center rounded-full text-white ${color} ${className}`}><Check className="h-[65%] w-[65%]" /></span>
);

export default function BoatTransportPage() {
  const hero = photo("hero-2");
  const band = photo("boat-band-semi-yacht");
  const cta = photo("boat-cta-boat");
  const review = reviews.find((r) => r.service === "Boat Transport") ?? reviews[0];
  const crumbs = [{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, { name: P.name, href: PATH }];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema("Boat Transport to Florida", metadata.description as string, "boat-transport"), faqSchema(P.faqs)]} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        {hero && <Image src={hero} alt="Pickup truck towing a sportfish boat across a Florida causeway" fill priority sizes="100vw" className="object-cover object-right" />}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.97)_0%,rgba(13,31,53,.9)_28%,rgba(13,31,53,.35)_55%,rgba(13,31,53,.15)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(13,31,53,.95),rgba(13,31,53,.85))]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-10">
          <div className="flex flex-col pb-5 lg:pt-[72px]">
            <span className="mb-3.5 w-max rounded-full bg-orange px-4 py-1.5 text-[14px] font-semibold">Snowbird Boat Transport Specialists — Florida</span>
            <h1 className="font-display max-w-[560px] text-[36px] font-extrabold leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,.35)] sm:text-[46px]">Boat Transport to Florida — Snowbird Season Specialists</h1>
            <p className="mb-5 mt-3.5 max-w-[420px] text-[16px] leading-[1.55] text-white/95">Shipping your boat south for winter? MCC Bound Legends coordinates seasonal boat transport to Florida from New York, New Jersey, Michigan, Ohio, Massachusetts and all northern states. Door-to-door. No deposit to book. Get your free boat shipping quote in 60 seconds.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#quote" className="btn-orange font-display px-5 py-3 text-[19px] font-bold tracking-wide">Get My Free Boat Quote <Arrow className="h-5 w-5" /></a>
              <PhoneLink location="hero" className="btn-ghost font-display border-white/75 px-5 py-3 text-[19px] font-bold tracking-wide"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
            </div>
            <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2.5 pt-7 text-[13.5px] font-medium">
              {TRUST.map((t) => <li key={t} className="flex items-center gap-1.5"><CheckDot className="h-[17px] w-[17px]" />{t}</li>)}
            </ul>
          </div>
          <div className="pb-5 lg:pb-5"><BoatQuoteForm /></div>
        </div>
      </section>

      {/* ── BOAT TYPES ───────────────────────────────────────────────── */}
      <section className="bg-white py-11">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">We Ship All Types of Boats to Florida</h2>
          <p className="mt-1 text-[16.5px] text-slate">From small fishing boats to luxury yachts — every watercraft transported safely, on time, fully insured.</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {TYPES.map(([t, img], i) => {
              const src = photo(img);
              return (
                <li key={t} className="reveal-up" style={{ ["--d" as string]: `${i * 40}ms` }}>
                  <Link href={TYPE_HREF[t] ?? "#quote"} className="group block text-center">
                    <span className="relative block aspect-[1.55] overflow-hidden rounded-md bg-mist">
                      {src && <Image src={src} alt={t} fill sizes="(max-width:640px) 50vw, (max-width:1280px) 25vw, 12vw" className="object-cover transition duration-500 group-hover:scale-105" />}
                    </span>
                    <span className="mt-2 block text-[14px] font-bold text-royal">{t}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            <a href="#quote" className="btn-orange font-display px-6 py-3 text-[19px] font-bold tracking-wide">Get a Quote <Arrow className="h-5 w-5" /></a>
            <Link href="/services/" className="font-display inline-flex items-center gap-2 rounded-lg border-2 border-royal bg-white px-6 py-3 text-[19px] font-bold tracking-wide text-royal transition hover:bg-royal hover:text-white">View All Services <Arrow className="h-5 w-5" /></Link>
          </div>
        </div>
      </section>

      {/* ── ROUTES ───────────────────────────────────────────────────── */}
      <section className="bg-mist/60 py-11">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">Snowbird Boat Transport Routes We Cover</h2>
          <p className="mt-1 max-w-4xl text-[16.5px] text-slate">We coordinate boat transport to Florida from every major northern state. Our most popular snowbird routes run along I-95 and I-75 from the Northeast and Midwest straight to Florida&apos;s marinas and waterways.</p>
          <ul className="mt-4.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ROUTES.map((s) => (
              <li key={s}>
                <a href="#quote" className="flex items-center gap-3 rounded-md border border-line bg-white px-3 py-2.5 text-[15.5px] font-semibold text-navy transition hover:border-orange hover:shadow-[0_4px_14px_rgba(13,31,53,.08)]">
                  <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-orange text-white"><Arrow className="h-3 w-3" /></span>{s} to Florida
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4.5 text-center text-[15.5px] font-bold text-navy">Don&apos;t see your state? We ship from all 50 states. Call <PhoneLink location="routes" className="underline decoration-orange decoration-2 underline-offset-2">{site.phone}</PhoneLink>.</p>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="bg-white py-11">
        <div className="mx-auto grid max-w-7xl items-start gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">How Much Does It Cost to Ship a Boat to Florida?</h2>
            <p className="mt-1 text-[16.5px] text-slate">Boat shipping costs to Florida range from $1,500 to $5,000 depending on your boat size, pickup location, and time of year. Here is a simple breakdown:</p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {TIERS.map(([t, s, p]) => (
                <li key={t} className="rounded-md border border-line bg-white px-3 py-3.5 text-center">
                  <span className="block text-[15px] font-bold text-royal">{t}</span>
                  <span className="block text-[14.5px] text-navy">{s}</span>
                  <span className="font-display mt-2.5 block text-[27px] font-extrabold leading-none text-orange">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-blue-100 bg-[#e8f4fd] p-4.5">
            <div className="flex items-start gap-2.5">
              <span className="grid h-10.5 w-10.5 shrink-0 place-items-center rounded-full bg-blue text-white"><Glyph name="dollar" className="h-6 w-6" /></span>
              <div><h3 className="font-display text-[21px] font-extrabold text-royal">Get an Exact Price</h3><p className="mt-0.5 text-[14px] text-slate">Prices vary based on your specific boat and locations. Get a free, no-obligation quote in 60 seconds.</p></div>
            </div>
            <a href="#quote" className="btn-orange font-display mt-3.5 w-full py-3 text-[19px] font-bold tracking-wide">Get My Free Quote <Arrow className="h-5 w-5" /></a>
          </div>
        </div>
      </section>

      {/* ── BIG BOATS BAND ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        {band && <Image src={band} alt="" fill sizes="100vw" className="object-cover object-[55%_40%] max-sm:opacity-35" aria-hidden="true" />}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.98)_0%,rgba(13,31,53,.9)_22%,rgba(13,31,53,.1)_42%,rgba(13,31,53,.1)_62%,rgba(13,31,53,.92)_78%,rgba(13,31,53,1)_100%)] max-sm:bg-navy/70" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[190px] max-w-7xl items-center gap-5 px-5 py-7 sm:px-8 lg:grid-cols-[270px_1fr_250px]">
          <div>
            <h2 className="font-display text-[32px] font-extrabold leading-none"><span className="block">BIG BOATS.</span><span className="block">LONG DISTANCES.</span><span className="block text-blue">NO PROBLEM.</span></h2>
            <p className="mb-3.5 mt-2.5 max-w-[260px] text-[13.5px] leading-[1.45] text-white/95">From coastal moves to cross-country shipping, we handle boat transport so you can focus on what matters — the journey ahead.</p>
            <a href="#quote" className="btn-orange font-display px-4.5 py-2.5 text-[17px] font-bold tracking-wide">Get a Quote <Arrow className="h-4 w-4" /></a>
          </div>
          <div className="hidden lg:block" />
          <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {[["Nationwide Coverage", "All 50 States", "usa"], ["Open & Enclosed Options", "For added protection", "truck"], ["Experienced Carriers", "Backgrounds carefully vetted", "users"], ["Competitive Rates", "No upfront deposits", "dollar"]].map(([t, s, ic]) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-blue text-white">{ic === "users" ? <Users className="h-5 w-5" /> : <Glyph name={ic as "usa" | "truck" | "dollar"} className="h-5 w-5" />}</span>
                <span className="leading-tight"><span className="block text-[15.5px] font-semibold">{t}</span><span className="block text-[13px] text-white/85">{s}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW IT WORKS + OPTIONS + SIDEBAR ─────────────────────────── */}
      <section className="bg-white py-11">
        <div className="mx-auto grid max-w-7xl items-start gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div>
            <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">How Boat Shipping Works</h2>
            <p className="mt-1 text-[16.5px] text-slate">We make boat shipping simple, safe, and stress-free.</p>
            <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
              {STEPS.map(([t, s, ic], i) => (
                <li key={t} className="relative pr-3.5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-display grid h-[38px] w-[38px] place-items-center rounded-full bg-royal text-[22px] font-extrabold text-white">{i + 1}</span>
                    <Glyph name={ic} className="h-[30px] w-[30px] text-royal" />
                  </div>
                  <b className="block text-[17px] font-bold text-royal">{t}</b>
                  <p className="mt-1 text-[13.5px] leading-[1.4] text-slate">{s}</p>
                  {i < STEPS.length - 1 && <span className="font-display absolute right-0.5 top-0 hidden text-[34px] font-extrabold leading-none text-royal lg:block" aria-hidden="true">›</span>}
                </li>
              ))}
            </ol>

            <h2 className="font-display mt-8 text-[28px] font-extrabold leading-tight text-royal">Shipping Options</h2>
            <p className="mt-1 text-[16.5px] text-slate">We coordinate the right equipment and service for your specific boat and needs.</p>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {OPTIONS.map(([t, img, pts]) => {
                const src = photo(img);
                return (
                  <li key={t} className="overflow-hidden rounded-md border border-line bg-white">
                    <span className="relative block aspect-[3.4] bg-mist">{src && <Image src={src} alt={t} fill sizes="(max-width:640px) 100vw, 30vw" className="object-cover" />}</span>
                    <div className="px-3 pb-3 pt-2.5">
                      <b className="mb-1.5 block text-[16px] font-bold text-royal">{t}</b>
                      <ul>{pts.map((p) => <li key={p} className="mb-1 flex gap-1.5 text-[13px] leading-[1.35] text-navy"><CheckDot className="mt-0.5 h-[13px] w-[13px]" color="bg-blue" />{p}</li>)}</ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside>
            <div className="rounded-lg bg-navy p-4 text-white">
              <h3 className="font-display text-[22px] font-extrabold">Nationwide Coverage</h3>
              <p className="mb-2.5 mt-1 text-[13px] leading-[1.4] text-white/90">We ship boats to and from all coastal, inland, and great lake locations.</p>
              <div className="grid items-center gap-2 sm:grid-cols-[1.2fr_1fr]">
                <UsaMap className="w-full" />
                <ul>{COVERAGE.map((c) => <li key={c} className="mb-1.5 flex items-center gap-1.5 text-[12.5px]"><CheckDot className="h-[15px] w-[15px]" color="bg-blue" />{c}</li>)}</ul>
              </div>
            </div>
            <figure className="mt-3.5 rounded-lg border border-line p-4">
              <h3 className="font-display text-[22px] font-extrabold text-royal">What Our Customers Say</h3>
              <p className="mt-0.5 text-[13px] text-slate">Real customers. Real shipments. Real results.</p>
              <div className="mb-1.5 mt-2 flex text-[#F59E0B]" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5" />)}</div>
              <blockquote className="text-[14px] italic leading-[1.45] text-navy">&ldquo;{review.text}&rdquo;</blockquote>
              <figcaption className="mt-3 flex items-center gap-2.5">
                <span className="font-display grid h-11 w-11 place-items-center rounded-full bg-royal text-[18px] font-extrabold text-white">{review.name.split(" ").map((n) => n[0]).join("")}</span>
                <span><b className="block text-[15px] text-royal">{review.name}</b><span className="text-[12.5px] text-slate">Boat Owner · {review.source} Review</span></span>
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(90deg,#0b3d78,#0d5cb6_40%,#0d5cb6_70%,#0b3d78)] text-white">
        {cta && (
          <div className="absolute bottom-0 left-0 top-0 hidden w-[40%] lg:block" aria-hidden="true">
            <Image src={cta} alt="" fill sizes="40vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,92,182,0)_55%,#0d5cb6_100%)]" />
          </div>
        )}
        <div className="relative mx-auto grid min-h-[110px] max-w-7xl items-center gap-6 px-5 py-6 text-center sm:px-8 lg:grid-cols-[1fr_auto]">
          <div className="lg:pl-[32%]">
            <h2 className="font-display text-[31px] font-extrabold leading-tight">Safe Boats. Happier Destinations.</h2>
            <p className="mt-0.5 text-[16px]">Get your free boat shipping quote to Florida today.</p>
            <ul className="mt-2 flex flex-wrap justify-center gap-5 text-[14px] font-medium">
              {["No Deposits", "Real Support", "Competitive Rates"].map((t) => <li key={t} className="flex items-center gap-1.5"><CheckDot className="h-4 w-4" color="bg-blue" />{t}</li>)}
            </ul>
          </div>
          <div className="grid min-w-[190px] gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <a href="#quote" className="btn-orange font-display px-4.5 py-2.5 text-[18px] font-bold tracking-wide">Get a Quote <Arrow className="h-4 w-4" /></a>
            <PhoneLink location="cta_band" className="btn-ghost font-display px-4.5 py-2.5 text-[18px] font-bold tracking-wide"><Phone className="h-4 w-4" /> {site.phone}</PhoneLink>
          </div>
        </div>
      </section>
    </>
  );
}
