import Link from "next/link";
import { meta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { tips } from "@/data/tips";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { Arrow, Clock } from "@/components/Icons";
import { Breadcrumbs, CtaBand, SectionHead } from "@/components/Sections";

/** Auto Transport Tips hub (Milestone 2). Articles come from src/data/tips.ts. */
export const metadata = meta(
  "Auto Transport Tips & Car Shipping Guides | MCC",
  "Practical car shipping advice from MCC Bound Legends: how to prepare your car, open vs enclosed transport, snowbird season and what shipping really costs.",
  "/auto-transport-tips/",
);
const crumbs = [{ name: "Home", href: "/" }, { name: "Auto Transport Tips", href: "/auto-transport-tips/" }];

export default function TipsHub() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className="hero-bg relative overflow-hidden py-14 text-white lg:py-20">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6 text-blue-300">Auto transport tips</p>
          <h1 className="display mt-3 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">Ship smarter. Plain-English car shipping guides.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">Short, practical guides written by the team that coordinates shipments every day. No jargon, no fluff.</p>
        </Container>
      </section>

      <section className="bg-cloud py-20">
        <Container>
          <SectionHead eyebrow="Guides" title="Start here." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tips.map((t, i) => (
              <Link key={t.slug} href={`/auto-transport-tips/${t.slug}/`} className="card reveal-up group flex flex-col p-7 transition hover:-translate-y-1 hover:shadow-lg" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="display text-4xl text-blue/30">0{i + 1}</span>
                <h2 className="mt-3 text-xl font-bold leading-snug text-navy group-hover:text-blue">{t.title}</h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">{t.excerpt}</p>
                <span className="mt-5 flex items-center justify-between text-sm font-semibold text-blue">
                  <span className="flex items-center gap-1.5 text-muted"><Clock className="h-4 w-4" />{t.readMins} min read</span>
                  <span className="inline-flex items-center gap-1">Read <Arrow className="h-4 w-4" /></span>
                </span>
              </Link>
            ))}
            {/* The cost guide lives at its own URL but belongs in the hub */}
            <Link href="/cost-to-ship-a-car/" className="reveal-up group flex flex-col rounded-2xl bg-navy p-7 text-white transition hover:-translate-y-1 hover:shadow-lg">
              <span className="display text-4xl text-blue-400/50">$</span>
              <h2 className="mt-3 text-xl font-bold leading-snug group-hover:text-blue-300">How Much Does It Cost to Ship a Car?</h2>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/75">Typical price ranges by distance and vehicle, and what changes the price.</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-300">See prices <Arrow className="h-4 w-4" /></span>
            </Link>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
