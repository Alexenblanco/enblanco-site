# Auditoría rutinaria de código — enblanco-site

**Fecha:** 2025-03-06  
**Alcance:** Next.js 15 (App Router), TypeScript, i18n [lang], Sanity, SEO, APIs, rendimiento y mantenibilidad.  
**Enfoque:** Conservador; sin rediseño ni refactors agresivos.

---

## 1. Resumen ejecutivo

El proyecto está **estable y bien estructurado** para un sitio corporativo con i18n (es/en), Sanity, formulario de leads y rutas estáticas/dinámicas. La base es sólida.

**Estado de checks al momento de la auditoría:**
- **Build:** ✅ `npm run build` (Next 15.5.9) — OK  
- **Typecheck:** ✅ `tsc --noEmit` — OK  
- **Lint:** ⚠️ `npm run lint` falla con ESLint 9 (busca `eslint.config.*`); `npx next lint` sí usa `.eslintrc.cjs` y pasa con warnings  
- **Test:** ✅ `npm run test` (smoke = typecheck) — OK  

**Hallazgos principales:**
- **Error real corregido:** sitemap generaba URLs de áreas en español con slugs en inglés (`/es/areas/health` en lugar de `/es/areas/salud`). Corregido usando `ES_AREA_SLUGS` y `EN_AREA_SLUGS` desde `@/lib/areas-slugs`.
- **Riesgo bajo:** script `npm run lint` invoca `eslint .` directamente; con ESLint 9 el binario busca flat config. No afecta a `next build` (que usa su integración). Documentado como mejora recomendable.
- **Deuda menor:** helper `alternatesLanguages()` en `src/lib/seo.ts` no está siendo usado (las páginas definen `alternates` inline). Candidato a uso o eliminación documentada.
- **Serverless:** el fallback de leads (`data/failed-leads.json`) está documentado en código como no persistente en Vercel; comportamiento aceptable.

No se detectaron errores de tipos `any` explícitos, incoherencias graves de metadata ni código muerto con referencias activas. La duplicación ES/EN es inherente al i18n por rutas y está acotada.

---

## 2. Hallazgos por severidad

### Crítico
- Ninguno.

### Importante

| # | Qué | Dónde | Riesgo | Acción |
|---|-----|------|--------|--------|
| 1 | Sitemap: áreas en español usaban slugs en inglés | `src/app/sitemap.ts` | URLs incorrectas para `/es/areas/*` (ej. `/es/areas/health` en vez de `/es/areas/salud`) | **Aplicado:** uso de `ES_AREA_SLUGS` y `EN_AREA_SLUGS` desde `@/lib/areas-slugs` para generar las URLs correctas por idioma. |

### Recomendable

| # | Qué | Dónde | Riesgo | Acción |
|---|-----|------|--------|--------|
| 1 | `npm run lint` falla con ESLint 9 | `package.json` scripts | En CI, si se usa `npm run lint`, falla; `next build` sigue pasando porque usa su lint integrado | **No aplicado.** Opciones: (a) usar `npx next lint` en script, (b) migrar a flat config cuando Next lo soporte mejor, o (c) fijar `ESLINT_USE_FLAT_CONFIG=false` si se quiere mantener `.eslintrc.cjs`. Documentado. |
| 2 | Helper `alternatesLanguages()` sin uso | `src/lib/seo.ts` | Código muerto (exportado pero no importado en ninguna página) | **No aplicado.** Opción: usar en páginas que definen `alternates` para reducir duplicación, o eliminar y documentar. Dejado como mejora opcional. |
| 3 | Warnings de lint en build | Filters (aria-selected), ProjectsRail (exhaustive-deps), _dev/sanity (img) | Calidad y accesibilidad; no rompen build | **No aplicado.** Mejoras opcionales; documentadas. |

### Opcional

- Unificar más metadata/alternates con helpers de `seo.ts` para reducir copia entre rutas ES/EN.
- Revisar si `studio/schema.json` y `studio/sanity.types.ts` deben seguir versionados o generarse en CI (hoy están en repo; es válido para no exigir typegen en cada clone).
- Considerar migración a `next lint` → ESLint CLI cuando Next 16 estabilice el mensaje de deprecación.

