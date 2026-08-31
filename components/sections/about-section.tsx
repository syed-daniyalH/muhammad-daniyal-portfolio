import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Award, GraduationCap, Mail } from "lucide-react";
import Link from "next/link";
import { RESUME_PATH } from "@/lib/branding";

const CERTIFICATIONS = [
  { name: "n8n Automation", issuer: "Simplilearn", year: "2026" },
  { name: "IBM Data Analyst", issuer: "Coursera", year: "Feb 2026" },
  { name: "Data Visualization with Python", issuer: "Coursera", year: "Feb 2026" },
  { name: "Data Analysis with Python", issuer: "Coursera", year: "Jan 2026" },
  { name: "Databases and SQL for Data Science with Python", issuer: "Coursera", year: "Jan 2026" },
] as const;

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
                Download Resume PDF
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
              I’m an <strong className="text-foreground font-medium">AI Automation & Systems Engineer</strong> based in Lahore, Pakistan, focused on connecting business operations with reliable software and automation.
            </p>
            <p>
              My work spans CRM workflows, AI-assisted customer journeys, API integrations, backend services, booking systems, and operational platforms using tools such as GoHighLevel, n8n, Make, Python, FastAPI, and PostgreSQL.
            </p>
            <p>
              I’m particularly interested in the parts of automation that determine whether a system works reliably in practice: data mapping, webhook handling, system state, failure recovery, testing, and human handoffs.
            </p>
          </ScrollReveal>
        </div>

        {/* Education & Certifications Grid */}
        <div className="mt-16 grid gap-8 border-t border-border/50 pt-12 lg:grid-cols-2">
          {/* Education */}
          <ScrollReveal className="rounded-2xl border border-border-strong/60 bg-surface/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-accent">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                  Education
                </p>
                <h3 className="text-lg font-semibold text-foreground">
                  BS in Computer Science
                </h3>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <p className="text-sm font-medium text-foreground/90">
                Government College University (GCU), Lahore · 2021 to 2025
              </p>
              <p className="text-xs leading-relaxed text-muted">
                <strong className="text-foreground/80">Relevant coursework:</strong> Data Structures & Algorithms, Database Systems, Software Engineering, Artificial Intelligence, Web Technologies, Computer Networks.
              </p>
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal delay={0.08} className="rounded-2xl border border-border-strong/60 bg-surface/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-accent">
                <Award className="size-5" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                  Credentials
                </p>
                <h3 className="text-lg font-semibold text-foreground">
                  Verified Certifications
                </h3>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5 divide-y divide-border/30">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name} className="flex items-center justify-between pt-2.5 first:pt-0 text-xs">
                  <span className="font-medium text-foreground/90">{cert.name}</span>
                  <span className="font-mono text-[11px] text-muted-subtle">
                    {cert.issuer} ({cert.year})
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
