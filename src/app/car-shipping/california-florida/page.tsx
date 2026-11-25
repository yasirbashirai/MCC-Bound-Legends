import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import type { FAQ } from "@/data/services";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { PhoneLink } from "@/components/PhoneLink";
import { StepQuoteForm } from "@/components/StepQuoteForm";
import { Arrow, Calendar, Check, Clock, Doc, Gear, Layers, Lock, Phone, Pin, Route, Shield, Truck } from "@/components/Icons";
import { Breadcrumbs, FaqList, SectionHead } from "@/components/Sections";

/**
 * Combined route page: California ↔ Florida car shipping.
 * Built 1:1 to MCC_California_Florida_Route_Page_Copy_and_Developer_Handoff.docx and the
 * supplied mockup. Both directions live on this page as anchored sections (#california-to-florida,
 * #florida-to-california); the URLs are fragments, not separate indexable pages.
 */
const PATH = "/car-shipping/california-florida/";

export const metadata: Metadata = meta(
  "California to Florida & Florida to California Car Shipping | MCC",
  "Ship a car from California to Florida or Florida to California. MCC coordinates open and enclosed transport through vetted carriers. Request a free quote.",
  PATH,
);

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Auto Transport", href: "/auto-transport/" },
  { name: "California and Florida", href: PATH },
];

/* ── Copy ─────────────────────────────────────────────────────────────── */
const TRUST = [
  { icon: Shield, t: "Licensed & bonded", s: "Transportation broker" },
  { icon: Shield, t: "Carrier insurance verified", s: "Before dispatch" },
  { icon: Layers, t: "Open & enclosed", s: "Transport options" },
];

const CA_TO_FL = {
  intro: "Shipping a car from California to Florida starts with the exact pickup and delivery locations. A Los Angeles to Miami shipment has different access and scheduling needs from a Sacramento to Jacksonville move. Share both ZIP codes, your vehicle details and your earliest ready date so we can review the available carrier options.",
  blocks: [
    { h: "California pickup locations", p: "Request pickup in Los Angeles, San Diego, San Francisco, Sacramento, San Jose and surrounding areas. Tell us if your vehicle is at a private home, apartment garage, dealership, auction yard or storage facility. If a large carrier cannot safely access the address, we coordinate a nearby meeting location with you and the carrier." },
    { h: "Florida delivery planning", p: "Common delivery destinations include Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale and West Palm Beach. Let us know about gated communities, condominium delivery rules or limited parking before dispatch. If you arrive in Florida after the vehicle is ready to move, identify an authorized delivery contact and discuss the receiving arrangements in advance." },
    { h: "Plan around your arrival date", p: "For a relocation or seasonal stay, share your travel dates and how much flexibility you have on each end. A preferred arrival date is useful for planning, but it is not a guaranteed delivery appointment. Carrier availability, loading stops, weather and traffic affect the final schedule." },
  ],
};

const FL_TO_CA = {
  intro: "Moving a car from Florida to California may involve a personal relocation, a dealer purchase or a vehicle returning home after a seasonal stay. We review the westbound shipment separately: a California to Florida rate or pickup window does not automatically apply in reverse.",
  blocks: [
    { h: "Florida pickup arrangements", p: "Request pickup in Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale, West Palm Beach and nearby communities. If you bought the vehicle remotely, confirm that the seller or dealership has released it for transport, identify the pickup contact and provide available collection hours. Tell us about any storage deadline or appointment requirement before a carrier is assigned." },
    { h: "California delivery arrangements", p: "Delivery can be coordinated for Los Angeles, San Diego, San Francisco, Sacramento, San Jose and other California locations. Confirm whether your street allows a large transport truck to enter and turn around. For a downtown address, narrow street or restricted property, discuss a suitable nearby meeting point with the carrier." },
  ],
};

const COST_FACTORS = [
  { icon: Pin, t: "Exact ZIP codes", d: "Your pickup and delivery ZIP codes, including access away from major service areas." },
  { icon: Truck, t: "Vehicle and running condition", d: "Vehicle year, make, model, size, modifications and running condition." },
  { icon: Layers, t: "Open or enclosed", d: "Open or enclosed transport and any loading equipment needed." },
  { icon: Calendar, t: "Ready date and flexibility", d: "Earliest ready date, pickup flexibility and current carrier availability." },
  { icon: Doc, t: "Pickup requirements", d: "Collection requirements such as auction release, business hours or appointments." },
];

