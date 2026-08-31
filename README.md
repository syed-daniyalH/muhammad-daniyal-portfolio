# Muhammad Daniyal - Automation Engineer & GoHighLevel Specialist Portfolio

A complete two-module Next.js 15 portfolio build combining executive UX, interactive case-study evidence, a WaveSurfer audio player, a server-connected webhook sandbox, and a production-oriented webhook verification layer.

## Stack

- Next.js 15 App Router
- React 19 and strict TypeScript
- Tailwind CSS 4
- Framer Motion
- Lenis smooth scrolling
- Radix UI Tabs
- WaveSurfer.js
- Simple Icons and Lucide
- Neon serverless PostgreSQL
- HMAC SHA-256 raw-body verification
- Atomic database-backed idempotency

## Included modules

### Module 1

- Lenis provider
- Responsive fixed navigation
- Generic HMAC SHA-256 verification utility
- Strict idempotency metadata validation
- Neon-backed atomic duplicate suppression
- Secured production webhook Route Handler
- Same-origin sanitized sandbox Route Handler
- SQL migration and security tests

### Module 2

- Executive hero and technology matrix
- Reliability target bar
- Radix multi-asset case-study tabs
- Interactive architecture flow
- Dynamic WaveSurfer audio player
- Synthetic transcript and LLM trace
- Syntax-highlighted FastAPI reference implementation
- Responsive footer and metadata

## Important truthfulness rule

The values `Sub-200ms`, `99.8%`, `100%`, and `<1s` are displayed as instrumentation targets. They are not marked as verified production results. Replace the target label only after connecting repeatable monitoring evidence.

## Local setup

1. Install Node.js 20.9 or newer and pnpm 10.
2. Install dependencies:

```bash
pnpm install
```

3. Copy the environment template:

```bash
cp .env.example .env.local
```

4. Generate two independent secrets:

```bash
openssl rand -hex 32
openssl rand -hex 32
```

5. Add the secrets and Neon pooled connection string to `.env.local`.

6. Run the database migration against Neon:

```bash
psql "$DATABASE_URL" -f db/migrations/001_webhook_security.sql
```

7. Start development:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Or:

```bash
pnpm validate
```

## Production webhook contract

Endpoint:

```text
POST /api/webhooks/dispatch
```

Required headers:

```text
Content-Type: application/json
X-Webhook-Signature: sha256=<HMAC_SHA256_HEX>
```

Required payload metadata:

```json
{
  "idempotency_key": "c74c3dea-f565-4ce1-9ca4-c743f20b3071",
  "source_system": "make_dispatch",
  "timestamp": "2026-07-29T14:00:00.000Z"
}
```

Sign the exact raw request body:

```bash
pnpm sign:webhook \
  '{"idempotency_key":"c74c3dea-f565-4ce1-9ca4-c743f20b3071","source_system":"make_dispatch","timestamp":"2026-07-29T14:00:00.000Z"}' \
  'your-32-character-or-longer-secret'
```

For shells that rewrite quoted JSON, pipe the exact body through stdin:

```bash
printf '%s' '{"idempotency_key":"c74c3dea-f565-4ce1-9ca4-c743f20b3071","source_system":"make_dispatch","timestamp":"2026-07-29T14:00:00.000Z"}' |
  pnpm sign:webhook --stdin 'your-32-character-or-longer-secret'
```

### Twilio warning

The generic HMAC function is suitable for Make.com and custom raw-body HMAC integrations. Standard Twilio Voice and Messaging callbacks use Twilio's URL-and-parameter canonicalization. Validate those callbacks with the official Twilio server SDK.

## Audio

The included file at:

```text
public/media/brouss-synthflow-test-sanitized.wav
```

is a synthetic waveform placeholder with no speech or customer information. Replace it only with a client-approved, anonymized recording.

## Security notes

- Never expose `DISPATCH_WEBHOOK_SECRET`, `SANDBOX_WEBHOOK_SECRET`, or `DATABASE_URL` to Client Components.
- Verify the raw body before JSON parsing.
- Keep separate secrets for production and sandbox routes.
- The sandbox endpoint performs no production write.
- The idempotency CTE atomically claims an event and writes it to the queue.
- Configure a scheduled job to prune expired idempotency keys.
- Review `SECURITY.md` and `docs/DEPLOYMENT.md` before deployment.
