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
import { Arrow, Check, Clock, Gear, Layers, Route as RouteIcon, Shield, Trailer, Truck } from "@/components/Icons";
import { LandingHero } from "@/components/Landing";
import { Breadcrumbs, CtaBand, FaqList, SectionHead } from "@/components/Sections";
import { Timeline } from "@/components/Visual";

/**
 * Combined route page: California ↔ Texas heavy & industrial equipment transport.
 * Built 1:1 to 03_California_Texas_Machinery_Content.txt (2026-11-15).
 * Both directions live in this page as anchored sections (#california-to-texas, #texas-to-california);
 * those are fragments, not separate indexable pages.
 */
const PATH = "/heavy-equipment-transport/california-texas/";

export const metadata: Metadata = meta(
  "California & Texas Industrial Machinery Transport | MCC",
  "Ship heavy and industrial machinery between California and Texas. Both directions, packaging, loading, receiving and route needs reviewed. Request a quote.",
  PATH,
);

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Heavy Equipment & Machinery", href: "/heavy-equipment-transport/" },
  { name: "California and Texas", href: PATH },
];

const TRUST_LINE = "No upfront deposit before carrier assignment and dispatch • Carrier insurance reviewed • One point of contact";

const CA_TO_TX = {
  intro: "California to Texas industrial machinery shipping requires more than matching a truck to a ZIP code. A manufacturing relocation, equipment resale or agricultural transfer may involve skids, crates, separate components and timed rigging appointments.",
  blocks: [
    { h: "California preparation and release", p: "For the Los Angeles area, Inland Empire, Bay Area, Sacramento or another collection, identify the responsible preparation provider and when the equipment is ready for transport. Confirm packaged dimensions, piece weights, skid/base details and any supplied handling or center-of-gravity information." },
    { h: "Texas receiving and unloading", p: "For Houston, Dallas–Fort Worth, Austin, San Antonio, El Paso or another destination, confirm handling provider availability, loading area, gate access and receiving hours. Inside placement and installation require a separately agreed scope." },
    { h: "Multiple-piece inventory", p: "Record each skid, crate, machine and detached component. Identify whether pieces must arrive in a particular sequence or whether different carrier arrangements are acceptable before booking." },
  ],
};

const TX_TO_CA = {
  intro: "Texas to California heavy equipment transport is reviewed from the prepared load, handling information, access and agreed responsibilities before carrier coordination. Keep the machine inventory and supporting information together so providers can assess the actual shipment.",
  blocks: [
    { h: "Texas load acceptance", p: "Provide photos, shipping drawings where available, actual prepared weight/dimensions and the handling plan. A stationary machine without suitable support or lifting arrangements may need further preparation before the carrier can accept it." },
    { h: "California facility constraints", p: "Confirm receiving appointment, access, overhead clearance and space for the loaded combination and handling equipment. Any site constraint affecting unloading or handover must be disclosed before dispatch." },
    { h: "Route and provider coordination", p: "The carrier reviews route suitability and any required arrangements from the loaded configuration. Confirm the division between highway transport and separately arranged rigging, packing or placement; do not assume the shortest road route or a fixed delivery day." },
  ],
};

const OPTIONS = [
  { icon: Trailer, t: "Flatbed and step-deck configurations", d: "Suitable for some machinery, skids or crates after weight, deck support, loading access and the proposed loaded dimensions are assessed." },
  { icon: Truck, t: "Lowboy, RGN and specialist equipment", d: "These may be reviewed for taller, heavier or unusual loads. Trailer and axle choices depend on actual support needs and the agreed route; no universal setup fits every machine." },
  { icon: Gear, t: "Rigging and lifting coordination", d: "Confirm the lifting or rigging provider, approved handling information, appointment and responsibilities at each end. Outside services are included only when expressly agreed in the quote." },
  { icon: Layers, t: "Preparation and separate components", d: "Packing, decommissioning, disassembly, reassembly and installation are distinct from highway transport. Identify each task and its responsible qualified provider before approving the move." },
];

const PREP = [
  "Have the owner or qualified provider confirm the transport configuration, weight and packaging/support information.",
  "Identify each machine, skid, crate and separate component on the shipping inventory.",
  "Arrange required decommissioning, disconnection, protective packaging and approved handling preparation with the responsible provider.",
  "Disclose fluids, batteries, fuel systems, leaks and other facts the transport and handling providers need to assess acceptance.",
  "Confirm loading and unloading appointments, responsible providers, access and receiving readiness.",
  "Document condition and the agreed handover scope at both ends.",
];

