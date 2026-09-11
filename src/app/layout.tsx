import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";
import { Reveal } from "@/components/Reveal";
import { BackToTop } from "@/components/BackToTop";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-barlow", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Nationwide Vehicle & Equipment Transport | ${site.name}`, template: `%s | ${site.name}` },
  description: "Nationwide transport coordination for cars, commercial vehicles, boats, RVs, motorcycles, construction equipment and heavy machinery. Request a free quote.",
  applicationName: site.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { themeColor: "#0d1f35", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtm = site.gtmId;
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <body className="min-h-screen pb-[72px] lg:pb-0">
        {gtm && (
          <>
            <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script>
            <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>
          </>
        )}
        <JsonLd data={organizationSchema()} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-orange focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
        <BackToTop />
        <Reveal />
      </body>
    </html>
  );
}
