import type { PortfolioProject } from "@/types/portfolio";

export const applyPilot = {
  slug: "applypilot",
  route: "/lab/applypilot",
  tier: "systems-lab",
  title: "ApplyPilot",
  shortTitle: "ApplyPilot",
  status: "systems-lab",
  statusLabel: "Systems Lab / Personal R&D",
  summary:
    "A Python-based AI-assisted job application workflow and tracking tool designed as a responsible automation lab with human approval and safeguards for sensitive questions.",
  metaDescription:
    "ApplyPilot systems lab case study covering Python, Selenium, Flask, CSV, LLM providers, human approval, responsible automation, secret management, tests, and CI.",
  businessValue:
    "ApplyPilot explores how personal workflow automation can assist repetitive application tasks while preserving human decision-making and policy boundaries.",
  role: "Personal R&D builder responsible for architecture, responsible-use guardrails, UI workflow, provider integration, test planning, and CI direction.",
  challenge: [
    "Application workflows are repetitive but include legally and personally sensitive questions.",
    "Automation must not answer eligibility, health, legal, or personal questions without human review.",
    "A public project needs careful language that avoids stealth, evasion, or platform-bypass framing.",
  ],
  responsibilities: [
    "Built the Python automation and tracking workflow as a non-production lab project.",
    "Specified human approval before sensitive or consequential submissions.",
    "Outlined safeguards for legal, health, eligibility, and personal information questions.",
    "Documented secret management, tests, CI, and health endpoint expectations.",
  ],
  solution: [
    "Use AI assistance for drafting and tracking while requiring human confirmation for submissions.",
    "Keep sensitive fields and policy-bound questions in explicit approval paths.",
    "Frame browser automation as a local productivity lab rather than stealth automation.",
  ],
  architecture: [
    {
      id: "tracker",
      title: "Application Tracker",
      description:
        "CSV-backed records track application state, review status, and follow-up needs.",
      technology: "CSV",
    },
    {
      id: "server",
      title: "Local Control Surface",
      description:
        "A Flask interface exposes workflow state and health checks.",
      technology: "Flask",
    },
    {
      id: "automation",
      title: "Browser Workflow",
      description:
        "Selenium assists repetitive form navigation while leaving consequential answers for review.",
      technology: "Selenium",
    },
    {
      id: "llm",
      title: "LLM Assistance",
      description:
        "Multiple provider support helps draft responses within responsible-use constraints.",
      technology: "LLM providers",
    },
  ],
  workflow: [
    {
      id: "queue",
      title: "Queue opportunity",
      description:
        "Track role, company, source, and required review steps.",
    },
    {
      id: "draft",
      title: "Draft assistant output",
      description:
        "Use LLM assistance only for draft content that can be reviewed by the applicant.",
    },
    {
      id: "review",
      title: "Require human approval",
      description:
        "Pause on legal, health, eligibility, and sensitive personal information questions.",
    },
    {
      id: "record",
      title: "Record outcome",
      description:
        "Update the tracker after human action rather than claiming fully autonomous completion.",
    },
  ],
  decisions: [
    {
      decision: "Label the project as Systems Lab.",
      rationale:
        "The work is personal R&D and should not be confused with a production client system.",
      impact:
        "Visitors can evaluate engineering thinking without misreading deployment status.",
    },
    {
      decision: "Remove stealth or evasion framing.",
      rationale:
        "Responsible automation should respect platform rules and human consent.",
      impact:
        "The project communicates safeguards rather than bypass behavior.",
    },
  ],
  reliability: [
    "Health endpoint and CI are part of the lab hardening plan.",
    "Tests should cover sensitive-question routing and tracker state updates.",
    "Human approval prevents brittle automated submission behavior.",
  ],
  security: [
    "Provider keys and personal data must stay out of source and public screenshots.",
    "Sensitive personal information requires explicit approval before use.",
    "Public examples should use synthetic roles and applicant data.",
  ],
  testing: [
    "Tests are planned for guardrails, tracking state, and health checks.",
    "CI is part of the responsible-use roadmap.",
    "Manual review remains mandatory for consequential questions.",
  ],
  technologies: [
    { name: "Python", category: "backend" },
    { name: "Selenium", category: "automation" },
    { name: "Flask", category: "backend" },
    { name: "CSV", category: "database" },
    { name: "LLM providers", category: "ai" },
    { name: "CI", category: "testing" },
  ],
  evidence: [
    {
      id: "applypilot-repo",
      projectSlug: "applypilot",
      type: "document",
      title: "Public repository target",
      description:
        "Repository evidence is planned after secrets, stealth language, and personal data are removed.",
      state: "planned",
      caption:
        "Evidence target: public repo, sanitized UI screenshots, and responsible-use roadmap.",
      confidentialityNote:
        "Remove API keys, personal profile data, application answers, and site-specific private details.",
    },
  ],
  remainingWork: [
    "Publish only after responsible-use review.",
    "Attach sanitized UI screenshots.",
    "Confirm tests, CI, health endpoint, and secret management before public repo linking.",
  ],
  confidentiality:
    "ApplyPilot must use synthetic applicant data in public assets and preserve human approval for sensitive questions.",
} satisfies PortfolioProject;
