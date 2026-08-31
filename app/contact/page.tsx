import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
import { BRAND_NAME } from "@/lib/branding";

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Discuss GoHighLevel automation, AI agents, Python and FastAPI systems, n8n and Make.com workflows, CRM integrations, and custom API delivery with ${BRAND_NAME}.`,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage(): React.JSX.Element {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16 text-foreground">
      <ContactSection />
    </main>
  );
}
