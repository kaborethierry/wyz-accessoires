// app/layout.jsx
import { Playfair_Display, Manrope } from "next/font/google";

import "./globals.css";
import "./layout.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

import site from "@/data/site";

/* ---------------------------------------------------------
 * Polices
 * --------------------------------------------------------- */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ---------------------------------------------------------
 * Métadonnées générales
 * --------------------------------------------------------- */
export const metadata = {
  title: {
    default: site.seo.defaultTitle,
    template: site.seo.titleTemplate,
  },
  description: site.seo.description,
  keywords: site.seo.keywords,
  metadataBase: new URL(site.seo.url),
  openGraph: {
    title: site.seo.defaultTitle,
    description: site.seo.description,
    siteName: site.name,
    locale: site.seo.locale,
    type: "website",
    images: [{ url: site.logo }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.defaultTitle,
    description: site.seo.description,
    images: [site.logo],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6B3E2E",
};

/* ---------------------------------------------------------
 * RootLayout
 * --------------------------------------------------------- */
export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <div className="app-shell">
          <Header />

          <main className="app-main">{children}</main>

          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}