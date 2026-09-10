import { site } from "@/data/site";
import { generalFaqs } from "@/data/faqs";
import { meta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/Sections";

export const metadata = meta("Vehicle Transport FAQ | MCC Bound Legends", "Answers about transport quotes, deposits, brokers vs carriers, insurance in transit, pickup windows and how to prepare a car, boat or machine for transport.", "/faq/");
const crumbs = [{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq/" }];

export default function FAQ() {
  const all = generalFaqs.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(all)]} />
      <section className="bg-navy py-14 text-white">
        <Container>
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6 text-blue-300">FAQ</p>
          <h1 className="display mt-3 text-5xl sm:text-6xl">Straight answers to the questions we hear every day.</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">Not here? Call {site.phone}, {site.hours}.</p>
        </Container>
      </section>
      <section className="bg-cloud py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            {generalFaqs.map((g) => (
              <div key={g.group} className="reveal">
                <h2 className="display-md mb-4 text-2xl text-navy">{g.group}</h2>
                <FaqList faqs={g.items} />
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start"><QuoteForm variant="page" compact /></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