const STEPS = [
  { t: "Send the real shipment details", d: "Provide the load or vehicle, pickup and delivery ZIP codes, condition, readiness and any loading or receiving restrictions." },
  { t: "Review the agreed transport plan", d: "We review suitable equipment and providers, pickup access, receiving arrangements, quoted inclusions and payment terms before dispatch." },
  { t: "Pickup, updates and delivery", d: "Document condition, coordinate updates with your transport contact and complete the handover inspection with the receiving party." },
];

const FAQS: FAQ[] = [
  { q: "Can you coordinate a machine relocation from California to Texas?", a: "We can review the highway transport and expressly agreed support arrangements. Provide the machine inventory, prepared specifications and responsible loading and receiving providers." },
  { q: "Is rigging the same as transport?", a: "No. Rigging, preparation, highway transport, inside placement and installation have separate responsibilities. Confirm which tasks and providers are included." },
  { q: "Can several skids travel together?", a: "It depends on weight distribution, dimensions, support, securement and available equipment. List each piece and disclose sequencing needs." },
  { q: "Does heavy machinery always require a route survey?", a: "No blanket service is assumed. Any survey or specialist route review is determined for the actual shipment and confirmed in the scope." },
  { q: "Who transports the shipment and what coverage applies?", a: "MCC Bound Legends coordinates your shipment. The assigned motor carrier performs the physical transport. Carrier authority and applicable insurance are reviewed before dispatch. Ask for the coverage details for your transport method; limits, exclusions and any separate handling terms apply." },
  { q: "When is payment due?", a: "No upfront deposit is collected before carrier assignment and dispatch. Your booking agreement states the payment schedule, the balance due to the carrier and accepted payment methods." },
];

