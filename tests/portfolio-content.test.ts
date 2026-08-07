import assert from "node:assert/strict";
import test from "node:test";

import {
  flagshipProjects,
  getLabProjects,
  getProjectBySlug,
  getWorkProjects,
  portfolioProjects,
  supportingProjects,
  systemsLabProjects,
  validatePortfolioProjects,
} from "../content";
import type { PortfolioProject } from "../types/portfolio";

const REQUIRED_ROUTES = [
  "/work/sm2-race-control",
  "/work/dispatch-alex",
  "/work/brouss-elevators",
  "/work/venai-consultation-automation",
  "/work/ai-video-operations",
  "/work/zoho-revenue-operations",
  "/lab/applypilot",
] as const;

const projects: readonly PortfolioProject[] = portfolioProjects;

test("portfolio registry contains the required project inventory", () => {
  assert.equal(projects.length, 7);
  assert.equal(flagshipProjects.length, 3);
  assert.equal(supportingProjects.length, 3);
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

test("work and lab route groups stay separated", () => {
  assert.ok(
    getWorkProjects().every((project) => project.route.startsWith("/work/")),
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
