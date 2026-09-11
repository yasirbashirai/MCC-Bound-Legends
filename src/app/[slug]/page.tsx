import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { brokerNote, childrenOf, getPage, iconFor, pages } from "@/data/services";
import { reviews } from "@/data/reviews";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { photo, servicePhoto } from "@/lib/images";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { Arrow, Check, Doc, Route, Ruler, Shield } from "@/components/Icons";
import { Breadcrumbs, CtaBand, FaqList, ReviewCard, SectionHead } from "@/components/Sections";
import { SpecificPhotoGrid, Timeline } from "@/components/Visual";
import { LandingHero, PhotoCardRow, StatsBand, WhyBand, categoryCards, type TypeCard } from "@/components/Landing";

type Params = { slug: string };
export function generateStaticParams(): Params[] { return pages.map((p) => ({ slug: p.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params; const p = getPage(slug); if (!p) return {};
  return meta(p.title, p.description, `/${p.slug}/`);
}

/** Per-category flavour for the hero right column + type row heading. */
const FLAVOUR: Record<string, { tag: [string, string]; rowEyebrow: string; rowTitle: string; whyTitle: React.ReactNode }> = {
  "auto-transport": { tag: ["Any car.", "Any state."], rowEyebrow: "We transport all types of vehicles", rowTitle: "Any car. Anywhere.", whyTitle: <>Door to door.<br />Coast to coast.</> },
  "boat-transport": { tag: ["Florida boats.", "Bigger horizons."], rowEyebrow: "We transport all types of boats", rowTitle: "Any boat. Anywhere.", whyTitle: <>Florida rooted.<br />Nationwide service.</> },
  "rv-transport": { tag: ["Home on wheels.", "Moved with care."], rowEyebrow: "We transport all types of RVs", rowTitle: "Any RV. Anywhere.", whyTitle: <>Drive-away or hauled.<br />Your call.</> },
  "commercial-vehicle-transport": { tag: ["Business moves.", "Handled."], rowEyebrow: "We transport all types of commercial vehicles", rowTitle: "Any truck. Any fleet.", whyTitle: <>Built for<br />businesses.</> },
  "motorcycle-transport": { tag: ["Two wheels.", "Zero worries."], rowEyebrow: "We transport all types of powersports", rowTitle: "Any bike. Anywhere.", whyTitle: <>Strapped, chocked,<br />protected.</> },
  "construction-equipment-transport": { tag: ["Heavy iron.", "Moved right."], rowEyebrow: "We transport all types of equipment", rowTitle: "Any machine. Any site.", whyTitle: <>Permits, trailers,<br />loading. Handled.</> },
  "heavy-equipment-transport": { tag: ["Oversize.", "On schedule."], rowEyebrow: "We transport all types of machinery", rowTitle: "Any load. Any size.", whyTitle: <>Planned down to<br />the last bridge.</> },
};
const BOAT_TYPES: TypeCard[] = [
  { href: "#quote", title: "Center Console Boats", sub: "18' to 40+ feet", img: photo("type-center-console"), icon: "boat" },
  { href: "/yacht-transport/", title: "Yacht Transport", sub: "Luxury & oversized", img: photo("type-yacht"), icon: "yacht" },
  { href: "#quote", title: "Sailboat Transport", sub: "Mast down, local & long distance", img: photo("type-sailboat"), icon: "boat" },
  { href: "#quote", title: "Pontoon Boats", sub: "All sizes and brands", img: photo("type-pontoon"), icon: "boat" },
  { href: "#quote", title: "Fishing Boats", sub: "Inshore & offshore", img: photo("type-fishing-boat"), icon: "boat" },
  { href: "#quote", title: "Jet Skis & Watercraft", sub: "Single or multiple units", img: photo("type-jet-ski"), icon: "boat" },
];

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getPage(slug); if (!p) notFound();
  const parent = p.parent ? getPage(p.parent) : undefined;
  const cat = parent ?? p;
  const kids = childrenOf(p.slug);
  const related = p.related.map(getPage).filter(Boolean) as typeof pages;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, ...(parent ? [{ name: parent.name, href: `/${parent.slug}/` }] : []), { name: p.name, href: `/${p.slug}/` }];
  const review = reviews.find((r) => r.service.toLowerCase().includes(p.name.split(" ")[0].toLowerCase())) ?? reviews[0];
  const fl = FLAVOUR[cat.slug] ?? FLAVOUR["auto-transport"];
  const heroImg = servicePhoto(p.slug, p.parent ?? p.slug);
  const slides = cat.slug === "boat-transport" && photo("hero-2") ? [{ src: photo("hero-2")!, alt: "Boat transport on a Florida causeway" }] : heroImg ? [{ src: heroImg, alt: p.name }] : [];
  const firstSentence = p.intro.split(". ")[0] + ".";

  // Type cards: children pages first (real links), then vehicle types from the data (quote anchors)
  const typeCards: TypeCard[] = cat.slug === "boat-transport" && p.kind === "category" ? BOAT_TYPES : [
    ...kids.map((k) => ({ href: `/${k.slug}/`, title: k.name, sub: k.short, img: photo(`svc-${k.slug}`), icon: k.icon })),
    ...p.vehicles.map((v) => ({ href: "#quote", title: v, sub: "Get a quote", img: null, icon: iconFor(v, p.icon) })),
  ].slice(0, 7);
  const clip = (t: string, n = 64) => (t.length <= n ? t : t.slice(0, n).replace(/\s+\S*$/, "") + "…");
  const whyPts = p.considerations.slice(0, 4).map((c, i) => ({ icon: [Ruler, Route, Doc, Shield][i], t: c.title, s: clip(c.text.split(". ")[0]) }));

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(p.name, p.description, p.slug), faqSchema(p.faqs)]} />

      <LandingHero
        slides={slides}
        fallbackIcon={p.icon}
        crumbs={<div className="mb-4"><Breadcrumbs items={crumbs} light /></div>}
        eyebrow={p.eyebrow}
        lines={[p.h1]}
        sub={firstSentence}
        formDefault={p.formDefault}
        serviceName={p.name}
        formTitle={`Get Your ${p.name.replace(/ Transport$| Shipping$/i, "")} Quote`}
        tagline={fl.tag}
      />

      {/* Type row */}
      <section className="bg-cloud py-8">
        <Container>
          <div className="reveal mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-blue">{fl.rowEyebrow}</p>
              <h2 className="display mt-1 text-4xl text-navy sm:text-5xl">{p.kind === "category" ? fl.rowTitle : `${p.name}, handled properly.`}</h2>
              <p className="mt-1 text-sm text-slate">Trusted by owners, dealers and businesses nationwide.</p>
            </div>
            <Link href="/services/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-navy">View all services <Arrow className="h-4 w-4" /></Link>
          </div>
          <PhotoCardRow cards={typeCards} cols={typeCards.length >= 7 ? 7 : 6} />
        </Container>
      </section>

      <WhyBand eyebrow={`Why choose MCC for ${p.name.toLowerCase()}`} title={fl.whyTitle} points={whyPts} />

      {/* What we coordinate + equipment */}
      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">What we coordinate</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">{p.kind === "category" ? `Every kind of ${p.name.split(" & ")[0].toLowerCase()} shipment` : `${p.name}, handled properly`}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">{p.intro}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {p.vehicles.map((v) => <li key={v} className="flex items-start gap-2.5 rounded-lg bg-cloud px-3.5 py-2.5 text-[15px] font-medium text-navy"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />{v}</li>)}
            </ul>
          </div>
          <div className="reveal-right rounded-2xl bg-navy p-7 text-white">
            <p className="eyebrow mb-3 text-blue-300">Carrier equipment typically used</p>
            <ul className="space-y-3">{p.equipment.map((e) => <li key={e} className="flex items-start gap-3 text-[15px] text-white/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />{e}</li>)}</ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-[13px] leading-relaxed text-white/55"><Shield className="mr-1.5 inline h-4 w-4 text-blue-400" />{brokerNote}</p>
          </div>
        </Container>
      </section>

      <StatsBand />

      {/* What we check */}
      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="Before a truck is dispatched" title="What we check, so nothing surprises you at pickup." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {p.considerations.map((c, i) => (
              <div key={c.title} className="card reveal-up p-6" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="display text-4xl text-blue/30">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{c.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {(kids.length > 0 || related.length > 0) && (
        <section className="bg-white py-20">
          <Container>
            <SectionHead align="left" eyebrow={kids.length ? "What exactly is it?" : "Related transport"} title={kids.length ? <>Specific {p.name.toLowerCase()} pages</> : "You may also need"} />
            <SpecificPhotoGrid items={kids.length ? kids : related} />
          </Container>
        </section>
      )}

      <section className="bg-cloud py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div><SectionHead align="left" eyebrow="How it works" title="Three steps. One coordinator." /><Timeline /></div>
          <div className="reveal-right flex flex-col gap-4">
            <p className="eyebrow text-blue">Verified review</p>
            <ReviewCard r={review} />
            <Link href="/testimonials/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-navy">All customer reviews <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">{p.name} FAQ</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">Questions we hear about {p.name.toLowerCase()}.</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal-right"><FaqList faqs={p.faqs} /></div>
        </Container>
      </section>

      <section className="bg-cloud py-14">
        <Container>
          <p className="eyebrow mb-4 text-muted">Shipping something else?</p>
          <PhotoCardRow cards={categoryCards(cat.slug)} cols={6} />
        </Container>
      </section>

      <CtaBand title={`Ready to move your ${p.kind === "category" ? p.name.split(" & ")[0].toLowerCase() : p.name.replace(/ transport$/i, "").toLowerCase()}?`} />
    </>
  );
}
