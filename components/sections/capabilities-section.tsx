import { Cpu, Database, MessageSquareText, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

const CAPABILITY_GROUPS: ReadonlyArray<{
  slug: string;
  title: string;
  description: string;
  evidence: string;
  icon: LucideIcon;
  span: string;
}> = [
  {
    slug: "crm-revenue-automation",
    title: "CRM & Revenue Automation",
    description:
      "CRM pipelines, workflows, lead routing, lifecycle automation, and revenue operations across GoHighLevel and other CRM platforms.",
    evidence: "VenAI Stage 0, Zoho Revenue Ops",
    icon: Database,
    span: "lg:col-span-2",
  },
  {
    slug: "ai-voice-conversational-systems",
    title: "AI Voice & Conversational Systems",
    description:
      "Inbound and outbound voice agents, chat automation, booking workflows, escalation, and human handoff.",
    evidence: "Brouss Chatbot, Brouss Voice Agent, Venzo Booking",
    icon: MessageSquareText,
    span: "lg:col-span-1",
  },
  {
    slug: "n8n-make-api-automation",
    title: "n8n, Make.com & API Automation",
    description:
      "Webhooks, REST APIs, conditional workflows, retries, validation, synchronization, and scheduled processes.",
    evidence: "AI Video Operations",
    icon: Workflow,
    span: "lg:col-span-1",
  },
  {
    slug: "backend-business-integrations",
    title: "Backend & Business Integrations",
    description:
      "Python, FastAPI, PostgreSQL, Stripe, QuickBooks, and custom internal applications.",
    evidence: "SM2 Race Control, Alex Dispatch",
    icon: Cpu,
    span: "lg:col-span-2",
  },
] as const;

export function CapabilitiesSection(): React.JSX.Element {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="scroll-mt-24 border-b border-border/50 bg-panel py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Core Capabilities
          </p>
          <h2
            id="capabilities-title"
            className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
          >
            Technical expertise, backed by proven results.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {CAPABILITY_GROUPS.map((group, index) => {
            const Icon = group.icon;
            return (
              <ScrollReveal
                key={group.slug}
                delay={index * 0.06}
                className={`group rounded-2xl border border-border-strong/60 bg-surface/70 p-6 transition-all duration-300 hover:border-accent/50 sm:p-8 ${group.span}`}
              >
                <Icon aria-hidden="true" className="size-5 text-accent" />
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{group.title}</h3>
                <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted">{group.description}</p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  Evidence: <span className="text-foreground/80">{group.evidence}</span>
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
