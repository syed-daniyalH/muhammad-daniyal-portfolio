import type { EngineeringDecision } from "@/types/portfolio";

export function EngineeringDecisions({
  decisions,
}: {
  decisions: readonly EngineeringDecision[];
}): React.JSX.Element {
  return (
    <div className="space-y-4">
      {decisions.map((decision) => (
        <article
          key={decision.decision}
          className="rounded-2xl border border-[#2D3748] bg-[#101724] p-5"
        >
          <h3 className="text-lg font-semibold text-[#F9FAFB]">
            {decision.decision}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#9CA3AF]">
            {decision.rationale}
          </p>
          <p className="mt-4 border-l border-[#06B6D4]/30 pl-4 text-sm leading-6 text-[#D1D5DB]">
            {decision.impact}
          </p>
        </article>
      ))}
    </div>
  );
}
