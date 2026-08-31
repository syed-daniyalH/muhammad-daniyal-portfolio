import type { PortfolioProject } from "@/types/portfolio";

export const sm2RaceControl = {
  slug: "sm2-race-control",
  route: "/case-studies/sm2-race-control",
  tier: "flagship",
  title: "SM2 Racing",
  shortTitle: "SM2 Racing",
  status: "live-production",
  statusLabel: "Live Production Client Platform",
  summary:
    "A live production motorsport operations platform that organizes events, generated sessions, driver notes, voice transcription, OCR intake, historical setup comparison, and admin review inside one event-first system.",
  metaDescription:
    "SM2 Racing case study covering Next.js, FastAPI, PostgreSQL, OpenAI transcription, Make.com OCR intake, role-based access, session history, and production QA release coverage.",
  websiteUrl: "https://sm2racing.app/login",
  websiteLabel: "Open live platform",
  repoUrl: "https://github.com/syed-daniyalH/SM-Racing",
  repoLabel: "GitHub repository",
  businessValue:
    "SM2 Racing gives race teams one reliable event-to-session record across a race weekend, so setup changes, voice notes, OCR sheets, review history, and exports stay attached to the right driver, vehicle, and session.",
  role: "Full-stack engineer responsible for the event-first product architecture, Next.js and FastAPI implementation, session data workflows, OpenAI voice and Make.com OCR integration design, and production QA release planning.",
  challenge: [
    "Race-weekend information needed to move out of scattered notes and spreadsheets into one operational event and session record.",
    "Quick notes, detailed setup data, voice transcripts, OCR sheets, photos, and admin review all had to converge on the same session context.",
    "Historical carry-forward and comparison needed to preserve prior session values instead of silently overwriting them.",
    "The live release needed strong role isolation, retry safety, and a concrete QA baseline across deployment, integrations, and race-weekend workflows.",
  ],
  responsibilities: [
    "Modeled the event, participant, session, submission, and historical comparison structure that anchors the product.",
    "Built the driver and admin workflows for session entry, review, exports, and context-aware history.",
    "Designed the OpenAI transcription and Make.com OCR intake paths so structured submissions land in the correct session.",
    "Produced the production QA baseline, smoke tests, and regression checks used to validate release readiness.",
  ],
  solution: [
    "Use an event-first data model where every generated session becomes the anchor for notes, setup data, voice/OCR intake, files, and later review.",
    "Keep Owner/Admin and Driver experiences separate while the backend owns permissions, context validation, and persistence.",
    "Stage OCR submissions for review and merge instead of letting external automation write directly into live session records without a checkpoint.",
    "Preserve carry-forward and historical snapshots so teams can compare sessions and explain setup changes across a weekend.",
  ],
  architecture: [
    {
      id: "event",
      title: "Event Workspace",
      description:
        "The event is the operational parent for drivers, vehicles, run groups, schedules, and generated sessions.",
      technology: "Next.js App Router",
    },
    {
      id: "session",
      title: "Session Data Core",
      description:
        "Session records hold setup data, notes, files, and the context used by every capture and review flow.",
      technology: "FastAPI + PostgreSQL",
    },
    {
      id: "voice",
      title: "Voice Transcription Path",
      description:
        "Recorded session notes are transcribed, edited, saved, and finalized against the same selected session.",
      technology: "OpenAI Transcriptions",
    },
    {
      id: "ocr",
      title: "OCR Intake and Review",
      description:
        "Image submissions move through Make.com, create staged OCR records, and are reviewed before merge into session data.",
      technology: "Make.com",
    },
    {
      id: "history",
      title: "Carry-Forward and History",
      description:
        "Setup values can be compared across sessions without losing the prior state that teams need for later review.",
      technology: "Historical snapshots",
    },
    {
      id: "review",
      title: "Admin Review and Export",
      description:
        "Owners can inspect submissions, compare sessions, filter by context, and export weekend data from one review surface.",
      technology: "Admin dashboards",
    },
  ],
  workflow: [
    {
      id: "event",
      title: "Create or open the event",
      description:
        "Owner or admin users open the weekend event and organize drivers, vehicles, run groups, and baseline data.",
    },
    {
      id: "session",
      title: "Generate and select sessions",
      description:
        "The system creates or uses the correct session so every later note and submission lands in the right context.",
    },
    {
      id: "capture",
      title: "Capture session data",
      description:
        "Drivers add quick notes, detailed setup values, tires, pressures, temperatures, comments, and files during the session workflow.",
    },
    {
      id: "inputs",
      title: "Process voice and OCR inputs",
      description:
        "Voice recordings are transcribed and OCR images are parsed into structured drafts tied to the same event and session.",
    },
    {
      id: "review",
      title: "Review and apply staged records",
      description:
        "Admins review transcripts or OCR drafts, correct mismatches, and merge approved values into the intended session once.",
    },
    {
      id: "compare",
      title: "Compare, report, and export",
      description:
        "Weekend data stays available for historical comparison, review filters, reporting, and export after the session closes.",
    },
  ],
  decisions: [
    {
      decision: "Make the event the operational parent.",
      rationale:
        "Drivers, vehicles, sessions, submissions, and review all depend on the same weekend context.",
      impact:
        "The system can keep race data grouped correctly instead of forcing staff to reconstruct context from isolated records.",
    },
    {
      decision: "Unify quick, detailed, voice, OCR, and media inputs under the same session record.",
      rationale:
        "Teams should not have to chase separate notes and attachments to understand one session.",
      impact:
        "Every input path contributes to the same reviewable history rather than becoming a detached side channel.",
    },
    {
      decision: "Stage OCR before apply.",
      rationale:
        "Handwritten or image-derived data can be ambiguous and sometimes conflicts with the selected driver or session.",
      impact:
        "Mismatch handling stays explicit, and approved values update the live session only after review.",
    },
    {
      decision: "Gate release with a 75-case QA baseline plus production smoke checks.",
      rationale:
        "A live race-weekend platform needs stronger proof than visual UI review or isolated happy-path tests.",
      impact:
        "Deployment health, permissions, integrations, persistence, and regression risks are validated against a repeatable test surface.",
    },
  ],
  reliability: [
    "Every create and update path is validated for persistence after refresh or relogin, not just a success toast.",
    "Voice and OCR retries are treated as idempotent so repeated callbacks do not duplicate session updates.",
    "OCR intake creates staged reviewable records instead of silently mutating session data.",
    "Carry-forward and historical comparison preserve prior session values for later review.",
  ],
  security: [
    "Owner/Admin and Driver roles are validated server-side, with direct-access checks against other tenant, driver, and session records.",
    "OpenAI keys, webhook secrets, JWT configuration, and database credentials stay server-side and out of public evidence.",
    "The OCR intake route is protected by a shared webhook secret and an expected backend contract.",
    "Admin AI assistant access is constrained to authorized admin surfaces and real backend data.",
  ],
  testing: [
    "A 75-case release baseline covers event setup, schedule generation, driver workflows, session entry, history, review, authorization, and known regressions.",
    "Production smoke checks include https://sm2racing.app, /api/v1/health, login durability, VPS service checks, and Nginx/TLS validation.",
    "Voice QA verifies recording, OpenAI transcription, edit/save/finalize, and controlled retry without duplicate jobs.",
    "OCR QA verifies Make.com delivery to /api/v1/submissions/ocr-intake, staged review visibility, mismatch handling, and successful merge into the selected session.",
  ],
  technologies: [
    { name: "Next.js", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "FastAPI", category: "backend" },
    { name: "PostgreSQL", category: "database" },
    { name: "Make.com", category: "automation" },
    { name: "OpenAI Transcriptions", category: "ai" },
    { name: "OCR Intake", category: "ai" },
    { name: "JWT", category: "security" },
    { name: "Nginx", category: "infrastructure" },
    { name: "Role-Based Access", category: "security" },
  ],
  evidence: [
    {
      id: "sm2-main-scenario",
      projectSlug: "sm2-race-control",
      type: "image",
      title: "SM2 Racing multi-route automation flow",
      description:
        "The supplied SM2 Racing scenario shows three input routes for raw text, structured intake, and OCR enrichment before data is written into session, pressures, alignment, suspension, tire, and track records.",
      state: "verified-public",
      src: "/media/sm2-race-control/sm2-racing-make-scenario.png",
      alt: "A Make.com scenario for SM2 Racing showing multiple routes for text and OCR processing into motorsport session records.",
      width: 1280,
      height: 904,
      caption:
        "Public screenshot of the implementation flow with routing, driver lookup, ID and date generation, and downstream racing data writes.",
    },
    {
      id: "sm2-ocr-intake",
      projectSlug: "sm2-race-control",
      type: "image",
      title: "Dedicated OCR intake scenario",
      description:
        "A separate OCR scenario parses the webhook payload, sets submission context, calls the OCR HTTP step, parses the result, and posts the structured payload into the backend intake route.",
      state: "verified-public",
      src: "/media/sm2-race-control/sm2-racing-ocr-intake.png",
      alt: "A short Make.com OCR flow for SM2 Racing that parses a webhook payload, calls an OCR HTTP step, and posts the result to the backend.",
      width: 1280,
      height: 898,
      caption:
        "This public view isolates the OCR path that prepares structured intake data before backend submission.",
    },
    {
      id: "sm2-production-qa-plan",
      projectSlug: "sm2-race-control",
      type: "document",
      title: "Production implementation and QA test plan",
      description:
        "The attached July 24, 2026 QA baseline documents the live production URL, key routes, OCR intake contract, OpenAI voice verification, release gates, and the 75-case acceptance matrix.",
      state: "private-not-publishable",
      source: "Production Implementation and Complete QA Test Plan",
      caption:
        "Used as the source for the published live-platform, workflow, and validation notes.",
    },
  ],
  confidentiality:
    "Public examples should avoid exposing live credentials, webhook secrets, private race data, and any tenant-specific operational records.",
} satisfies PortfolioProject;

