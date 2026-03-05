# Routing & App Structure Audit Report

**Date:** 2025-03-05  
**Scope:** Next.js App Router, bilingual (es/en), public site + portfolio + blog (notas) + legal.

---

## 1) Audit Summary

### A) Routing inventory

**Route entry points (page.tsx):**

| Location | URL / role |
|--------|------------|
| `app/page.tsx` | `/` → redirect to `/es` |
| `app/[lang]/page.tsx` | `/[lang]` (home) |
| `app/[lang]/proyectos/page.tsx` | `/es/proyectos` |
| `app/[lang]/proyectos/[slug]/page.tsx` | `/es/proyectos/:slug` |
| `app/[lang]/projects/page.tsx` | `/en/projects` |
| `app/[lang]/projects/[slug]/page.tsx` | `/en/projects/:slug` |
| `app/[lang]/servicios/page.tsx` | `/es/servicios` |
| `app/[lang]/servicios/[slug]/page.tsx` | `/es/servicios/:slug` |
| `app/[lang]/services/page.tsx` | `/en/services` |
| `app/[lang]/services/[slug]/page.tsx` | `/en/services/:slug` |
| `app/[lang]/notas/page.tsx` | `/es/notas` |
| `app/[lang]/notas/[slug]/page.tsx` | `/es/notas/:slug` |
| `app/[lang]/notes/page.tsx` | `/en/notes` |
| `app/[lang]/notes/[slug]/page.tsx` | `/en/notes/:slug` |
| `app/[lang]/contacto/page.tsx` | `/es/contacto` |
| `app/[lang]/contact/page.tsx` | `/en/contact` |
| `app/[lang]/areas/page.tsx` | `/[lang]/areas` |
| `app/[lang]/areas/[areaSlug]/page.tsx` | `/[lang]/areas/:areaSlug` |
| `app/[lang]/enblanco/page.tsx` | `/[lang]/enblanco` |
| `app/[lang]/enblanco/equipo/page.tsx` | `/es/enblanco/equipo` |
| `app/[lang]/enblanco/team/page.tsx` | `/en/enblanco/team` |
| `app/[lang]/enblanco/metodologia/page.tsx` | `/es/enblanco/metodologia` |
| `app/[lang]/enblanco/methodology/page.tsx` | `/en/enblanco/methodology` |
| `app/[lang]/enblanco/faq/page.tsx` | `/[lang]/enblanco/faq` |
| `app/[lang]/privacidad/page.tsx` | `/es/privacidad` |
| `app/[lang]/privacy/page.tsx` | `/en/privacy` |
| `app/[lang]/aviso-legal/page.tsx` | `/es/aviso-legal` |
| `app/[lang]/legal-notice/page.tsx` | `/en/legal-notice` |
| `app/[lang]/cookies/page.tsx` | `/[lang]/cookies` |
| `app/[lang]/_dev/sanity/page.tsx` | `/[lang]/_dev/sanity` (dev) |

**Route handlers (route.ts):**

| Location | Purpose |
|----------|---------|
| `app/api/revalidate/route.ts` | Revalidation |
| `app/api/draft/disable/route.ts` | Draft mode |
| `app/api/draft/enable/route.ts` | Draft mode |

**Pages Router:** No `pages/` directory. No conflict.

**Duplicates:** No same URL served twice. Language-specific path pairs (e.g. `/es/servicios` vs `/en/services`) are intentional; wrong-locale access is handled with `redirect()` inside the page.

**Dead/unreachable:** None identified.

---

### B) i18n integrity

- **All public routes under `app/[lang]`:** Yes.
- **No `app/es` or `app/en`:** Confirmed; only `app/[lang]` exists.
- **Single language strategy:** One dynamic segment `[lang]`, validated with `isValidLang(lang)`; invalid lang → `notFound()`.
- **Root redirect:** `/` → `/es` via `app/page.tsx` and `src/middleware.ts`. Correct.

---

### C) Route groups

- **Current:** No route groups; all routes are flat under `app/[lang]/`.
- **Proposal (optional, URLs unchanged):**
  - `app/[lang]/(site)/` — home, proyectos, projects, servicios, services, notas, notes, contacto, contact, areas, enblanco.
  - `app/[lang]/(legal)/` — privacidad, privacy, aviso-legal, legal-notice, cookies.
  - `app/[lang]/_dev/` — keep as-is (internal/dev).
- **Decision:** Documented for future cleanup; not applied in this pass to limit scope and risk.

