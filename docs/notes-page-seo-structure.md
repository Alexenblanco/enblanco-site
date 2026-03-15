# Estructura final SEO de la página de notas

Este documento resume la implementación final de la página de listado de notas de `enblanco`, con foco en:

- estructura HTML real
- rutas y origen de datos
- metadata SEO
- datos estructurados
- comportamiento de indexación
- relación entre listado y detalle

## 1. Rutas reales

Listado:

- ES: `/es/notas`
- EN: `/en/notes`

Detalle:

- ES: `/es/notas/[slug]`
- EN: `/en/notes/[slug]`

Archivos:

- `src/app/[lang]/(site)/notas/page.tsx`
- `src/app/[lang]/(site)/notes/page.tsx`
- `src/app/[lang]/(site)/notas/[slug]/page.tsx`
- `src/app/[lang]/(site)/notes/[slug]/page.tsx`

## 2. Origen de datos

Fuente única:

- `src/data/notes-index.ts`

Contiene:

- `NOTAS_ES`
- `NOTES_EN`
- `NOTES_INDEX_ES`
- `NOTES_INDEX_EN`
- `getNoteBySlug()`

Cada nota define:

- `slug`
- `index`
- `type`
- `title`
- `date`
- `displayDate`
- `author`
- `description`
- `body` (cuando la nota tiene contenido editorial completo)

## 3. Estructura HTML del listado

El listado renderiza mediante:

- `src/components/notes/NotesIndexView.tsx`

Estructura semántica final:

```html
<main>
  <header>
    <div>
      <h1>...</h1>
    </div>
    <div>
      <p>...</p>
    </div>
  </header>

  <section aria-labelledby="notes-list-heading-*">
    <h2 class="sr-only">índice de notas / notes index</h2>

    <ul>
      <li>
        <article>
          <span aria-hidden></span> <!-- rectángulo visual -->

          <div><!-- índice + tipo --></div>

          <h2>
            <a href="/es/notas/slug">título de la nota</a>
          </h2>

          <div><!-- fecha + autor --></div>
        </article>
      </li>
    </ul>
  </section>
</main>
```

### Jerarquía de headings

- Un único `H1` en la página de listado
- Un `H2` oculto (`sr-only`) para nombrar el bloque del listado
- Un `H2` por cada nota del listado

Esto deja una jerarquía válida y legible para buscadores y LLMs.

## 4. Header editorial superior

El header superior se compone de dos bloques:

- bloque izquierdo con el `H1`
- bloque derecho con un párrafo contextual

Objetivo SEO del bloque:

- dar contexto temático al listado
- reforzar la intención editorial
- explicar que la página agrupa notas sobre creatividad, diseño y procesos de marca

El `H1` final describe la temática general, no solo el término genérico `notas`.

## 5. Enlaces del listado

Cada nota tiene un único enlace semántico real en el título:

- HTML real `<a>`
- URL limpia
- sin dependencia de JS

El rectángulo blanco central del hover ya no es un enlace: es solo una capa visual decorativa.

Esto evita:

- duplicidad de anchors por fila
- ambigüedad semántica
- ruido para accesibilidad y extracción automática

## 6. URLs y slugs

Los slugs son limpios y estables:

- sin fechas en ruta
- sin parámetros
- sin categorías en la URL

Ejemplos:

- `/es/notas/nada-de-mayusculas`
- `/en/notes/editar-tambien-es-disenar`

Esto mejora:

- legibilidad
- compartibilidad
- relevancia semántica
- estabilidad de indexación

## 7. Metadata SEO del listado

Definida con `generateMetadata()` en:

- `src/app/[lang]/(site)/notas/page.tsx`
- `src/app/[lang]/(site)/notes/page.tsx`

Incluye:

- `title`
- `description`
- `alternates.canonical`
- `alternates.languages`
- `openGraph`
- `robots`

### ES

