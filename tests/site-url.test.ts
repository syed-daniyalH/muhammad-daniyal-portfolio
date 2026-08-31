import assert from "node:assert/strict";
import test from "node:test";

import { getSiteOrigin, getSiteUrl } from "../lib/site-url";

function withEnv(
  values: Record<string, string | undefined>,
  callback: () => void,
): void {
  const originalValues = Object.fromEntries(
    Object.keys(values).map((key) => [key, process.env[key]]),
  );

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined) {
      delete process.env[key];
      return;
    }

    process.env[key] = value;
  });

  try {
    callback();
  } finally {
    Object.entries(originalValues).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key];
        return;
      }

      process.env[key] = value;
    });
  }
}

test("getSiteUrl normalizes a hostname-only site url", () => {
  withEnv(
    {
      NEXT_PUBLIC_SITE_URL: "muhammad-daniyal-portfolio.vercel.app",
      VERCEL_PROJECT_PRODUCTION_URL: undefined,
      VERCEL_URL: undefined,
    },
    () => {
      assert.equal(
        getSiteUrl(),
        "https://muhammad-daniyal-portfolio.vercel.app",
      );
      assert.equal(
        getSiteOrigin(),
        "https://muhammad-daniyal-portfolio.vercel.app",
      );
    },
  );
});

test("getSiteUrl ignores blank values and falls back to vercel env", () => {
  withEnv(
    {
      NEXT_PUBLIC_SITE_URL: "   ",
      VERCEL_PROJECT_PRODUCTION_URL:
        "muhammad-daniyal-portfolio-6l6f-js2kxxsq6.vercel.app",
      VERCEL_URL: undefined,
    },
    () => {
      assert.equal(
        getSiteUrl(),
        "https://muhammad-daniyal-portfolio-6l6f-js2kxxsq6.vercel.app",
      );
    },
  );
});

test("getSiteUrl falls back to localhost when env values are invalid", () => {
  withEnv(
    {
      NEXT_PUBLIC_SITE_URL: "::::",
      VERCEL_PROJECT_PRODUCTION_URL: undefined,
      VERCEL_URL: undefined,
    },
    () => {
      assert.equal(getSiteUrl(), "http://localhost:3000");
    },
  );
});