const PREPARE = [
  { icon: Lock, t: "Remove valuables", d: "Remove personal valuables and disclose any proposed contents to MCC and the carrier before loading." },
  { icon: Pin, t: "Photograph condition", d: "Photograph the vehicle and participate in the condition inspection at pickup and delivery." },
  { icon: Gear, t: "Provide working keys", d: "Provide working keys and explain alarms, immobilizers, leaks or special starting instructions." },
  { icon: Check, t: "Confirm contacts", d: "Confirm pickup and receiving contacts, access rules and any release paperwork." },
];

const HOW = [
  { t: "Request your quote", d: "Send the route, vehicle details, condition and ready date." },
  { t: "Review the carrier arrangements", d: "MCC reviews carrier authority, insurance, equipment and scheduling before dispatch." },
  { t: "Pickup and delivery", d: "Complete the condition reports, coordinate with the carrier and inspect the vehicle at delivery." },
];

const FAQS: FAQ[] = [
  { q: "Can I ship a car in either direction?", a: "Yes. This page covers California to Florida and Florida to California car shipping. Choose your direction and provide the pickup and delivery ZIP codes for that shipment." },
  { q: "Does it cost the same in both directions?", a: "Not necessarily. Carrier availability, timing and demand can differ by direction. Request a separate quote for each move instead of assuming that a return shipment will have the same rate." },
  { q: "How long will my car take to arrive?", a: "The estimate depends on the exact locations, carrier schedule and shipment requirements. We discuss pickup availability and estimated time in transit separately. Exact dates are not guaranteed unless expressly confirmed in your shipment agreement." },
  { q: "Can the truck pick up at my home?", a: "Pickup and delivery are coordinated as close to the requested addresses as the carrier can safely and legally access. Restricted streets, low clearances, gates or limited turning space may require a nearby meeting location." },
  { q: "Can you collect a car from a dealership or auction?", a: "Yes. Provide the collection contact, operating hours and release requirements. The vehicle must be available for the carrier, with any required payment and release arrangements completed before collection." },
  { q: "Can I ship a non-running car or choose enclosed transport?", a: "Tell us which service you need when requesting your quote. For a non-running car, explain whether it rolls, steers and brakes. For enclosed transport, provide ground clearance, modifications and any special loading requirements." },
  { q: "Who transports my vehicle and what insurance applies?", a: "MCC Bound Legends coordinates your shipment with a vetted motor carrier. The assigned carrier performs the transport, and we verify its cargo insurance before dispatch. Ask for the carrier certificate and coverage details; policy terms, limits and exclusions apply." },
  { q: "When is payment due?", a: "No upfront deposit is collected before carrier assignment. Review your booking agreement for the initial payment and the balance payable to the carrier. Confirm the accepted payment method before delivery." },
];

const RELATED = [
  { label: "Auto Transport", href: "/auto-transport/" },
  { label: "Enclosed Auto Transport", href: "/enclosed-auto-transport/" },
  { label: "Non-Running Vehicle Transport", href: "/non-running-vehicle-transport/" },
  { label: "Car Shipping Costs", href: "/cost-to-ship-a-car/" },
];

const DIRECTIONS = [
  { label: "California to Florida", href: "#california-to-florida", img: "/images/photos/route-thumb-ca.webp", alt: "Los Angeles skyline beyond palm trees" },
  { label: "Florida to California", href: "#florida-to-california", img: "/images/photos/route-thumb-fl.webp", alt: "Miami skyline over Biscayne Bay" },
];

export default function CaliforniaFloridaRoutePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema("California and Florida Car Shipping", metadata.description as string, "car-shipping/california-florida"),
          faqSchema(FAQS),
        ]}
      />

      {/* ── HERO + QUOTE FORM ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image
          src="/images/photos/route-hero-ca-fl.webp"
          alt="Navy car carrier hauling SUVs and sedans across the Southwest on an interstate"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_45%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.97)_0%,rgba(13,31,53,.9)_45%,rgba(13,31,53,.55)_100%)]" />
        <Container className="relative z-[2] grid items-start gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-14 xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="max-w-[680px]">
            <Breadcrumbs items={crumbs} light />
            <p className="eyebrow mt-6 text-blue-300">California and Florida auto transport</p>
            <h1 className="display mt-3 text-[38px] leading-[0.98] drop-shadow-[0_6px_28px_rgba(0,0,0,.55)] sm:text-[46px] xl:text-[52px]">
              Car Shipping Between California and Florida
            </h1>
            <p className="mt-5 max-w-[620px] text-[17px] font-medium leading-[1.6] text-white drop-shadow sm:text-[18px]">
              California to Florida car shipping and Florida to California car shipping, coordinated around your vehicle, pickup location and delivery plans.
            </p>
            <p className="mt-4 max-w-[620px] text-[16px] leading-[1.6] text-white/85 sm:text-[17px]">
              Moving across the country, purchasing a vehicle out of state or sending a car to a seasonal home? MCC Bound Legends matches your shipment with a vetted motor carrier and stays your point of contact from quote through delivery. Choose open or enclosed transport and tell us whether your vehicle runs.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn-orange h-[50px] whitespace-nowrap px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get My Free Quote <Arrow className="h-5 w-5" /></a>
              <PhoneLink location="route_hero" className="btn-ghost h-[50px] whitespace-nowrap border-white/80 bg-navy/40 px-7 text-[16px] font-bold uppercase tracking-[0.04em] backdrop-blur"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <StepQuoteForm
              preselect="Car / Sedan"
              showDirection
              directionAnchors={{ "#california-to-florida": "California to Florida", "#florida-to-california": "Florida to California" }}
              title="Get Your California and Florida Car Shipping Quote"
              serviceName="California and Florida Car Shipping"
            />
            <p className="mt-2 px-1 text-[12px] leading-snug text-white/70">
              No upfront deposit before carrier assignment. Exact pricing and scheduling depend on your shipment details.
            </p>
          </div>
        </Container>
      </section>

      {/* ── CHOOSE YOUR DIRECTION ─────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-16">
        <Container>
          <p className="eyebrow mb-2 text-blue">Two directions, one coordinator</p>
          <h2 className="display text-[34px] text-navy sm:text-[42px]">Choose your direction</h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-slate">
            Where is your vehicle going? Select a direction to see pickup and delivery information, or enter your exact ZIP codes in the quote form.
          </p>
          <ul className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {DIRECTIONS.map((d) => (
              <li key={d.label}>
                <Link href={d.href} className="group flex items-center gap-4 overflow-hidden rounded-xl border border-line bg-white p-3 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-blue/60 hover:shadow-lg">
                  <span className="relative block h-[92px] w-[38%] shrink-0 overflow-hidden rounded-lg bg-navy sm:h-[108px]">
                    <Image src={d.img} alt={d.alt} fill sizes="(max-width:768px) 40vw, 20vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </span>
                  <span className="display flex flex-1 items-center justify-between gap-3 text-[22px] leading-[1.05] text-navy sm:text-[26px]">
                    {d.label}
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange text-white transition group-hover:bg-orange-600"><Arrow className="h-5 w-5" /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-8 grid grid-cols-1 gap-4 rounded-xl bg-navy px-6 py-5 text-white sm:grid-cols-3">
            {TRUST.map((t) => (
              <li key={t.t} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><t.icon className="h-5 w-5" /></span>
                <span className="leading-tight"><span className="block text-[15px] font-semibold">{t.t}</span><span className="block text-[13px] text-white/65">{t.s}</span></span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── CALIFORNIA → FLORIDA ──────────────────────────────────────── */}
      <section id="california-to-florida" className="scroll-mt-28 bg-[#eaf4fb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="reveal-left relative aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:sticky lg:top-24">
            <Image src="/images/photos/route-ca-to-fl.webp" alt="Silver car carrier loaded with SUVs along a Florida waterfront road with palm trees" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
          <div>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">California to Florida Car Shipping</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{CA_TO_FL.intro}</p>
            {CA_TO_FL.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="California to Florida" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a California to Florida Quote <Arrow className="h-5 w-5" /></a>
          </div>
        </Container>
      </section>

      {/* ── FLORIDA → CALIFORNIA ──────────────────────────────────────── */}
      <section id="florida-to-california" className="scroll-mt-28 bg-[#e3eefb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="order-2 lg:order-1">
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Florida to California Car Shipping</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{FL_TO_CA.intro}</p>
            {FL_TO_CA.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" data-dir="Florida to California" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a Florida to California Quote <Arrow className="h-5 w-5" /></a>
          </div>
          <div className="reveal-right relative order-1 aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:sticky lg:top-24 lg:order-2">
            <Image src="/images/photos/route-fl-to-ca.webp" alt="Blue semi truck hauling a loaded car carrier through the California hills" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
        </Container>
      </section>

      {/* ── COST FACTORS ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="What affects the price" title={<>What affects California and Florida car shipping costs</>} sub="Your quote depends on the actual shipment, including its direction. We review these details before presenting a transport option:" />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {COST_FACTORS.map((c, i) => (
              <li key={c.t} className="card reveal-up flex flex-col p-5" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cloud text-blue"><c.icon className="h-6 w-6" /></span>
                <h3 className="mt-3 text-[16px] font-bold leading-snug text-navy">{c.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">{c.d}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-[15px] leading-relaxed text-slate">
            Ask for a quote for your exact direction. Before you approve the shipment, review the total quoted amount, payment schedule and any stated conditions. There is no upfront deposit before carrier assignment.
          </p>
        </Container>
      </section>

      {/* ── PICKUP WINDOWS BAND ───────────────────────────────────────── */}
      <section className="bg-navy py-14 text-white lg:py-16">
        <Container>
          <h2 className="display text-[32px] sm:text-[40px]">Pickup windows and estimated transit time</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><Clock className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Pickup scheduling</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Pickup scheduling and time in transit are different. The pickup window is when the carrier is expected to collect your car; transit time begins after pickup.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><Route className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Time in transit</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">We provide shipment-specific estimates during quoting and confirm arrangements with the assigned carrier. Additional stops, road conditions, weather and receiving hours can affect delivery.</p>
              </div>
            </div>
          </div>
          <p className="mt-8 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-white/70">
            Tell us before booking if the vehicle must meet a dealer deadline, lease return date, flight or moving schedule. We will review the requirement and explain the available options rather than assume a fixed arrival time.
          </p>
        </Container>
      </section>

      {/* ── OPEN OR ENCLOSED ──────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Transport options" title={<>Open or enclosed car transport</>} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { img: "/images/photos/route-open-carrier.webp", alt: "Open two-level car carrier loaded with SUVs and sedans in sunlight", t: "Open transport", d: "A common option for everyday cars, SUVs and pickups. Your vehicle travels on an open carrier and is exposed to weather and normal road conditions." },
              { img: "/images/photos/route-enclosed.webp", alt: "Red supercar loading into an enclosed car trailer", t: "Enclosed transport", d: "An option for classic, exotic, luxury and other vehicles needing added protection. Share low ground clearance, unusual dimensions or loading concerns before quoting so the carrier can be matched appropriately." },
            ].map((c, i) => (
              <li key={c.t} className="card reveal-up flex flex-col overflow-hidden" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span className="relative block aspect-[16/9] bg-navy"><Image src={c.img} alt={c.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></span>
                <span className="flex flex-1 flex-col p-5">
                  <b className="text-[20px] font-bold text-navy">{c.t}</b>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate">{c.d}</p>
                </span>
              </li>
            ))}
            <li className="card reveal-up flex flex-col overflow-hidden" style={{ ["--d" as string]: "140ms" }}>
              <span className="relative grid aspect-[16/9] place-items-center bg-navy text-blue-300"><Truck className="h-16 w-24" /></span>
              <span className="flex flex-1 flex-col p-5">
                <b className="text-[20px] font-bold text-navy">Non-running vehicles</b>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">Tell us if the car cannot start, steer, roll or brake. These details affect loading and carrier selection. Do not select Running simply because the engine starts.</p>
              </span>
            </li>
          </ul>
        </Container>
      </section>

      {/* ── PREPARE YOUR CAR ──────────────────────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Before pickup" title={<>Prepare your car for pickup</>} sub="A few simple steps help your shipment go smoothly and avoid delays at pickup." />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PREPARE.map((c, i) => (
              <li key={c.t} className="card reveal-up p-5" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-blue ring-1 ring-line"><c.icon className="h-6 w-6" /></span>
                <h3 className="mt-3 text-[17px] font-bold text-navy">{c.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">{c.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── HOW YOUR SHIPMENT WORKS ───────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="The process" title={<>How your shipment works</>} />
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOW.map((s, i) => (
              <li key={s.t} className="card reveal-up p-6" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span className="display grid h-12 w-12 place-items-center rounded-full bg-orange text-[20px] text-white">{i + 1}</span>
                <h3 className="mt-4 text-[20px] font-bold text-navy">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">California and Florida car shipping questions</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Frequently asked questions</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal-right"><FaqList faqs={FAQS} /></div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative flex flex-col items-center gap-7 py-16 text-center lg:flex-row lg:justify-between lg:py-20 lg:text-left">
          <div>
            <h2 className="display text-[34px] sm:text-[44px]">Ready to ship between California and Florida?</h2>
            <p className="mt-3 max-w-xl text-[17px] text-white/75">Tell us your direction, vehicle and ready date. We will review the shipment requirements and help coordinate the right carrier.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a href="#quote" className="btn-orange h-[54px] px-8 text-[16px] font-bold uppercase tracking-[0.04em]">Get My Free Quote <Arrow className="h-5 w-5" /></a>
            <PhoneLink location="route_cta" className="btn-ghost h-[54px] px-8 text-[16px] font-bold uppercase tracking-[0.04em]"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
          </div>
        </Container>
      </section>

      {/* ── RELATED LINKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="eyebrow text-muted">Related links</p>
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">{r.label} <Arrow className="h-4 w-4" /></Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