---

### D) Special routes

| Item | Status | Notes |
|------|--------|-------|
| **404** | Missing | No `app/not-found.tsx`. Next.js falls back to default 404. Add root `not-found.tsx` for consistent UX. |
| **robots.txt** | Exists, gap | `app/robots.ts` exists. Does not block indexing on preview/staging (must be environment-aware). |
| **sitemap.xml** | Exists, gaps | `app/sitemap.ts` exists. Missing: contact, contacto, areas, enblanco, legal pages. EN project slugs use hardcoded `EN_PROJECT_SLUGS = ["ejemplo"]` instead of sharing with `generateStaticParams` (e.g. `PROJECT_SLUGS` + `PROJECTS_EN`). |
| **RSS (notas)** | Missing | No RSS route. Notes content exists (NOTAS_ES / NOTES_EN in page files). Implement per-lang feed. |

---

## 2) What is correct

- App Router only; no Pages Router routes.
- Single `[lang]` segment; no `es`/`en` folders.
- Root redirect `/` → `/es` (page + middleware).
- All public and legal routes under `[lang]`.
- API routes under `app/api/` (revalidate, draft).
- Sitemap and robots exist and are at app root.

---

## 3) What is wrong / risky

- **robots.ts:** Allows all in every environment; preview/staging should disallow indexing.
- **sitemap.ts:** Incomplete (missing several static routes); EN project detail slugs out of sync with actual static params (hardcoded `["ejemplo"]` vs `PROJECT_SLUGS` + `PROJECTS_EN`).
- **not-found:** No custom 404; add `app/not-found.tsx`.
- **RSS:** No feed for notes/blog; required for “serious SEO blog”.

---

## 4) Required vs optional changes

| Change | Required | Notes |
|--------|----------|-------|
| Add `app/not-found.tsx` | Yes | Conventions. |
| robots.ts environment-aware | Yes | Block indexing on preview/staging. |
| sitemap.ts complete + sync EN slugs | Yes | Add missing routes; derive EN project slugs from code. |
| RSS for notas/notes | Yes | Scaffold; empty feed OK if content not ready. |
| Route groups (site)/(legal) | Optional | Cleanliness only; no URL change. |

---

## 5) Proposed plan (order)

1. Add `app/not-found.tsx` (minimal, link to home).
2. Update `app/robots.ts`: if `VERCEL_ENV` is preview/staging (or similar), return `disallow: /`.
3. Update `app/sitemap.ts`: add contact, contacto, areas, enblanco, legal; derive EN project detail slugs from `PROJECT_SLUGS` and `PROJECTS_EN` (or shared helper).
4. Add RSS: `app/[lang]/notas/rss.xml/route.ts` and `app/[lang]/notes/rss.xml/route.ts` (or single dynamic route under `[lang]`). Return XML; use NOTAS_ES / NOTES_EN for items (or empty feed and document).
5. (Optional) Route groups: not in this pass.

---

## 6) Files to change (implementation)

| Action | File |
|--------|------|
| Create | `src/app/not-found.tsx` |
| Modify | `src/app/robots.ts` |
| Modify | `src/app/sitemap.ts` |
| Create | `src/app/[lang]/notas/rss.xml/route.ts` |
| Create | `src/app/[lang]/notes/rss.xml/route.ts` |

No redirects required; no URL changes.

---

## 7) Manual verification checklist (after implementation)

- [ ] `GET /` → 302 to `/es`.
- [ ] `GET /es` → 200 (home).
- [ ] `GET /en` → 200 (home).
- [ ] `GET /es/proyectos`, `/es/servicios`, `/es/notas`, `/es/contacto` → 200.
- [ ] `GET /en/projects`, `/en/services`, `/en/notes`, `/en/contact` → 200.
- [ ] `GET /robots.txt` → 200; on preview/staging body disallows `/`.
- [ ] `GET /sitemap.xml` → 200; includes es/en, projects, notes, contact, areas, legal.
- [ ] `GET /es/notas/rss.xml` → 200, `Content-Type: application/xml` (or `application/rss+xml`).
- [ ] `GET /en/notes/rss.xml` → 200, same.
- [ ] Request to non-existent path → 404 and not-found UI.

---

## 8) Implementation summary (applied)

### Changes made

