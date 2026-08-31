import type { PortfolioProject } from "@/types/portfolio";

export const broussElevators = {
  slug: "brouss-elevators",
  route: "/case-studies/brouss-elevators",
  tier: "flagship",
  title: "Brouss Elevators GHL Chatbot & Dynamics 365 Integration",
  shortTitle: "Brouss Chatbot",
  categoryLabel: "BROUSS ELEVATORS · CRM & AI INTAKE",
  status: "implemented-final-validation-pending",
  statusLabel: "Client Implementation",
  summary:
    "A bilingual GoHighLevel intake and support system that classifies service requests, routes emergency entrapment cases, and synchronizes customer data with Microsoft Dynamics 365 via validated webhooks.",
  metaDescription:
    "Brouss GHL Chatbot case study covering GoHighLevel Conversation AI, GPT-4.1 prompt design, webhook-based Dynamics 365 case creation, returning-user handling, bilingual QA remediation, and privacy-aware routing.",
  businessValue:
    "The chatbot gives Brouss a more dependable first-response layer for elevator service, emergency, FAQ, and returning-customer requests while keeping case creation and customer verification rules explicit.",
  role: "Conversational AI and automation engineer responsible for GoHighLevel chatbot architecture, bilingual prompt design, webhook remediation, returning-user flow design, QA fixes, and operational routing review.",
  challenge: [
    "The live bot was failing core support work: some cases were not being created, some emergency cases were created empty, and some conversations ignored the real customer request.",
    "The prompt lacked company and FAQ context, so the chatbot could not answer basic service questions reliably.",
    "GoHighLevel session cookies caused stale data to leak into new conversations, especially for returning users.",
    "Language consistency, repetitive closings, premature conversation endings, and platform latency all affected the quality of the customer experience.",
  ],
  responsibilities: [
    "Updated all four case-creation webhooks to use contact fields instead of broken objective-index payload mapping.",
    "Rebuilt the prompt architecture with full-message reading, emergency intent, language, FAQ, company-info, tone, and premature-closing rules.",
    "Added the emergency capture sequence and the dedicated returning-user branch so the bot collects fresh name, building, and phone data before reuse.",
    "Replaced static closings with AI-driven category-specific responses and reviewed the full bilingual flow through remediation and retesting.",
  ],
  solution: [
    "Use GoHighLevel Conversation AI and the flow builder together: classify the request first, then route into tightly scoped capture and webhook steps.",
    "Collect required fields in the correct order before case creation, especially for emergency and entrapment scenarios.",
    "Treat returning users as a separate path that refreshes identity data before looping back into the main classification flow.",
    "Keep real-time account-specific lookups honest: acknowledge the limitation, route the request as customer follow-up, and avoid pretending the chatbot can query Dynamics 365 live.",
  ],
  architecture: [
    {
      id: "goals",
      title: "Conversation AI Goals",
      description:
        "The GPT-4.1 bot goals layer sets message-reading, emergency, language, FAQ, company-info, tone, and closing rules before the workflow begins.",
      technology: "GoHighLevel Conversation AI",
    },
    {
      id: "builder",
      title: "Flow Builder and Triggers",
      description:
        "Conversation AI and custom triggers feed the main workflow, where AI message and capture nodes classify service category and case type.",
      technology: "GHL Flow Builder",
    },
    {
      id: "capture",
      title: "Branch-Specific Capture Paths",
      description:
        "Standard, emergency, and returning-user branches collect the right fields in the right order before routing forward.",
      technology: "AI Capture Nodes",
    },
    {
      id: "webhooks",
      title: "Webhook and Notification Layer",
      description:
        "Case-creation webhooks and internal notifications hand validated conversation data into the operational system.",
      technology: "Webhooks",
    },
    {
      id: "operations",
      title: "Dynamics 365 and FIELDBOSS",
      description:
        "Operational case records remain the system of record, while the chatbot focuses on intake, routing, and customer-safe messaging.",
      technology: "Microsoft Dynamics 365",
    },
  ],
  workflow: [
    {
      id: "start",
      title: "Trigger the conversation flow",
      description:
        "Conversation AI and custom triggers start the chatbot and route the user into the correct builder path.",
    },
    {
      id: "classify",
      title: "Classify service category and case type",
      description:
        "AI message and capture nodes read the full user message, determine intent, and branch through the AI splitter.",
    },
    {
      id: "collect",
      title: "Collect branch-specific details",
      description:
        "Standard requests gather name, building, summary, details, and phone, while emergency requests collect building, phone, name, and summary before webhook submission.",
    },
    {
      id: "create",
      title: "Create the case and notify operations",
      description:
        "Webhook branches create or route the case and trigger internal notifications for no-condition, new-request, and existing-request outcomes.",
    },
    {
      id: "returning",
      title: "Refresh returning-user context",
      description:
        "Returning users go through a custom message and capture loop that refreshes building, name, and phone before jumping back to the main classification step.",
    },
    {
      id: "close",
      title: "Respond with category-aware closing",
      description:
        "The chatbot ends with AI-driven bilingual closings that match the service category instead of generic hardcoded messages.",
    },
  ],
  decisions: [
    {
      decision: "Move webhook payloads from objective indices to contact fields.",
      rationale:
        "Blank objective-index references and empty quoted fields were breaking Dynamics 365 case creation.",
      impact:
        "Case payloads became stable enough for successful non-emergency and emergency submissions.",
    },
    {
      decision: "Split returning-user handling into a dedicated branch.",
      rationale:
        "GoHighLevel session cookies and AI capture reuse could leak stale data from earlier conversations.",
      impact:
        "Returning users now refresh key identity details before the workflow loops back into the main intake path.",
    },
    {
      decision: "Replace hardcoded closings with AI messages that read service category.",
      rationale:
        "Static closings made every path sound generic and ignored the actual case context.",
      impact:
        "Each branch can close in a more specific and bilingual way without duplicating one fixed message template.",
    },
    {
      decision: "Do not fake real-time status lookup.",
      rationale:
        "The chatbot cannot query Dynamics 365 live from GoHighLevel in its current architecture.",
      impact:
        "Case-status and account-specific questions are routed honestly as follow-up instead of inventing unsupported answers.",
    },
  ],
  reliability: [
    "The June 24 to July 4, 2026 task report documents all critical tasks as done and shows the critical-path re-test improving from 5 out of 20 to 20 out of 20 after fixes.",
    "Emergency case creation now waits until building, phone, and name are captured before firing the webhook.",
    "Language rules were applied across the greeting, 13 capture nodes, and closing steps so Spanish conversations stay consistent end to end.",
    "One redundant capture node was removed to reduce AI calls from 14 to 13, leaving remaining latency as a platform constraint rather than unnecessary flow overhead.",
  ],
  security: [
    "The prompt includes GUID leak prevention and avoids exposing internal operational identifiers in public-facing replies.",
    "Returning-customer and account-specific flows avoid claiming live access to private case data when the architecture cannot support it safely.",
    "Customer identity, case records, and operational status remain in Dynamics 365 and FIELDBOSS rather than in public demo artifacts.",
    "Public evidence should exclude names, phone numbers, addresses, live case IDs, and any private customer-specific support context.",
  ],
  testing: [
    "The report verifies three live test cases, including mechanical, entrapment, and inspections scenarios, as passed by July 4, 2026.",
    "Spanish-language testing was completed across the full conversation path from greeting through goodbye.",
    "Critical remediation covered multi-message handling, repetitive closings, language consistency, premature closing, and empty or failed case creation.",
    "Account-specific and case-status questions were reviewed as constrained follow-up flows until a separate synchronization enhancement is approved.",
  ],
  technologies: [
    { name: "GoHighLevel", category: "crm" },
    { name: "Conversational AI", category: "ai" },
    { name: "Microsoft Dynamics 365", category: "crm" },
    { name: "Webhooks", category: "automation" },
    { name: "Power Automate", category: "automation" },
    { name: "CRM Integration", category: "crm" },
  ],
  evidence: [
    {
      id: "brouss-goals",
      projectSlug: "brouss-elevators",
      type: "image",
      title: "Bot goals and prompt configuration",
      description:
        "The public settings view shows the Brouss Elevator chatbot inside GoHighLevel Conversation AI with the bot-goals area, GPT-4.1 configuration, and the flow-based builder entry point.",
      state: "verified-public",
      src: "/media/brouss-chatbot/bot-goals.png",
      alt: "GoHighLevel Conversation AI settings for the Brouss Elevator chatbot showing bot goals and prompt configuration.",
      width: 1280,
      height: 904,
      caption:
        "Figure 1 from the report: bot goals, full-message reading rule, emergency intent, and flow-builder configuration.",
    },
    {
      id: "brouss-flow-start",
      projectSlug: "brouss-elevators",
      type: "image",
      title: "Flow start and classification",
      description:
        "This builder view shows the conversation trigger, custom trigger, AI greeting, service-category capture, case-type capture, and the AI splitter that branches the workflow.",
      state: "verified-public",
      src: "/media/brouss-chatbot/flow-start.png",
      alt: "Start of the Brouss Elevator chatbot workflow showing triggers, AI greeting, capture steps, and a splitter.",
      width: 1252,
      height: 881,
      caption:
        "Figure 2 from the report: flow start through service-category and case-type classification.",
    },
    {
      id: "brouss-data-collection",
      projectSlug: "brouss-elevators",
      type: "image",
      title: "Standard and emergency data collection branches",
      description:
        "The left branch captures full name, building, summary, information, and phone for standard flows, while the right emergency branch captures building, phone, name, and summary before webhook submission.",
      state: "verified-public",
      src: "/media/brouss-chatbot/data-collection.png",
      alt: "Brouss chatbot flow branches showing standard data collection and emergency capture steps.",
      width: 1274,
      height: 888,
      caption:
        "Figure 3 from the report: data-collection paths for non-emergency and entrapment service requests.",
    },
    {
      id: "brouss-webhooks",
      projectSlug: "brouss-elevators",
      type: "image",
      title: "Webhook branches and returning-user path",
      description:
        "The workflow continues through no-condition, new-request, and existing-request webhook branches with internal notifications and category-specific closings, alongside the returning-user branch.",
      state: "verified-public",
      src: "/media/brouss-chatbot/routing-and-returning.png",
      alt: "Brouss chatbot flow showing webhook branches, notifications, category-specific closings, and the returning-user path.",
      width: 1277,
      height: 897,
      caption:
        "Figure 4 from the report: webhooks, notifications, closings, and the first part of the returning-user branch.",
    },
    {
      id: "brouss-loopback",
      projectSlug: "brouss-elevators",
      type: "image",
      title: "Returning-user loop back into classification",
      description:
        "This view shows the returning-user continuation where the chatbot captures refreshed building, name, and phone data and then jumps back to the main service-category capture step.",
      state: "verified-public",
      src: "/media/brouss-chatbot/returning-loopback.png",
      alt: "Returning-user section of the Brouss chatbot flow showing capture steps and a loop back to service-category classification.",
      width: 1242,
      height: 892,
      caption:
        "Figure 5 from the report: the returning-user collection loop that resets session context before reclassification.",
    },
    {
      id: "brouss-chatbot-report",
      projectSlug: "brouss-elevators",
      type: "document",
      title: "Chatbot edits complete task report",
      description:
        "The June 24 to July 4, 2026 report documents critical, high, and medium-priority fixes, verified test cases, flow screenshots, and the remaining external blocker for building GUID lookup.",
      state: "private-not-publishable",
      source: "Brouss Chatbot Report With Images",
      caption:
        "Used as the source for the published remediation timeline, flow descriptions, and testing notes.",
    },
  ],
  metrics: [
    {
      label: "Critical chatbot re-test",
      value: "20/20 after fixes",
      state: "owner-provided-qa-summary",
      source:
        "Brouss Chatbot Report, covering remediation work from June 24 to July 4, 2026",
    },
  ],
  remainingWork: [
    "Fix the external PHP building GUID lookup so unmatched building names do not fail non-emergency Dynamics 365 case creation.",
    "Implement the proposed Power Automate sync that pushes case-status updates into GoHighLevel custom contact fields if Brouss approves that enhancement.",
  ],
  confidentiality:
    "All public Brouss chatbot evidence must remove customer names, phone numbers, addresses, live case identifiers, and any client-specific operational details.",
} satisfies PortfolioProject;

