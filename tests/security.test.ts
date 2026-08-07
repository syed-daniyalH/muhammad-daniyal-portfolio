import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import test from "node:test";
import { NextRequest } from "next/server";

import { POST as postSandboxDispatch } from "../app/api/sandbox/dispatch/route";
import { POST as postDispatchWebhook } from "../app/api/webhooks/dispatch/route";
import {
  validateIdempotencyPayload,
  verifyWebhookSignature,
} from "../lib/security";

test("verifyWebhookSignature accepts a valid hex signature", () => {
  const payload = JSON.stringify({
    event: "dispatch.created",
  });

  const secret = "a-secure-test-secret-with-more-than-32-characters";

  const signature = createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");

  assert.equal(
    verifyWebhookSignature(payload, signature, secret),
    true,
  );
});

test("verifyWebhookSignature accepts sha256-prefixed signatures", () => {
  const payload = "signed-payload";
  const secret = "another-secure-test-secret-with-32-plus-characters";

  const digest = createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");

  assert.equal(
    verifyWebhookSignature(
      payload,
      `sha256=${digest}`,
      secret,
    ),
    true,
  );
});

test("verifyWebhookSignature rejects an altered payload", () => {
  const payload = "signed-payload";
  const secret = "another-secure-test-secret-with-32-plus-characters";

  const digest = createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");

  assert.equal(
    verifyWebhookSignature(
      "altered-payload",
      digest,
      secret,
    ),
    false,
  );
});

test("validateIdempotencyPayload accepts valid UUID metadata", () => {
  const now = new Date("2026-07-29T14:00:00.000Z");

  const result = validateIdempotencyPayload(
    {
      idempotency_key: randomUUID(),
      source_system: "portfolio_sandbox",
      timestamp: now.toISOString(),
    },
    {
      nowMs: now.getTime(),
    },
  );

  assert.equal(result.success, true);
});

test("validateIdempotencyPayload rejects expired timestamps", () => {
  const now = new Date("2026-07-29T14:00:00.000Z");

  const result = validateIdempotencyPayload(
    {
      idempotency_key: randomUUID(),
      source_system: "portfolio_sandbox",
      timestamp: "2026-07-20T14:00:00.000Z",
    },
    {
      nowMs: now.getTime(),
      maxAgeMs: 60_000,
    },
  );

  assert.equal(result.success, false);
});

const ROUTE_TEST_SECRET =
  "route-test-secret-with-more-than-32-characters";

function signPayload(payload: string): string {
  return `sha256=${createHmac("sha256", ROUTE_TEST_SECRET)
    .update(payload, "utf8")
    .digest("hex")}`;
}

function buildDispatchRequest(
  payload: string,
  headers: Record<string, string> = {},
): NextRequest {
  return new NextRequest(
    "http://localhost:3000/api/webhooks/dispatch",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...headers,
      },
      body: payload,
    },
  );
}

async function withDispatchRouteEnv(
  callback: () => Promise<void>,
): Promise<void> {
  const originalSecret = process.env.DISPATCH_WEBHOOK_SECRET;
  const originalDatabaseUrl = process.env.DATABASE_URL;

  process.env.DISPATCH_WEBHOOK_SECRET = ROUTE_TEST_SECRET;
  delete process.env.DATABASE_URL;

  try {
    await callback();
  } finally {
    if (originalSecret === undefined) {
      delete process.env.DISPATCH_WEBHOOK_SECRET;
    } else {
      process.env.DISPATCH_WEBHOOK_SECRET = originalSecret;
    }

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  }
}

test("dispatch webhook rejects missing signatures before parsing", async () => {
  await withDispatchRouteEnv(async () => {
    const response = await postDispatchWebhook(
      buildDispatchRequest("{not-json"),
    );
    const body = (await response.json()) as {
      error: { code: string };
    };

    assert.equal(response.status, 401);
    assert.equal(body.error.code, "missing_signature");
    assert.equal(
      response.headers.get("cache-control"),
      "no-store, max-age=0",
    );
  });
});

test("dispatch webhook rejects invalid signatures", async () => {
  await withDispatchRouteEnv(async () => {
    const payload = JSON.stringify({
      idempotency_key: randomUUID(),
      source_system: "make_dispatch",
      timestamp: new Date().toISOString(),
    });

    const response = await postDispatchWebhook(
      buildDispatchRequest(payload, {
        "x-webhook-signature": signPayload(`${payload} `),
      }),
    );
    const body = (await response.json()) as {
      error: { code: string };
    };

    assert.equal(response.status, 401);
    assert.equal(body.error.code, "invalid_signature");
  });
});

