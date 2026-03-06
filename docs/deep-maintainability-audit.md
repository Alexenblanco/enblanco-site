# Auditoría profunda de mantenibilidad — enblanco-site

**Fecha:** 2025-03-06  
**Enfoque:** Deuda técnica, escalabilidad, elegancia, fragilidad estructural. Sin revisión superficial; evidencia archivo por archivo.

---

## 1. Resumen ejecutivo (brutalmente honesto)

El proyecto **compila y funciona**, pero **no está bien pensado para crecer**. Hay varias decisiones que hoy son manejables con pocos proyectos/notas/áreas y que se convertirán en cuellos de botella claros cuando se añadan más contenidos, idiomas o rutas.

**Diagnóstico en una frase:** Estructura de carpetas aceptable, pero fuentes de verdad dispersas, duplicación ES/EN estructural (no solo copy), un archivo de 859 líneas que concentra todo el contenido de áreas, uso inconsistente del helper de URL canónica, y dos sistemas de “proyectos” en paralelo (datos estáticos vs Sanity) sin un criterio único. No es un desastre, pero sí deuda técnica relevante y fragilidad que conviene atajar pronto.

**Lo que está bien:** i18n por `[lang]` coherente; slugs de áreas y servicios centralizados en `lib/` con mapas ES↔EN; notas con una sola fuente (`data/notes-index`); APIs de lead y revalidate razonablemente robustas; tipo TypeScript sin `any` explícito.

**Lo que está regular o mal:** URL base repetida en ~15 sitios en lugar de `getSiteUrl()`; páginas de proyecto ES y EN con lógica y SEO duplicados y asimétricos (EN sin CaseStudy/FAQ JSON-LD en detalle); sitemap y `generateStaticParams` que dependen de recordar actualizar varios archivos; `AreaDetail.tsx` de 859 líneas; lista de servicios/áreas en `projects/page.tsx` duplicada respecto a `lib/`; helper `alternatesLanguages` sin uso; posible código muerto (`proxy.ts`).

---

## 2. Qué partes están realmente bien resueltas

| Zona | Evidencia |
|------|-----------|
| **i18n por segmento** | `[lang]` con `isValidLang`, redirects por idioma, rutas es/en paralelas. `lib/i18n/path.ts` con `withLang`, `getLangFromPathname`. |
| **Slugs de áreas** | Una fuente: `lib/areas-slugs.ts` con `ES_AREA_SLUGS`, `EN_AREA_SLUGS`, mapas bidireccionales. Sitemap y rutas los consumen. |
| **Notas** | Una fuente: `data/notes-index.ts` (NOTAS_ES, NOTES_EN). Listado, detalle, RSS y sitemap usan el mismo dato. |
| **Slugs de servicios (páginas)** | `lib/services-slugs.ts` con ES/EN y mapas. Servicios detalle y sitemap los usan. |
| **APIs lead/revalidate** | Validación, rate limit, honeypot, Resend, fallback documentado. Sin secretos en cliente. |
| **Tipado** | Sin `any` en código de app; tipos en Sanity reexportados desde `lib/sanity/types.ts`. |

---

## 3. Qué partes están “bien pero frágiles”

| Zona | Problema | Riesgo |
|------|----------|--------|
| **Sitemap** | Debe importar y combinar: `PROJECT_DETAILS`, `NOTAS_ES/NOTES_EN`, `ES/EN_SERVICE_SLUGS`, `ES/EN_SERVICE_PAGE_SLUGS`, `PROJECT_SLUGS`, `ES/EN_AREA_SLUGS`, más la constante `EN_PROJECTS_EN_KEYS = ["ejemplo"]`. Añadir un proyecto, nota, área o servicio implica tocar sitemap + datos + a veces `generateStaticParams`. | Olvido al añadir contenido → URLs no indexadas o estáticas no generadas. |
| **generateStaticParams (proyectos)** | ES: `PROJECT_DETAILS` + `ES_SERVICE_SLUGS`. EN: `Object.keys(PROJECTS_EN)` + `PROJECT_SLUGS` + `EN_SERVICE_SLUGS`. La lista EN está en dos sitios (página + sitemap). | Inconsistencia silenciosa entre rutas estáticas y sitemap. |
| **Metadata y alternates** | Cada página define `alternates.languages` a mano. Existe `alternatesLanguages(esPath, enPath)` en `lib/seo.ts` pero **no se usa en ninguna página**. | Duplicación y riesgo de paths incorrectos al copiar/pegar. |
| **Proyectos: datos vs Sanity** | Producción usa `data/project-details`, `content/projects`, `data/projects`. Sanity tiene queries y tipos; solo se usan en `_dev/sanity`. Si en el futuro se quiere pasar a Sanity, hay que migrar datos y rutas a la vez. | Dos “fuentes de verdad” conceptuales; migración futura más costosa. |

