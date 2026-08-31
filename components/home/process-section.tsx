"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, UserRound } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BRAND_NAME } from "@/lib/branding";

const DELIVERY_STEPS = [
  {
    id: "1",
    label: "Discover",
    title: "Find the real constraint",
    description:
      "Clarify the handoff, owner, data source, and point where the process currently slows down.",
  },
  {
    id: "2",
    label: "Design",
    title: "Make the future visible",
    description:
      "Turn the messy workflow into a clear operating map with states, triggers, exceptions, and human checkpoints.",
  },
  {
    id: "3",
    label: "Build",
    title: "Connect the right systems",
    description:
      "Configure GoHighLevel, n8n, Make.com, APIs, forms, agents, and databases around the approved workflow.",
  },
  {
    id: "4",
    label: "Validate",
    title: "Test reality, not the happy path",
    description:
      "Check edge cases, duplicate events, missing fields, retry paths, handoffs, and live-user behavior before trust is assumed.",
  },
  {
    id: "5",
    label: "Improve",
    title: "Measure and refine",
    description:
      "Review what happens after launch and tune the workflow as the business finds new cases and constraints.",
  },
] as const;

interface ProcessSectionProps {
  showFooterCta?: boolean;
}

export function ProcessSection({
  showFooterCta = true,
}: ProcessSectionProps): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="process-title"
      className="relative isolate overflow-hidden border-b border-border/60 bg-panel py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <ScrollReveal className="max-w-5xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Delivery method / 03
          </p>
          <h2
            id="process-title"
            className="mt-5 max-w-4xl text-[3rem] font-semibold leading-[0.98] tracking-normal text-foreground sm:text-[4.25rem] lg:text-[5.15rem]"
          >
            A repeatable process, with room for judgment.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-[1.05rem]">
            Every engagement has a clear method, but the decisions stay tied to
            the operation in front of us: the people, the tools, the edge cases,
            and the parts of the workflow that need human ownership.
          </p>
        </ScrollReveal>

        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-[2.2rem] right-[2.2rem] top-[2rem] h-px bg-border-strong"
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-[2.2rem] top-[2rem] h-px origin-left bg-accent shadow-[0_0_24px_rgba(227,165,72,0.34)]"
              initial={reducedMotion ? false : { scaleX: 0 }}
              whileInView={reducedMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: "-18% 0px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ right: "2.2rem" }}
            />

            <div className="grid grid-cols-5 gap-8">
              {DELIVERY_STEPS.map((step, index) => (
                <ScrollReveal key={step.id} delay={index * 0.08} y={16}>
                  <article className="group relative min-h-[18rem] pr-5">
                    <motion.span
                      aria-hidden="true"
                      className="relative z-10 flex size-16 items-center justify-center rounded-full border border-accent bg-panel font-mono text-sm font-medium text-foreground shadow-[0_0_0_10px_rgba(17,17,20,0.96),0_14px_35px_rgba(0,0,0,0.32)]"
                      initial={reducedMotion ? false : { scale: 0.86, opacity: 0 }}
                      whileInView={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-18% 0px" }}
                      transition={{
                        duration: 0.45,
                        delay: 0.16 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {step.id}
                    </motion.span>

                    <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      {step.label}
                    </p>
                    <h3 className="mt-5 max-w-[13rem] text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-[15rem] text-sm leading-7 text-muted opacity-[0.88] transition-colors duration-300 group-hover:text-foreground/78">
                      {step.description}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-y border-border/70 lg:hidden">
          {DELIVERY_STEPS.map((step, index) => (
            <ScrollReveal
              key={step.id}
              delay={index * 0.05}
              y={14}
              className={`grid gap-4 py-6 ${
                index < DELIVERY_STEPS.length - 1 ? "border-b border-border/70" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-accent bg-background font-mono text-xs text-foreground">
                  {step.id}
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {step.label}
                </p>
              </div>
              <div>
                <h3 className="text-[1.75rem] font-semibold leading-tight tracking-normal text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {showFooterCta && (
          <ScrollReveal className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                Your next move
              </p>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-foreground/84">
                Read how {BRAND_NAME} works in detail, or start a conversation
                about the workflow that still depends on too much manual effort.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <UserRound aria-hidden="true" className="size-4" />
                About {BRAND_NAME}
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-panel"
              >
                <Mail aria-hidden="true" className="size-4" />
                Start a conversation
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
