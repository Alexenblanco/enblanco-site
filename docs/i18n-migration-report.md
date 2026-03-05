# i18n Migration Report: Single Locale System with [lang]

## 1) Route trees

### src/app/es
- es/layout.tsx
- es/page.tsx
- es/_dev/sanity/page.tsx
- es/proyectos/page.tsx
- es/proyectos/[slug]/page.tsx
- es/proyectos/branding, naming, consultoria-de-marca, direccion-de-arte, diseno-web, estrategia-creativa, packaging/page.tsx
- es/notas/page.tsx
- es/notas/[slug]/page.tsx
- es/contacto/page.tsx
- es/cookies/page.tsx
- es/privacidad/page.tsx
- es/aviso-legal/page.tsx
- es/enblanco/page.tsx
- es/enblanco/faq/page.tsx
- es/enblanco/metodologia/page.tsx
- es/enblanco/equipo/page.tsx
- es/areas/page.tsx
- es/areas/cultura, industria, alimentacion, salud, retail, startups-tecnologia/page.tsx
- es/servicios/page.tsx
- es/servicios/branding, consultoria-de-marca, direccion-de-arte, diseno-web, estrategia-creativa-campanas, naming, packaging/page.tsx

### src/app/en
- en/layout.tsx
- en/page.tsx
- en/_dev/sanity/page.tsx
- en/projects/page.tsx
- en/projects/[slug]/page.tsx
- en/projects/art-direction, brand-consulting, branding, creative-strategy, naming, packaging, web-design/page.tsx
- en/notes/page.tsx
- en/notes/[slug]/page.tsx
- en/contact/page.tsx
- en/cookies/page.tsx
- en/privacy/page.tsx
- en/legal-notice/page.tsx
- en/enblanco/page.tsx
- en/enblanco/faq/page.tsx
- en/enblanco/methodology/page.tsx
- en/enblanco/team/page.tsx
- en/areas/page.tsx
- en/areas/culture, food, health, industry, retail, startups-technology/page.tsx
- en/services/page.tsx
- en/services/art-direction, brand-consulting, branding, creative-strategy-campaigns, naming, packaging, web-design/page.tsx

### src/app/[lang]
- (empty before migration; no pages)

## 2) Duplicates

- There are no duplicates between es and en: they are parallel trees with different path segments (e.g. es/proyectos vs en/projects, es/notas vs en/notes).
- [lang] was empty; all traffic is currently served by the static es/ and en/ trees.

## 3) Which system is currently used

- Navigation, dock (FloatingDock), and all internal links use hardcoded /es/... and /en/... paths.
- Root page redirects to /es.
- SetLocaleLang sets document.lang from pathname (/en → en, else es).
- dock-config.ts (DESKTOP_ITEMS, MOBILE_MENU_ITEMS) and getLocaleFromPathname use /es and /en.
- The app is fully served by src/app/es and src/app/en; [lang] is not used.

## 4) SEO-impact files

- metadata: In each page under es/ and en/ (canonical, alternates.languages/hreflang, openGraph).
- sitemap.ts: Outputs /es and /en and all /es/* and /en/* URLs (project, notes, etc.).
- robots.ts: Allows all, sitemap points to /sitemap.xml.
- canonical: Set per page (e.g. canonical: "/es/proyectos").
- hreflang: Set in alternates.languages (es, en, x-default) on pages.

## 5) Migration checklist

1. Create src/lib/i18n/path.ts with withLang(lang, path) and getLangFromPathname(pathname).
2. Create [lang]/layout.tsx: validate lang in ["es","en"], notFound() otherwise; wrap with ProjectTransitionProvider and JsonLd; do not set <html> (root layout owns it); SetLocaleLang already sets document.lang from pathname.
3. Create all routes under [lang] with the same URL shape: [lang]/page.tsx (home), [lang]/proyectos/* (es-only guards), [lang]/projects/* (en-only guards), [lang]/notas/*, [lang]/notes/*, etc. Each page that is locale-specific (e.g. proyectos) must call notFound() when params.lang !== "es".
4. Replace every page under es/ and en/ with a redirect to the same path so that Next.js still matches /es and /en first; then immediately redirect to the same URL. Actually: to make [lang] authoritative we must stop serving from es/en. So replace es/* and en/* page content with a thin wrapper that redirects to the same path. But redirect to same path would loop. So we must remove the page files from es and en so that the only match for /es/* and /en/* is [lang]. So: delete (or move) all page.tsx under es and en, keep only layout.tsx in es and en if desired, and let [lang] handle all /:lang/... requests.
5. Use middleware: for requests to /es and /en (and subpaths), do not rewrite; Next will match [lang] once es/en pages are removed. So the only way is to remove the handlers under es and en.
6. Update dock-config.ts and all Link hrefs to use withLang(lang, path) where lang comes from getLocaleFromPathname(pathname) or context.
7. Ensure [lang]/layout or a shared place sets html lang: root layout cannot know [lang]; SetLocaleLang already sets document.documentElement.lang from pathname. Keep as is.
8. Sitemap: keep outputting /es and /en URLs (no change; they are the canonical URLs).
9. Canonical and hreflang: in [lang] pages, keep same metadata with canonical and alternates.languages pointing to /es/... and /en/...
10. Run next build; fix any broken links or types.

## 6) Rollback plan

- Restore es/ and en/ page files from git (they are only removed or replaced, not rewritten).
- Remove or revert [lang] route tree.
- Revert src/lib/i18n/path.ts and any link/dock changes that use it.
- Revert middleware if any.
- Run next build.

## 7) Phase 2 (after verification)

- TODO: Migrate remaining routes into [lang]: areas (index + all area slugs), services (index + all service slugs), enblanco (index + faq, metodologia, methodology, equipo, team), proyectos/[slug], projects/[slug], notas/[slug], notes/[slug], and all static project/service segment pages. Then remove all page.tsx (and layout.tsx) files under src/app/es and src/app/en so that [lang] is the only handler for /es/* and /en/*. The folders src/app/es and src/app/en can remain empty or be removed.
- middleware.ts: Currently a no-op; once es/en pages are removed, the same URLs will be served by [lang] with no redirect needed (1:1 path).
