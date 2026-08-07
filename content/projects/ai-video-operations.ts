import type { PortfolioProject } from "@/types/portfolio";

export const aiVideoOperations = {
  slug: "ai-video-operations",
  route: "/work/ai-video-operations",
  tier: "supporting",
  title: "AI Video Content Operations System",
  shortTitle: "AI Video Ops",
  status: "advanced-prototype-production-hardening",
  statusLabel: "Advanced Prototype / Production Hardening",
  summary:
    "A multi-stage content operations system for AI-assisted titles, script generation, compliance checks, word-count validation, duration validation, HeyGen generation, credit checking, polling, media download, LinkedIn upload, and Instagram publishing.",
  metaDescription:
    "AI Video Operations case study covering OpenAI, HeyGen, n8n, LinkedIn, Instagram, compliance checks, polling, credit validation, and human approval.",
  businessValue:
    "The system explores how content teams can coordinate AI generation, approval, and publishing without pretending automation removes editorial accountability.",
  role: "Workflow architect and automation engineer responsible for generation orchestration, platform-specific publishing flow design, reliability controls, and hardening checklist.",
  challenge: [
    "Video content workflows required many dependent steps before publishing.",
    "Credits, generation status, platform upload requirements, and approval state could fail independently.",
    "Automated publishing needed duplicate-post prevention, news grounding, and human approval.",
  ],
  responsibilities: [
    "Designed a 45-node LinkedIn workflow and a 27-node Instagram workflow.",
    "Mapped generation, compliance, polling, download, and publishing stages.",
    "Specified retry logic, credit validation, idempotency, alerts, and duplicate-post prevention.",
    "Kept the system framed as an advanced prototype until production hardening is complete.",
  ],
  solution: [
    "Break the pipeline into generation, validation, human approval, and platform publishing stages.",
    "Gate publishing behind compliance checks, word-count/duration validation, and approval.",
    "Track provider status and credits before requesting expensive generation work.",
  ],
  architecture: [
    {
      id: "brief",
      title: "Content Brief",
      description:
        "Input topic, audience, and grounding requirements become the workflow starting point.",
      technology: "n8n",
    },
    {
      id: "generation",
      title: "Title and Script Generation",
      description:
        "AI-assisted copy is generated with length, tone, and compliance constraints.",
      technology: "OpenAI",
    },
    {
      id: "video",
      title: "Video Generation",
      description:
        "HeyGen requests are checked against credits and polled until media is available.",
      technology: "HeyGen",
    },
    {
      id: "approval",
      title: "Human Approval",
      description:
        "Publishing waits for review instead of posting raw generated material.",
      technology: "Approval gate",
    },
    {
      id: "distribution",
      title: "Platform Publishing",
      description:
        "Approved media moves through LinkedIn native upload or Instagram publishing paths.",
      technology: "LinkedIn + Instagram",
    },
  ],
  workflow: [
    {
      id: "draft",
      title: "Draft content package",
      description:
        "Generate title and script candidates from a grounded content brief.",
    },
    {
      id: "validate",
      title: "Validate compliance and duration",
      description:
        "Check word count, expected duration, policy notes, and readiness for generation.",
    },
    {
      id: "generate",
      title: "Generate and poll video",
      description:
        "Check provider credits, submit HeyGen job, and poll for output media.",
    },
    {
      id: "publish",
      title: "Approve and publish",
      description:
        "Prevent duplicate posts and route approved media to platform-specific publishing.",
    },
  ],
  decisions: [
    {
      decision: "Keep human approval in the publishing path.",
      rationale:
        "AI-generated content can be factually wrong, stale, off-brand, or noncompliant.",
      impact:
        "The system accelerates operations while preserving editorial accountability.",
    },
    {
      decision: "Check credits before generation.",
      rationale:
        "External generation services can fail due to account state before any media job starts.",
      impact:
        "Failures are caught earlier and can produce clearer alerts.",
    },
    {
      decision: "Separate LinkedIn and Instagram workflows.",
      rationale:
        "Each platform has different media and publishing constraints.",
      impact:
        "Hardening can happen per platform without confusing operational states.",
    },
  ],
  reliability: [
    "Retry logic is required around generation and media retrieval.",
    "Polling status controls prevent assuming media is ready before provider confirmation.",
    "Idempotency and duplicate-post prevention are required before production use.",
    "Alerts are part of the hardening checklist for failed provider or platform steps.",
  ],
  security: [
    "Platform tokens and provider credentials must remain outside the browser and public repository.",
    "News-grounded content requires source review before publication.",
    "Human approval protects against unsafe or inaccurate automated posts.",
  ],
  testing: [
    "LinkedIn and Instagram workflow canvases require redacted review before publication.",
    "Generation, polling, credit validation, approval, and duplicate-post prevention need production hardening tests.",
    "Compliance and duration checks are part of the pre-publish validation plan.",
  ],
  technologies: [
    { name: "OpenAI", category: "ai" },
    { name: "HeyGen", category: "ai" },
    { name: "n8n", category: "automation" },
    { name: "LinkedIn API", category: "automation" },
    { name: "Instagram publishing", category: "automation" },
    { name: "Human approval", category: "testing" },
  ],
  evidence: [
    {
      id: "video-workflow-canvas",
      projectSlug: "ai-video-operations",
      type: "image",
      title: "Workflow canvas screenshots",
      description:
        "Sanitized node screenshots are planned for the LinkedIn and Instagram workflow canvases.",
      state: "planned",
      caption:
        "Evidence target: generation-to-publish architecture with private tokens removed.",
      confidentialityNote:
        "Remove API keys, platform account IDs, webhook URLs, and unpublished content.",
    },
  ],
  remainingWork: [
    "Complete production hardening around retries, idempotency, and duplicate-post prevention.",
    "Attach sanitized workflow screenshots.",
    "Document approval and alerting behavior with synthetic examples.",
  ],
  confidentiality:
    "Public evidence must not expose social account tokens, unpublished media, client campaigns, or private provider identifiers.",
} satisfies PortfolioProject;
