"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";

import { flagshipProjects } from "@/content";
import { RESUME_PATH } from "@/lib/branding";

const HERO_FACTS = [
  {
    label: "Core Specialization",
    value:
      "CRM workflow architecture, AI-assisted customer workflows, and API integrations between business systems.",
  },
  {
    label: "Core Stack",
    value:
      "GoHighLevel, n8n, Make, Python, FastAPI, PostgreSQL, and RESTful webhooks.",
  },
  {
    label: "Implementation Standard",
    value:
      "Data validation, webhook idempotency, error handling, retries, and documented testing.",
  },
  {
    label: "Case Studies",
    value: `${flagshipProjects.length} documented systems covering workflow diagrams, implementation decisions, and deliverables.`,
  },
] as const;

export function HeroSection(): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-border/50 bg-background pt-32 sm:pt-36 lg:pt-40"
    >
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start lg:gap-16"
        >
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              AI Automation & Systems Engineer
            </p>

            <h1
              id="hero-title"
              className="mt-5 text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.5rem] lg:text-[4.25rem]"
            >
              Building automation systems that connect AI, CRMs, APIs, and business operations.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Technology is useful only when it makes work clearer, more dependable, and easier for people to own. I design and implement CRM workflows, AI automation, backend integrations, and operational systems across GoHighLevel, n8n, Make, Python, and FastAPI.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Book an automation audit
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/case-studies"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Explore selected work
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border/50 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-all duration-300 hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FileText aria-hidden="true" className="size-4" />
                Resume
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-surface/40 p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle mb-4">
              Operational Profile
            </p>
            <dl className="divide-y divide-border/50">
              {HERO_FACTS.map((fact) => (
                <div key={fact.label} className="py-4.5 first:pt-0 last:pb-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-foreground/85">
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
