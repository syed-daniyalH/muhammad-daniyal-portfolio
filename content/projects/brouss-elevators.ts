import type { PortfolioProject } from "@/types/portfolio";

export const broussElevators = {
  slug: "brouss-elevators",
  route: "/work/brouss-elevators",
  tier: "flagship",
  title: "Brouss Elevators Omnichannel AI Support",
  shortTitle: "Brouss Elevators",
  status: "implemented-final-validation-pending",
  statusLabel:
    "Live-tested chatbot and voice system; synchronization final validation pending",
  summary:
    "A bilingual support ecosystem combining GoHighLevel chatbot flows, Synthflow voice support, Dynamics 365/FIELDBOSS context, Power Automate synchronization, and emergency, service, FAQ, and returning-user workflows.",
  metaDescription:
    "Brouss Elevators case study covering bilingual chatbot and voice support, GoHighLevel, Synthflow, Dynamics 365, Power Automate, QA, and privacy controls.",
  businessValue:
    "The system creates a more consistent support intake layer across chat and voice while keeping critical routing and customer identity checks explicit.",
  role: "AI workflow and systems engineer responsible for conversational flow design, QA repair cycles, voice state modeling, synchronization planning, and privacy-risk review.",
  challenge: [
    "Support requests arrived through separate chat, voice, and operational systems.",
    "Emergency handling needed consistent classification and routing.",
    "Customer-facing statuses and operational statuses lived in different systems.",
    "Voice and chatbot behavior required repeated QA because small prompt and state changes could affect routing.",
    "Identity verification and privacy controls had to be handled before exposing customer-specific status.",
  ],
  responsibilities: [
    "Designed bilingual chatbot paths for emergency, service, FAQ, and returning-user requests.",
    "Modeled the Synthflow voice agent with 26 states, 32 transitions, and 50+ iteration versions.",
    "Drove QA remediation that improved a documented 20-case chatbot re-test from 5/20 to 20/20 after fixes.",
    "Designed and substantially implemented Power Automate synchronization patterns for operational records.",
  ],
  solution: [
    "Separate public intake behavior from private operational system synchronization.",
    "Use explicit identity-verification steps before returning sensitive status information.",
    "Route emergency and service paths through constrained conversational states.",
    "Keep final synchronization validation pending until end-to-end Dynamics/FIELDBOSS behavior is confirmed.",
  ],
  architecture: [
    {
      id: "chatbot",
      title: "GoHighLevel Chatbot",
      description:
        "Customer-facing chat handles FAQ, service requests, emergency triage, and returning-user paths.",
      technology: "GoHighLevel",
    },
    {
      id: "voice",
      title: "Synthflow Voice Agent",
      description:
        "Bilingual voice workflows use controlled states and transitions for intake and routing.",
      technology: "Synthflow",
    },
    {
      id: "sync",
      title: "Power Automate Layer",
      description:
        "Automation maps intake status to operational records with validation and update sequencing.",
      technology: "Power Automate",
    },
    {
      id: "operations",
      title: "Dynamics/FIELDBOSS Context",
      description:
        "Operational records remain the system of record for case and service status.",
      technology: "Dynamics 365 / FIELDBOSS",
    },
  ],
  workflow: [
    {
      id: "intake",
      title: "Classify request channel",
      description:
        "Chat and voice paths identify emergency, service, FAQ, or returning-user context.",
    },
    {
      id: "verify",
      title: "Verify identity and intent",
      description:
        "The system avoids exposing private operational status without appropriate verification.",
    },
    {
      id: "route",
      title: "Route to support outcome",
      description:
        "Emergency and service cases move through constrained paths for follow-up.",
    },
    {
      id: "sync",
      title: "Synchronize operational context",
      description:
        "Power Automate updates are validated before final end-to-end synchronization is represented as complete.",
    },
  ],
  decisions: [
    {
      decision: "Treat chat and voice as one support ecosystem.",
      rationale:
        "Customers can enter through different channels while expecting consistent support behavior.",
      impact:
        "Routing, status language, and escalation logic can be reviewed across channels.",
    },
    {
      decision: "Keep synchronization status explicitly pending.",
      rationale:
        "Power Automate was substantially implemented, but final end-to-end validation is still required.",
      impact:
        "The case study remains honest about implementation state.",
    },
    {
      decision: "Document privacy and match-quality risks.",
      rationale:
        "Phone normalization, ambiguous matches, stale updates, and out-of-order updates can affect support accuracy.",
      impact:
        "Operational risk is visible instead of hidden behind polished AI copy.",
    },
  ],
  reliability: [
    "Critical chatbot paths were re-tested after fixes and documented as 20/20 for that 20-case pass.",
    "Voice behavior went through multiple QA rounds across 50+ versions.",
    "Known risks include ambiguous matches, multiple-case overwrite, stale updates, and out-of-order updates.",
    "Final synchronization validation remains listed as pending until confirmed.",
  ],
  security: [
    "Identity verification is required before sensitive returning-user status responses.",
    "Public examples must avoid real names, addresses, phone numbers, and case identifiers.",
    "Operational records stay in Dynamics/FIELDBOSS rather than in public demo artifacts.",
    "Audio evidence requires approved anonymization before publication.",
  ],
  testing: [
    "Documented chatbot critical re-test improved from 5/20 to 20/20 after fixes.",
    "Voice agent QA covered 26 states, 32 transitions, and repeated version iterations.",
    "Power Automate synchronization requires final end-to-end validation before status is upgraded.",
  ],
  technologies: [
    { name: "GoHighLevel", category: "crm" },
    { name: "Synthflow", category: "voice" },
    { name: "Dynamics 365", category: "crm" },
    { name: "FIELDBOSS", category: "crm" },
    { name: "Power Automate", category: "automation" },
    { name: "Bilingual conversational AI", category: "ai" },
  ],
  evidence: [
    {
      id: "brouss-audio-placeholder",
      projectSlug: "brouss-elevators",
      type: "audio",
      title: "Synthetic bilingual voice placeholder",
      description:
        "A synthetic portfolio audio file demonstrates the WaveSurfer evidence player until an approved anonymized recording is supplied.",
      state: "sanitized-demonstration",
      src: "/media/brouss-synthflow-test-sanitized.wav",
      source: "Synthetic placeholder audio",
      caption:
        "Not a client recording. Replace only with approved anonymized audio.",
      confidentialityNote:
        "Do not publish real caller voice, names, phone numbers, addresses, or case identifiers without approval.",
    },
    {
      id: "brouss-chatbot-retest",
      projectSlug: "brouss-elevators",
      type: "document",
      title: "Chatbot critical re-test summary",
      description:
        "QA summary documents improvement from 5/20 to 20/20 after remediation for a defined critical test set.",
      state: "private-not-publishable",
      source: "Owner-provided QA summary",
      caption:
        "Private QA summary; public excerpt requires review and redaction.",
      confidentialityNote:
        "Remove any client-specific prompts, contacts, IDs, and operational details before publication.",
    },
  ],
  metrics: [
    {
      label: "Critical chatbot re-test",
      value: "20/20 after fixes",
      state: "owner-provided-qa-summary",
      source: "Owner-provided QA summary for a defined 20-case pass",
    },
  ],
  remainingWork: [
    "Complete final end-to-end synchronization validation.",
    "Attach sanitized chatbot screenshots and Power Automate flow evidence.",
    "Replace synthetic audio only after approval of an anonymized recording.",
  ],
  confidentiality:
    "All public Brouss evidence must remove customer identity, caller audio, phone numbers, service addresses, and case identifiers.",
} satisfies PortfolioProject;
