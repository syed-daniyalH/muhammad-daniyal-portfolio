import assert from "node:assert/strict";
import test from "node:test";

import {
  flagshipProjects,
  getCaseStudyProjects,
  getLabProjects,
  getProjectBySlug,
  portfolioProjects,
  supportingProjects,
  systemsLabProjects,
  validatePortfolioProjects,
} from "../content";
import type { PortfolioProject } from "../types/portfolio";

const REQUIRED_ROUTES = [
  "/case-studies/sm2-race-control",
  "/case-studies/dispatch-alex",
  "/case-studies/brouss-elevators",
  "/case-studies/brouss-voice-agent",
  "/case-studies/venai-consultation-automation",
  "/case-studies/ai-video-operations",
  "/case-studies/zoho-revenue-operations",
  "/lab/applypilot",
] as const;

const projects: readonly PortfolioProject[] = portfolioProjects;

test("portfolio registry contains the required project inventory", () => {
  assert.equal(projects.length, 9);
  assert.equal(flagshipProjects.length, 4);
  assert.equal(supportingProjects.length, 4);
  assert.equal(systemsLabProjects.length, 1);

  const routes = projects.map((project) => project.route);

  REQUIRED_ROUTES.forEach((route) => {
    assert.ok(routes.includes(route));
  });
});

test("portfolio project content passes validation", () => {
  assert.deepEqual(validatePortfolioProjects(), []);
});

test("project lookup resolves every slug", () => {
  projects.forEach((project) => {
    assert.equal(getProjectBySlug(project.slug)?.route, project.route);
  });
});

test("case study and lab route groups stay separated", () => {
  assert.ok(
    getCaseStudyProjects().every((project) => project.route.startsWith("/case-studies/")),
  );
  assert.ok(
    getLabProjects().every((project) => project.route.startsWith("/lab/")),
  );
});

test("published project metrics identify their evidence source", () => {
  projects.forEach((project) => {
    project.metrics?.forEach((metric) => {
      assert.notEqual(metric.source.trim(), "");
      assert.notEqual(metric.state, "private-evidence-required");
    });
  });
});

test("no public evidence asset points to a secret-like path", () => {
  const forbiddenPathPattern =
    /(?:env|secret|token|credential|webhook|database_url)/i;

  projects.forEach((project) => {
    project.evidence.forEach((asset) => {
      if (asset.src) {
        assert.equal(
          forbiddenPathPattern.test(asset.src),
          false,
          `${project.slug}:${asset.id} has suspicious src`,
        );
      }
    });
  });
});
