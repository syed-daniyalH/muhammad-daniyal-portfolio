import { TechVisualIcon } from "@/components/icons/tech-visual-icon";
import type { TechnologyRef } from "@/types/portfolio";

const CATEGORY_LABELS: Record<TechnologyRef["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Data",
  automation: "Automation",
  ai: "AI",
  voice: "Voice",
  crm: "CRM",
  infrastructure: "Infrastructure",
  security: "Security",
  testing: "Testing",
};

export function TechStackGrid({
  technologies,
}: {
  technologies: readonly TechnologyRef[];
}): React.JSX.Element {
  const groups = new Map<TechnologyRef["category"], TechnologyRef[]>();

  technologies.forEach((technology) => {
    const existing = groups.get(technology.category) ?? [];
    existing.push(technology);
    groups.set(technology.category, existing);
  });

  return (
    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from(groups.entries()).map(([category, items]) => (
        <div key={category}>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-subtle">
            {CATEGORY_LABELS[category]}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((technology) => (
              <span
                key={technology.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium text-foreground/85"
              >
                <TechVisualIcon name={technology.name} className="size-4" />
                {technology.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
