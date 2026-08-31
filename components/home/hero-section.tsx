"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { flagshipProjects, portfolioProjects } from "@/content";

const HERO_FACTS = [
  {
    label: "Positioning",
    value:
      "Enterprise-grade CRM and AI automation tailored for businesses seeking scalable operations and dependable execution.",
  },
  {
    label: "Focus",
    value:
      "Lead routing, client onboarding, conversational AI agents, custom workflow architecture, and revenue operations.",
  },
  {
    label: "Core stack",
    value:
      "GoHighLevel, n8n, Make.com, Python, FastAPI, PostgreSQL, and seamless third-party API integrations.",
  },
  {
    label: "Track Record",
    value: `${portfolioProjects.length} documented production systems, including ${flagshipProjects.length} in-depth case studies demonstrating measurable ROI.`,
  },
] as const;

export function HeroSection(): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-border/60 bg-background pt-36 sm:pt-40"
    >
      <div className="mx-auto max-w-[1480px] px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-end lg:gap-18"
        >
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              AI Automation & Operations Engineer
            </p>

            <h1
              id="hero-title"
              className="mt-6 max-w-4xl text-[3.35rem] font-semibold leading-[0.95] tracking-normal text-foreground sm:text-[4.6rem] lg:text-[5.8rem]"
            >
              Scaling businesses through intelligent automation & reliable systems.
            </h1>

            <p className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-muted sm:text-[1.12rem] sm:leading-9">
              I design and deploy AI-driven CRM workflows, intelligent agents, and API integrations that eliminate manual bottlenecks, streamline your operations, and deliver a frictionless experience for both your team and your clients.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/case-studies"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Explore selected work
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Start a conversation
              </Link>
            </div>
          </div>

          <div className="border-y border-border/70">
            <dl className="grid gap-0">
              {HERO_FACTS.map((fact, index) => (
                <div
                  key={fact.label}
                  className={`grid gap-2 py-5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4 ${
                    index < HERO_FACTS.length - 1 ? "border-b border-border/70" : ""
                  }`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                    {fact.label}
                  </dt>
                  <dd className="text-sm leading-7 text-foreground/84 sm:text-[0.96rem]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
