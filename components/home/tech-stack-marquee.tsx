import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBadge } from "@/components/icons/tech-badge";

const CAPABILITY_AREAS = [
  {
    id: "01",
    title: "CRM & Workflow Automation",
    description:
      "Lead routing, booking workflows, onboarding automation, pipeline management, CRM synchronization, and operational handoffs.",
  },
  {
    id: "02",
    title: "AI & Conversational Systems",
    description:
      "AI-assisted customer journeys, conversational workflows, voice systems, qualification logic, and human escalation.",
  },
  {
    id: "03",
    title: "APIs & Integrations",
    description:
      "Webhook orchestration, REST APIs, data mapping, third-party integrations, validation, retries, and synchronization.",
  },
  {
    id: "04",
    title: "Backend & Operational Systems",
    description:
      "Python and FastAPI services, PostgreSQL data models, internal tools, authentication, and operational workflows.",
  },
] as const;

const MARQUEE_TECH_STACK = [
  "GoHighLevel",
  "n8n",
  "Make",
  "Zoho CRM",
  "LLM Workflows",
  "Conversational AI",
  "Voice AI",
  "Prompt / Agent Workflows",
  "Python",
  "FastAPI",
  "REST APIs",
  "Webhooks",
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Microsoft Dynamics 365",
  "QuickBooks",
  "Twilio",
  "Cal.com",
  "Stripe",
] as const;

export function TechStackMarquee(): React.JSX.Element {
  return (
    <section
      aria-labelledby="stack-title"
      className="border-b border-border/50 bg-panel py-20 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ScrollReveal className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Core Capabilities / 01
            </p>
            <h2
              id="stack-title"
              className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
            >
              Focused engineering across CRM, AI, and backend systems.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-[1.05rem]">
              I build reliable workflows designed around real operational requirements—ensuring data flows accurately between platforms, edge cases are handled, and systems remain maintainable.
            </p>
          </ScrollReveal>

          <div className="divide-y divide-border/50 border-y border-border/50">
            {CAPABILITY_AREAS.map((area) => (
              <ScrollReveal
                key={area.id}
                className="grid gap-2 py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-4"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {area.id}
                </span>
                <div>
                  <h3 className="text-xl font-semibold leading-snug tracking-[-0.015em] text-foreground sm:text-[1.35rem]">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {area.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal 1-Line Animated Marquee Ribbon */}
      <div className="mt-16 border-t border-border/50 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Core Technology Stack
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-3">
          {/* Gradient edge masks for smooth fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-panel via-panel/80 to-transparent sm:w-28"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-panel via-panel/80 to-transparent sm:w-28"
          />

          {/* Infinite Marquee Track */}
          <div className="marquee-track flex items-center gap-3">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-3">
              {MARQUEE_TECH_STACK.map((tech, idx) => (
                <TechBadge
                  key={`t1-${tech}-${idx}`}
                  name={tech}
                  size="md"
                  className="bg-surface/80 border-border-strong/70 hover:border-accent/60 shadow-sm"
                />
              ))}
            </div>

            {/* Set 2 (Duplicated for seamless looping) */}
            <div className="flex shrink-0 items-center gap-3" aria-hidden="true">
              {MARQUEE_TECH_STACK.map((tech, idx) => (
                <TechBadge
                  key={`t2-${tech}-${idx}`}
                  name={tech}
                  size="md"
                  className="bg-surface/80 border-border-strong/70 hover:border-accent/60 shadow-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
