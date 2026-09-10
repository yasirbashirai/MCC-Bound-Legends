import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PhoneLink } from "@/components/PhoneLink";
import { Arrow, Check, Phone } from "@/components/Icons";
import { HowItWorks } from "@/components/Sections";

export const metadata: Metadata = { title: "Request Received", robots: { index: false, follow: false } };

export default function ThankYou() {
  return (
    <>
      <section className="hero-bg py-20 text-white">
        <Container className="max-w-3xl text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-white"><Check className="h-8 w-8" /></span>
          <h1 className="display mt-6 text-5xl sm:text-6xl">Got it. A coordinator is on it.</h1>
          <p className="mt-5 text-lg text-white/75">Your quote request has been received. We review every request personally and respond during business hours, {site.hours}. Need it faster? Call us now.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PhoneLink location="thank_you" className="btn-orange px-7 py-4 text-lg"><Phone className="h-5 w-5" /> {site.phone}</PhoneLink>
            <Link href="/how-it-works/" className="btn-ghost px-7 py-4 text-lg">What happens next <Arrow className="h-5 w-5" /></Link>
          </div>
        </Container>
      </section>
      <section className="bg-cloud py-16"><Container><HowItWorks /></Container></section>
    </>
  );
}
