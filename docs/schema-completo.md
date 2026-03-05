# Schema completo del estudio Sanity (proyecto tipo Acilica / Enblanco)

Documento de referencia del schema actual del Studio: tipos de documento, objetos embebidos y relaciones.

---

## Índice

1. [Tipos de documento](#tipos-de-documento)  
   - [project](#project)  
   - [note](#note)  
   - [service](#service)  
   - [industry](#industry)  
   - [siteSettings](#sitesettings)  
2. [Objetos embebidos](#objetos-embebidos)  
   - [mediaItem](#mediaitem)

---

## Tipos de documento

### project

**Nombre interno:** `project` · **Título en Studio:** Project

| Campo          | Tipo     | Título             | Notas                                      |
|----------------|----------|--------------------|--------------------------------------------|
| `title`        | string   | Title              |                                            |
| `slug`         | slug     | Slug               | source: `title`, maxLength: 96             |
| `language`     | string   | Language           | Lista: Español (`es`), English (`en`)       |
| `coverDesktop` | image    | Cover (desktop)    | hotspot: true                              |
| `coverMobile`  | image    | Cover (mobile)     | hotspot: true                              |
| `mediaDesktop` | array    | Media (desktop)    | of: **mediaItem**                          |
| `mediaMobile`  | array    | Media (mobile)     | of: **mediaItem**                          |
| `services`     | array    | Services           | of: reference → **service**                 |
| `industries`   | array    | Industries         | of: reference → **industry**                |
| `order`        | number   | Order (optional)   | Ordenación manual                          |

---

### note

**Nombre interno:** `note` · **Título en Studio:** Note

| Campo        | Tipo   | Título       | Notas                                |
|-------------|--------|-------------|--------------------------------------|
| `title`     | string | Title       |                                      |
| `slug`      | slug   | Slug        | source: `title`, maxLength: 96       |
| `language`  | string | Language    | Lista: Español (`es`), English (`en`)|
| `excerpt`   | text   | Excerpt     |                                      |
| `body`      | array  | Body        | of: block (Portable Text)            |
| `cover`     | image  | Cover       | hotspot: true                        |
| `publishedAt` | datetime | Published at |                                  |

---

### service

**Nombre interno:** `service` · **Título en Studio:** Service

| Campo      | Tipo   | Título    | Notas                                |
|-----------|--------|-----------|--------------------------------------|
| `title`   | string | Title     |                                      |
| `slug`    | slug   | Slug      | source: `title`, maxLength: 96       |
| `language`| string | Language  | Lista: Español (`es`), English (`en`)|

Referenciado desde **project** (`services`).

---

### industry

**Nombre interno:** `industry` · **Título en Studio:** Industry

| Campo      | Tipo   | Título    | Notas                                |
|-----------|--------|-----------|--------------------------------------|
| `title`   | string | Title     |                                      |
| `slug`    | slug   | Slug      | source: `title`, maxLength: 96       |
| `language`| string | Language  | Lista: Español (`es`), English (`en`)|

Referenciado desde **project** (`industries`).

---

### siteSettings

**Nombre interno:** `siteSettings` · **Título en Studio:** Site settings

**Singleton:** sí (un solo documento en el dataset).

| Campo     | Tipo   | Título     | Notas                                |
|----------|--------|------------|--------------------------------------|
| `title`  | string | Site title |                                      |
| `slug`   | slug   | Slug       | hidden; source: `title`, maxLength: 96 |
| `language` | string | Language | hidden; Lista: Español (`es`), English (`en`) |

---

## Objetos embebidos

### mediaItem

**Nombre interno:** `mediaItem` · **Título en Studio:** Media item  

**Tipo:** object (no es documento; se usa dentro de arrays).

| Campo   | Tipo  | Título | Notas |
|--------|-------|--------|--------|
| `image`| image | Image  | hotspot: true; hidden si hay `video` |
| `video`| file  | Video  | accept: `video/*`; hidden si hay `image` |

**Validación:** debe haber exactamente uno de los dos: `image` o `video`.

Usado en **project** en los arrays `mediaDesktop` y `mediaMobile`.

---

## Resumen de relaciones

- **project** → referencias a **service** (varios) y **industry** (varios).  
- **project** → arrays de **mediaItem** (solo objeto) para desktop y mobile.  
- **siteSettings** es singleton; **note**, **service** e **industry** son listas de documentos con `slug` y `language` para i18n.

## Idiomas

En todos los documentos con contenido por idioma se usa el campo `language` con valores `es` | `en`.
