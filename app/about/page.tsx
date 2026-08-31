import type { Metadata } from "next";

import { ProcessSection } from "@/components/home/process-section";
import { AboutSection } from "@/components/sections/about-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { BRAND_NAME, PROFESSIONAL_TITLE } from "@/lib/branding";

export const metadata: Metadata = {
  title: "About",
  description:
    `${BRAND_NAME} is an ${PROFESSIONAL_TITLE} specializing in GoHighLevel, n8n, Make.com, conversational AI, and API integrations for CRM, payments, and operations.`,
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage(): React.JSX.Element {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16 text-foreground">
      <AboutSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <ProcessSection showFooterCta={true} sectionNumber="04" />
    </main>
  );
}
