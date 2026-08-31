import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBadge } from "@/components/icons/tech-badge";
import type { PortfolioProject } from "@/types/portfolio";

export function SupportingProjectList({
  projects,
}: {
  projects: readonly PortfolioProject[];
}): React.JSX.Element {
  return (
    <div className="divide-y divide-border/50 border-y border-border/50">
      {projects.map((project, index) => (
        <ScrollReveal key={project.slug} delay={index * 0.06} y={12}>
          <Link
            href={project.route}
            className="group grid gap-4 py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:grid-cols-[3rem_1.2fr_2fr_auto] sm:items-center sm:gap-6"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-subtle">
                {project.technologies[0]?.name ?? "Case study"}
              </p>
              <h4 className="mt-1 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h4>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {project.technologies.slice(0, 3).map((technology) => (
                  <TechBadge
                    key={technology.name}
                    name={technology.name}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted sm:max-w-md">{project.summary}</p>

            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent opacity-0 transition-opacity group-hover:opacity-100 sm:justify-self-end">
              View details
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </span>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
