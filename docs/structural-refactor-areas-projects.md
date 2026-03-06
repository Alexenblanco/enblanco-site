# Refactor estructural: Áreas y detalle de proyecto ES/EN

**Fecha:** 2025-03-06  
**Objetivo:** Reducir deuda técnica en áreas (AreaDetail) y en páginas de detalle de proyecto (proyectos vs projects), sin cambiar UX, rutas ni diseño.

---

## 1. Problemas previos

### Áreas (AreaDetail)

- **Un solo archivo enorme** (~800+ líneas): todo el contenido de las áreas (ES y EN) estaba dentro del componente o en un switch gigante por `areaSlug` e idioma.
- **Contenido inline en JSX**: párrafos, enlaces, mailto y CTAs repetidos con condicionales por idioma y slug.
- **Mantenimiento costoso**: añadir una nueva área o cambiar un texto obligaba a tocar JSX y lógica de presentación.
- **Metadata de áreas** repartida o duplicada entre el componente y la página (`areas/[areaSlug]/page.tsx`).

### Detalle de proyecto ES vs EN

- **Lógica duplicada** entre `proyectos/[slug]/page.tsx` y `projects/[slug]/page.tsx`: metadata (title, description, canonical, alternates, openGraph), breadcrumb JSON-LD y construcción de URLs.
- **Asimetrías SEO**: EN no usaba la misma estructura de metadata para detalle (openGraph, robots); canonical legacy EN sin `siteUrl`.
- **Riesgo de divergencia**: cualquier cambio en título, descripción o JSON-LD había que replicarlo a mano en ambas páginas.

---

## 2. Arquitectura aplicada

### Parte 1 — Áreas

1. **Contenido como datos**  
   - `src/data/areas-content.ts`: contenido por idioma y slug. Tipos `AreaSectionBody` (`text` | `contact` | `links`) y `AreaContentRecord` (h1 + sections).  
   - Consulta única: `getAreaContent(lang, areaSlug)`.

2. **Metadata centralizada**  
   - `src/data/areas-meta.ts`: `AREA_META_EN`, `AREA_META_ES`, `getAreaMeta(lang, slug)` para title y description.  
   - La página `areas/[areaSlug]/page.tsx` usa `getAreaMeta()` en `generateMetadata`.

3. **Render reutilizable**  
   - `src/lib/areas-render.tsx`: `renderAreaSectionBody(body, lang)` — pinta texto, bloque contact (intro + link contacto + mailto) y bloques con enlaces. Un solo lugar para mailto y CTAs.

4. **AreaDetail como capa de presentación**  
   - Lee contenido con `getAreaContent(lang, areaSlug)`.  
   - Arma breadcrumb JSON-LD y hace `map` de secciones llamando a `renderAreaSectionBody(section.body, lang)`.  
   - Sin condicionales por slug ni contenido inline.

### Parte 2 — Detalle de proyecto ES/EN

1. **Metadata de detalle compartida**  
   - `src/lib/project-detail-metadata.ts`:  
     - `getProjectDetailMetadata(detail, slug, lang, siteUrl)`: title, description, canonical, alternates (vía `alternatesLanguages()`), openGraph, robots. Usado por ambas rutas cuando existe `ProjectDetail`.

2. **Breadcrumb JSON-LD compartido**  
   - Mismo módulo: `buildProjectBreadcrumbJsonLd({ lang, slug, title, siteUrl })`.  
   - Usado en detalle y en colección (ES y EN) para mantener una sola definición de estructura.

3. **Alineación EN**  
   - Detalle EN usa la misma metadata que ES (openGraph, robots, canonical con `siteUrl`).  
   - Legacy EN (`PROJECTS_EN`) mantiene su flujo pero con canonical absoluto (`siteUrl`) para coherencia.

4. **Lo que sigue separado**  
   - **Rutas**: `proyectos/[slug]` (ES) y `projects/[slug]` (EN) por diseño i18n; no unificadas en una sola ruta.  
   - **Render**: ES incluye relacionados y `ProjectDetailFaq`; EN tiene lista relacionada distinta y legacy EN sin CaseStudy/FAQ. Se mantiene por UX y contenido distinto.  
   - **Colecciones**: metadata de colección (title, description, alternates) sigue inline en cada página porque depende de `ES_COLLECTION_TITLES` / `EN_COLLECTION_TITLES` y slugs mapeados; extraerlo sería un paso adicional opcional.

---

## 3. Archivos creados

| Archivo | Propósito |
|---------|-----------|
| `src/data/areas-meta.ts` | Metadata (title, description) de áreas; `getAreaMeta(lang, slug)`. |
| `src/data/areas-content.ts` | Contenido de áreas por idioma/slug; `getAreaContent(lang, areaSlug)`. |
| `src/lib/areas-render.tsx` | Render de secciones: `renderAreaSectionBody(body, lang)`. |
| `src/lib/project-detail-metadata.ts` | `getProjectDetailMetadata`, `buildProjectBreadcrumbJsonLd`; usa `alternatesLanguages`. |

---

