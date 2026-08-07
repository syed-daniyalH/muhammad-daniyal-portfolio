import type { EvidenceState, ProjectStatus } from "@/types/portfolio";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  "live-production":
    "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-200",
  "production-implementation-qa-baseline":
    "border-accent/25 bg-accent/[0.07] text-accent",
  "implemented-final-validation-pending":
    "border-caution/25 bg-caution/[0.07] text-caution",
  "advanced-prototype-production-hardening":
    "border-info/25 bg-info/[0.07] text-info",
  "delivered-audit-and-automation":
    "border-sky-400/25 bg-sky-400/[0.07] text-sky-200",
  "systems-lab":
    "border-slate-400/25 bg-slate-400/[0.07] text-slate-200",
};

const EVIDENCE_STYLES: Record<EvidenceState, string> = {
  "verified-public":
    "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-200",
  "sanitized-demonstration":
    "border-accent/25 bg-accent/[0.07] text-accent",
  "private-not-publishable":
    "border-caution/25 bg-caution/[0.07] text-caution",
  planned:
    "border-slate-400/25 bg-slate-400/[0.07] text-slate-200",
};

export function ProjectStatusPill({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}): React.JSX.Element {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {label}
    </span>
  );
}

export function EvidenceStatePill({
  state,
}: {
  state: EvidenceState;
}): React.JSX.Element {
  const label = state
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[9px] font-semibold ${EVIDENCE_STYLES[state]}`}
    >
      {label}
    </span>
  );
}
