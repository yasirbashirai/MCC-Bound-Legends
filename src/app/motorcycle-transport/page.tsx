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
import { Arrow, Bolt, Check, Clock, Gear, Layers, Lock, Pin, Ruler, Shield, Trailer } from "@/components/Icons";
import { LandingHero } from "@/components/Landing";
import { FaqList, ReviewCard, SectionHead, Breadcrumbs, CtaBand } from "@/components/Sections";
import { Timeline } from "@/components/Visual";

/**
 * Motorcycle & Powersports main page — updated 1:1 to the client handoff of 2026-11-15
 * (01_Motorcycle_Main_Page_Content.txt). Replaces the generic [slug] render for this slug
 * (see generateStaticParams exclusion) so the section order and copy match the document:
 * hero → category grid → NEW route section → feature → methods & concerns → costs & timing →
 * preparation → review/process → FAQ → related services → final CTA.
 */
const PATH = "/motorcycle-transport/";

export const metadata: Metadata = meta(
  "Motorcycle & Powersports Shipping | MCC Bound Legends",
  "Ship motorcycles, trikes, ATVs, UTVs and golf carts nationwide. Open or enclosed options and loading needs reviewed. Request a motorcycle shipping quote.",
  PATH,
);

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Motorcycle & Powersports", href: PATH },
];

const TRUST_LINE = "No upfront deposit before carrier assignment • Carrier insurance checked before dispatch • One point of contact";

/* ── 4. Vehicle category grid — Any bike. Anywhere. ─────────────────── */
const CATEGORIES = [
  {
    title: "Cruisers & touring motorcycles",
    d: "Provide overall width with fixed accessories, weight and any low-clearance parts. Discuss suitable wheel support and protection for painted or delicate surfaces.",
    img: "type-cruisers-and-touring-motorcycles",
    alt: "Touring motorcycle with panniers secured on an enclosed transport trailer",
    ship: "Motorcycle",
  },
  {
    title: "Sport bikes, standards & dual sports",
    d: "Explain fairings, modifications and loading clearance. A rideable motorcycle can still need a careful ramp angle and appropriate securement.",
    img: "type-sport-bikes",
    alt: "Sport bike strapped down inside an enclosed motorcycle trailer",
    ship: "Motorcycle",
  },
  {
    title: "Trikes & custom builds",
    d: "Measure the complete wheel track, width and length. Do not assume a trike fits two-wheel chocks or a standard motorcycle carrier.",
    img: "type-trikes-and-custom-builds",
    alt: "Custom trike loaded on a specialized powersports trailer",
    ship: "Motorcycle",
  },
  {
    title: "ATVs & UTVs",
    d: "Disclose roll cages, roofs, lifts, accessories and actual dimensions. Multi-seat side-by-sides may need more deck space than the base model suggests.",
    img: "type-utvs-and-side-by-sides",
    alt: "UTV side-by-side secured on an open powersports trailer",
    href: "/atv-utv-transport/",
  },
  {
    title: "Golf carts & low-speed vehicles",
    d: "Specify roof height, wheelbase, battery type, operating condition and modifications. Tell us about battery damage or other transport concerns before quoting.",
    img: "type-golf-carts-and-lsvs",
    alt: "Golf cart loaded for transport on a flatbed trailer",
    ship: "ATV / UTV / Golf Cart",
  },
];

/* ── 5. Route section — two corridor cards, two direction links each ─── */
const ROUTES = [
  {
    title: "New York ↔ Florida",
    img: "scenery-new-york",
    alt: "Hudson Valley river and wooded hills in New York",
    links: [
      { label: "New York to Florida", href: "/motorcycle-transport/new-york-florida/#new-york-to-florida" },
      { label: "Florida to New York", href: "/motorcycle-transport/new-york-florida/#florida-to-new-york" },
    ],
  },
  {
    title: "California ↔ Florida",
    img: "scenery-california",
    alt: "California coastal highway above the Pacific Ocean",
    links: [
      { label: "California to Florida", href: "/motorcycle-transport/california-florida/#california-to-florida" },
      { label: "Florida to California", href: "/motorcycle-transport/california-florida/#florida-to-california" },
    ],
  },
];

