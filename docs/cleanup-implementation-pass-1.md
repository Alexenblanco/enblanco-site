# Limpieza — Lote 1 (implementación)

**Fecha:** 2025-03-06  
**Enfoque:** Mejoras concretas, seguras y reversibles. Sin refactors masivos ni cambios de diseño/copy.

---

## 1. Cambios aplicados

### 1) Unificación de `siteUrl`
- **Qué:** Sustitución de `process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com"` por `getSiteUrl()` importado desde `@/lib/seo` en todos los archivos que usan la URL para metadata, canonical, JSON-LD, Open Graph o URLs absolutas.
- **Archivos tocados:**  
  `contact/page.tsx`, `contacto/page.tsx`, `notes/page.tsx`, `notas/page.tsx`, `services/page.tsx`, `servicios/page.tsx`, `areas/page.tsx`, `areas/[areaSlug]/AreaDetail.tsx`, `enblanco/faq/page.tsx`, `enblanco/metodologia/page.tsx`, `enblanco/methodology/page.tsx`, `enblanco/team/page.tsx`, `enblanco/equipo/page.tsx`, `enblanco/page.tsx`, `proyectos/page.tsx`, `projects/page.tsx`, `services/[slug]/ServiceDetail.tsx`.  
  (Las páginas `proyectos/[slug]` y `projects/[slug]` ya usaban `getSiteUrl()` desde una auditoría anterior.)
- **Motivo:** Una sola fuente de verdad para la URL canónica; cambios de dominio o lógica solo en `lib/seo.ts`.
- **Riesgo:** Bajo. Comportamiento idéntico; solo centralización.

### 2) Extracción de `groupSections`
- **Qué:** Lógica duplicada de agrupación de secciones por `heading` extraída a una utilidad compartida.
- **Archivos tocados:**  
  **Nuevo:** `src/lib/project-sections.ts` (tipos `GroupedSection`, `GroupedSectionBlock`, función `groupSections(sections: ContentSection[])`).  
  **Modificados:** `app/[lang]/(site)/proyectos/[slug]/page.tsx` (eliminados tipo local y función; import desde `@/lib/project-sections`), `app/[lang]/(site)/projects/[slug]/page.tsx` (igual).
- **Motivo:** Eliminar duplicación y garantizar el mismo comportamiento en ES y EN.
- **Riesgo:** Bajo. Misma salida; tipos explícitos.

### 3) Igualar SEO estructural entre detalle ES y EN
- **Qué:** En la página de detalle de proyecto EN (`projects/[slug]/page.tsx`): cuando existe `detail` se añade Open Graph en metadata; cuando hay `contentProject && detail` se añaden CaseStudy y FAQ JSON-LD. Helpers compartidos para JSON-LD.
- **Archivos tocados:**  
  **Nuevo:** `src/lib/project-jsonld.ts` (`buildCaseStudyJsonLd(detail, canonicalUrl, siteUrl)`, `buildFaqJsonLd(detail)`).  
  **Modificados:** `proyectos/[slug]/page.tsx` (eliminadas funciones locales; uso de helpers de `@/lib/project-jsonld`), `projects/[slug]/page.tsx` (metadata con openGraph y robots para detalle; render con CaseStudy y FAQ JsonLd usando los mismos helpers).
- **Motivo:** Misma estructura SEO (OG, CaseStudy, FAQ) en ambos idiomas cuando hay detalle; menos duplicación.
- **Riesgo:** Bajo. CaseStudy en ES pasa a usar `[detail.industry, ...detail.services].slice(0, 5)` en lugar de una lista fija; impacto solo en el array `about` del JSON-LD.

### 4) Desinflar `AreaDetail.tsx`
- **Qué:** Contenido por área e idioma extraído a un módulo de datos; el componente solo renderiza.
- **Archivos tocados:**  
  **Nuevo:** `src/data/areas-content.tsx` (función `getAreaContent(lang, areaSlug)` con todo el switch por idioma y slug; mismo contenido y salida que antes).  
  **Modificado:** `app/[lang]/(site)/areas/[areaSlug]/AreaDetail.tsx` (reducido a ~65 líneas: import de `getAreaContent`, breadcrumb JsonLd, h1 y map de secciones).
