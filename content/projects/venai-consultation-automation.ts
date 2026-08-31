import type { PortfolioProject } from "@/types/portfolio";

export const venaiConsultationAutomation = {
  slug: "venai-consultation-automation",
  route: "/case-studies/venai-consultation-automation",
  tier: "flagship",
  title: "VenAI Stage 0 Onboarding Automation",
  shortTitle: "VenAI Stage 0",
  categoryLabel: "VENAI · CRM AUTOMATION",
  status: "implemented-final-validation-pending",
  statusLabel: "Client Implementation",
  websiteUrl: "https://www.loom.com/share/0600fdf58bb74369a45aea63c2c05d96",
  websiteLabel: "View implementation walkthrough",
  summary:
    "An onboarding and payment automation system that connects deal submission, client agreements, payment routing, onboarding intake, kickoff readiness, and synchronized GoHighLevel and n8n workflow states.",
  metaDescription:
    "VenAI Stage 0 case study covering GoHighLevel workflows, client onboarding form architecture, n8n Stripe invoice handling, completion-gated kickoff, CRM field protection, and Stage 0 data orchestration.",
  businessValue:
    "The system gives VenAI one controlled path from closed-won deal to client kickoff, without mixing commercial terms into the client form or allowing agreement, payment, intake, and kickoff stages to drift out of sync.",
  role: "Automation engineer responsible for Stage 0 workflow architecture, GHL form and field logic, n8n payment orchestration, onboarding data mapping, duplicate-protection rules, and kickoff release logic.",
  challenge: [
    "VenAI needed one consistent Stage 0 path from internal deal submission to agreement, payment, client intake, and kickoff.",
    "Commercial values such as setup fee, monthly fee, payment structure, and payment method had to stay controlled internally rather than becoming client-editable onboarding fields.",
    "The same downstream automation needed to work whether the opportunity came from the internal New Deal Submission flow or Venus manually moved an existing opportunity to Won or Closed Won.",
    "Kickoff could not be released early; the system had to wait until agreement, payment condition, and intake completion requirements were genuinely satisfied.",
  ],
  responsibilities: [
    "Designed the six-section client onboarding form blueprint and its GHL field and conditional-logic rules.",
    "Built or mapped the GHL workflows for deal submission, Stage 0 start, agreement draft creation, intake send, agreement completion, and completion-gate release.",
    "Built the n8n routing around post-agreement Stripe dispatch, invoice generation, and Stripe payment-listener updates back into GoHighLevel.",
    "Defined the CRM mapping rules so existing contact and opportunity fields are reused instead of duplicated across agreement, intake, payment, and kickoff steps.",
  ],
  solution: [
    "Separate the internal commercial deal form from the client-facing onboarding form so each stage owns only the data it should control.",
    "Start Stage 0 from the won opportunity with validation and duplicate-protection rules rather than creating a second parallel opportunity path.",
    "Route payment after agreement through a clear Stripe decision branch so invoice creation happens only when the configured payment method requires it.",
    "Treat kickoff as a completion-gated release that checks agreement, invoice, and intake status instead of trusting any one step in isolation.",
  ],
  architecture: [
    {
      id: "sales",
      title: "Internal Deal Capture",
      description:
        "The internal New Deal Submission flow records the commercial deal and moves the validated opportunity into the Stage 0 path.",
      technology: "GoHighLevel Forms + Workflows",
    },
    {
      id: "stage0",
      title: "Stage 0 Orchestrator",
      description:
        "When an opportunity reaches Won or Closed Won, Stage 0 validates required data, marks the start state, and decides which downstream automation should run.",
      technology: "GoHighLevel",
    },
    {
      id: "agreement",
      title: "Agreement Pipeline",
      description:
        "Agreement draft creation and agreement-complete handling reuse the same opportunity and keep contract state aligned with the CRM record.",
      technology: "GHL Documents and Contracts",
    },
    {
      id: "payment",
      title: "Payment Routing Layer",
      description:
        "Post-agreement logic dispatches Stripe invoice creation when required, and the Stripe listener writes payment outcomes back into GoHighLevel.",
      technology: "n8n + Stripe",
    },
    {
      id: "intake",
      title: "Client Onboarding Intake",
      description:
        "The client-facing onboarding form captures operational implementation data without overwriting the internal commercial source of truth.",
      technology: "GoHighLevel Form",
    },
    {
      id: "gate",
      title: "Completion Gate and Kickoff",
      description:
        "The completion gate watches intake, invoice, and contract state changes and releases kickoff only when all requirements are met.",
      technology: "GoHighLevel Automation",
    },
  ],
  workflow: [
    {
      id: "deal",
      title: "Submit and validate the deal",
      description:
        "The internal sales form captures the agreed package, add-ons, pricing structure, and payment method before the opportunity is moved to Won.",
    },
    {
      id: "start",
      title: "Start Stage 0",
      description:
        "The Stage 0 start workflow validates required client and commercial data, prevents duplicate runs, and marks the opportunity as Stage 0 started.",
    },
    {
      id: "agreement",
      title: "Generate the agreement draft",
      description:
        "The system finds the correct client and opportunity, creates the service agreement draft, and marks the opportunity as pending Venus review.",
    },
    {
      id: "payment",
      title: "Route payment after agreement",
      description:
        "Once the agreement is complete, the payment branch decides whether to start a Stripe invoice flow or skip straight to the non-Stripe path.",
    },
    {
      id: "intake",
      title: "Send and capture onboarding intake",
      description:
        "The client receives the onboarding form, submits operational implementation details, and the automation updates the Intake status without changing commercial values.",
    },
    {
      id: "gate",
      title: "Re-evaluate completion requirements",
      description:
        "Contract completion, invoice paid status, and intake completion all feed the completion gate, which decides whether kickoff can be released.",
    },
    {
      id: "kickoff",
      title: "Release kickoff once eligible",
      description:
        "Only when all Stage 0 requirements are satisfied does the system send the kickoff booking link and mark kickoff as sent.",
    },
  ],
  decisions: [
    {
      decision: "Separate the internal deal form from the client onboarding form.",
      rationale:
        "The commercial agreement data and the implementation intake data solve different jobs and should not compete for the same source of truth.",
      impact:
        "Clients cannot accidentally rewrite pricing or payment terms, and downstream automations stay consistent.",
    },
    {
      decision: "Reuse the same Stage 0 orchestration for manual Won deals.",
      rationale:
        "Venus sometimes moves an existing opportunity to Won manually, and that path should not create a second automation architecture.",
      impact:
        "Manual and internal-won deals still feed one consistent Stage 0 record and workflow surface.",
    },
    {
      decision: "Protect kickoff behind a completion gate.",
      rationale:
        "Agreement, payment, and intake often finish at different times and should not each independently trigger kickoff.",
      impact:
        "Kickoff only releases when the required contract, invoice, and intake conditions are actually satisfied.",
    },
    {
      decision: "Reuse existing GHL identity and business fields instead of creating duplicates.",
      rationale:
        "Stage 0 depends on a single client record that survives agreement, intake, payment, and implementation handoff.",
      impact:
        "Business name, ABN, address, and contact identity stay consistent across CRM, form, and n8n payloads.",
    },
  ],
  reliability: [
    "Stage 0 duplicate protection ends the workflow when Stage 0 Automation Started is already set, which prevents a second onboarding run on the same opportunity.",
    "The Stage 0 start workflow validates required client, business, package, and payment data before downstream automation begins.",
    "The Stripe payment listener normalizes payment events, resolves payment state, and writes paid or failed invoice status back into GoHighLevel.",
    "The completion gate watches multiple status changes and only releases kickoff when the full requirement set is complete.",
  ],
  security: [
    "The client onboarding form intentionally excludes passwords, API secrets, and general credential collection; secure connection setup happens through a separate approved process.",
    "Setup fee, monthly fee, payment structure, payment method, and internal Stage 0 statuses remain internal CRM values rather than client-editable form fields.",
    "Entry workflows normalize and authenticate payloads before they continue through Stage 0 logic.",
    "Public evidence should avoid client PII, payment links, internal IDs, and full live endpoint details.",
  ],
  testing: [
    "The onboarding form acceptance plan covers fresh submissions, required-field validation, known-data mapping, commercial isolation, conditional Voice AI logic, file uploads, mobile QA, and duplicate protection.",
    "Manual-Won compatibility is explicitly tested so the same Stage 0 and n8n path is reused without creating a duplicate opportunity or onboarding run.",
    "The screenshots show successful execution history for Stage 0 start, agreement-complete processing, Stripe invoice handling, and the Stripe payment listener in August 2026.",
    "The public Loom walkthrough adds a sanitized narrative pass over the Stage 0 form and automation structure, complementing the execution screenshots with a clearer end-to-end explanation.",
    "Completion-gate testing verifies that intake submission alone does not release kickoff early when another required Stage 0 condition is still incomplete.",
  ],
  technologies: [
    { name: "GoHighLevel", category: "crm" },
    { name: "n8n", category: "automation" },
    { name: "Stripe", category: "crm" },
    { name: "GHL Documents", category: "crm" },
    { name: "GHL Forms", category: "crm" },
    { name: "REST APIs", category: "backend" },
    { name: "Webhooks", category: "security" },
    { name: "JavaScript", category: "frontend" },
  ],
  evidence: [
    {
      id: "venai-loom-walkthrough",
      projectSlug: "venai-consultation-automation",
      type: "video",
      title: "VenAI Stage 0 Loom walkthrough",
      description:
        "This public Loom walkthrough explains the VenAI Stage 0 onboarding form and the surrounding automation path, giving a cleaner narrative view of how agreement, payment, intake, and kickoff coordination fit together.",
      state: "sanitized-demonstration",
      externalUrl: "https://www.loom.com/share/0600fdf58bb74369a45aea63c2c05d96",
      externalLabel: "View implementation walkthrough",
      alt: "A Loom walkthrough covering the VenAI Stage 0 onboarding form and automation architecture.",
      caption:
        "This gives the case study a client-friendly walkthrough alongside the static evidence from GoHighLevel and n8n.",
    },
    {
      id: "venai-deal-submitted",
      projectSlug: "venai-consultation-automation",
      type: "image",
      title: "Internal deal submission workflow",
      description:
        "The internal sales workflow validates the submitted deal, creates the sales opportunity, waits for the CRM write, moves the validated deal to Won, and sends a confirmation email.",
      state: "verified-public",
      src: "/media/venai-stage0/deal-submitted-flow.png",
      alt: "GoHighLevel workflow for the VenAI internal sales deal submission process.",
      width: 1136,
      height: 891,
      caption:
        "This is the internal commercial entry point, not the client onboarding form.",
    },
    {
      id: "venai-stage0-start",
      projectSlug: "venai-consultation-automation",
      type: "image",
      title: "Stage 0 start execution",
      description:
        "The successful execution view for Start Onboarding - Agreement First FINAL shows the large Stage 0 start workflow running against live records in August 2026.",
      state: "verified-public",
      src: "/media/venai-stage0/stage0-start-execution.png",
      alt: "Execution view of the VenAI Stage 0 start workflow in GoHighLevel.",
      width: 1280,
      height: 839,
      caption:
        "The start flow validates the record, marks Stage 0 started, and routes into the contract process without creating a duplicate opportunity.",
    },
    {
      id: "venai-agreement-draft",
      projectSlug: "venai-consultation-automation",
      type: "image",
      title: "Agreement draft creation workflow",
      description:
        "This workflow finds the client contact, finds the Stage 0 opportunity, creates the VenAI service agreement draft, marks agreement pending Venus review, and signals draft readiness.",
      state: "verified-public",
      src: "/media/venai-stage0/agreement-draft-flow.png",
      alt: "GoHighLevel workflow for creating the VenAI agreement draft.",
      width: 1280,
      height: 899,
      caption:
        "Agreement creation is tied to the correct contact and opportunity before the client-facing onboarding stage begins.",
    },
    {
      id: "venai-agreement-complete",
      projectSlug: "venai-consultation-automation",
      type: "image",
      title: "Agreement complete and payment-method branch",
      description:
        "When the agreement is completed, the workflow marks agreement complete, checks the configured payment method, and either starts the Stripe invoice path or routes into the non-Stripe branch.",
      state: "verified-public",
      src: "/media/venai-stage0/agreement-complete-flow.png",
      alt: "GoHighLevel workflow for agreement completion and payment-method branching in VenAI Stage 0.",
      width: 1280,
      height: 891,
      caption:
        "Agreement completion does not directly release kickoff; it only advances the correct Stage 0 condition.",
    },
    {
      id: "venai-post-agreement-dispatch",
      projectSlug: "venai-consultation-automation",
      type: "image",
      title: "Post-agreement Stripe dispatch in n8n",
      description:
        "The n8n dispatcher validates the agreement-completed payload, checks whether the payment method is Stripe, starts the Stripe invoice process when needed, and skips it when not required.",
      state: "verified-public",
      src: "/media/venai-stage0/post-agreement-dispatch.png",
      alt: "n8n workflow for VenAI post-agreement Stripe dispatch.",
      width: 1280,
      height: 772,
      caption:
        "This keeps invoice generation explicit and conditional rather than assuming every deal uses the same payment route.",
    },
    {
      id: "venai-stripe-listener",
      projectSlug: "venai-consultation-automation",
      type: "image",
      title: "Stripe payment listener and CRM update path",
      description:
        "The live Stripe payment listener normalizes the payment event, resolves the payment state, and builds the correct paid or failed status update back into GoHighLevel.",
      state: "verified-public",
      src: "/media/venai-stage0/stripe-payment-listener.png",
      alt: "n8n Stripe payment listener workflow for VenAI Stage 0.",
      width: 1280,
      height: 839,
      caption:
        "The screenshot shows successful listener executions on August 6, 2026 and the paid or failed update branches back into GHL.",
    },
    {
      id: "venai-send-intake",
      projectSlug: "venai-consultation-automation",
      type: "image",
      title: "Client onboarding form send workflow",
      description:
        "This Stage 0 workflow finds the correct contact and opportunity, sends the client intake form, and marks the intake as sent without altering the internal commercial fields.",
      state: "verified-public",
      src: "/media/venai-stage0/send-intake-form.png",
      alt: "GoHighLevel workflow that sends the VenAI client intake form during Stage 0.",
      width: 1131,
      height: 888,
      caption:
        "The onboarding form belongs to implementation intake, not to commercial pricing control.",
    },
    {
      id: "venai-completion-gate",
      projectSlug: "venai-consultation-automation",
      type: "image",
      title: "Completion gate and kickoff release",
      description:
        "The completion gate listens for Intake Completed, Invoice Paid, and Contract Completed status changes, checks the Stage 0 requirements, and only then sends the kickoff booking link.",
      state: "verified-public",
      src: "/media/venai-stage0/completion-gate.png",
      alt: "GoHighLevel completion-gate workflow for the VenAI Stage 0 kickoff release.",
      width: 1280,
      height: 896,
      caption:
        "Kickoff is released only after all required conditions are met, not when any single status changes first.",
    },
    {
      id: "venai-onboarding-form-source",
      projectSlug: "venai-consultation-automation",
      type: "document",
      title: "Final client onboarding form blueprint",
      description:
        "The August 25, 2026 onboarding form document defines the two-form architecture, six client-facing sections, field mapping rules, excluded commercial fields, Stage 0 integration rules, and the final QA plan.",
      state: "private-not-publishable",
      source: "VenAI Final Onboarding Form",
      caption:
        "Used as the source for the field-ownership, mapping, and Stage 0 orchestration details published here.",
    },
  ],
  remainingWork: [
    "Confirm whether any remaining hardcoded IDs or temporary internal field references still need to be removed from the live Stage 0 environment.",
    "Add an approved sanitized public capture of the client-facing onboarding form itself once the final production version is cleared for portfolio use.",
  ],
  confidentiality:
    "Public VenAI Stage 0 evidence must avoid lead PII, payment links, internal IDs, webhook endpoints, and any client-specific commercial or operational data.",
} satisfies PortfolioProject;

