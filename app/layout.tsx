import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";

import "lenis/dist/lenis.css";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LenisProvider } from "@/components/providers/lenis-provider";
import {
  BRAND_APPLICATION_NAME,
  BRAND_DESCRIPTION,
  BRAND_FULL_TITLE,
  BRAND_IMAGE_ALT,
  BRAND_NAME,
  BRAND_TITLE_TEMPLATE,
  PROFESSIONAL_TITLE,
} from "@/lib/branding";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: BRAND_FULL_TITLE,
    template: BRAND_TITLE_TEMPLATE,
  },
  description: BRAND_DESCRIPTION,
  applicationName: BRAND_APPLICATION_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: BRAND_FULL_TITLE,
    description: BRAND_DESCRIPTION,
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: BRAND_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_FULL_TITLE,
    description: BRAND_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BRAND_NAME,
    jobTitle: PROFESSIONAL_TITLE,
    url: siteUrl,
    sameAs: [
      "https://linkedin.com/in/syeddaniyalhaider3",
      "https://github.com/syed-daniyalH",
    ],
    knowsAbout: [
      "GoHighLevel",
      "n8n",
      "Make.com",
      "Conversational AI",
      "Voice agents",
      "CRM integration",
      "Stripe",
      "QuickBooks",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
    ],
  };

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${fraunces.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          Skip to main content
        </a>

        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
