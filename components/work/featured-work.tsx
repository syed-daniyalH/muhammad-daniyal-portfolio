import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  flagshipProjects,
  supportingProjects,
  systemsLabProjects,
} from "@/content";
import { FlagshipProjectCard } from "@/components/work/flagship-project-card";
import { SupportingProjectCard } from "@/components/work/supporting-project-card";

export function FeaturedWork(): React.JSX.Element {
  const labProject = systemsLabProjects[0];

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-24 border-b border-[#2D3748]/60 bg-[#0B0F17] py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300">
            Featured work
          </p>
          <h2
            id="work-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#F9FAFB] sm:text-5xl"
          >
            Systems with enough detail to inspect.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#9CA3AF]">
            Seven projects are published from one typed content registry, with
            status labels, role boundaries, architecture notes, reliability
            controls, security posture, testing notes, evidence state, and
            remaining work separated from UI code.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {flagshipProjects.map((project) => (
            <FlagshipProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>

        <div className="mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-indigo-300">
                Supporting projects
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#F9FAFB]">
                Breadth across AI, CRM, and operations.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#9CA3AF]">
              Supporting work is intentionally secondary to the flagship
              systems, but remains routeable and inspectable.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {supportingProjects.map((project) => (
              <SupportingProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        </div>

        {labProject && (
          <div
            id="lab"
            className="mt-16 scroll-mt-24 rounded-2xl border border-[#2D3748] bg-[#101724] p-6 sm:p-8"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
              Systems Lab
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <h3 className="text-2xl font-semibold text-[#F9FAFB]">
                  {labProject.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#9CA3AF]">
                  {labProject.summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {labProject.technologies.slice(0, 5).map((technology) => (
                    <span
                      key={technology.name}
                      className="rounded-full border border-[#2D3748] bg-[#0B0F17] px-2.5 py-1 text-[9px] font-medium text-[#D1D5DB]"
                    >
                      {technology.name}
                    </span>
                  ))}
                </div>
                <Link
                  href={labProject.route}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#2D3748] bg-[#0B0F17] px-5 py-3 text-xs font-semibold text-cyan-200 transition-colors hover:border-[#06B6D4]/45 hover:text-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
                >
                  Open lab case study
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
