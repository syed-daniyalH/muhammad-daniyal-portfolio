import type { PortfolioProject } from "@/types/portfolio";

export const venaiConsultationAutomation = {
  slug: "venai-consultation-automation",
  route: "/work/venai-consultation-automation",
  tier: "supporting",
  title: "VenAI Consultation Lifecycle Automation",
  shortTitle: "VenAI",
  status: "implemented-final-validation-pending",
  statusLabel: "Implemented and Configured - Final Live Validation Pending",
  summary:
    "A consultation lifecycle automation connecting Amy voice agent, Cal.com, n8n, and GoHighLevel across booking confirmation, rescheduling, and cancellation workflows.",
  metaDescription:
    "VenAI case study covering voice AI, Cal.com, n8n, GoHighLevel, booking lifecycle automation, idempotency, event ordering, and final validation.",
  businessValue:
    "The system reduces manual follow-up across appointment changes while keeping booking state and CRM status aligned.",
  role: "Automation engineer responsible for booking lifecycle design, webhook safeguards, n8n workflow configuration, and CRM status mapping.",
  challenge: [
    "Consultation bookings, reschedules, and cancellations needed consistent CRM updates.",
    "Voice-agent activity and scheduling events could trigger duplicate or stale downstream actions.",
    "Missing contacts and hardcoded IDs created operational fragility.",
  ],
  responsibilities: [
    "Mapped the booking confirmation, reschedule, and cancellation lifecycle.",
    "Configured n8n orchestration between Amy voice agent, Cal.com, and GoHighLevel.",
    "Specified idempotency, signature validation, event ordering, and stale cancellation checks.",
    "Identified hardcoded ID removal and alerting as hardening work.",
  ],
  solution: [
    "Use webhook metadata and lifecycle state to decide whether an event should update CRM records.",
    "Separate new booking, reschedule, and cancellation logic into reviewable workflow branches.",
    "Route missing-contact and duplicate-trigger situations to explicit handling paths.",
  ],
  architecture: [
    {
      id: "voice",
      title: "Amy Voice Agent",
      description:
        "Captures consultation intent and sends lifecycle events into automation.",
      technology: "Voice AI",
    },
    {
      id: "calendar",
      title: "Cal.com",
      description:
        "Provides booking, reschedule, and cancellation events.",
      technology: "Cal.com",
    },
    {
      id: "orchestration",
      title: "n8n Workflow Layer",
      description:
        "Coordinates validation, routing, CRM updates, and error branches.",
      technology: "n8n",
    },
    {
      id: "crm",
      title: "GoHighLevel",
      description:
        "Stores lead and consultation lifecycle status for follow-up.",
      technology: "GoHighLevel",
    },
  ],
  workflow: [
    {
      id: "booking",
      title: "Confirm booking",
      description:
        "New bookings update CRM state and confirmation messaging.",
    },
    {
      id: "reschedule",
      title: "Process reschedule",
      description:
        "Changed appointment times update the existing consultation lifecycle.",
    },
    {
      id: "cancel",
      title: "Protect cancellation flow",
      description:
        "Stale cancellation and duplicate trigger risks are handled before updating CRM state.",
    },
  ],
  decisions: [
    {
      decision: "Treat scheduling events as ordered lifecycle updates.",
      rationale:
        "Calendar systems can emit retries and changes that arrive out of sequence.",
      impact:
        "CRM status updates are easier to reason about and safer to validate.",
    },
    {
      decision: "Make missing-contact handling explicit.",
      rationale:
        "Automation should not silently create incorrect CRM records.",
      impact:
        "Operational exceptions can route to alerts or manual review.",
    },
  ],
  reliability: [
    "Idempotency is required for duplicate booking and cancellation triggers.",
    "Webhook signature validation is part of the hardening plan.",
    "Event ordering protects stale cancellation and reschedule behavior.",
    "Alerts are planned for missing contacts and workflow failures.",
  ],
  security: [
    "Calendar and CRM credentials must stay outside browser code and public assets.",
    "Webhook validation is required before trusting external lifecycle events.",
    "Public screenshots must remove lead names, emails, and phone numbers.",
  ],
  testing: [
    "Booking, reschedule, and cancellation paths require final live validation.",
    "Duplicate trigger and missing-contact branches are identified as regression scenarios.",
    "Hardcoded ID removal must be verified before production confidence is increased.",
  ],
  technologies: [
    { name: "Amy voice agent", category: "voice" },
    { name: "Cal.com", category: "automation" },
    { name: "n8n", category: "automation" },
    { name: "GoHighLevel", category: "crm" },
    { name: "Webhook validation", category: "security" },
  ],
  evidence: [
    {
      id: "venai-lifecycle-map",
      projectSlug: "venai-consultation-automation",
      type: "diagram",
      title: "Booking lifecycle map",
      description:
        "Workflow diagram planned for confirmation, reschedule, cancellation, and CRM state progression.",
      state: "planned",
      caption:
        "Diagram target: Amy voice agent to Cal.com to n8n to GoHighLevel.",
      confidentialityNote:
        "Use synthetic contacts and appointment records.",
    },
  ],
  remainingWork: [
    "Complete final live validation.",
    "Remove hardcoded IDs where they remain.",
    "Attach sanitized n8n workflow screenshots and CRM status examples.",
  ],
  confidentiality:
    "Public evidence must not expose lead PII, calendar links, webhook URLs, or CRM account details.",
} satisfies PortfolioProject;
