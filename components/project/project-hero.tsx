import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

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
      className="border-b border-border/60 bg-background pt-28"
    >
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 lg:px-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to case studies
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {project.tier.replace("-", " ")}
              </span>
              {project.technologies.slice(0, 3).map((technology) => (
                <span
                  key={technology.name}
                  className="inline-flex w-fit items-center rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-semibold text-foreground/85"
                >
                  {technology.name}
                </span>
              ))}
            </div>

            <h1
              id="project-title"
              className="mt-7 max-w-5xl text-4xl font-semibold leading-[1.04] tracking-normal text-foreground sm:text-6xl"
            >
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {project.summary}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
              Business value
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground/85">
              {project.businessValue}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {project.websiteLabel ?? "Visit website"}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {project.repoLabel ?? "View repository"}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              )}
              <a
                href="mailto:daniyalhaider784@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Discuss a similar system
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
