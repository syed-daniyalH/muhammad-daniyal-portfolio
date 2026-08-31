import type { Metadata } from "next";
import { InsightsSection } from "@/components/sections/insights-section";
import { BRAND_NAME } from "@/lib/branding";

export const metadata: Metadata = {
  title: "Insights",
  description:
    `Practical notes on AI automation, CRM architecture, webhook idempotency, and system integration from ${BRAND_NAME}.`,
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsPage(): React.JSX.Element {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16 text-foreground">
      <InsightsSection />
    </main>
  );
}
