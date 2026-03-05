# Security

## Secrets and environment

- **Never commit** `.env`, `.env.local`, `.env*.local`, or `studio/.env.local`. They may contain:
  - `SANITY_API_READ_TOKEN`
  - `SANITY_PREVIEW_SECRET` (used by revalidate and draft enable)
  - Other API keys
- Root `.env.local` is copied into `studio/.env.local` by `scripts/copy-env-for-studio.js`; both must remain gitignored.
- Use `.env.example` (and `studio/.env.example`) as templates only; no real secrets there.

## API routes

- **/api/revalidate** — Requires `secret` (query or header) equal to `SANITY_PREVIEW_SECRET` or `SANITY_REVALIDATE_SECRET`. Prefer sending the secret in a header (e.g. `Authorization: Bearer <secret>` or `x-sanity-secret`) to avoid leaking it in server logs.
- **/api/draft/enable** — Requires `secret` in query; only enables draft mode when valid.
- **/api/draft/disable** — No auth; intentionally public (exits preview mode).

## Headers

Security headers (X-Content-Type-Options, Referrer-Policy, Permissions-Policy) are set in `next.config.ts`. CSP and HSTS are left for a later pass to avoid breaking Sanity or analytics.

## Reporting

If you find a security issue, report it privately to the project maintainers; do not open a public issue for sensitive findings.
