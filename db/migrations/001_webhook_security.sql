BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS webhook_idempotency (
    source_system TEXT NOT NULL,
    idempotency_key TEXT NOT NULL,
    event_timestamp TIMESTAMPTZ NOT NULL,
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT webhook_idempotency_primary_key
        PRIMARY KEY (source_system, idempotency_key),

    CONSTRAINT webhook_idempotency_source_length
        CHECK (char_length(source_system) BETWEEN 2 AND 64),

    CONSTRAINT webhook_idempotency_key_length
        CHECK (char_length(idempotency_key) BETWEEN 10 AND 128)
);

CREATE INDEX IF NOT EXISTS webhook_idempotency_expiry_index
ON webhook_idempotency (expires_at);

CREATE TABLE IF NOT EXISTS webhook_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_system TEXT NOT NULL,
    idempotency_key TEXT NOT NULL,
    event_timestamp TIMESTAMPTZ NOT NULL,
    payload JSONB NOT NULL,
    processing_status TEXT NOT NULL DEFAULT 'received',
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processing_started_at TIMESTAMPTZ,
    processing_completed_at TIMESTAMPTZ,
    failure_code TEXT,
    failure_message TEXT,

    CONSTRAINT webhook_events_status_check
        CHECK (
            processing_status IN (
                'received',
                'processing',
                'completed',
                'failed',
                'dead_letter'
            )
        )
);

CREATE INDEX IF NOT EXISTS webhook_events_processing_queue_index
ON webhook_events (processing_status, received_at);

CREATE INDEX IF NOT EXISTS webhook_events_source_lookup_index
ON webhook_events (source_system, idempotency_key);

COMMIT;
