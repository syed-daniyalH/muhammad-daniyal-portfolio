import { TechBadge } from "@/components/icons/tech-badge";
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
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {CATEGORY_LABELS[category]}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((technology) => (
              <TechBadge
                key={technology.name}
                name={technology.name}
                size="sm"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
