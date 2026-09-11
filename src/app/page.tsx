import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { categories, futurePages, situations, pages } from "@/data/services";
import { generalFaqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { meta } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { heroSlides, photo } from "@/lib/images";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { PhoneLink } from "@/components/PhoneLink";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { Ticker } from "@/components/Ticker";
import { Words } from "@/components/Words";
import { Arrow, Check, Phone, Shield, VehicleIcon } from "@/components/Icons";
import { AlsoCoordinated, FaqList, SectionHead, SpecificGrid, TrustStrip, WhoWeServe, WhyUs } from "@/components/Sections";
import { CategoryPhotoGrid, CoverageBand, FactsStrip, MatchList, PhotoSplit, SpecificPhotoGrid, Timeline } from "@/components/Visual";

export const metadata = meta(
  "Nationwide Vehicle & Equipment Transport | MCC Bound Legends",
  "Nationwide transport coordination for cars, commercial vehicles, boats, RVs, motorcycles, construction equipment and heavy machinery. Request a free quote.",
  "/"
);

const homeFaqs = [generalFaqs[1].items[0], generalFaqs[0].items[1], generalFaqs[2].items[0], generalFaqs[1].items[3]];

export default function Home() {
  const services = pages.filter((p) => p.kind === "service");
  const slides = heroSlides();
  const cab = photo("section-cab");
  const hauler = photo("hero-1");

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ── HERO: full-bleed slideshow ─────────────────────────────────── */}
      <section className="relative -mt-[1px] overflow-hidden bg-navy text-white">
        <HeroSlideshow slides={slides} />
        <Container className="relative z-[2] grid items-start gap-10 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-20">
          <div className="pt-2">
            <p className="reveal-up eyebrow inline-flex items-center gap-2 rounded-full border border-blue/40 bg-navy/60 px-3.5 py-1.5 text-blue-300 backdrop-blur">
              <Shield className="h-4 w-4" /> Licensed &amp; bonded freight broker · USDOT {site.usdot}
            </p>
            <h1 className="display mt-6 text-[54px] leading-[0.9] drop-shadow-[0_4px_24px_rgba(0,0,0,.45)] sm:text-7xl lg:text-[86px]">
              <Words text="Cars. Trucks. Boats." /><br />
              <Words text="RVs." start={280} /><span className="word !mr-0"><span className="text-blue-400" style={{ ["--d" as string]: "360ms" }}>Equipment.</span></span><br />
              <span className="text-white/90"><Words text="One call moves it all." start={460} step={60} /></span>
            </h1>
            <p className="reveal-up mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl" style={{ ["--d" as string]: "700ms" }}>
              Nationwide transport coordination for everything that moves on wheels, tracks or water. We match your vehicle or machine to the right vetted carrier and stay with you from pickup to delivery.
            </p>
            <div className="reveal-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "820ms" }}>
              <a href="#quote" className="btn-orange px-7 py-4 text-lg">Get a Free Quote <Arrow className="h-5 w-5" /></a>
              <PhoneLink location="hero" className="btn-ghost glass px-7 py-4 text-lg"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
            </div>
            <ul className="reveal-up mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80" style={{ ["--d" as string]: "940ms" }}>
              {["No deposit to book", "Carrier insurance verified before dispatch", "All 50 states", "Vetted motor carriers"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success shadow-[0_0_10px_#16a34a]" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="reveal-right lg:sticky lg:top-28" style={{ ["--d" as string]: "300ms" }}><QuoteForm compact /></div>
        </Container>

        {/* Category ribbon floating on the hero's bottom edge */}
        <div className="relative z-[2] border-t border-white/10 bg-navy-900/70 backdrop-blur-md">
          <Container>
            <ul className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 py-2.5 sm:mx-0 sm:px-0 lg:justify-between">
              {categories.map((c) => (
                <li key={c.slug} className="shrink-0">
                  <Link href={`/${c.slug}/`} className="group flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-white/80 transition hover:bg-white/5 hover:text-white">
                    <VehicleIcon name={c.icon} className="h-6 w-9 text-blue-400 transition group-hover:scale-110" />{c.name.replace(" Transport", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* ── FACTS ───────────────────────────────────────────────────────── */}
      <section className="bg-navy-800 text-white"><Container className="py-4"><FactsStrip /></Container></section>

      {/* ── WHAT ARE YOU SHIPPING ──────────────────────────────────────── */}
      <section className="bg-cloud py-24">
        <Container>
          <SectionHead eyebrow="Step 1 · What are you shipping?" title={<>Seven categories.<br />One transport partner.</>} sub="Most companies stop at cars. MCC Bound Legends coordinates the everyday and the complicated, and every category has its own specialists, equipment and process." />
          <CategoryPhotoGrid />
        </Container>
      </section>

      <Ticker />

      {/* ── DIFFERENT VEHICLES, DIFFERENT EQUIPMENT ────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <PhotoSplit img={hauler} alt="Car hauler carrying SUVs and pickups on a mountain highway at sunset" eyebrow="Why the details matter" title={<>Different vehicles need<br /><span className="text-blue">different transportation.</span></>}>
            <p className="text-lg leading-relaxed text-slate">A sedan, a box truck, a boat without a trailer, a motorhome and an excavator each need different equipment. We evaluate dimensions, weight, operating condition, ground clearance, loading and route before coordinating a carrier.</p>
            <div className="mt-6"><MatchList /></div>
            <Link href="/how-it-works/" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-blue hover:text-navy">See how a shipment is planned <Arrow className="h-4 w-4" /></Link>
          </PhotoSplit>
        </Container>
      </section>

      {/* ── SPECIFIC: WHAT EXACTLY IS IT ──────────────────────────────── */}
      <section className="bg-cloud py-24">
        <Container>
          <SectionHead eyebrow="Step 2 · What exactly is it?" title="Specific vehicles. Specific pages." sub="Searching for a box truck, an excavator or a yacht? Each has a dedicated page with the equipment, considerations and quote form for that exact shipment." />
          <SpecificPhotoGrid items={services} />
          <div className="mt-14">
            <SectionHead align="left" eyebrow="Step 3 · Special situations" title="Non-running? Auction? No trailer?" />
            <SpecificGrid items={situations} />
          </div>
          <div className="reveal mt-10">
            <p className="eyebrow mb-3 text-muted">Also coordinated</p>
            <AlsoCoordinated items={futurePages} />
          </div>
        </Container>
      </section>

      {/* ── WHY MCC ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-24">
        <Container>
          <SectionHead eyebrow="Why MCC Bound Legends" title={<>More than transport.<br />A partner you can trust.</>} sub="We compete on trust, expertise, communication, versatility and planning. Not on the lowest advertised number that changes at pickup." />
          <WhyUs />
          <div className="reveal mt-10 rounded-2xl bg-cloud p-6"><TrustStrip /></div>
        </Container>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section className="bg-cloud py-24">
        <Container>
          <SectionHead eyebrow="How it works" title="Simple. Planned. Communicated." sub="Three steps, one coordinator, no deposit to book." />
          <Timeline />
          <p className="reveal mt-10 text-center"><Link href="/how-it-works/" className="btn-outline px-6 py-3">The full process, step by step <Arrow className="h-4 w-4" /></Link></p>
        </Container>
      </section>

      {/* ── COVERAGE ───────────────────────────────────────────────────── */}
      <CoverageBand />

      {/* ── WHO WE SERVE ───────────────────────────────────────────────── */}
      <section className="bg-cloud py-24">
        <Container>
          <SectionHead eyebrow="Who we serve" title="Individuals and businesses, the same direct service." />
          <WhoWeServe />
        </Container>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────────────────── */}
      <section className="navy-section py-24 text-white">
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

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
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

      {/* ── CTA with photo backdrop ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        {cab && <Image src={cab} alt="" fill sizes="100vw" className="object-cover opacity-35" aria-hidden="true" />}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.95),rgba(13,31,53,.7))]" />
        <Container className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="reveal-left">
            <h2 className="display text-5xl sm:text-6xl">Ready to move it?<br /><span className="text-blue-400">Get your free quote.</span></h2>
            <p className="mt-4 max-w-xl text-white/75">No deposit to book. Carrier insurance verified before dispatch. A real coordinator on every shipment.</p>
          </div>
          <div className="reveal-right flex flex-col gap-3 sm:flex-row">
            <Link href="/get-a-quote/" className="btn-orange px-8 py-4 text-lg">Get My Free Quote <Arrow className="h-5 w-5" /></Link>
            <PhoneLink location="cta_band" className="btn-ghost glass px-8 py-4 text-lg"><Phone className="h-5 w-5" /> {site.phone}</PhoneLink>
          </div>
        </Container>
      </section>
    </>
  );
}