/* ── 7. Transport methods ────────────────────────────────────────────── */
const METHODS = [
  { icon: Shield, t: "Enclosed transport", d: "An enclosed carrier adds protection from direct weather and road debris. Confirm the loading system, dimensions and availability for your machine; enclosure does not remove the need for proper securement." },
  { icon: Trailer, t: "Open transport", d: "A suitable open trailer may be considered for motorcycles and powersports units when loading and securement requirements are met. The unit remains exposed to normal road and weather conditions." },
  { icon: Gear, t: "Non-running machines", d: "Tell us whether the unit rolls, steers and brakes, has flat tires or a locked steering system. A lift, winch, crate or other loading arrangement is selected only when appropriate to the actual condition." },
  { icon: Layers, t: "Dealer & multi-unit moves", d: "Supply unit identifiers, keys, release paperwork and an inventory. Separate models may require different loading positions, equipment or schedules." },
];

/* ── 8. What we check before dispatch ────────────────────────────────── */
const CHECKS = [
  { icon: Ruler, t: "Size, weight and clearance", d: "Provide exact dimensions and weight, including racks, panniers, roof structures and modifications. Low exhausts and long wheelbases can affect loading." },
  { icon: Bolt, t: "Running and rolling condition", d: "A non-running engine differs from a bike that cannot roll or steer. Explain both so loading and unloading equipment can be reviewed." },
  { icon: Lock, t: "Accessories and preparation", d: "Secure fixed accessories and remove loose valuables. Follow the assigned carrier's specific fuel, battery and preparation instructions instead of a universal checklist." },
  { icon: Pin, t: "Pickup and receiving access", d: "Tell us about stairs, gravel, steep drives, dealer hours and loading restrictions. Arrange an authorized person at both ends." },
];

/* ── 9. Questions that affect your shipment ──────────────────────────── */
const SHIPMENT_QS = [
  { q: "Will it be protected?", a: "Discuss open versus enclosed transport and how the carrier supports and secures the machine. Confirm condition inspection and coverage details before pickup." },
  { q: "Do I need to crate it?", a: "Not every motorcycle needs a crate. The carrier's equipment, service type and the bike's condition determine whether uncrated, palletized or crated handling is suitable." },
  { q: "Can you ship a low or custom motorcycle?", a: "Supply ground clearance, length, weight and photos. Custom geometry may need a different ramp, lift or loading plan." },
  { q: "Can you collect from a seller?", a: "Yes, when the vehicle is released and accessible. Confirm keys, seller contact, collection hours and any payment or paperwork requirements before the carrier arrives." },
];

/* ── 12. Before pickup ───────────────────────────────────────────────── */
const PREP = [
  "Photograph the machine, its accessories and existing damage before pickup.",
  "Remove loose belongings and disclose any accessories or parts intended to travel with it.",
  "Provide keys and instructions for alarms, steering locks and immobilizers.",
  "Disclose leaks, battery damage, electric powertrain details and mechanical or rolling restrictions.",
  "Follow the assigned carrier's fuel, battery and loading instructions; do not disconnect or drain components unless instructed.",
  "Confirm seller release, receiving contact and inspection arrangements at both ends.",
];

/* ── 13. How the shipment works ──────────────────────────────────────── */
const STEPS = [
  { t: "Tell us what is moving", d: "Send the vehicle or equipment details, actual pickup and delivery ZIP codes, condition and earliest ready date." },
  { t: "Review the transport arrangements", d: "We review loading needs, carrier suitability, pickup access and receiving requirements. Confirm the agreed method, quoted amount and payment schedule." },
  { t: "Pickup, updates and delivery", d: "Complete the pickup condition report, coordinate updates with your transport contact and inspect the unit with the receiving party at delivery." },
];

/* ── 14. FAQs ────────────────────────────────────────────────────────── */
const FAQS: FAQ[] = [
  { q: "Should I choose open or enclosed motorcycle shipping?", a: "Enclosed transport offers added protection from direct weather and road debris. Open transport may be suitable when the equipment and securement fit your unit. Discuss both options and the actual quote difference." },
  { q: "Can you ship a motorcycle that does not run?", a: "It may be possible. Explain whether it rolls, steers and brakes and whether the keys are available. The carrier needs an appropriate loading and unloading plan." },
  { q: "Do I have to drain fuel or disconnect the battery?", a: "Preparation depends on the service and carrier. Follow the instructions issued for your shipment. Disclose electric models, battery damage, leaks and other concerns before booking." },
  { q: "Can you ship a trike, ATV, UTV or golf cart?", a: "Yes, subject to dimensions, weight, condition and carrier suitability. Wide, tall or modified units need individual review; see the ATV & UTV service page for more detail." },
  { q: "Can you move several motorcycles together?", a: "We can coordinate multiple-unit shipments when suitable capacity is available. Provide a separate description for each machine and confirm inventory and receiving arrangements." },
  { q: "Can you pick up from a dealership or private seller?", a: "Yes. Confirm that the unit has been released for transport, provide the contact and hours, and ensure keys and paperwork are available." },
  { q: "Who is responsible for the physical transport?", a: "The assigned motor carrier performs the move. MCC coordinates the shipment and verifies carrier authority and applicable insurance before dispatch. Coverage is subject to policy terms, limits and exclusions." },
  { q: "Is a deposit due before you find a carrier?", a: "No upfront deposit is collected before carrier assignment. Your booking agreement states the payment schedule and accepted methods." },
];

