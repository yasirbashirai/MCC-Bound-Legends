import Link from "next/link";
import { site } from "@/data/site";
import { categories, childrenOf, futurePages, situations } from "@/data/services";
import { meta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { Arrow, Check, VehicleIcon } from "@/components/Icons";
import { AlsoCoordinated, Breadcrumbs, CtaBand, SectionHead, SpecificGrid, TrustStrip } from "@/components/Sections";
import { CategoryPhotoGrid, SpecificPhotoGrid } from "@/components/Visual";

export const metadata = meta("Nationwide Transport Services | MCC Bound Legends", "Every transport service MCC Bound Legends coordinates: auto, commercial vehicle, boat, RV, motorcycle, construction and heavy equipment, plus specific vehicles and special situations.", "/services/");
const crumbs = [{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }];

export default function Services() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className="hero-bg relative overflow-hidden py-14 text-white lg:py-20">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6 text-blue-300">Services</p>
          <h1 className="display mt-3 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">Everything that moves on wheels, tracks or water.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">Start with what you are shipping. Then narrow to the exact vehicle or situation. Every page has its own quote form, equipment notes and considerations.</p>
          <div className="mt-10 max-w-4xl"><TrustStrip dark /></div>
        </Container>
      </section>

      <section className="bg-cloud py-16"><Container><CategoryPhotoGrid /></Container></section>

      {categories.map((c, i) => {
        const kids = childrenOf(c.slug);
        return (
          <section key={c.slug} className={`${i % 2 ? "bg-white" : "bg-cloud"} py-16`} id={c.slug}>
            <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="reveal">
                <span className="grid h-20 w-28 place-items-center rounded-2xl bg-navy text-blue-400" style={{ ["--icon-bg" as string]: "#0d1f35" }}><VehicleIcon name={c.icon} className="h-12 w-20" /></span>
                <h2 className="display mt-5 text-4xl text-navy">{c.name}</h2>
                <p className="mt-3 text-slate">{c.intro}</p>
                <ul className="mt-5 grid grid-cols-2 gap-1.5 text-sm text-slate">{c.vehicles.slice(0, 6).map((v) => <li key={v} className="flex items-start gap-1.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />{v}</li>)}</ul>
                <Link href={`/${c.slug}/`} className="btn-blue mt-6 px-5 py-3 text-[15px]">{c.name} page <Arrow className="h-4 w-4" /></Link>
              </div>
              <div>
                {kids.length > 0 ? <SpecificPhotoGrid items={kids} /> : (
                  <div className="card reveal p-6"><p className="eyebrow mb-3 text-muted">Coordinated under this category</p><ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-[15px] text-navy">{c.vehicles.map((v) => <li key={v} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />{v}</li>)}</ul></div>
                )}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="bg-navy py-16 text-white">
        <Container>
          <SectionHead light align="left" eyebrow="Special situations" title="Non-running, auction, no trailer, fleet, enclosed." />
          <div className="[&_.card]:border-white/10 [&_.card]:bg-white/5 [&_.card]:text-white [&_span.font-semibold]:text-white [&_span.text-muted]:text-white/60"><SpecificGrid items={situations} /></div>
          <p className="eyebrow mb-3 mt-10 text-blue-300">Also coordinated, ask us</p>
          <div className="[&_li]:border-white/15 [&_li]:bg-white/5 [&_li]:text-white/80"><AlsoCoordinated items={futurePages} /></div>
          <p className="mt-6 text-sm text-white/55">Not sure which category fits? Call {site.phone} and describe it. We will tell you exactly how it moves.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
