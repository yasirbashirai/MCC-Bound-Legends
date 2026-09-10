import { site } from "@/data/site";
import { meta } from "@/lib/seo";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Sections";

export const metadata = meta("Terms & Conditions | MCC Bound Legends", "Terms of service for MCC Bound Legends LLC transportation brokerage services, including broker role, quotes, payment, carrier insurance and claims.", "/terms-and-conditions/");
const crumbs = [{ name: "Home", href: "/" }, { name: "Terms & Conditions", href: "/terms-and-conditions/" }];

export default function Terms() {
  return (
    <>
      <section className="bg-navy py-12 text-white"><Container><Breadcrumbs items={crumbs} light /><h1 className="display mt-5 text-5xl">Terms &amp; Conditions</h1><p className="mt-3 text-white/60">Last updated: September 2026</p></Container></section>
      <section className="bg-white py-14"><Container className="prose prose-slate max-w-3xl prose-headings:font-display prose-headings:uppercase prose-headings:text-navy">
        <h2>1. Our role</h2>
        <p>{site.legalName} (USDOT {site.usdot}, MC {site.mc}) is a licensed and bonded property broker. We arrange transportation of your vehicle or equipment with independent, licensed motor carriers. MCC does not own or operate transport vehicles and does not itself perform the physical transportation. The assigned motor carrier is responsible for the care and custody of your property during transit.</p>
        <h2>2. Quotes</h2>
        <p>Quotes are based on the information you provide, including dimensions, weight, running condition and locations. Inaccurate or incomplete information may change the price or the equipment required. Quotes are estimates of current market rates and are valid for a limited time.</p>
        <h2>3. Booking and payment</h2>
        <p>No deposit is required to place a booking. Payment terms are confirmed when a carrier is assigned. Any balance due to the carrier at delivery is payable as agreed before dispatch.</p>
        <h2>4. Pickup and delivery windows</h2>
        <p>Pickup and delivery dates are estimates. MCC and its carriers make reasonable efforts to meet requested windows but do not guarantee specific dates unless confirmed in writing with the assigned carrier. Delays caused by weather, traffic, mechanical issues or circumstances beyond our control do not entitle the customer to compensation.</p>
        <h2>5. Insurance and claims</h2>
        <p>The motor carrier maintains cargo insurance, which MCC verifies before dispatch. MCC does not provide cargo insurance. Any damage must be noted on the bill of lading at delivery; claims are filed with the carrier and MCC will assist you in the process.</p>
        <h2>6. Customer responsibilities</h2>
        <p>Prepare the vehicle or equipment as instructed, disclose modifications and inoperable conditions, remove personal items not permitted by the carrier, and ensure an authorized adult is present at pickup and delivery.</p>
        <h2>7. Cancellation</h2>
        <p>Bookings may be cancelled at no charge before a carrier is assigned. Cancellations after dispatch may incur carrier fees, which will be communicated to you.</p>
        <h2>8. Governing law</h2>
        <p>These terms are governed by the laws of the State of Florida. Questions: {site.email}, {site.phone}.</p>
      </Container></section>
    </>
  );
}