- **Motivo:** Reducir un archivo de 859 líneas a uno de ~65; el contenido queda en `data/` y el componente solo presenta.
- **Riesgo:** Bajo. Salida visual y contenido idénticos; solo cambia la ubicación del código.

---

## 2. Archivos tocados (resumen)

| Archivo | Cambio |
|---------|--------|
| `src/lib/project-sections.ts` | Nuevo: `groupSections`, tipos. |
| `src/lib/project-jsonld.ts` | Nuevo: `buildCaseStudyJsonLd`, `buildFaqJsonLd`. |
| `src/data/areas-content.tsx` | Nuevo: `getAreaContent` (contenido áreas ES/EN). |
| `src/app/[lang]/(site)/contact/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/contacto/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/notes/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/notas/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/services/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/servicios/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/areas/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/areas/[areaSlug]/AreaDetail.tsx` | getSiteUrl() + import getAreaContent; componente reducido. |
| `src/app/[lang]/(site)/enblanco/faq/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/enblanco/metodologia/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/enblanco/methodology/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/enblanco/team/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/enblanco/equipo/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/enblanco/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/proyectos/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/projects/page.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/services/[slug]/ServiceDetail.tsx` | siteUrl → getSiteUrl(). |
| `src/app/[lang]/(site)/proyectos/[slug]/page.tsx` | groupSections desde lib; JSON-LD desde lib. |
| `src/app/[lang]/(site)/projects/[slug]/page.tsx` | groupSections desde lib; metadata con openGraph/robots para detalle; CaseStudy y FAQ JsonLd. |

---

## 3. Qué no se ha tocado

- Diseño, copy y estructura visual.
- Rutas, segmentos i18n y redirects.
- APIs (lead, revalidate, draft).
- Sanity, studio, schemas.
- Sitemap, robots, generateStaticParams (salvo lo ya corregido en auditorías previas).
- Componentes que no fueran necesarios para los cambios anteriores (Dock, Filters, ProjectsView, etc.).
- **Candidatos a limpieza:** no se ha borrado nada; solo revisión y documentación (ver sección 4).

---

## 4. Revisión de candidatos a limpieza (sin borrar)

| Candidato | Evidencia | Decisión | Motivo |
|-----------|-----------|----------|--------|
| **`src/proxy.ts`** | No existe `middleware.ts` en raíz ni en `src`. El redirect `/` → `/es` se hace en `app/page.tsx`. Ningún archivo de la app importa `proxy`. | **No borrado.** | Certeza alta de que no se usa, pero no se ha comprobado en todos los entornos/despliegues. Dejar para un segundo pase o borrado manual tras confirmar. |
| **`alternatesLanguages` en `lib/seo.ts`** | Exportado; búsqueda en `src`: ningún archivo lo importa. | **No borrado.** | Útil como helper futuro para estandarizar alternates; borrarlo es reversible pero no aporta mucho en este lote. |
| **Ruta `_dev/sanity`** | Ruta bajo `[lang]/_dev/`; en Next no se ignora por convención; sigue siendo accesible si no hay middleware que la restrinja. | **No tocado.** | Proteger por NODE_ENV o excluir en build sería un cambio de comportamiento; no incluido en este lote. |

---

## 5. Validación

- **Typecheck:** `npm run typecheck` — OK.
- **Build:** `npm run build` — OK (rutas estáticas y dinámicas generadas correctamente).

---

## 6. Cambios que conviene hacer después, pero no en este lote

- **Eliminar `src/proxy.ts`** si se confirma en todos los entornos que no hay middleware que lo use.
- **Usar `alternatesLanguages()`** en las páginas que definen `alternates.languages` a mano, o eliminarlo y documentarlo si se decide no usarlo.
- **Proteger o excluir la ruta `_dev/sanity`** en producción (middleware por NODE_ENV o exclusión en build), si se quiere que no sea accesible.
- **Centralizar email y nombre de marca** (ej. `hola@agenciaenblanco.com`) en una constante o config para no repetir en 15+ sitios.
- **Listas locales en `projects/page.tsx`** (servicios y áreas): importar desde `lib/proyectos-collections` y `lib/areas-slugs` para una sola fuente de verdad.
- **Metadata de áreas** en `areas/[areaSlug]/page.tsx`: extraer a `data/areas-meta.ts` o similar para no duplicar con el contenido de áreas.

---

*Fin del documento. Lote 1 cerrado con typecheck y build correctos.*
