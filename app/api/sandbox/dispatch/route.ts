import { createHmac, randomUUID } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";

import {
  validateIdempotencyPayload,
  verifyWebhookSignature,
} from "@/lib/security";
import { getSiteOrigin } from "@/lib/site-url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SANDBOX_BODY_BYTES = 16 * 1_024;

interface SandboxInput {
  idempotency_key: string;
  source_system: string;
  timestamp: string;
  message: string;
}

interface SandboxOutput {
  ok: true;
  mode: "sanitized_simulation";
  request_id: string;
  security: {
    hmac_sha256: "verified";
    idempotency_metadata: "valid";
    persistent_execution: false;
  };
  dispatch: {
    language: "en" | "fr" | "mixed";
    intent: "service_request";
    customer_type: "dealership";
    dealership_code: string;
    service_code: string;
    confidence: number;
    human_review_required: boolean;
  };
  response: {
    status: 200;
    message: string;
  };
}

function detectLanguage(
  message: string,
): SandboxOutput["dispatch"]["language"] {
  const englishTerms =
    /\b(need|service|vehicle|appointment|repair|please)\b/i;

  const frenchTerms =
    /\b(besoin|service|vehicule|rendez-vous|reparation|bonjour)\b/i;

  const containsEnglish = englishTerms.test(message);
  const containsFrench = frenchTerms.test(message);

  if (containsEnglish && containsFrench) {
    return "mixed";
  }

  return containsFrench ? "fr" : "en";
}

function isTrustedBrowserOrigin(
  request: NextRequest,
): boolean {
  const requestOrigin = request.headers.get("origin");

  if (!requestOrigin) {
    return process.env.NODE_ENV !== "production";
  }

  try {
    return new URL(requestOrigin).origin === getSiteOrigin();
  } catch {
    return false;
  }
}

function readSandboxInput(
  input: unknown,
): SandboxInput | null {
  if (
    typeof input !== "object" ||
    input === null ||
    Array.isArray(input)
  ) {
    return null;
  }

  const value = input as Record<string, unknown>;

  if (
    typeof value.idempotency_key !== "string" ||
    typeof value.source_system !== "string" ||
    typeof value.timestamp !== "string" ||
    typeof value.message !== "string"
  ) {
    return null;
  }

  const message = value.message.trim();

  if (message.length < 3 || message.length > 500) {
    return null;
  }

  return {
    idempotency_key: value.idempotency_key,
    source_system: value.source_system,
    timestamp: value.timestamp,
    message,
  };
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse> {
  const requestId = randomUUID();

  if (!isTrustedBrowserOrigin(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "origin_not_allowed",
        request_id: requestId,
      },
      { status: 403 },
    );
  }

  if (
    request.headers.get("x-portfolio-sandbox") !==
    "dispatch-demo-v1"
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_sandbox_request",
        request_id: requestId,
      },
      { status: 403 },
    );
  }

  const rawBody = await request.text();

  if (
    Buffer.byteLength(rawBody, "utf8") >
    MAX_SANDBOX_BODY_BYTES
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "payload_too_large",
        request_id: requestId,
      },
      { status: 413 },
    );
  }

  let parsedBody: unknown;

  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_json",
        request_id: requestId,
      },
      { status: 400 },
    );
  }

  const input = readSandboxInput(parsedBody);

  if (!input) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_payload",
        request_id: requestId,
      },
      { status: 422 },
    );
  }

  const idempotencyValidation =
    validateIdempotencyPayload(input);

  if (!idempotencyValidation.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_idempotency_metadata",
        issues: idempotencyValidation.issues,
        request_id: requestId,
      },
      { status: 422 },
    );
  }

  const sandboxSecret =
    process.env.SANDBOX_WEBHOOK_SECRET;

  if (!sandboxSecret || sandboxSecret.length < 32) {
    return NextResponse.json(
      {
        ok: false,
        error: "sandbox_not_configured",
        request_id: requestId,
      },
      { status: 503 },
    );
  }

  /*
   * This signs and verifies a sanitized internal demonstration payload.
   * It is deliberately not presented as an external trust boundary.
   */
  const internalSignature =
    `sha256=${createHmac("sha256", sandboxSecret)
      .update(rawBody, "utf8")
      .digest("hex")}`;

  if (
    !verifyWebhookSignature(
      rawBody,
      internalSignature,
      sandboxSecret,
    )
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "sandbox_signature_failure",
        request_id: requestId,
      },
      { status: 500 },
    );
  }

  const language = detectLanguage(input.message);

  const output: SandboxOutput = {
    ok: true,
    mode: "sanitized_simulation",
    request_id: requestId,
    security: {
      hmac_sha256: "verified",
      idempotency_metadata: "valid",
      persistent_execution: false,
    },
    dispatch: {
      language,
      intent: "service_request",
      customer_type: "dealership",
      dealership_code: "DEMO-204",
      service_code: "VEHICLE_DIAGNOSTIC",
      confidence: 0.96,
      human_review_required: true,
    },
    response: {
      status: 200,
      message:
        language === "fr"
          ? "Demande structuree et transmise pour validation."
          : "Request structured and routed for validation.",
    },
  };

  return NextResponse.json(output, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-Request-Id": requestId,
    },
  });
}
