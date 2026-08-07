"use client";

import { useState } from "react";
import { Check, Copy, TerminalSquare } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language: "python" | "typescript" | "json" | "bash";
  filename: string;
  label?: string;
}

export function CodeBlock({
  code,
  language,
  filename,
  label = "Reference implementation",
}: CodeBlockProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyCode = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1_700);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      role="region"
      aria-label={`${filename} source code`}
      className="overflow-hidden rounded-2xl border border-border bg-console"
    >
      <header className="flex flex-col justify-between gap-4 border-b border-border bg-surface px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <TerminalSquare
            aria-hidden="true"
            className="size-4 text-accent"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {filename}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-info/20 bg-info/[0.06] px-3 py-1 text-[9px] text-info">
            {label}
          </span>

          <button
            type="button"
            onClick={copyCode}
            aria-label={`Copy ${filename}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-[10px] text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            {copied ? (
              <Check aria-hidden="true" className="size-3 text-emerald-300" />
            ) : (
              <Copy aria-hidden="true" className="size-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </header>

      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={language}
      >
        {({
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <pre
            className={`${className} max-h-[620px] overflow-auto p-5 font-mono text-xs leading-6`}
            style={{
              ...style,
              margin: 0,
              background: "#08080A",
            }}
          >
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })}>
                <span className="mr-5 inline-block w-6 select-none text-right text-slate-700">
                  {lineIndex + 1}
                </span>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </section>
  );
}
