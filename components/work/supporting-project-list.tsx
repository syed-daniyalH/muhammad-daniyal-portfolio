import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { PortfolioProject } from "@/types/portfolio";

export function SupportingProjectList({
  projects,
}: {
  projects: readonly PortfolioProject[];
}): React.JSX.Element {
  return (
    <div className="divide-y divide-border/70 border-y border-border/70">
      {projects.map((project, index) => (
        <ScrollReveal key={project.slug} delay={index * 0.06} y={12}>
          <Link
            href={project.route}
            className="group grid gap-4 py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:grid-cols-[3rem_1.2fr_2fr_auto] sm:items-center sm:gap-6"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-info">
                {project.technologies[0]?.name ?? "Case study"}
              </p>
              <h4 className="mt-2 text-xl font-semibold tracking-normal text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h4>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {project.technologies.slice(0, 3).map((technology) => (
                  <span
                    key={technology.name}
                    className="rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-foreground/85"
                  >
                    {technology.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm leading-7 text-muted sm:max-w-md">{project.summary}</p>

            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent opacity-0 transition-opacity group-hover:opacity-100 sm:justify-self-end">
              View details
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
