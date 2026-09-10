import Link from "next/link";
import { site } from "@/data/site";
import { categories, futurePages, situations, pages } from "@/data/services";
import { generalFaqs } from "@/data/faqs";
import { meta } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { PhoneLink } from "@/components/PhoneLink";
import { Arrow, Check, Phone, Shield, VehicleIcon } from "@/components/Icons";
import { AlsoCoordinated, CategoryGrid, Coverage, CtaBand, EquipmentMatch, FaqList, HowItWorks, Reviews, SectionHead, SpecificGrid, TrustStrip, WhoWeServe, WhyUs } from "@/components/Sections";

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

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        {/* animated convoy silhouettes */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden opacity-[0.16]" aria-hidden="true">
          <div className="marquee flex w-[200%] items-end gap-16 text-blue-300">
            {[0, 1].map((k) => (
              <div key={k} className="flex w-1/2 items-end justify-around gap-10">
                {(["semi", "boat", "car", "rv", "excavator", "boxtruck", "motorcycle", "yacht", "bulldozer", "truck"] as const).map((n) => <VehicleIcon key={n} name={n} className="h-16 w-28 shrink-0" />)}
              </div>
            ))}
          </div>
        </div>

        <Container className="relative grid items-start gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="pt-2">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-blue/40 bg-blue/10 px-3.5 py-1.5 text-blue-300">
              <Shield className="h-4 w-4" /> Licensed &amp; bonded freight broker · USDOT {site.usdot}
            </p>
            <h1 className="display mt-6 text-[52px] leading-[0.9] sm:text-7xl lg:text-[84px]">
              Cars. Trucks. Boats.<br />RVs. <span className="text-blue-400">Equipment.</span><br />
              <span className="text-white/90">One call moves it all.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Nationwide transport coordination for everything that moves on wheels, tracks or water. We match your vehicle or machine to the right vetted carrier and stay with you from pickup to delivery.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn-orange px-7 py-4 text-lg">Get a Free Quote <Arrow className="h-5 w-5" /></a>
              <PhoneLink location="hero" className="btn-ghost px-7 py-4 text-lg"><Phone className="h-5 w-5" /> Call {site.phone}</PhoneLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
              {["No deposit to book", "Carrier insurance verified before dispatch", "All 50 states", "Vetted motor carriers"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success shadow-[0_0_10px_#16a34a]" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="lg:sticky lg:top-28"><QuoteForm compact /></div>
        </Container>

        {/* Category ribbon */}
        <div className="relative border-t border-white/10 bg-navy-900/60 backdrop-blur">
          <Container>
            <ul className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 py-3 sm:mx-0 sm:justify-between sm:px-0">
              {categories.map((c) => (
                <li key={c.slug} className="shrink-0">
                  <Link href={`/${c.slug}/`} className="group flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-white/80 hover:bg-white/5 hover:text-white">
                    <VehicleIcon name={c.icon} className="h-6 w-9 text-blue-400" />{c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* ── WHAT ARE YOU SHIPPING ─────────────────────────────────────── */}
      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="Step 1 · What are you shipping?" title={<>Seven categories.<br />One transport partner.</>} sub="Most companies stop at cars. MCC Bound Legends coordinates the everyday and the complicated, and every category below has its own specialists, equipment and process." />
          <CategoryGrid />
        </Container>
      </section>

      {/* ── DIFFERENT VEHICLES, DIFFERENT EQUIPMENT ───────────────────── */}
      <section className="navy-section py-20 text-white">
        <Container>
          <SectionHead light eyebrow="Why the details matter" title={<>Different vehicles need<br /><span className="text-blue-400">different transportation.</span></>} sub="A sedan, a box truck, a boat without a trailer, a motorhome and an excavator each need different equipment. We evaluate dimensions, weight, operating condition, ground clearance, loading and route before coordinating a carrier." />
          <EquipmentMatch />
          <div className="reveal mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 sm:flex-row">
            <p className="text-white/80">Carrier equipment we coordinate: <span className="text-white">open &amp; enclosed auto carriers, hotshots, flatbeds, step decks, lowboys, RGNs, hydraulic marine trailers</span> and other specialized equipment.</p>
            <Link href="/how-it-works/" className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-blue-300 hover:text-white">How it works <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      {/* ── SPECIFIC: WHAT EXACTLY IS IT ─────────────────────────────── */}
      <section className="bg-white py-20">
        <Container>
          <SectionHead eyebrow="Step 2 · What exactly is it?" title="Specific vehicles. Specific pages." sub="Searching for a box truck, an excavator or a yacht? Each one has a dedicated page with the equipment, considerations and quote form for that exact shipment." />
          <SpecificGrid items={services} />
          <div className="reveal mt-10">
            <SectionHead align="left" eyebrow="Step 3 · Special situations" title="Non-running? Auction? No trailer?" />
            <SpecificGrid items={situations} />
          </div>
          <div className="reveal mt-10">
            <p className="eyebrow mb-3 text-muted">Also coordinated</p>
            <AlsoCoordinated items={futurePages} />
          </div>
        </Container>
      </section>

      {/* ── WHY MCC ──────────────────────────────────────────────────── */}
      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="Why MCC Bound Legends" title={<>More than transport.<br />A partner you can trust.</>} sub="We compete on trust, expertise, communication, versatility and planning. Not on the lowest advertised number that changes at pickup." />
          <WhyUs />
          <div className="reveal mt-10 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)]"><TrustStrip /></div>
        </Container>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <Container>
          <SectionHead eyebrow="How it works" title="Simple. Planned. Communicated." sub="Three steps, one coordinator, no deposit to book." />
          <HowItWorks />
          <p className="reveal mt-8 text-center"><Link href="/how-it-works/" className="inline-flex items-center gap-1.5 font-semibold text-blue hover:text-navy">See the full process, including what happens at pickup <Arrow className="h-4 w-4" /></Link></p>
        </Container>
      </section>

      {/* ── COVERAGE ─────────────────────────────────────────────────── */}
      <section className="navy-section py-20"><Container><Coverage /></Container></section>

      {/* ── WHO WE SERVE ─────────────────────────────────────────────── */}
      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="Who we serve" title="Individuals and businesses, the same direct service." />
          <WhoWeServe />
        </Container>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <Container>
          <SectionHead eyebrow="What customers say" title="Real shipments. Real people." sub="Verified public reviews from customers who shipped boats, RVs and vehicles with us." />
          <Reviews />
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-cloud py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="eyebrow mb-3 text-blue">Common questions</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">Straight answers.</h2>
            <p className="mt-4 text-slate">The questions we get on the phone every day, answered plainly.</p>
            <Link href="/faq/" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-blue hover:text-navy">All FAQs <Arrow className="h-4 w-4" /></Link>
            <ul className="mt-8 space-y-2 text-sm text-slate">
              {["Licensed & bonded broker, USDOT " + site.usdot, "MC " + site.mc, site.hours].map((t) => <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-blue" />{t}</li>)}
            </ul>
          </div>
          <div className="reveal"><FaqList faqs={homeFaqs} /></div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
