import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { flagshipProjects, portfolioProjects } from "@/content";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function WorkTeaser(): React.JSX.Element {
  return (
    <section
      id="work-teaser"
      aria-labelledby="work-teaser-title"
      className="border-b border-border/60 bg-background py-24 sm:py-30"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <ScrollReveal className="flex flex-col justify-between gap-6 border-b border-border/70 pb-8 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Selected systems / 02
            </p>
            <h2
              id="work-teaser-title"
              className="mt-4 text-4xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-[3.6rem]"
            >
              Proof lives in the workflow.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
              {flagshipProjects.length} flagship systems from {portfolioProjects.length}{" "}
              published case studies, each written to show the operational
              problem, the system shape, and the delivery decisions behind it.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View all case studies
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </ScrollReveal>

        <div className="divide-y divide-border/70">
          {flagshipProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.06} y={12}>
              <Link
                href={project.route}
                className="group block py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:py-10"
              >
                <div className="grid gap-5 lg:grid-cols-[3.5rem_minmax(0,0.95fr)_minmax(0,1fr)_auto] lg:items-start lg:gap-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {project.technologies[0]?.name ?? "Case study"}
                    </p>
                    <h3 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-normal text-foreground transition-colors group-hover:text-accent sm:text-[2.45rem]">
                      {project.title}
                    </h3>
                  </div>

                  <div>
                    <p className="max-w-2xl text-sm leading-7 text-muted sm:text-[0.98rem]">
                      {project.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((technology) => (
                        <span
                          key={technology.name}
                          className="rounded-full border border-border/70 bg-surface/60 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-foreground/82"
                        >
                          {technology.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent lg:justify-self-end">
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
