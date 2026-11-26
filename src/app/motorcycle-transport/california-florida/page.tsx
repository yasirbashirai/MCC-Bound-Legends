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
 * Combined route page: California ↔ Florida motorcycle shipping.
 * Built 1:1 to 03_California_Florida_Route_Content.txt (2026-11-15).
 * Both directions live in this page as anchored sections (#california-to-florida, #florida-to-california);
 * those are fragments, not separate indexable pages.
 */
const PATH = "/motorcycle-transport/california-florida/";

export const metadata: Metadata = meta(
  "California & Florida Motorcycle Shipping | MCC",
  "Move a motorcycle between California and Florida. Both directions, open or enclosed transport, custom-bike details and non-running loading reviewed.",
  PATH,
);

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Motorcycle & Powersports", href: "/motorcycle-transport/" },
  { name: "California and Florida", href: PATH },
];

const TRUST_LINE = "No upfront deposit before carrier assignment • Carrier insurance checked before dispatch • One point of contact";

const CA_TO_FL = {
  intro: "California to Florida motorcycle shipping is a coast-to-coast move that needs clear pickup, handling and receiving arrangements. Whether it is an online purchase, a relocation or a bike returning after a seasonal stay, the exact locations matter. A San Diego-to-Tampa move differs from a Sacramento-to-Miami shipment.",
  blocks: [
    { h: "California seller and dealer collection", p: "For the Los Angeles area, San Diego, the Bay Area, Sacramento or another pickup, confirm release requirements and keys. Identify low ground clearance, wide handlebars, luggage and custom components before selecting a loading system. Share any limited dealer collection hours." },
    { h: "Florida destination access", p: "Confirm the receiving location and contact for Orlando, Tampa, Jacksonville, South Florida or another community. Gated properties, storage facilities and residential streets may require advance coordination or an alternative accessible unloading point." },
    { h: "Cross-country handling", p: "Discuss open or enclosed service, condition documentation and any special loading needs. Ask how the carrier will handle your specific bike; do not assume that a coast-to-coast move includes a dedicated truck or uninterrupted direct service." },
  ],
};

