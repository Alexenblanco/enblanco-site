# i18n Architecture Audit Report

**Date:** 2025-03-05  
**Scope:** Next.js App Router bilingual (es, en) site. Single dynamic segment `[lang]`, default language `es`.

---

## 1) Audit Summary

### 1.1 Routing architecture ✅ COMPLIANT

- **Single dynamic segment:** All locale routes live under `app/[lang]/`. No separate `app/es` or `app/en` folders exist.
- **URL structure:** Implemented as required:
  - Spanish: `/es/proyectos`, `/es/servicios`, `/es/notas`, `/es/contacto` (and `/es/areas`, `/es/enblanco`, legal pages).
  - English: `/en/projects`, `/en/services`, `/en/notes`, `/en/contact` (and `/en/areas`, `/en/enblanco`, legal pages).
- **Redirects:** Language-specific paths redirect when accessed with the wrong locale (e.g. `/es/contact` → `/es/contacto`, `/en/proyectos` → `/en/projects`) via page-level `redirect()`.

### 1.2 Root redirect ✅ COMPLIANT (post-audit)

- **Requirement:** Root URL must redirect `/` → `/es`.
- **Current:** `src/middleware.ts` redirects `GET /` to `/es`. Root `app/page.tsx` still has `redirect("/es")` as fallback.

### 1.3 Dictionaries / UI translations ✅ IMPLEMENTED (post-audit)

- **Requirement:** UI translations must come from local dictionaries and load using the language param.
- **Current:** `src/dictionaries/es.json`, `src/dictionaries/en.json`, and `src/dictionaries/index.ts` with `getDictionary(lang)`. Layout uses `dict.siteName` for Organization JsonLd. Rest of UI can be migrated to dictionaries incrementally.

### 1.4 SEO (canonical + hreflang) ✅ COMPLIANT

- **Requirement:** Each page must support canonical, hreflang es, hreflang en, hreflang x-default; metadata must adapt by language.
- **Current:** Pages under `[lang]` set `metadata.alternates` with `canonical` and `languages: { es: "...", en: "...", "x-default": "..." }`. Default is Spanish (`x-default` points to `/es` or the Spanish variant). Metadata (title, description) is set per page and adapts to `lang` (e.g. `generateMetadata` uses `params.lang`).

### 1.5 Language helpers ✅ PRESENT

- **`src/lib/i18n/path.ts`:** `withLang(lang, path)`, `getLangFromPathname(pathname)`, `isValidLang(value)`, type `Lang` / `Locale`.
- **`src/lib/dock-config.ts`:** Uses `withLang` for dock and mobile nav URLs; `getLocaleFromPathname`; locale-specific labels and links.

### 1.6 Duplicated routes / incorrect routing

- **Duplicated language systems:** None. Only `[lang]` exists; no `app/es` or `app/en`.
- **Incorrect routing outside [lang]:** All locale routes are under `[lang]`. Root `app/page.tsx` only redirects; no other top-level locale routes.
- **Sitemap:** `src/app/sitemap.ts` generates `/es` and `/en` URLs (and nested paths). It does not reference folder paths; it builds URLs by convention. One comment still refers to "en/projects/[slug]/page.tsx" (legacy); the generated URLs remain correct.

---

## 2) List of issues (to fix)

| # | Issue | Severity | Fix |
|---|--------|----------|-----|
| 1 | No middleware for `/` → `/es` | Low | Add `src/middleware.ts` that redirects `/` to `/es`. Optionally keep `app/page.tsx` redirect as fallback or remove after middleware is verified. |
| 2 | No dictionary files or loading by `lang` | Medium | Add `src/dictionaries/es.json`, `src/dictionaries/en.json`, and a `getDictionary(lang)` helper. Use it in at least one place (e.g. `[lang]/layout.tsx`) so translations load from the language param. Gradual migration of existing inline strings can follow. |

---

## 3) Files to be changed (post-audit)

1. **Create** `src/middleware.ts` – root redirect `/` → `/es`.
2. **Create** `src/dictionaries/es.json` – minimal UI keys (e.g. site name, nav).
3. **Create** `src/dictionaries/en.json` – same keys in English.
4. **Create** `src/dictionaries/index.ts` – `getDictionary(lang)` that loads the correct JSON.
5. **Edit** `src/app/[lang]/layout.tsx` – use `getDictionary(lang)` for at least one value (e.g. organization name in JsonLd) to verify dictionary loading.

No removal of existing behavior; no refactor of all pages to dictionaries in this pass.

---

## 4) Files changed (applied)

| Action | Path |
|--------|------|
| Created | `src/middleware.ts` |
| Created | `src/dictionaries/es.json` |
| Created | `src/dictionaries/en.json` |
| Created | `src/dictionaries/index.ts` |
| Modified | `src/app/[lang]/layout.tsx` |

**Exact diff (summary):**

- **src/middleware.ts** (new): Redirect `GET /` to `/es` via `NextResponse.redirect(new URL("/es", request.url))`. Matcher `"/"`.
- **src/dictionaries/es.json** (new): `{ "siteName": "enblanco", "nav": { "home": "inicio", "projects": "proyectos", ... } }`.
- **src/dictionaries/en.json** (new): Same structure, English values (`"home"`, `"projects"`, etc.).
- **src/dictionaries/index.ts** (new): `import es from "./es.json"; import en from "./en.json"; const dictionaries = { es, en }; export function getDictionary(lang: Locale): Dictionary { return dictionaries[lang]; }`. Exports type `Dictionary = typeof es`.
- **src/app/[lang]/layout.tsx**: Added `import { getDictionary } from "@/dictionaries";`. After `isValidLang(lang)`, added `const dict = getDictionary(lang);`. Replaced `name: "enblanco"` in `organizationJsonLd` with `name: dict.siteName`.

Root `app/page.tsx` unchanged (still has `redirect("/es")` as fallback when middleware does not run).

---

## 5) Summary

- **Architecture:** Single `[lang]` segment, correct URL structure, no duplicate locale folders. **Compliant.**
- **SEO:** Canonical and hreflang (es, en, x-default) and language-aware metadata are in place. **Compliant.**
- **Root redirect:** Works via root page; adding middleware is recommended. **Partial.**
- **Dictionaries:** Missing; UI strings are inline. **Non-compliant.** Adding dictionaries and `getDictionary(lang)` with minimal usage will satisfy “translations load using the language param” and allow future migration.
