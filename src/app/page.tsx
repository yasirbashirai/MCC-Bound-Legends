import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { futurePages, getPage, pages, type ServicePage } from "@/data/services";
import { homeFaqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { meta } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { heroSlides, photo } from "@/lib/images";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { Ticker } from "@/components/Ticker";
import { Arrow, Chat, Check, Clock, Doc, Headset, Route, Ruler, Shield, Users } from "@/components/Icons";
import { AlsoCoordinated, CtaBand, FaqList, ReviewGridDark, SectionHead, SpecificGrid, WhoWeServeCards, WhyUs } from "@/components/Sections";
import { CoverageBand, MatchList, SpecializedGrid, Timeline, TrailerMosaic } from "@/components/Visual";
import { HomeHero, PhotoCardRow, StatsBand, WhyBand, homeCategoryCards } from "@/components/Landing";

export const metadata = meta(
  "Nationwide Car, Boat & Equipment Transport | MCC Bound Legends",
  "Nationwide transport coordination for cars, commercial vehicles, boats, RVs, motorcycles, construction equipment and heavy machinery across all 50 states. Request a free quote.",
  "/"
);

/*
 * Homepage — client revision brief 2026-10-07 (MCC_Bound_Legends_Homepage_Revision_Brief.pdf).
 * Section order: hero → 7 service cards → stats → more than transport → right trailer →
 * coast to coast (moved up) → specific vehicles + special situations + also coordinated →
 * trust cards → 3 steps → individuals & businesses → reviews → FAQ → general CTA.
 */

/** Brief §9: four benefit points. */
const BENEFITS = [
  { icon: Clock, t: "Fast Response Times", s: "Quote assistance from a real transport coordinator." },
  { icon: Route, t: "Nationwide Coverage", s: "Transportation coordination across all 50 states." },
  { icon: Shield, t: "Verified Carrier Insurance", s: "Carrier coverage verified before dispatch." },
  { icon: Ruler, t: "Equipment Matched to Your Load", s: "Trailer and equipment selected according to actual dimensions and weight." },
];

/** Brief §13: special situations, in the client's order. Oversized Equipment → the heavy equipment page. */
const SITUATIONS: [string, string][] = [
  ["non-running-vehicle-transport", "Non-Running Vehicles"],
  ["auction-vehicle-transport", "Auction Vehicles"],
  ["boat-transport-without-trailer", "Boats Without Trailers"],
  ["enclosed-auto-transport", "Enclosed Transport"],
  ["heavy-equipment-transport", "Oversized Equipment"],
  ["fleet-vehicle-transport", "Fleet Transport"],
];

/** Brief §15: six concise trust cards. */
const TRUST_CARDS = [
  { icon: Shield, title: "Authority & Insurance Verification", text: "We verify active carrier authority and cargo insurance before dispatch." },
  { icon: Ruler, title: "Equipment Matching", text: "The carrier and trailer are selected based on the shipment's real specifications." },
  { icon: Chat, title: "Direct Communication", text: "Clear communication from booking through delivery." },
  { icon: Doc, title: "Transport Planning", text: "Dimensions, weight, loading and route are considered before dispatch." },
  { icon: Users, title: "Carrier Network", text: "We work with vetted transport professionals nationwide." },
  { icon: Headset, title: "One Point of Contact", text: "Customers are not passed around between multiple departments." },
];

/** Brief §16: three-step process. */
const STEPS = [
  { t: "Tell Us What You're Shipping", d: "Share the vehicle or equipment details, pickup and delivery locations." },
  { t: "We Plan & Match the Right Carrier", d: "We review the shipment requirements and coordinate appropriate equipment." },
  { t: "Pickup, Updates & Delivery", d: "Receive pickup coordination, transportation updates and delivery communication." },
];

/** Brief §18: three strong reviews (boat, RV, auto), shown together. */
const HOME_REVIEWS = ["Christopher Smith", "Jennifer K.", "Joshua Flowers"].map((n) => reviews.find((r) => r.name === n)!);

export default function Home() {
  const services = pages.filter((p) => p.kind === "service");
  const trustBg = photo("section-skyline");
  const situations = SITUATIONS.map(([slug, name]) => ({ ...getPage(slug)!, name })) as ServicePage[];
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <HomeHero slides={heroSlides()} />

      {/* §7 Seven service cards, directly under the hero */}
      <section className="bg-cloud py-7">
        <Container><PhotoCardRow cards={homeCategoryCards()} /></Container>
      </section>

      <StatsBand />
      <WhyBand eyebrow="Why choose MCC Bound Legends?" points={BENEFITS} />

      {/* §11 The Right Trailer for Every Move — image | content, equal heights (fixes the white gap) */}
      <section className="bg-white py-20 lg:py-24">
        <Container className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <TrailerMosaic />
          <div className="reveal-right flex flex-col justify-center">
            <p className="eyebrow mb-3 text-[13px] text-blue">Why the details matter</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">The right trailer<br /><span className="text-blue">for every move.</span></h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate">A sedan, box truck, boat, motorhome and excavator do not use the same transportation equipment. We evaluate dimensions, weight, operating condition, ground clearance, loading requirements and route before coordinating the carrier.</p>
            <div className="mt-6"><MatchList /></div>
            <Link href="/how-it-works/" className="mt-6 inline-flex items-center gap-1.5 text-[16px] font-semibold text-blue hover:text-navy">See how a shipment is planned <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      {/* §12 Coast to Coast, moved directly after the right-trailer section */}
      <CoverageBand />
      <Ticker />

      {/* §13–14 Specific vehicles + special situations + also coordinated: one service-navigation area */}
      <section className="bg-cloud py-20 lg:py-24">
        <Container>
          {/* client round 2026-10-21 §5: new heading + subtitle, the client's photo for every card */}
          <SectionHead eyebrow="What exactly is it?" title="Specialized transport for every vehicle" sub="From box trucks and yachts to excavators and heavy machinery, explore transport solutions tailored to your shipment." />
          <SpecializedGrid items={services} />
          <div className="mt-14 border-t border-line pt-14">
            <SectionHead eyebrow="Special situations" title="Non-running? Auction? No trailer?" />
            <SpecificGrid items={situations} />
          </div>
          <div className="reveal mt-10">
            <p className="eyebrow mb-3 text-[13px] text-slate">Also coordinated</p>
            <AlsoCoordinated items={futurePages} />
          </div>
        </Container>
      </section>

      {/* §15 Trust, expertise, communication, planning: full photo background, same treatment as
          "Coast to coast. Every state." (client round 2026-10-21 §6) */}
      <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-24">
        {trustBg && <Image src={trustBg} alt="" fill sizes="100vw" className="object-cover opacity-30" aria-hidden="true" />}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.97)_0%,rgba(13,31,53,.85)_50%,rgba(13,31,53,.6)_100%)]" aria-hidden="true" />
        <Container className="relative">
          <SectionHead light eyebrow="How we work" title="Trust, expertise, communication, planning." sub="We do not compete on the lowest advertised number that changes at pickup." />
          <WhyUs items={TRUST_CARDS} dark />
        </Container>
      </section>

      {/* §16 Three steps */}
      <section className="bg-cloud py-20 lg:py-24">
        <Container>
          <SectionHead eyebrow="How it works" title="Simple. Planned. Communicated." sub="Three steps, one coordinator, no deposit to book." />
          <Timeline steps={STEPS} />
          <p className="reveal mt-12 text-center"><Link href="/how-it-works/" className="btn-outline px-6 py-3 text-[15px]">The full process, step by step <Arrow className="h-4 w-4" /></Link></p>
        </Container>
      </section>

      {/* §17 Individuals and businesses, with imagery */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <SectionHead eyebrow="Who we serve" title="Individuals and businesses, the same direct service." />
          <WhoWeServeCards />
        </Container>
      </section>

      {/* §18 Reviews */}
      <section className="navy-section py-20 text-white lg:py-24">
        <Container>
          <div className="reveal mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow mb-3 text-[13px] text-blue-300">What customers say</p>
            <h2 className="display text-[36px] text-white sm:text-[44px]">Real shipments. Real people.</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-white/75">Verified public reviews from customers who shipped boats, RVs and vehicles with us.</p>
          </div>
          <ReviewGridDark reviews={HOME_REVIEWS} />
          <p className="reveal mt-10 text-center text-[15px] text-white/70">
            5-star rated on{" "}
            <a href={site.reviews.google} target="_blank" rel="noopener" className="font-semibold text-blue-300 hover:text-white">Google</a>
            {" "}and{" "}
            <a href={site.reviews.trustpilot} target="_blank" rel="noopener" className="font-semibold text-blue-300 hover:text-white">Trustpilot</a>
            {" "}·{" "}<Link href="/testimonials/" className="font-semibold text-white underline decoration-blue underline-offset-4">See all reviews</Link>
          </p>
        </Container>
      </section>

      {/* §19 FAQ */}
      <section className="bg-white py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-[13px] text-blue">Common questions</p>
            <h2 className="display text-[32px] text-navy sm:text-[40px]">Straight answers.</h2>
            <p className="mt-4 text-[18px] leading-relaxed text-slate">The questions we get on the phone every day, answered plainly.</p>
            <Link href="/faq/" className="mt-5 inline-flex items-center gap-1.5 text-[16px] font-semibold text-blue hover:text-navy">All FAQs <Arrow className="h-4 w-4" /></Link>
            <ul className="mt-8 space-y-2.5 text-[15px] text-slate">
              {["Licensed & bonded broker, USDOT " + site.usdot, "MC " + site.mc, site.hours].map((t) => <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-blue" />{t}</li>)}
            </ul>
          </div>
          <div className="reveal-right"><FaqList faqs={homeFaqs} /></div>
        </Container>
      </section>

      {/* §20 General CTA (the boat-only footer banner no longer shows here, §21) */}
      <CtaBand sub="" />
    </>
  );
}
