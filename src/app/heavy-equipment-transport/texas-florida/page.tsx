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
 * Combined route page: Texas ↔ Florida heavy & industrial equipment transport.
 * Built 1:1 to 02_Texas_Florida_Heavy_Equipment_Content.txt (2026-11-15).
 * Both directions live in this page as anchored sections (#texas-to-florida, #florida-to-texas);
 * those are fragments, not separate indexable pages.
 */
const PATH = "/heavy-equipment-transport/texas-florida/";

export const metadata: Metadata = meta(
  "Texas & Florida Heavy Machinery Transport | MCC",
  "Move industrial machinery, generators and agricultural equipment between Texas and Florida. Both directions, prepared load and handling scope reviewed.",
  PATH,
);

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Heavy Equipment & Machinery", href: "/heavy-equipment-transport/" },
  { name: "Texas and Florida", href: PATH },
];

const TRUST_LINE = "No upfront deposit before carrier assignment and dispatch • Carrier insurance reviewed • One point of contact";

const TX_TO_FL = {
  intro: "Texas to Florida industrial machinery transport needs a defined load and handling scope. This corridor may involve a skid-mounted generator, a factory machine or agricultural equipment changing locations. Stationary machinery may depend on lifting crews and prepared bases rather than drive-on loading.",
  blocks: [
    { h: "Texas factory and equipment release", p: "For Houston, Dallas–Fort Worth, Austin, San Antonio or another location, confirm that the load is disconnected, released and prepared by the responsible qualified provider. Supply shipping drawings, weight, package dimensions and the complete piece inventory where relevant." },
    { h: "Florida unloading and handover", p: "Confirm the receiving facility's gate, dock, crane or forklift arrangements, appointment and authorized contact. State whether the quoted scope ends at highway delivery or includes separately arranged rigging or inside placement." },
    { h: "Generator and skid details", p: "For power equipment, include the full enclosure and base, known support/handling information and any fuel, battery or fluid facts relevant to acceptance. Do not quote from the bare machine's footprint if the shipped configuration is larger." },
  ],
};