---

## 4. Qué partes ya muestran deuda técnica

| Zona | Evidencia concreta |
|------|--------------------|
| **URL base (siteUrl)** | `getSiteUrl()` existe en `lib/seo.ts` y se usa en layout, sitemap, robots, RSS, notas. Pero en **más de una docena de archivos** se usa `process.env.NEXT_PUBLIC_SITE_URL \|\| "https://www.agenciaenblanco.com"` en lugar del helper: `proyectos/[slug]/page.tsx`, `projects/[slug]/page.tsx`, `proyectos/page.tsx`, `projects/page.tsx`, `contact/page.tsx`, `contacto/page.tsx`, `notes/page.tsx`, `notas/page.tsx`, `services/page.tsx`, `servicios/page.tsx`, `areas/page.tsx`, `areas/[areaSlug]/AreaDetail.tsx`, `enblanco/*.tsx`, `services/[slug]/ServiceDetail.tsx`, `faq/page.tsx`. Si cambia el dominio o la lógica (ej. www vs no-www), hay que tocar todos. |
| **Páginas de detalle de proyecto ES vs EN** | `app/[lang]/(site)/proyectos/[slug]/page.tsx` (~400 líneas): usa `getProjectDetailBySlug`, `groupSections`, `buildCaseStudyJsonLd`, `buildFaqJsonLd`, metadata completa, Open Graph. `app/[lang]/(site)/projects/[slug]/page.tsx` (~325 líneas): misma lógica de detalle en parte duplicada, **pero** cuando hay `contentProject && detail` **no** se renderizan CaseStudy ni FAQ JSON-LD (solo breadcrumb). Metadata para detalle EN tampoco incluye openGraph. Duplicación semántica y asimetría SEO. |
| **groupSections** | Implementada dos veces: en `proyectos/[slug]/page.tsx` (con `eyebrow`, `media`, `mediaRef`) y en `projects/[slug]/page.tsx` (solo `body`, `mediaRef`). Misma idea, tipos ligeramente distintos; debería ser una utilidad compartida. |
| **Listas servicios/áreas en projects/page.tsx** | Constantes locales `services` y `areas` con slugs y nombres. Esas listas ya existen en `lib/proyectos-collections` (EN_SERVICE_SLUGS, EN_COLLECTION_TITLES) y `lib/areas-slugs` (EN_AREA_SLUGS). Añadir un servicio o área obliga a tocar lib + esta página. |
| **PROJECTS_EN y EN_PROJECTS_EN_KEYS** | En `projects/[slug]/page.tsx`, `PROJECTS_EN = { ejemplo: { client: "Example client", ... } }`. En `sitemap.ts`, `EN_PROJECTS_EN_KEYS = ["ejemplo"]`. La lista de slugs EN “extra” (no de PROJECT_DETAILS) está duplicada; si se añade otra clave a PROJECTS_EN, hay que acordarse de actualizar el sitemap. |

---

## 5. Qué partes escalarán mal si el proyecto crece

