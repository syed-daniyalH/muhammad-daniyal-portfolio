import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TechVisualIcon } from "@/components/icons/tech-visual-icon";
import type { PortfolioProject } from "@/types/portfolio";

export function FeaturedProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}): React.JSX.Element {
  const technologies = [...project.technologies, ...project.technologies];

  return (
    <Link
      href={project.route}
      className="group block overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-5 sm:gap-6">
          <span
            aria-hidden="true"
            className="select-none font-display text-4xl font-semibold leading-none text-border-strong sm:text-6xl"
          >
            {String(index).padStart(2, "0")}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-subtle">
                Flagship system
              </span>
              {project.technologies.slice(0, 2).map((technology) => (
                <span
                  key={technology.name}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[9px] font-medium text-foreground/85"
                >
                  {technology.name}
                </span>
              ))}
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent sm:text-4xl">
              {project.title}
            </h3>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              {project.summary}
            </p>
          </div>
        </div>

        <span className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border-strong px-5 py-2.5 text-xs font-semibold text-foreground transition-all group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:text-accent lg:self-auto">
          Open case study
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </div>

      <div className="relative overflow-hidden border-t border-border/70 bg-panel">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-panel to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-panel to-transparent sm:w-20"
        />
        <div
          className="marquee-track flex w-max items-center gap-3 py-4"
          style={{ animationDuration: "22s" }}
        >
          {technologies.map((technology, technologyIndex) => (
            <span
              key={`${technology.name}-${technologyIndex}`}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-border/70 bg-gradient-to-b from-surface to-background px-3 py-2 shadow-[0_8px_18px_rgba(0,0,0,0.28)]"
            >
              <TechVisualIcon name={technology.name} className="size-4" />
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {technology.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
