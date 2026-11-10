import Link from "next/link";
import { site } from "@/data/site";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { Arrow, Check, Route, Ruler, Shield, Bolt } from "@/components/Icons";
import { Breadcrumbs, CtaBand, FaqList, SectionHead, TrustStrip } from "@/components/Sections";

/**
 * Cost to ship a car (Milestone 2, proposal scope).
 * Price ranges are TYPICAL MARKET ESTIMATES for open transport of a running vehicle, not quotes.
 * Client should confirm/adjust these numbers before launch (see docs/MILESTONE-2-PAGES.md).
 */
export const metadata = meta(
  "Cost to Ship a Car: Price Ranges by Distance | MCC",
  "How much does it cost to ship a car? Typical price ranges by distance and vehicle type, what changes the price, and how to get a real quote with no deposit.",
  "/cost-to-ship-a-car/",
);
const crumbs = [{ name: "Home", href: "/" }, { name: "Auto Transport", href: "/auto-transport/" }, { name: "Cost to Ship a Car", href: "/cost-to-ship-a-car/" }];

/** Standard sedan, open carrier, running, flexible dates. */
const BY_DISTANCE = [
  { d: "Under 500 miles", ex: "Orlando to Atlanta", r: "$550 – $900" },
  { d: "500 – 1,000 miles", ex: "Miami to Charlotte", r: "$750 – $1,150" },
  { d: "1,000 – 1,500 miles", ex: "Tampa to New York", r: "$950 – $1,350" },
  { d: "1,500 – 2,000 miles", ex: "Orlando to Denver", r: "$1,100 – $1,550" },
  { d: "Coast to coast (2,000+)", ex: "Florida to California", r: "$1,300 – $1,900" },
];

const BY_VEHICLE = [
  { v: "Sedan or compact car", adj: "Base price", note: "The ranges above" },
  { v: "SUV or crossover", adj: "+ $100 – $250", note: "Larger and heavier, takes more deck space" },
  { v: "Full-size pickup truck", adj: "+ $200 – $400", note: "Length, weight and lifted trucks cost more" },
  { v: "Classic, exotic or luxury car", adj: "+ 40% – 60%", note: "Usually shipped enclosed for protection" },
  { v: "Non-running vehicle", adj: "+ $150 – $250", note: "Needs a winch-equipped carrier" },
  { v: "Motorcycle", adj: "Often less than a car", note: "Depends on carrier and route" },
];

const FACTORS = [
  { icon: Route, t: "Distance and route", s: "Longer routes cost more in total but less per mile. Busy lanes, such as Florida to the Northeast, attract carriers faster than rural routes." },
  { icon: Ruler, t: "Vehicle size and weight", s: "Bigger and heavier vehicles take more space and weight on the trailer, so they cost more to move." },
  { icon: Shield, t: "Open or enclosed", s: "Enclosed transport protects from weather and road debris and typically costs 40 to 60 percent more than open." },
  { icon: Bolt, t: "Timing and season", s: "Expedited pickup, holidays and snowbird season (fall south, spring north) push prices up. Flexible dates bring them down." },
];

const FAQS = [
  { q: "How much does it cost to ship a car?", a: "For a standard sedan on an open carrier, most routes fall somewhere between about $550 for short distances and $1,900 for coast to coast. Your exact price depends on the route, vehicle, transport type and timing. Request a quote for a real number." },
  { q: "Are these prices a quote?", a: "No. They are typical market ranges to help you plan. Fuel prices, season and carrier availability change the market, so we confirm your actual price when you request a quote." },
  { q: "Is it cheaper to drive the car myself?", a: "For long routes, often not. Fuel, hotels, meals, time off work and wear on the car usually add up to more than shipping, especially coast to coast." },
  { q: "Do I pay a deposit?", a: "No. You book with no deposit and pay once a vetted carrier is assigned to your vehicle." },
  { q: "Why are some online quotes much lower?", a: "Very low quotes are often teaser prices that no carrier will accept, so the car sits waiting or the price rises later. We quote a price a real carrier will take." },
  { q: "Does the price include insurance?", a: "The motor carrier carries cargo insurance on your vehicle during transport, and we verify that coverage before dispatch." },
];