| Zona | Evidencia | Por qué escala mal |
|------|-----------|--------------------|
| **AreaDetail.tsx** | **859 líneas.** Un solo componente con una función `getAreaContent(lang, areaSlug)` que es un `switch` gigante por idioma y slug, con bloques de JSX inline (párrafos, enlaces, mailto repetido). Metadata de áreas en `areas/[areaSlug]/page.tsx` también duplica títulos/descripciones por slug en dos objetos (EN y ES). | Cada nueva área = decenas de líneas más en el mismo archivo. Un solo archivo para todo el contenido de áreas; difícil de revisar, testear o delegar. El patrón “todo en un switch” es típico de generación iterativa y no escala. |
| **Añadir un proyecto** | Hoy: (1) `data/projects` (listado), (2) `data/project-details` (detalle ES/EN), (3) opcionalmente `content/projects/<slug>.ts` (manifest con hero, gallery), (4) `content/projects/index.ts` (import + PROJECT_SLUGS), (5) sitemap ya usa PROJECT_DETAILS y PROJECT_SLUGS. Para EN “solo EN”: (6) `PROJECTS_EN` en projects/[slug]/page y (7) `EN_PROJECTS_EN_KEYS` en sitemap. | Hasta 7 puntos de contacto para un proyecto nuevo; fácil olvidar uno y tener rutas rotas o no indexadas. |
| **Añadir un servicio** | Hay que tocar: `lib/proyectos-collections` (ES_SERVICE_SLUGS, EN_SERVICE_SLUGS, títulos, mapas), `lib/services-slugs` (si es página de servicio distinta de colección), `app/.../projects/page.tsx` (array `services` local), `app/.../proyectos/page.tsx` si se muestra algo por servicio, sitemap. Además, proyectos-collections usa “creative-strategy” (colección) y services-slugs “creative-strategy-campaigns” (página); la relación no es 1:1. | Varios archivos y dos conceptos (colección vs página de servicio); naming parecido pero distinto. |
| **Email y contacto** | `hola@agenciaenblanco.com` y “agenciaenblanco” aparecen en layout, contact, contacto, AreaDetail (varias veces), ServiceDetail, faq, metodologia, methodology, team, equipo, enblanco, projects. | Cambio de email o marca = muchos reemplazos; no hay constante compartida. |

---

## 6. Hallazgos priorizados

### Crítico
Ninguno que rompa el sitio hoy. Los problemas son de mantenibilidad y consistencia.

### Importante

| # | Archivo(s) / Zona | Problema concreto | Por qué importa | Riesgo actual | Riesgo futuro | Solución mínima | Solución ideal |
|---|-------------------|-------------------|-----------------|---------------|---------------|----------------|----------------|
| 1 | `app/[lang]/(site)/areas/[areaSlug]/AreaDetail.tsx` | 859 líneas; todo el contenido de áreas en un switch con JSX inline; mailto repetido muchas veces. | Un solo archivo para todo el contenido de áreas; cualquier cambio de copy o nueva área infla más el archivo. | Bajo (funciona). | Alto: ilegible, conflictos en git, difícil de mantener. | Extraer datos (títulos, párrafos) a un módulo `data/areas-content.ts` o por slug; mantener un solo switch pero con contenido referenciado. | Contenido por área en JSON/TS; componente solo presenta; o CMS para áreas. |
| 2 | `proyectos/[slug]/page.tsx` y `projects/[slug]/page.tsx` | Lógica de detalle y metadata duplicada; EN no tiene CaseStudy ni FAQ JSON-LD ni openGraph en detalle. | SEO asimétrico entre ES y EN; duplicación hace que cambios se apliquen solo a un idioma por error. | Medio: EN con menos structured data. | Alto: más proyectos = más divergencia. | Añadir en EN (cuando hay detail) CaseStudy y FAQ JSON-LD y openGraph igual que ES. Extraer `groupSections` y builders de JSON-LD a `lib/` o componente compartido. | Un solo flujo de “project detail” parametrizado por lang; metadata y JSON-LD desde helpers compartidos. |
| 3 | Uso de `siteUrl` en ~15 archivos | Se repite `process.env.NEXT_PUBLIC_SITE_URL \|\| "https://www.agenciaenblanco.com"` en lugar de `getSiteUrl()`. | Cambio de dominio o lógica de canonical en un solo lugar (seo.ts) no se refleja en todas las páginas. | Bajo. | Medio: inconsistencia de URLs en metadata o JSON-LD. | Sustituir en cada archivo por `import { getSiteUrl } from "@/lib/seo"; const siteUrl = getSiteUrl();`. | Ya existe el helper; solo falta usarlo en todos. |
| 4 | Sitemap y generateStaticParams | Sitemap ensambla 8+ fuentes; EN_PROJECTS_EN_KEYS duplicado con PROJECTS_EN. Añadir proyecto/nota/servicio/área implica varios archivos. | Olvido de actualizar sitemap o params → 404 o URLs no indexadas. | Bajo. | Alto cuando crezcan contenidos. | Documentar checklist “al añadir X tocar Y”. A medio plazo: una función/capa que exponga “todas las URLs estáticas” y que sitemap y generateStaticParams consuman. | Una única fuente de “rutas estáticas” por tipo (proyectos, notas, servicios, áreas) y por idioma; sitemap y params la consumen. |

### Recomendable

