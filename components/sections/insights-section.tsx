"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { INSIGHTS_ARTICLES } from "@/content/insights";

export function InsightsSection(): React.JSX.Element {
  return (
    <section
      id="insights"
      aria-labelledby="insights-title"
      className="scroll-mt-24 bg-background py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Hero */}
        <ScrollReveal className="max-w-4xl border-b border-border/50 pb-12 sm:pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            INSIGHTS / PRACTICAL AUTOMATION
          </p>
          <h1
            id="insights-title"
            className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.5rem] lg:text-[4.25rem]"
          >
            Clear thinking before another tool.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Notes for operators, engineers, and technical leaders deciding what to automate, how to control failure points, and how to measure whether an integration actually helped.
          </p>
        </ScrollReveal>

        {/* Insight Articles List matching reference layout */}
        <div className="divide-y divide-border/50">
          {INSIGHTS_ARTICLES.map((article, index) => (
            <ScrollReveal
              key={article.slug}
              delay={index * 0.05}
              className="group block py-10 transition-colors focus-within:bg-surface/20 sm:py-12"
            >
              <Link
                href={`/insights/${article.slug}`}
                className="grid gap-6 lg:grid-cols-[12rem_1fr_auto] lg:items-start lg:gap-12"
              >
                {/* Number & Meta */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-1.5">
                  <span className="font-mono text-base font-semibold text-accent lg:text-lg">
                    {article.number}
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                    {article.readTime} / {article.date}
                  </p>
                </div>

                {/* Title & Summary */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent/85">
                    {article.category}
                  </span>
                  <h2 className="text-2xl font-semibold leading-tight tracking-[-0.015em] text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                    {article.title}
                  </h2>
                  <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                    {article.summary}
                  </p>
                </div>

                {/* Circle Link */}
                <div className="hidden lg:flex size-11 items-center justify-center rounded-full border border-border-strong bg-surface/50 text-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-5" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Consultation Prompt */}
        <ScrollReveal className="mt-16 flex flex-col gap-6 rounded-2xl border border-border/60 bg-surface/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              OPERATIONAL CONSULTATION
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              Have a specific integration architecture or workflow to discuss?
            </p>
            <p className="mt-1 text-sm text-muted">
              I review existing systems and identify failure points, retry strategies, and data models.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 min-h-[46px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all hover:bg-accent-strong"
          >
            Book an audit
            <ArrowUpRight className="size-4" />
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
