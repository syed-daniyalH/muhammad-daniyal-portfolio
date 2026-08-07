import { FeatureCard } from "@/components/case-study/feature-card";
import { HeroSection } from "@/components/home/hero-section";
import { MetricsBar } from "@/components/home/metrics-bar";
import { ProfessionalSections } from "@/components/home/professional-sections";
import { FeaturedWork } from "@/components/work/featured-work";
import { TerminalWidget } from "@/components/sandbox/terminal-widget";

export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <MetricsBar />
      <FeaturedWork />
      <ProfessionalSections />
      <FeatureCard />

      <section
        id="sandbox"
        aria-labelledby="sandbox-title"
        className="scroll-mt-24 border-b border-border/60 bg-background py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              Controlled execution environment
            </p>

            <h2
              id="sandbox-title"
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
            >
              Run the secure event lifecycle
            </h2>

            <p className="mt-5 text-base leading-8 text-muted">
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
