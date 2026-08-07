import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ProjectStatusPill } from "@/components/project/project-status";
import type { PortfolioProject } from "@/types/portfolio";

export function ProjectHero({
  project,
}: {
  project: PortfolioProject;
}): React.JSX.Element {
  const backHref = project.tier === "systems-lab" ? "/#lab" : "/#work";

  return (
    <section
      id="hero"
      aria-labelledby="project-title"
      className="border-b border-[#2D3748]/60 bg-[#0B0F17] pt-28"
    >
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 lg:px-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-200 transition-colors hover:text-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to portfolio work
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-3">
              <ProjectStatusPill
                status={project.status}
                label={project.statusLabel}
              />
              <span className="inline-flex w-fit items-center rounded-full border border-[#2D3748] bg-[#161E2E] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9CA3AF]">
                {project.tier.replace("-", " ")}
              </span>
            </div>

            <h1
              id="project-title"
              className="mt-7 max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#F9FAFB] sm:text-6xl"
            >
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-[#9CA3AF] sm:text-lg">
              {project.summary}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2D3748] bg-[#101724] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300">
              Business value
            </p>
            <p className="mt-3 text-sm leading-7 text-[#D1D5DB]">
              {project.businessValue}
            </p>
            <a
              href="mailto:daniyalhaider784@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200 transition-colors hover:text-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
            >
              Discuss similar work
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
