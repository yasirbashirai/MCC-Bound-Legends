import { site } from "@/data/site";
import { meta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { PhoneLink } from "@/components/PhoneLink";
import { Clock, Mail, Phone, Pin, Shield } from "@/components/Icons";
import { Breadcrumbs, TrustStrip } from "@/components/Sections";

export const metadata = meta("Contact MCC Bound Legends | Get a Free Quote", "Call (888) 785-0028 or send a quote request. MCC Bound Legends LLC, 283 Cranes Roost Blvd Suite 111, Altamonte Springs, FL 32701. Mon–Sat 8am–6pm ET.", "/contact/");
const crumbs = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }];

export default function Contact() {
  const map = `https://www.google.com/maps?q=${encodeURIComponent(site.legalName + ", " + site.address.full)}&output=embed`;
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className="bg-navy py-12 text-white">
        <Container>
          <Breadcrumbs items={crumbs} light />
          <h1 className="display mt-5 text-5xl sm:text-6xl">Talk to a transport specialist.</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">Call, email or send the form. Describe what you are moving and we will tell you exactly how it ships.</p>
        </Container>
      </section>
      <section className="bg-cloud py-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <div className="card p-6">
              <ul className="space-y-4 text-[15px] text-slate">
                <li><PhoneLink location="contact_page" className="flex items-start gap-3 hover:text-navy"><Phone className="mt-0.5 h-5 w-5 text-blue" /><span><span className="block font-display text-2xl font-bold text-navy">{site.phone}</span>Call or text</span></PhoneLink></li>
                <li><a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-navy"><Mail className="mt-0.5 h-5 w-5 text-blue" /><span><span className="block font-semibold text-navy">{site.email}</span>Quotes and general enquiries</span></a></li>
                <li className="flex items-start gap-3"><Pin className="mt-0.5 h-5 w-5 text-blue" /><span><span className="block font-semibold text-navy">{site.legalName}</span>{site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}</span></li>
                <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 text-blue" /><span><span className="block font-semibold text-navy">Hours</span>{site.hours}</span></li>
                <li className="flex items-start gap-3"><Shield className="mt-0.5 h-5 w-5 text-blue" /><span><span className="block font-semibold text-navy">Credentials</span>USDOT {site.usdot} · MC {site.mc}<br />Licensed &amp; bonded freight broker</span></li>
              </ul>
            </div>
            <div className="card overflow-hidden"><iframe title="Map to MCC Bound Legends office" src={map} className="h-64 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <div className="card p-6"><TrustStrip /></div>
          </div>
          <QuoteForm variant="page" />
        </Container>
      </section>
    </>
  );
}
