import { randomUUID } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";

import { acceptWebhookEvent } from "@/lib/idempotency-store";
import {
  validateIdempotencyPayload,
  verifyWebhookSignature,
} from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_WEBHOOK_BODY_BYTES = 64 * 1_024;

interface ErrorResponse {
  ok: false;
  request_id: string;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

function secureJsonResponse<T>(
  body: T,
  status: number,
  requestId: string,
): NextResponse<T> {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-Request-Id": requestId,
    },
  });
}

function errorResponse(
  requestId: string,
  status: number,
  code: string,
  message: string,
  details?: unknown,
): NextResponse<ErrorResponse> {
  return secureJsonResponse(
    {
      ok: false,
      request_id: requestId,
      error: {
        code,
        message,
        ...(details === undefined ? {} : { details }),
      },
    },
    status,
    requestId,
  );
}

function isMissingDatabaseConfiguration(
  error: unknown,
): error is Error {
  return (
    error instanceof Error &&
    error.message === "DATABASE_URL is not configured."
  );
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse> {
  const requestId = randomUUID();

  try {
    const webhookSecret = process.env.DISPATCH_WEBHOOK_SECRET;

    if (!webhookSecret || webhookSecret.length < 32) {
      console.error(
        `[${requestId}] Secure webhook secret is not configured correctly.`,
      );

      return errorResponse(
        requestId,
        503,
        "service_unavailable",
        "Webhook verification is unavailable.",
      );
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().startsWith("application/json")) {
      return errorResponse(
        requestId,
        415,
        "unsupported_media_type",
        "Content-Type must be application/json.",
      );
    }

    const declaredLength = Number(
      request.headers.get("content-length") ?? "0",
    );

    if (
      Number.isFinite(declaredLength) &&
      declaredLength > MAX_WEBHOOK_BODY_BYTES
    ) {
      return errorResponse(
        requestId,
        413,
        "payload_too_large",
        "Webhook payload exceeds the permitted size.",
      );
    }

    const rawPayload = await request.text();

    if (
      Buffer.byteLength(rawPayload, "utf8") >
      MAX_WEBHOOK_BODY_BYTES
    ) {
      return errorResponse(
        requestId,
        413,
        "payload_too_large",
        "Webhook payload exceeds the permitted size.",
      );
    }

    const signature = request.headers.get("x-webhook-signature");

    if (!signature) {
      return errorResponse(
        requestId,
        401,
        "missing_signature",
        "Webhook signature is required.",
      );
    }

    if (
      !verifyWebhookSignature(
        rawPayload,
        signature,
        webhookSecret,
      )
    ) {
      return errorResponse(
        requestId,
        401,
        "invalid_signature",
        "Webhook signature verification failed.",
      );
    }

    let parsedPayload: unknown;

    try {
      parsedPayload = JSON.parse(rawPayload);
    } catch {
      return errorResponse(
        requestId,
        400,
        "invalid_json",
        "Webhook body is not valid JSON.",
      );
    }

    const idempotencyValidation =
      validateIdempotencyPayload(parsedPayload);

    if (!idempotencyValidation.success) {
      return errorResponse(
        requestId,
        422,
        "invalid_idempotency_metadata",
        "Webhook idempotency metadata is invalid.",
        idempotencyValidation.issues,
      );
    }

    const acceptedEvent = await acceptWebhookEvent(
      idempotencyValidation.data,
      parsedPayload,
    );

    if (!acceptedEvent.accepted) {
      return secureJsonResponse(
        {
          ok: true,
          request_id: requestId,
          status: "duplicate_ignored",
          message:
            "This event was previously accepted and will not be processed again.",
        },
        200,
        requestId,
      );
    }

    return secureJsonResponse(
      {
        ok: true,
        request_id: requestId,
        status: "accepted",
        event_id: acceptedEvent.eventId,
      },
      202,
      requestId,
    );
  } catch (error: unknown) {
    if (isMissingDatabaseConfiguration(error)) {
      console.error(
        `[${requestId}] Webhook persistence is not configured.`,
      );

      return errorResponse(
        requestId,
        503,
        "service_unavailable",
        "Webhook persistence is unavailable.",
      );
    }

    console.error(
      `[${requestId}] Secure webhook endpoint failed.`,
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
          }
        : {
            message: "Unknown server error",
          },
    );

    return errorResponse(
      requestId,
      500,
      "internal_server_error",
      "The webhook could not be accepted.",
    );
  }
}