- canonical: `/es/notas`
- languages:
  - `es: /es/notas`
  - `en: /en/notes`
  - `x-default: /es/notas`

### EN

- canonical: `/en/notes`
- languages:
  - `es: /es/notas`
  - `en: /en/notes`
  - `x-default: /es/notas`

## 8. Datos estructurados del listado

En el listado se inyectan dos bloques JSON-LD:

### 8.1 BreadcrumbList

Uso:

- define la posición del listado dentro del sitio

Listado ES:

- inicio
- notas

Listado EN:

- home
- notes

### 8.2 ItemList

Uso:

- modela el listado de notas como colección ordenada

Incluye por item:

- `position`
- `url`
- `name`

Archivo donde se monta:

- `src/app/[lang]/(site)/notas/page.tsx`
- `src/app/[lang]/(site)/notes/page.tsx`

## 9. Datos estructurados del detalle

Cada nota individual incluye:

- `BlogPosting`
- `BreadcrumbList`

Archivos:

- `src/app/[lang]/(site)/notas/[slug]/page.tsx`
- `src/app/[lang]/(site)/notes/[slug]/page.tsx`

### BlogPosting

Campos actuales:

- `headline`
- `description`
- `url`
- `datePublished`
- `dateModified`
- `inLanguage`
- `author`
- `publisher`
- `publisher.logo`
- `mainEntityOfPage`
- `isPartOf`
- `articleBody` (cuando existe `body`)
- `wordCount` (cuando existe `body`)

Se cambió de `Article` a `BlogPosting` para reflejar mejor la naturaleza editorial del contenido.

## 10. Indexabilidad

### Robots

Archivo:

- `src/app/robots.ts`

Comportamiento:

- en producción: `allow: /`
- fuera de producción: `disallow: /`

Conclusión:

- la página es indexable en producción si la nota tiene `body`
- una nota sin `body` queda accesible, pero su detalle se marca como `noindex, follow`
- previews/staging quedan bloqueadas a propósito

### Sitemap

- el sitemap solo incluye detalles de notas indexables con `body`

Archivo:

- `src/app/sitemap.ts`

Incluye:

- `/es/notas`
- `/en/notes`
- todas las notas individuales ES y EN a partir de `getNoteSlugs()`

### Renderizado

La página es server-rendered y crawlable sin JS.

El contenido principal:

- está en HTML inicial
- no depende de hover para existir
- no depende de eventos de cliente para navegar

## 11. Interlinking

La página de notas está enlazada desde:

- navegación principal desktop
- navegación móvil
- footer

Referencia de navegación:

- `src/lib/dock-config.ts`
- `src/components/footer/SiteFooter.tsx`

Esto reduce profundidad de rastreo y facilita descubrimiento.

## 12. Decisiones de implementación relevantes para SEO

### Lo que sí está bien resuelto

- un solo `H1`
- `H2` por nota
- `ul > li > article`
- enlaces HTML reales
- URLs limpias
- canonical y alternates correctos
- `ItemList` en el listing
- `BlogPosting` en detalle
- presencia en sitemap
- contenido renderizado sin JS

### Lo que sigue siendo una limitación

Las páginas de detalle aún usan contenido placeholder en el cuerpo del artículo.

Eso no rompe el SEO técnico del listado, pero sí limita:

- calidad indexable del clúster de notas
- autoridad temática real
- valor SEO de cada URL individual

## 13. Resumen ejecutivo

La estructura final de la página de notas queda bien orientada a SEO moderno:

- indexable
- semántica
- limpia para buscadores
- comprensible para LLMs
- preparada para crecer sin paginación

El sistema actual ya cubre correctamente:

- listado editorial
- relación listing/detail
- metadata i18n
- JSON-LD útil
- rutas limpias
- descubrimiento vía sitemap e interlinking

La mejora más importante pendiente ya no está en la arquitectura del listado, sino en completar contenido real en cada página individual de nota.
