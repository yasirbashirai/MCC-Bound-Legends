import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { Arrow, Star, Phone } from "@/components/Icons";

/**
 * Review request page (Milestone 2): the link the team texts/emails a customer after delivery.
 * Not in the nav or sitemap, and noindex, so it only reaches real customers.
 * TODO(client): send the Google "write a review" link (Google Business Profile > Ask for reviews)
 * to replace the search link in site.reviews.google.
 */
export const metadata: Metadata = { title: "Leave a Review | MCC Bound Legends", robots: { index: false, follow: false } };

const PLATFORMS = [
  { name: "Google", sub: "Helps other customers find us the most", href: site.reviews.google, primary: true },
  { name: "Trustpilot", sub: "Independent review platform", href: "https://www.trustpilot.com/evaluate/mccboundlegends.com", primary: false },
  { name: "Facebook", sub: "Recommend us on our page", href: `${site.social.facebook}reviews/`, primary: false },
];

export default function LeaveAReview() {
  return (
    <>
      <section className="hero-bg relative overflow-hidden py-16 text-white lg:py-24">
        <div className="road-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative mx-auto max-w-3xl text-center">
          <div className="flex justify-center gap-1.5 text-orange" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-8 w-8" />)}</div>
          <p className="eyebrow mt-6 text-blue-300">Thank you for shipping with us</p>
          <h1 className="display mt-3 text-5xl sm:text-6xl">How did we do?</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">Your vehicle has arrived. If we earned it, a short review takes about a minute and helps other families and businesses choose a transport partner they can trust.</p>
        </Container>
      </section>

      <section className="bg-cloud py-16">
        <Container className="mx-auto grid max-w-3xl gap-4">
          {PLATFORMS.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener" className={`flex items-center justify-between gap-4 rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${p.primary ? "bg-navy text-white" : "card"}`}>
              <div>
                <p className={`text-xl font-bold ${p.primary ? "text-white" : "text-navy"}`}>Review us on {p.name}</p>
                <p className={`mt-1 text-[15px] ${p.primary ? "text-white/70" : "text-slate"}`}>{p.sub}</p>
              </div>
              <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-5 py-3 font-bold ${p.primary ? "btn-orange" : "border-2 border-navy text-navy"}`}>Write a review <Arrow className="h-4 w-4" /></span>
            </a>
          ))}

          <div className="mt-6 rounded-2xl border border-line bg-white p-6 text-center">
            <p className="text-lg font-bold text-navy">Something not right?</p>
            <p className="mt-1 text-slate">Tell us first and we will make it right. Call {site.contact.name.split(" ")[0]} and the team directly.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-5 py-2.5 font-bold text-navy hover:bg-navy hover:text-white"><Phone className="h-4 w-4" />{site.phone}</a>
              <a href={`mailto:${site.contact.email}?subject=My%20shipment`} className="inline-flex items-center gap-2 rounded-lg border-2 border-line px-5 py-2.5 font-bold text-navy hover:border-navy">Email us</a>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted"><Link href="/" className="hover:underline">Back to {site.name}</Link></p>
        </Container>
      </section>
    </>
  );
}
