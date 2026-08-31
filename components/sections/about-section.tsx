import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BRAND_NAME, PROFESSIONAL_TITLE } from "@/lib/branding";

export function AboutSection(): React.JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 border-b border-border/60 bg-panel py-24 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <ScrollReveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            About
          </p>
          <h2
            id="about-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl"
          >
            I build automations that make operations easier to run.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="space-y-6 border-l border-accent/25 pl-8 text-lg leading-9 text-muted">
          <p>
            I&apos;m {BRAND_NAME}, an {PROFESSIONAL_TITLE} focused on
            production systems built with GoHighLevel, n8n, Make.com, Python,
            FastAPI, and PostgreSQL. I&apos;ve delivered CRM automation,
            conversational AI, voice agents, appointment booking, client
            onboarding, payment workflows, and API integrations for real
            client environments.
          </p>
          <p>
            Recent systems have reduced manual processing by about 70 percent,
            shortened lead response from more than 4 hours to 15 to 20
            minutes, and supported 300 plus active contacts. I enjoy the part
            that makes automation hold up in production: routing logic,
            validation, retries, and the operational details that keep systems
            moving.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
