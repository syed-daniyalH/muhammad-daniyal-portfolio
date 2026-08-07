import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Contact,
  Cpu,
  Database,
  Mail,
  MessageSquareText,
  Route,
  Workflow,
} from "lucide-react";

const CAPABILITIES = [
  {
    title: "Conversational AI and Voice Systems",
    description:
      "Bilingual intake, voice-agent state design, low-confidence routing, escalation logic, and human review.",
    evidence: "Dispatch Alex, Brouss Elevators, VenAI",
    icon: MessageSquareText,
  },
  {
    title: "Workflow and API Orchestration",
    description:
      "Webhook contracts, HMAC boundaries, idempotency, n8n/Make.com flows, retries, and approval gates.",
    evidence: "Dispatch Alex, VenAI, AI Video Operations",
    icon: Workflow,
  },
  {
    title: "Full-Stack Operational Platforms",
    description:
      "React and TypeScript interfaces, backend service boundaries, PostgreSQL models, and operational dashboards.",
    evidence: "SM-2 Race Control, Dispatch Alex",
    icon: Cpu,
  },
  {
    title: "CRM, Data, and Revenue Operations",
    description:
      "CRM audits, field mapping, forecasting cleanup, accounting handoffs, and customer-status synchronization.",
    evidence: "Zoho RevOps, Brouss Elevators",
    icon: Database,
  },
] as const;

const EXPERIENCE_ITEMS = [
  {
    title: "AI operations systems",
    description:
      "Built and documented dispatch, voice, and workflow systems that connect customer intake to operational action.",
  },
  {
    title: "Full-stack implementation",
    description:
      "Designed typed frontend workflows, backend validation boundaries, database-backed state, and secure webhook patterns.",
  },
  {
    title: "CRM and automation delivery",
    description:
      "Audited and repaired CRM workflows, mapped revenue operations, and connected automation across business tools.",
  },
] as const;

export function ProfessionalSections(): React.JSX.Element {
  return (
    <>
      <section
        id="capabilities"
        aria-labelledby="capabilities-title"
        className="scroll-mt-24 border-b border-border/60 bg-panel py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              Capabilities
            </p>
            <h2
              id="capabilities-title"
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
            >
              Practical engineering mapped to project evidence.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {CAPABILITIES.map(({ title, description, evidence, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <Icon aria-hidden="true" className="size-5 text-accent" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {description}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-info">
                  Evidence: {evidence}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-title"
        className="scroll-mt-24 border-b border-border/60 bg-background py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                Experience
              </p>
              <h2
                id="experience-title"
                className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
              >
                Delivery history without inflated dates.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted">
                Resume dates are intentionally not invented in this module.
                The public timeline should be date-stamped after the latest
                resume PDF or DOCX is supplied.
              </p>
            </div>

            <div className="space-y-4">
              {EXPERIENCE_ITEMS.map((item, index) => (
                <article
                  key={item.title}
                  className="grid gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-console font-mono text-xs text-accent">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-24 border-b border-border/60 bg-panel py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              About
            </p>
            <h2
              id="about-title"
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
            >
              Engineering for the messy middle of operations.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-muted">
            <p>
              Daniyal builds AI and automation systems for places where
              messages, scheduling, service operations, CRM records, accounting
              handoffs, and human review all meet.
            </p>
            <p>
              The portfolio is deliberately evidence-led: statuses stay
              precise, metrics remain labeled by source, and project pages make
              remaining work visible instead of hiding it behind polished
              language.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="scroll-mt-24 border-b border-border/60 bg-background py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <Contact aria-hidden="true" className="size-4 text-accent" />
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                    Contact
                  </p>
                </div>
                <h2
                  id="contact-title"
                  className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
                >
                  Start with the system you need to make reliable.
                </h2>
                <p className="mt-5 text-sm leading-7 text-muted">
                  Best-fit conversations involve AI intake, workflow
                  orchestration, full-stack operational tools, CRM data
                  cleanup, or secure webhook and integration work.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:daniyalhaider784@gmail.com"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[0_12px_30px_rgba(227,165,72,0.22)] transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  Email Daniyal
                </a>
                <Link
                  href="/work/sm2-race-control"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <BriefcaseBusiness aria-hidden="true" className="size-4" />
                  Review flagship case study
                </Link>
                <Link
                  href="/lab/applypilot"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground/85 transition-colors hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Route aria-hidden="true" className="size-4" />
                  Open Systems Lab
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
                <p className="text-xs leading-5 text-muted-subtle">
                  No prospect PII is stored in browser localStorage. Contact
                  happens through email until a real backend form is configured.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
