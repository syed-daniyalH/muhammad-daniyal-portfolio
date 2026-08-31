import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BRAND_NAME } from "@/lib/branding";

const FEATURED_PROJECT_HREF = "/case-studies/sm2-race-control";
const GITHUB_HREF = "https://github.com/syed-daniyalH";

const DIRECT_CONTACTS = [
  {
    label: "Email",
    value: "daniyalhaider784@gmail.com",
    href: "mailto:daniyalhaider784@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/syeddaniyalhaider3",
    href: "https://linkedin.com/in/syeddaniyalhaider3",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/syed-daniyalH",
    href: "https://github.com/syed-daniyalH",
    icon: Github,
  },
] as const;

export function ContactSection(): React.JSX.Element {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
        <ScrollReveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Contact
          </p>
          <h2
            id="contact-title"
            className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-6xl"
          >
            Have an automation problem? Let&apos;s talk.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted">
            I&apos;m available for GoHighLevel automation, AI agents,
            Python and FastAPI systems, n8n and Make.com workflows, CRM
            integrations, and custom API delivery.
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="mailto:daniyalhaider784@gmail.com"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <Mail aria-hidden="true" className="size-4" />
            Email {BRAND_NAME}
          </a>
          <Link
            href={FEATURED_PROJECT_HREF}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <BriefcaseBusiness aria-hidden="true" className="size-4" />
            View featured case study
          </Link>
          <a
            href={GITHUB_HREF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Github aria-hidden="true" className="size-4" />
            GitHub
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </ScrollReveal>

        <ScrollReveal
          delay={0.16}
          className="mx-auto mt-10 grid w-full max-w-3xl gap-4 border-t border-border/80 pt-8 sm:grid-cols-3 sm:pt-10"
        >
          {DIRECT_CONTACTS.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex h-full flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-surface px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Icon aria-hidden="true" className="size-4 text-accent" />
              <span className="text-xs font-semibold text-foreground/95">
                {label}
              </span>
              <span className="break-all text-[11px] leading-5 text-foreground/78 transition-colors group-hover:text-foreground">
                {value}
              </span>
            </a>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
