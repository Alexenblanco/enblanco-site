# SEO + LLM Discoverability Audit Report

**Date:** 2025-03-05  
**Scope:** Technical SEO baseline + LLM discovery. Canonical: https://www.agenciaenblanco.com. Default language: es.

---

## A) Inventory

### Metadata
- **app/layout.tsx:** metadataBase = siteUrl (env fallback https://www.agenciaenblanco.com), title template, description, OG (one image), viewport themeColor. Inline JSON-LD: Organization (@id, name, url, logo, address, sameAs, contactPoint) + WebSite (@id, url, publisher).
- **app/[lang]/layout.tsx:** Duplicate minimal Organization JSON-LD (name, url only) via JsonLd component — redundant with root.
- **Pages:** generateMetadata used on home, proyectos/projects, servicios/services, notas/notes, contacto/contact, areas, enblanco/*, legal. Canonical + languages (es, en, x-default) present on checked pages. x-default points to /es or Spanish path.

### robots / sitemap
- **app/robots.ts:** Exists. VERCEL_ENV/NODE_ENV check: non-production → disallow /; production → allow / + sitemap URL. siteUrl from env with fallback https://www.agenciaenblanco.com.
- **app/sitemap.ts:** Exists. Uses siteUrl. Includes /es, /en, proyectos, projects, servicios, services, notas, notes, contact, areas, enblanco, legal, cookies. Dynamic: project slugs, note slugs, area slugs, service slugs. No _dev routes.

### JSON-LD
- **Root:** Organization + WebSite in layout.tsx (absolute URLs, @id with siteUrl). Has logo, sameAs (Instagram, Behance, LinkedIn).
- **[lang] layout:** Second Organization (name, url) — duplicate.
- **Notas/notes [slug]:** Article (headline, datePublished, author Organization, publisher, mainEntityOfPage). Missing dateModified for LLM/schema completeness.
- **Proyectos [slug]:** CaseStudy + BreadcrumbList. Projects list/servicios have BreadcrumbList.

### Canonical / hreflang
- Canonicals: relative (e.g. `/es`, `/es/notas`) or in one case absolute (proyectos detail). metadataBase set in root → relative resolve to metadataBase (must be www).
- alternates.languages: es, en, x-default present on audited pages. x-default consistently points to Spanish version (/es/...).

### not-found / status
- **app/not-found.tsx:** Exists. 404 message + link to /es. No noindex in layout on production.

### Middleware
- Root redirect / → /es. No other SEO-related middleware.

### URL consistency
- siteUrl repeated in many files as `process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com"`. No central helper; risk of non-www if env set wrong.

---

## B) Issues & risks

### Indexability
- **Risk:** If NEXT_PUBLIC_SITE_URL is set to non-www or empty in production, metadataBase and sitemap could be non-canonical. No enforcement of www.
- **Good:** robots.ts is environment-aware. No accidental noindex on production pages.

### Metadata
- **Good:** Title/description and OG on home and key pages; language-aware where checked.
- **Gap:** No central SEO URL helper — drift risk; canonical domain not enforced to www.

### i18n (canonical + hreflang)
- **Good:** x-default points to /es (or Spanish path). alternates have es and en.
- **Good:** Canonicals are self-referential per page. No same canonical for es and en.
- **Note:** With metadataBase relative canonicals resolve correctly; ensuring metadataBase is always www is the fix.

### Structured data
- **Duplicate:** [lang] layout outputs a second Organization (minimal). Should rely on root only.
- **Article:** Missing dateModified (recommended for Article schema and LLM).
- **Good:** Organization has name, url, logo, sameAs. BreadcrumbList on notes, servicios, projects, enblanco.

### Sitemap
- **Good:** Comprehensive; no internal/_dev; absolute URLs via siteUrl.
- **Good:** No non-canonical domains if siteUrl is correct.

### Errors / status
- **Good:** not-found.tsx exists. invalid [lang] → notFound().

### LLM discoverability
- **Good:** /es/enblanco and /en/enblanco describe the agency, services, location, contact. Semantic headings (H1, H2) and server-rendered content.
- **Missing:** /public/llms.txt (Preferred-Content or similar) for LLM discovery.
- **Gap:** Article schema should include dateModified for clarity.

---

## C) SEO Audit summary (bullets)

### Indexability
- robots.txt: environment-aware (disallow on preview/staging). ✓
- No accidental noindex on production. ✓
- Canonical tags: present; need to enforce www domain everywhere. ⚠

### Metadata
- Next.js Metadata API: used; global defaults in root layout, page overrides via generateMetadata. ✓
- Title + description: language-aware on key pages. ✓
- Open Graph: one global image; language-aware title/description where overridden. ✓
- All metadata URLs must use https://www.agenciaenblanco.com → enforce via central helper. ⚠

### i18n
- canonical: self-referential. ✓
- alternates (hreflang): es, en, x-default. ✓
- x-default → Spanish (e.g. /es). ✓
- No duplicate canonical across languages. ✓

### Structured data
- Organization + WebSite in root (with @id, absolute URLs). ✓
- Duplicate Organization in [lang] layout → remove. ⚠
- BreadcrumbList on inner pages (notas, servicios, projects, enblanco). ✓
- Article on notes: present; add dateModified. ⚠

### Sitemap
- app/sitemap.ts exists; static + dynamic; no _dev; absolute URLs. ✓

### Errors / status
- not-found.tsx: exists. ✓
- invalid lang → notFound(). ✓

### Performance hygiene
- next/image: used where present (no change requested). ✓
- No obvious blocking scripts in head. ✓

---

## D) Fix plan (ordered)

### Required (do now)
1. **Central SEO helper (src/lib/seo.ts):** getSiteUrl() that normalizes to https://www.agenciaenblanco.com (enforce www); absoluteUrl(path); buildAlternates(esPath, enPath, xDefaultPath?) for Metadata API. Use in layout, robots, sitemap, and any page that builds canonical/OG URLs.
2. **Enforce www:** Use getSiteUrl() everywhere instead of raw env. Ensure metadataBase and all generated URLs use it.
3. **Remove duplicate Organization JSON-LD** from app/[lang]/layout.tsx; keep only root Organization + WebSite.
4. **Article JSON-LD:** Add dateModified (use datePublished if no modified date) in notas/[slug] and notes/[slug].
5. **public/llms.txt:** Create file with User-agent and Preferred-Content listing key indexable URLs (es/notas, es/proyectos, en/notes, en/projects, es/enblanco, etc.) with www domain.

### Optional (later)
- Add more BreadcrumbList to any inner page that lacks it (if any).
- Consider Open Graph locale (og:locale, og:locale:alternate) for deeper i18n OG.
- Add JSON-LD WebPage for key templates if needed for rich results.

---

## E) Files to change

| Action | File |
|--------|------|
| Create | src/lib/seo.ts |
| Create | public/llms.txt |
| Modify | src/app/layout.tsx (use getSiteUrl) |
| Modify | src/app/[lang]/layout.tsx (remove duplicate JsonLd) |
| Modify | src/app/robots.ts (use getSiteUrl) |
| Modify | src/app/sitemap.ts (use getSiteUrl) |
| Modify | src/app/[lang]/(site)/notas/[slug]/page.tsx (Article dateModified) |
| Modify | src/app/[lang]/(site)/notes/[slug]/page.tsx (Article dateModified) |
| Modify | (optional) Other pages that reference siteUrl for SEO: use seo.ts where it simplifies and enforces www. |

Implementing minimal diffs: seo.ts + use in layout/robots/sitemap + [lang] layout JSON-LD removal + Article dateModified + llms.txt. Then add getSiteUrl() to remaining high-value files (RSS, JsonLd URLs in pages) as needed.

---

## F) Implementation summary (applied)

### Changes made

1. **src/lib/seo.ts** — New. `getSiteUrl()` returns canonical https://www.agenciaenblanco.com (enforces www; ignores non-www env). `absoluteUrl(path)`, `alternatesLanguages(esPath, enPath)` for Metadata API.
2. **app/layout.tsx** — Uses `getSiteUrl()` for siteUrl, ogImage, logoUrl, metadataBase. Organization + WebSite JSON-LD unchanged (already absolute URLs).
3. **app/robots.ts** — Uses `getSiteUrl()` for sitemap URL.
4. **app/sitemap.ts** — Uses `getSiteUrl()` for all entry URLs.
5. **app/[lang]/layout.tsx** — Removed duplicate Organization JSON-LD and JsonLd component; root layout is the single source for Organization + WebSite.
6. **app/[lang]/(site)/notas/[slug]/page.tsx** — Article JSON-LD: added `dateModified: nota.date`. Uses `getSiteUrl()` for siteUrl.
7. **app/[lang]/(site)/notes/[slug]/page.tsx** — Article JSON-LD: added `dateModified: note.date`. Uses `getSiteUrl()` for siteUrl.
8. **app/[lang]/(site)/notas/rss.xml/route.ts** — Uses `getSiteUrl()`.
9. **app/[lang]/(site)/notes/rss.xml/route.ts** — Uses `getSiteUrl()`.
10. **public/llms.txt** — New. Lightweight LLM discovery: short description, Preferred-Content URLs (es/en home, enblanco, proyectos, notes, servicios, contact), services list, location, contact. No Twitter Cards; one global OG image. Semantic HTML and server-rendered content already in place.

### Files changed

| Action | File |
|--------|------|
| Create | src/lib/seo.ts |
| Create | public/llms.txt |
| Modify | src/app/layout.tsx |
| Modify | src/app/robots.ts |
| Modify | src/app/sitemap.ts |
| Modify | src/app/[lang]/layout.tsx |
| Modify | src/app/[lang]/(site)/notas/[slug]/page.tsx |
| Modify | src/app/[lang]/(site)/notes/[slug]/page.tsx |
| Modify | src/app/[lang]/(site)/notas/rss.xml/route.ts |
| Modify | src/app/[lang]/(site)/notes/rss.xml/route.ts |

### Manual verification checklist

- [ ] **https://www.agenciaenblanco.com/robots.txt** — Production: body allows `/` and has `Sitemap: https://www.agenciaenblanco.com/sitemap.xml`. Preview/staging: body has `Disallow: /`.
- [ ] **https://www.agenciaenblanco.com/sitemap.xml** — 200; all URLs start with `https://www.agenciaenblanco.com`; includes /es, /en, proyectos, notes, etc.
- [ ] **https://www.agenciaenblanco.com/es** — View source: `<link rel="canonical"` and hreflang es, en, x-default; x-default href is .../es. Title/description present. JSON-LD Organization + WebSite with www URLs.
- [ ] **https://www.agenciaenblanco.com/en** — Same checks; canonical and hreflang correct for /en.
- [ ] **https://www.agenciaenblanco.com/es/notas/ejemplo** — Canonical and hreflang; Article JSON-LD with datePublished and dateModified; BreadcrumbList. One H1, content in server HTML.
- [ ] **https://www.agenciaenblanco.com/llms.txt** — 200; contains Preferred-Content and agency description.
- [ ] **Build:** `npm run build` completes successfully.
