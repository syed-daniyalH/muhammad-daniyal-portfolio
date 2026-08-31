import type { PortfolioProject } from "@/types/portfolio";

export const dispatchAlex = {
  slug: "dispatch-alex",
  route: "/case-studies/dispatch-alex",
  tier: "flagship",
  title: "SM2 Dispatch System",
  shortTitle: "SM2 Dispatch",
  status: "live-production",
  statusLabel: "Live Production Client Platform",
  summary:
    "A live production bilingual dispatch platform for SM2 Electronics that turns inbound SMS into reviewed jobs, technician execution, invoice approval, invoice history, and production QuickBooks synchronization.",
  metaDescription:
    "SM2 Dispatch System case study covering React, FastAPI, PostgreSQL, Twilio, Make.com, OpenAI-assisted bilingual parsing, role-separated portals, and production QuickBooks synchronization.",
  websiteUrl: "https://dispatch.sm2racing.app/admin",
  websiteLabel: "Open live admin portal",
  repoUrl: "https://github.com/nexoltechinc/clientcrew-dispatch",
  repoLabel: "GitHub repository",
  businessValue:
    "The system gives SM2 one operational path from inbound service text to reviewed dispatch job, technician work, approved invoice, and accounting sync, with role-separated portals and production integrations.",
  role: "Full-stack and automation engineer responsible for the React and TypeScript portals, FastAPI workflow services, PostgreSQL-backed operational state, Make.com intake architecture, and production QuickBooks synchronization design.",
  challenge: [
    "Inbound dealership and customer SMS had to become structured dispatch jobs without losing the real service context.",
    "Administrators and field technicians needed separate interfaces while still working from the same operational job state.",
    "Invoice generation could not write directly into accounting without a controlled approval step.",
    "The production handover had to leave behind a maintainable VPS deployment, a monitorable Make.com intake flow, and clear operational controls.",
  ],
  responsibilities: [
    "Built the role-separated admin and technician portal experience in React, TypeScript, and Vite.",
    "Designed the Make.com intake flow around Twilio polling, trusted service and dealership lookups, bilingual AI parsing, and backend submission.",
    "Implemented the backend workflow boundaries for jobs, technicians, invoice approvals, invoice history, and QuickBooks synchronization.",
    "Documented the production deployment, route map, service structure, and operational handover for SM2's live environment.",
  ],
  solution: [
    "Receive inbound SMS through Twilio, enrich the request with live service and dealership data, and parse it into structured dispatch metadata before backend submission.",
    "Keep admins and technicians in role-specific portal surfaces while the FastAPI backend owns workflow rules and shared job state.",
    "Separate technician completion from invoice release so customer mapping, line items, tax data, and pricing can be checked before QuickBooks sync.",
    "Use one dedicated Make.com integration route and a PostgreSQL-backed lifecycle so intake, execution, approval, and accounting stay traceable.",
  ],
  architecture: [
    {
      id: "sms",
      title: "Inbound SMS Intake",
      description:
        "Customer and dealership messages enter through the production Twilio intake trigger.",
      technology: "Twilio",
    },
    {
      id: "make",
      title: "Make.com Intake Orchestration",
      description:
        "The automation layer fetches trusted services and dealerships, performs bilingual AI parsing, and normalizes the request before posting it to the backend.",
      technology: "Make.com",
    },
    {
      id: "api",
      title: "FastAPI Business Services",
      description:
        "Backend endpoints and service modules validate, route, and manage dispatch, technician, invoice, and QuickBooks workflows.",
      technology: "FastAPI",
    },
    {
      id: "data",
      title: "Operational Job State",
      description:
        "PostgreSQL stores jobs, service lines, technician data, customer records, invoice drafts, sync state, and audit information.",
      technology: "PostgreSQL",
    },
    {
      id: "portal",
      title: "Admin and Technician Portals",
      description:
        "Role-separated React experiences give admins control over review and approvals while technicians work through the field job lifecycle.",
      technology: "React + TypeScript",
    },
    {
      id: "accounting",
      title: "Production QuickBooks Sync",
      description:
        "Approved invoices synchronize into the live QuickBooks company through the production OAuth and invoice workflow.",
      technology: "QuickBooks Online",
    },
  ],
  workflow: [
    {
      id: "receive",
      title: "Receive inbound SMS",
      description:
        "Twilio intake captures the bilingual request and hands it to the production Make.com scenario.",
    },
    {
      id: "enrich",
      title: "Enrich with trusted service data",
      description:
        "Make.com retrieves the live service catalog and dealership records before asking AI to interpret the message.",
    },
    {
      id: "parse",
      title: "Parse the bilingual dispatch request",
      description:
        "OpenAI-assisted steps identify the service, dealership, vehicle details, timing, urgency, confidence, and raw fallback text where needed.",
    },
    {
      id: "review",
      title: "Create and review the dispatch job",
      description:
        "The normalized payload is posted into the backend integration route, where admins can review and manage the new job record.",
    },
    {
      id: "execute",
      title: "Assign and execute the field work",
      description:
        "Technicians accept, start, complete, delay, refuse, and update service-line work from the technician portal.",
    },
    {
      id: "approve",
      title: "Approve the invoice",
      description:
        "Completed work moves into the invoice approval queue so customer mapping, line items, taxes, and totals can be checked.",
    },
    {
      id: "sync",
      title: "Synchronize to QuickBooks",
      description:
        "Only approved invoices are posted to the production QuickBooks company and tracked in invoice history with sync status.",
    },
  ],
  decisions: [
    {
      decision: "Load trusted services and dealerships before AI parsing.",
      rationale:
        "The parser is more reliable when it works from the live catalog and customer context instead of guessing unsupported values.",
      impact:
        "The intake flow stays grounded in real service options and reduces invented or mismatched dispatch records.",
    },
    {
      decision: "Keep admin and technician workflows in separate portals.",
      rationale:
        "Dispatch review, assignment, reporting, and invoice control have very different needs from field execution screens.",
      impact:
        "Each role gets a clearer interface without sacrificing shared job state or workflow continuity.",
    },
    {
      decision: "Require invoice approval before QuickBooks sync.",
      rationale:
        "Accounting records should not trust raw field completion or automation output without a final business check.",
      impact:
        "Customer mappings, tax data, pricing, and invoice exceptions remain visible before financial records are released.",
    },
  ],
  reliability: [
    "The supplied Make.com scenario shows a visible end-to-end production intake flow rather than a hidden black-box automation.",
    "The intake path normalizes AI output through a JSON parsing step before creating or updating dispatch jobs.",
    "Invoice approval and invoice history keep accounting exceptions visible instead of pushing failures straight into QuickBooks.",
    "The handover notes that the current polling schedule runs every 15 minutes, so timing expectations stay explicit for operators.",
  ],
  security: [
    "Temporary admin and technician credentials should be rotated immediately after confirmed access.",
    "The handover flags embedded Make.com credentials as a remediation item and recommends secure connection or variable storage instead.",
    "The `/integrations/make/jobs` endpoint should stay protected by a dedicated secret, token, signature, or equivalent server-side control.",
    "QuickBooks OAuth secrets, database credentials, JWT keys, SMTP credentials, and VPS access all remain outside public artifacts and source control.",
  ],
  testing: [
    "The handover checklist covers admin login, technician login, Make.com ownership, QuickBooks production connection, and invoice-sync smoke testing.",
    "Backend coverage is documented for authentication, invoices, Make.com, QuickBooks, technicians, and workflow behavior.",
    "Operational release checks should confirm login, intake, assignment, technician execution, invoice approval, and QuickBooks synchronization after every production change.",
    "Database changes should follow the documented backup, rollback, and migration discipline before deployment to the live VPS.",
  ],
  technologies: [
    { name: "React", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "FastAPI", category: "backend" },
    { name: "PostgreSQL", category: "database" },
    { name: "Make.com", category: "automation" },
    { name: "Twilio", category: "voice" },
    { name: "OpenAI", category: "ai" },
    { name: "QuickBooks Online", category: "crm" },
    { name: "REST API", category: "backend" },
    { name: "Role-Based Access", category: "security" },
  ],
  evidence: [
    {
      id: "dispatch-make-scenario",
      projectSlug: "dispatch-alex",
      type: "image",
      title: "Production Make.com intake scenario",
      description:
        "The supplied Alex DISPATCH scenario shows the live Twilio intake, backend token request, service and dealership lookups, bilingual AI parsing, backend submission, and acknowledgment SMS flow.",
      state: "verified-public",
      src: "/media/dispatch-alex/make-scenario.png",
      alt: "A Make.com scenario showing the Alex DISPATCH intake flow from Twilio through parsing and backend submission.",
      width: 1280,
      height: 896,
      caption:
        "The public screenshot shows the production module order and the 15-minute polling schedule for inbound dispatch intake.",
    },
    {
      id: "dispatch-handover-report",
      projectSlug: "dispatch-alex",
      type: "document",
      title: "Production handover report",
      description:
        "The handover report documents the live Hostinger VPS deployment, portal routes, backend service map, Make.com integration summary, and QuickBooks production workflow.",
      state: "private-not-publishable",
      source: "Final client-ready technical and operational handover report",
      caption:
        "Used as the source for the published system summary and production architecture notes.",
      confidentialityNote:
        "Keep passwords, integration secrets, database details, and internal operational records out of public excerpts.",
    },
  ],
  remainingWork: [
    "Move any embedded Make.com credential handling into dedicated secure connection or variable storage if that remediation is not already complete.",
    "Confirm whether the 15-minute polling schedule still meets dispatch response expectations or should be replaced by a faster intake trigger.",
    "Keep the VPS, database ownership, backups, and production change-control register current as the system evolves.",
  ],
  confidentiality:
    "Public examples must not expose passwords, tokens, dealership contact data, phone numbers, invoice details, or private operational records.",
} satisfies PortfolioProject;

