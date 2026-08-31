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
            className="group grid gap-4 py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:grid-cols-[3rem_1.4fr_2fr_auto] sm:items-center sm:gap-6"
          >
            <span className="font-mono text-xs text-muted-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h4 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h4>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {project.technologies.slice(0, 3).map((technology) => (
                  <span
                    key={technology.name}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-[9px] font-medium text-foreground/85"
                  >
                    {technology.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm leading-6 text-muted sm:max-w-md">{project.summary}</p>

            <span className="flex items-center gap-2 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100 sm:justify-self-end">
              View details
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
