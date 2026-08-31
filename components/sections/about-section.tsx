import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { FileText, Mail } from "lucide-react";
import Link from "next/link";
import { RESUME_PATH } from "@/lib/branding";

export function AboutSection(): React.JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 border-b border-border/50 bg-panel py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              About / Background
            </p>
            <h1
              id="about-title"
              className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
            >
              Connecting operations with reliable software and automation.
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border-strong bg-surface/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:border-accent/60 hover:text-accent"
              >
                <FileText aria-hidden="true" className="size-4" />
                Download Resume
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all hover:bg-accent-strong"
              >
                <Mail aria-hidden="true" className="size-4" />
                Get in touch
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              I’m an <strong className="text-foreground font-medium">AI Automation & Systems Engineer</strong> focused on connecting business operations with reliable software and automation.
            </p>
            <p>
              My work spans CRM workflows, AI-assisted customer journeys, API integrations, backend services, booking systems, and operational platforms using tools such as GoHighLevel, n8n, Make, Python, FastAPI, and PostgreSQL.
            </p>
            <p>
              I’m particularly interested in the parts of automation that determine whether a system works reliably in practice: data mapping, webhook handling, system state, failure recovery, testing, and human handoffs.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
