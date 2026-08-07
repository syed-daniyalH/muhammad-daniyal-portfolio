import { aiVideoOperations } from "@/content/projects/ai-video-operations";
import { applyPilot } from "@/content/projects/applypilot";
import { broussElevators } from "@/content/projects/brouss-elevators";
import { dispatchAlex } from "@/content/projects/dispatch-alex";
import { sm2RaceControl } from "@/content/projects/sm2-race-control";
import { venaiConsultationAutomation } from "@/content/projects/venai-consultation-automation";
import { zohoRevenueOperations } from "@/content/projects/zoho-revenue-operations";
import type {
  PortfolioProject,
  PortfolioValidationIssue,
  ProjectStatus,
} from "@/types/portfolio";

export const flagshipProjects = [
  sm2RaceControl,
  dispatchAlex,
  broussElevators,
] as const satisfies readonly PortfolioProject[];

export const supportingProjects = [
  venaiConsultationAutomation,
  aiVideoOperations,
  zohoRevenueOperations,
] as const satisfies readonly PortfolioProject[];

export const systemsLabProjects = [
  applyPilot,
] as const satisfies readonly PortfolioProject[];

export const portfolioProjects = [
  ...flagshipProjects,
  ...supportingProjects,
  ...systemsLabProjects,
] as const satisfies readonly PortfolioProject[];

export const approvedStatusLabels: Record<ProjectStatus, string[]> = {
  "live-production": ["Live Production Client Platform"],
  "production-implementation-qa-baseline": [
    "Production Implementation + QA Baseline",
  ],
  "implemented-final-validation-pending": [
    "Live-tested chatbot and voice system; synchronization final validation pending",
    "Implemented and Configured - Final Live Validation Pending",
  ],
  "advanced-prototype-production-hardening": [
    "Advanced Prototype / Production Hardening",
  ],
  "delivered-audit-and-automation": [
    "Delivered CRM Audit and Automation",
  ],
  "systems-lab": ["Systems Lab / Personal R&D"],
};

export function getProjectBySlug(
  slug: string,
): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getWorkProjects(): PortfolioProject[] {
  return portfolioProjects.filter(
    (project) => project.tier !== "systems-lab",
  );
}

export function getLabProjects(): PortfolioProject[] {
  return portfolioProjects.filter(
    (project) => project.tier === "systems-lab",
  );
}

export function getAdjacentProjects(
  slug: string,
): {
  previous: PortfolioProject | null;
  next: PortfolioProject | null;
} {
  const index = portfolioProjects.findIndex(
    (project) => project.slug === slug,
  );

  if (index < 0) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous:
      portfolioProjects[
        (index - 1 + portfolioProjects.length) % portfolioProjects.length
      ] ?? null,
    next: portfolioProjects[(index + 1) % portfolioProjects.length] ?? null,
  };
}

export function validatePortfolioProjects(
  projects: readonly PortfolioProject[] = portfolioProjects,
): PortfolioValidationIssue[] {
  const issues: PortfolioValidationIssue[] = [];
  const seenSlugs = new Set<string>();
  const seenRoutes = new Set<string>();

  projects.forEach((project) => {
    const requiredStringFields = [
      "slug",
      "route",
      "title",
      "shortTitle",
      "summary",
      "metaDescription",
      "businessValue",
      "role",
      "statusLabel",
    ] as const;

    requiredStringFields.forEach((field) => {
      if (project[field].trim() === "") {
        issues.push({
          slug: project.slug || "unknown",
          field,
          message: `${field} is required.`,
        });
      }
    });

    if (seenSlugs.has(project.slug)) {
      issues.push({
        slug: project.slug,
        field: "slug",
        message: "Duplicate project slug.",
      });
    }

    if (seenRoutes.has(project.route)) {
      issues.push({
        slug: project.slug,
        field: "route",
        message: "Duplicate project route.",
      });
    }

    seenSlugs.add(project.slug);
    seenRoutes.add(project.route);

    const expectedRoutePrefix =
      project.tier === "systems-lab" ? "/lab/" : "/work/";

    if (!project.route.startsWith(expectedRoutePrefix)) {
      issues.push({
        slug: project.slug,
        field: "route",
        message: `Route must start with ${expectedRoutePrefix}.`,
      });
    }

    if (!project.route.endsWith(project.slug)) {
      issues.push({
        slug: project.slug,
        field: "route",
        message: "Route must end with the project slug.",
      });
    }

    const approvedLabels = approvedStatusLabels[project.status];

    if (!approvedLabels.includes(project.statusLabel)) {
      issues.push({
        slug: project.slug,
        field: "statusLabel",
        message: "Status label is not in the approved status list.",
      });
    }

    const requiredLists = [
      "challenge",
      "responsibilities",
      "solution",
      "architecture",
      "workflow",
      "decisions",
      "reliability",
      "security",
      "testing",
      "technologies",
      "evidence",
    ] as const;

    requiredLists.forEach((field) => {
      if (project[field].length === 0) {
        issues.push({
          slug: project.slug,
          field,
          message: `${field} must include at least one item.`,
        });
      }
    });

    project.evidence.forEach((asset) => {
      if (asset.projectSlug !== project.slug) {
        issues.push({
          slug: project.slug,
          field: `evidence.${asset.id}`,
          message: "Evidence asset projectSlug must match project slug.",
        });
      }

      if (
        asset.state === "verified-public" &&
        (!asset.src || !asset.alt || !asset.caption)
      ) {
        issues.push({
          slug: project.slug,
          field: `evidence.${asset.id}`,
          message:
            "Verified public evidence requires src, alt text, and caption.",
        });
      }
    });
  });

  return issues;
}
