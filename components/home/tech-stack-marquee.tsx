import { TechVisualIcon } from "@/components/icons/tech-visual-icon";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const CAPABILITY_AREAS = [
  {
    id: "01",
    title: "Lead and sales systems",
    description:
      "Capture enquiries, qualify them, assign ownership, and keep follow-up moving at customer speed.",
  },
  {
    id: "02",
    title: "Service and onboarding operations",
    description:
      "Move contracts, intake, approvals, payment-adjacent workflows, and kickoff steps through a clearer operational sequence.",
  },
  {
    id: "03",
    title: "AI voice and conversational flows",
    description:
      "Design chat and voice paths that collect the right context, branch safely, and escalate when humans should take over.",
  },
  {
    id: "04",
    title: "APIs, data, and internal controls",
    description:
      "Connect platforms with validation, retry logic, auditability, and durable handoffs between systems.",
  },
] as const;

const STACK_PILLS = [
  "GoHighLevel",
  "n8n",
  "Make.com",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "OpenAI",
  "Stripe",
  "Power Automate",
  "Zoho CRM",
  "Cal.com",
  "REST APIs",
] as const;

function StackChip({ name }: { name: string }): React.JSX.Element {
  return (
    <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3.5 py-2 text-xs font-medium text-foreground/88">
      <TechVisualIcon name={name} className="size-4" />
      {name}
    </span>
  );
}

export function TechStackMarquee(): React.JSX.Element {
  return (
    <section
      aria-labelledby="stack-title"
      className="border-b border-border/60 bg-panel py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-18">
          <ScrollReveal className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Capabilities / 01
            </p>
            <h2
              id="stack-title"
              className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-[3.6rem]"
            >
              Automation built around the way the operation actually works.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-[1.05rem]">
              The goal is not to add more software. It is to make the revenue,
              service, and internal workflow easier to understand, easier to
              hand off, and easier to improve.
            </p>
          </ScrollReveal>

          <div className="border-y border-border/70">
            {CAPABILITY_AREAS.map((area, index) => (
              <ScrollReveal
                key={area.id}
                delay={index * 0.05}
                className={`grid gap-3 py-6 sm:grid-cols-[3.75rem_minmax(0,1fr)] sm:gap-5 ${
                  index < CAPABILITY_AREAS.length - 1 ? "border-b border-border/70" : ""
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-subtle">
                  {area.id}
                </span>
                <div>
                  <h3 className="text-[1.55rem] font-semibold leading-tight tracking-normal text-foreground sm:text-[1.85rem]">
                    {area.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-[0.98rem]">
                    {area.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.08} className="mt-14 border-t border-border/70 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
            Platforms used across recent delivery
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {STACK_PILLS.map((name) => (
              <StackChip key={name} name={name} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
