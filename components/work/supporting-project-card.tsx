import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectStatusPill } from "@/components/project/project-status";
import type { PortfolioProject } from "@/types/portfolio";

export function SupportingProjectCard({
  project,
}: {
  project: PortfolioProject;
}): React.JSX.Element {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-[border-color,transform] hover:-translate-y-1 hover:border-accent/40">
      <ProjectStatusPill
        status={project.status}
        label={project.statusLabel}
      />

      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((technology) => (
          <span
            key={technology.name}
            className="rounded-full border border-border bg-background px-2.5 py-1 text-[9px] font-medium text-foreground/85"
          >
            {technology.name}
          </span>
        ))}
      </div>

      <Link
        href={project.route}
        className="mt-auto inline-flex min-h-10 w-fit items-center gap-2 pt-6 text-xs font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        View details
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}
