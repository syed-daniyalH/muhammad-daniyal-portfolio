# Security Policy

## Secrets

Never commit:

- `.env.local`
- Neon connection strings
- webhook secrets
- Twilio auth tokens
- OpenAI keys
- CRM access tokens
- client recordings containing personal information

Use independent secrets for production webhook verification and the public sandbox.

## Webhook verification

The production route verifies the exact raw body using HMAC SHA-256 and constant-time comparison before parsing JSON.

The generic verifier is not a drop-in replacement for Twilio's request signature algorithm. Use Twilio's official SDK for standard Twilio callback validation.

## Idempotency

Metadata validation alone does not prevent duplicates. The included Neon CTE provides the atomic database claim required for multi-instance deployments.

## Public evidence

Only publish sanitized screenshots, traces, recordings, payloads, and code. Remove:

- personal names
- phone numbers
- email addresses
- customer identifiers
- case IDs
- tokens and webhook URLs
- addresses and payment details

## Reporting

For security concerns related to this portfolio, contact the repository owner privately rather than opening a public issue containing exploit details.
