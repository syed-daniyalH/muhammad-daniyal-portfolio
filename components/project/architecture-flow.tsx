import { ChevronRight } from "lucide-react";

import { TechVisualIcon } from "@/components/icons/tech-visual-icon";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { ArchitectureNode } from "@/types/portfolio";

export function ArchitectureFlow({
  nodes,
  dense = false,
}: {
  nodes: readonly ArchitectureNode[];
  /** Tighter spacing/typography for use inside homepage spotlights. */
  dense?: boolean;
}): React.JSX.Element {
  const cardWidthClass = dense
    ? "md:w-[220px] md:min-w-[220px]"
    : "md:w-[248px] md:min-w-[248px]";
  const cardHeightClass = dense ? "min-h-[208px]" : "min-h-[244px]";
  const paddingClass = dense ? "p-4" : "p-5 sm:p-6";

  return (
    <div className="-mx-1 overflow-x-visible px-1 md:overflow-x-auto md:pb-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0 md:w-max">
      {nodes.map((node, index) => (
        <div key={node.id} className="relative flex flex-col md:flex-row md:items-stretch md:shrink-0">
          <ScrollReveal
            delay={index * 0.06}
            className={`group flex h-full flex-col rounded-2xl border border-border bg-surface/90 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/40 ${
              paddingClass
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                <TechVisualIcon name={node.technology ?? node.title} className="size-4" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-subtle">
                STAGE {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div
              className={`flex flex-1 flex-col ${cardWidthClass} ${cardHeightClass}`}
            >
              <h4 className="mt-4 min-h-[3.5rem] text-sm font-semibold leading-6 text-foreground">
                {node.title}
              </h4>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                {node.description}
              </p>

              {node.technology && (
                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-info">
                  {node.technology}
                </p>
              )}
            </div>
          </ScrollReveal>

          {index < nodes.length - 1 && (
            <div
              aria-hidden="true"
              className="relative flex h-10 items-center justify-center md:h-auto md:w-12 md:shrink-0"
            >
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border md:left-0 md:top-1/2 md:h-px md:w-full md:-translate-y-1/2 md:translate-x-0" />
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 overflow-hidden md:left-0 md:top-1/2 md:h-px md:w-full md:-translate-y-1/2 md:translate-x-0">
                <span
                  className="architecture-connector-beam-y absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 md:hidden"
                  style={{ animationDelay: `${index * 140}ms` }}
                />
                <span
                  className="architecture-connector-beam-x absolute left-0 top-1/2 hidden h-px w-[4.5rem] -translate-y-1/2 md:block"
                  style={{ animationDelay: `${index * 140}ms` }}
                />
              </div>
              <span className="relative z-10 flex size-6 items-center justify-center rounded-full border border-border bg-background text-border-strong md:size-7">
                <ChevronRight className="size-3 rotate-90 md:rotate-0" />
              </span>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
