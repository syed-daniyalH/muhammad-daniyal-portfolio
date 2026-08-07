import { FeatureCard } from "@/components/case-study/feature-card";
import { HeroSection } from "@/components/home/hero-section";
import { MetricsBar } from "@/components/home/metrics-bar";
import { ProfessionalSections } from "@/components/home/professional-sections";
import { FeaturedWork } from "@/components/work/featured-work";
import { TerminalWidget } from "@/components/sandbox/terminal-widget";

export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#0B0F17] text-[#F9FAFB]">
      <HeroSection />
      <MetricsBar />
      <FeaturedWork />
      <ProfessionalSections />
      <FeatureCard />

      <section
        id="sandbox"
        aria-labelledby="sandbox-title"
        className="scroll-mt-24 border-b border-[#2D3748]/60 bg-[#0B0F17] py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300">
              Controlled execution environment
            </p>

            <h2
              id="sandbox-title"
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#F9FAFB] sm:text-5xl"
            >
              Run the secure event lifecycle
            </h2>

            <p className="mt-5 text-base leading-8 text-[#9CA3AF]">
              Trigger a sanitized request through the server-connected terminal
              to inspect HMAC verification, idempotency validation, structured
              extraction, and controlled routing.
            </p>
          </div>

          <TerminalWidget />
        </div>
      </section>
    </main>
  );
}
