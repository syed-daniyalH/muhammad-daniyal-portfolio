import type { PortfolioProject } from "@/types/portfolio";

export const dispatchAlex = {
  slug: "dispatch-alex",
  route: "/work/dispatch-alex",
  tier: "flagship",
  title: "Dispatch Alex",
  shortTitle: "Dispatch Alex",
  status: "live-production",
  statusLabel: "Live Production Client Platform",
  summary:
    "A bilingual field-service dispatch platform that turns inbound SMS into reviewed jobs, technician assignments, technician execution, invoice approval, and QuickBooks synchronization.",
  metaDescription:
    "Dispatch Alex case study covering bilingual SMS dispatch, FastAPI, React, PostgreSQL, Twilio, Make.com, QuickBooks, idempotency, and human review.",
  businessValue:
    "The platform gives field-service teams a shared lifecycle from unstructured request intake to controlled accounting handoff.",
  role: "Full-stack and automation engineer responsible for frontend workflows, backend API boundaries, event modeling, idempotency, orchestration, and security hardening.",
  challenge: [
    "Unstructured SMS messages needed to become structured jobs without losing operational nuance.",
    "Dispatchers and technicians needed a shared job lifecycle across review, assignment, execution, and invoicing.",
    "Accounting synchronization required explicit approval before QuickBooks writes.",
    "AI extraction, polling limits, duplicate events, and low-confidence parsing created reliability risk.",
  ],
  responsibilities: [
    "Built React and TypeScript operator surfaces for dispatch and technician workflows.",
    "Designed FastAPI service boundaries and PostgreSQL-backed job state.",
    "Integrated Twilio intake, Make.com orchestration, and QuickBooks handoff patterns.",
    "Implemented idempotency and validation controls for webhook-style event handling.",
  ],
  solution: [
    "Route inbound SMS through AI-assisted parsing with human review for uncertain cases.",
    "Represent jobs as stateful records with technician assignment, execution, and invoice approval stages.",
    "Use explicit approval before accounting sync to prevent premature financial writes.",
    "Validate inbound payloads and suppress duplicate source events before downstream processing.",
  ],
  architecture: [
    {
      id: "sms",
      title: "Inbound SMS",
      description:
        "Customer and dealership messages enter through a messaging provider boundary.",
      technology: "Twilio",
    },
    {
      id: "orchestration",
      title: "AI-Assisted Parsing",
      description:
        "Orchestration turns message content into structured dispatch metadata.",
      technology: "Make.com",
    },
    {
      id: "api",
      title: "Typed Service Boundary",
      description:
        "Backend endpoints validate payloads, state transitions, and idempotency metadata.",
      technology: "FastAPI",
    },
    {
      id: "operations",
      title: "Dispatch and Technician UI",
      description:
        "React views coordinate review, assignment, field execution, and invoice approval.",
      technology: "React + TypeScript",
    },
    {
      id: "accounting",
      title: "Approved Accounting Sync",
      description:
        "QuickBooks receives approved invoice records rather than raw AI output.",
      technology: "QuickBooks",
    },
  ],
  workflow: [
    {
      id: "receive",
      title: "Receive bilingual request",
      description:
        "Inbound SMS is captured with source metadata and routed to parsing.",
    },
    {
      id: "review",
      title: "Review extracted job",
      description:
        "Low-confidence or incomplete extraction remains visible for administrative review.",
    },
    {
      id: "assign",
      title: "Assign technician",
      description:
        "Dispatch creates a shared job record with technician-facing execution context.",
    },
    {
      id: "approve",
      title: "Approve invoice",
      description:
        "Completed work moves to invoice review before QuickBooks synchronization.",
    },
  ],
  decisions: [
    {
      decision: "Keep AI extraction behind human review.",
      rationale:
        "Operational SMS can be ambiguous, bilingual, incomplete, or urgent.",
      impact:
        "The system improves intake speed while preserving accountable dispatch decisions.",
    },
    {
      decision: "Use idempotency before durable job writes.",
      rationale:
        "Webhook retries and polling behavior can replay the same business event.",
      impact:
        "Duplicate job creation risk is reduced at the source boundary.",
    },
    {
      decision: "Require invoice approval before QuickBooks sync.",
      rationale:
        "Accounting systems should not trust raw automation output.",
      impact:
        "Financial records remain controlled by an explicit review step.",
    },
  ],
  reliability: [
    "Idempotency metadata protects duplicate source events.",
    "Low-confidence extraction routes to review instead of silent automation.",
    "Stateful job records make technician and admin views consistent.",
    "Polling throughput and retry behavior are treated as known operational constraints.",
  ],
  security: [
    "Webhook examples use raw-body HMAC verification before JSON parsing.",
    "Secrets remain server-side and are not exposed to browser code.",
    "Authentication hardening is called out as an implementation concern.",
    "Safe JSON handling and schema validation protect backend route boundaries.",
  ],
  testing: [
    "Webhook signature verification is covered by utility and route-level tests.",
    "Idempotency metadata validation covers UUIDs, timestamps, and source system format.",
    "Sandbox route exercises the dispatch event lifecycle without production writes.",
  ],
  technologies: [
    { name: "React", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "FastAPI", category: "backend" },
    { name: "PostgreSQL", category: "database" },
    { name: "Twilio", category: "voice" },
    { name: "Make.com", category: "automation" },
    { name: "QuickBooks", category: "crm" },
  ],
  evidence: [
    {
      id: "dispatch-sandbox",
      projectSlug: "dispatch-alex",
      type: "trace",
      title: "Sanitized dispatch execution trace",
      description:
        "The portfolio sandbox demonstrates HMAC verification, idempotency validation, structured extraction, and controlled routing.",
      state: "sanitized-demonstration",
      source: "Local portfolio sandbox",
      caption:
        "Demonstration only; it does not write production customer data.",
      confidentialityNote:
        "Payloads are synthetic and must not include real customer names, phone numbers, or addresses.",
      trace: {
        mode: "sanitized_simulation",
        source_system: "portfolio_sandbox",
        security: {
          hmac_sha256: "verified",
          idempotency_metadata: "valid",
          persistent_execution: false,
        },
        dispatch: {
          language: "mixed",
          intent: "service_request",
          customer_type: "dealership",
          human_review_required: true,
        },
      },
    },
    {
      id: "dispatch-code",
      projectSlug: "dispatch-alex",
      type: "code",
      title: "Secure webhook reference code",
      description:
        "Reference implementation shows raw-body signature validation before parsing.",
      state: "sanitized-demonstration",
      source: "Portfolio source code",
      caption:
        "Suitable for Make.com and custom raw-body HMAC integrations, not standard Twilio callback validation.",
      confidentialityNote:
        "No webhook secrets or private URLs are embedded.",
      code: {
        filename: "dispatch-webhook-route.ts",
        language: "typescript",
        label: "Sanitized route boundary",
        body: `const rawPayload = await request.text();
const signature = request.headers.get("x-webhook-signature");

if (!signature) {
  return errorResponse(requestId, 401, "missing_signature");
}

if (!verifyWebhookSignature(rawPayload, signature, webhookSecret)) {
  return errorResponse(requestId, 401, "invalid_signature");
}

const parsedPayload = JSON.parse(rawPayload);
const idempotency = validateIdempotencyPayload(parsedPayload);

if (!idempotency.success) {
  return errorResponse(
    requestId,
    422,
    "invalid_idempotency_metadata",
  );
}`,
      },
    },
  ],
  remainingWork: [
    "Attach sanitized screenshots from the production client platform.",
    "Connect live persistence evidence when a Neon connection string is available.",
    "Document current authentication posture after the deployment environment is confirmed.",
  ],
  confidentiality:
    "Public examples must remain synthetic or anonymized because the live system handles operational client data.",
} satisfies PortfolioProject;
