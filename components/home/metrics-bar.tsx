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
      className="border-b border-[#2D3748]/60 bg-[#0E1420]"
    >
      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300">
              System reliability indicators
            </p>
            <h2
              id="metrics-title"
              className="mt-1 text-sm font-semibold text-[#F9FAFB]"
            >
              Performance instrumentation targets
            </h2>
          </div>

          <div className="flex max-w-xl items-start gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] px-3 py-2">
            <ShieldAlert
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-amber-300"
            />
            <p className="text-[10px] leading-4 text-amber-100/75">
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
                className="group rounded-2xl border border-[#2D3748] bg-[#161E2E]/82 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#06B6D4]/35 hover:shadow-[0_18px_46px_rgba(6,182,212,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300 transition-colors group-hover:border-cyan-400/30 group-hover:text-cyan-200">
                    <Icon aria-hidden="true" className="size-4" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/15 bg-amber-400/[0.05] px-2.5 py-1 text-[9px] font-medium text-amber-200">
                    <ShieldAlert aria-hidden="true" className="size-3" />
                    Target
                  </span>
                </div>

                <strong className="mt-6 block text-2xl font-semibold tracking-tight text-[#F9FAFB]">
                  {metric.value}
                </strong>
                <h3 className="mt-2 text-sm font-medium text-cyan-200">
                  {metric.label}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#9CA3AF]">
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
