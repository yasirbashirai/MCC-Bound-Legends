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
import { Anchor, Arrow, Bolt, Calendar, Check, Clock, Gear, Headset, Layers, Lock, Phone, Pin, Ruler, Shield, Trailer } from "@/components/Icons";
import { Breadcrumbs, FaqList, SectionHead } from "@/components/Sections";

/**
 * Combined boat route page: New York / New Jersey ↔ Florida.
 * Built 1:1 to MCC_NY_NJ_Florida_Route_Content_and_Handoff.docx, styled like the
 * approved California–Florida route page. Both directions live here as anchored
 * sections (#to-florida, #from-florida); those are fragments, not separate pages.
 */
const PATH = "/boat-transport/new-york-new-jersey-florida/";

export const metadata: Metadata = meta(
  "NY & NJ ↔ Florida Boat Transport | MCC Bound Legends",
  "Boat transport between New York, New Jersey and Florida, in both directions. With or without a trailer. Ask about expedited and last-minute shipping.",
  PATH,
);

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Boat Transport", href: "/boat-transport-florida/" },
  { name: "New York and New Jersey", href: PATH },
];

const TRUST = [
  { icon: Shield, t: "Licensed & Bonded", s: "Transportation broker" },
  { icon: Shield, t: "Carrier Insurance Verified", s: "Before dispatch" },
  { icon: Trailer, t: "With or Without a Trailer", s: "Boat transport options" },
];

const DIRECTIONS = [
  { label: "New York & New Jersey to Florida", href: "#to-florida", img: "/images/photos/boat-route-thumb-ny.webp", alt: "Manhattan skyline viewed across the Hudson River" },
  { label: "Florida to New York & New Jersey", href: "#from-florida", img: "/images/photos/boat-route-thumb-fl.webp", alt: "Florida waterfront with palms and city skyline" },
];

const TO_FLORIDA = {
  intro: "Shipping a boat from New York or New Jersey to Florida may involve a seasonal move, boat purchase, or relocation. We coordinate pickup, transport, and delivery around your boat, locations, and loading requirements.",
  blocks: [
    { h: "New York pickup locations", p: "For a pickup on Long Island, in the New York City area, the Hudson Valley, or elsewhere in New York, provide the exact address and tell us whether the boat is at a marina, residence, dealership, or storage facility. Share yard hours, access restrictions, and the contact who can release the boat. We review the available loading method before scheduling." },
    { h: "New Jersey pickup locations", p: "For pickups along the Jersey Shore, around Toms River, in northern New Jersey, or surrounding areas, provide the marina or seller contact and any release requirements. Let us know whether your boat has a trailer and whether the location can accommodate the truck and transport equipment." },
    { h: "Florida delivery planning", p: "Whether delivery is in Jacksonville, Tampa Bay, Palm Beach, Fort Lauderdale, Miami, or another Florida location, confirm the receiving address and contact. Share marina appointment requirements, access restrictions, and the planned unloading method so those arrangements can be reviewed before arrival." },
    { h: "Plan your arrival date", p: "Share your ready date, travel plans, and any marina or storage deadlines. Pickup and delivery windows depend on carrier availability, equipment, routing, and loading appointments. Dates are estimates unless specifically confirmed in the shipment agreement." },
  ],
};

const FROM_FLORIDA = {
  intro: "Returning north or sending a sold boat to its new owner? Northbound availability and pricing are reviewed for your exact move. A return shipment may have different equipment availability and scheduling needs from the trip south.",
  blocks: [
    { h: "Florida pickup arrangements", p: "Provide the Florida pickup address, boat details, release contact, marina or yard hours, and loading method. Tell us whether your boat has its own trailer, whether lifting equipment is available, and whether an appointment is needed before the carrier arrives." },
    { h: "New York delivery planning", p: "For delivery to Long Island, the New York City area, the Hudson Valley, or another New York destination, confirm receiving-yard access and any unloading or lift appointment. Provide a contact who can accept delivery and share any site restrictions before scheduling." },
    { h: "New Jersey delivery planning", p: "For delivery to the Jersey Shore, Toms River, northern New Jersey, or surrounding areas, provide the exact address and receiving contact. We review the unloading plan, access, and site hours with the shipment details. Other cities and surrounding areas are available." },
  ],
};

