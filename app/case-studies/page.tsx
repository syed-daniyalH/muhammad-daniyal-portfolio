import type { Metadata } from "next";

import { portfolioProjects } from "@/content";
import { FeaturedWork } from "@/components/work/featured-work";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    `${portfolioProjects.length} GoHighLevel, CRM, AI automation, and full-stack case studies, each with the architecture, my role, and the systems behind the delivery.`,
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesPage(): React.JSX.Element {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16 text-foreground">
      <FeaturedWork />
    </main>
  );
}
