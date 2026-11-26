import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import type { FAQ } from "@/data/services";
import { photo } from "@/lib/images";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { Arrow, Check, Clock, Route as RouteIcon, Shield, Trailer, Gear } from "@/components/Icons";
import { LandingHero } from "@/components/Landing";
import { Breadcrumbs, CtaBand, FaqList, SectionHead } from "@/components/Sections";
import { Timeline } from "@/components/Visual";

/**
 * Combined route page: New York ↔ Florida motorcycle shipping.
 * Built 1:1 to 02_New_York_Florida_Route_Content.txt (2026-11-15).
 * Both directions live in this page as anchored sections (#new-york-to-florida, #florida-to-new-york);
 * those are fragments, not separate indexable pages.
 */
const PATH = "/motorcycle-transport/new-york-florida/";

export const metadata: Metadata = meta(
  "New York & Florida Motorcycle Shipping | MCC",
  "Ship a motorcycle between New York and Florida in either direction. Open or enclosed options, seller pickup and loading reviewed for your bike.",
  PATH,
);

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Motorcycle & Powersports", href: "/motorcycle-transport/" },
  { name: "New York and Florida", href: PATH },
];

const DIRECTIONS = ["New York to Florida", "Florida to New York"];
const TRUST_LINE = "No upfront deposit before carrier assignment • Carrier insurance checked before dispatch • One point of contact";

const NY_TO_FL = {
  intro: "New York to Florida motorcycle shipping is a popular move for seasonal stays, snowbird trips and relocations. We coordinate pickup across the New York metro and nearby areas and plan the right loading option for your motorcycle or powersports unit.",
  blocks: [
    { h: "New York pickup arrangements", p: "For the New York City area, Long Island, Hudson Valley, Albany or another location, explain where the motorcycle is stored. Stairs, basement garages, narrow loading areas and dealer opening hours can affect collection. Arrange a ground-level accessible handover when required." },
    { h: "Florida receiving plans", p: "Give the receiving contact and access details for Miami, Orlando, Tampa, Jacksonville, Daytona Beach or another destination. If the bike is arriving before you, an authorized person must be able to inspect and accept it within the agreed receiving window." },
    { h: "Seasonal and event travel", p: "Share the event or arrival date before booking. Ask about available priority options if time is short, but keep a requested riding date separate from the carrier's confirmed transport arrangements." },
  ],
};

const FL_TO_NY = {
  intro: "Florida to New York motorcycle transport is a frequent return route for seasonal riders, extended stays and relocations back to the Northeast. We arrange pickup throughout Florida and confirm the receiving plan for your machine.",
  blocks: [
    { h: "Florida collection", p: "Confirm seller release, storage access, keys and fixed accessories. Tell us about steering locks, flat tires or a bike that cannot roll. Carrier loading equipment must suit the actual condition, not simply the fact that the machine is described as non-running." },
    { h: "New York delivery", p: "Discuss receiving hours, street access and a safe unloading point at the destination. A motorcycle carrier may need an accessible nearby location if the address involves restricted streets or a garage it cannot enter." },
    { h: "Return direction and coverage", p: "Price the northbound journey separately. Ask for the assigned carrier's applicable coverage and inspection process, including how fixed accessories or custom parts are described. Do not assume a southbound quote or coverage description transfers unchanged." },
  ],
};

const EQUIPMENT = [
  { icon: Shield, t: "Enclosed transport", d: "An enclosed carrier adds protection from direct weather and road debris. Confirm the loading system, dimensions and availability for your machine; enclosure does not remove the need for proper securement." },
  { icon: Trailer, t: "Open transport", d: "A suitable open trailer may be considered for motorcycles and powersports units when loading and securement requirements are met. The unit remains exposed to normal road and weather conditions." },
  { icon: Gear, t: "Non-running machines", d: "Tell us whether the unit rolls, steers and brakes, has flat tires or a locked steering system. A lift, winch, crate or other loading arrangement is selected only when appropriate to the actual condition." },
];

const PREP = [
  "Photograph the machine, its accessories and existing damage before pickup.",
  "Remove loose belongings and disclose any accessories or parts intended to travel with it.",
  "Provide keys and instructions for alarms, steering locks and immobilizers.",
  "Disclose leaks, battery damage, electric powertrain details and mechanical or rolling restrictions.",
  "Follow the assigned carrier's fuel, battery and loading instructions; do not disconnect or drain components unless instructed.",
  "Confirm seller release, receiving contact and inspection arrangements at both ends.",
];

