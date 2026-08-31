import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { TechBadge } from "@/components/icons/tech-badge";
import type { PortfolioProject } from "@/types/portfolio";

export function ProjectHero({
  project,
}: {
  project: PortfolioProject;
}): React.JSX.Element {
  const backHref = project.tier === "systems-lab" ? "/case-studies#lab" : "/case-studies";

  return (
    <section
      id="hero"
      aria-labelledby="project-title"
      className="border-b border-border/50 bg-background pt-28"
    >
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          Back to case studies
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-border-strong/60 bg-surface/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {project.tier.replace("-", " ")}
              </span>
              {project.technologies.slice(0, 3).map((technology) => (
                <TechBadge
                  key={technology.name}
                  name={technology.name}
                  size="sm"
                />
              ))}
            </div>

            <h1
              id="project-title"
              className="mt-6 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
            >
              {project.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.summary}
            </p>
          </div>

          <div className="rounded-2xl border border-border-strong/60 bg-surface/60 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Business Value Delivered
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              {project.businessValue}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 border-t border-border/50 pt-5">
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {project.websiteLabel ?? "Visit website"}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {project.repoLabel ?? "View repository"}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              )}
              <a
                href="mailto:daniyalhaider784@gmail.com"
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Discuss a similar system
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
