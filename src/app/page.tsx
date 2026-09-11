import Link from "next/link";
import { site } from "@/data/site";
import { futurePages, situations, pages } from "@/data/services";
import { generalFaqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { meta } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { heroSlides, photo } from "@/lib/images";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { Ticker } from "@/components/Ticker";
import { Arrow, Check } from "@/components/Icons";
import { AlsoCoordinated, CtaBand, FaqList, SectionHead, SpecificGrid, WhoWeServe, WhyUs } from "@/components/Sections";
import { CoverageBand, MatchList, PhotoSplit, SpecificPhotoGrid, Timeline } from "@/components/Visual";
import { LandingHero, PhotoCardRow, StatsBand, WhyBand, categoryCards } from "@/components/Landing";

export const metadata = meta(
  "Nationwide Vehicle & Equipment Transport | MCC Bound Legends",
  "Nationwide transport coordination for cars, commercial vehicles, boats, RVs, motorcycles, construction equipment and heavy machinery. Request a free quote.",
  "/"
);

const homeFaqs = [generalFaqs[1].items[0], generalFaqs[0].items[1], generalFaqs[2].items[0], generalFaqs[1].items[3]];

export default function Home() {
  const services = pages.filter((p) => p.kind === "service");
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <LandingHero
        slides={heroSlides()}
        eyebrow="Nationwide Vehicle & Equipment Transport"
        lines={["Cars. Commercial", "Vehicles. Boats.", "RVs. Equipment."]}
        sub="One trusted transport network for almost anything that moves on wheels, tracks, or water."
      />

      {/* 7 category photo cards, directly under the hero like the reference */}
      <section className="bg-cloud py-6">
        <Container><PhotoCardRow cards={categoryCards()} /></Container>
      </section>

      <StatsBand />
      <WhyBand />

      {/* Different vehicles, different equipment */}
      <section className="bg-white py-20">
        <Container>
          <PhotoSplit img={photo("hero-1")} alt="Car hauler carrying SUVs and pickups on a mountain highway at sunset" eyebrow="Why the details matter" title={<>Different vehicles need<br /><span className="text-blue">different transportation.</span></>}>
            <p className="text-lg leading-relaxed text-slate">A sedan, a box truck, a boat without a trailer, a motorhome and an excavator each need different equipment. We evaluate dimensions, weight, operating condition, ground clearance, loading and route before coordinating a carrier.</p>
            <div className="mt-6"><MatchList /></div>
            <Link href="/how-it-works/" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-blue hover:text-navy">See how a shipment is planned <Arrow className="h-4 w-4" /></Link>
          </PhotoSplit>
        </Container>
      </section>

      <Ticker />

      {/* Specific pages */}
      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="What exactly is it?" title="Specific vehicles. Specific pages." sub="Searching for a box truck, an excavator or a yacht? Each has a dedicated page with the equipment, considerations and quote form for that exact shipment." />
          <SpecificPhotoGrid items={services} />
          <div className="mt-14">
            <SectionHead align="left" eyebrow="Special situations" title="Non-running? Auction? No trailer?" />
            <SpecificGrid items={situations} />
          </div>
          <div className="reveal mt-10">
            <p className="eyebrow mb-3 text-muted">Also coordinated</p>
            <AlsoCoordinated items={futurePages} />
          </div>
        </Container>
      </section>

      {/* Why MCC detail */}
      <section className="bg-white py-20">
        <Container>
          <SectionHead eyebrow="How we work" title="Trust, expertise, communication, planning." sub="We do not compete on the lowest advertised number that changes at pickup." />
          <WhyUs />
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="How it works" title="Simple. Planned. Communicated." sub="Three steps, one coordinator, no deposit to book." />
          <Timeline />
          <p className="reveal mt-10 text-center"><Link href="/how-it-works/" className="btn-outline px-6 py-3">The full process, step by step <Arrow className="h-4 w-4" /></Link></p>
        </Container>
      </section>

      <CoverageBand />

      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="Who we serve" title="Individuals and businesses, the same direct service." />
          <WhoWeServe />
        </Container>
      </section>

      <section className="navy-section py-20 text-white">
        <Container>
          <SectionHead light eyebrow="What customers say" title="Real shipments. Real people." sub="Verified public reviews from customers who shipped boats, RVs and vehicles with us." />
          <div className="reveal-scale"><ReviewCarousel reviews={reviews.slice(0, 4)} /></div>
          <p className="reveal mt-8 text-center text-sm text-white/60">
            Read more on{" "}
            {Object.entries(site.reviews).map(([k, v], i, a) => (
              <span key={k}><a href={v} target="_blank" rel="noopener" className="font-semibold capitalize text-blue-300 hover:text-white">{k === "uship" ? "uShip" : k}</a>{i < a.length - 1 ? " · " : ""}</span>
            ))}{" "}or <Link href="/testimonials/" className="font-semibold text-white underline decoration-blue underline-offset-4">see all reviews</Link>.
          </p>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">Common questions</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">Straight answers.</h2>
            <p className="mt-4 text-slate">The questions we get on the phone every day, answered plainly.</p>
            <Link href="/faq/" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-blue hover:text-navy">All FAQs <Arrow className="h-4 w-4" /></Link>
            <ul className="mt-8 space-y-2 text-sm text-slate">
              {["Licensed & bonded broker, USDOT " + site.usdot, "MC " + site.mc, site.hours].map((t) => <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-blue" />{t}</li>)}
            </ul>
          </div>
          <div className="reveal-right"><FaqList faqs={homeFaqs} /></div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
