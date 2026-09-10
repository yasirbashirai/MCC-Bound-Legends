import { site } from "@/data/site";
import { meta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { PhoneLink } from "@/components/PhoneLink";
import { Check, Phone } from "@/components/Icons";
import { Breadcrumbs, HowItWorks, TrustStrip } from "@/components/Sections";
import type { ShipType } from "@/data/services";
import { getShipOption } from "@/data/quote";

export const metadata = meta("Get a Free Transport Quote | MCC Bound Legends", "Request a free, no-obligation transport quote for a car, truck, boat, RV, motorcycle or equipment. No deposit to book. A real coordinator reviews every request.", "/get-a-quote/");
const crumbs = [{ name: "Home", href: "/" }, { name: "Get a Quote", href: "/get-a-quote/" }];

export default async function Quote({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const def = (getShipOption(type)?.value ?? "car") as ShipType;
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className="bg-navy py-12 text-white">
        <Container>
          <Breadcrumbs items={crumbs} light />
          <h1 className="display mt-5 text-5xl sm:text-6xl">Get your free transport quote.</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">Tell us what is moving and where. For commercial vehicles, boats and equipment, add dimensions and we quote the right trailer the first time. No deposit to book.</p>
        </Container>
      </section>
      <section className="bg-cloud py-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <QuoteForm variant="page" defaultType={def} />
          <aside className="space-y-6">
            <div className="card p-6">
              <p className="eyebrow mb-3 text-blue">Prefer to talk?</p>
              <PhoneLink location="quote_page" className="font-display text-4xl font-bold text-navy">{site.phone}</PhoneLink>
              <p className="mt-2 text-sm text-slate">{site.hours}. Ask for a transport specialist and describe what you are moving.</p>
              <PhoneLink location="quote_page_btn" className="btn-blue mt-4 w-full py-3"><Phone className="h-4 w-4" /> Call now</PhoneLink>
            </div>
            <div className="card p-6">
              <p className="eyebrow mb-3 text-blue">What happens next</p>
              <ul className="space-y-3 text-[15px] text-slate">
                {["A coordinator reviews your request and checks current carrier rates on your lane.", "You receive a real quote and a realistic pickup window, by phone or email.", "If you approve, we match a vetted carrier and verify insurance before dispatch.", "You pay when the carrier is assigned. No deposit to book."].map((t) => <li key={t} className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-success" />{t}</li>)}
              </ul>
            </div>
            <div className="card p-6"><TrustStrip /></div>
          </aside>
        </Container>
      </section>
      <section className="bg-white py-16"><Container><HowItWorks compact /></Container></section>
    </>
  );
}