const FL_TO_CA = {
  intro: "Florida to California motorcycle transport is planned around your actual ready date and the machine's condition. Provide real ZIP codes, dimensions, condition and the date the bike can be released so the carrier and loading setup can be matched.",
  blocks: [
    { h: "Florida readiness and loading", p: "Supply keys, current photos and a precise description of running and rolling condition. A locked steering system, flat tires or unstable custom build may need a different loading arrangement from a motorcycle that simply will not start." },
    { h: "California receiving details", p: "Give the final address and receiving hours. For dense urban areas, restricted properties or steep drives, discuss safe truck access and unloading space before dispatch. Arrange a contact authorized to complete the delivery inspection." },
    { h: "Westbound schedule and pricing", p: "Request a westbound quote for the actual ready date. Capacity, direction and additional collection stops can affect the plan. If a move or event deadline matters, disclose it early and review available options without assuming the opposite direction's rate or transit estimate." },
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
  { q: "Is a coast-to-coast motorcycle shipment always enclosed?", a: "No automatic method applies. Discuss open and enclosed options, the carrier's equipment and the protection you want for your specific machine." },
  { q: "Will my motorcycle be ridden across the country?", a: "This is carrier transport of the motorcycle, not a ride-away service. Confirm the agreed method and handling arrangements in the booking details." },
  { q: "Can you ship a non-running motorcycle from Florida to California?", a: "It may be possible with a suitable loading and unloading plan. Explain rolling, steering, braking and key restrictions and provide photos before a carrier is selected." },
  { q: "Can two bikes travel together?", a: "We can review a multi-unit request. Supply each bike's dimensions, condition and release details; shared collection or delivery does not by itself guarantee one carrier or one pickup time." },
  { q: "What insurance applies?", a: "MCC Bound Legends coordinates the shipment; the assigned motor carrier performs the physical transport. Carrier authority and applicable insurance are verified before dispatch. Ask for policy details, limits and exclusions for the agreed transport method." },
  { q: "When is payment due?", a: "No upfront deposit is collected before carrier assignment. Review the booking agreement for the payment schedule, balance and accepted methods." },
];

export default function CaliforniaFloridaMotorcyclePage() {
  const hero = photo("svc-motorcycle-transport");
  const caImg = photo("scenery-california");
  const flImg = photo("scenery-florida");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema("California and Florida Motorcycle Shipping", metadata.description as string, "motorcycle-transport/california-florida"),
          faqSchema(FAQS),
        ]}
      />

      <LandingHero
        slides={hero ? [{ src: hero, alt: "Pickup towing an enclosed trailer loaded with motorcycles at sunset" }] : []}
        full
        fallbackIcon="motorcycle"
        crumbs={<div className="mb-4"><Breadcrumbs items={crumbs} light /></div>}
        eyebrow="California & Florida • Motorcycle & Powersports Transport"
        lines={["Motorcycle Shipping Between", "California and Florida"]}
        sub="California to Florida motorcycle shipping and Florida to California bike transport are long-distance moves that need clear pickup, handling and receiving arrangements. MCC Bound Legends reviews the machine and coordinates a suitable motor carrier."
        formDefault="motorcycle"
        onlyTypes={["Motorcycle", "ATV / UTV / Golf Cart", "Something Else"]}
        formTitle="Get Your California & Florida Transport Quote"
        formNote={TRUST_LINE}
        serviceName="California and Florida Motorcycle Shipping"
        showDirection
        directionOptions={["California to Florida", "Florida to California"]}
        directionAnchors={{ "#california-to-florida": "California to Florida", "#florida-to-california": "Florida to California" }}
      />

      {/* ── ROUTE OVERVIEW ────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-2 text-blue">Route overview</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Coast to coast, both directions</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-slate">
            Whether the shipment is an online purchase, a relocation or a motorcycle returning after a seasonal stay, the exact locations matter. A San Diego-to-Tampa move differs from a Sacramento-to-Miami shipment. Provide actual ZIP codes, dimensions, condition and the date the bike can be released.
          </p>
        </Container>
      </section>

      {/* ── CHOOSE YOUR DIRECTION ─────────────────────────────────────── */}
      <section className="bg-cloud py-12">
        <Container>
          <SectionHead eyebrow="Choose your route" title={<>Choose your direction</>} sub="Get a quote and plan coast-to-coast motorcycle shipping between California and Florida." />
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "California to Florida", href: "#california-to-florida" },
              { label: "Florida to California", href: "#florida-to-california" },
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

      {/* ── CALIFORNIA → FLORIDA ──────────────────────────────────────── */}
      <section id="california-to-florida" className="scroll-mt-28 bg-[#eaf4fb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="eyebrow mb-2 text-blue">California to Florida</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">California to Florida Motorcycle Shipping</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{CA_TO_FL.intro}</p>
            {CA_TO_FL.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="California to Florida" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a California to Florida Quote <Arrow className="h-5 w-5" /></a>
          </div>
          <div className="reveal-right relative aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:sticky lg:top-24">
            {caImg && <Image src={caImg} alt="California coastal highway above the Pacific Ocean" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />}
          </div>
        </Container>
      </section>

      {/* ── FLORIDA → CALIFORNIA ──────────────────────────────────────── */}
      <section id="florida-to-california" className="scroll-mt-28 bg-[#e3eefb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="reveal-left relative order-2 aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:order-1 lg:sticky lg:top-24">
            {flImg && <Image src={flImg} alt="Florida waterfront and Miami skyline across the bay" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />}
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-2 text-blue">Florida to California</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Florida to California Motorcycle Shipping</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{FL_TO_CA.intro}</p>
            {FL_TO_CA.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="Florida to California" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a Florida to California Quote <Arrow className="h-5 w-5" /></a>
          </div>
        </Container>
      </section>

      {/* ── COST ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-2 text-blue">Route overview</p>
            <h2 className="display text-[30px] text-navy sm:text-[38px]">What affects California &amp; Florida transport cost?</h2>
          </div>
          <p className="text-[16px] leading-relaxed text-slate">
            California–Florida motorcycle shipping is priced from direction, location, carrier availability, dimensions, open or enclosed service and handling needs. A crate or lift requirement, a low-clearance custom machine or multiple bikes can change the quote. Review what is included and the payment schedule before approval.
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
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Cross-country distance is only one scheduling factor. The pickup window, carrier route, intermediate stops, receiving hours and weather all matter.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><RouteIcon className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Time in transit</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Ask for the estimate for the actual shipment instead of applying a fixed number of days to every California–Florida move.</p>
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
            <h2 className="display text-[32px] text-navy sm:text-[40px]">California–Florida motorcycle questions</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal-right"><FaqList faqs={FAQS} /></div>
        </Container>
      </section>

      <CtaBand
        title="Ready to ship between California and Florida?"
        sub="Choose your direction and send the unit details, pickup and delivery ZIP codes and earliest ready date. We will review the requirements for your shipment."
      />

      {/* ── RELATED LINKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="eyebrow text-muted">Related links</p>
            <Link href="/motorcycle-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Motorcycle Transport <Arrow className="h-4 w-4" /></Link>
            <Link href="/motorcycle-transport/new-york-florida/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">New York–Florida Route <Arrow className="h-4 w-4" /></Link>
            <Link href="/atv-utv-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">ATV &amp; UTV Transport <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>
    </>
  );
}
