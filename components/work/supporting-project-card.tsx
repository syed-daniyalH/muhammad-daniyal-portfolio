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
    <article className="flex h-full flex-col rounded-2xl border border-[#2D3748] bg-[#101724] p-5 transition-[border-color,transform] hover:-translate-y-1 hover:border-[#06B6D4]/40">
      <ProjectStatusPill
        status={project.status}
        label={project.statusLabel}
      />

      <h3 className="mt-5 text-lg font-semibold text-[#F9FAFB]">
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#9CA3AF]">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((technology) => (
          <span
            key={technology.name}
            className="rounded-full border border-[#2D3748] bg-[#0B0F17] px-2.5 py-1 text-[9px] font-medium text-[#D1D5DB]"
          >
            {technology.name}
          </span>
        ))}
      </div>

      <Link
        href={project.route}
        className="mt-auto inline-flex min-h-10 w-fit items-center gap-2 pt-6 text-xs font-semibold text-cyan-200 transition-colors hover:text-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
      >
        View details
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}
