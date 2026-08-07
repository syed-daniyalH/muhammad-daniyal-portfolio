"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLenis } from "lenis/react";
import {
  siDocker,
  siFastapi,
  siMake,
  siN8n,
  siNextdotjs,
  siPostgresql,
  siQuickbooks,
  type SimpleIcon,
} from "simple-icons";

import { BrandIcon } from "@/components/icons/brand-icon";

interface BaseTechnologyItem {
  name: string;
  description: string;
  displayColor?: string;
}

type TechnologyItem =
  | (BaseTechnologyItem & {
      icon: SimpleIcon;
      iconKind: "brand";
    })
  | (BaseTechnologyItem & {
      icon: LucideIcon;
      iconKind: "lucide";
    });

const TECHNOLOGIES: readonly TechnologyItem[] = [
  {
    name: "FastAPI",
    description: "Typed Python APIs",
    icon: siFastapi,
    iconKind: "brand",
  },
  {
    name: "Next.js",
    description: "App Router applications",
    icon: siNextdotjs,
    iconKind: "brand",
    displayColor: "#F5F5F3",
  },
  {
    name: "Neon Postgres",
    description: "Serverless relational data",
    icon: siPostgresql,
    iconKind: "brand",
  },
  {
    name: "Docker",
    description: "Portable deployment",
    icon: siDocker,
    iconKind: "brand",
  },
  {
    name: "Make.com",
    description: "Visual orchestration",
    icon: siMake,
    iconKind: "brand",
  },
  {
    name: "n8n",
    description: "Workflow automation",
    icon: siN8n,
    iconKind: "brand",
  },
  {
    name: "Twilio",
    description: "Messaging and voice",
    icon: Radio,
    iconKind: "lucide",
    displayColor: "#F5F5F3",
  },
  {
    name: "OpenAI",
    description: "Structured AI extraction",
    icon: BrainCircuit,
    iconKind: "lucide",
    displayColor: "#F5F5F3",
  },
  {
    name: "QuickBooks",
    description: "Accounting integration",
    icon: siQuickbooks,
    iconKind: "brand",
  },
] as const;

function scrollWithoutLenis(selector: `#${string}`): void {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;

  const targetTop =
    element.getBoundingClientRect().top + window.scrollY - 88;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
}

export function HeroSection(): React.JSX.Element {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();

  const scrollToSection = (selector: `#${string}`): void => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) return;

    const targetTop =
      element.getBoundingClientRect().top + window.scrollY - 88;

    if (lenis) {
      lenis.scrollTo(targetTop, {
        duration: reducedMotion ? 0 : 1.05,
      });
    } else {
      scrollWithoutLenis(selector);
    }

    window.history.replaceState(null, "", selector);
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[820px] scroll-mt-24 overflow-hidden border-b border-border/60 bg-background pt-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[4%] top-[18%] -z-10 size-[420px] rounded-full bg-accent/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[4%] top-[22%] -z-10 size-[390px] rounded-full bg-info/10 blur-[140px]"
      />

      <div className="mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-2">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-semibold text-emerald-300">
              Secure Automation Portfolio
            </span>
          </div>

          <h1
            id="hero-title"
            className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.048em] text-foreground sm:text-6xl lg:text-7xl"
          >
            AI &amp; Full-Stack
            <span className="block bg-gradient-to-r from-accent-soft via-accent to-accent-strong bg-clip-text text-transparent">
              Automation Engineer
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Designing production-grade AI intake pipelines, FastAPI backends,
            and serverless Postgres architectures that bridge voice agents,
            messaging, and enterprise systems.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection("#work")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-[0_14px_38px_rgba(227,165,72,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_18px_46px_rgba(227,165,72,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Explore Case Studies
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("#sandbox")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface/65 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/[0.06] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Run Live Webhook Sandbox
              <Network aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/70 pt-6 text-xs text-muted">
            <span className="flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="size-4 text-accent" />
              Secure API boundaries
            </span>
            <span className="flex items-center gap-2">
              <Boxes aria-hidden="true" className="size-4 text-info" />
              Full lifecycle integrations
            </span>
            <span className="flex items-center gap-2">
              <Radio aria-hidden="true" className="size-4 text-emerald-300" />
              Voice and messaging systems
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.97, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative rounded-3xl border border-border bg-surface/85 p-5 shadow-[0_34px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-6"
        >
          <div
            aria-hidden="true"
            className="absolute right-4 top-5 size-36 rounded-full bg-accent/10 blur-[70px]"
          />

          <div className="relative">
            <div className="flex items-center justify-between border-b border-border/80 pb-5">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Core technology matrix
                </p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">
                  Production stack
                </h2>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl border border-info/20 bg-info/10 text-info">
                <Sparkles aria-hidden="true" className="size-5" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TECHNOLOGIES.map((technology, index) => {
                const color =
                  technology.displayColor ??
                  (technology.iconKind === "brand"
                    ? `#${technology.icon.hex}`
                    : "#E3A548");
                const style = { "--brand-color": color } as CSSProperties;

                return (
                  <motion.div
                    key={technology.name}
                    style={style}
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.15 + index * 0.045,
                    }}
                    whileHover={
                      reducedMotion ? undefined : { y: -5, scale: 1.045 }
                    }
                    className="group relative isolate overflow-hidden rounded-2xl border border-border bg-background/55 p-4 transition-[border-color,box-shadow] duration-300 hover:border-accent/45 hover:shadow-[0_18px_45px_rgba(227,165,72,0.10)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-4 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
                      style={{ backgroundColor: color }}
                    />

                    {technology.iconKind === "brand" ? (
                      <BrandIcon
                        icon={technology.icon}
                        label={`${technology.name} logo`}
                        color={color}
                        className="size-5 transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110"
                      />
                    ) : (
                      (() => {
                        const Icon = technology.icon;

                        return (
                          <Icon
                            aria-hidden="true"
                            className="size-5 transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110"
                            style={{ color }}
                          />
                        );
                      })()
                    )}

                    <h3 className="mt-4 text-xs font-semibold text-foreground">
                      {technology.name}
                    </h3>
                    <p className="mt-1 text-[10px] leading-4 text-muted-subtle">
                      {technology.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