/* ── Related services ────────────────────────────────────────────────── */
const RELATED = [
  { label: "ATV & UTV Transport", href: "/atv-utv-transport/", short: "ATVs, UTVs, side-by-sides and golf carts" },
  { label: "Enclosed Auto Transport", href: "/enclosed-auto-transport/", short: "Added protection from weather and debris" },
  { label: "RV & Motorhome Transport", href: "/rv-transport/", short: "Motorhomes, travel trailers and fifth wheels" },
  { label: "Auto Transport", href: "/auto-transport/", short: "Cars, SUVs, pickups and specialty vehicles" },
];

export default function MotorcycleTransportPage() {
  const page = getPage("motorcycle-transport")!;
  const hero = photo("svc-motorcycle-transport");
  const review: Review = reviews.find((r) => r.name === "Sally Sampath") ?? reviews[0];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(page.name, page.description, "motorcycle-transport"), faqSchema(FAQS)]} />

      <LandingHero
        slides={hero ? [{ src: hero, alt: "Pickup towing an enclosed trailer loaded with motorcycles at sunset" }] : []}
        full
        fallbackIcon="motorcycle"
        crumbs={<div className="mb-4"><Breadcrumbs items={crumbs} light /></div>}
        eyebrow="Nationwide motorcycle & powersports transport"
        lines={["Motorcycle & Powersports Transport,", "Secured and Coordinated Door to Door"]}
        sub="A touring motorcycle, a custom trike and a four-seat UTV do not load the same way. MCC Bound Legends coordinates motorcycle shipping and powersports transport around the unit's dimensions, condition, clearance and securement requirements."
        sub2="Move a private purchase, a dealer unit or several machines. Tell us whether it runs, rolls and steers, and whether you want open or enclosed transport reviewed."
        formDefault="motorcycle"
        formTitle="Get Your Motorcycle & Powersports Transport Quote"
        formNote={TRUST_LINE}
        serviceName="Motorcycle & Powersports Transport"
      />

      {/* ── 4. VEHICLE CATEGORY GRID — Any bike. Anywhere. ─────────────── */}
      <section className="bg-cloud py-14 lg:py-16">
        <Container>
          <div className="reveal mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-blue">We transport all types of powersports</p>
              <h2 className="display mt-1 text-[34px] text-navy sm:text-[44px]">Any bike. Anywhere.</h2>
              <p className="mt-2 max-w-2xl text-[16px] text-slate">Trusted by owners, dealers and businesses nationwide. Choose a category for its loading details, or get a quote for your exact machine.</p>
            </div>
            <Link href="/services/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-navy">View all services <Arrow className="h-4 w-4" /></Link>
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const img = photo(c.img);
              return (
                <li key={c.title} className="card reveal-up flex flex-col overflow-hidden" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <span className="relative block aspect-[16/9] overflow-hidden bg-navy">
                    {img ? <Image src={img} alt={c.alt} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover" /> : <span className="absolute inset-0 bg-navy" />}
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <b className="text-[19px] font-bold leading-snug text-navy">{c.title}</b>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate">{c.d}</p>
                    {c.href ? (
                      <Link href={c.href} className="mt-4 inline-flex items-center gap-1.5 self-start text-[14px] font-bold text-blue transition hover:gap-2.5 hover:text-navy">View ATVs &amp; UTVs <Arrow className="h-4 w-4" /></Link>
                    ) : (
                      <a href="#quote" data-ship={c.ship} className="mt-4 inline-flex items-center gap-1.5 self-start text-[14px] font-bold text-blue transition hover:gap-2.5 hover:text-navy">Get a quote <Arrow className="h-4 w-4" /></a>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 max-w-3xl rounded-xl border border-line bg-white px-5 py-4 text-[14px] leading-relaxed text-slate">
            <b className="font-semibold text-navy">Dirt bikes and multiple-unit shipments:</b> list each unit separately with dimensions and condition. Dealer batches and event shipments require an agreed inventory, collection contact and receiving plan.
          </p>
        </Container>
      </section>

      {/* ── 5. POPULAR MOTORCYCLE SHIPPING ROUTES ─────────────────────── */}
      <section id="routes" className="scroll-mt-28 bg-white py-14 lg:py-16">
        <Container>
          <SectionHead eyebrow="Choose your route" title={<>Popular motorcycle shipping routes</>} sub="Choose your direction for route-specific pickup, delivery and transport planning." />
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

      {/* ── 6. FEATURE SECTION ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-16 text-white lg:py-20">
        <div className="road-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal-left">
            <p className="font-display text-[14px] font-bold uppercase tracking-[0.16em] text-blue-300">Planned around the machine</p>
            <h2 className="display mt-2 text-[34px] leading-[1.02] sm:text-[42px]">Planned for two wheels, three wheels and off-road machines.</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">
              Motorcycles need stable loading, suitable wheel support and securement matched to the machine. Powersports units bring their own width, height and weight requirements. We review loading equipment and carrier experience before dispatch rather than assuming every bike can use a standard car-shipping setup.
            </p>
            <a href="#quote" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get My Free Quote <Arrow className="h-5 w-5" /></a>
          </div>
          <ul className="reveal-right grid grid-cols-1 gap-4 sm:grid-cols-2">
            {METHODS.map((m) => (
              <li key={m.t} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur">
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-blue/60 bg-navy/60 text-blue-400"><m.icon className="h-5 w-5" /></span>
                <h3 className="mt-3 text-[16px] font-bold">{m.t}</h3>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 7. TRANSPORT METHODS ──────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Transport methods" title={<>Choose equipment from the unit&rsquo;s details</>} />
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
            MCC Bound Legends coordinates the shipment; the assigned motor carrier performs the physical transport. Carrier authority and applicable insurance are verified before dispatch. Ask for policy details, limits and exclusions for the agreed transport method.
          </p>
        </Container>
      </section>

      {/* ── 8. WHAT WE CHECK ──────────────────────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Before a truck is dispatched" title={<>What we check before dispatch</>} />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHECKS.map((c, i) => (
              <li key={c.t} className="card reveal-up p-6" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="display text-[34px] text-blue/25">0{i + 1}</span>
                <span className="mt-1 grid h-11 w-11 place-items-center rounded-xl bg-white text-blue ring-1 ring-line"><c.icon className="h-5 w-5" /></span>
                <h3 className="mt-3 text-[17px] font-bold text-navy">{c.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">{c.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 9. QUESTIONS THAT AFFECT YOUR SHIPMENT ────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Know before you book" title={<>Questions that affect your shipment</>} />
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

      {/* ── 10 & 11. COSTS, PICKUP, TRANSIT AND URGENT REQUESTS ───────── */}
      <section className="bg-navy py-16 text-white lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="reveal-left">
              <p className="eyebrow mb-3 text-blue-300">What affects the cost?</p>
              <h2 className="display text-[30px] sm:text-[36px]">Costs and timing, reviewed per machine</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/80">
                Motorcycle shipping cost depends on the route direction, size and weight, open or enclosed service, loading requirements, pickup access and scheduling. A compact dirt bike, a full-size touring motorcycle and a wide UTV should be quoted from their own details. Request a price for the actual shipment rather than assuming an online estimate covers every machine.
              </p>
            </div>
            <div className="reveal-right">
              <p className="eyebrow mb-3 text-blue-300">Pickup, transit and urgent requests</p>
              <h2 className="display text-[30px] sm:text-[36px]">Separate windows, honest estimates</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/80">
                Share the earliest ready date, dealer release hours and any relocation or event deadline. Pickup windows and transit estimates are separate. Multi-stop routes, weather, loading arrangements and available equipment affect timing.
              </p>
              <p className="mt-3 flex items-start gap-2 text-[15px] leading-relaxed text-white/80">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                Last-minute and expedited motorcycle shipping requests are reviewed individually; a requested event arrival is not automatically a confirmed delivery appointment.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 12. BEFORE PICKUP ─────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Preparation checklist" title={<>Before your motorcycle is picked up</>} sub="A few simple steps help your shipment go on schedule and your machine arrive ready to ride." />
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
            <p className="eyebrow mb-3 text-blue">Motorcycle &amp; powersports FAQ</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Questions we hear about motorcycle shipping.</h2>
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
        title="Ready to move your motorcycle or powersports unit?"
        sub="Tell us what is moving, where it is going and when it is ready. We will review the transport requirements and available carrier options."
      />
    </>
  );
}
