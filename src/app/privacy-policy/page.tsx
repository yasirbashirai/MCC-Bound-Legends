import { site } from "@/data/site";
import { meta } from "@/lib/seo";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Sections";

export const metadata = meta("Privacy Policy | MCC Bound Legends", "How MCC Bound Legends LLC collects, uses and protects the information you share when requesting a transport quote, including SMS consent.", "/privacy-policy/");
const crumbs = [{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy/" }];

export default function Privacy() {
  return (
    <>
      <section className="bg-navy py-12 text-white"><Container><Breadcrumbs items={crumbs} light /><h1 className="display mt-5 text-5xl">Privacy Policy</h1><p className="mt-3 text-white/60">Last updated: September 2026</p></Container></section>
      <section className="bg-white py-14"><Container className="prose prose-slate max-w-3xl prose-headings:font-display prose-headings:uppercase prose-headings:text-navy">
        <p>{site.legalName} (“MCC”, “we”, “us”) respects your privacy. This policy explains what we collect through {site.url}, how we use it and the choices you have.</p>
        <h2>Information we collect</h2>
        <p>When you request a quote or contact us we collect the information you provide: name, phone number, email address, pickup and delivery locations, and details about the vehicle or equipment to be transported. We also collect standard technical data such as IP address, browser type and pages visited through analytics tools.</p>
        <h2>How we use it</h2>
        <ul><li>To prepare and deliver your transport quote and coordinate your shipment with a motor carrier.</li><li>To contact you by phone, email or SMS about your request.</li><li>To measure and improve our website and advertising.</li><li>To comply with legal obligations.</li></ul>
        <h2>SMS messaging</h2>
        <p>By checking the consent box on our forms you agree to receive SMS messages from {site.legalName} related to follow-up and day-to-day messages about your request at the number provided. Message frequency may vary. Message and data rates may apply. Reply HELP for assistance and STOP to opt out at any time. Consent is not a condition of purchase. Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.</p>
        <h2>Sharing</h2>
        <p>We share shipment details with the motor carrier assigned to your transport and with service providers who help us operate (for example email, SMS and analytics providers). We do not sell your personal information.</p>
        <h2>Cookies and analytics</h2>
        <p>We use Google Analytics, Google Tag Manager and Google Ads conversion tracking. You can control cookies through your browser settings.</p>
        <h2>Your choices</h2>
        <p>Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone} to access, correct or delete your information, or to opt out of communications.</p>
        <h2>Contact</h2>
        <p>{site.legalName}, {site.address.full}. {site.phone}. {site.email}.</p>
      </Container></section>
    </>
  );
}
