"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Clipboard,
  LoaderCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

type LogLevel =
  | "system"
  | "security"
  | "processing"
  | "success"
  | "error";

interface TerminalLog {
  id: number;
  level: LogLevel;
  message: string;
}

interface SandboxResponse {
  ok: true;
  mode: "sanitized_simulation";
  request_id: string;
  security: {
    hmac_sha256: "verified";
    idempotency_metadata: "valid";
    persistent_execution: false;
  };
  dispatch: {
    language: "en" | "fr" | "mixed";
    intent: string;
    customer_type: string;
    dealership_code: string;
    service_code: string;
    confidence: number;
    human_review_required: boolean;
  };
  response: {
    status: number;
    message: string;
  };
}

const LOG_COLOR: Record<LogLevel, string> = {
  system: "text-slate-400",
  security: "text-accent",
  processing: "text-info",
  success: "text-emerald-300",
  error: "text-red-300",
};

function sleep(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

function isSandboxResponse(
  value: unknown,
): value is SandboxResponse {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<SandboxResponse>;

  return (
    candidate.ok === true &&
    candidate.mode === "sanitized_simulation" &&
    typeof candidate.request_id === "string" &&
    typeof candidate.dispatch === "object" &&
    candidate.dispatch !== null &&
    typeof candidate.response === "object" &&
    candidate.response !== null
  );
}

function JsonPrimitive({ value }: { value: string }): React.JSX.Element {
  if (value.startsWith('"')) {
    return <span className="text-emerald-300">{value}</span>;
  }

  if (value === "true" || value === "false" || value === "null") {
    return <span className="text-caution">{value}</span>;
  }

  if (/^-?\d+(?:\.\d+)?[,]?$/.test(value)) {
    return <span className="text-accent">{value}</span>;
  }

  return <span className="text-slate-300">{value}</span>;
}

function JsonSyntaxViewer({
  value,
}: {
  value: unknown;
}): React.JSX.Element {
  const json = JSON.stringify(value, null, 2);
  const lines = json.split("\n");

  return (
    <pre
      aria-label="Formatted webhook response payload"
      className="overflow-x-auto p-5 font-mono text-xs leading-6 text-slate-300"
    >
      {lines.map((line, index) => {
        const keyMatch = /^(\s*)("[^"]+")(:\s)(.*)$/.exec(line);

        if (!keyMatch) {
          return (
            <div key={`${line}-${index}`}>
              <span className="text-slate-500">{line}</span>
            </div>
          );
        }

        const indentation = keyMatch[1] ?? "";
        const key = keyMatch[2] ?? "";
        const separator = keyMatch[3] ?? "";
        const primitive = keyMatch[4] ?? "";

        return (
          <div key={`${key}-${index}`}>
            <span>{indentation}</span>
            <span className="text-info">{key}</span>
            <span className="text-slate-500">{separator}</span>
            <JsonPrimitive value={primitive} />
          </div>
        );
      })}
    </pre>
  );
}

export function TerminalWidget(): React.JSX.Element {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [output, setOutput] = useState<SandboxResponse | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runSequenceRef = useRef(0);
  const logIdRef = useRef(0);

  useEffect(() => {
    return () => {
      runSequenceRef.current += 1;
    };
  }, []);

  const appendLog = (level: LogLevel, message: string): void => {
    logIdRef.current += 1;

    setLogs((current) => [
      ...current,
      {
        id: logIdRef.current,
        level,
        message,
      },
    ]);
  };

  const resetTerminal = (): void => {
    runSequenceRef.current += 1;
    setRunning(false);
    setLogs([]);
    setOutput(null);
    setCopied(false);
  };

  const triggerWebhook = async (): Promise<void> => {
    if (running) return;

    const sequence = runSequenceRef.current + 1;
    runSequenceRef.current = sequence;

    setRunning(true);
    setLogs([]);
    setOutput(null);
    setCopied(false);

    const payload = {
      idempotency_key: crypto.randomUUID(),
      source_system: "portfolio_sandbox",
      timestamp: new Date().toISOString(),
      message:
        "Bonjour, we need a vehicle diagnostic service for dealership DEMO-204.",
    };

    const requestPromise = fetch("/api/sandbox/dispatch", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Portfolio-Sandbox": "dispatch-demo-v1",
      },
      body: JSON.stringify(payload),
    });

    try {
      appendLog("system", "Webhook event received from portfolio sandbox.");
      await sleep(480);
      if (runSequenceRef.current !== sequence) return;

      appendLog("security", "Verifying HMAC SHA-256 signature...");
      await sleep(620);
      if (runSequenceRef.current !== sequence) return;

      appendLog(
        "security",
        "Checking idempotency key and replay window...",
      );
      await sleep(560);
      if (runSequenceRef.current !== sequence) return;

      appendLog("processing", "Detecting bilingual request context...");
      await sleep(520);

      appendLog(
        "processing",
        "Extracting dispatch entities into validated schema...",
      );

      const response = await requestPromise;
      const result: unknown = await response.json();

      if (!response.ok || !isSandboxResponse(result)) {
        throw new Error(
          "The sandbox endpoint returned an invalid response.",
        );
      }

      if (runSequenceRef.current !== sequence) return;

      await sleep(480);
      appendLog(
        "processing",
        "Applying human-review routing policy...",
      );

      await sleep(500);
      appendLog(
        "success",
        `Status ${result.response.status} OK - sanitized dispatch payload produced.`,
      );

      setOutput(result);
    } catch (error: unknown) {
      if (runSequenceRef.current !== sequence) return;

      appendLog(
        "error",
        error instanceof Error
          ? error.message
          : "The webhook simulation failed.",
      );
    } finally {
      if (runSequenceRef.current === sequence) {
        setRunning(false);
      }
    }
  };

  const copyOutput = async (): Promise<void> => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(
        JSON.stringify(output, null, 2),
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1_800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      role="region"
      aria-labelledby="dispatch-terminal-title"
      className="overflow-hidden rounded-3xl border border-border bg-console shadow-[0_32px_90px_rgba(0,0,0,0.42)]"
    >
      <header className="flex flex-col gap-4 border-b border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-caution" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-2">
            <Terminal aria-hidden="true" className="size-4 text-accent" />
            <h2
              id="dispatch-terminal-title"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-300"
            >
              Bilingual AI Dispatch Execution Terminal
            </h2>
          </div>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1.5">
          <ShieldCheck
            aria-hidden="true"
            className="size-3.5 text-accent"
          />
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent">
            Sanitized Simulation
          </span>
        </div>
      </header>

      <div className="grid min-h-[570px] lg:grid-cols-2">
        <div className="flex min-h-[360px] flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div
            aria-live="polite"
            aria-label="Webhook execution logs"
            className="flex-1 space-y-3 overflow-y-auto p-5 font-mono text-xs leading-6 sm:p-7"
          >
            {logs.length === 0 && (
              <div className="space-y-2 text-slate-600">
                <p>
                  <span className="mr-2 text-accent">&gt;</span>
                  Terminal ready.
                </p>
                <p>
                  <span className="mr-2 text-accent">&gt;</span>
                  Trigger a sanitized webhook event to inspect the pipeline.
                </p>
              </div>
            )}

            <AnimatePresence initial={false}>
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className={LOG_COLOR[log.level]}
                >
                  <span className="mr-3 text-slate-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mr-2 text-info">&gt;</span>
                  {log.message}
                </motion.div>
              ))}
            </AnimatePresence>

            {running && (
              <div className="flex items-center gap-2 text-slate-500">
                <LoaderCircle
                  aria-hidden="true"
                  className="size-3.5 animate-spin text-accent"
                />
                Executing controlled pipeline...
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-border bg-surface p-4 sm:flex-row">
            <button
              type="button"
              onClick={triggerWebhook}
              disabled={running}
              aria-label="Trigger a simulated bilingual webhook event"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-xs font-semibold text-accent-foreground shadow-[0_12px_30px_rgba(227,165,72,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {running ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />
              ) : (
                <Zap aria-hidden="true" className="size-4" />
              )}

              {running ? "Executing Event" : "Trigger Webhook Event"}
            </button>

            <button
              type="button"
              onClick={resetTerminal}
              disabled={running}
              aria-label="Reset webhook terminal"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex min-h-[360px] flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                Structured response
              </p>
              <p className="mt-1 text-sm font-medium text-slate-300">
                Validated JSON output
              </p>
            </div>

            <button
              type="button"
              onClick={copyOutput}
              disabled={!output}
              aria-label="Copy JSON response to clipboard"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-[10px] font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? (
                <Check
                  aria-hidden="true"
                  className="size-3.5 text-emerald-300"
                />
              ) : (
                <Clipboard aria-hidden="true" className="size-3.5" />
              )}

              {copied ? "Copied" : "Copy JSON"}
            </button>
          </div>

          <div className="flex-1 overflow-auto bg-console">
            {output ? (
              <JsonSyntaxViewer value={output} />
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center px-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-surface text-slate-600">
                  <Play aria-hidden="true" className="size-5" />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-400">
                  Awaiting execution
                </p>
                <p className="mt-2 max-w-xs text-xs leading-5 text-slate-600">
                  The response payload will appear here after server-side
                  validation completes.
                </p>
              </div>
            )}
          </div>

          {output && (
            <div className="flex items-center gap-2 border-t border-border bg-surface px-5 py-3">
              <CheckCircle2
                aria-hidden="true"
                className="size-4 text-emerald-300"
              />
              <span className="text-xs text-slate-400">
                Response validated with no production data exposed.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
