# Auditoría i18n y plan de migración (conservador)

**Fecha:** 2025-03-05  
**Objetivo:** Un solo sistema basado en `[lang]`, sin duplicidad ni código muerto. Borrar `/en` y `/es` solo si es 100% seguro.

---

## A) Hallazgos de la auditoría

### 1. Estructura actual de `/app`

| Ubicación | Contenido |
|-----------|-----------|
| `app/page.tsx` | Redirige a `/es` (único punto de entrada raíz). |
| `app/layout.tsx` | Layout raíz (sin lógica i18n). |
| `app/[lang]/` | **Segmento dinámico:** layout (valida `lang` con `isValidLang`), page (home), contact, contacto, cookies, legal-notice, aviso-legal, privacy, privacidad, notes, notas, projects, proyectos. **No tiene:** enblanco/*, areas/*, services/*, projects/[slug], notas/[slug], ni páginas estáticas por servicio/área. |
| `app/en/` | **Árbol completo EN:** page, contact, cookies, legal-notice, privacy, notes, notes/[slug], projects, projects/[slug], projects/{branding, art-direction, …}, enblanco, enblanco/team, faq, methodology, areas, areas/{culture, food, …}, services, services/{branding, …}, _dev/sanity. |
| `app/es/` | **Árbol completo ES:** page, contacto, cookies, aviso-legal, privacidad, notas, notas/[slug], proyectos, proyectos/[slug], proyectos/{branding, …}, enblanco, enblanco/equipo, faq, metodologia, areas, areas/{cultura, …}, servicios, servicios/{…}, _dev/sanity. |

**Conclusión:** Las rutas que realmente sirven el sitio en producción son **`/en` y `/es`** (carpetas estáticas). El segmento `[lang]` solo cubre un subconjunto (home, contacto, legal, listados de notas/proyectos); **no** cubre detalle de proyecto, detalle de nota, enblanco, áreas ni servicios. Next.js da prioridad a segmentos estáticos, así que para `/en` y `/es` se usan siempre `app/en/*` y `app/es/*`, no `app/[lang]/*`.

### 2. Dependencias de `/en` y `/es`

- **Routing:** Toda la navegación real usa URLs `/en/...` y `/es/...`; no hay middleware que reescriba a `[lang]`.
- **Links internos:**
  - `src/lib/dock-config.ts`: usa `withLang("es"|"en", path)` → genera `/es/...` y `/en/...` (correcto).
  - `src/lib/i18n/path.ts`: `withLang`, `getLangFromPathname` (pathname empieza por `/en` → "en", si no → "es").
  - `src/components/Dock/FloatingDock.tsx`: home hardcodeado `"/es"` y `"/en"` (se puede unificar con `withLang`).
  - `src/components/projects/ProjectMeta.tsx`: enlace "Ver proyecto" fijado a `/es/proyectos/...` (debe depender del locale).
  - Páginas bajo `en/` y `es/`: múltiples `Link href="/en/..."` y `href="/es/..."` (coherentes con la estructura actual).
- **Metadata / SEO:**
  - Canonical y `alternates.languages` en todas las páginas apuntan a `/es/...` y `/en/...` (correcto para la estructura actual).
  - `src/app/sitemap.ts`: genera URLs `/es` y `/en` y todas las rutas bajo ellas (proyectos, notas, etc.).
- **Helpers:** `getLocaleFromPathname` (dock-config), `getLangFromPathname` (path.ts), `isValidLang` (path.ts). Ninguno depende de carpetas físicas; solo del pathname.
- **Root:** `app/page.tsx` hace `redirect("/es")`; no toca `/en`.

No hay `middleware.ts` en `src`; no hay config i18n en `next.config`.  
No se han revisado tests/snapshots (no aparecen en la búsqueda).

### 3. Rutas que solo existen bajo `/en` o `/es` (no bajo `[lang]`)

- Home por idioma: `en/page.tsx`, `es/page.tsx` (sirven `/en`, `/es`).
- Detalle proyecto: `en/projects/[slug]`, `es/proyectos/[slug]`.
- Detalle nota: `en/notes/[slug]`, `es/notas/[slug]`.
- Enblanco: `en/enblanco`, team, faq, methodology; `es/enblanco`, equipo, faq, metodologia.
- Áreas: `en/areas`, `en/areas/{culture,food,health,...}`; `es/areas`, `es/areas/{cultura,alimentacion,...}`.
- Servicios: `en/services`, `en/services/{branding,...}`; `es/servicios`, `es/servicios/{...}`.
- Páginas estáticas de proyecto por servicio: `en/projects/branding`, etc.; `es/proyectos/branding`, etc.
- Dev: `en/_dev/sanity`, `es/_dev/sanity`.

Si se borran `app/en` y `app/es` sin más, **todas** estas rutas dejan de existir y el sitio se rompe.

---

## B) Validación de que `[lang]` sea el único sistema

- **Páginas bajo `[lang]`:** layout + page (home) + contact, contacto, cookies, legal-notice, aviso-legal, privacy, privacidad, notes, notas, projects, proyectos. **No** hay not-found/error/loading específicos de i18n.
- **Layout `[lang]`:** recibe `params.lang`, valida con `isValidLang(lang)` y hace `notFound()` si no es válido. Tipo de `params` no está tipado como `{ lang: "es" | "en" }`.
- **Middleware:** no existe; no hay redirect/rewrite a `/en` o `/es`.
- **Metadata:** las páginas bajo `[lang]` ya usan canonical y alternates con `/es` y `/en` (correctos para la URL pública actual).

Para que `[lang]` sea el **único** sistema habría que:

1. Recrear bajo `[lang]` todas las rutas que hoy solo están en `en/` y `es/` (incl. [slug], enblanco/*, areas/*, services/*, páginas estáticas por servicio/área).
2. Gestionar rutas con nombre distinto por idioma (p. ej. `projects` vs `proyectos`, `notes` vs `notas`) manteniendo la misma URL pública (`/en/projects`, `/es/proyectos`).
3. Solo después de eso sería seguro eliminar las carpetas `app/en` y `app/es`.

---

## C) Compatibilidad y redirecciones

- Las URLs públicas son ya `/en/*` y `/es/*`. No se cambia la URL; solo la implementación (carpetas estáticas vs `[lang]`).
- Si en el futuro se elimina `en/` y `es/` y todo vive bajo `[lang]`, las URLs pueden seguir siendo `/en/...` y `/es/...` (el segmento `[lang]` toma el valor "en" o "es"). No hace falta redirect 301 por cambio de URL.
- No existe ruta sin prefijo de idioma (p. ej. `/proyectos`); la raíz redirige a `/es`.

---

## D) Cambios realizados (conservadores)

1. **Tipado y helpers i18n**
   - Se exporta `Lang` desde `@/lib/i18n/path` (alias de `Locale`) para uso en código; el layout mantiene `params: Promise<{ lang: string }>` por compatibilidad con el tipo que exige Next.js.
   - El layout de `[lang]` sigue validando con `isValidLang(lang)` y haciendo `notFound()` si el valor no es válido.

2. **Dock**
   - `FloatingDock.tsx`: sustitución de `"/es"` y `"/en"` por `withLang(locale, "")` para que el home dependa del helper y sea coherente con el resto de enlaces.

3. **ProjectMeta**
   - Nuevo prop opcional `detailBasePath` (ej. pathname de la lista de proyectos).
   - Enlace "Ver proyecto": si existe `detailBasePath`, se usa `${detailBasePath}/${slug}`; si no, se mantiene el fallback actual `/es/proyectos/...` para no romper usos existentes.
   - En `ProjectsView` se pasa `pathname` como `detailBasePath` a `ProjectMeta`, de modo que en `/en/projects` el enlace vaya a `/en/projects/...` y en `/es/proyectos` a `/es/proyectos/...`.

4. **Documentación**
   - Este informe en `docs/i18n-migration-report.md` con hallazgos, qué depende de `/en`/`/es`, y plan de transición.

**No se ha hecho:**
- No se han eliminado las carpetas `app/en` ni `app/es`.
- No se han añadido redirecciones en middleware ni en `next.config`.
- No se han movido rutas de `en/`/`es/` a `[lang]` en esta fase.

---

## E) Por qué NO se han borrado `/en` y `/es`

- Casi todo el sitio (home, proyectos con detalle, notas, enblanco, áreas, servicios) **solo** está implementado bajo `app/en` y `app/es`.
- `app/[lang]` solo cubre: home, contact/contacto, cookies, legal/aviso, privacy/privacidad, listados notes/notas y projects/proyectos. No hay detalle de proyecto/nota, ni enblanco, ni áreas, ni servicios bajo `[lang]`.
- Borrar `en/` y `es/` sin migrar esas rutas a `[lang]` rompería el sitio.

Por tanto, en esta pasada **no** se eliminan; solo se documenta y se deja el código más coherente (withLang, tipado, enlace de ProjectMeta por locale).

---

## F) Los tres pasos para migrar y borrar `/en` y `/es`

### Paso 1: Migrar todo a `[lang]`

- **Hecho:** Todas las rutas que estaban en `app/en` y `app/es` existen ya bajo `app/[lang]`:
  - Home: `[lang]/page.tsx`
  - Contact: `[lang]/contact/page.tsx`, `[lang]/contacto/page.tsx` (con redirect al path correcto según idioma)
  - Legal: `[lang]/legal-notice`, `[lang]/aviso-legal`, `[lang]/privacy`, `[lang]/privacidad`, `[lang]/cookies` (con redirects cuando el path no corresponde al idioma)
  - Projects: `[lang]/projects/page.tsx`, `[lang]/proyectos/page.tsx`, `[lang]/projects/[slug]/page.tsx`, `[lang]/proyectos/[slug]/page.tsx` (colecciones y detalle; redirects EN↔ES)
  - Notes: `[lang]/notes`, `[lang]/notas`, `[lang]/notes/[slug]`, `[lang]/notas/[slug]`
  - Enblanco: `[lang]/enblanco`, `[lang]/enblanco/team`, `[lang]/enblanco/equipo`, `[lang]/enblanco/faq`, `[lang]/enblanco/methodology`, `[lang]/enblanco/metodologia` (redirects team↔equipo, methodology↔metodologia)
  - Areas: `[lang]/areas/page.tsx`, `[lang]/areas/[areaSlug]/page.tsx` (slugs EN/ES distintos; redirect cuando slug no corresponde al idioma)
  - Services: `[lang]/services/page.tsx`, `[lang]/servicios/page.tsx`, `[lang]/services/[slug]/page.tsx`, `[lang]/servicios/[slug]/page.tsx` (redirects y mapeos EN↔ES en `src/lib/services-slugs.ts`)
  - Dev: `[lang]/_dev/sanity/page.tsx` (usa `params.lang` y `getProjectsIndex(lang)`)
- **Mapeos:** `src/lib/areas-slugs.ts` (EN_AREA_SLUGS, ES_AREA_SLUGS, EN_TO_ES_AREA_SLUG, ES_TO_EN_AREA_SLUG), `src/lib/services-slugs.ts` (EN_SERVICE_PAGE_SLUGS, ES_SERVICE_PAGE_SLUGS, EN_TO_ES_SERVICE_SLUG, ES_TO_EN_SERVICE_SLUG). Colecciones de proyectos en `src/lib/proyectos-collections.ts`.

### Paso 2: Verificar URLs y `generateStaticParams`

- **URLs públicas:** Siguen siendo `/en/...` y `/es/...`; el segmento dinámico `[lang]` toma los valores `"en"` y `"es"`, por lo que no hay cambio de URL para el usuario.
- **generateStaticParams:** Definido en:
  - `[lang]/projects/[slug]`, `[lang]/proyectos/[slug]` (slugs de detalle + colecciones)
  - `[lang]/notes/[slug]`, `[lang]/notas/[slug]`
  - `[lang]/areas/[areaSlug]` (todos los pares `{ lang, areaSlug }` EN y ES)
  - `[lang]/services/[slug]`, `[lang]/servicios/[slug]` (todos los slugs de servicio por idioma)
- **Comprobación:** Ejecutar `npm run build` y revisar que no haya rutas rotas; navegar manualmente a `/en`, `/es`, listados y detalles.

### Paso 3: Borrar `app/en` y `app/es`

- **Cuándo:** Solo después de que el Paso 1 y el Paso 2 estén completos y el build pase.
- **Acción:** Eliminar las carpetas `src/app/en` y `src/app/es` por completo.
- **Después:** Ejecutar de nuevo `npm run build` y comprobar que todas las rutas se generen bajo `[lang]` y que no queden referencias a `en/` o `es/` en el código (links ya usan `withLang`, por lo que no dependen de carpetas).
- **Estado:** Tras el borrado, el único sistema de rutas es `[lang]`; las URLs públicas se mantienen (`/en/...`, `/es/...`).

### Estado actual (migración completada)

- **Paso 1 y 2:** Completados.
- **Paso 3:** Completado. Las carpetas `src/app/en` y `src/app/es` han sido eliminadas. El único sistema de rutas es `app/[lang]`. Las URLs públicas siguen siendo `/en/...` y `/es/...` (el segmento dinámico `[lang]` toma "en" o "es"). `npm run build` termina con éxito y solo se generan rutas bajo `[lang]`.
- **Nota:** Los avisos `themeColor` en metadata son previos (layout raíz); no impiden el build. Opcional: mover `themeColor` a `viewport` export según la doc de Next.js.

### Comprobación estilos y animaciones en `[lang]` (pre-borrado)

Verificación realizada para asegurar que, al borrar `app/en` y `app/es`, las rutas servidas por `[lang]` mantienen los mismos estilos y animaciones:

| Aspecto | Estado |
|--------|--------|
| **Layout** | `[lang]/layout.tsx` incluye `ProjectTransitionProvider` (igual que `es/layout`). Se añadió también a `en/layout.tsx` para paridad. |
| **Root** | `app/layout.tsx` aplica `globals.css`, fuentes, `.page`, `FloatingDock` y `SetLocaleLang` a todas las rutas (incluidas las de `[lang]`). |
| **Home** | `[lang]/page.tsx` usa las mismas clases que `en/page` y `es/page`: `min-h-screen bg-zinc-50`, `border-b border-zinc-200 bg-white/80 backdrop-blur`, `max-w-5xl`, `gap-16`, footer con `border-t border-zinc-200 bg-white`. |
| **Contacto** | `[lang]/contact` y `[lang]/contacto`: mismo `<main className="mx-auto max-w-3xl px-6 py-10">`, secciones y estilos de formulario (inputs, botón, enlaces). |
| **Proyectos (lista)** | `[lang]/projects` = lista estática (como `en/projects`). `[lang]/proyectos` = `ProjectsView` con `main className="proyectos-page mx-auto w-full max-w-[100vw] overflow-x-hidden"` y `Suspense` (como `es/proyectos`). |
| **Proyectos (detalle)** | `[lang]/projects/[slug]` y `[lang]/proyectos/[slug]` usan `ProjectDetailBlurWrapper`, `ProjectHero`, `ProjectGalleryItem` (mismo que `en` y `es`). |
| **Animaciones** | `ProjectTransitionProvider` en `[lang]` permite transición al detalle desde `ProjectsView` (rail, overlay). `ProjectMeta`, `ProjectsRail`, `Filters`, `NavSheet`, `DockItem` usan `framer-motion`; al ser componentes compartidos, se comportan igual bajo `[lang]`. |
| **CSS** | `.page`, `.proyectos-page`, variables CSS y estilos globales están en `globals.css` (layout raíz); aplican a todas las páginas de `[lang]`. |

Conclusión: estilos, animaciones y estructura en `[lang]` son equivalentes a los de `en` y `es`. Es seguro borrar `app/en` y `app/es`.

---

## G) Checklist de verificación (esta pasada)

- [x] Auditoría documentada (este informe).
- [x] Tipado `Lang` exportado desde `@/lib/i18n/path`; layout `[lang]` valida con `isValidLang(lang)`.
- [x] Dock usa `withLang(locale, "")` para el home.
- [x] ProjectMeta usa `detailBasePath` cuando se pasa (ProjectsView pasa pathname).
- [x] No se han borrado `app/en` ni `app/es`.
- [x] `npm run build` sin errores.
- [ ] `npm run lint`: hay errores/warnings previos (scripts, setState en effects, refs en render); no introducidos por esta migración.
- [ ] Navegación manual: `/es`, `/en`, `/es/proyectos`, `/en/projects`, detalle proyecto, notas, contacto.