| # | Archivo(s) | Problema | Por qué importa | Solución mínima | Solución ideal |
|---|------------|----------|----------------|-----------------|----------------|
| 5 | `lib/seo.ts` | `alternatesLanguages(esPath, enPath)` exportado pero no usado. | Código muerto; las páginas escriben alternates a mano. | Usar en todas las páginas que definen `alternates.languages` o eliminar y documentar. | Estandarizar metadata con este helper + `absoluteUrl` para canonicals. |
| 6 | `app/[lang]/(site)/projects/page.tsx` | Arrays `services` y `areas` locales duplican EN_SERVICE_SLUGS y EN_AREA_SLUGS (y nombres). | Añadir servicio/área = tocar lib + esta página. | Importar desde `lib/proyectos-collections` y `lib/areas-slugs`; derivar nombres de EN_COLLECTION_TITLES o un mapa. | Una sola fuente para slugs y labels por idioma. |
| 7 | `areas/[areaSlug]/page.tsx` | Metadata (title, description) por área en dos objetos inline (EN y ES). | Duplicación con AreaDetail; añadir área = tocar aquí y AreaDetail. | Extraer a `data/areas-meta.ts` o junto a areas-slugs. | Contenido de áreas (meta + body) en un módulo o CMS. |
| 8 | `src/proxy.ts` | Exporta `proxy(request)`; no hay `middleware.ts` que lo use. Redirect / → /es está en `app/page.tsx`. | Código muerto o resto de migración. | Verificar que ningún middleware lo importa; si no, documentar como candidato a borrado. | Borrar si confirmado muerto; si se quería middleware, usar como base en `middleware.ts`. |

### Opcional

| # | Tema | Detalle |
|---|------|--------|
| 9 | styled-components en package.json | Dependencia presente; no hay imports en `src/`. Puede ser residual. Revisar si algo la usa; si no, eliminar. |
| 10 | _dev/sanity | Ruta bajo `_dev`; en producción sigue siendo accesible si no hay middleware que la bloquee. Valorar proteger por NODE_ENV o eliminar en build prod. |
| 11 | Email y marca | Centralizar `hola@agenciaenblanco.com` y nombre de sitio en una constante (env o config) para no repetir en 15+ sitios. |

---

## 7. Para cada hallazgo: archivo, problema, por qué importa, riesgos, soluciones

(Véase la tabla de la sección 6; aquí se mantiene el mismo nivel de detalle por prioridad.)

---

## 8. Patrones que conviene vigilar si seguimos construyendo con IA

- **Un archivo que crece sin límite:** AreaDetail.tsx es el caso claro. Patrón típico: “añade otro case al switch” / “otra sección al array”. Conviene umbrales (ej. “si un componente supera 300 líneas, extraer datos o subcomponentes”) y revisar que el contenido viva en datos o CMS, no en JSX inline.
- **Duplicación por idioma:** Tener `proyectos/[slug]/page.tsx` y `projects/[slug]/page.tsx` con lógica casi igual lleva a que una versión tenga más features (JSON-LD, OG) que la otra. Patrón: “ya está en ES, no toco EN”. Revisar siempre ambos idiomas al tocar detalle, metadata o SEO.
- **Constantes mágicas repetidas:** URL base, email, nombre de sitio. Si la IA repite el mismo string en muchos archivos, hay que sustituir por un único helper o constante.
- **Listas duplicadas:** Servicios y áreas en projects/page.tsx vs lib/. La IA suele “crear una lista aquí” en lugar de importar. Revisar que slugs y labels vengan de una sola fuente.
- **Sitemap y static params como “segundo paso”:** Al añadir una ruta nueva, es fácil olvidar sitemap y generateStaticParams. Checklist explícito o, mejor, una capa que genere URLs estáticas desde los mismos datos que las rutas.
- **Dos fuentes de verdad para lo mismo:** Proyectos en data/content vs Sanity. Si se sigue iterando, definir claro: “producción lee de X” y “Sanity es para Y” (ej. solo studio) hasta que se decida migrar.

---

## 9. Complejidad innecesaria detectada

- **Tres conceptos de “servicio” sin nombre claro:** (1) Colección de proyectos (`proyectos-collections`: slugs como `creative-strategy`, `diseno-web`), (2) Página de servicio (`services-slugs`: `creative-strategy-campaigns`, `web-design`), (3) Lista local en projects/page. La relación no es 1:1 (ej. creative-strategy vs creative-strategy-campaigns). Un desarrollador nuevo no sabe cuál usar dónde. Simplificación: nombrar explícitamente (ej. `COLLECTION_SLUGS` vs `SERVICE_PAGE_SLUGS`) y documentar en un solo sitio.
- **PROJECTS_EN + EN_PROJECTS_EN_KEYS:** Dos sitios donde se enumera “proyectos solo EN”. Debería ser una sola fuente (ej. derivar de PROJECTS_EN en sitemap).
- **Alternates a mano en cada página:** El helper existe y no se usa; cada página repite la misma estructura de `languages: { es, en, "x-default" }`. Complejidad innecesaria de mantenimiento.

