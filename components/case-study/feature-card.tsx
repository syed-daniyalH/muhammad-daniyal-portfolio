"use client";

import type { ComponentType } from "react";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import {
  Activity,
  AudioLines,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  FileJson2,
  MessageSquareText,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  siFastapi,
  siMake,
  siNeon,
  siQuickbooks,
  type SimpleIcon,
} from "simple-icons";

import { AudioWaveform } from "@/components/case-study/audio-waveform";
import { JsonTreeViewer } from "@/components/case-study/json-tree-viewer";
import { CodeBlock } from "@/components/code/code-block";
import { BrandIcon } from "@/components/icons/brand-icon";

type CaseStudyTab =
  | "architecture"
  | "audio"
  | "trace"
  | "backend";

interface BaseArchitectureNode {
  id: string;
  label: string;
  description: string;
  displayColor?: string;
}

type ArchitectureNode =
  | (BaseArchitectureNode & {
      icon: SimpleIcon;
      iconKind: "brand";
    })
  | (BaseArchitectureNode & {
      icon: LucideIcon;
      iconKind: "lucide";
    });

interface TranscriptEntry {
  time: string;
  speaker: "Caller" | "Agent" | "Tool";
  text: string;
  status?: "neutral" | "success" | "warning";
}

const ARCHITECTURE_NODES: readonly ArchitectureNode[] = [
  {
    id: "twilio",
    label: "Twilio",
    description: "Inbound bilingual message",
    icon: MessageSquareText,
    iconKind: "lucide",
    displayColor: "#F5F5F3",
  },
  {
    id: "make",
    label: "Make.com",
    description: "Validation and routing",
    icon: siMake,
    iconKind: "brand",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    description: "Typed service boundary",
    icon: siFastapi,
    iconKind: "brand",
  },
  {
    id: "neon",
    label: "Neon DB",
    description: "Transactional event state",
    icon: siNeon,
    iconKind: "brand",
  },
  {
    id: "quickbooks",
    label: "QuickBooks",
    description: "Approved accounting sync",
    icon: siQuickbooks,
    iconKind: "brand",
  },
] as const;

const TRANSCRIPT: readonly TranscriptEntry[] = [
  {
    time: "00:02",
    speaker: "Caller",
    text: "Bonjour, I need to cancel the service visit scheduled for tomorrow.",
  },
  {
    time: "00:05",
    speaker: "Agent",
    text: "I can help with that. May I confirm the dealership code and callback number?",
  },
  {
    time: "00:09",
    speaker: "Tool",
    text: "language_detected=mixed | intent=appointment_cancellation",
    status: "success",
  },
  {
    time: "00:12",
    speaker: "Caller",
    text: "The dealership code is DEMO-204.",
  },
  {
    time: "00:15",
    speaker: "Tool",
    text: "idempotency_key verified; active service appointment found.",
    status: "success",
  },
  {
    time: "00:18",
    speaker: "Agent",
    text: "I found the appointment. I prepared the cancellation for staff confirmation.",
  },
  {
    time: "00:22",
    speaker: "Tool",
    text: "human_review_required=true | workflow_status=pending_confirmation",
    status: "warning",
  },
] as const;

const SANITIZED_TRACE = {
  trace_type: "portfolio_sandbox",
  evidence_status: "illustrative_trace_format_not_production_measurement",
  request: {
    source_system: "twilio_demo",
    event_type: "message.received",
    language: "mixed",
    idempotency_key: "SM00000000000000000000000000000000",
    idempotency_verified: true,
  },
  model: {
    provider: "OpenAI",
    task: "structured_dispatch_extraction",
    prompt_version: "dispatch-extractor-v4",
    temperature: 0,
  },
  performance: {
    ttft_ms: 180,
    measurement_scope: "sandbox_target",
    production_evidence_attached: false,
  },
  extraction: {
    intent: "appointment_cancellation",
    confidence: 0.982,
    dealership_code: "DEMO-204",
    language: "mixed",
    human_review_required: true,
  },
  tool_calls: [
    {
      name: "find_active_appointment",
      status: "completed",
      result_count: 1,
    },
    {
      name: "prepare_cancellation",
      status: "pending_human_confirmation",
    },
  ],
  security: {
    hmac_sha256: "verified",
    replay_window: "valid",
    duplicate_execution: "not_detected",
  },
};