export default function CaliforniaTexasHeavyPage() {
  const hero = photo("svc-heavy-equipment-transport");
  const caImg = photo("heavy-route-california");
  const txImg = photo("heavy-route-texas");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema("California and Texas Industrial Machinery Transport", metadata.description as string, "heavy-equipment-transport/california-texas"),
          faqSchema(FAQS),
        ]}
      />

      <LandingHero
        slides={hero ? [{ src: hero, alt: "Semi truck hauling heavy industrial machinery on a multi-axle lowboy at sunset" }] : []}
        full
        fallbackIcon="industrial"
        crumbs={<div className="mb-4"><Breadcrumbs items={crumbs} light /></div>}
        eyebrow="California & Texas • Heavy & Industrial Equipment Transport"
        lines={["Industrial Machinery Transport", "Between California and Texas"]}
        sub="California to Texas industrial machinery shipping and Texas to California heavy equipment transport require more than matching a truck to a ZIP code. MCC reviews the prepared load, handling information, access and agreed responsibilities before carrier coordination."
        formDefault="heavy-industrial"
        onlyTypes={["Heavy / Industrial Machinery", "Something Else"]}
        formTitle="Get Your California & Texas Transport Quote"
        formNote={TRUST_LINE}
        serviceName="California and Texas Industrial Machinery Transport"
        showDirection
        directionOptions={["California to Texas", "Texas to California"]}
        directionAnchors={{ "#california-to-texas": "California to Texas", "#texas-to-california": "Texas to California" }}
      />

      {/* ── ROUTE OVERVIEW ────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-2 text-blue">Route overview</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">One corridor, both directions</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-slate">
            A manufacturing relocation, equipment resale or agricultural transfer may involve skids, crates, separate components and timed rigging appointments. Keep the machine inventory and supporting information together so the carrier and handling providers can assess the actual shipment rather than an unprepared machine on the factory floor.
          </p>
        </Container>
      </section>

      {/* ── CHOOSE YOUR DIRECTION ─────────────────────────────────────── */}
      <section className="bg-cloud py-12">
        <Container>
          <SectionHead eyebrow="Choose your route" title={<>Choose your direction</>} sub="Select the direction for your machinery shipment between California and Texas." />
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "California to Texas", href: "#california-to-texas" },
              { label: "Texas to California", href: "#texas-to-california" },
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

      {/* ── CALIFORNIA → TEXAS ────────────────────────────────────────── */}
      <section id="california-to-texas" className="scroll-mt-28 bg-[#eaf4fb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="eyebrow mb-2 text-blue">California to Texas</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">California to Texas Industrial Machinery Transport</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{CA_TO_TX.intro}</p>
            {CA_TO_TX.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="California to Texas" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a California to Texas Quote <Arrow className="h-5 w-5" /></a>
          </div>
          <div className="reveal-right relative aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:sticky lg:top-24">
            {caImg && <Image src={caImg} alt="California coastal highway above the Pacific Ocean" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />}
          </div>
        </Container>
      </section>

      {/* ── TEXAS → CALIFORNIA ────────────────────────────────────────── */}
      <section id="texas-to-california" className="scroll-mt-28 bg-[#e3eefb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="reveal-left relative order-2 aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:order-1 lg:sticky lg:top-24">
            {txImg && <Image src={txImg} alt="Austin skyline beyond green Texas hills and wildflowers" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />}
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-2 text-blue">Texas to California</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Texas to California Industrial Machinery Transport</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{TX_TO_CA.intro}</p>
            {TX_TO_CA.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="Texas to California" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a Texas to California Quote <Arrow className="h-5 w-5" /></a>
          </div>
        </Container>
      </section>

      {/* ── COST ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-2 text-blue">Route overview</p>
            <h2 className="display text-[30px] text-navy sm:text-[38px]">What affects California &amp; Texas transport cost?</h2>
          </div>
          <p className="text-[16px] leading-relaxed text-slate">
            California–Texas industrial transport is quoted from actual shipping dimensions and weight, carrier configuration, route, loading/receiving support and scheduling. A factory machine on an engineered skid and a mobile farm unit may need entirely different services. Separate the transport price from outside preparation or installation work.
          </p>
        </Container>
      </section>

      {/* ── PICKUP WINDOWS ────────────────────────────────────────────── */}
      <section className="bg-navy py-14 text-white lg:py-16">
        <Container>
          <h2 className="display text-[30px] sm:text-[38px]">Pickup windows and transit planning</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><Clock className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Align both ends</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Align carrier scheduling with equipment release and both handling appointments. Incomplete specifications, unprepared bases or a receiving facility that cannot unload may prevent the move from proceeding.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><RouteIcon className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Shipment-specific estimates</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Supply the information early and request a shipment-specific pickup window and transit estimate.</p>
              </div>
            </div>
          </div>
          <p className="mt-8 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-white/70">
            No invented fixed rates, mileage, transit-day promises or guaranteed carrier availability.
          </p>
        </Container>
      </section>

      {/* ── OPTIONS ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Transport and handling options" title={<>Transport and handling options</>} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {OPTIONS.map((m, i) => (
              <li key={m.t} className="card reveal-up flex gap-4 p-6" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cloud text-blue"><m.icon className="h-6 w-6" /></span>
                <span>
                  <h3 className="text-[18px] font-bold text-navy">{m.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate">{m.d}</p>
                </span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-4xl rounded-xl border border-line bg-cloud p-5 text-center text-[14px] leading-relaxed text-slate">
            <Shield className="mr-1.5 inline h-4 w-4 text-blue" />
            MCC Bound Legends coordinates your shipment. The assigned motor carrier performs the physical transport. Carrier authority and applicable insurance are reviewed before dispatch. Ask for the coverage details for your transport method; limits, exclusions and any separate handling terms apply.
          </p>
        </Container>
      </section>

      {/* ── BEFORE PICKUP ─────────────────────────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Preparation checklist" title={<>Before pickup</>} />
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
          <SectionHead eyebrow="The process" title={<>How your shipment works</>} />
          <Timeline steps={STEPS} />
        </Container>
      </section>

      {/* ── ROUTE QUESTIONS ───────────────────────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">Route questions</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">California–Texas machinery questions</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal-right"><FaqList faqs={FAQS} /></div>
        </Container>
      </section>

      <CtaBand
        title="Ready to ship between California and Texas?"
        sub="Choose your direction and send the actual shipment details, ZIP codes and earliest ready date. We will review the requirements and available options."
      />

      {/* ── RELATED LINKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="eyebrow text-muted">Related links</p>
            <Link href="/heavy-equipment-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Heavy Equipment &amp; Machinery Transport <Arrow className="h-4 w-4" /></Link>
            <Link href="/heavy-equipment-transport/texas-florida/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Texas–Florida Route <Arrow className="h-4 w-4" /></Link>
            <Link href="/construction-equipment-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Construction Equipment Transport <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>
    </>
  );
}