---

## 10. Simplificaciones elegantes recomendadas

1. **Un solo uso de getSiteUrl():** Reemplazar en todos los archivos que definen metadata o JSON-LD la línea `process.env.NEXT_PUBLIC_SITE_URL || "https://..."` por `getSiteUrl()`. Bajo riesgo, reversible, mejora clara.
2. **Extraer groupSections a lib:** Una función en `lib/project-sections.ts` (o similar) con el tipo compartido; que proyectos y projects la importen. Reduce duplicación y asegura el mismo comportamiento.
3. **Usar alternatesLanguages en 2–3 páginas piloto:** Por ejemplo contact y contacto; si encaja, extender al resto. Si no se usa en 6 meses, eliminarlo.
4. **AreaDetail: extraer contenido a datos:** Mover los objetos “por slug” (títulos, párrafos) a un módulo `data/areas-content.ts`; AreaDetail solo hace `getAreaContent(lang, slug)` que lee de ahí. El archivo pasa de 859 a ~100–150 líneas; el contenido es más fácil de editar y de ampliar.
5. **Checklist en docs:** “Al añadir un proyecto: 1) data/projects 2) data/project-details 3) content/projects si hay manifest 4) index.ts 5) sitemap 6) PROJECTS_EN y EN_PROJECTS_EN_KEYS si es solo EN.” Mínimo esfuerzo, reduce olvidos.

---

## 11. Candidatos a limpiar más adelante

| Candidato | Motivo | Evidencia | Nivel de confianza |
|-----------|--------|-----------|--------------------|
| `src/proxy.ts` | Función `proxy(request)`; redirect / → /es está en app/page.tsx; no existe middleware.ts que importe proxy. | Búsqueda: ningún import de `proxy` en src; Next usa middleware.ts en raíz o src. | Alta. No borrado aquí: confirmar que en ningún despliegue se usa como middleware. |
| `alternatesLanguages` en lib/seo.ts | Exportado, nunca importado. | Grep en src: 0 usos. | Alta. Opción: usar o eliminar. |
| styled-components (dependency) | En package.json; no hay import en src. | Grep "styled-components\|styled\." en src: 0. | Media. Podría usarse en studio o en build; comprobar antes de quitar. |
| Ruta `_dev/sanity` | Prefijo _dev sugiere “solo desarrollo”; en Next no está ignorada por defecto. | Accesible en producción si no hay middleware. | Media. Proteger por env o excluir del build si no se quiere exponer. |

---

## 12. Tabla final: archivo, hallazgo, cambio aplicado o no, motivo, riesgo

| Archivo | Hallazgo | Cambio aplicado | Motivo | Riesgo |
|---------|----------|-----------------|--------|--------|
| (informe) | Auditoría profunda | — | Solo análisis y documento. | — |
| `src/app/[lang]/(site)/proyectos/[slug]/page.tsx` | siteUrl duplicado | **Sí:** usar `getSiteUrl()` desde `@/lib/seo`. | Unificar con helper; bajo riesgo, reversible. | Bajo |
| `src/app/[lang]/(site)/projects/[slug]/page.tsx` | siteUrl duplicado | **Sí:** usar `getSiteUrl()` desde `@/lib/seo`. | Mismo criterio que proyectos. | Bajo |
| Resto de archivos con siteUrl duplicado | Idem | **No.** | Evitar tocar 15+ archivos en un solo cambio; documentado para aplicar en batch. | — |
| `src/proxy.ts` | Posible código muerto | **No.** | Confianza alta pero no se ha confirmado en todos los entornos; queda en “candidatos a limpiar”. | — |
| AreaDetail, groupSections, PROJECTS_EN, sitemap, etc. | Deuda y fragilidad | **No.** | Soluciones requieren refactors mayores; se dejan como recomendaciones. | — |

---

*Fin del informe. Cambios aplicados en esta auditoría: únicamente uso de `getSiteUrl()` en las dos páginas de detalle de proyecto (proyectos y projects).*
