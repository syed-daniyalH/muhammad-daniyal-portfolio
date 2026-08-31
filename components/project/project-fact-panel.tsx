import type { PortfolioProject } from "@/types/portfolio";

export function ProjectFactPanel({
  project,
}: {
  project: PortfolioProject;
}): React.JSX.Element {
  const facts = [
    ["Project type", project.tier.replace("-", " ")],
    [
      "Core stack",
      project.technologies
        .slice(0, 4)
        .map((technology) => technology.name)
        .join(", "),
    ],
    ["Role", project.role],
    ["Workflow stages", String(project.workflow.length)],
  ] as const;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {facts.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-subtle">
            {label}
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground/85">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
