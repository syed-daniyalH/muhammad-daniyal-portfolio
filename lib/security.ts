import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const TWILIO_SID_PATTERN = /^[A-Z]{2}[0-9a-fA-F]{32}$/;
const SOURCE_SYSTEM_PATTERN = /^[a-z0-9][a-z0-9._-]{1,63}$/;

const ISO_TIMESTAMP_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})$/;

const SHA256_DIGEST_BYTES = 32;

export interface IdempotencySchema {
  idempotency_key: string;
  source_system: string;
  timestamp: string;
}

export interface IdempotencyValidationOptions {
  maxAgeMs?: number;
  futureToleranceMs?: number;
  nowMs?: number;
}

export interface IdempotencyValidationIssue {
  field:
    | "payload"
    | "idempotency_key"
    | "source_system"
    | "timestamp";
  code:
    | "invalid_type"
    | "invalid_format"
    | "missing_value"
    | "expired_timestamp"
    | "future_timestamp";
  message: string;
}

export type IdempotencyValidationResult =
  | {
      success: true;
      data: IdempotencySchema;
    }
  | {
      success: false;
      issues: IdempotencyValidationIssue[];
    };

const DEFAULT_MAX_EVENT_AGE_MS = 24 * 60 * 60 * 1_000;
const DEFAULT_FUTURE_TOLERANCE_MS = 5 * 60 * 1_000;

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function decodeSignature(signature: string): Buffer | null {
  let normalized = signature.trim();

  if (normalized.toLowerCase().startsWith("sha256=")) {
    normalized = normalized.slice("sha256=".length);
  }

  if (/^[0-9a-f]{64}$/i.test(normalized)) {
    return Buffer.from(normalized, "hex");
  }

  if (!/^[A-Za-z0-9+/_-]+={0,2}$/.test(normalized)) {
    return null;
  }

  try {
    const base64 = normalized.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const decoded = Buffer.from(padded, "base64");

    return decoded.length === SHA256_DIGEST_BYTES ? decoded : null;
  } catch {
    return null;
  }
}

/**
 * Verify a raw-body HMAC-SHA256 webhook signature.
 *
 * Supported formats:
 * - hexadecimal digest
 * - sha256=<hex digest>
 * - Base64 digest
 * - URL-safe Base64 digest
 *
 * Pass the exact raw request body. Do not parse and re-serialize JSON first.
 *
 * This utility is suitable for Make.com and custom raw-body HMAC integrations.
 * Standard Twilio callbacks use Twilio's provider-specific signing algorithm
 * and should be validated with the official Twilio SDK.
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): boolean {
  if (
    typeof payload !== "string" ||
    typeof signature !== "string" ||
    typeof secret !== "string" ||
    secret.length === 0
  ) {
    return false;
  }

  const suppliedDigest = decodeSignature(signature);

  if (!suppliedDigest) {
    return false;
  }

  const expectedDigest = createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest();

  if (suppliedDigest.length !== expectedDigest.length) {
    return false;
  }

  return timingSafeEqual(suppliedDigest, expectedDigest);
}

export function validateIdempotencyPayload(
  input: unknown,
  options: IdempotencyValidationOptions = {},
): IdempotencyValidationResult {
  const issues: IdempotencyValidationIssue[] = [];

  if (!isRecord(input)) {
    return {
      success: false,
      issues: [
        {
          field: "payload",
          code: "invalid_type",
          message: "Webhook payload must be a JSON object.",
        },
      ],
    };
  }

  const rawKey = input.idempotency_key;
  const rawSourceSystem = input.source_system;
  const rawTimestamp = input.timestamp;

  if (typeof rawKey !== "string" || rawKey.trim() === "") {
    issues.push({
      field: "idempotency_key",
      code: "missing_value",
      message: "idempotency_key is required.",
    });
  } else {
    const normalizedKey = rawKey.trim();
    const validIdentifier =
      UUID_PATTERN.test(normalizedKey) ||
      TWILIO_SID_PATTERN.test(normalizedKey);

    if (!validIdentifier || normalizedKey.length > 128) {
      issues.push({
        field: "idempotency_key",
        code: "invalid_format",
        message:
          "idempotency_key must be a valid UUID or Twilio-style SID.",
      });
    }
  }

  if (
    typeof rawSourceSystem !== "string" ||
    rawSourceSystem.trim() === ""
  ) {
    issues.push({
      field: "source_system",
      code: "missing_value",
      message: "source_system is required.",
    });
  } else if (
    !SOURCE_SYSTEM_PATTERN.test(
      rawSourceSystem.trim().toLowerCase(),
    )
  ) {
    issues.push({
      field: "source_system",
      code: "invalid_format",
      message:
        "source_system must contain 2-64 lowercase letters, numbers, dots, underscores, or hyphens.",
    });
  }

  let normalizedTimestamp: string | null = null;

  if (
    typeof rawTimestamp !== "string" ||
    rawTimestamp.trim() === ""
  ) {
    issues.push({
      field: "timestamp",
      code: "missing_value",
      message: "timestamp is required.",
    });
  } else if (!ISO_TIMESTAMP_PATTERN.test(rawTimestamp.trim())) {
    issues.push({
      field: "timestamp",
      code: "invalid_format",
      message:
        "timestamp must be an ISO 8601 value containing an explicit timezone.",
    });
  } else {
    const timestampMs = Date.parse(rawTimestamp);
    const nowMs = options.nowMs ?? Date.now();
    const maxAgeMs = options.maxAgeMs ?? DEFAULT_MAX_EVENT_AGE_MS;
    const futureToleranceMs =
      options.futureToleranceMs ?? DEFAULT_FUTURE_TOLERANCE_MS;

    if (!Number.isFinite(timestampMs)) {
      issues.push({
        field: "timestamp",
        code: "invalid_format",
        message: "timestamp could not be parsed.",
      });
    } else if (timestampMs < nowMs - maxAgeMs) {
      issues.push({
        field: "timestamp",
        code: "expired_timestamp",
        message:
          "Webhook timestamp is outside the accepted replay window.",
      });
    } else if (timestampMs > nowMs + futureToleranceMs) {
      issues.push({
        field: "timestamp",
        code: "future_timestamp",
        message:
          "Webhook timestamp is too far ahead of the server clock.",
      });
    } else {
      normalizedTimestamp = new Date(timestampMs).toISOString();
    }
  }

  if (issues.length > 0 || normalizedTimestamp === null) {
    return {
      success: false,
      issues,
    };
  }

  return {
    success: true,
    data: {
      idempotency_key: (rawKey as string).trim(),
      source_system: (rawSourceSystem as string).trim().toLowerCase(),
      timestamp: normalizedTimestamp,
    },
  };
}
