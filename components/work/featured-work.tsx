import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  flagshipProjects,
  portfolioProjects,
  supportingProjects,
  systemsLabProjects,
} from "@/content";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { FeaturedProjectCard } from "@/components/work/featured-project-card";
import { SupportingProjectList } from "@/components/work/supporting-project-list";
import { TechBadge } from "@/components/icons/tech-badge";

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
      className="scroll-mt-24 border-b border-border/50 bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="border-b border-border/50 pb-10">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Systems & Case Studies
            </p>
            <h1
              id="case-studies-title"
              className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.5rem] lg:text-[4.25rem]"
            >
              Documented Systems & Implementations
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-[1.05rem]">
              Explore documented systems across CRM workflows, AI automation, API integrations, and backend architectures. Each case study details the operational challenge, implementation decisions, and deliverables.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {CASE_STUDY_PILLS.map((pill) => (
              <TechBadge key={pill} name={pill} size="md" />
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-14 space-y-8">
          <ScrollReveal className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Flagship Deployments
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.015em] text-foreground sm:text-[2.25rem]">
              {portfolioProjects.length} production systems with real implementation depth.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              Each case study provides transparent insights into architecture, workflow logic, engineering tradeoffs, and sanitized evidence of live deployment.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {flagshipProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 0.06} y={12}>
                <FeaturedProjectCard project={project} index={index + 1} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <ScrollReveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-border/50 pb-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Supporting Systems
              </p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.015em] text-foreground sm:text-3xl">
                Breadth across CRM, AI ops, and revenue systems.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Secondary to the flagship systems above, but fully documented and inspectable.
            </p>
          </ScrollReveal>

          <div className="mt-8">
            <SupportingProjectList projects={supportingProjects} />
          </div>
        </div>

        {labProject && (
          <ScrollReveal
            className="mt-16 scroll-mt-24 overflow-hidden rounded-2xl border border-border-strong/60 bg-surface/60"
            id="lab"
          >
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                  Systems Lab
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                  {labProject.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{labProject.summary}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {labProject.technologies.slice(0, 5).map((technology) => (
                    <TechBadge
                      key={technology.name}
                      name={technology.name}
                      size="sm"
                    />
                  ))}
                </div>
                <Link
                  href={labProject.route}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border-strong bg-background px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