---

## 3. Quick wins (ya aplicados o triviales)

- **Sitemap áreas:** corregido uso de slugs ES/EN en `src/app/sitemap.ts` (ver tabla importante).

---

## 4. Mejoras aplazadas

- Estandarizar uso de `alternatesLanguages()` en metadata de páginas.
- Resolver script `lint` vs ESLint 9 (next lint vs eslint directo).
- Añadir `aria-selected` donde el linter lo pide en Filters (y, si aplica, revisar dependencias en ProjectsRail).
- Sustituir `<img>` por `<Image />` en `_dev/sanity/page.tsx` si esa ruta es accesible en producción; si es solo dev, se puede ignorar o excluir del lint.

---

## 5. Candidatos a eliminar (no eliminados)

| Candidato | Motivo | Evidencia de no uso | Nivel de confianza |
|-----------|--------|---------------------|--------------------|
| `alternatesLanguages` en `src/lib/seo.ts` | Exportado pero nunca importado | Búsqueda en `src`: ningún archivo importa `alternatesLanguages` | Alta. No borrado: puede usarse en futura refactor de metadata. |
| Ningún archivo huérfano detectado | — | Imports y rutas revisados para componentes y páginas clave | — |

No se propone borrado automático de archivos; solo `alternatesLanguages` queda como función no usada y se deja para decisión posterior.

---

## 6. Tabla final: archivo / problema / acción / riesgo

