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
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <ScrollReveal className="border-b border-border/70 pb-10">
          <div className="max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Selected systems / case studies
            </p>
            <h1
              id="case-studies-title"
              className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-[3.8rem]"
            >
              Real solutions, measurable impact.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-[1.05rem]">
              Explore detailed case studies of production-grade CRM, AI, and API integrations. Discover the architectural decisions, engineering rigor, and measurable outcomes behind each system.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {CASE_STUDY_PILLS.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-3 py-2 text-xs font-medium text-foreground/88"
              >
                <TechVisualIcon name={pill} className="size-4" />
                {pill}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 space-y-6">
          <ScrollReveal className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Flagship case studies
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-[2.65rem]">
              {portfolioProjects.length} production systems with real implementation depth.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
              Each case study provides transparent insights into the architecture, workflow logic, engineering challenges, and sanitized evidence of live deployment.
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
              <h3 className="mt-2 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-[2.4rem]">
                Breadth across CRM, AI ops, and revenue systems.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted">
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
            className="mt-16 scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface/70"
            id="lab"
          >
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                  Systems Lab
                </p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-[2.3rem]">
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
