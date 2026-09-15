import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { getPage, type FAQ } from "@/data/services";
import { boatReviews } from "@/data/reviews";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { photo } from "@/lib/images";
import { JsonLd } from "@/components/JsonLd";
import { PhoneLink } from "@/components/PhoneLink";
import { BoatQuoteForm } from "@/components/BoatQuoteForm";
import { Arrow, Check, Phone, Star, Users } from "@/components/Icons";

/**
 * /boat-transport-florida/ — Google-Ads landing page built 1:1 to the client's reference
 * mockups (snowbird boat transport to Florida). URL, title and canonical are fixed by the
 * client (all Ads point here). Section order, copy and layout follow the mockups;
 * header/footer come from the site layout.
 */
const P = getPage("boat-transport-florida")!;
const PATH = "/boat-transport-florida/";

export const metadata: Metadata = meta(
  "Boat Shipping to Florida — Free Quote | MCC Bound Legends",
  "Snowbird boat transport to Florida from New York, New Jersey, Michigan, Ohio, Massachusetts and all northern states. Door-to-door, fully insured, no deposit. Free boat shipping quote in 60 seconds.",
  PATH,
);

const TRUST = ["No Deposit Required", "5-Star Rated on Google & Trustpilot", "BBB Accredited", "Fully Insured", `USDOT ${site.usdot}`, "All 50 States"];

/* Every type card scrolls to the quote form (client: no subpages until Month 2). */
const TYPES = [
  ["Center Consoles", "type-center-console"], ["Sailboats", "type-sailboat"], ["Yachts and Mega Yachts", "type-yacht"], ["Pontoon Boats", "type-pontoon"],
  ["Fishing Boats", "type-fishing-boat"], ["Speedboats", "boat-type-speedboat"], ["Cabin Cruisers", "boat-type-cabin-cruiser"], ["Boats With Trailers", "boat-type-with-trailer"],
] as const;

const ROUTES = ["New York", "New Jersey", "Michigan", "Ohio", "Massachusetts", "Connecticut", "Illinois", "Pennsylvania"];

const TIERS = [["Small Boats", "(up to 25 ft)", "$1,500 – $2,500"], ["Medium Boats", "(26 – 35 ft)", "$2,500 – $3,500"], ["Large Boats & Yachts", "(36+ ft)", "$3,500 – $5,000+"]];

const STEPS = [
  ["Get a Quote", "Fill out our quick form or call us."],
  ["We Assign a Carrier", "We match you with a vetted, insured carrier."],
  ["Pick Up & Ship", "Your boat is picked up and shipped safely."],
  ["Delivery Complete", "Your boat arrives at the destination."],
] as const;

const OPTIONS = [
  ["Open Shipping", "boat-opt-open", ["Cost-effective option", "Safe and reliable", "Ideal for most boats"]],
  ["Enclosed Shipping", "boat-opt-enclosed", ["Maximum protection", "Ideal for high-value boats", "Protects from weather", "Road-ready and secure"]],
  ["Oversize & Specialized", "boat-opt-oversize", ["For large boats and yachts", "Permits and escorts if required", "Experienced carriers", "Nationwide service"]],
] as const;

