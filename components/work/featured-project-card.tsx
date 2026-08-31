import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TechBadge } from "@/components/icons/tech-badge";
import type { PortfolioProject } from "@/types/portfolio";

export function FeaturedProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}): React.JSX.Element {
  return (
    <Link
      href={project.route}
      className="group block overflow-hidden rounded-2xl border border-border-strong/60 bg-[linear-gradient(180deg,rgba(23,23,27,0.85),rgba(14,14,17,0.95))] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-5 sm:gap-6">
          <span
            aria-hidden="true"
            className="select-none font-mono text-2xl font-medium leading-none text-accent sm:text-3xl"
          >
            {String(index).padStart(2, "0")}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {project.categoryLabel ?? "Flagship Case Study"}
              </span>
              {project.technologies.slice(0, 2).map((technology) => (
                <TechBadge
                  key={technology.name}
                  name={technology.name}
                  size="sm"
                />
              ))}
            </div>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
              {project.title}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-[0.95rem]">
              {project.summary}
            </p>
          </div>
        </div>

        <span className="inline-flex min-h-[42px] shrink-0 items-center gap-1.5 self-start rounded-full border border-border-strong bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all group-hover:border-accent/60 group-hover:text-accent lg:self-auto">
          View case study
          <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div className="border-t border-border/50 bg-background/40 px-6 py-3.5 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((technology) => (
            <TechBadge
              key={technology.name}
              name={technology.name}
              size="sm"
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
