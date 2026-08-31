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

const SKILL_CATEGORIES = [
  {
    category: "Automation & CRM",
    skills: ["GoHighLevel", "n8n", "Make", "Zoho CRM"],
  },
  {
    category: "AI Systems",
    skills: ["LLM Workflows", "Conversational AI", "Voice AI", "Prompt / Agent Workflows"],
  },
  {
    category: "Backend & APIs",
    skills: ["Python", "FastAPI", "REST APIs", "Webhooks"],
  },
  {
    category: "Frontend & Data",
    skills: ["Next.js", "React", "TypeScript", "PostgreSQL"],
  },
] as const;

export function TechStackMarquee(): React.JSX.Element {
  return (
    <section
      aria-labelledby="stack-title"
      className="border-b border-border/50 bg-panel py-20 sm:py-24"
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

        {/* 4 Categorized Technical Stacks */}
        <ScrollReveal delay={0.08} className="mt-16 border-t border-border/50 pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-6">
            Core Technology Stack
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_CATEGORIES.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-border-strong/50 bg-surface/40 p-5"
              >
                <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-subtle mb-3">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <TechBadge key={skill} name={skill} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