/* Client-supplied FAQ copy (2026-09-15), verbatim. */
const FAQS: FAQ[] = [
  { q: "How much does it cost to ship a boat to Florida?", a: "Boat shipping costs from New York to Florida range from $1,500 to $5,000 depending on your boat size, pickup location, and time of year. Small boats under 25ft typically run $1,500 to $2,500. Medium boats 26 to 35ft run $2,500 to $3,500. Large boats and yachts 36ft and over run $3,500 to $5,000 or more. Snowbird season from October through January sees higher demand and rates. Get your exact price using the form above — takes 60 seconds and there is no deposit required." },
  { q: "How long does boat shipping to Florida take?", a: "Transit times depend on your pickup location and destination in Florida. Most routes from the Northeast including New York, New Jersey, and Massachusetts take 3 to 6 days. Midwest routes from Michigan, Ohio, and Illinois typically take 5 to 8 days. Southern states take 2 to 4 days. We provide estimated transit times with every quote and keep you updated throughout the journey from pickup to delivery." },
  { q: "Do I need a trailer to ship my boat?", a: "No. We coordinate transport for boats with and without trailers. Vessels without trailers are transported using hydraulic marine trailers and specialized equipment matched to your boat's specific size, beam, and weight. We assess the loading conditions at your pickup location — marina, boatyard, or private storage — and arrange the right equipment. Just let us know when you request your quote and we handle everything." },
  { q: "When is the best time to book snowbird boat shipping?", a: "Book in September or early October. Carrier capacity for southbound boat transport to Florida fills up fast once November arrives. Customers who book early get better availability, better rates, and more flexibility on pickup dates. Waiting until November or December typically means paying 15 to 25 percent more and having fewer carrier options. If you are planning to spend the winter in Florida book your boat transport now before carriers fill up." },
  { q: "Do you offer enclosed boat shipping to Florida?", a: "Yes. We offer both open and enclosed transport options for boats heading to Florida. Enclosed shipping provides maximum protection from weather and road debris and is ideal for high-value boats, classic vessels, and luxury yachts. Open shipping is the most popular and cost-effective option and is safe and reliable for most standard boats. Let us know your preference when you request your quote." },
  { q: "Are my boat and equipment insured during shipping?", a: "Yes. Every carrier we work with is required to carry cargo insurance and we verify that coverage before dispatch. Your boat is covered from the moment the carrier loads it to the moment it is delivered at your destination. We provide the carrier's insurance certificate on request and assist you through any claims process if it is ever needed. You can ship with complete confidence knowing your vessel is fully protected." },
  { q: "What information do you need for a quote?", a: "To give you an accurate boat transport quote we need the following: boat type and size including length, beam, and height, whether you have a trailer and its condition, pickup location including city and ZIP code, delivery location including city and ZIP code, preferred pickup date, and your contact information. The more details you provide the more accurate your quote will be. Use the form above to get started — it takes 60 seconds." },
  { q: "Do you ship from all states to Florida?", a: "Yes. We coordinate boat transport to Florida from all 50 states. Our most popular snowbird routes come from New York, New Jersey, Michigan, Ohio, Massachusetts, Connecticut, Illinois, and Pennsylvania. But we handle pickups from any location nationwide including coastal marinas, inland lakes, boatyards, private residences, and storage facilities. Call us at (888) 785-0028 if you have a specific route question." },
];

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

const Stars = ({ className = "h-5 w-5" }: { className?: string }) => (
  <span className="flex text-[#F59E0B]" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={className} />)}</span>
);

const FaqItem = ({ f }: { f: FAQ }) => (
  <details className="group rounded-md border border-blue-100 bg-[#eaf3fc]">
    <summary className="flex cursor-pointer items-center gap-2.5 px-3.5 py-3 text-[15px] font-bold text-navy">
      <span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-royal text-white"><Arrow className="h-2.5 w-2.5" /></span>
      <span className="flex-1">{f.q}</span>
      <span className="relative h-4 w-4 shrink-0 text-royal transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded bg-current" /><span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current" />
      </span>
    </summary>
    <p className="px-3.5 pb-4 pl-[42px] text-[14.5px] leading-[1.6] text-slate">{f.a}</p>
  </details>
);

