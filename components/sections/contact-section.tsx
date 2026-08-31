import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BRAND_NAME, RESUME_PATH } from "@/lib/branding";

const GITHUB_HREF = "https://github.com/syed-daniyalH";
const LINKEDIN_HREF = "https://linkedin.com/in/syeddaniyalhaider3";
const EMAIL_HREF = "mailto:daniyalhaider784@gmail.com";

const DIRECT_CONTACTS = [
  {
    label: "Email",
    value: "daniyalhaider784@gmail.com",
    href: EMAIL_HREF,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/syeddaniyalhaider3",
    href: LINKEDIN_HREF,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/syed-daniyalH",
    href: GITHUB_HREF,
    icon: Github,
  },
  {
    label: "Resume / CV",
    value: "Download PDF Resume",
    href: RESUME_PATH,
    icon: FileText,
  },
] as const;

export function ContactSection(): React.JSX.Element {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Inquiries / Contact
          </p>
          <h1
            id="contact-title"
            className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.5rem] lg:text-[4rem]"
          >
            Let&apos;s discuss an opportunity.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m open to engineering roles, automation projects, and technical collaborations involving AI workflows, CRM systems, APIs, and business automation.
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={EMAIL_HREF}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <Mail aria-hidden="true" className="size-4" />
            Email {BRAND_NAME}
          </a>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FileText aria-hidden="true" className="size-4" />
            Download Resume
          </a>
          <a
            href={LINKEDIN_HREF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Linkedin aria-hidden="true" className="size-4" />
            LinkedIn
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </ScrollReveal>

        <ScrollReveal
          delay={0.16}
          className="mx-auto mt-14 grid w-full max-w-4xl gap-4 border-t border-border/50 pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {DIRECT_CONTACTS.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
              rel={href.startsWith("http") || href.endsWith(".pdf") ? "noreferrer" : undefined}
              className="group flex h-full flex-col items-start justify-between gap-3 rounded-2xl border border-border-strong/60 bg-surface/50 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex w-full items-center justify-between">
                <Icon aria-hidden="true" className="size-4 text-accent" />
                <ArrowUpRight aria-hidden="true" className="size-3.5 text-muted-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </div>
              <div>
                <span className="text-sm font-semibold tracking-tight text-foreground block">
                  {label}
                </span>
                <span className="break-all text-xs leading-relaxed text-muted transition-colors group-hover:text-foreground/90 mt-1 block">
                  {value}
                </span>
              </div>
            </a>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
