import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { categories, pages } from "@/data/services";
import { Facebook, Instagram, Mail, Phone, Pin, Clock, Shield, TikTok, YouTube } from "./Icons";
import { PhoneLink } from "./PhoneLink";

const quick = [
  ["Home", "/"], ["Services", "/services/"], ["Get a Quote", "/get-a-quote/"], ["How It Works", "/how-it-works/"],
  ["About Us", "/about-us/"], ["Reviews", "/testimonials/"], ["FAQ", "/faq/"], ["Contact", "/contact/"],
];

export function Footer() {
  const specific = pages.filter((p) => p.kind !== "category");
  return (
    <footer className="bg-navy-800 text-white/75">
      {/* Nationwide + Florida strip: local authority without doorway pages */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
          <p className="text-[13px] leading-relaxed">
            <span className="font-semibold text-white">Nationwide transport coordination</span> across all 50 states, including{" "}
            {site.nationalMarkets.join(", ")}.{" "}
            <span className="font-semibold text-white">Florida based</span>, serving {site.floridaMarkets.join(", ")} and every market in between.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="block rounded-xl bg-white p-1.5"><span className="relative block h-14 w-14"><Image src="/images/logo.webp" alt={`${site.name} logo`} fill sizes="96px" className="object-contain" /></span></span>
            <span className="display text-2xl text-white">MCC <span className="text-blue">Bound</span> Legends</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {site.legalName} is a licensed and bonded transport company — coordinating vehicle, marine, RV, commercial, and heavy equipment transport nationwide. No deposit required. Every shipment fully insured. Free quote in 60 seconds. Vetted motor carriers perform the physical transport. BBB Accredited. 5-Star Rated on Google and Trustpilot.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5"><Pin className="mt-0.5 h-4 w-4 shrink-0 text-blue" /><span>{site.legalName}<br />{site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}</span></li>
            <li><PhoneLink location="footer" className="flex items-center gap-2.5 hover:text-white"><Phone className="h-4 w-4 text-blue" />{site.phone}</PhoneLink></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white"><Mail className="h-4 w-4 text-blue" />{site.email}</a></li>
            <li className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-blue" />{site.hours}</li>
            <li className="flex items-center gap-2.5"><Shield className="h-4 w-4 text-blue" />USDOT {site.usdot} · MC {site.mc}</li>
          </ul>
          <div className="mt-5 flex items-center gap-3">
            {[[site.social.facebook, Facebook, "Facebook"], [site.social.instagram, Instagram, "Instagram"], [site.social.tiktok, TikTok, "TikTok"], [site.social.youtube, YouTube, "YouTube"]].map(([href, Icon, label]) => {
              const I = Icon as React.ComponentType<{ className?: string }>;
              return <a key={label as string} href={href as string} target="_blank" rel="noopener" aria-label={label as string} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/80 transition hover:bg-blue hover:text-white"><I className="h-4.5 w-4.5" /></a>;
            })}
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-blue-300">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">{quick.map(([l, h]) => <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>)}</ul>
          <h3 className="eyebrow mb-4 mt-8 text-blue-300">Reviews</h3>
          <ul className="space-y-2.5 text-sm">
            {Object.entries(site.reviews).map(([k, v]) => <li key={k}><a href={v} target="_blank" rel="noopener" className="capitalize hover:text-white">{k === "uship" ? "uShip" : k}</a></li>)}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-blue-300">What We Coordinate</h3>
          <ul className="space-y-2.5 text-sm">{categories.map((c) => <li key={c.slug}><Link href={`/${c.slug}/`} className="hover:text-white">{c.name}</Link></li>)}</ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-blue-300">Specific Transport</h3>
          <ul className="space-y-2.5 text-sm">{specific.map((s) => <li key={s.slug}><Link href={`/${s.slug}/`} className="hover:text-white">{s.name}</Link></li>)}</ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-navy-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-white/50 sm:px-8 md:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved. Licensed &amp; bonded freight broker, USDOT {site.usdot}, MC {site.mc}.</p>
          <p className="flex gap-4"><Link href="/privacy-policy/" className="hover:text-white">Privacy Policy</Link><Link href="/terms-and-conditions/" className="hover:text-white">Terms &amp; Conditions</Link></p>
        </div>
      </div>
    </footer>
  );
}
