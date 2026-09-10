import { site } from "@/data/site";
import type { FAQ } from "@/data/services";

const base = site.url;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${base}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    slogan: site.tagline,
    url: base,
    logo: `${base}/images/logo.webp`,
    image: `${base}/images/logo.webp`,
    telephone: "+1-888-785-0028",
    email: site.email,
    description: site.category,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    areaServed: { "@type": "Country", name: "United States" },
    openingHoursSpecification: site.hoursSchema.map((h) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes,
    })),
    sameAs: Object.values(site.social),
    identifier: [
      { "@type": "PropertyValue", name: "USDOT", value: site.usdot },
      { "@type": "PropertyValue", name: "MC", value: site.mc },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name, item: `${base}${it.href}`,
    })),
  };
}

export function serviceSchema(name: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${base}/${slug}/`,
    serviceType: name,
    provider: { "@id": `${base}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