export default function BoatTransportFloridaPage() {
  const hero = photo("hero-2");
  const band = photo("boat-band-semi-yacht");
  const cta = photo("boat-cta-boat");
  const crumbs = [{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, { name: P.name, href: PATH }];
  const half = Math.ceil(FAQS.length / 2);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema("Boat Shipping to Florida", metadata.description as string, "boat-transport-florida"), faqSchema(FAQS)]} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Photo sits in the gap between the copy and the quote card (mockup: truck + boat fully visible, not behind the form) */}
        {hero && (
          <div className="absolute inset-0 lg:left-[22%] lg:right-[27%] lg:[mask-image:linear-gradient(90deg,transparent,black_14%,black_88%,transparent)]" aria-hidden="true">
            <Image src={hero} alt="" fill priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover object-[55%_50%]" />
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.97)_0%,rgba(13,31,53,.92)_22%,rgba(13,31,53,.55)_34%,rgba(13,31,53,0)_46%)] max-lg:bg-[linear-gradient(180deg,rgba(13,31,53,.95),rgba(13,31,53,.85))]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
          <div className="flex flex-col pb-5 lg:pt-[112px]">
            <span className="mb-3.5 w-max rounded-full bg-orange px-4 py-1.5 text-[14px] font-semibold">Snowbird Boat Transport Specialists — Florida</span>
            <h1 className="font-display max-w-[600px] text-[36px] font-extrabold leading-[1.05] drop-shadow-[0_2px_14px_rgba(0,0,0,.55)] sm:text-[48px]">Boat Transport to Florida — Snowbird Season Specialists</h1>
            <p className="mb-5 mt-3.5 max-w-[440px] text-[16px] leading-[1.55] text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,.6)]">Shipping your boat south for winter? MCC Bound Legends coordinates seasonal boat transport to Florida from New York, New Jersey, Michigan, Ohio, Massachusetts and all northern states. Door-to-door. No deposit to book. Get your free boat shipping quote in 60 seconds.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#quote" className="btn-orange font-display px-5 py-3 text-[19px] font-bold tracking-wide">Get My Free Boat Quote <Arrow className="h-5 w-5" /></a>
              <PhoneLink location="hero" className="btn-ghost font-display border-white/75 bg-navy/40 px-5 py-3 text-[19px] font-bold tracking-wide backdrop-blur-sm"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
            </div>
            <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2.5 pt-7 text-[13.5px] font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,.7)]">
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
          <ul className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-4 xl:grid-cols-8">
            {TYPES.map(([t, img], i) => {
              const src = photo(img);
              return (
                <li key={t} className="reveal-up" style={{ ["--d" as string]: `${i * 40}ms` }}>
                  <a href="#quote" className="group block text-center">
                    {/* 3:2 frame = the photo's own ratio, so nothing is cropped or zoomed */}
                    <span className="relative block aspect-[3/2] overflow-hidden rounded-md bg-mist ring-1 ring-line">
                      {src && <Image src={src} alt={t} fill sizes="(max-width:640px) 50vw, (max-width:1280px) 25vw, 12vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />}
                    </span>
                    <span className="mt-2 block text-[14.5px] font-bold text-royal">{t}</span>
                  </a>
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
                <a href="#quote" className="flex items-center gap-3 rounded-md border border-line bg-white px-3.5 py-3 text-[16px] font-bold text-royal transition hover:border-orange hover:shadow-[0_4px_14px_rgba(13,31,53,.08)]">
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
        <div className="mx-auto grid max-w-7xl items-start gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">How Much Does It Cost to Ship a Boat to Florida?</h2>
            <p className="mt-1 text-[16.5px] text-slate">Boat shipping costs to Florida range from $1,500 to $5,000 depending on your boat size, pickup location, and time of year. Here is a simple breakdown:</p>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {TIERS.map(([t, s, p]) => (
                <li key={t}>
                  <a href="#quote" className="block rounded-md border border-line bg-white px-3 py-4 text-center transition hover:border-orange hover:shadow-[0_4px_14px_rgba(13,31,53,.08)]">
                    <span className="block text-[16px] font-bold text-royal">{t}</span>
                    <span className="block text-[14.5px] text-navy">{s}</span>
                    <span className="font-display mt-2.5 block text-[28px] font-extrabold leading-none text-orange">{p}</span>
                  </a>
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
        {band && (
          <div className="absolute inset-0 lg:left-[17%] lg:right-[20%] lg:[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]" aria-hidden="true">
            <Image src={band} alt="" fill sizes="(max-width:1024px) 100vw, 63vw" className="object-cover object-[50%_62%] max-sm:opacity-35" />
          </div>
        )}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(13,31,53,.98)_0%,rgba(13,31,53,.85)_18%,rgba(13,31,53,0)_30%,rgba(13,31,53,0)_70%,rgba(13,31,53,.85)_82%,rgba(13,31,53,1)_100%)] lg:block" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[300px] max-w-7xl items-center gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[280px_1fr_260px]">
          <div>
            <h2 className="font-display text-[32px] font-extrabold leading-none"><span className="block">BIG BOATS.</span><span className="block">LONG DISTANCES.</span><span className="block text-blue">NO PROBLEM.</span></h2>
            <p className="mb-3.5 mt-2.5 max-w-[270px] text-[13.5px] leading-[1.45] text-white/95">From coastal moves to cross-country shipping, we handle boat transport so you can focus on what matters — the journey ahead.</p>
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

      {/* ── SHIPPING OPTIONS + HOW IT WORKS (client reference 2026-09-15) ── */}
      <section className="bg-white py-11">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 sm:px-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
          <div>
            <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">Shipping Options</h2>
            <p className="mt-1 text-[16.5px] text-slate">We coordinate the right equipment and service for your specific boat and needs.</p>
            <ul className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {OPTIONS.map(([t, img, pts]) => {
                const src = photo(img);
                return (
                  <li key={t} className="overflow-hidden rounded-md border border-line bg-white">
                    <span className="relative block aspect-[2/1] bg-mist">{src && <Image src={src} alt={t} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover" />}</span>
                    <div className="px-3.5 pb-3.5 pt-3">
                      <b className="mb-1.5 block text-[17px] font-bold text-royal">{t}</b>
                      <ul>{pts.map((p) => <li key={p} className="mb-1 flex gap-1.5 text-[13.5px] leading-[1.35] text-navy"><CheckDot className="mt-0.5 h-[13px] w-[13px]" color="bg-blue" />{p}</li>)}</ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">How Boat Shipping Works</h2>
              <Link href="/how-it-works/" className="mb-1 inline-flex shrink-0 items-center gap-1 text-[14px] font-bold text-royal hover:underline">See How It Works <Arrow className="h-3.5 w-3.5" /></Link>
            </div>
            <ol className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4 lg:gap-x-2">
              {STEPS.map(([t, s], i) => (
                <li key={t} className={`px-2 text-center ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
                  <span className="font-display mx-auto grid h-[46px] w-[46px] place-items-center rounded-full bg-royal text-[24px] font-extrabold text-white shadow-[0_6px_16px_-6px_rgba(30,99,214,.7)]">{i + 1}</span>
                  <b className="mt-2.5 block text-[16px] font-bold leading-tight text-royal">{t}</b>
                  <p className="mt-1.5 text-[13px] leading-[1.4] text-slate">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── REVIEWS (4 real boat-transport customers) ────────────────── */}
      <section className="bg-mist/60 py-11">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">What Our Customers Say</h2>
              <p className="mt-1 text-[16.5px] text-slate">Real customers. Real experiences. Real results.</p>
            </div>
            <a href={site.reviews.google} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-[14px] font-bold text-royal hover:underline">Read More Reviews <Arrow className="h-3.5 w-3.5" /></a>
          </div>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {boatReviews.map((r) => (
              <li key={r.name}>
                <a href={r.source === "Google" ? site.reviews.google : site.reviews.trustpilot} target="_blank" rel="noopener" className="flex h-full flex-col rounded-lg border border-line bg-white p-4 transition hover:border-blue/60 hover:shadow-[0_8px_24px_-12px_rgba(13,31,53,.25)]">
                  <Stars className="h-[18px] w-[18px]" />
                  <blockquote className="mt-2.5 flex-1 text-[14px] italic leading-[1.5] text-navy">&ldquo;{r.excerpt ?? r.text}&rdquo;</blockquote>
                  <span className="mt-3.5 flex items-center gap-2.5">
                    <span className="font-display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-royal text-[16px] font-extrabold text-white">{r.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                    <span><b className="block text-[15px] leading-tight text-royal">{r.name}</b><span className="text-[12.5px] text-slate">Boat Owner | {r.source} Review</span></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-11">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-[30px] font-extrabold leading-tight text-royal sm:text-[34px]">Frequently Asked Questions</h2>
              <p className="mt-1 text-[16.5px] text-slate">Answers to the most common questions about boat shipping to Florida.</p>
            </div>
            <Link href="/faq/" className="inline-flex items-center gap-1 text-[14px] font-bold text-royal hover:underline">View All FAQs <Arrow className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-2.5 lg:grid-cols-2">
            <div className="grid content-start gap-2.5">{FAQS.slice(0, half).map((f) => <FaqItem key={f.q} f={f} />)}</div>
            <div className="grid content-start gap-2.5">{FAQS.slice(half).map((f) => <FaqItem key={f.q} f={f} />)}</div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(90deg,#0b3d78,#0d5cb6_40%,#0d5cb6_70%,#0b3d78)] text-white">
        {cta && (
          <div className="absolute bottom-0 left-0 top-0 hidden w-[46%] lg:block" aria-hidden="true">
            <Image src={cta} alt="" fill sizes="46vw" className="object-cover object-[50%_55%]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,92,182,0)_65%,#0d5cb6_100%)]" />
          </div>
        )}
        <div className="relative mx-auto grid min-h-[170px] max-w-7xl items-center gap-6 px-5 py-7 text-center sm:px-8 lg:grid-cols-[1fr_auto]">
          <div className="lg:pl-[38%]">
            <h2 className="font-display text-[31px] font-extrabold leading-tight">Safe Boats. Happier Destinations.</h2>
            <p className="mt-0.5 text-[16px]">Get your free boat shipping quote to Florida today.</p>
            <ul className="mt-2 flex flex-wrap justify-center gap-5 text-[14px] font-medium">
              {["No Deposits", "Real Support", "Competitive Rates"].map((t) => <li key={t} className="flex items-center gap-1.5"><CheckDot className="h-4 w-4" color="bg-blue" />{t}</li>)}
            </ul>
          </div>
          <div className="grid min-w-[200px] gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <a href="#quote" className="btn-orange font-display px-4.5 py-2.5 text-[18px] font-bold tracking-wide">Get a Quote <Arrow className="h-4 w-4" /></a>
            <PhoneLink location="cta_band" className="btn-ghost font-display px-4.5 py-2.5 text-[18px] font-bold tracking-wide"><Phone className="h-4 w-4" /> {site.phone}</PhoneLink>
          </div>
        </div>
      </section>
    </>
  );
}