export default function CostToShipACar() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(FAQS)]} />

      {/* Hero */}
      <section className="hero-bg relative overflow-hidden py-14 text-white lg:py-20">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Breadcrumbs items={crumbs} light />
            <p className="eyebrow mt-6 text-blue-300">Car shipping cost guide</p>
            <h1 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">How Much Does It Cost to Ship a Car?</h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">Typical price ranges by distance and vehicle type, what pushes the price up or down, and how to get a real number for your route. No deposit to book.</p>
            <div className="mt-8 inline-flex flex-wrap items-baseline gap-x-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4">
              <span className="text-sm uppercase tracking-[0.12em] text-white/60">Most routes, sedan, open carrier</span>
              <span className="display text-4xl text-white">$550 – $1,900</span>
            </div>
            <div className="mt-10"><TrustStrip dark /></div>
          </div>
          <div className="lg:sticky lg:top-28"><QuoteForm compact /></div>
        </Container>
      </section>

      {/* By distance */}
      <section className="bg-cloud py-20" id="cost">
        <Container>
          <SectionHead eyebrow="Price by distance" title="Typical car shipping prices by distance." sub="Standard sedan, open carrier, running, with flexible pickup dates." />
          <div className="reveal overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-navy text-white">
                <tr><th className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em]">Distance</th><th className="hidden px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] sm:table-cell">Example route</th><th className="px-5 py-4 text-right text-sm font-semibold uppercase tracking-[0.08em]">Typical price</th></tr>
              </thead>
              <tbody>
                {BY_DISTANCE.map((r) => (
                  <tr key={r.d} className="border-t border-line">
                    <td className="px-5 py-4 font-semibold text-navy">{r.d}<span className="block text-sm font-normal text-slate sm:hidden">{r.ex}</span></td>
                    <td className="hidden px-5 py-4 text-slate sm:table-cell">{r.ex}</td>
                    <td className="px-5 py-4 text-right text-lg font-bold text-blue">{r.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-muted">Estimates only, not a quote. Market prices change with fuel, season and carrier availability.</p>
        </Container>
      </section>

      {/* By vehicle */}
      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">Price by vehicle</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">What you ship changes the price.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">Carriers price by the space and weight your vehicle takes on the trailer, and by how it has to be loaded. Here is how common vehicles compare to a standard sedan on the same route.</p>
            <Link href="/auto-transport/" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-blue hover:text-navy">Auto transport services <Arrow className="h-4 w-4" /></Link>
          </div>
          <ul className="reveal-right grid grid-cols-1 gap-3">
            {BY_VEHICLE.map((r) => (
              <li key={r.v} className="flex items-center justify-between gap-4 rounded-xl bg-cloud px-5 py-4">
                <div><p className="font-semibold text-navy">{r.v}</p><p className="text-sm text-slate">{r.note}</p></div>
                <span className="shrink-0 text-right font-bold text-blue">{r.adj}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Factors */}
      <section className="navy-section py-20 text-white">
        <Container>
          <SectionHead light eyebrow="What affects the price" title="Four things decide what you pay." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {FACTORS.map(({ icon: Icon, t, s }) => (
              <div key={t} className="reveal-up rounded-2xl border border-white/10 bg-white/5 p-6">
                <Icon className="h-8 w-8 text-blue-400" />
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{s}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Save money */}
      <section className="bg-cloud py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="reveal-left card p-8">
            <p className="eyebrow mb-3 text-blue">Ways to save</p>
            <h2 className="display text-3xl text-navy sm:text-4xl">How to lower your car shipping cost.</h2>
            <ul className="mt-5 space-y-3 text-[15px] text-slate">
              {["Give a pickup window of a few days instead of one fixed date", "Book two to three weeks ahead, especially in snowbird season", "Choose open transport for everyday vehicles", "Ship more than one vehicle together on the same route", "Meet the carrier near a main road if your street is hard to reach"].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="reveal-right card p-8">
            <p className="eyebrow mb-3 text-blue">What is included</p>
            <h2 className="display text-3xl text-navy sm:text-4xl">What your price covers.</h2>
            <ul className="mt-5 space-y-3 text-[15px] text-slate">
              {["Door-to-door pickup and delivery where the truck can safely reach", "A vetted carrier whose cargo insurance we verify before dispatch", "Condition report with photos at pickup and delivery", "One coordinator and updates from pickup to delivery", "No deposit to book, you pay when your carrier is assigned"].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />{t}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">Car shipping cost FAQ</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">Questions about price.</h2>
            <p className="mt-4 text-slate">Want a real number? Call {site.phone}, {site.hours}.</p>
            <Link href="/auto-transport-tips/" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-blue hover:text-navy">Auto transport tips <Arrow className="h-4 w-4" /></Link>
          </div>
          <div className="reveal-right"><FaqList faqs={FAQS} /></div>
        </Container>
      </section>

      <CtaBand title="Get the real price for your route." />
    </>
  );
}
