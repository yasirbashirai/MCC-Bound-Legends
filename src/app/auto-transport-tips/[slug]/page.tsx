import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { getTip, tips } from "@/data/tips";
import { getPage } from "@/data/services";
import { meta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { Arrow, Check, Clock } from "@/components/Icons";
import { Breadcrumbs, CtaBand } from "@/components/Sections";

type Params = { slug: string };
export function generateStaticParams(): Params[] { return tips.map((t) => ({ slug: t.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params; const t = getTip(slug); if (!t) return {};
  return meta(t.metaTitle, t.description, `/auto-transport-tips/${t.slug}/`);
}

export default async function TipArticle({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTip(slug); if (!t) notFound();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Auto Transport Tips", href: "/auto-transport-tips/" }, { name: t.title, href: `/auto-transport-tips/${t.slug}/` }];
  const related = t.related.map(getPage).filter(Boolean);
  const others = tips.filter((o) => o.slug !== t.slug);
  const article = {
    "@context": "https://schema.org", "@type": "Article", headline: t.title, description: t.description,
    datePublished: t.date, dateModified: t.date, mainEntityOfPage: `${site.url}/auto-transport-tips/${t.slug}/`,
    author: { "@type": "Organization", name: site.name }, publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), article]} />
      <section className="hero-bg relative overflow-hidden py-14 text-white lg:py-16">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6 text-blue-300">Auto transport tips</p>
          <h1 className="display mt-3 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="mt-5 flex items-center gap-2 text-white/65"><Clock className="h-4 w-4" />{t.readMins} min read</p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
          <article className="max-w-3xl">
            <p className="text-xl leading-relaxed text-navy">{t.excerpt}</p>
            {t.sections.map((s) => (
              <div key={s.h} className="mt-10">
                <h2 className="display text-3xl text-navy">{s.h}</h2>
                {s.p?.map((p) => <p key={p} className="mt-4 text-[17px] leading-relaxed text-slate">{p}</p>)}
                {s.list && (
                  <ul className="mt-4 space-y-3">
                    {s.list.map((l) => <li key={l} className="flex items-start gap-3 text-[17px] leading-relaxed text-slate"><Check className="mt-1.5 h-4 w-4 shrink-0 text-blue" />{l}</li>)}
                  </ul>
                )}
              </div>
            ))}
            <div className="mt-12 rounded-2xl bg-cloud p-7">
              <p className="font-semibold text-navy">Questions about your shipment?</p>
              <p className="mt-1 text-slate">Call {site.phone}, {site.hours}, or request a free quote. No deposit to book.</p>
            </div>
            {related.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow mb-3 text-blue">Related services</p>
                <ul className="flex flex-wrap gap-2.5">
                  {related.map((r) => r && <li key={r.slug}><Link href={`/${r.slug}/`} className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[14px] font-semibold text-navy hover:border-blue hover:text-blue">{r.name}<Arrow className="h-3.5 w-3.5 text-blue" /></Link></li>)}
                </ul>
              </div>
            )}
          </article>
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <QuoteForm compact />
            <div className="card p-6">
              <p className="eyebrow mb-3 text-blue">More tips</p>
              <ul className="space-y-3">
                {others.map((o) => <li key={o.slug}><Link href={`/auto-transport-tips/${o.slug}/`} className="font-semibold text-navy hover:text-blue">{o.title}</Link></li>)}
                <li><Link href="/cost-to-ship-a-car/" className="font-semibold text-navy hover:text-blue">How Much Does It Cost to Ship a Car?</Link></li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
