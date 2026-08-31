import type { PortfolioProject } from "@/types/portfolio";

export const applyPilot = {
  slug: "applypilot",
  route: "/lab/applypilot",
  tier: "systems-lab",
  title: "ApplyPilot LinkedIn Workflow Lab",
  shortTitle: "ApplyPilot",
  status: "systems-lab",
  statusLabel: "Systems Lab / Personal R&D",
  websiteUrl:
    "https://drive.google.com/file/d/1I_oenMfSCJVKnmbgI5SuBEitoKrELe8I/view?usp=drivesdk",
  websiteLabel: "Watch demo clip",
  summary:
    "A Python-based LinkedIn application workflow lab that uses browser automation and AI drafting to reduce repetitive application steps while keeping sensitive answers and final submission under human approval.",
  metaDescription:
    "ApplyPilot LinkedIn workflow lab case study covering Python, Selenium, local browser automation, AI drafting, human approval gates, tracking, and responsible-use safeguards.",
  businessValue:
    "ApplyPilot explores how a personal job-application assistant can reduce repetitive browser work and tracking overhead without pretending sensitive application decisions should run unattended.",
  role: "Personal R&D builder responsible for the browser workflow architecture, LinkedIn automation path, responsible-use guardrails, human-review checkpoints, and lab hardening plan.",
  challenge: [
    "LinkedIn applications repeat the same navigation, opening, and form-filling work across many roles.",
    "Job applications still contain legally, professionally, and personally sensitive questions that should not be answered by a hidden autonomous agent.",
    "A public portfolio version had to show the browser workflow clearly without making exaggerated claims about unattended submission.",
  ],
  responsibilities: [
    "Built the Python-based browser workflow as a local systems-lab project for repetitive LinkedIn application steps.",
    "Defined human approval gates for sensitive questions, final review, and submission readiness.",
    "Structured the workflow so drafted answers and application state stay visible to the operator instead of disappearing into a blind background run.",
    "Documented the sanitization, testing, and secret-management work needed before wider public repo exposure.",
  ],
  solution: [
    "Use local browser automation for repetitive LinkedIn navigation while keeping the operator in control of each real application decision.",
    "Limit AI to drafting and assistive steps, then route consequential questions and final submission through explicit review checkpoints.",
    "Track application progress and review state as part of the workflow so the user can pause, edit, skip, or continue with context intact.",
  ],
  architecture: [
    {
      id: "queue",
      title: "Opportunity Queue",
      description:
        "Application targets, progress state, and follow-up notes are tracked so the workflow can resume without losing operator context.",
      technology: "CSV",
    },
    {
      id: "browser",
      title: "LinkedIn Browser Session",
      description:
        "A local browser session handles repetitive page navigation, form movement, and application-step progression on LinkedIn.",
      technology: "Selenium",
    },
    {
      id: "drafting",
      title: "Draft Assistance Layer",
      description:
        "AI support helps prepare draft answers and reusable response material before anything consequential is accepted.",
      technology: "OpenAI",
    },
    {
      id: "review",
      title: "Human Approval Gate",
      description:
        "Sensitive questions, professional claims, and final submission checks stop here for explicit operator review.",
      technology: "Human review",
    },
    {
      id: "tracking",
      title: "State and Resume Tracking",
      description:
        "The workflow records where an application paused, what needs review, and what follow-up should happen next.",
      technology: "Python",
    },
    {
      id: "control",
      title: "Local Lab Control Surface",
      description:
        "A local controller keeps the lab visible, operator-driven, and easier to harden before any broader release.",
      technology: "Flask",
    },
    {
      id: "llm",
      title: "Provider Flexibility",
      description:
        "Multiple model providers can support drafting experiments without changing the review-first structure of the workflow.",
      technology: "LLM providers",
    },
  ],
  workflow: [
    {
      id: "queue",
      title: "Queue the target role",
      description:
        "Record the role, company, source link, and any known review requirements before the browser flow begins.",
    },
    {
      id: "open",
      title: "Open and progress the LinkedIn flow",
      description:
        "The automation handles repetitive page movement and application-step navigation while staying in a visible local browser session.",
    },
    {
      id: "draft",
      title: "Prepare draft responses",
      description:
        "AI assistance can generate draft material for repetitive prompts, but those drafts remain subject to operator review.",
    },
    {
      id: "review",
      title: "Pause for human approval",
      description:
        "Eligibility, legal, health, compensation, and other consequential questions stay blocked until the operator explicitly confirms the next step.",
    },
    {
      id: "record",
      title: "Record outcome and next action",
      description:
        "After the operator completes or stops the run, the tracker stores outcome, follow-up state, and where the workflow should resume next time.",
    },
  ],
  decisions: [
    {
      decision: "Keep the project positioned as a systems lab, not a production bot.",
      rationale:
        "The work demonstrates engineering approach and automation boundaries, but it should not be presented as a polished client platform or unattended growth tool.",
      impact:
        "The portfolio page can show real workflow thinking without overclaiming maturity or deployment scope.",
    },
    {
      decision: "Stop on sensitive and consequential questions.",
      rationale:
        "Applications often ask for information that is personal, regulated, or professionally risky to answer automatically.",
      impact:
        "The system remains assistive rather than pretending the most important answers can be delegated blindly.",
    },
    {
      decision: "Keep the browser session local and visible.",
      rationale:
        "An operator-visible session makes it easier to review state, intervene quickly, and keep the workflow accountable.",
      impact:
        "The lab stays easier to debug and less likely to drift into hidden or misleading automation behavior.",
    },
  ],
  reliability: [
    "The tracker preserves application state so interrupted runs can resume with context instead of starting blind.",
    "Human approval checkpoints prevent brittle autonomous completion on sensitive or ambiguous questions.",
    "The local browser approach keeps the operator close to failures, pauses, and unexpected LinkedIn flow changes.",
  ],
  security: [
    "Public assets must remove personal resumes, applicant identity details, tokens, and any stored credentials.",
    "Sensitive answers should stay operator-supplied rather than becoming hidden automation defaults.",
    "The public demo is limited to a sanitized browser walkthrough and should not expose private application data.",
  ],
  testing: [
    "The attached public video confirms a real LinkedIn browser walkthrough rather than a placeholder concept slide.",
    "Guardrail testing should cover pause conditions for eligibility, legal, health, compensation, and other sensitive prompts.",
    "Before a broader release, the lab still needs stronger CI, secret-scanning, and regression checks around tracker state and browser-step recovery.",
  ],
  technologies: [
    { name: "Python", category: "backend" },
    { name: "Selenium", category: "automation" },
    { name: "LinkedIn", category: "automation" },
    { name: "Flask", category: "backend" },
    { name: "CSV", category: "backend" },
    { name: "OpenAI", category: "ai" },
    { name: "Gemini", category: "ai" },
    { name: "ChromeDriver", category: "automation" },
    { name: "Human Approval Gates", category: "testing" },
  ],
  evidence: [
    {
      id: "applypilot-linkedin-demo",
      projectSlug: "applypilot",
      type: "video",
      title: "LinkedIn automation demo clip",
      description:
        "This public video shows ApplyPilot running through a LinkedIn browser workflow in a visible local session, illustrating the assistive automation path the lab is built around.",
      state: "verified-public",
      src: "/media/applypilot/linkedin-automation.mp4",
      alt: "A recorded browser demo of ApplyPilot progressing through a LinkedIn application workflow.",
      caption:
        "Public demo clip from the shared Drive folder. It shows the LinkedIn automation path, not a claim of unattended autonomous submission.",
      confidentialityNote:
        "Keep future public demos sanitized: no personal resumes, saved credentials, private answers, or recruiter-private account details.",
    },
  ],
  remainingWork: [
    "Add a second sanitized demo for the tracker and resume-state view so the evidence is not limited to the browser walkthrough alone.",
    "Publish the repository only after personal profile data, secrets, and any misleading automation language are fully removed.",
    "Expand regression coverage around pause conditions, resume logic, and browser-step recovery before treating the lab as stable.",
  ],
  confidentiality:
    "ApplyPilot public assets should stay sanitized, operator-visible, and explicitly human-reviewed for any sensitive application content.",
} satisfies PortfolioProject;
