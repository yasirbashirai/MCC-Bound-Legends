import { site } from "@/data/site";
import { meta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { Check, Shield } from "@/components/Icons";
import { Breadcrumbs, CategoryGrid, Coverage, CtaBand, SectionHead, TrustStrip, WhoWeServe, WhyUs } from "@/components/Sections";

export const metadata = meta("About MCC Bound Legends | Vehicle Transport", "MCC Bound Legends LLC is a licensed, bonded transportation brokerage in Altamonte Springs, Florida, coordinating vehicle, marine, RV, commercial and heavy-equipment transport nationwide.", "/about-us/");
const crumbs = [{ name: "Home", href: "/" }, { name: "About Us", href: "/about-us/" }];

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className="hero-bg relative overflow-hidden py-14 text-white lg:py-20">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6 text-blue-300">About us</p>
          <h1 className="display mt-3 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">Not simply a car-shipping company.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">{site.legalName} is a nationwide transportation brokerage based in Altamonte Springs, Florida. We coordinate transport for everything from passenger cars and motorcycles to box trucks, boats, motorhomes, excavators and oversized machinery.</p>
          <p className="display mt-8 text-2xl text-blue-400">{site.tagline}.</p>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="reveal space-y-5 text-[17px] leading-relaxed text-slate">
            <p className="eyebrow text-blue">What sets us apart</p>
            <h2 className="display text-4xl text-navy">Different vehicles require different solutions. We start there.</h2>
            <p>A standard sedan might move on an open auto carrier. A high-roof commercial box truck may need a step deck or lowboy. A boat without a trailer may require specialized marine equipment and marina loading assistance. A large excavator may require an RGN, oversize permits, escorts and route planning.</p>
            <p>Instead of treating every shipment the same, we look at the actual vehicle or equipment specifications, dimensions, weight, operating condition, ground clearance, loading requirements and route, and coordinate transportation accordingly.</p>
            <p>MCC combines nationwide carrier access with personal transportation coordination. You should feel that you have someone knowledgeable managing your shipment rather than being passed between call-center representatives.</p>
          </div>
          <div className="space-y-5">
            <div className="card reveal p-6">
              <p className="eyebrow mb-3 text-blue">Credentials</p>
              <ul className="space-y-3 text-[15px] text-navy">
                {[`Licensed & bonded freight broker`, `USDOT ${site.usdot}`, `MC ${site.mc}`, `Vetted motor carriers, insurance verified before dispatch`, `Based in ${site.address.city}, Florida, serving all 50 states`].map((t) => <li key={t} className="flex items-start gap-2.5"><Shield className="mt-0.5 h-4 w-4 shrink-0 text-blue" />{t}</li>)}
              </ul>
            </div>
            <div className="card reveal p-6">
              <p className="eyebrow mb-3 text-blue">We compete on</p>
              <ul className="grid grid-cols-2 gap-2 text-[15px] font-semibold text-navy">
                {["Trust", "Expertise", "Communication", "Versatility", "Planning", "Professional service"].map((t) => <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{t}</li>)}
              </ul>
              <p className="mt-4 text-sm text-slate">Not on the lowest advertised price. Our ideal customer values proper planning and reliability over a teaser rate that changes at pickup.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cloud py-20"><Container><SectionHead eyebrow="Our promise" title="How we work on every shipment." /><WhyUs /><div className="reveal mt-10 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)]"><TrustStrip /></div></Container></section>
      <section className="navy-section py-20"><Container><Coverage /></Container></section>
      <section className="bg-white py-20"><Container><SectionHead eyebrow="Who we serve" title="Individuals and businesses across the country." /><WhoWeServe /></Container></section>
      <section className="bg-cloud py-16"><Container><p className="eyebrow mb-5 text-muted">What we coordinate</p><CategoryGrid /></Container></section>
      <CtaBand />
    </>
  );
}
