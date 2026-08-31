import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TechVisualIcon } from "@/components/icons/tech-visual-icon";
import {
  flagshipProjects,
  portfolioProjects,
  supportingProjects,
  systemsLabProjects,
} from "@/content";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { FeaturedProjectCard } from "@/components/work/featured-project-card";
import { SupportingProjectList } from "@/components/work/supporting-project-list";

const CASE_STUDY_PILLS = [
  "GoHighLevel",
  "Make.com",
  "Power Automate",
  "Zoho CRM",
  "Python",
  "REST APIs",
  "n8n",
  "OpenAI",
] as const;

export function FeaturedWork(): React.JSX.Element {
  const labProject = systemsLabProjects[0];

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-title"
      className="scroll-mt-24 border-b border-border/60 bg-background py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <ScrollReveal className="relative isolate overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(135deg,rgba(28,20,14,0.96),rgba(12,14,18,0.98))] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:px-8 sm:py-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:38px_38px] opacity-[0.16]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_top_left,rgba(227,165,72,0.16),transparent_58%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(124,147,173,0.12),transparent_56%)]"
          />

          <div className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Case studies
            </p>
            <h1
              id="case-studies-title"
              className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[4rem]"
            >
              Automation systems with a polished front end and a guarded core.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              GoHighLevel, Make.com, Power Automate, Zoho CRM, Python, and REST
              APIs connected through flows that validate data, retry safely,
              and stay client-ready from the first handoff to the final sync.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {CASE_STUDY_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3 py-2 text-xs font-medium text-foreground/90 backdrop-blur-sm"
                >
                  <TechVisualIcon name={pill} className="size-4" />
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 space-y-6">
          <ScrollReveal className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Flagship case studies
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              {portfolioProjects.length} delivery systems with real implementation depth.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              Each case study stays inspectable: architecture, role, workflow
              decisions, engineering rigor, and sanitized public evidence where
              it is safe to show.
            </p>
          </ScrollReveal>

          {flagshipProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.06} y={12}>
              <FeaturedProjectCard project={project} index={index + 1} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-20">
          <ScrollReveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-info">
                Supporting projects
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                Breadth across CRM, AI ops, and revenue systems.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">
              Secondary to the flagship systems above, but fully routeable and
              inspectable.
            </p>
          </ScrollReveal>

          <div className="mt-8">
            <SupportingProjectList projects={supportingProjects} />
          </div>
        </div>

        {labProject && (
          <ScrollReveal
            className="mt-16 scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-surface"
            id="lab"
          >
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                  Systems Lab
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                  {labProject.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{labProject.summary}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {labProject.technologies.slice(0, 5).map((technology) => (
                    <span
                      key={technology.name}
                      className="rounded-full border border-border bg-background px-2.5 py-1 text-[9px] font-medium text-foreground/85"
                    >
                      {technology.name}
                    </span>
                  ))}
                </div>
                <Link
                  href={labProject.route}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-xs font-semibold text-accent transition-colors hover:border-accent/45 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Open lab case study
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
