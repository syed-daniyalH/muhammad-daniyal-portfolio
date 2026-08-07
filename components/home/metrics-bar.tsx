import type { ComponentType } from "react";
import { Activity, Clock3, DatabaseZap, Gauge, ShieldAlert } from "lucide-react";

interface ReliabilityMetric {
  value: string;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const METRICS: readonly ReliabilityMetric[] = [
  {
    value: "Sub-200ms",
    label: "Time-To-First-Token",
    description: "Instrumentation target for the initial streamed AI response.",
    icon: Gauge,
  },
  {
    value: "99.8%",
    label: "Bilingual Parse Accuracy",
    description:
      "Target structured-extraction accuracy across an approved test set.",
    icon: Activity,
  },
  {
    value: "100%",
    label: "Duplicate Suppression",
    description:
      "Target acceptance behavior for database-backed idempotent events.",
    icon: DatabaseZap,
  },
  {
    value: "<1s",
    label: "Webhook Acceptance",
    description:
      "Target duration for validation and durable event acceptance.",
    icon: Clock3,
  },
] as const;

export function MetricsBar(): React.JSX.Element {
  return (
    <section
      aria-labelledby="metrics-title"
      className="border-b border-border/60 bg-panel"
    >
      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              System reliability indicators
            </p>
            <h2
              id="metrics-title"
              className="mt-1 text-sm font-semibold text-foreground"
            >
              Performance instrumentation targets
            </h2>
          </div>

          <div className="flex max-w-xl items-start gap-2 rounded-xl border border-caution/15 bg-caution/[0.05] px-3 py-2">
            <ShieldAlert
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-caution"
            />
            <p className="text-[10px] leading-4 text-caution/85">
              These figures are targets, not verified production claims. Mark
              them verified only after attaching repeatable monitoring evidence.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="group rounded-2xl border border-border bg-surface/82 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_18px_46px_rgba(227,165,72,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-info/20 bg-info/10 text-info transition-colors group-hover:border-accent/30 group-hover:text-accent">
                    <Icon aria-hidden="true" className="size-4" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-caution/15 bg-caution/[0.05] px-2.5 py-1 text-[9px] font-medium text-caution">
                    <ShieldAlert aria-hidden="true" className="size-3" />
                    Target
                  </span>
                </div>

                <strong className="mt-6 block text-2xl font-semibold tracking-tight text-foreground">
                  {metric.value}
                </strong>
                <h3 className="mt-2 text-sm font-medium text-accent">
                  {metric.label}
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {metric.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