## 4. Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/app/[lang]/(site)/areas/[areaSlug]/AreaDetail.tsx` | Reducido a capa de presentación: `getAreaContent` + `renderAreaSectionBody` + breadcrumb; sin contenido inline. |
| `src/app/[lang]/(site)/areas/[areaSlug]/page.tsx` | `generateMetadata` usa `getAreaMeta(lang, areaSlug)`. |
| `src/app/[lang]/(site)/proyectos/[slug]/page.tsx` | Metadata de detalle vía `getProjectDetailMetadata`; breadcrumb (detalle y colección) vía `buildProjectBreadcrumbJsonLd`. |
| `src/app/[lang]/(site)/projects/[slug]/page.tsx` | Igual: `getProjectDetailMetadata` para detalle; `buildProjectBreadcrumbJsonLd` para colección y detalle; canonical legacy con `siteUrl`. |

---

## 5. Duplicaciones eliminadas

- **Áreas**: Contenido y variantes por idioma/slug salieron del JSX; un solo punto de edición en `areas-content.ts` y `areas-meta.ts`.  
- **Proyecto detalle**: Construcción de metadata (title, description, alternates, openGraph, robots) y breadcrumb JSON-LD ya no se repiten entre ES y EN; una implementación en `project-detail-metadata.ts`.  
- **alternatesLanguages**: Usado en `getProjectDetailMetadata` para alternates; evita copiar/pegar paths en cada página.

---

## 6. Qué sigue separado y por qué

| Parte | Motivo |
|-------|--------|
| Rutas `proyectos/` vs `projects/` | i18n por segmento; slugs y nombres de ruta distintos por idioma. |
| Render de detalle ES (relacionados, FAQ) vs EN | Contenido y componentes distintos; unificar render exigiría más abstracción sin ganancia clara. |
| Metadata de colección (proyectos por servicio) | Específica por idioma (títulos, descripciones); se puede extraer más adelante si se quiere. |
| Legacy EN (`PROJECTS_EN`) | Casos sin `ProjectDetail`; se mantiene flujo específico con metadata propia. |

---

## 7. Cómo añadir una nueva área tras el refactor

1. **Slugs**  
   Añadir el slug a `src/lib/areas-slugs.ts` (EN y/o ES según corresponda) y a los mapas si aplica.

2. **Metadata**  
   En `src/data/areas-meta.ts`: nueva entrada en `AREA_META_EN` y/o `AREA_META_ES` (title, description).

3. **Contenido**  
   En `src/data/areas-content.ts`: nueva entrada en `CONTENT_EN` y/o `CONTENT_ES` con `h1` y `sections[]` (cada sección: `id`, `heading`, `body` con tipo `text` | `contact` | `links`).

4. **Nada en AreaDetail**  
   El componente ya itera sobre `content.sections` y usa `renderAreaSectionBody`; no hace falta tocar JSX.

Opcional: actualizar sitemap y `generateStaticParams` de la página de áreas si se generan rutas estáticas por slug.

---

## 8. Cómo mantener consistencia entre detalle ES y EN

- **Metadata y breadcrumb**: Cualquier cambio en título, descripción, openGraph o estructura de breadcrumb debe hacerse en `src/lib/project-detail-metadata.ts`. Las dos páginas (proyectos y projects) dependen de ese módulo.
- **JSON-LD (CaseStudy, FAQ)**: Siguen en `src/lib/project-jsonld.ts`. Si se añaden o cambian campos, ambos idiomas los comparten porque ambos usan `buildCaseStudyJsonLd` y `buildFaqJsonLd` con el mismo `ProjectDetail`.
- **Nuevos proyectos**: Añadir el detalle en `data/project-details` (y Sanity si aplica); las rutas estáticas y el sitemap deben seguir incluyendo el slug en ES y EN. Revisar `generateStaticParams` en ambas páginas y el sitemap.

---

## 9. Tabla resumen de cambios

| Archivo | Tipo de cambio | Motivo | Riesgo |
|---------|----------------|--------|--------|
| `src/data/areas-meta.ts` | Nuevo | Una sola fuente de metadata de áreas. | Bajo. |
| `src/data/areas-content.ts` | Nuevo | Contenido fuera del componente; consulta por lang/slug. | Bajo. |
| `src/lib/areas-render.tsx` | Nuevo | Un solo lugar para mailto, CTAs y enlaces de áreas. | Bajo. |
| `src/lib/project-detail-metadata.ts` | Nuevo | Metadata y breadcrumb de detalle compartidos ES/EN. | Bajo. |
| `AreaDetail.tsx` | Refactor | Solo presentación; contenido en data + render. | Bajo. |
| `areas/[areaSlug]/page.tsx` | Modificado | generateMetadata usa getAreaMeta. | Bajo. |
| `proyectos/[slug]/page.tsx` | Modificado | Usa getProjectDetailMetadata y buildProjectBreadcrumbJsonLd. | Bajo. |
| `projects/[slug]/page.tsx` | Modificado | Igual + canonical legacy con siteUrl. | Bajo. |

---

## 10. Validación

- **Typecheck**: `npm run typecheck` ejecutado; sin errores.  
- **Build**: recomendado ejecutar `npm run build` y comprobar rutas `/es/proyectos/*`, `/en/projects/*`, `/es/areas/*`, `/en/areas/*`.  
- **Metadata y JSON-LD**: Misma forma de generación para detalle en ES y EN; breadcrumb y alternates alineados.
