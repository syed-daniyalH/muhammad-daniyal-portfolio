import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";

import { ProjectStatusPill } from "@/components/project/project-status";
import type { PortfolioProject } from "@/types/portfolio";

export function FlagshipProjectCard({
  project,
}: {
  project: PortfolioProject;
}): React.JSX.Element {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#2D3748] bg-[#101724] shadow-[0_24px_70px_rgba(0,0,0,0.26)] transition-[border-color,box-shadow] hover:border-[#06B6D4]/45 hover:shadow-[0_30px_90px_rgba(6,182,212,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusPill
              status={project.status}
              label={project.statusLabel}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#6B7280]">
              Flagship system
            </span>
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[#F9FAFB] sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-[#9CA3AF]">
            {project.summary}
          </p>

          <div className="mt-6 border-l border-[#06B6D4]/30 pl-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300">
              Daniyal&apos;s role
            </p>
            <p className="mt-2 text-sm leading-6 text-[#D1D5DB]">
              {project.role}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((technology) => (
              <span
                key={technology.name}
                className="rounded-full border border-[#2D3748] bg-[#0B0F17] px-3 py-1.5 text-[10px] font-medium text-[#D1D5DB]"
              >
                {technology.name}
              </span>
            ))}
          </div>

          <Link
            href={project.route}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#6366F1] px-5 py-3 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(99,102,241,0.22)] transition-all hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
          >
            Open case study
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="border-t border-[#2D3748] bg-[#070A10] p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2">
            <Layers3 aria-hidden="true" className="size-4 text-cyan-300" />
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300">
              Architecture preview
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {project.architecture.slice(0, 4).map((node, index) => (
              <div
                key={node.id}
                className="grid grid-cols-[2.25rem_1fr] gap-3"
              >
                <span className="flex size-9 items-center justify-center rounded-xl border border-[#2D3748] bg-[#161E2E] font-mono text-[10px] text-cyan-200">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[#F9FAFB]">
                    {node.title}
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-[#9CA3AF]">
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t border-[#2D3748]/70 pt-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#6B7280]">
              Evidence state
            </p>
            <p className="mt-2 text-xs leading-5 text-[#9CA3AF]">
              {project.evidence[0]?.title ?? "Evidence registry pending"}:
              {" "}
              {project.evidence[0]?.caption ??
                "Evidence will be added only after review."}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
