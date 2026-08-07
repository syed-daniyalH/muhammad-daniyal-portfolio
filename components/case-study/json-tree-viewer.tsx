"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronRight, Copy } from "lucide-react";

interface JsonTreeViewerProps {
  value: unknown;
  label?: string;
  initiallyExpandedDepth?: number;
}

interface JsonTreeNodeProps {
  value: unknown;
  name?: string;
  depth: number;
  initiallyExpandedDepth: number;
}

function isJsonRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function primitiveColor(value: unknown): string {
  if (typeof value === "string") return "text-emerald-300";
  if (typeof value === "number") return "text-accent";
  if (typeof value === "boolean") return "text-caution";
  return "text-slate-500";
}

function PrimitiveValue({ value }: { value: unknown }): React.JSX.Element {
  const formattedValue =
    typeof value === "string" ? `"${value}"` : String(value);

  return <span className={primitiveColor(value)}>{formattedValue}</span>;
}

function JsonTreeNode({
  value,
  name,
  depth,
  initiallyExpandedDepth,
}: JsonTreeNodeProps): React.JSX.Element {
  const expandable = Array.isArray(value) || isJsonRecord(value);
  const [expanded, setExpanded] = useState(depth < initiallyExpandedDepth);

  if (!expandable) {
    return (
      <div
        className="flex min-w-max items-start font-mono text-xs leading-6"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {name !== undefined && (
          <>
            <span className="text-info">&quot;{name}&quot;</span>
            <span className="mr-2 text-slate-600">:</span>
          </>
        )}
        <PrimitiveValue value={value} />
      </div>
    );
  }

  const entries: Array<[string, unknown]> = Array.isArray(value)
    ? value.map((entry, index) => [String(index), entry])
    : Object.entries(value);

  const openingToken = Array.isArray(value) ? "[" : "{";
  const closingToken = Array.isArray(value) ? "]" : "}";

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        className="flex min-w-max items-center font-mono text-xs leading-6 text-slate-400 hover:text-foreground"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {expanded ? (
          <ChevronDown aria-hidden="true" className="mr-1 size-3" />
        ) : (
          <ChevronRight aria-hidden="true" className="mr-1 size-3" />
        )}

        {name !== undefined && (
          <>
            <span className="text-info">&quot;{name}&quot;</span>
            <span className="mr-2 text-slate-600">:</span>
          </>
        )}

        <span className="text-slate-500">{openingToken}</span>
        {!expanded && (
          <span className="ml-2 text-slate-600">
            {entries.length} {entries.length === 1 ? "item" : "items"}
          </span>
        )}
        {!expanded && <span className="ml-1 text-slate-500">{closingToken}</span>}
      </button>

      {expanded && (
        <>
          {entries.map(([entryName, entryValue]) => (
            <JsonTreeNode
              key={`${entryName}-${depth}`}
              name={Array.isArray(value) ? undefined : entryName}
              value={entryValue}
              depth={depth + 1}
              initiallyExpandedDepth={initiallyExpandedDepth}
            />
          ))}
          <div
            className="min-w-max font-mono text-xs leading-6 text-slate-500"
            style={{ paddingLeft: `${depth * 16 + 18}px` }}
          >
            {closingToken}
          </div>
        </>
      )}
    </div>
  );
}

export function JsonTreeViewer({
  value,
  label = "JSON trace",
  initiallyExpandedDepth = 2,
}: JsonTreeViewerProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const serializedValue = useMemo(
    () => JSON.stringify(value, null, 2),
    [value],
  );

  const copyJson = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(serializedValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1_700);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      role="region"
      aria-label={label}
      className="overflow-hidden rounded-2xl border border-border bg-console"
    >
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {label}
        </span>

        <button
          type="button"
          onClick={copyJson}
          aria-label={`Copy ${label}`}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-[10px] text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-3 text-emerald-300" />
          ) : (
            <Copy aria-hidden="true" className="size-3" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </header>

      <div className="max-h-[520px] overflow-auto p-5">
        <JsonTreeNode
          value={value}
          depth={0}
          initiallyExpandedDepth={initiallyExpandedDepth}
        />
      </div>
    </section>
  );
}