const STEPS = [
  { t: "Tell us what is moving", d: "Send the vehicle or equipment details, actual pickup and delivery ZIP codes, condition and earliest ready date." },
  { t: "Review the transport arrangements", d: "We review loading needs, carrier suitability, pickup access and receiving requirements. Confirm the agreed method, quoted amount and payment schedule." },
  { t: "Pickup, updates and delivery", d: "Complete the pickup condition report, coordinate updates with your transport contact and inspect the unit with the receiving party at delivery." },
];

const FAQS: FAQ[] = [
  { q: "Can you deliver before a Florida motorcycle event?", a: "Tell us the date and receiving arrangements before booking. We review options and explain the available schedule; the event date is not automatically a guaranteed delivery deadline." },
  { q: "Can a seller hand over the motorcycle while I am away?", a: "Yes, when release permission, keys, collection hours and inspection arrangements are confirmed. Also arrange an authorized receiving person if you will be absent at delivery." },
  { q: "Do I need enclosed service for this route?", a: "Discuss protection, availability and cost for your motorcycle. Open or enclosed may be considered when the carrier's equipment and securement suit the machine." },
  { q: "Can you transport a custom trike between these states?", a: "Provide full width, length, height, weight, clearance and photos. The carrier must have space and loading equipment compatible with the three-wheel configuration." },
  { q: "What insurance applies?", a: "MCC Bound Legends coordinates the shipment; the assigned motor carrier performs the physical transport. Carrier authority and applicable insurance are verified before dispatch. Ask for policy details, limits and exclusions for the agreed transport method." },
  { q: "When is payment due?", a: "No upfront deposit is collected before carrier assignment. Review the booking agreement for the payment schedule, balance and accepted methods." },
];

