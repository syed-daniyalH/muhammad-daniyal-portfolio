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
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <h3 className="text-lg font-semibold text-foreground">
            {decision.decision}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            {decision.rationale}
          </p>
          <p className="mt-4 border-l border-accent/30 pl-4 text-sm leading-6 text-foreground/85">
            {decision.impact}
          </p>
        </article>
      ))}
    </div>
  );
}
