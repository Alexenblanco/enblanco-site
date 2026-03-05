# Security & Quality Audit Report

**Date:** 2025-03-05  
**Scope:** Next.js App Router (portfolio, blog, i18n). No UI redesign; minimal, conservative fixes.

---

## A) Security audit

### 1) Secret exposure

| Finding | Risk | Notes |
|--------|------|------|
| **studio/.env.local** contains `SANITY_API_READ_TOKEN` and `SANITY_PREVIEW_SECRET` | **High** if committed | Root `.gitignore` has `.env*` and `.env.local`; git applies these in all directories, so `studio/.env.local` is ignored. Explicitly ignore `studio/.env*.local` and document that secrets must never be committed. |
| **copy-env-for-studio.js** copies entire root `.env.local` into `studio/.env.local` | **Medium** | Secrets end up in studio folder. Ensure studio env files are never committed. |
| **NEXT_PUBLIC_*** | Low | Only `NEXT_PUBLIC_SITE_URL` and Sanity project/dataset in app; appropriate for client. |
| **Revalidate/draft** use `SANITY_PREVIEW_SECRET` from env (server-only) | OK | Not exposed to client. |

**Required:** Explicit `.gitignore` entries for `studio/.env.local` and `studio/.env*.local`; short doc (CONTRIBUTING or SECURITY) stating that `.env.local` and `studio/.env.local` must never be committed.

---

### 2) XSS / injection

| Finding | Risk | Notes |
|--------|------|------|
| **dangerouslySetInnerHTML** in `app/layout.tsx` | Low | Used only for JSON-LD; content is `JSON.stringify` of a fixed structure + `siteUrl`/`logoUrl` (from getSiteUrl()). No user or CMS input. |
| **RSS routes** | Low | XML built from notes index; `escapeXml()` used for title, slug, description. |
| **No rich text from CMS** rendered as raw HTML in app | OK | Sanity portable text / blocks would need safe rendering when used; not in scope for this audit. |

**Required:** None for XSS (current uses are safe). Optional: add a one-line comment in layout that JSON-LD is from code only.

---

### 3) API routes

| Route | Method | Auth | Input | Issues |
|-------|--------|------|-------|--------|
| **/api/revalidate** | POST | Query `secret` vs `SANITY_PREVIEW_SECRET` | JSON body `_type`, `language` | Secret in URL (logs). `_type` not allowlisted → could revalidate arbitrary tags. |
| **/api/draft/enable** | GET | Query `secret` | `redirect` | Secret in URL. Enable draft only with valid secret. |
| **/api/draft/disable** | GET | None | — | Intentionally public (exit preview). OK. |

**Required:** In revalidate, allowlist `_type` and return 400 for unknown values. Optional: document using `Authorization` or `x-sanity-secret` header instead of query param.

---

### 4) Security headers

| Header | Status | Action |
|--------|--------|--------|
| **X-Content-Type-Options: nosniff** | Missing | Add |
| **Referrer-Policy: strict-origin-when-cross-origin** | Missing | Add |
| **Permissions-Policy** (minimal deny list) | Missing | Add |
| **Strict-Transport-Security** | Missing | Add only if HTTPS is guaranteed (e.g. behind proxy). Document as optional. |
| **Content-Security-Policy** | Missing | Leave as TODO; avoid breaking Sanity/analytics. |

**Required:** Add the first three in `next.config.ts` (or middleware). HSTS/CSP documented as TODO.

---

### 5) Dependencies

- **npm audit:** Reports vulnerabilities (e.g. glob, @sanity/ui, react-refractor). Many come from `studio` or transitive deps.
- **Action:** Run `npm audit` in project root; apply `npm audit fix` only when it does not bump major versions. Document “run npm audit periodically”.

---

## B) Quality & maintenance audit

### 1) TypeScript

- **tsconfig.json:** `strict: true` ✓. No `noImplicitAny` override (included in strict).
- **`any` usage:** None found in `src`.
- **Optional:** `exactOptionalPropertyTypes` not set; leave as-is to avoid churn.

### 2) ESLint / Prettier

- **eslint.config.mjs** present; uses `eslint-config-next`.
- **package.json "lint": "eslint"** — no path; should be `next lint` for Next.js.
- **Prettier:** Not in package.json; no format script. Add `typecheck` script; leave format optional.

**Required:** Change lint script to `next lint`. Add `typecheck`: `tsc --noEmit`.

### 3) Minimal tests

- No tests or Vitest/React Testing Library.
- **Required:** Add minimal smoke: either Vitest + one RTL smoke test (e.g. render home or key page) or a small Node script that imports key modules and exits 0. Plus ensure `npm run build` is the CI build command.

### 4) Git workflow

- No CONTRIBUTING or workflow doc.
- **Required:** Add short `docs/WORKFLOW.md`: branch naming (feature/*, cleanup/*, hotfix/*), main deployable, experiments on separate branch.

---

## C) Risk summary

### High (must fix)

1. **Secrets:** Ensure `studio/.env.local` and all `.env*.local` are ignored and documented as never to be committed.
2. **Revalidate API:** Allowlist `_type`; return 400 for unknown types.

### Medium

3. **Security headers:** Add X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
4. **Lint/typecheck:** Correct lint script; add typecheck.

### Low / suggestions

5. **draft/revalidate:** Prefer secret in header over query param (document only).
6. **CSP / HSTS:** Document as future improvement; do not enable CSP yet.
7. **npm audit:** Run periodically; fix conservatively.

---

## D) Fix plan (ordered)

1. **.gitignore** — Add `studio/.env.local` and `studio/.env*.local` (explicit).
2. **next.config.ts** — Add security headers (X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
3. **api/revalidate/route.ts** — Allowlist `_type`; return 400 for unknown.
4. **package.json** — `lint`: `next lint`; add `typecheck`: `tsc --noEmit`.
5. **Smoke test** — Add minimal Vitest + one smoke test (e.g. render home or import key route).
6. **docs/WORKFLOW.md** — Short workflow (branches, main deployable).
7. **docs/SECURITY.md** (or section in CONTRIBUTING) — Never commit secrets; env files; optional header for revalidate.

---

## E) Files to change

| Action | File |
|--------|------|
| Modify | .gitignore |
| Modify | next.config.ts |
| Modify | src/app/api/revalidate/route.ts |
| Modify | package.json |
| Create | (vitest config + one smoke test) or scripts/smoke.mjs |
| Create | docs/WORKFLOW.md |
| Create | docs/SECURITY.md |

---

## F) Implementation summary (applied)

- **.gitignore:** Added `studio/.env.local` and `studio/.env*.local`.
- **next.config.ts:** Security headers for `/:path*`: X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **api/revalidate/route.ts:** Allowlist `_type` (project, note, service, industry); 400 for missing or invalid type.
- **package.json:** `lint`: `eslint . --ignore-pattern 'studio/**' --max-warnings 0'` (Next.js 16 has no `next lint`); `typecheck`: `tsc --noEmit`; `test`: `node scripts/smoke.mjs`.
- **scripts/smoke.mjs:** Runs `npm run typecheck`; exits 0 on success.
- **docs/WORKFLOW.md:** Branch naming, main deployable, CI suggestions.
- **docs/SECURITY.md:** Never commit secrets; env files; API secret via header recommended; CSP/HSTS as TODO.

**Note:** Existing ESLint errors (e.g. react-hooks/set-state-in-effect in ProjectsView) remain; fix incrementally. Vitest was not added due to peer dependency conflict with next-sanity/next 16.
