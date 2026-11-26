import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { getPage, type FAQ } from "@/data/services";
import { reviews, type Review } from "@/data/reviews";
import { photo } from "@/lib/images";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { Arrow, Check, Clock, Doc, Gear, Layers, Pin, Route, Ruler, Shield, Trailer, Truck } from "@/components/Icons";
import { LandingHero } from "@/components/Landing";
import { FaqList, ReviewCard, SectionHead, Breadcrumbs, CtaBand } from "@/components/Sections";
import { Timeline } from "@/components/Visual";

/**
 * Heavy & Industrial Equipment main page — updated 1:1 to the client handoff of 2026-11-15
 * (01_Heavy_Equipment_Main_Page_Content.txt). Replaces the generic [slug] render for this slug so the
 * section order and copy match the document: hero → 7 category cards → NEW route section → feature →
 * methods & requirements → shipment concerns → costs & timing → preparation → process & reviews →
 * FAQ → related services → final CTA.
 */
const PATH = "/heavy-equipment-transport/";

export const metadata: Metadata = meta(
  "Heavy Equipment & Machinery Transport | MCC Bound Legends",
  "Move industrial machinery, generators, agricultural equipment and specialty loads nationwide. Specifications, loading and route needs reviewed. Request a quote.",
  PATH,
);

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Heavy Equipment & Machinery", href: PATH },
];

const TRUST_LINE = "No upfront deposit before carrier assignment and dispatch • Carrier insurance reviewed • One point of contact";

/* ── 4. The seven existing photographic category cards ──────────────── */
const CATEGORIES = [
  { title: "Industrial machinery & presses", d: "Send shipping drawings, prepared dimensions, weight and handling requirements from the manufacturer or qualified provider.", img: "type-industrial-machinery-and-presses", alt: "Industrial machinery and presses loaded on a heavy-haul trailer" },
  { title: "Agricultural equipment & farm machinery", d: "Describe the transport configuration, removable implements, wheel or track width, and loading arrangements.", img: "type-agricultural-equipment-and-farm-machinery", alt: "Agricultural equipment loaded for highway transport" },
  { title: "Combines, sprayers & tractors", d: "Include headers, booms, attachments and detached components in the inventory and prepared measurements.", img: "type-combines-sprayers-and-tractors", alt: "Combine and sprayer prepared for transport on a lowboy" },
  { title: "Manufacturing equipment", d: "Confirm decommissioning, protective preparation, base or skid requirements and collection and receiving appointments.", img: "type-manufacturing-equipment", alt: "Manufacturing equipment secured on a flatbed trailer" },
  { title: "Generators & transformers", d: "Provide the full enclosure or skid dimensions, actual weight, handling information and relevant fluid, battery or fuel details.", img: "type-generators-and-transformers", alt: "Skid-mounted generator loaded for heavy transport" },
  { title: "Oversized & overweight equipment", d: "Send verified dimensions, weight and support information for trailer and route review. Permits and specialist services depend on the actual loaded combination.", img: "type-oversized-and-overweight-equipment", alt: "Oversized machinery on a multi-axle heavy-haul trailer" },
  { title: "Specialty machinery & crated loads", d: "Identify each package, prepared dimensions, weight, approved handling points and available lifting support at both ends.", img: "type-specialty-machinery-and-crated-loads", alt: "Crated specialty machinery on a flatbed trailer" },
];

/* ── 5. Route section — two corridor cards, two direction links each ─── */
const ROUTES = [
  {
    title: "Texas ↔ Florida",
    img: "heavy-route-texas",
    alt: "Austin skyline beyond green Texas hills and wildflowers",
    links: [
      { label: "Texas to Florida", href: "/heavy-equipment-transport/texas-florida/#texas-to-florida" },
      { label: "Florida to Texas", href: "/heavy-equipment-transport/texas-florida/#florida-to-texas" },
    ],
  },
  {
    title: "California ↔ Texas",
    img: "heavy-route-california",
    alt: "California coastal highway above the Pacific Ocean",
    links: [
      { label: "California to Texas", href: "/heavy-equipment-transport/california-texas/#california-to-texas" },
      { label: "Texas to California", href: "/heavy-equipment-transport/california-texas/#texas-to-california" },
    ],
  },
];

