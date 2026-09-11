import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { brokerNote, childrenOf, getPage, pages } from "@/data/services";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Image from "next/image";
import { servicePhoto } from "@/lib/images";
import { Words } from "@/components/Words";
import { CategoryPhotoGrid, SpecificPhotoGrid, Timeline } from "@/components/Visual";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { PhoneLink } from "@/components/PhoneLink";
import { Arrow, Check, Phone, Shield, VehicleIcon } from "@/components/Icons";
import { Breadcrumbs, CtaBand, FaqList, ReviewCard, SectionHead, TrustStrip } from "@/components/Sections";
import { reviews } from "@/data/reviews";

type Params = { slug: string };

export function generateStaticParams(): Params[] { return pages.map((p) => ({ slug: p.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPage(slug); if (!p) return {};
  return meta(p.title, p.description, `/${p.slug}/`);
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getPage(slug); if (!p) notFound();
  const parent = p.parent ? getPage(p.parent) : undefined;
  const kids = childrenOf(p.slug);
  const related = p.related.map(getPage).filter(Boolean) as typeof pages;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, ...(parent ? [{ name: parent.name, href: `/${parent.slug}/` }] : []), { name: p.name, href: `/${p.slug}/` }];
  const img = servicePhoto(p.slug, p.parent ?? p.slug);
  const review = reviews.find((r) => r.service.toLowerCase().includes(p.name.split(" ")[0].toLowerCase())) ?? reviews[0];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(p.name, p.description, p.slug), faqSchema(p.faqs)]} />

      {/* Hero with form above the fold (client requirement on every service page) */}
      <section className="hero-bg relative overflow-hidden text-white">
        {img && <Image src={img} alt="" fill priority sizes="100vw" quality={78} className="object-cover" aria-hidden="true" />}
        <div className={`absolute inset-0 ${img ? "bg-[linear-gradient(90deg,rgba(13,31,53,.93)_0%,rgba(13,31,53,.82)_42%,rgba(13,31,53,.38)_100%)]" : ""}`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,53,.3),transparent_40%,rgba(10,22,40,.9))]" />
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        {!img && <VehicleIcon name={p.icon} className="pointer-events-none absolute -right-10 top-10 hidden h-96 w-[620px] text-blue/10 lg:block" />}
        <Container className="relative grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <Breadcrumbs items={crumbs} light />
            <p className="eyebrow mt-6 text-blue-300">{p.eyebrow}</p>
            <h1 className="display mt-3 text-5xl leading-[0.92] drop-shadow-[0_4px_24px_rgba(0,0,0,.4)] sm:text-6xl lg:text-7xl"><Words text={p.h1} step={45} /></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{p.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn-orange px-7 py-4 text-lg">Get My Free {p.name.split(" ")[0]} Quote <Arrow className="h-5 w-5" /></a>
              <PhoneLink location={`hero_${p.slug}`} className="btn-ghost px-7 py-4 text-lg"><Phone className="h-5 w-5" /> {site.phone}</PhoneLink>
            </div>
            <div className="mt-10"><TrustStrip dark cols={2} /></div>
          </div>
          <div className="reveal-right lg:sticky lg:top-28"><QuoteForm defaultType={p.formDefault} serviceName={p.name} /></div>
        </Container>
      </section>

      {/* What we coordinate + equipment */}
      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal-left">
            <p className="eyebrow mb-3 text-blue">What we coordinate</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">{p.kind === "category" ? `Every kind of ${p.name.split(" & ")[0].toLowerCase()} shipment` : `${p.name}, handled properly`}</h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
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

      {/* What we evaluate before dispatch */}
      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="Before a truck is dispatched" title="What we check, so nothing surprises you at pickup." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {p.considerations.map((c, i) => (
              <div key={c.title} className="card reveal p-6" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="display text-4xl text-blue/30">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{c.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Children (category) or siblings */}
      {(kids.length > 0 || related.length > 0) && (
        <section className="bg-white py-20">
          <Container>
            {kids.length > 0 ? (
              <>
                <SectionHead align="left" eyebrow="What exactly is it?" title={<>Specific {p.name.toLowerCase()} pages</>} />
                <SpecificPhotoGrid items={kids} />
              </>
            ) : (
              <>
                <SectionHead align="left" eyebrow="Related transport" title="You may also need" />
                <SpecificPhotoGrid items={related} />
              </>
            )}
          </Container>
        </section>
      )}

      {/* How it works + review */}
      <section className="bg-cloud py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <SectionHead align="left" eyebrow="How it works" title="Three steps. One coordinator." />
            <Timeline />
          </div>
          <div className="reveal flex flex-col gap-4">
            <p className="eyebrow text-blue">Verified review</p>
            <ReviewCard r={review} />
            <Link href="/testimonials/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-navy">All customer reviews <Arrow className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="eyebrow mb-3 text-blue">{p.name} FAQ</p>
            <h2 className="display text-4xl text-navy sm:text-5xl">Questions we hear about {p.name.toLowerCase()}.</h2>
            <p className="mt-4 text-slate">Something not covered? Call {site.phone}, {site.hours}.</p>
          </div>
          <div className="reveal"><FaqList faqs={p.faqs} /></div>
        </Container>
      </section>

      {/* Other categories */}
      <section className="bg-cloud py-16">
        <Container>
          <p className="eyebrow mb-5 text-muted">Shipping something else?</p>
          <CategoryPhotoGrid exclude={parent?.slug ?? p.slug} />
        </Container>
      </section>

      <CtaBand title={`Ready to move your ${p.kind === "category" ? p.name.split(" & ")[0].toLowerCase() : p.name.replace(/ transport$/i, "").toLowerCase()}?`} />
    </>
  );
}
