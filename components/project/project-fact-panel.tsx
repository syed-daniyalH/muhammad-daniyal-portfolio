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
          className="rounded-2xl border border-[#2D3748] bg-[#101724] p-5"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#6B7280]">
            {label}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#D1D5DB]">
            {value}
          </p>
        </div>
      ))}

      {project.confidentiality && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5 md:col-span-2">
          <div className="flex gap-3">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-amber-300"
            />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber-200">
                Confidentiality note
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-100/80">
                {project.confidentiality}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