/* ── 7. Transport options and responsibilities ───────────────────────── */
const METHODS = [
  { icon: Trailer, t: "Flatbed and step-deck configurations", d: "Suitable for some machinery, skids or crates after weight, deck support, loading access and the proposed loaded dimensions are assessed." },
  { icon: Truck, t: "Lowboy, RGN and specialist equipment", d: "These may be reviewed for taller, heavier or unusual loads. Trailer and axle choices depend on actual support needs and the agreed route; no universal setup fits every machine." },
  { icon: Gear, t: "Rigging and lifting coordination", d: "Confirm the lifting or rigging provider, approved handling information, appointment and responsibilities at each end. Outside services are included only when expressly agreed in the quote." },
  { icon: Layers, t: "Preparation and separate components", d: "Packing, decommissioning, disassembly, reassembly and installation are distinct from highway transport. Identify each task and its responsible qualified provider before approving the move." },
];

/* ── 8. What we review before dispatch ───────────────────────────────── */
const REVIEWED = [
  { icon: Ruler, t: "The complete shipping configuration", d: "Supply actual length, width, height, weight and piece count after packaging or preparation. Label estimated information and identify who can verify it." },
  { icon: Doc, t: "Support and handling information", d: "Provide available drawings, skid requirements, lifting points and center-of-gravity information from the manufacturer or qualified handling provider, when relevant." },
  { icon: Pin, t: "Loading and receiving capability", d: "Confirm crane, forklift, dock or rigging availability, site access, rated capability as verified by the provider, and the appointment window." },
  { icon: Route, t: "Transport route and sequencing", d: "Loaded dimensions, axle arrangement, permit conditions and receiving readiness shape the move. Any route survey or specialist assessment is confirmed as part of the agreed scope." },
];

/* ── 9. Questions that affect the shipment ───────────────────────────── */
const SHIPMENT_QS = [
  { q: "Is loading included?", a: "Not automatically. State who supplies rigging or lifting support and whether those services are in the quoted amount. Highway transport and inside placement are different scopes." },
  { q: "Can it move without its original crate?", a: "Provide the manufacturer's or qualified provider's packaging, support and handling requirements. The carrier must accept a workable prepared load before collection." },
  { q: "Will the load need permits?", a: "Requirements depend on the loaded combination and route. We review them with the carrier; do not infer permit needs from a machine-only dimension or a fixed nationwide threshold." },
  { q: "Can you move equipment between factories?", a: "Yes, subject to the actual shipment and support arrangements. Confirm disconnection, release, loading, receiving and any separate placement or installation work before booking." },
];

/* ── 12. Before pickup ───────────────────────────────────────────────── */
const PREP = [
  "Have the owner or qualified provider confirm the transport configuration, weight and packaging/support information.",
  "Identify each machine, skid, crate and separate component on the shipping inventory.",
  "Arrange required decommissioning, disconnection, protective packaging and approved handling preparation with the responsible provider.",
  "Disclose fluids, batteries, fuel systems, leaks and other facts the transport and handling providers need to assess acceptance.",
  "Confirm loading and unloading appointments, responsible providers, access and receiving readiness.",
  "Document condition and the agreed handover scope at both ends.",
];

/* ── 13. How the shipment works ──────────────────────────────────────── */
const STEPS = [
  { t: "Send the real shipment details", d: "Provide the load or vehicle, pickup and delivery ZIP codes, condition, readiness and any loading or receiving restrictions." },
  { t: "Review the agreed transport plan", d: "We review suitable equipment and providers, pickup access, receiving arrangements, quoted inclusions and payment terms before dispatch." },
  { t: "Pickup, updates and delivery", d: "Document condition, coordinate updates with your transport contact and complete the handover inspection with the receiving party." },
];

