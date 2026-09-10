import Link from "next/link";
import { site } from "@/data/site";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { generalFaqs } from "@/data/faqs";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { Arrow, Check } from "@/components/Icons";
import { Breadcrumbs, CtaBand, EquipmentMatch, FaqList, SectionHead, TrustStrip } from "@/components/Sections";

export const metadata = meta("How Vehicle Transport Works | MCC Bound Legends", "How transport coordination works with MCC Bound Legends: quote, carrier matching, pickup inspection, in-transit updates and delivery. Plain-English, no deposit to book.", "/how-it-works/");
const crumbs = [{ name: "Home", href: "/" }, { name: "How It Works", href: "/how-it-works/" }];

const STEPS = [
  { t: "You tell us what is moving", pts: ["Vehicle, boat, RV or machine, with year, make and model", "Pickup and delivery ZIP codes and your preferred dates", "Running condition, and dimensions or weight for anything oversized", "Special details: auction lot, marina name, gate codes, deadlines"] },
  { t: "We evaluate and quote", pts: ["Dimensions, weight, ground clearance and loading requirements", "The right carrier equipment: open, enclosed, step deck, lowboy, RGN, marine trailer", "Permits, escorts or lift scheduling if the load needs them", "A real price for your lane and a realistic pickup window"] },
  { t: "We match a vetted carrier", pts: ["Operating authority and safety record checked", "Cargo insurance verified before dispatch, certificate available on request", "Carrier briefed on your specific vehicle and site", "You pay when the carrier is assigned, never a deposit to book"] },
  { t: "Pickup and inspection", pts: ["Driver calls ahead to confirm the time", "Joint walk-around and condition report (bill of lading) with photos", "Keys, paperwork and any release documents handed over", "You keep a copy of everything"] },
  { t: "In transit", pts: ["Updates by phone, text or email from your coordinator", "One point of contact if anything about the plan changes", "Realistic transit estimates, not promises we cannot keep"] },
  { t: "Delivery", pts: ["Driver calls ahead with an arrival window", "Inspect against the pickup condition report before signing", "Balance settled per the arrangement made when your carrier was assigned", "Tell us how it went, and leave a review if we earned it"] },
];

export default function HowItWorks() {
  const faqs = [...generalFaqs[1].items, ...generalFaqs[2].items];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <section className="hero-bg relative overflow-hidden py-14 text-white lg:py-20">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Breadcrumbs items={crumbs} light />
            <p className="eyebrow mt-6 text-blue-300">How it works</p>
            <h1 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">From first call to final inspection, here is exactly what happens.</h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">Transport coordination should not be a mystery. This is the process every MCC Bound Legends shipment follows, whether it is a sedan or a 40-ton excavator.</p>
            <div className="mt-10"><TrustStrip dark /></div>
          </div>
          <div className="lg:sticky lg:top-28"><QuoteForm compact /></div>
        </Container>
      </section>

      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="The process" title="Six steps. One coordinator. No surprises." />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className="card reveal p-6" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="display-md inline-grid h-11 w-11 place-items-center rounded-full bg-orange text-lg text-white">{i + 1}</span>
                <h2 className="mt-4 text-xl font-bold text-navy">{s.t}</h2>
                <ul className="mt-3 space-y-2 text-[15px] text-slate">{s.pts.map((p) => <li key={p} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-blue" />{p}</li>)}</ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="navy-section py-20 text-white">
        <Container>
          <SectionHead light eyebrow="Why we ask so many questions" title="Because the equipment has to fit the load." sub="Every one of these needs a different truck. Getting the details right up front is what prevents a failed pickup or a surprise charge." />
          <EquipmentMatch />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="eyebrow mb-3 text-blue">Broker vs. carrier</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">What a broker does, and why it works for you.</h2>
            <p className="mt-4 text-slate">MCC Bound Legends LLC is a licensed and bonded freight broker (USDOT {site.usdot}, MC {site.mc}). We do not own the trucks; we coordinate them. That gives you access to specialized equipment in every state, with one knowledgeable person managing your shipment instead of a dispatcher juggling a single fleet.</p>
            <Link href="/faq/" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-blue hover:text-navy">More questions answered <Arrow className="h-4 w-4" /></Link>
          </div>
          <div className="reveal"><FaqList faqs={faqs} /></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
