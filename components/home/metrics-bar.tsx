import { ShieldAlert } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

interface ReliabilityMetric {
  value: string;
  label: string;
  description: string;
}

const METRICS: readonly ReliabilityMetric[] = [
  {
    value: "Sub-200ms",
    label: "Time-to-first-token",
    description: "Instrumentation target for the initial streamed AI response.",
  },
  {
    value: "99.8%",
    label: "Bilingual parse accuracy",
    description: "Target structured-extraction accuracy across an approved test set.",
  },
  {
    value: "100%",
    label: "Duplicate suppression",
    description: "Target acceptance behavior for database-backed idempotent events.",
  },
  {
    value: "<1s",
    label: "Webhook acceptance",
    description: "Target duration for validation and durable event acceptance.",
  },
] as const;

export function MetricsBar(): React.JSX.Element {
  return (
    <section aria-labelledby="metrics-title" className="border-b border-border/60 bg-panel">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <ScrollReveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 id="metrics-title" className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
            Performance instrumentation targets
          </h2>
          <div className="flex max-w-md items-start gap-2 text-[11px] leading-4 text-caution/85">
            <ShieldAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-caution" />
            <p>These figures are targets, not verified production claims.</p>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <ScrollReveal
              key={metric.label}
              delay={index * 0.06}
              className={`relative pl-6 ${
                index > 0 ? "sm:border-l sm:border-border/70" : ""
              }`}
            >
              <strong className="block font-display text-4xl font-semibold tracking-normal text-foreground">
                {metric.value}
              </strong>
              <p className="mt-3 text-sm font-medium text-accent">{metric.label}</p>
              <p className="mt-2 text-xs leading-5 text-muted">{metric.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