const FL_TO_TX = {
  intro: "Florida to Texas industrial machinery transport is reviewed on its own prepared load and schedule, rather than assuming every part of an earlier move is included. Provide the shipping configuration and identify who is responsible for preparation, loading and receiving.",
  blocks: [
    { h: "Florida pickup preparation", p: "Identify the machinery, packaged or unpackaged status, loose components and available handling provider. Access through a factory door or a warehouse loading area may be different from the transport trailer's road access; both must be reviewed." },
    { h: "Texas delivery coordination", p: "Arrange a receiving appointment and confirm that the responsible handling provider is ready. Agricultural or rural destinations may need a different approach and staging plan from an industrial dock." },
    { h: "Scope and responsibility", p: "Discuss any separate crane, rigging, packing or placement service in writing. The reverse shipment is reviewed on its own prepared load and schedule, rather than assuming every part of an earlier move is included." },
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
  { q: "Can a generator move from Texas to a Florida facility?", a: "It can be reviewed from full enclosure/skid dimensions, weight, support and handling information, access and readiness. Relevant fluid or battery information must be disclosed." },
  { q: "Does the carrier provide the forklift at delivery?", a: "Not automatically. Confirm which qualified provider supplies loading and unloading support and whether it is included in the quote." },
  { q: "Can a farm machine travel with its implements?", a: "List every piece and the intended transport configuration. Shared transport depends on support, capacity, dimensions and securement acceptance." },
  { q: "Are equipment disconnect and installation included?", a: "Those are separate scopes unless expressly arranged with the responsible qualified providers." },
  { q: "Who transports the shipment and what coverage applies?", a: "MCC Bound Legends coordinates your shipment. The assigned motor carrier performs the physical transport. Carrier authority and applicable insurance are reviewed before dispatch. Ask for the coverage details for your transport method; limits, exclusions and any separate handling terms apply." },
  { q: "When is payment due?", a: "No upfront deposit is collected before carrier assignment and dispatch. Your booking agreement states the payment schedule, the balance due to the carrier and accepted payment methods." },
];

export default function TexasFloridaHeavyPage() {
  const hero = photo("svc-heavy-equipment-transport");
  const txImg = photo("heavy-route-texas");
  const flImg = photo("heavy-route-florida");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema("Texas and Florida Heavy Machinery Transport", metadata.description as string, "heavy-equipment-transport/texas-florida"),
          faqSchema(FAQS),
        ]}
      />

      <LandingHero
        slides={hero ? [{ src: hero, alt: "Semi truck hauling heavy industrial machinery on a multi-axle lowboy at sunset" }] : []}
        full
        fallbackIcon="industrial"
        crumbs={<div className="mb-4"><Breadcrumbs items={crumbs} light /></div>}
        eyebrow="Texas & Florida • Heavy & Industrial Equipment Transport"
        lines={["Heavy Equipment & Machinery Transport", "Between Texas and Florida"]}
        sub="Texas to Florida heavy machinery transport and Florida to Texas industrial equipment shipping need a defined load and handling scope. MCC reviews prepared dimensions, weight, support information, site access and the providers involved at each end."
        formDefault="heavy-industrial"
        onlyTypes={["Heavy / Industrial Machinery", "Something Else"]}
        formTitle="Get Your Texas & Florida Transport Quote"
        formNote={TRUST_LINE}
        serviceName="Texas and Florida Heavy Machinery Transport"
        showDirection
        directionOptions={["Texas to Florida", "Florida to Texas"]}
        directionAnchors={{ "#texas-to-florida": "Texas to Florida", "#florida-to-texas": "Florida to Texas" }}
      />

      {/* ── ROUTE OVERVIEW ────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-2 text-blue">Route overview</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">One corridor, both directions</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-slate">
            This corridor may involve a skid-mounted generator, a factory machine or agricultural equipment changing locations. Stationary machinery may depend on lifting crews and prepared bases rather than drive-on loading. Provide the shipping configuration and identify who is responsible for preparation, loading and receiving.
          </p>
        </Container>
      </section>

      {/* ── CHOOSE YOUR DIRECTION ─────────────────────────────────────── */}
      <section className="bg-cloud py-12">
        <Container>
          <SectionHead eyebrow="Choose your route" title={<>Choose your direction</>} sub="Select the direction for your machinery shipment between Texas and Florida." />
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "Texas to Florida", href: "#texas-to-florida" },
              { label: "Florida to Texas", href: "#florida-to-texas" },
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

      {/* ── TEXAS → FLORIDA ───────────────────────────────────────────── */}
      <section id="texas-to-florida" className="scroll-mt-28 bg-[#eaf4fb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="eyebrow mb-2 text-blue">Texas to Florida</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Texas to Florida Industrial Machinery Transport</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{TX_TO_FL.intro}</p>
            {TX_TO_FL.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="Texas to Florida" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a Texas to Florida Quote <Arrow className="h-5 w-5" /></a>
          </div>
          <div className="reveal-right relative aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:sticky lg:top-24">
            {txImg && <Image src={txImg} alt="Austin skyline beyond green Texas hills and wildflowers" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />}
          </div>
        </Container>
      </section>

      {/* ── FLORIDA → TEXAS ───────────────────────────────────────────── */}
      <section id="florida-to-texas" className="scroll-mt-28 bg-[#e3eefb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="reveal-left relative order-2 aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:order-1 lg:sticky lg:top-24">
            {flImg && <Image src={flImg} alt="Miami skyline across a turquoise Florida bay" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />}
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-2 text-blue">Florida to Texas</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Florida to Texas Industrial Machinery Transport</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{FL_TO_TX.intro}</p>
            {FL_TO_TX.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="Florida to Texas" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a Florida to Texas Quote <Arrow className="h-5 w-5" /></a>
          </div>
        </Container>
      </section>

      {/* ── COST ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-2 text-blue">Route overview</p>
            <h2 className="display text-[30px] text-navy sm:text-[38px]">What affects Texas &amp; Florida transport cost?</h2>
          </div>
          <p className="text-[16px] leading-relaxed text-slate">
            Texas–Florida industrial machinery pricing reflects the full prepared load, support requirements, carrier equipment, direction, site appointments and any agreed specialist services. A crane appointment, additional skid or component move can change the scope. Confirm inclusions instead of assuming a freight price covers decommissioning or installation.
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
                <h3 className="text-[20px] font-bold">Dependencies before pickup</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">A heavy machinery move may have dependencies before pickup: preparation, loading providers, suitable carrier capacity and any required route approvals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><RouteIcon className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Receiving readiness</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Receiving readiness matters too. A priority request is reviewed around these dependencies and does not eliminate them.</p>
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
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Texas–Florida machinery questions</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal-right"><FaqList faqs={FAQS} /></div>
        </Container>
      </section>

      <CtaBand
        title="Ready to ship between Texas and Florida?"
        sub="Choose your direction and send the actual shipment details, ZIP codes and earliest ready date. We will review the requirements and available options."
      />

      {/* ── RELATED LINKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="eyebrow text-muted">Related links</p>
            <Link href="/heavy-equipment-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Heavy Equipment &amp; Machinery Transport <Arrow className="h-4 w-4" /></Link>
            <Link href="/heavy-equipment-transport/california-texas/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">California–Texas Route <Arrow className="h-4 w-4" /></Link>
            <Link href="/construction-equipment-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Construction Equipment Transport <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>
    </>
  );
}
