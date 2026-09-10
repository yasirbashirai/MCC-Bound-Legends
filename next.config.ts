import type { NextConfig } from "next";

/** Old WordPress URLs → new flat URLs (client rule: nothing under /services/). */
const redirects301: [string, string][] = [
  ["/services/car-shipping", "/auto-transport"],
  ["/services/open-car-transport", "/auto-transport"],
  ["/services/large-truck-suv-or-van-shipping", "/auto-transport"],
  ["/services/enclosed-car-transport", "/enclosed-auto-transport"],
  ["/services/antique-and-classic-car-shipping", "/enclosed-auto-transport"],
  ["/services/boat-and-yacht-transport", "/boat-transport"],
  ["/services/heavy-equipment-shipping", "/heavy-equipment-transport"],
  ["/services/motorcycle-transport", "/motorcycle-transport"],
  ["/services/atvs-and-utvs-transport", "/motorcycle-transport"],
  ["/services/expedited-transport", "/auto-transport"],
  ["/services/military-and-veterans-transport", "/auto-transport"],
  ["/services/auction-auto-transport", "/auction-vehicle-transport"],
  ["/services-2", "/services"],
  ["/how-does-it-work", "/how-it-works"],
  ["/contact-us", "/contact"],
  ["/terms-and-condition", "/terms-and-conditions"],
  ["/auto-transport-tips", "/faq"],
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return redirects301.flatMap(([from, to]) => [
      { source: from, destination: `${to}/`, permanent: true },
      { source: `${from}/`, destination: `${to}/`, permanent: true },
    ]);
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
