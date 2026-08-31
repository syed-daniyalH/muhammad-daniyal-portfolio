"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export function HeroSection(): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-border/60 bg-background pt-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-8%] -z-10 size-[560px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[160px]"
      />

      <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:px-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Selected Case Studies
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[4.75rem]"
          >
            Automation systems built for real business operations.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
            I design production automation systems in GoHighLevel, n8n,
            Make.com, Python, FastAPI, and PostgreSQL. Recent client systems
            have reduced manual processing by about 70 percent, shortened lead
            response from more than 4 hours to 15 to 20 minutes, and supported
            300 plus active contacts.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/case-studies"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Explore case studies
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
              Get in touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
