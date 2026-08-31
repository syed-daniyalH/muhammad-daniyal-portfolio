import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { flagshipProjects } from "@/content";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBadge } from "@/components/icons/tech-badge";

export function WorkTeaser(): React.JSX.Element {
  return (
    <section
      id="work-teaser"
      aria-labelledby="work-teaser-title"
      className="border-b border-border/50 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col justify-between gap-6 border-b border-border/50 pb-8 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Selected Work / 02
            </p>
            <h2
              id="work-teaser-title"
              className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
            >
              Featured Systems & Case Studies
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Explore {flagshipProjects.length} featured deployments across CRM, AI, and workflow automation. Each project highlights the operational challenge, the technical implementation, and the delivered deliverables.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border-strong bg-surface/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View all case studies
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </ScrollReveal>

        <div className="divide-y divide-border/50">
          {flagshipProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.06} y={12}>
              <Link
                href={project.route}
                className="group block py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:py-10"
              >
                <div className="grid gap-5 lg:grid-cols-[3.5rem_minmax(0,0.95fr)_minmax(0,1.1fr)_auto] lg:items-start lg:gap-8">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-subtle">
                      {project.categoryLabel ?? project.technologies[0]?.name ?? "Case study"}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.015em] text-foreground transition-colors group-hover:text-accent sm:text-[1.85rem]">
                      {project.title}
                    </h3>
                  </div>

                  <div>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((technology) => (
                        <TechBadge
                          key={technology.name}
                          name={technology.name}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent lg:justify-self-end">
                    View case study
                    <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
