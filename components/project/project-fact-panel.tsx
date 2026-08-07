import { ShieldCheck } from "lucide-react";

import type { PortfolioProject } from "@/types/portfolio";

export function ProjectFactPanel({
  project,
}: {
  project: PortfolioProject;
}): React.JSX.Element {
  const facts = [
    ["Project type", project.tier.replace("-", " ")],
    ["Public status", project.statusLabel],
    ["Role", project.role],
    ["Evidence items", String(project.evidence.length)],
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

      {project.confidentiality && (
        <div className="rounded-2xl border border-caution/20 bg-caution/[0.05] p-5 md:col-span-2">
          <div className="flex gap-3">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-caution"
            />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-caution">
                Confidentiality note
              </p>
              <p className="mt-2 text-sm leading-6 text-caution/90">
                {project.confidentiality}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