1. **`src/app/not-found.tsx`** — Added root 404 page with Spanish message and link to `/es`.
2. **`src/app/robots.ts`** — Environment-aware: when `VERCEL_ENV` (or fallback `NODE_ENV`) is not `production`, returns `disallow: /`; otherwise unchanged (allow + sitemap).
3. **`src/app/sitemap.ts`** — Extended with contact, contacto, areas, enblanco (and subpages), legal, cookies; EN project detail slugs now derived from `PROJECT_SLUGS` + `EN_PROJECTS_EN_KEYS` minus collection slugs; added areas and service-detail URLs using `ES_SERVICE_PAGE_SLUGS` / `EN_SERVICE_PAGE_SLUGS`.
4. **`src/data/notes-index.ts`** — New: `NOTES_INDEX_ES` and `NOTES_INDEX_EN` for RSS (keep in sync with NOTAS_ES / NOTES_EN in page files).
5. **`src/app/[lang]/notas/rss.xml/route.ts`** — Spanish feed at `/es/notas/rss.xml`; redirects `/en/notas/rss.xml` → `/en/notes/rss.xml`.
6. **`src/app/[lang]/notes/rss.xml/route.ts`** — English feed at `/en/notes/rss.xml`; redirects `/es/notes/rss.xml` → `/es/notas/rss.xml`.

### Files changed (exact list)

| Action | Path |
|--------|------|
| Create | `src/app/not-found.tsx` |
| Modify | `src/app/robots.ts` |
| Modify | `src/app/sitemap.ts` |
| Create | `src/data/notes-index.ts` |
| Create | `src/app/[lang]/notas/rss.xml/route.ts` |
| Create | `src/app/[lang]/notes/rss.xml/route.ts` |

### Diffs (concise)

- **not-found.tsx:** New file; minimal 404 UI with "Volver al inicio" → `/es`.
- **robots.ts:** Added `VERCEL_ENV` / `NODE_ENV` check; non-production returns `{ rules: [{ userAgent: "*", disallow: "/" }] }`.
- **sitemap.ts:** New imports `PROJECT_SLUGS`, `ES_SERVICE_PAGE_SLUGS`, `EN_SERVICE_PAGE_SLUGS`; `EN_DETAIL_SLUGS` built from `EN_PROJECTS_EN_KEYS` + `PROJECT_SLUGS` minus collection; added static entries for servicios, contact, areas, enblanco, legal, cookies; added areas and service-detail loops.
- **notes-index.ts:** New; exports `NOTES_INDEX_ES` and `NOTES_INDEX_EN` (slug, title, date, description).
- **notas/rss.xml/route.ts:** GET returns RSS XML for `lang === "es"`, redirects `lang === "en"` to `/en/notes/rss.xml`.
- **notes/rss.xml/route.ts:** GET returns RSS XML for `lang === "en"`, redirects `lang === "es"` to `/es/notas/rss.xml`.

### Maintenance note

- **Notas:** Single source is `src/data/notes-index.ts`. List pages, slug pages, RSS and sitemap all use it. When adding or editing notes, update only that file.

---

## 9) Follow-up (continuación post-auditoría)

### Route groups (aplicado)

- **`app/[lang]/(site)/`** — Páginas públicas: `page.tsx`, `proyectos/`, `projects/`, `servicios/`, `services/`, `notas/`, `notes/`, `contacto/`, `contact/`, `areas/`, `enblanco/`. Las URLs no cambian (los grupos no afectan la URL).
- **`app/[lang]/(legal)/`** — Páginas legales: `privacidad/`, `privacy/`, `aviso-legal/`, `legal-notice/`, `cookies/`.
- **`app/[lang]/_dev/`** — Sin cambio (sigue en `[lang]`).

### Notas: fuente única (aplicado)

- **`src/data/notes-index.ts`** — Exporta `NOTAS_ES`, `NOTES_EN` (arrays con slug, index, type, title, date, author, description), `getNoteBySlug(lang, slug)` y los alias `NOTES_INDEX_ES` / `NOTES_INDEX_EN` para RSS.
- **Páginas** — `notas/page.tsx`, `notes/page.tsx` y los `[slug]` importan desde `@/data/notes-index`; ya no hay duplicación de datos.
- **Sitemap** — Los slugs de notas se obtienen de `NOTAS_ES` y `NOTES_EN` en lugar de una constante fija.

### Viewport / themeColor (aplicado)

- **`src/app/layout.tsx`** — Añadido `export const viewport = { themeColor: "#F2F1F1" }` y eliminado `themeColor` de `metadata` para seguir la convención de Next.js y eliminar el aviso de build.
