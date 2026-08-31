import { GitBranch, RefreshCcw, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { TechVisualIcon } from "@/components/icons/tech-visual-icon";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const STACK_ROWS = [
  [
    "GoHighLevel",
    "n8n",
    "Make.com",
    "OpenAI",
    "Power Automate",
    "Zoho CRM",
    "Python",
    "REST APIs",
  ],
  [
    "Webhooks",
    "Stripe",
    "QuickBooks",
    "Cal.com",
    "PostgreSQL",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "React",
    "Google Sheets",
  ],
] as const;

const OPERATING_NOTES: readonly {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Protected intake",
    description: "Payloads and events are checked before they move into CRM state.",
  },
  {
    icon: GitBranch,
    title: "Reliable flow",
    description: "Branches, retries, and handoff logic stay visible and easy to review.",
  },
  {
    icon: RefreshCcw,
    title: "Retry safe sync",
    description: "Automation stays recoverable when APIs, webhooks, or humans interrupt it.",
  },
  {
    icon: Sparkles,
    title: "Client ready",
    description: "The experience stays polished while the logic remains auditable.",
  },
];

function StackChip({ name }: { name: string }): React.JSX.Element {
  return (
    <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-border bg-surface/85 px-3.5 text-xs font-semibold text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
      <TechVisualIcon name={name} className="size-4" />
      {name}
    </span>
  );
}

export function TechStackMarquee(): React.JSX.Element {
  return (
    <section
      aria-labelledby="stack-title"
      className="overflow-hidden border-b border-border/60 bg-background py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <ScrollReveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Stack and tech
            </p>
            <h2
              id="stack-title"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              Tools I have worked with.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              CRM automation, AI systems, workflow orchestration, backend APIs,
              and business integrations built with practical production tools.
            </p>
          </div>

          <div className="min-w-0 space-y-4">
            {STACK_ROWS.map((row, rowIndex) => (
              <div key={row.join(", ")} className="overflow-hidden">
                <p className="sr-only">{row.join(", ")}</p>
                <div
                  aria-hidden="true"
                  className="[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
                >
                  <div
                    className={`marquee-track flex w-max gap-3 ${
                      rowIndex === 1
                        ? "[animation-direction:reverse] [animation-duration:38s]"
                        : ""
                    }`}
                  >
                    {[...row, ...row].map((name, index) => (
                      <StackChip key={`${name}-${index}`} name={name} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {OPERATING_NOTES.map((note, index) => {
            const Icon = note.icon;

            return (
              <ScrollReveal
                key={note.title}
                delay={index * 0.05}
                className="rounded-[8px] border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent/45"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-[8px] border border-border-strong bg-background text-accent">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <h3 className="mt-4 font-sans text-sm font-semibold text-foreground">
                  {note.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{note.description}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