/* ── 14. FAQs ────────────────────────────────────────────────────────── */
const FAQS: FAQ[] = [
  { q: "How is this different from construction equipment transport?", a: "This page focuses on industrial, agricultural and specialty loads, including machines that may require packaging, lifting or rigging. Excavators, dozers and other job-site equipment have their own Construction Equipment page." },
  { q: "Can you move industrial machinery and generators?", a: "We review these shipments from actual specifications, preparation, loading capability and the route. Provide photos and shipping information before a method or price is confirmed." },
  { q: "Do you supply cranes and rigging?", a: "Outside handling can be coordinated when specifically agreed. Confirm the provider, scope, appointment and price inclusions at pickup and delivery; it is not automatically part of every transport quote." },
  { q: "Can farm machinery be transported?", a: "Yes, subject to configuration, weight, dimensions and carrier suitability. Describe headers, implements and any components needing separate handling." },
  { q: "Does a heavy load always need a permit?", a: "No blanket rule applies from the load's description alone. Applicable requirements depend on the full loaded configuration and jurisdictions traveled." },
  { q: "Does transport include machine installation?", a: "Not unless it is separately and expressly arranged with a qualified provider. Highway delivery, inside placement, reassembly and installation are different tasks." },
  { q: "What insurance applies to a machinery move?", a: "Ask for the assigned carrier's applicable coverage and any separate handling provider's terms. Limits, exclusions, packaging obligations and the division of responsibility should be reviewed before dispatch." },
];

/* ── Related services ────────────────────────────────────────────────── */
const RELATED = [
  { label: "Construction Equipment Transport", href: "/construction-equipment-transport/", short: "Excavators, dozers and job-site machines" },
  { label: "Excavator Transport", href: "/excavator-transport/", short: "Tracked, wheeled and long-reach excavators" },
  { label: "Bulldozer Transport", href: "/bulldozer-transport/", short: "Crawler and wheel dozers on lowboys" },
  { label: "Commercial Vehicle Transport", href: "/commercial-vehicle-transport/", short: "Box trucks, work trucks, vans and fleets" },
];

