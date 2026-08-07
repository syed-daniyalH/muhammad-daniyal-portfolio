import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "lenis/dist/lenis.css";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LenisProvider } from "@/components/providers/lenis-provider";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daniyal Haider - AI & Full-Stack Automation Engineer",
    template: "%s | Daniyal Haider",
  },
  description:
    "Executive engineering portfolio featuring AI systems, bilingual automation pipelines, voice agents, FastAPI services, CRM integrations, and secure cloud infrastructure.",
  applicationName: "Daniyal Haider Portfolio",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Daniyal Haider - AI & Full-Stack Automation Engineer",
    description:
      "Production AI systems, workflow orchestration, voice agents, FastAPI, PostgreSQL, and cloud infrastructure.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniyal Haider - AI and Full-Stack Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniyal Haider - AI & Full-Stack Automation Engineer",
    description:
      "Production AI systems, workflow orchestration, voice agents, FastAPI, PostgreSQL, and cloud infrastructure.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0B0F17",
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
    name: "Daniyal Haider",
    jobTitle: "AI & Full-Stack Automation Engineer",
    url: siteUrl,
    sameAs: [
      "https://linkedin.com/in/syeddaniyalhaider3",
      "https://github.com/syed-daniyalH",
    ],
    knowsAbout: [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "AI automation",
      "Voice agents",
      "n8n",
      "Make.com",
      "CRM integration",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
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
