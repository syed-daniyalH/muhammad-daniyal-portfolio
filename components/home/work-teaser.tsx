import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { flagshipProjects, portfolioProjects } from "@/content";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function WorkTeaser(): React.JSX.Element {
  return (
    <section
      id="work-teaser"
      aria-labelledby="work-teaser-title"
      className="border-b border-border/60 bg-background py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <ScrollReveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Selected case studies
            </p>
            <h2
              id="work-teaser-title"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl"
            >
              Three flagship case studies from {portfolioProjects.length} published case studies.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-xs font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View all case studies
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </ScrollReveal>

        <div className="mt-10 divide-y divide-border/70 border-y border-border/70">
          {flagshipProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.06} y={12}>
              <Link
                href={project.route}
                className="group grid gap-4 py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:grid-cols-[3rem_1.3fr_2fr_auto] sm:items-center sm:gap-6"
              >
                <span className="font-display text-2xl text-border-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((technology) => (
                      <span
                        key={technology.name}
                        className="rounded-full border border-border bg-surface px-2.5 py-1 text-[9px] font-medium text-foreground/85"
                      >
                        {technology.name}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-6 text-muted sm:max-w-md">{project.summary}</p>

                <span className="flex items-center gap-2 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100 sm:justify-self-end">
                  Open
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
