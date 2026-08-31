"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const DELIVERY_STEPS = [
  {
    id: "1",
    label: "DISCOVER",
    title: "Find the real constraint",
    description:
      "Clarify the handoff, owner, data source, and point where the process currently slows down.",
  },
  {
    id: "2",
    label: "DESIGN",
    title: "Make the future visible",
    description:
      "Turn the messy workflow into a clear operating map with states, triggers, exceptions, and human checkpoints.",
  },
  {
    id: "3",
    label: "BUILD",
    title: "Connect the right systems",
    description:
      "Configure GoHighLevel, n8n, Make.com, APIs, forms, agents, and databases around the approved workflow.",
  },
  {
    id: "4",
    label: "VALIDATE",
    title: "Test reality, not the happy path",
    description:
      "Check edge cases, duplicate events, missing fields, retry paths, handoffs, and live-user behavior before trust is assumed.",
  },
  {
    id: "5",
    label: "IMPROVE",
    title: "Measure and refine",
    description:
      "Review what happens after launch and tune the workflow as the business finds new cases and constraints.",
  },
] as const;

interface ProcessSectionProps {
  showFooterCta?: boolean;
  sectionNumber?: string;
}

export function ProcessSection({
  showFooterCta = true,
  sectionNumber = "03",
}: ProcessSectionProps): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="delivery-title"
      className="relative isolate overflow-hidden border-b border-border/50 bg-panel py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            DELIVERY METHOD / {sectionNumber}
          </p>
          <h2
            id="delivery-title"
            className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.5rem] lg:text-[4.25rem]"
          >
            A repeatable process with room for judgement.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Every engagement has a clear method, but the decisions stay tied to the operation in front of us: the people, the tools, the edge cases, and the parts of the workflow that need human ownership.
          </p>
        </ScrollReveal>

        {/* Desktop Horizontal 5-Step Connected Timeline */}
        <div className="mt-20 hidden lg:block">
          <div className="relative">
            {/* Base grey line */}
            <div
              aria-hidden="true"
              className="absolute left-[2.2rem] right-[2.2rem] top-[1.75rem] h-px bg-border-strong"
            />
            {/* Animated glowing accent line */}
            <motion.div
              aria-hidden="true"
              className="absolute left-[2.2rem] top-[1.75rem] h-px origin-left bg-accent shadow-[0_0_20px_rgba(227,165,72,0.45)]"
              initial={reducedMotion ? false : { scaleX: 0 }}
              whileInView={reducedMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ right: "2.2rem" }}
            />

            <div className="grid grid-cols-5 gap-6">
              {DELIVERY_STEPS.map((step, index) => (
                <ScrollReveal key={step.id} delay={index * 0.08}>
                  <article className="group relative min-h-[16rem] pr-3">
                    {/* Circle Node */}
                    <motion.span
                      aria-hidden="true"
                      className="relative z-10 flex size-14 items-center justify-center rounded-full border border-accent bg-panel font-mono text-sm font-semibold text-foreground shadow-[0_0_0_8px_rgba(17,17,20,0.95),0_10px_25px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-surface-elevated"
                      initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
                      whileInView={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        duration: 0.4,
                        delay: 0.15 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {step.id}
                    </motion.span>

                    <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {step.label}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="mt-14 border-t border-border/50 divide-y divide-border/50 lg:hidden">
          {DELIVERY_STEPS.map((step, index) => (
            <ScrollReveal
              key={step.id}
              delay={index * 0.05}
              className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent bg-panel font-mono text-xs font-semibold text-foreground">
                  {step.id}
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:hidden">
                  {step.label}
                </p>
              </div>
              <div>
                <p className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:block">
                  {step.label}
                </p>
                <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {showFooterCta && (
          <ScrollReveal className="mt-16 flex flex-col gap-6 border-t border-border/50 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                NEXT STEPS
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Looking for an engineer to architect or streamline your automation systems?
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/case-studies"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-border-strong bg-surface/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:border-accent/60 hover:text-accent"
              >
                Explore Work
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all hover:bg-accent-strong"
              >
                Book an audit
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
