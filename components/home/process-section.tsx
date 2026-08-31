"use client";

import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { RESUME_PATH } from "@/lib/branding";

const APPROACH_STEPS = [
  {
    id: "01",
    label: "Understand",
    description: "Map the workflow, systems, data, and failure points.",
  },
  {
    id: "02",
    label: "Build",
    description: "Implement the automation, integrations, and backend logic.",
  },
  {
    id: "03",
    label: "Validate",
    description: "Test real scenarios, edge cases, handoffs, and failure recovery.",
  },
] as const;

interface ProcessSectionProps {
  showFooterCta?: boolean;
}

export function ProcessSection({
  showFooterCta = true,
}: ProcessSectionProps): React.JSX.Element {
  return (
    <section
      aria-labelledby="approach-title"
      className="relative isolate overflow-hidden border-b border-border/50 bg-panel py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Approach / 03
          </p>
          <h2
            id="approach-title"
            className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
          >
            How I approach systems
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-[1.05rem]">
            I start by understanding the existing workflow, identify failure points and integration boundaries, then design and test the automation around real operational requirements.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {APPROACH_STEPS.map((step, index) => (
            <ScrollReveal key={step.id} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-border-strong/50 bg-surface/40 p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-accent">
                    {step.id}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                    Phase
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {step.label}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {showFooterCta && (
          <ScrollReveal className="mt-16 flex flex-col gap-6 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                Next Steps
              </p>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                Looking for an engineer to build or improve your automation and CRM systems?
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FileText aria-hidden="true" className="size-4" />
                Resume
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-panel"
              >
                <Mail aria-hidden="true" className="size-4" />
                Let&apos;s talk
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
