import type { ArchitectureNode } from "@/types/portfolio";

export function ArchitecturePanel({
  nodes,
}: {
  nodes: readonly ArchitectureNode[];
}): React.JSX.Element {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {nodes.map((node, index) => (
        <article
          key={node.id}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <span className="font-mono text-[10px] text-accent">
            STAGE {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-foreground">
            {node.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            {node.description}
          </p>
          {node.technology && (
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-info">
              {node.technology}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
