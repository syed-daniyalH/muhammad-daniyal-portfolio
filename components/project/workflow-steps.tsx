import type { WorkflowStep } from "@/types/portfolio";

export function WorkflowSteps({
  steps,
}: {
  steps: readonly WorkflowStep[];
}): React.JSX.Element {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="grid gap-4 rounded-2xl border border-[#2D3748] bg-[#101724] p-5 sm:grid-cols-[3rem_1fr]"
        >
          <span className="flex size-12 items-center justify-center rounded-xl border border-[#2D3748] bg-[#070A10] font-mono text-xs text-cyan-200">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-[#F9FAFB]">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
