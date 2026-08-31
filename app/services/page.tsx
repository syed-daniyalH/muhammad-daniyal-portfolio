import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/services-section";
import { BRAND_NAME } from "@/lib/branding";

export const metadata: Metadata = {
  title: "Services",
  description:
    `Explore AI automation, CRM architecture, API integrations, and custom backend engineering services with ${BRAND_NAME}.`,
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage(): React.JSX.Element {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16 text-foreground">
      <ServicesSection />
    </main>
  );
}
