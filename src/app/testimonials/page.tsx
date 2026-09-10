import { site } from "@/data/site";
import { reviews } from "@/data/reviews";
import { meta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { Arrow, Star } from "@/components/Icons";
import { Breadcrumbs, CtaBand, ReviewCard, SectionHead } from "@/components/Sections";

export const metadata = meta("Customer Reviews & Testimonials | MCC Bound Legends", "Verified public reviews from MCC Bound Legends customers who shipped boats, RVs, cars and multiple vehicles. Read them on Google, Trustpilot, Yelp and uShip.", "/testimonials/");
const crumbs = [{ name: "Home", href: "/" }, { name: "Reviews", href: "/testimonials/" }];

export default function Testimonials() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className="hero-bg relative overflow-hidden py-14 text-white lg:py-20">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6 text-blue-300">Reviews</p>
          <h1 className="display mt-3 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">Real shipments. Real people. Their words.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">Every review below is a verified public review from a customer. We do not write, buy or edit testimonials. Read them at the source on any of the platforms linked.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {Object.entries(site.reviews).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold capitalize hover:bg-white/10"><Star className="h-4 w-4 text-orange" />{k === "uship" ? "uShip" : k} <Arrow className="h-3.5 w-3.5" /></a>)}
          </div>
        </Container>
      </section>
      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="What customers say" title="Boats, RVs, cars and fleets." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{reviews.map((r) => <ReviewCard key={r.name} r={r} />)}</div>
        </Container>
      </section>
      <CtaBand title="Join them. Get your free quote." />
    </>
  );
}
