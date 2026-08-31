"use client";

import { motion } from "framer-motion";

import { StaggerGroup, staggerItemVariants } from "@/components/motion/scroll-reveal";
import type { WorkflowStep } from "@/types/portfolio";

export function WorkflowTimeline({
  steps,
}: {
  steps: readonly WorkflowStep[];
}): React.JSX.Element {
  return (
    <StaggerGroup className="relative space-y-9 border-l border-border/70 pl-8">
      {steps.map((step, index) => (
        <motion.div key={step.id} variants={staggerItemVariants} className="relative">
          <span className="absolute -left-[calc(2rem+5px)] top-1 flex size-2.5 items-center justify-center rounded-full bg-accent ring-4 ring-background" />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-subtle">
            Step {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{step.description}</p>
        </motion.div>
      ))}
    </StaggerGroup>
  );
}
