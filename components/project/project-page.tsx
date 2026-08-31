import { Mail } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ArchitectureFlow } from "@/components/project/architecture-flow";
import { EngineeringDecisions } from "@/components/project/engineering-decisions";
import { EvidenceGallery } from "@/components/project/evidence-gallery";
import { ProjectFactPanel } from "@/components/project/project-fact-panel";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectNavigation } from "@/components/project/project-navigation";
import { BulletList, Spread } from "@/components/project/project-spread";
import { ProjectTableOfContents } from "@/components/project/project-toc";
import { TechStackGrid } from "@/components/project/tech-stack-grid";
import { WorkflowTimeline } from "@/components/project/workflow-timeline";
import { BRAND_NAME } from "@/lib/branding";
import type { PortfolioProject } from "@/types/portfolio";

export function ProjectPage({
  project,
  previous,
  next,
}: {
  project: PortfolioProject;
  previous: PortfolioProject | null;
  next: PortfolioProject | null;
}): React.JSX.Element {
  const renderableEvidence = project.evidence.filter(
    (asset) => Boolean(asset.src || asset.embedUrl || asset.externalUrl || asset.trace || asset.code),
  );

  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "challenge", label: "Challenge & role" },
    { id: "solution", label: "Solution & architecture" },
    { id: "workflow", label: "Workflow" },
    { id: "decisions", label: "Decisions" },
    { id: "rigor", label: "Engineering rigor" },
    {
      id: "evidence",
      label: renderableEvidence.length > 0 ? "Evidence & stack" : "Technology stack",
    },
  ] as const;

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <ProjectHero project={project} />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="lg:flex lg:items-start lg:gap-16">
          <ProjectTableOfContents items={tocItems} />

          <div className="min-w-0 flex-1">
            <Spread id="overview" eyebrow="Executive summary" title="What was built">
              <div className="space-y-7">
                <p className="max-w-3xl text-base leading-8 text-foreground/85">
                  {project.summary}
                </p>
                <ProjectFactPanel project={project} />
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid gap-3 md:grid-cols-2">
                    {project.metrics.map((metric) => (
                      <article key={metric.label} className="rounded-2xl border border-border bg-surface p-5">
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-subtle">
                          Metric source: {metric.state.replaceAll("-", " ")}
                        </p>
                        <strong className="mt-2 block text-2xl font-semibold text-foreground">
                          {metric.value}
                        </strong>
                        <p className="mt-2 text-sm font-medium text-accent">{metric.label}</p>
                        <p className="mt-2 text-xs leading-5 text-muted">{metric.source}</p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </Spread>

            <Spread id="challenge" eyebrow="Business challenge & ownership" title="The problem, and who owned it">
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-subtle">
                    Operational pain
                  </h3>
                  <div className="mt-4">
                    <BulletList items={project.challenge} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-subtle">
                    {BRAND_NAME}&apos;s role
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-foreground/85">{project.role}</p>
                  <div className="mt-4">
                    <BulletList items={project.responsibilities} />
                  </div>
                </div>
              </div>
            </Spread>

            <Spread id="solution" eyebrow="Technical solution" title="How the system responds">
              <div className="space-y-10">
                <BulletList items={project.solution} />
                <div>
                  <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-subtle">
                    System architecture
                  </p>
                  <ArchitectureFlow nodes={project.architecture} />
                </div>
              </div>
            </Spread>

            <Spread id="workflow" eyebrow="Core workflow" title="Operational sequence">
              <WorkflowTimeline steps={project.workflow} />
            </Spread>

            <Spread id="decisions" eyebrow="Engineering decisions" title="Tradeoffs and rationale">
              <EngineeringDecisions decisions={project.decisions} />
            </Spread>

            <Spread
              id="rigor"
              eyebrow="Engineering rigor"
              title="Reliability, security, and testing"
              description="Failure handling, data protection posture, and validation notes, side by side rather than repeated as separate pages."
            >
              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-subtle">
                    Reliability
                  </h3>
                  <div className="mt-4">
                    <BulletList items={project.reliability} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-subtle">
                    Security
                  </h3>
                  <div className="mt-4">
                    <BulletList items={project.security} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-subtle">
                    Testing
                  </h3>
                  <div className="mt-4">
                    <BulletList items={project.testing} />
                  </div>
                </div>
              </div>
            </Spread>

            <Spread
              id="evidence"
              eyebrow={renderableEvidence.length > 0 ? "Workflow evidence and stack" : "Technology stack"}
              title={renderableEvidence.length > 0 ? "Visual proof, then the stack behind it" : "Platforms and tools"}
              description={
                renderableEvidence.length > 0
                  ? "Sanitized workflow views paired with the core platforms and integrations used in the build."
                  : "The primary systems, frameworks, and integrations used in the build."
              }
            >
              {renderableEvidence.length > 0 ? (
                <div className="space-y-10">
                  <EvidenceGallery assets={renderableEvidence} />
                  <div className="border-t border-border/60 pt-10">
                    <TechStackGrid technologies={project.technologies} />
                  </div>
                </div>
              ) : (
                <TechStackGrid technologies={project.technologies} />
              )}
            </Spread>
          </div>
        </div>
      </div>

      <section
        id="contact"
        aria-labelledby="project-contact-title"
        className="scroll-mt-24 border-t border-border/60 bg-panel py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Contact
            </p>
            <h2 id="project-contact-title" className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              Talk through a similar system.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              Bring a workflow, integration, or operational problem that needs
              clearer state, stronger validation, and accountable automation.
            </p>
            <a
              href="mailto:daniyalhaider784@gmail.com"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email {BRAND_NAME}
            </a>
          </ScrollReveal>
        </div>
      </section>

      <ProjectNavigation previous={previous} next={next} />
    </main>
  );
}
