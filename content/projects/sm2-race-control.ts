import type { PortfolioProject } from "@/types/portfolio";

export const sm2RaceControl = {
  slug: "sm2-race-control",
  route: "/work/sm2-race-control",
  tier: "flagship",
  title: "SM-2 Race Control",
  shortTitle: "SM-2",
  status: "production-implementation-qa-baseline",
  statusLabel: "Production Implementation + QA Baseline",
  summary:
    "An event-first motorsport operations and session-intelligence platform for drivers, vehicles, run groups, schedules, generated sessions, setup records, voice capture, OCR capture, media, historical comparisons, and reporting.",
  metaDescription:
    "SM-2 Race Control case study covering motorsport operations, canonical session records, historical setup context, voice/OCR capture, tenant isolation, and QA controls.",
  businessValue:
    "SM-2 gives teams a dependable operating record across a race weekend, reducing scattered notes and preserving setup context for later analysis.",
  role: "Principal full-stack builder across product modeling, application architecture, data design, workflow design, and QA planning.",
  challenge: [
    "Race-weekend information lived across notes, media, schedules, and memory instead of one operational record.",
    "Historical setup context could be overwritten or reconstructed incorrectly after a session.",
    "Driver, vehicle, and run-group context needed guardrails to prevent cross-assignment mistakes.",
    "Voice, OCR, and media inputs were disconnected from reporting and later comparison.",
  ],
  responsibilities: [
    "Modeled the canonical event, session, driver, vehicle, setup, media, and historical snapshot entities.",
    "Designed the setup carry-forward and historical comparison flows.",
    "Specified context mismatch protection for driver, vehicle, run group, and event state.",
    "Built the QA baseline structure covering 75 validation cases without claiming universal pass status.",
  ],
  solution: [
    "Centralize each race weekend around immutable session records and durable setup snapshots.",
    "Attach voice, OCR, and media capture to the same session context used for reporting.",
    "Preserve historical setup records before edits so comparisons remain explainable.",
    "Expose role-aware operational views for event staff and technical users.",
  ],
  architecture: [
    {
      id: "event",
      title: "Event Workspace",
      description:
        "The event owns schedules, run groups, drivers, vehicles, and generated sessions.",
      technology: "Next.js App Router",
    },
    {
      id: "session",
      title: "Canonical Session Record",
      description:
        "Session state binds setup notes, telemetry-adjacent context, media, voice, OCR, and review status.",
      technology: "PostgreSQL",
    },
    {
      id: "capture",
      title: "Voice, OCR, and Media Capture",
      description:
        "Input channels append evidence to the session without replacing historical setup data.",
      technology: "AI-assisted capture",
    },
    {
      id: "history",
      title: "Historical Snapshot Layer",
      description:
        "Setup changes create compare-ready records so weekend decisions can be reviewed later.",
      technology: "Immutable snapshots",
    },
    {
      id: "reporting",
      title: "Reporting Surface",
      description:
        "Operational reports summarize session history, setup changes, and comparison context.",
      technology: "Server-rendered dashboard",
    },
  ],
  workflow: [
    {
      id: "schedule",
      title: "Create event schedule",
      description:
        "Define run groups, vehicles, drivers, and generated sessions for the weekend.",
    },
    {
      id: "capture",
      title: "Capture session evidence",
      description:
        "Attach voice notes, OCR extracts, media, and setup records to the active session.",
    },
    {
      id: "validate",
      title: "Validate context",
      description:
        "Check driver, vehicle, run group, and event context before accepting setup changes.",
    },
    {
      id: "compare",
      title: "Compare against history",
      description:
        "Review current setup choices against prior snapshots and session outcomes.",
    },
  ],
  decisions: [
    {
      decision: "Use session records as the system boundary.",
      rationale:
        "Race operations are time-bound, context-heavy, and prone to accidental mixing.",
      impact:
        "Every capture and report can be traced back to a specific driver, vehicle, run group, and event.",
    },
    {
      decision: "Preserve setup history instead of mutating the only record.",
      rationale:
        "Teams need to understand what changed, when it changed, and why.",
      impact:
        "Historical comparisons stay reliable even when current setup notes evolve.",
    },
    {
      decision: "Keep QA as a baseline, not a blanket production claim.",
      rationale:
        "A 75-case plan shows coverage without overstating pass evidence.",
      impact:
        "The public case study remains credible and reviewable.",
    },
  ],
  reliability: [
    "Context mismatch checks protect driver, vehicle, run group, and event associations.",
    "Historical snapshots preserve setup carry-forward and comparison context.",
    "Validation cases cover core scheduling, session generation, capture, and reporting paths.",
    "Evidence remains tied to session identifiers rather than free-floating notes.",
  ],
  security: [
    "Tenant isolation is treated as a first-class data boundary.",
    "Role isolation limits operational views and edit privileges by user type.",
    "Public artifacts must use sanitized screenshots and examples only.",
    "No customer identifiers, event credentials, or private media should be published.",
  ],
  testing: [
    "75-case QA baseline defined for event creation, session generation, setup carry-forward, media capture, and reporting.",
    "Manual review planned for context mismatch protection and historical snapshot behavior.",
    "Public status avoids saying every QA case passed until the evidence is attached.",
  ],
  technologies: [
    { name: "Next.js", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "PostgreSQL", category: "database" },
    { name: "Voice capture", category: "ai" },
    { name: "OCR capture", category: "ai" },
    { name: "Role-based access", category: "security" },
  ],
  evidence: [
    {
      id: "sm2-architecture",
      projectSlug: "sm2-race-control",
      type: "diagram",
      title: "Event-to-session architecture",
      description:
        "Public diagram planned for the event, session, capture, snapshot, and reporting flow.",
      state: "planned",
      caption: "Diagram target: event workspace to immutable session history.",
      confidentialityNote:
        "Use anonymized drivers, vehicles, run groups, and event names.",
    },
    {
      id: "sm2-qa-plan",
      projectSlug: "sm2-race-control",
      type: "document",
      title: "75-case QA baseline",
      description:
        "QA-plan excerpts can be published after removing private event and vehicle details.",
      state: "private-not-publishable",
      source: "Owner-provided QA planning notes",
      caption: "Private QA artifact; public excerpts require sanitization.",
      confidentialityNote:
        "Do not publish raw event data, vehicle identifiers, or team notes.",
    },
  ],
  remainingWork: [
    "Attach sanitized platform screenshots.",
    "Publish a redacted QA excerpt only after review.",
    "Add approved setup-history example data.",
  ],
  confidentiality:
    "Public evidence must use synthetic or anonymized event, driver, vehicle, and setup data.",
} satisfies PortfolioProject;