export default function HeavyEquipmentTransportPage() {
  const page = getPage("heavy-equipment-transport")!;
  const hero = photo("svc-heavy-equipment-transport");
  const review: Review = reviews.find((r) => r.name === "Sally Sampath") ?? reviews[0];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(page.name, page.description, "heavy-equipment-transport"), faqSchema(FAQS)]} />

      <LandingHero
        slides={hero ? [{ src: hero, alt: "Semi truck hauling heavy industrial machinery on a multi-axle lowboy at sunset" }] : []}
        full
        fallbackIcon="industrial"
        crumbs={<div className="mb-4"><Breadcrumbs items={crumbs} light /></div>}
        eyebrow="Nationwide heavy & industrial equipment transport"
        lines={["Heavy Equipment & Machinery Transport", "for Oversized and Industrial Loads"]}
        sub="Industrial machinery, agricultural equipment and heavy specialty loads need a transport plan built from the complete load. MCC Bound Legends coordinates heavy equipment shipping around actual dimensions, weight, support requirements, loading arrangements and the receiving site."
        sub2="Tell us whether the equipment is mobile, skid-mounted, crated or prepared for rigging. We review the transport scope before coordinating the carrier and any separately agreed support services."
        formDefault="heavy-industrial"
        formTitle="Get Your Heavy & Industrial Equipment Transport Quote"
        formNote={TRUST_LINE}
        serviceName="Heavy & Industrial Equipment Transport"
      />

      {/* ── 4. CATEGORY GRID ──────────────────────────────────────────── */}
      <section className="bg-cloud py-14 lg:py-16">
        <Container>
          <div className="reveal mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-blue">We transport all types of equipment</p>
              <h2 className="display mt-1 text-[34px] text-navy sm:text-[44px]">Industrial machinery &amp; specialty equipment.</h2>
              <p className="mt-2 max-w-2xl text-[16px] text-slate">Trusted by manufacturers, dealers and businesses nationwide. Choose a category for its requirements, or get a quote for your exact load.</p>
            </div>
            <Link href="/services/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-navy">View all services <Arrow className="h-4 w-4" /></Link>
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CATEGORIES.map((c, i) => {
              const img = photo(c.img);
              return (
                <li key={c.title} className="card reveal-up flex flex-col overflow-hidden" style={{ ["--d" as string]: `${i * 50}ms` }}>
                  <span className="relative block aspect-[16/9] overflow-hidden bg-navy">
                    {img ? <Image src={img} alt={c.alt} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover" /> : <span className="absolute inset-0 bg-navy" />}
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <b className="text-[18px] font-bold leading-snug text-navy">{c.title}</b>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate">{c.d}</p>
                    <a href="#quote" data-ship="Heavy / Industrial Machinery" className="mt-4 inline-flex items-center gap-1.5 self-start text-[14px] font-bold text-blue transition hover:gap-2.5 hover:text-navy">Get a quote <Arrow className="h-4 w-4" /></a>
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 max-w-3xl rounded-xl border border-line bg-white px-5 py-4 text-[14px] leading-relaxed text-slate">
            <b className="font-semibold text-navy">Job-site machines:</b> for excavators, dozers and other construction equipment, see{" "}
            <Link href="/construction-equipment-transport/" className="font-semibold text-blue hover:text-navy">Construction Equipment Transport</Link>.
          </p>
        </Container>
      </section>

      {/* ── 5. POPULAR HEAVY EQUIPMENT ROUTES ─────────────────────────── */}
      <section id="routes" className="scroll-mt-28 bg-white py-14 lg:py-16">
        <Container>
          <SectionHead eyebrow="Choose your route" title={<>Popular heavy equipment &amp; machinery transport routes</>} sub="Choose a corridor and direction for route-specific pickup, delivery and transport planning." />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ROUTES.map((r, i) => {
              const img = photo(r.img);
              return (
                <li key={r.title} className="card reveal-up flex flex-col overflow-hidden" style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <span className="relative block aspect-[16/9] overflow-hidden bg-navy">
                    {img && <Image src={img} alt={r.alt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />}
                  </span>
                  <span className="flex flex-1 flex-col gap-4 p-5">
                    <b className="display text-[26px] leading-[1.05] text-navy sm:text-[30px]">{r.title}</b>
                    <span className="mt-auto flex flex-col gap-2.5 sm:flex-row">
                      {r.links.map((l) => (
                        <Link key={l.href} href={l.href} className="inline-flex flex-1 items-center justify-between gap-2 rounded-lg border-2 border-blue/30 bg-white px-4 py-2.5 text-[15px] font-bold text-navy transition hover:border-blue hover:bg-blue hover:text-white">
                          {l.label} <Arrow className="h-4 w-4 shrink-0" />
                        </Link>
                      ))}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ── 6. FEATURE ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-16 text-white lg:py-20">
        <div className="road-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal-left">
            <p className="font-display text-[14px] font-bold uppercase tracking-[0.16em] text-blue-300">Plan the whole move</p>
            <h2 className="display mt-2 text-[34px] leading-[1.02] sm:text-[42px]">Plan the whole move, not only the truck.</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">
              A factory machine may need lifting support at both ends. A farm machine may need an approved transport configuration. A generator on a skid needs its actual packaged dimensions and weight. We identify what is included, who prepares the load and what the carrier needs before a pickup appointment is set.
            </p>
            <a href="#quote" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get My Free Quote <Arrow className="h-5 w-5" /></a>
          </div>
          <ul className="reveal-right grid grid-cols-1 gap-4 sm:grid-cols-2">
            {METHODS.map((m) => (
              <li key={m.t} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur">
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-blue/60 bg-navy/60 text-blue-400"><m.icon className="h-5 w-5" /></span>
                <h3 className="mt-3 text-[15px] font-bold leading-snug">{m.t}</h3>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 7. TRANSPORT OPTIONS & RESPONSIBILITIES ───────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Transport options" title={<>Transport options and responsibilities</>} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {METHODS.map((m, i) => (
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

      {/* ── 8. WHAT WE REVIEW BEFORE DISPATCH ─────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Before a truck is dispatched" title={<>What we review before dispatch</>} />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWED.map((c, i) => (
              <li key={c.t} className="card reveal-up p-6" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="display text-[34px] text-blue/25">0{i + 1}</span>
                <span className="mt-1 grid h-11 w-11 place-items-center rounded-xl bg-white text-blue ring-1 ring-line"><c.icon className="h-5 w-5" /></span>
                <h3 className="mt-3 text-[17px] font-bold leading-snug text-navy">{c.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">{c.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 9. QUESTIONS THAT AFFECT THE SHIPMENT ─────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Know before you book" title={<>Questions that affect the shipment</>} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SHIPMENT_QS.map((q, i) => (
              <li key={q.q} className="card reveal-up p-6" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <h3 className="flex items-start gap-2 text-[17px] font-bold text-navy"><Check className="mt-0.5 h-5 w-5 shrink-0 text-blue" />{q.q}</h3>
                <p className="mt-2 pl-7 text-[15px] leading-relaxed text-slate">{q.a}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 10 & 11. COSTS, PICKUP, TRANSIT AND URGENT ────────────────── */}
      <section className="bg-navy py-16 text-white lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="reveal-left">
              <p className="eyebrow mb-3 text-blue-300">What affects the cost?</p>
              <h2 className="display text-[30px] sm:text-[36px]">Costs built from the complete load</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/80">
                Heavy machinery transport cost is shaped by the complete shipping configuration, route, trailer and axle needs, weight distribution, loading support and appointments. Packaging, cranes, rigging, surveys or escorts may be separate services. Review a written scope so transport is not mistaken for dismantling, installation or inside delivery.
              </p>
            </div>
            <div className="reveal-right">
              <p className="eyebrow mb-3 text-blue-300">Pickup, transit and urgent requests</p>
              <h2 className="display text-[30px] sm:text-[36px]">Work backward from readiness</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/80">
                Work backward from equipment release and receiving readiness rather than assuming the truck can leave as soon as the machine is sold. Packaging, loading crews, permits where required, site appointments and route conditions can influence the schedule.
              </p>
              <p className="mt-3 flex items-start gap-2 text-[15px] leading-relaxed text-white/80">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                For urgent or expedited heavy haul, early specifications help establish what is feasible; a priority request does not remove preparation or routing requirements.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 12. BEFORE PICKUP ─────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Preparation checklist" title={<>Before pickup</>} sub="A few simple steps help your machinery move go smoothly and avoid delays at pickup and delivery." />
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
            {PREP.map((p, i) => (
              <li key={p} className="reveal-up flex items-start gap-3 rounded-xl border border-line bg-cloud px-4 py-3.5 text-[15px] leading-relaxed text-navy" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue" />{p}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 13. HOW THE SHIPMENT WORKS + REVIEW ───────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <SectionHead align="left" eyebrow="How it works" title={<>Three steps. One coordinator.</>} />
            <Timeline steps={STEPS} />
          </div>
          <div className="reveal-right flex flex-col gap-4">
            <p className="eyebrow text-blue">Verified review</p>
            <ReviewCard r={review} />
            <Link href="/testimonials/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-navy">All customer reviews <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      {/* ── 14. FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">Heavy &amp; industrial equipment FAQ</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Questions we hear about machinery transport.</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal-right"><FaqList faqs={FAQS} /></div>
        </Container>
      </section>

      {/* ── RELATED SERVICES ──────────────────────────────────────────── */}
      <section className="bg-cloud py-14">
        <Container>
          <SectionHead align="left" eyebrow="Related services" title={<>Shipping something else?</>} />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((r, i) => (
              <li key={r.href} className="reveal-up" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <Link href={r.href} className="card card-hover group flex h-full items-center gap-3 p-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-orange text-white transition group-hover:bg-blue"><Arrow className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold text-navy">{r.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-slate">{r.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 15. FINAL CTA ─────────────────────────────────────────────── */}
      <CtaBand
        title="Ready to move your machinery?"
        sub="Send the shipment details, locations and earliest ready date. We will review the requirements and available carrier options. No upfront deposit before carrier assignment and dispatch."
      />
    </>
  );
}
