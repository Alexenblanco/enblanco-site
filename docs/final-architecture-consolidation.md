# Consolidación arquitectónica final

**Fecha:** 2025-03-06  
**Objetivo:** Cerrar debilidades estructurales sin cambiar UX, slugs ni copy visible.

---

## 1. Problemas previos

| Área | Problema |
|------|----------|
| **Rutas estáticas** | Sitemap y `generateStaticParams` dependían de varias fuentes (project-details, notes-index, proyectos-collections, services-slugs, areas-slugs, content/projects, constante local EN_PROJECTS_EN_KEYS). Añadir contenido obligaba a tocar sitemap + la página correspondiente; fácil olvidar uno. |
| **Modelo "proyecto"** | Disperso en `data/projects`, `data/project-details`, `content/projects`, y legacy `PROJECTS_EN` en projects/[slug]/page. Poco claro dónde añadir un proyecto nuevo o qué pieza cumple qué papel. |
| **Marca y constantes** | `hola@agenciaenblanco.com` y nombre "enblanco" repetidos en muchas páginas; `getSiteUrl` en seo.ts con URL por defecto hardcodeada. Cambio de dominio o email implicaba buscar y reemplazar en muchos archivos. |
| **Residuos** | `src/proxy.ts` no usado por ningún middleware; `styled-components` en package.json sin uso en `src/`; ruta `_dev/sanity` accesible en producción. |

---

## 2. Arquitectura aplicada

### Parte 1 — Fuente única de rutas estáticas

- **`src/lib/static-routes.ts`** (nuevo): módulo que agrega todas las fuentes de slugs/rutas estáticas y expone una API clara:
  - `BASE_PATHS`: rutas fijas (/, /es/proyectos, /en/contact, etc.).
  - `getProjectDetailSlugsEs()`, `getProjectDetailSlugsEn()`: slugs de detalle de proyecto (ES desde PROJECT_DETAILS; EN desde legacy + PROJECT_SLUGS, menos colecciones).
  - `EN_LEGACY_PROJECT_DETAIL_SLUGS`: lista única para proyectos EN solo-legacy; al añadir uno, se actualiza aquí y en PROJECTS_EN en la página.
  - `projectCollectionSlugsEs`, `projectCollectionSlugsEn` (re-export de proyectos-collections).
  - `getNoteSlugs()`, `getNotasSlugsEs()`, `getNotesSlugsEn()` (desde notes-index).
  - `areaSlugsEs`, `areaSlugsEn` (re-export de areas-slugs).
  - `servicePageSlugsEs`, `servicePageSlugsEn` (re-export de services-slugs).
