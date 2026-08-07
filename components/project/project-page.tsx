import { Mail } from "lucide-react";

import { ArchitecturePanel } from "@/components/project/architecture-panel";
import { EngineeringDecisions } from "@/components/project/engineering-decisions";
import { EvidenceGallery } from "@/components/project/evidence-gallery";
import { ProjectFactPanel } from "@/components/project/project-fact-panel";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectNavigation } from "@/components/project/project-navigation";
import { ProjectSection, BulletList } from "@/components/project/project-section";
import { ProjectStatusPill } from "@/components/project/project-status";
import { WorkflowSteps } from "@/components/project/workflow-steps";
import type { PortfolioProject } from "@/types/portfolio";

const SECTION_LINKS = [
  ["summary", "Summary"],
  ["challenge", "Challenge"],
  ["role", "Role"],
  ["solution", "Solution"],
  ["architecture", "Architecture"],
  ["workflow", "Workflow"],
  ["decisions", "Decisions"],
  ["reliability", "Reliability"],
  ["security", "Security"],
  ["testing", "Testing"],
  ["stack", "Stack"],
  ["evidence", "Evidence"],
  ["status", "Status"],
  ["remaining-work", "Remaining work"],
] as const;

export function ProjectPage({
  project,
  previous,
  next,
}: {
  project: PortfolioProject;
  previous: PortfolioProject | null;
  next: PortfolioProject | null;
}): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProjectHero project={project} />

      <div className="border-b border-border/60 bg-console">
        <nav
          aria-label="Case study sections"
          className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-4 sm:px-8 lg:px-10"
        >
          {SECTION_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={`#${href}`}
              className="shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium text-muted transition-colors hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <ProjectSection
        id="summary"
        eyebrow="Executive summary"
        title="What was built"
      >
        <div className="space-y-7">
          <p className="text-base leading-8 text-foreground/85">
            {project.summary}
          </p>
          <ProjectFactPanel project={project} />
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {project.metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-subtle">
                    Metric source: {metric.state.replaceAll("-", " ")}
                  </p>
                  <strong className="mt-2 block text-2xl font-semibold text-foreground">
                    {metric.value}
                  </strong>
                  <p className="mt-2 text-sm font-medium text-accent">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    {metric.source}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </ProjectSection>

      <ProjectSection
        id="challenge"
        eyebrow="Business challenge"
        title="The operational pain"
      >
        <BulletList items={project.challenge} />
      </ProjectSection>

      <ProjectSection
        id="role"
        eyebrow="My role"
        title="Ownership boundaries"
      >
        <div className="space-y-6">
          <p className="text-base leading-8 text-foreground/85">
            {project.role}
          </p>
          <BulletList items={project.responsibilities} />
        </div>
      </ProjectSection>

      <ProjectSection
        id="solution"
        eyebrow="Technical solution"
        title="How the system responds"
      >
        <BulletList items={project.solution} />
      </ProjectSection>

      <ProjectSection
        id="architecture"
        eyebrow="System architecture"
        title="Main components"
      >
        <ArchitecturePanel nodes={project.architecture} />
      </ProjectSection>

      <ProjectSection
        id="workflow"
        eyebrow="Core workflow"
        title="Operational sequence"
      >
        <WorkflowSteps steps={project.workflow} />
      </ProjectSection>

      <ProjectSection
        id="decisions"
        eyebrow="Engineering decisions"
        title="Tradeoffs and rationale"
      >
        <EngineeringDecisions decisions={project.decisions} />
      </ProjectSection>

      <ProjectSection
        id="reliability"
        eyebrow="Reliability"
        title="Failure handling and controls"
      >
        <BulletList items={project.reliability} />
      </ProjectSection>

      <ProjectSection
        id="security"
        eyebrow="Security"
        title="Data protection posture"
      >
        <BulletList items={project.security} />
      </ProjectSection>

      <ProjectSection
        id="testing"
        eyebrow="Testing"
        title="Validation notes"
      >
        <BulletList items={project.testing} />
      </ProjectSection>

      <ProjectSection
        id="stack"
        eyebrow="Technology stack"
        title="Tools and systems"
      >
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={`${technology.category}-${technology.name}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium text-foreground/85"
            >
              {technology.name}
            </span>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection
        id="evidence"
        eyebrow="Evidence"
        title="Public proof handling"
      >
        <EvidenceGallery assets={project.evidence} />
      </ProjectSection>

      <ProjectSection
        id="status"
        eyebrow="Current status"
        title="Truthful public label"
      >
        <div className="space-y-5">
          <ProjectStatusPill
            status={project.status}
            label={project.statusLabel}
          />
          <p className="text-sm leading-7 text-foreground/85">
            This status is project-specific and should not be upgraded without
            matching public evidence.
          </p>
        </div>
      </ProjectSection>

      <ProjectSection
        id="remaining-work"
        eyebrow="Remaining work"
        title="What is still incomplete"
      >
        <BulletList
          items={
            project.remainingWork && project.remainingWork.length > 0
              ? project.remainingWork
              : ["No public remaining-work items are currently listed."]
          }
        />
      </ProjectSection>

      <section
        id="contact"
        aria-labelledby="project-contact-title"
        className="scroll-mt-24 border-b border-border/60 bg-panel py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              Contact CTA
            </p>
            <h2
              id="project-contact-title"
              className="mt-3 text-2xl font-semibold text-foreground"
            >
              Talk through a similar system.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              Bring a workflow, integration, or operational problem that needs
              clearer state, stronger validation, and accountable automation.
            </p>
            <a
              href="mailto:daniyalhaider784@gmail.com"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 py-3 text-xs font-semibold text-accent-foreground shadow-[0_12px_30px_rgba(227,165,72,0.22)] transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email Daniyal
            </a>
          </div>
        </div>
      </section>

      <ProjectNavigation previous={previous} next={next} />
    </main>
  );
}