const COST_FACTORS = [
  { icon: Pin, t: "Exact ZIP codes", d: "Pickup and delivery locations help determine routing, access, and available equipment." },
  { icon: Ruler, t: "Boat size and weight", d: "Provide length, beam, transport height, and weight, including the trailer when applicable." },
  { icon: Trailer, t: "Trailer requirements", d: "Tell us whether your boat travels on its own suitable trailer or needs carrier-supplied marine equipment." },
  { icon: Calendar, t: "Ready date and flexibility", d: "Your requested dates and scheduling flexibility affect the available options." },
  { icon: Gear, t: "Loading and marina access", d: "Yard appointments, lifting needs, access restrictions, and unloading arrangements can affect the quote." },
];

const URGENT = [
  { icon: Bolt, t: "Expedited boat shipping", d: "We review available carriers and equipment against your requested pickup and delivery timeframe." },
  { icon: Clock, t: "Last-minute boat shipping", d: "For unexpected purchases, cancellations, or marina deadlines, provide your locations, boat details, and earliest ready date." },
  { icon: Headset, t: "Emergency boat transport", d: "For urgent overland relocation needs, call to discuss your situation, loading access, and available options." },
];

const TRAILER_OPTIONS = [
  { t: "With your trailer", d: "We review your boat and trailer details before arranging transport. Provide trailer photos, dimensions, and information about the tires, bearings, lights, brakes where fitted, and hitch connection. A suitable roadworthy trailer is necessary for towing.", img: "/images/photos/boat-route-hero.webp", alt: "Pickup towing a center console boat on a marine bunk trailer" },
  { t: "Carrier-supplied marine trailer", d: "If your boat does not have its own trailer, provide its dimensions, weight, photos, and loading arrangements. Suitable marine equipment must support the hull correctly, and the pickup and delivery locations need a workable loading and unloading plan.", img: "/images/photos/boat-route-northbound.webp", alt: "Cabin cruiser supported on a marine transport trailer behind a semi truck" },
];

const PREPARE = [
  { icon: Lock, t: "Secure loose items", d: "Remove or secure loose gear and personal items. Follow the carrier's preparation instructions for your boat." },
  { icon: Pin, t: "Photograph condition", d: "Take clear photos before pickup, including existing marks or damage, and retain your records." },
  { icon: Ruler, t: "Confirm dimensions", d: "Provide length, beam, transport height, and weight. Tell us about towers, antennas, arches, or other parts that affect transport clearance." },
  { icon: Check, t: "Confirm access and loading", d: "Verify yard hours, release requirements, loading equipment, appointments, and contacts at both ends." },
];

const HOW = [
  { t: "Request your quote", d: "Choose your direction and provide pickup and delivery ZIP codes, boat details, ready date, and trailer information. Tell us if the move is urgent." },
  { t: "Review carrier arrangements", d: "We review the matched carrier, equipment, insurance information, and pickup and delivery arrangements with you. Confirm any yard release and lifting requirements before pickup." },
  { t: "Pickup and delivery", d: "The carrier records the boat's condition at pickup and transports it using the agreed equipment. Inspect the boat at delivery and document its condition with the carrier." },
];