export default function NewYorkFloridaMotorcyclePage() {
  const hero = photo("svc-motorcycle-transport");
  const nyImg = photo("scenery-new-york");
  const flImg = photo("scenery-florida");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema("New York and Florida Motorcycle Shipping", metadata.description as string, "motorcycle-transport/new-york-florida"),
          faqSchema(FAQS),
        ]}
      />

      <LandingHero
        slides={hero ? [{ src: hero, alt: "Pickup towing an enclosed trailer loaded with motorcycles at sunset" }] : []}
        full
        fallbackIcon="motorcycle"
        crumbs={<div className="mb-4"><Breadcrumbs items={crumbs} light /></div>}
        eyebrow="New York & Florida • Motorcycle & Powersports Transport"
        lines={["Motorcycle Shipping Between", "New York and Florida"]}
        sub="New York to Florida motorcycle shipping and Florida to New York motorcycle transport can be planned for seasonal stays, private purchases and relocations. MCC Bound Legends coordinates a carrier and loading setup appropriate to your bike."
        formDefault="motorcycle"
        onlyTypes={["Motorcycle", "ATV / UTV / Golf Cart", "Something Else"]}
        formTitle="Get Your New York & Florida Transport Quote"
        formNote={TRUST_LINE}
        serviceName="New York and Florida Motorcycle Shipping"
        showDirection
        directionOptions={DIRECTIONS}
        directionAnchors={{ "#new-york-to-florida": "New York to Florida", "#florida-to-new-york": "Florida to New York" }}
      />

      {/* ── ROUTE OVERVIEW ────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-2 text-blue">Route overview</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">One corridor, both directions</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-slate">
            A touring motorcycle with luggage, a low custom build and a trike take different space and handling. Let us know whether the machine runs, rolls and steers, which accessories are fitted and when the seller or storage property can release it. Discuss open or enclosed transport using the actual quote.
          </p>
        </Container>
      </section>

      {/* ── CHOOSE YOUR DIRECTION ─────────────────────────────────────── */}
      <section className="bg-cloud py-12">
        <Container>
          <SectionHead eyebrow="Choose your route" title={<>Choose your direction</>} sub="Select the direction for your motorcycle shipment between New York and Florida." />
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "New York to Florida", href: "#new-york-to-florida" },
              { label: "Florida to New York", href: "#florida-to-new-york" },
            ].map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-6 py-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-blue/60 hover:shadow-lg">
                  <span className="display text-[22px] leading-[1.05] text-navy sm:text-[26px]">{d.label}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange text-white transition group-hover:bg-blue"><Arrow className="h-5 w-5" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── NEW YORK → FLORIDA ────────────────────────────────────────── */}
      <section id="new-york-to-florida" className="scroll-mt-28 bg-[#eaf4fb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="eyebrow mb-2 text-blue">New York to Florida</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">New York to Florida Motorcycle Shipping</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{NY_TO_FL.intro}</p>
            {NY_TO_FL.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="New York to Florida" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a New York to Florida Quote <Arrow className="h-5 w-5" /></a>
          </div>
          <div className="reveal-right relative aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:sticky lg:top-24">
            {nyImg && <Image src={nyImg} alt="Hudson Valley river and wooded hills in New York" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />}
          </div>
        </Container>
      </section>

      {/* ── FLORIDA → NEW YORK ────────────────────────────────────────── */}
      <section id="florida-to-new-york" className="scroll-mt-28 bg-[#e3eefb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="reveal-left relative order-2 aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:order-1 lg:sticky lg:top-24">
            {flImg && <Image src={flImg} alt="Florida waterfront and Miami skyline across the bay" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />}
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-2 text-blue">Florida to New York</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Florida to New York Motorcycle Shipping</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{FL_TO_NY.intro}</p>
            {FL_TO_NY.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="Florida to New York" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a Florida to New York Quote <Arrow className="h-5 w-5" /></a>
          </div>
        </Container>
      </section>

      {/* ── COST ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-2 text-blue">Route overview</p>
            <h2 className="display text-[30px] text-navy sm:text-[38px]">What affects New York &amp; Florida transport cost?</h2>
          </div>
          <p className="text-[16px] leading-relaxed text-slate">
            New York–Florida motorcycle rates depend on direction, exact locations, open or enclosed service, dimensions and loading condition. A trike or oversized touring bike may take more space than a standard motorcycle. Dealer appointments and difficult access can affect the move; provide those details before approving the quote.
          </p>
        </Container>
      </section>

      {/* ── PICKUP WINDOWS ────────────────────────────────────────────── */}
      <section className="bg-navy py-14 text-white lg:py-16">
        <Container>
          <h2 className="display text-[30px] sm:text-[38px]">Pickup windows and estimated transit</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><Clock className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Pickup scheduling</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Seasonal travel and events can create concentrated requests for suitable carriers. Tell us your earliest readiness and receiving flexibility. Pickup is scheduled separately from time in transit.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><RouteIcon className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Time in transit</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Weather, additional stops or special loading can affect the delivery estimate. Pickup is scheduled separately from time in transit.</p>
              </div>
            </div>
          </div>
          <p className="mt-8 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-white/70">
            No fixed rate, mileage, transit-day range or guaranteed date is inserted without a shipment-specific basis. The requested urgency is reviewed against equipment availability, safe operation and receiving arrangements.
          </p>
        </Container>
      </section>

      {/* ── EQUIPMENT ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Transport options" title={<>Choose equipment from the unit&rsquo;s details</>} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {EQUIPMENT.map((e, i) => (
              <li key={e.t} className="card reveal-up p-6" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cloud text-blue"><e.icon className="h-6 w-6" /></span>
                <h3 className="mt-3 text-[18px] font-bold text-navy">{e.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{e.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── PREPARE ───────────────────────────────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Preparation checklist" title={<>Prepare for collection and receiving</>} />
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
            {PREP.map((p, i) => (
              <li key={p} className="reveal-up flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] leading-relaxed text-navy" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue" />{p}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="The process" title={<>How the shipment works</>} />
          <Timeline steps={STEPS} />
        </Container>
      </section>

      {/* ── ROUTE QUESTIONS ───────────────────────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">Route questions</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">New York–Florida motorcycle questions</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal-right"><FaqList faqs={FAQS} /></div>
        </Container>
      </section>

      <CtaBand
        title="Ready to ship between New York and Florida?"
        sub="Choose your direction and send the unit details, pickup and delivery ZIP codes and earliest ready date. We will review the requirements for your shipment."
      />

      {/* ── RELATED LINKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="eyebrow text-muted">Related links</p>
            <Link href="/motorcycle-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Motorcycle Transport <Arrow className="h-4 w-4" /></Link>
            <Link href="/motorcycle-transport/california-florida/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">California–Florida Route <Arrow className="h-4 w-4" /></Link>
            <Link href="/atv-utv-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">ATV &amp; UTV Transport <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>
    </>
  );
}