| Archivo | Problema | Acción tomada | Riesgo |
|---------|----------|----------------|--------|
| `src/app/sitemap.ts` | Áreas con slugs únicos EN para ES y EN (URLs ES incorrectas) | Import de `ES_AREA_SLUGS` y `EN_AREA_SLUGS`; generación de entradas por idioma con su slug set | Bajo. Solo añade URLs correctas para /es/areas/*. |
| Resto del repo | Sin cambios aplicados | — | — |

---

## 7. Cosas que NO se han tocado

- **Lógica de negocio y UX:** formulario de contacto, validaciones, envío de leads, revalidate.
- **Diseño y copy:** estilos, textos, componentes de UI (Dock, Filters, ProjectsRail, etc.).
- **Rutas y i18n:** estructura `[lang]`, redirects, `withLang`, `isValidLang`, páginas duplicadas ES/EN.
- **Sanity:** queries, client, fetch, image; tipado en `lib/sanity/types.ts` y uso en `_dev/sanity`.
- **APIs:** validación y rate limit en `api/lead`, uso de secret en `api/revalidate`, persistencia de fallback en `data/`.
- **Metadata y SEO:** generación por página, canonicals, Open Graph; uso de `getSiteUrl`, `absoluteUrl` y `JsonLd`.
- **Dependencias:** versiones de Next, React, Sanity, Tailwind, etc.
- **Studio:** schema, config, typegen; decisión de versionar o no `schema.json` y `sanity.types.ts`.
- **Scripts:** smoke, copy-env-for-studio, check-assets, convert-images (se asume que siguen en uso).
- **Documentación en `docs/`:** no se ha actualizado contenido existente salvo este informe.

---

## 8. Detalle por bloques de la auditoría

### A) Salud general del repo
- Estructura clara: `src/app`, `src/components`, `src/lib`, `src/data`, `src/content`, `studio/`, `scripts/`, `docs/`.
- Configuración coherente: `tsconfig` excluye `studio`; paths `@/*` → `src/*`; `.eslintrc.cjs` con ignore `studio/**`.
- `.gitignore` adecuado: `node_modules`, `.next`, `.env*`, `data/failed-leads.json`, `*.tsbuildinfo`, `next-env.d.ts`.
- `studio/schema.json` y `studio/sanity.types.ts` están versionados (decisión consciente para no exigir typegen en cada entorno).
- No se detectaron restos de migraciones ni carpetas obsoletas en raíz.

### B) TypeScript y calidad de código
- Sin `any` explícito en el código revisado.
- Tipos consistentes en `data/`, `content/`, Sanity y props de componentes.
- `lib/seo.ts`: `getSiteUrl()` siempre devuelve la URL canónica; `absoluteUrl` y `alternatesLanguages` bien tipados. Solo `alternatesLanguages` no tiene uso actual.
- Duplicación ES/EN en páginas es esperable (rutas y copy por idioma); no se propone refactor grande.

### C) Next.js / App Router / i18n
- Rutas alineadas con `[lang]` y grupos `(site)` y `(legal)`; redirects por idioma en contacto/contacto y contact/contacto.
- `notFound()` en layout de `[lang]` cuando `lang` no es válido.
- Sitemap: corregido el bloque de áreas; resto de entradas (proyectos, notas, servicios, etc.) ya usaban fuentes correctas.
- No se han visto restos de un sistema de idiomas distinto a `[lang]`.

### D) SEO técnico
- `getSiteUrl()` centralizado y usado en layout, sitemap, robots, RSS y JSON-LD.
- Robots condicionado por `VERCEL_ENV`/`NODE_ENV` (solo producción indexable).
- Sitemap con prioridades y `lastModified` coherentes; tras el fix, áreas ES/EN correctas.
- Metadata y alternates definidos por página; canonicals y lenguajes coherentes en las rutas revisadas.

### E) Rendimiento y frontend
- Uso de `next/image` en rutas principales; warning solo en `_dev/sanity` (página de desarrollo).
- Framer Motion y componentes client acotados (ContactGuidedFlow, ProjectsRail, Dock, etc.); no se han visto patrones claramente costosos.
- No se ha hecho análisis exhaustivo de bundles; no se proponen cambios de carga sin medición.

### F) APIs / seguridad / robustez
- `api/lead`: validación de body, rate limit por IP, honeypot, escape de texto; Resend para envío; fallback a `data/failed-leads.json` con comentario sobre limitaciones serverless.
- `api/revalidate`: comprobación de secret; tipos permitidos y tags acotados.
- `api/draft`: enable/disable con uso estándar de draft mode.
- No se han introducido cambios en validación ni manejo de secretos.

### G) Sanity / CMS
- Integración en `lib/sanity` (client, fetch, image, queries); tipos reexportados desde `types.ts` y usados en queries.
- Página `_dev/sanity` usa `getProjectsIndex` y `buildImageUrl`; útil en desarrollo.
- Studio en `studio/` con su propio `package.json`; typegen documentado en script y en `lib/sanity/types.ts`.

### H) Escalabilidad y elegancia
- Slugs de servicios, áreas y proyectos centralizados en `lib/`; sitemap y rutas dinámicas consumen las mismas fuentes.
- Añadir nuevos proyectos/notas/servicios implica tocar `data/`, `content/` o Sanity y, en su caso, slugs en `lib/`; el patrón es repetible sin refactors grandes.

---

## 9. Checklist específico del proyecto

| Punto | Estado |
|-------|--------|
| Archivos generados / studio versionados | `studio/schema.json` y `studio/sanity.types.ts` versionados; documentado como opción válida. |
| Sistema [lang] limpio | Sin restos de otra estructura de idiomas. |
| Sitemap / robots / metadata / canonicals | Coherentes; sitemap corregido para áreas ES/EN. |
| Slugs y fuentes de verdad | Centralizados en `lib/`; una fuente por tipo de slug. |
| Componentes/utilidades sin uso real | Solo `alternatesLanguages` sin imports; documentado. |
| Lógica repetida ES/EN | Reducible con helpers (ej. alternates); no crítico. |
| Contacto/leads | Validación, rate limit, Resend y fallback documentado; robusto para el alcance actual. |
| Señales de crecimiento desordenado | No; estructura y convenciones consistentes. |
| Scripts/configuraciones obsoletas | No detectadas; scripts en uso referenciados en `package.json`. |
| Oportunidades de simplificación | Uso de `alternatesLanguages` y unificación de metadata; opcionales. |

---

*Fin del informe. Cambios aplicados: únicamente la corrección del sitemap para áreas ES/EN.*
