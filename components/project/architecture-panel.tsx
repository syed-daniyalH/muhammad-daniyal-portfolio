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
          className="rounded-2xl border border-[#2D3748] bg-[#101724] p-5"
        >
          <span className="font-mono text-[10px] text-cyan-300">
            STAGE {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-[#F9FAFB]">
            {node.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">
            {node.description}
          </p>
          {node.technology && (
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-indigo-300">
              {node.technology}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
