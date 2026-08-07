# Deployment Guide

## Recommended topology

- Next.js application: Vercel or a Node.js container
- Database: Neon pooled Postgres connection
- Secrets: deployment platform encrypted environment variables
- Monitoring: platform logs plus OpenTelemetry or a comparable trace system

## Required environment variables

```text
NEXT_PUBLIC_SITE_URL
DISPATCH_WEBHOOK_SECRET
SANDBOX_WEBHOOK_SECRET
DATABASE_URL
```

`NEXT_PUBLIC_SITE_URL` must exactly match the production origin used by the browser sandbox.

## Database

Apply:

```bash
psql "$DATABASE_URL" -f db/migrations/001_webhook_security.sql
```

Create a scheduled maintenance task to remove expired idempotency rows. The application includes `pruneExpiredIdempotencyKeys()` for that purpose.

## Pre-deployment validation

```bash
pnpm install
pnpm validate
```

## Production smoke checks

1. `GET /api/health` returns HTTP 200.
2. The landing page loads without console errors.
3. The sandbox terminal reaches a sanitized HTTP 200 response.
4. An unsigned production webhook returns HTTP 401.
5. A correctly signed event returns HTTP 202.
6. Repeating the same source and idempotency key returns `duplicate_ignored`.
7. Security headers are present.
8. The placeholder audio loads.
9. No secret is included in a browser bundle or public repository.

## CSP

The included Content Security Policy supports same-origin application resources and Neon server communication. Update `connect-src`, `img-src`, or `media-src` deliberately when adding external services.