test("dispatch webhook rejects invalid JSON after signature verification", async () => {
  await withDispatchRouteEnv(async () => {
    const payload = "{not-json";
    const response = await postDispatchWebhook(
      buildDispatchRequest(payload, {
        "x-webhook-signature": signPayload(payload),
      }),
    );
    const body = (await response.json()) as {
      error: { code: string };
    };

    assert.equal(response.status, 400);
    assert.equal(body.error.code, "invalid_json");
  });
});

test("dispatch webhook rejects invalid idempotency metadata", async () => {
  await withDispatchRouteEnv(async () => {
    const payload = JSON.stringify({
      idempotency_key: "not-a-valid-key",
      source_system: "make_dispatch",
      timestamp: new Date().toISOString(),
    });

    const response = await postDispatchWebhook(
      buildDispatchRequest(payload, {
        "x-webhook-signature": signPayload(payload),
      }),
    );
    const body = (await response.json()) as {
      error: { code: string };
    };

    assert.equal(response.status, 422);
    assert.equal(body.error.code, "invalid_idempotency_metadata");
  });
});

test("dispatch webhook fails safely without database configuration", async () => {
  await withDispatchRouteEnv(async () => {
    const payload = JSON.stringify({
      idempotency_key: randomUUID(),
      source_system: "make_dispatch",
      timestamp: new Date().toISOString(),
    });

    const response = await postDispatchWebhook(
      buildDispatchRequest(payload, {
        "x-webhook-signature": signPayload(payload),
      }),
    );
    const body = (await response.json()) as {
      error: { code: string };
    };

    assert.equal(response.status, 503);
    assert.equal(body.error.code, "service_unavailable");
  });
});

const SANDBOX_ROUTE_TEST_SECRET =
  "sandbox-route-test-secret-with-more-than-32-characters";

function buildSandboxRequest(
  headers: Record<string, string> = {},
): NextRequest {
  return new NextRequest(
    "http://localhost:3000/api/sandbox/dispatch",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        idempotency_key: randomUUID(),
        source_system: "portfolio_sandbox",
        timestamp: new Date().toISOString(),
        message:
          "Bonjour, we need a vehicle diagnostic service for DEMO-204.",
      }),
    },
  );
}

async function withSandboxRouteEnv(
  callback: () => Promise<void>,
): Promise<void> {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const originalSecret = process.env.SANDBOX_WEBHOOK_SECRET;
  const mutableEnv = process.env as Record<string, string | undefined>;

  mutableEnv.NODE_ENV = "production";
  process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
  process.env.SANDBOX_WEBHOOK_SECRET = SANDBOX_ROUTE_TEST_SECRET;

  try {
    await callback();
  } finally {
    if (originalNodeEnv === undefined) {
      delete mutableEnv.NODE_ENV;
    } else {
      mutableEnv.NODE_ENV = originalNodeEnv;
    }

    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }

    if (originalSecret === undefined) {
      delete process.env.SANDBOX_WEBHOOK_SECRET;
    } else {
      process.env.SANDBOX_WEBHOOK_SECRET = originalSecret;
    }
  }
}

test("sandbox dispatch rejects cross-origin browser requests in production", async () => {
  await withSandboxRouteEnv(async () => {
    const response = await postSandboxDispatch(
      buildSandboxRequest({
        origin: "https://example.invalid",
        "x-portfolio-sandbox": "dispatch-demo-v1",
      }),
    );

    assert.equal(response.status, 403);
  });
});

test("sandbox dispatch requires the portfolio sandbox header", async () => {
  await withSandboxRouteEnv(async () => {
    const response = await postSandboxDispatch(
      buildSandboxRequest({
        origin: "http://localhost:3000",
      }),
    );

    assert.equal(response.status, 403);
  });
});

test("sandbox dispatch accepts sanitized same-origin requests", async () => {
  await withSandboxRouteEnv(async () => {
    const response = await postSandboxDispatch(
      buildSandboxRequest({
        origin: "http://localhost:3000",
        "x-portfolio-sandbox": "dispatch-demo-v1",
      }),
    );
    const body = (await response.json()) as {
      ok: boolean;
      security?: {
        hmac_sha256: string;
        idempotency_metadata: string;
        persistent_execution: boolean;
      };
    };

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.deepEqual(body.security, {
      hmac_sha256: "verified",
      idempotency_metadata: "valid",
      persistent_execution: false,
    });
  });
});
