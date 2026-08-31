import type { PortfolioProject } from "@/types/portfolio";

export const zohoRevenueOperations = {
  slug: "zoho-revenue-operations",
  route: "/case-studies/zoho-revenue-operations",
  tier: "flagship",
  title: "Zoho & QuickBooks Revenue Operations Automation",
  shortTitle: "Zoho & QuickBooks",
  categoryLabel: "REVENUE OPS · CRM INTEGRATION",
  status: "delivered-audit-and-automation",
  statusLabel: "Delivered System",
  summary:
    "A revenue operations workflow connecting lead intake, deal stages, and closed-won opportunities in Zoho CRM to automated invoicing and accounting synchronization in QuickBooks.",
  metaDescription:
    "Zoho CRM Pipeline & Workflow case study covering CRM audit, workflow repair, field mapping, forecasting, WooCommerce, QuickBooks, and REST API integrations.",
  businessValue:
    "The engagement improved CRM governance and revenue handoff clarity without claiming that every manual process disappeared.",
  role: "CRM and automation engineer responsible for audit, workflow mapping, field consistency, integration repair, and revenue handoff documentation.",
  challenge: [
    "Pipeline data and workflow behavior needed audit and repair.",
    "Field mapping inconsistencies affected forecasting and handoff reliability.",
    "Commerce, accounting, and lead-ad sources required clearer integration boundaries.",
  ],
  responsibilities: [
    "Audited existing Zoho CRM pipeline and workflow behavior.",
    "Mapped fields and stage-triggered email logic.",
    "Designed WooCommerce-to-Zoho and closed-won-to-QuickBooks handoff paths.",
    "Mapped Instagram Lead Ads to Monday.com through Make.com automation.",
  ],
  solution: [
    "Rebuild CRM workflows around consistent field mapping and stage behavior.",
    "Document revenue handoff points between CRM, commerce, accounting, and project tracking.",
    "Use automation for repeatable transitions while preserving operational review where needed.",
  ],
  architecture: [
    {
      id: "crm",
      title: "Zoho CRM",
      description:
        "Pipeline stages, field governance, forecasting, and stage communications.",
      technology: "Zoho CRM",
    },
    {
      id: "commerce",
      title: "WooCommerce Handoff",
      description:
        "Commerce events map into CRM records with consistent field semantics.",
      technology: "WooCommerce",
    },
    {
      id: "accounting",
      title: "QuickBooks Handoff",
      description:
        "Closed-won records move toward accounting with a controlled transition.",
      technology: "QuickBooks",
    },
    {
      id: "lead-ads",
      title: "Lead Ads Routing",
      description:
        "Instagram Lead Ads are routed through Make.com into Monday.com tracking.",
      technology: "Make.com + Monday.com",
    },
  ],
  workflow: [
    {
      id: "audit",
      title: "Audit CRM state",
      description:
        "Review stages, fields, workflow behavior, forecasting, and handoff points.",
    },
    {
      id: "repair",
      title: "Repair workflows",
      description:
        "Correct stage email behavior and integration mapping issues.",
    },
    {
      id: "handoff",
      title: "Clarify revenue handoff",
      description:
        "Document transitions from commerce and CRM into accounting and operations.",
    },
  ],
  decisions: [
    {
      decision: "Start with audit before adding automation.",
      rationale:
        "Automating inconsistent CRM data can multiply existing process defects.",
      impact:
        "Workflow repairs are grounded in field and stage behavior.",
    },
    {
      decision: "Avoid zero-manual-work language.",
      rationale:
        "Revenue operations still need governance, review, and exception handling.",
      impact:
        "The case study stays realistic for CRM and accounting teams.",
    },
  ],
  reliability: [
    "Field mapping summaries reduce ambiguous downstream automation behavior.",
    "Stage-triggered email repair improves consistency in sales communications.",
    "Integration inventory makes commerce, accounting, and lead-ad handoffs easier to review.",
  ],
  security: [
    "Public artifacts must remove customer records, lead details, pipeline values, and account IDs.",
    "CRM and accounting credentials must remain private.",
    "Integration screenshots require redaction before publication.",
  ],
  testing: [
    "Workflow repair should be validated with synthetic lead and deal records.",
    "Field mapping summaries should be reviewed against actual CRM configuration.",
    "Accounting handoff should be tested without publishing financial customer data.",
  ],
  technologies: [
    { name: "Zoho CRM", category: "crm" },
    { name: "QuickBooks", category: "crm" },
    { name: "Make.com", category: "automation" },
    { name: "Webhooks", category: "automation" },
    { name: "WooCommerce", category: "automation" },
    { name: "REST APIs", category: "backend" },
  ],
  evidence: [
    {
      id: "zoho-field-map",
      projectSlug: "zoho-revenue-operations",
      type: "document",
      title: "Field mapping summary",
      description:
        "A sanitized field mapping summary can show how CRM governance and handoffs were clarified.",
      state: "planned",
      caption:
        "Evidence target: before/after process model and integration inventory.",
      confidentialityNote:
        "Remove customer names, revenue amounts, contact details, and private pipeline metadata.",
    },
  ],
  remainingWork: [
    "Attach sanitized workflow maps and field mapping summaries.",
    "Add before/after process model with synthetic records.",
    "Confirm final resume-aligned engagement dates before publishing dates.",
  ],
  confidentiality:
    "Public evidence must not expose CRM records, customer lists, revenue values, or accounting details.",
} satisfies PortfolioProject;