const FAQS: FAQ[] = [
  { q: "Can you ship my boat in either direction?", a: "Yes. This page covers New York to Florida, New Jersey to Florida, and return shipments from Florida to either state. Choose your direction and provide the exact pickup and delivery ZIP codes for your quote." },
  { q: "Does it cost the same in both directions?", a: "Not necessarily. Carrier availability, equipment, timing, and demand can differ by direction. Request a separate quote for the return move instead of assuming it will match the outbound price." },
  { q: "Do I need a trailer to ship my boat?", a: "You can request transport with or without your own trailer. If you have a trailer, provide photos and its condition. If you need marine transport equipment supplied, share the boat's dimensions, weight, photos, and available loading arrangements." },
  { q: "Can you pick up my boat at a marina?", a: "Marina pickup can be reviewed when truck access, release requirements, appointments, and loading arrangements allow it. Provide the marina contact and confirm whether lifting equipment or other assistance is needed at either end." },
  { q: "What boat dimensions do you need for a quote?", a: "Provide overall length, beam, transport height, and weight. Include trailer dimensions when applicable. Mention towers, antennas, arches, or other items that affect clearance. Tell us if you need help confirming the information." },
  { q: "How is insurance reviewed before transport?", a: "Carrier insurance information is reviewed before dispatch. Ask for the applicable coverage details and any relevant exclusions for your boat and shipment. Report its condition at pickup and delivery and retain the inspection records." },
  { q: "Can you arrange expedited or last minute boat shipping?", a: "We review your ready date, route, dimensions, and loading needs against available carriers and suitable equipment. Faster pickup is subject to availability. Call with your deadline so we can review the available options." },
  { q: "Can you help with an emergency boat relocation?", a: "We review urgent overland relocation requests between these states. This is road transport, not on-water rescue. Timing depends on equipment, routing, loading access, and the ability to release and receive the boat." },
  { q: "How far in advance should I schedule my boat shipment?", a: "Contact us when your locations, boat details, and expected ready date are known. Additional planning may be needed for seasonal moves, larger boats, lifting equipment, or marina appointments. Last-minute requests can be reviewed, but availability is not assured." },
  { q: "When is payment due?", a: "No upfront deposit is required before a carrier is assigned. Your booking documents confirm the deposit timing, remaining balance, and accepted payment arrangements. Review those terms before confirming the shipment." },
];

const RELATED = [
  { label: "Boat Transport", href: "/boat-transport-florida/" },
  { label: "With & Without a Trailer", href: "/boat-transport-without-trailer/" },
  { label: "Yacht Transport", href: "/yacht-transport/" },
  { label: "Other Boat Routes", href: "/boat-transport-florida/#routes" },
];

const CLOSING_TRUST = [
  { icon: Shield, t: "Licensed & Bonded" },
  { icon: Check, t: "Vetted Motor Carriers" },
  { icon: Layers, t: "Nationwide Coverage" },
  { icon: Anchor, t: "Careful Handling" },
];