- **Sitemap** y **generateStaticParams** de las páginas afectadas consumen solo `static-routes`. Las definiciones reales de slugs siguen en sus módulos canónicos (data/*, lib/*-slugs); static-routes no duplica listas, las reexporta o deriva.

### Parte 2 — Modelo de proyecto

- **`src/lib/projects-registry.ts`** (nuevo): punto de entrada documentado del dominio "project". Reexporta:
  - Detalle (SEO, copy, secciones, FAQ): `data/project-details`.
  - Listado: `data/projects`.
  - Manifest (hero, galería, media): `content/projects`.
- El doc del módulo explica dónde añadir un proyecto nuevo, qué es legacy EN y que los slugs estáticos EN se mantienen en `static-routes` + `PROJECTS_EN` en la página.

### Parte 3 — Configuración de marca y sitio

- **`src/lib/site-config.ts`** (nuevo): constantes `SITE_NAME`, `CONTACT_EMAIL`, `SITE_URL_DEFAULT`.
- **`lib/seo.ts`** usa `SITE_URL_DEFAULT` de site-config; no se duplica la URL por defecto.
- Páginas y componentes que usaban `hola@agenciaenblanco.com` o el nombre del sitio en JSON-LD/mailto importan `CONTACT_EMAIL` y/o `SITE_NAME` desde site-config.

### Parte 4 — Residuos

- **proxy.ts**: Añadido comentario de candidato a borrado; no está referenciado por middleware ni por la app. No eliminado para no tocar despliegues sin confirmar.
- **styled-components**: No hay imports en `src/`; solo se usa en `studio/`. Documentado: se puede quitar del `package.json` del sitio si se confirma que ningún build del monoreto lo requiere.
- **_dev/sanity**: Protegido en producción con `if (process.env.NODE_ENV === "production") notFound();` para no exponer la ruta en prod.

---

## 3. Archivos creados

| Archivo | Propósito |
|---------|-----------|
| `src/lib/static-routes.ts` | Fuente única para rutas estáticas (sitemap + generateStaticParams). |
| `src/lib/site-config.ts` | SITE_NAME, CONTACT_EMAIL, SITE_URL_DEFAULT. |
| `src/lib/projects-registry.ts` | Punto de entrada documentado del dominio project (reexporta data + content). |
| `docs/final-architecture-consolidation.md` | Este documento. |

---

## 4. Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/app/sitemap.ts` | Usa solo `static-routes` (BASE_PATHS, getters de proyectos/notas/áreas/servicios). |
| `src/app/[lang]/(site)/proyectos/[slug]/page.tsx` | generateStaticParams usa getProjectDetailSlugsEs + projectCollectionSlugsEs. |
| `src/app/[lang]/(site)/projects/[slug]/page.tsx` | generateStaticParams usa getProjectDetailSlugsEn + projectCollectionSlugsEn. |
| `src/app/[lang]/(site)/notas/[slug]/page.tsx` | generateStaticParams usa getNotasSlugsEs(). |
| `src/app/[lang]/(site)/notes/[slug]/page.tsx` | generateStaticParams usa getNotesSlugsEn(). |
| `src/app/[lang]/(site)/areas/[areaSlug]/page.tsx` | generateStaticParams usa areaSlugsEs, areaSlugsEn. |
| `src/app/[lang]/(site)/servicios/[slug]/page.tsx` | generateStaticParams usa servicePageSlugsEs, servicePageSlugsEn. |
| `src/app/[lang]/(site)/services/[slug]/page.tsx` | generateStaticParams usa servicePageSlugsEs, servicePageSlugsEn. |
| `src/lib/seo.ts` | getSiteUrl usa SITE_URL_DEFAULT importado de site-config. |
| `src/lib/areas-render.tsx` | CONTACT_EMAIL desde site-config. |
| `src/app/api/lead/route.ts` | CONTACT_EMAIL desde site-config. |
| Páginas contacto, contacto, projects, enblanco/*, faq, services/ServiceDetail, layout, page (home) | mailto y/o JSON-LD usan CONTACT_EMAIL y/o SITE_NAME desde site-config. |
| `src/proxy.ts` | Comentario de candidato a borrado. |
| `src/app/[lang]/_dev/sanity/page.tsx` | notFound() en NODE_ENV === "production". |

---

## 5. Duplicaciones o fragilidades eliminadas

- Lista de rutas base: una sola definición en `BASE_PATHS`; sitemap ya no repite 20+ URLs a mano.
- Slugs de proyecto EN (detalle): lógica concentrada en `getProjectDetailSlugsEn()` y `EN_LEGACY_PROJECT_DETAIL_SLUGS`; sitemap y generateStaticParams comparten la misma fuente.
- Email y nombre de sitio: un solo lugar (site-config); cambios de marca/dominio/email se hacen ahí.
- Riesgo de olvido al añadir notas/áreas/servicios/proyectos: al añadir en el módulo canónico (notes-index, areas-slugs, etc.), static-routes ya los incluye vía reexport o getters; sitemap y params siguen al día.

---

## 6. Qué sigue separado y por qué

| Elemento | Motivo |
|----------|--------|
| **Slugs reales** (ej. ES_SERVICE_PAGE_SLUGS) | Siguen en sus módulos (services-slugs, areas-slugs, etc.); static-routes solo reexporta o deriva. Así no se duplican datos y se mantiene una sola fuente por dominio. |
| **PROJECTS_EN** (metadata legacy EN) | Sigue en projects/[slug]/page porque son datos de metadata por slug; los slugs para estáticos están en static-routes. Mantener ambos evita acoplar la página a la forma de static-routes. |
| **getSiteUrl / absoluteUrl / alternatesLanguages** | Siguen en seo.ts; site-config solo aporta SITE_URL_DEFAULT y constantes de marca. Responsabilidades distintas (URLs vs. identidad). |
| **proxy.ts** | No eliminado; documentado como candidato a borrado hasta confirmar que ningún despliegue lo usa. |
| **styled-components** | No eliminado del package.json; documentado como no usado en src/ y eliminable si se confirma. |

---

## 7. Cómo añadir un nuevo proyecto tras la consolidación

1. **Listado (ruleta/listado):** Añadir entrada en `data/projects` (id, slug, title, coverImage, detailSlug si aplica, etc.).
2. **Detalle (case study):** Si tiene página de detalle con copy/FAQ/secciones, añadir `ProjectDetail` en `data/project-details` (mismo slug o el que use detailSlug en data/projects).
3. **Manifest (hero/galería):** Si tiene hero o galería custom, añadir manifest en `content/projects` y registrar el slug en la lista que alimenta `PROJECT_SLUGS`.
4. **Rutas estáticas:** No hace falta tocar sitemap ni generateStaticParams; los slugs salen de PROJECT_DETAILS (ES), de getProjectDetailSlugsEn() (EN) y de projectCollectionSlugs*. Si es un proyecto solo EN legacy, añadir el slug a `EN_LEGACY_PROJECT_DETAIL_SLUGS` en `static-routes.ts` y la entrada de metadata en `PROJECTS_EN` en `projects/[slug]/page.tsx`.

---

## 8. Cómo añadir nuevas rutas estáticas sin romper sitemap ni params

- **Ruta base nueva (ej. /es/nueva-seccion):** Añadirla a `BASE_PATHS` en `static-routes.ts`. El sitemap la incluirá.
- **Rutas dinámicas nuevas (ej. /es/notas/[slug] con más notas):** Añadir las notas en `data/notes-index` (NOTAS_ES / NOTES_EN). `getNoteSlugs()` y getNotasSlugsEs / getNotesSlugsEn ya las incluyen; sitemap y generateStaticParams de notas siguen al día.
- **Nuevo tipo de segmento (ej. /es/otro/[slug]):** Crear el módulo de slugs o datos que sea la fuente; luego en static-routes añadir el getter o reexport y consumirlo en sitemap y en el generateStaticParams de esa ruta.

---

## 9. Residuos: confirmados, eliminados o pendientes

| Elemento | Estado | Acción |
|----------|--------|--------|
| **proxy.ts** | Confirmado no usado (ningún middleware lo importa). | No eliminado; comentario en archivo como candidato a borrado. |
| **styled-components** (en package del sitio) | No hay imports en `src/`; studio sí lo usa. | No eliminado; documentado. Recomendación: quitar del package.json del sitio si se confirma que el build del sitio no lo necesita. |
| **_dev/sanity** | Accesible en prod. | Protegido con notFound() en producción. |

---

## 10. Tabla resumen de cambios

| Archivo | Tipo | Motivo | Riesgo |
|---------|------|--------|--------|
| `src/lib/static-routes.ts` | Nuevo | Fuente única rutas estáticas | Bajo |
| `src/lib/site-config.ts` | Nuevo | Constantes marca/sitio | Bajo |
| `src/lib/projects-registry.ts` | Nuevo | Punto de entrada dominio project | Bajo |
| `src/app/sitemap.ts` | Modificado | Consumir static-routes | Bajo |
| `src/app/[lang]/(site)/proyectos/[slug]/page.tsx` | Modificado | generateStaticParams desde static-routes | Bajo |
| `src/app/[lang]/(site)/projects/[slug]/page.tsx` | Modificado | generateStaticParams desde static-routes | Bajo |
| `src/app/[lang]/(site)/notas/[slug]/page.tsx` | Modificado | generateStaticParams desde static-routes | Bajo |
| `src/app/[lang]/(site)/notes/[slug]/page.tsx` | Modificado | generateStaticParams desde static-routes | Bajo |
| `src/app/[lang]/(site)/areas/[areaSlug]/page.tsx` | Modificado | generateStaticParams desde static-routes | Bajo |
| `src/app/[lang]/(site)/servicios/[slug]/page.tsx` | Modificado | generateStaticParams desde static-routes | Bajo |
| `src/app/[lang]/(site)/services/[slug]/page.tsx` | Modificado | generateStaticParams desde static-routes | Bajo |
| `src/lib/seo.ts` | Modificado | SITE_URL_DEFAULT desde site-config | Bajo |
| `src/lib/areas-render.tsx` | Modificado | CONTACT_EMAIL desde site-config | Bajo |
| `src/app/api/lead/route.ts` | Modificado | CONTACT_EMAIL desde site-config | Bajo |
| Múltiples páginas (contacto, contact, projects, enblanco/*, faq, ServiceDetail, layout, page) | Modificado | CONTACT_EMAIL / SITE_NAME desde site-config | Bajo |
| `src/proxy.ts` | Modificado | Comentario candidato a borrado | Nulo |
| `src/app/[lang]/_dev/sanity/page.tsx` | Modificado | notFound() en producción | Bajo |