const FASTAPI_CODE = `from __future__ import annotations

import hashlib
import hmac
from datetime import datetime
from typing import Annotated

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.services.events import accept_dispatch_event

app = FastAPI(title="Secure Dispatch API")


class DispatchWebhook(BaseModel):
    model_config = ConfigDict(extra="forbid")

    idempotency_key: str = Field(min_length=10, max_length=128)
    source_system: str = Field(pattern=r"^[a-z0-9._-]{2,64}$")
    timestamp: datetime
    message: str = Field(min_length=1, max_length=2_000)


def verify_signature(
    payload: bytes,
    signature: str,
    secret: bytes,
) -> bool:
    normalized = signature.removeprefix("sha256=")

    expected = hmac.new(
        secret,
        payload,
        hashlib.sha256,
    ).hexdigest()

    return hmac.compare_digest(expected, normalized)


@app.post("/webhooks/dispatch", status_code=202)
async def receive_dispatch_webhook(
    request: Request,
    signature: Annotated[
        str,
        Header(alias="X-Webhook-Signature"),
    ],
    session: Annotated[
        AsyncSession,
        Depends(get_session),
    ],
) -> dict[str, str]:
    raw_payload = await request.body()

    if not verify_signature(
        raw_payload,
        signature,
        request.app.state.webhook_secret,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid webhook signature",
        )

    payload = DispatchWebhook.model_validate_json(raw_payload)

    event_id = await accept_dispatch_event(
        session=session,
        payload=payload,
    )

    await session.commit()

    return {
        "status": "accepted",
        "event_id": str(event_id),
    }`;

const TAB_ITEMS: readonly {
  value: CaseStudyTab;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { value: "architecture", label: "Architecture Flow", icon: Network },
  { value: "audio", label: "Live Voice Recording", icon: AudioLines },
  { value: "trace", label: "Verified LLM Trace", icon: FileJson2 },
  { value: "backend", label: "Secure Backend Code", icon: Code2 },
] as const;

