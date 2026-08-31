export type ProjectTier =
  | "flagship"
  | "supporting"
  | "systems-lab";

export type ProjectStatus =
  | "live-production"
  | "production-implementation-qa-baseline"
  | "implemented-final-validation-pending"
  | "advanced-prototype-production-hardening"
  | "delivered-audit-and-automation"
  | "systems-lab";

export type EvidenceState =
  | "verified-public"
  | "sanitized-demonstration"
  | "private-not-publishable"
  | "planned";

export type EvidenceType =
  | "image"
  | "video"
  | "audio"
  | "diagram"
  | "trace"
  | "code"
  | "document";

export type MetricClaimState =
  | "target"
  | "owner-provided-qa-summary"
  | "private-evidence-required";

export interface ArchitectureNode {
  id: string;
  title: string;
  description: string;
  technology?: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

export interface EngineeringDecision {
  decision: string;
  rationale: string;
  impact: string;
}

export interface TechnologyRef {
  name: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "automation"
    | "ai"
    | "voice"
    | "crm"
    | "infrastructure"
    | "security"
    | "testing";
}

export interface EvidenceAsset {
  id: string;
  type: EvidenceType;
  title: string;
  description: string;
  state: EvidenceState;
  projectSlug: string;
  source?: string;
  src?: string;
  embedUrl?: string;
  externalUrl?: string;
  externalLabel?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  confidentialityNote?: string;
  trace?: Record<string, unknown>;
  code?: {
    filename: string;
    language: "python" | "typescript" | "json" | "bash";
    body: string;
    label?: string;
  };
}

export interface ProjectMetric {
  label: string;
  value: string;
  state: MetricClaimState;
  source: string;
}

export interface PortfolioProject {
  slug: string;
  route: `/case-studies/${string}` | `/lab/${string}`;
  tier: ProjectTier;
  title: string;
  shortTitle: string;
  summary: string;
  metaDescription: string;
  websiteUrl?: string;
  websiteLabel?: string;
  repoUrl?: string;
  repoLabel?: string;
  businessValue: string;
  challenge: string[];
  role: string;
  responsibilities: string[];
  solution: string[];
  architecture: ArchitectureNode[];
  workflow: WorkflowStep[];
  decisions: EngineeringDecision[];
  reliability: string[];
  security: string[];
  testing: string[];
  technologies: TechnologyRef[];
  evidence: EvidenceAsset[];
  metrics?: ProjectMetric[];
  status: ProjectStatus;
  statusLabel: string;
  remainingWork?: string[];
  confidentiality?: string;
}

export interface PortfolioValidationIssue {
  slug: string;
  field: string;
  message: string;
}