export default function NewYorkNewJerseyFloridaBoatPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema("New York, New Jersey and Florida Boat Transport", metadata.description as string, "boat-transport/new-york-new-jersey-florida"),
          faqSchema(FAQS),
        ]}
      />

      {/* ── HERO + QUOTE FORM ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image
          src="/images/photos/boat-route-hero.webp"
          alt="Pickup towing a center console boat on a marine bunk trailer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[42%_55%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.92)_0%,rgba(13,31,53,.75)_45%,rgba(13,31,53,.35)_100%)]" />
        <Container className="relative z-[2] grid items-start gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-14 xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="max-w-[680px]">
            <Breadcrumbs items={crumbs} light />
            <p className="eyebrow mt-6 text-blue-300">New York, New Jersey &amp; Florida Boat Shipping</p>
            <h1 className="display mt-3 text-[38px] leading-[0.98] drop-shadow-[0_6px_28px_rgba(0,0,0,.55)] sm:text-[46px] xl:text-[52px]">
              Boat Transport Between New York, New Jersey &amp; Florida
            </h1>
            <p className="mt-5 max-w-[620px] text-[17px] font-medium leading-[1.6] text-white drop-shadow sm:text-[18px]">
              Boat shipping to Florida and return transport to New York and New Jersey, coordinated around your boat, pickup location, and delivery plans.
            </p>
            <p className="mt-3 max-w-[620px] text-[16px] leading-[1.6] text-white/85 sm:text-[17px]">
              Moving your boat for the season, buying or selling, or relocating? MCC Bound Legends coordinates the carrier, trailer requirements, and pickup and delivery arrangements for your move.
            </p>
            <p className="mt-3 max-w-[620px] text-[16px] leading-[1.6] text-white/85 sm:text-[17px]">
              Expedited and last-minute boat transport requests are also available for review.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn-orange h-[50px] whitespace-nowrap px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get My Free Quote <Arrow className="h-5 w-5" /></a>
              <PhoneLink location="ny_nj_boat_hero" className="btn-ghost h-[50px] whitespace-nowrap border-white/80 bg-navy/40 px-7 text-[16px] font-bold uppercase tracking-[0.04em] backdrop-blur"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <StepQuoteForm
              preselect="Boat With Trailer"
              onlyTypes={["Boat With Trailer", "Boat Without Trailer", "Yacht / Large Vessel"]}
              showDirection
              directionOptions={["New York to Florida", "New Jersey to Florida", "Florida to New York", "Florida to New Jersey"]}
              title="Get Your Boat Transport Quote"
              serviceName="New York and New Jersey to Florida Boat Transport"
            />
            <p className="mt-2 px-1 text-[12px] leading-snug text-white/70">No deposit until your carrier is assigned.</p>
          </div>
        </Container>
      </section>

      {/* ── CHOOSE YOUR DIRECTION ─────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-16">
        <Container>
          <p className="eyebrow mb-2 text-blue">Two directions, one coordinator</p>
          <h2 className="display text-[34px] text-navy sm:text-[42px]">Choose your direction</h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-slate">View pickup and delivery information for your move.</p>
          <ul className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {DIRECTIONS.map((d) => (
              <li key={d.label}>
                <Link href={d.href} className="group flex items-center gap-4 overflow-hidden rounded-xl border border-line bg-white p-3 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-blue/60 hover:shadow-lg">
                  <span className="relative block h-[92px] w-[38%] shrink-0 overflow-hidden rounded-lg bg-navy sm:h-[108px]">
                    <Image src={d.img} alt={d.alt} fill sizes="(max-width:768px) 40vw, 20vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </span>
                  <span className="display flex flex-1 items-center justify-between gap-3 text-[21px] leading-[1.05] text-navy sm:text-[24px]">
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

      {/* ── NEW YORK & NEW JERSEY → FLORIDA ───────────────────────────── */}
      <section id="to-florida" className="scroll-mt-28 bg-[#eaf4fb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="reveal-left relative aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:sticky lg:top-24">
            <Image src="/images/photos/boat-route-hero.webp" alt="Pickup towing a center console boat on a marine bunk trailer" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
          <div>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">New York and New Jersey to Florida Boat Transport</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{TO_FLORIDA.intro}</p>
            {TO_FLORIDA.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a Quote to Florida <Arrow className="h-5 w-5" /></a>
          </div>
        </Container>
      </section>

      {/* ── FLORIDA → NEW YORK & NEW JERSEY ───────────────────────────── */}
      <section id="from-florida" className="scroll-mt-28 bg-[#e3eefb] py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="order-2 lg:order-1">
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Florida to New York and New Jersey Boat Transport</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{FROM_FLORIDA.intro}</p>
            {FROM_FLORIDA.blocks.map((b) => (
              <div key={b.h} className="mt-6">
                <h3 className="text-[20px] font-bold text-navy">{b.h}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.p}</p>
              </div>
            ))}
            <a href="#quote" className="btn-orange mt-7 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]">Get a Northbound Boat Quote <Arrow className="h-5 w-5" /></a>
          </div>
          <div className="reveal-right relative order-1 aspect-[16/11] overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-card)] lg:sticky lg:top-24 lg:order-2">
            <Image src="/images/photos/boat-route-northbound.webp" alt="Cabin cruiser supported on a marine transport trailer behind a semi truck" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
        </Container>
      </section>

      {/* ── COST FACTORS ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="What affects the price" title={<>What affects New York, New Jersey and Florida boat shipping costs</>} sub="Your quote depends on the actual shipment, including its direction. We review these details before presenting a transport option:" />
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
            Request a quote for your exact direction. Carrier availability and demand can differ for the return trip.
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
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">The pickup window is the period in which the carrier is expected to collect your boat. We review carrier availability, your ready date, site access, and any marina or yard appointments before confirming the arrangements.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue/20 text-blue-300"><Bolt className="h-6 w-6" /></span>
              <div>
                <h3 className="text-[20px] font-bold">Time in transit</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/80">Transit estimates depend on the pickup and delivery locations, planned routing, weather, road conditions, and any applicable permit or operating restrictions. Tell us about travel plans and delivery deadlines when requesting your quote.</p>
              </div>
            </div>
          </div>
          <p className="mt-8 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-white/70">
            Confirm marina appointments and loading arrangements before pickup. Dates are estimates unless specifically confirmed in the shipment agreement.
          </p>
        </Container>
      </section>

      {/* ── EXPEDITED / LAST-MINUTE / EMERGENCY ───────────────────────── */}
      <section className="bg-[#eaf4fb] py-14 lg:py-16">
        <Container>
          <p className="eyebrow mb-2 text-blue">Urgent shipping</p>
          <h2 className="display text-[32px] text-navy sm:text-[40px]">Expedited, last-minute &amp; emergency boat transport</h2>
          <p className="mt-4 max-w-4xl text-[17px] leading-relaxed text-slate">
            Need to move your boat on short notice between New York, New Jersey, and Florida? Contact MCC Bound Legends about expedited boat shipping, last-minute pickup requests, and urgent transport arrangements in either direction.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {URGENT.map((u, i) => (
              <li key={u.t} className="card reveal-up p-5" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-blue ring-1 ring-line"><u.icon className="h-5 w-5" /></span>
                <h3 className="mt-3 text-[18px] font-bold text-navy">{u.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{u.d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-4xl text-[14px] leading-relaxed text-slate">
            Availability depends on the carrier, suitable equipment, loading arrangements, and route. Pickup and delivery dates must be confirmed. This service covers road transport, not on-water rescue.
          </p>
          <PhoneLink location="ny_nj_boat_urgent" className="btn-orange mt-6 h-[52px] px-7 text-[16px] font-bold uppercase tracking-[0.04em]"><Phone className="h-5 w-5" /> Call About Urgent Boat Transport &middot; {site.phone}</PhoneLink>
        </Container>
      </section>

      {/* ── TRANSPORT OPTIONS ─────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Transport options" title={<>Boat transport with or without a trailer</>} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TRAILER_OPTIONS.map((c, i) => (
              <li key={c.t} className="card reveal-up flex flex-col overflow-hidden" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span className="relative block aspect-[16/9] bg-navy"><Image src={c.img} alt={c.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></span>
                <span className="flex flex-1 flex-col p-5">
                  <b className="text-[19px] font-bold text-navy">{c.t}</b>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate">{c.d}</p>
                </span>
              </li>
            ))}
            <li className="card reveal-up flex flex-col overflow-hidden" style={{ ["--d" as string]: "140ms" }}>
              <span className="relative grid aspect-[16/9] place-items-center bg-navy text-blue-300"><Anchor className="h-16 w-16" /></span>
              <span className="flex flex-1 flex-col p-5">
                <b className="text-[19px] font-bold text-navy">Yacht transport</b>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">Larger vessels may need specialist marine transport equipment, lifting arrangements, and permits or escorts where applicable. We review the vessel&rsquo;s transport dimensions, weight, and access requirements before arranging the move.</p>
              </span>
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/boat-transport-without-trailer/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Boat transport with &amp; without a trailer <Arrow className="h-4 w-4" /></Link>
            <Link href="/yacht-transport/" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue hover:text-navy">Learn more about yacht transport <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      {/* ── PREPARE YOUR BOAT ─────────────────────────────────────────── */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container>
          <SectionHead eyebrow="Before pickup" title={<>Prepare your boat for pickup</>} sub="A few simple steps help your shipment go smoothly and avoid delays at pickup." />
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
            <p className="eyebrow mb-3 text-blue">New York, New Jersey and Florida boat shipping questions</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Frequently asked questions</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal-right"><FaqList faqs={FAQS} /></div>
        </Container>
      </section>

      {/* ── CLOSING QUOTE ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative py-16 lg:py-20">
          <div className="flex flex-col items-center gap-7 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h2 className="display text-[34px] sm:text-[44px]">Ready to Ship Between New York, New Jersey and Florida?</h2>
              <p className="mt-3 max-w-xl text-[17px] text-white/75">Tell us your direction, boat details, and ready date.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn-orange h-[54px] px-8 text-[16px] font-bold uppercase tracking-[0.04em]">Get My Free Quote <Arrow className="h-5 w-5" /></a>
              <PhoneLink location="ny_nj_boat_cta" className="btn-ghost h-[54px] px-8 text-[16px] font-bold uppercase tracking-[0.04em]"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
            </div>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-4 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {CLOSING_TRUST.map((t) => (
              <li key={t.t} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-blue-300"><t.icon className="h-5 w-5" /></span>
                <span className="text-[15px] font-semibold">{t.t}</span>
              </li>
            ))}
          </ul>
          <p className="font-hand mt-8 text-center text-[32px] text-white/90 lg:text-right">Putting Trust in Motion&trade;</p>
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
