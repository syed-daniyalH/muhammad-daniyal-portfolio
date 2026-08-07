import { neon } from "@neondatabase/serverless";

import type { IdempotencySchema } from "@/lib/security";

interface StoredWebhookEvent {
  accepted: boolean;
  eventId: string | null;
}

interface IdempotencyDatabaseRow {
  event_id: string;
}

let databaseClient: ReturnType<typeof neon> | null = null;

function getDatabaseClient(): ReturnType<typeof neon> {
  if (databaseClient) {
    return databaseClient;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  databaseClient = neon(databaseUrl);
  return databaseClient;
}

/**
 * Atomically claims an idempotency key and inserts the event into the
 * durable processing queue. A duplicate source/key pair creates no event.
 */
export async function acceptWebhookEvent(
  metadata: IdempotencySchema,
  payload: unknown,
): Promise<StoredWebhookEvent> {
  const sql = getDatabaseClient();
  const serializedPayload = JSON.stringify(payload);

  const rows = (await sql`
    WITH claimed_event AS (
      INSERT INTO webhook_idempotency (
        source_system,
        idempotency_key,
        event_timestamp,
        first_seen_at,
        expires_at
      )
      VALUES (
        ${metadata.source_system},
        ${metadata.idempotency_key},
        ${metadata.timestamp}::timestamptz,
        NOW(),
        NOW() + INTERVAL '7 days'
      )
      ON CONFLICT (
        source_system,
        idempotency_key
      )
      DO NOTHING
      RETURNING
        source_system,
        idempotency_key
    )
    INSERT INTO webhook_events (
      source_system,
      idempotency_key,
      event_timestamp,
      payload,
      processing_status,
      received_at
    )
    SELECT
      claimed_event.source_system,
      claimed_event.idempotency_key,
      ${metadata.timestamp}::timestamptz,
      ${serializedPayload}::jsonb,
      'received',
      NOW()
    FROM claimed_event
    RETURNING event_id::text
  `) as IdempotencyDatabaseRow[];

  const event = rows[0];

  if (!event) {
    return {
      accepted: false,
      eventId: null,
    };
  }

  return {
    accepted: true,
    eventId: event.event_id,
  };
}

export async function pruneExpiredIdempotencyKeys(): Promise<number> {
  const sql = getDatabaseClient();

  const rows = (await sql`
    DELETE FROM webhook_idempotency
    WHERE expires_at < NOW()
    RETURNING idempotency_key
  `) as Array<{
    idempotency_key: string;
  }>;

  return rows.length;
}