function ArchitectureFlow(): React.JSX.Element {
  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-border bg-console p-5 sm:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,165,72,0.08),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(124,147,173,0.08),transparent_38%)]"
      />

      <div className="relative">
        <div className="flex flex-col justify-between gap-4 border-b border-border/80 pb-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              Operational event lifecycle
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              Message to approved accounting record
            </h3>
          </div>

          <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-medium text-emerald-300">
            Human approval retained
          </span>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5 lg:items-center">
          {ARCHITECTURE_NODES.map((node, index) => {
            const color =
              node.displayColor ??
              (node.iconKind === "brand" ? `#${node.icon.hex}` : "#E3A548");

            return (
              <div key={node.id} className="relative flex items-center gap-4 lg:block">
                <motion.article
                  whileHover={{ y: -5, scale: 1.025 }}
                  className="group relative z-10 flex-1 rounded-2xl border border-border bg-surface/92 p-4 transition-[border-color,box-shadow] hover:border-accent/40 hover:shadow-[0_18px_44px_rgba(227,165,72,0.09)] lg:min-h-44"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-background">
                    {node.iconKind === "brand" ? (
                      <BrandIcon
                        icon={node.icon}
                        label={`${node.label} logo`}
                        color={color}
                        className="size-5"
                      />
                    ) : (
                      (() => {
                        const Icon = node.icon;

                        return (
                          <Icon
                            aria-hidden="true"
                            className="size-5"
                            style={{ color }}
                          />
                        );
                      })()
                    )}
                  </div>

                  <span className="mt-5 block font-mono text-[9px] text-muted-subtle">
                    STAGE 0{index + 1}
                  </span>
                  <h4 className="mt-1 text-sm font-semibold text-foreground">
                    {node.label}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    {node.description}
                  </p>
                </motion.article>

                {index < ARCHITECTURE_NODES.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-accent lg:absolute lg:-right-6 lg:top-1/2 lg:z-20 lg:-translate-y-1/2"
                  >
                    <ChevronRight className="size-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Signed event boundary",
              description: "Payload integrity is checked before parsing.",
            },
            {
              icon: Database,
              title: "Atomic state transition",
              description: "Database uniqueness protects duplicate execution.",
            },
            {
              icon: CheckCircle2,
              title: "Controlled accounting sync",
              description: "QuickBooks receives approved records only.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border/80 bg-surface/55 p-4"
            >
              <Icon aria-hidden="true" className="size-4 text-accent" />
              <h4 className="mt-3 text-xs font-semibold text-foreground">
                {title}
              </h4>
              <p className="mt-1 text-[10px] leading-4 text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TranscriptPanel(): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-console">
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageSquareText
            aria-hidden="true"
            className="size-4 text-accent"
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            Synchronized transcript
          </span>
        </div>

        <span className="flex items-center gap-2 text-[10px] text-emerald-300">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-400" />
          Synthetic QA session
        </span>
      </header>

      <div className="max-h-[420px] space-y-3 overflow-y-auto p-4">
        {TRANSCRIPT.map((entry) => {
          const isTool = entry.speaker === "Tool";

          return (
            <div
              key={`${entry.time}-${entry.text}`}
              className={`rounded-xl border p-3 ${
                isTool
                  ? "border-accent/15 bg-accent/[0.04]"
                  : "border-border/80 bg-surface/55"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`text-[10px] font-semibold ${
                    entry.speaker === "Agent"
                      ? "text-info"
                      : entry.speaker === "Caller"
                        ? "text-foreground"
                        : "text-accent"
                  }`}
                >
                  {entry.speaker}
                </span>
                <span className="font-mono text-[9px] text-muted-subtle">
                  {entry.time}
                </span>
              </div>

              <p
                className={`mt-2 text-xs leading-5 ${
                  isTool
                    ? "font-mono text-muted"
                    : "text-foreground/85"
                }`}
              >
                {entry.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VoiceRecordingTab(): React.JSX.Element {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
      <AudioWaveform />
      <TranscriptPanel />
    </div>
  );
}

export function FeatureCard(): React.JSX.Element {
  const [activeTab, setActiveTab] =
    useState<CaseStudyTab>("architecture");

  return (
    <section
      id="case-study"
      aria-labelledby="case-study-title"
      className="scroll-mt-24 border-b border-border/60 bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1.5">
              <Workflow aria-hidden="true" className="size-3 text-accent" />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-accent">
                Featured operational platform
              </span>
            </div>

            <h2
              id="case-study-title"
              className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
            >
              Bilingual AI Dispatch &amp; Operations Platform
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
              A full-stack operational system connecting bilingual customer
              messaging, structured AI extraction, typed backend services,
              transactional event storage, human review, and approved
              accounting synchronization.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Event-driven",
              "HMAC verified",
              "Idempotent",
              "Human-in-the-loop",
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium text-foreground/85"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface/82 shadow-[0_34px_90px_rgba(0,0,0,0.32)]">
          <div className="flex flex-col justify-between gap-5 border-b border-border/80 p-6 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Activity aria-hidden="true" className="size-4 text-emerald-300" />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-300">
                  Deployment architecture
                </span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-foreground">
                Multi-asset engineering evidence
              </h3>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.85)]"
              />
              <span className="text-[10px] font-medium text-emerald-300">
                Sanitized client-style platform
              </span>
            </div>
          </div>

          <Tabs.Root
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as CaseStudyTab)}
          >
            <Tabs.List
              aria-label="Case study evidence"
              className="grid border-b border-border/80 bg-background/55 sm:grid-cols-2 xl:grid-cols-4"
            >
              {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
                <Tabs.Trigger
                  key={value}
                  value={value}
                  className="relative flex min-h-14 items-center justify-center gap-2 border-b border-border/60 px-4 text-xs font-medium text-muted transition-colors hover:bg-surface/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent data-[state=active]:bg-surface data-[state=active]:text-accent sm:border-r xl:border-b-0"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {label}

                  {activeTab === value && (
                    <motion.span
                      layoutId="case-study-active-tab"
                      className="absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-accent-soft to-accent-strong"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="p-5 sm:p-6">
              <Tabs.Content value="architecture">
                <ArchitectureFlow />
              </Tabs.Content>

              <Tabs.Content value="audio">
                <VoiceRecordingTab />
              </Tabs.Content>

              <Tabs.Content value="trace">
                <div className="space-y-4">
                  <div className="rounded-xl border border-caution/15 bg-caution/[0.05] px-4 py-3">
                    <p className="text-xs leading-5 text-caution/85">
                      This is a sanitized trace-format demonstration. The 180ms
                      TTFT value is an instrumentation target until supported
                      by production monitoring.
                    </p>
                  </div>

                  <JsonTreeViewer
                    value={SANITIZED_TRACE}
                    label="Sanitized LLM execution trace"
                    initiallyExpandedDepth={3}
                  />
                </div>
              </Tabs.Content>

              <Tabs.Content value="backend">
                <CodeBlock
                  code={FASTAPI_CODE}
                  language="python"
                  filename="secure_dispatch_route.py"
                />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </section>
  );
}
