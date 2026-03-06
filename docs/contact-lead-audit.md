# Auditoría: Experiencia de contacto guiada (leads)

**Fecha:** 2025-03-05  
**Objetivo:** Formulario de contacto multi-step, envío a email (Resend), anti-spam, fallback, WhatsApp en mobile.

---

## 1) Estado actual

### Página de contacto
- **ES:** `src/app/[lang]/(site)/contacto/page.tsx` → ruta `/es/contacto`. Título "¿hablamos?", secciones datos/oficinas y un **formulario estático** con `action="#"` (no envía a ningún sitio). Campos: nombre, email, mensaje, checkbox privacidad. Sin API.
- **EN:** `src/app/[lang]/(site)/contact/page.tsx` → ruta `/en/contact`. Misma estructura, textos en inglés; `action="#"`.

### Endpoints
- No existe `app/api/lead` ni ningún endpoint de contacto.
- Existen: `api/revalidate`, `api/draft/enable`, `api/draft/disable`.

### i18n
- **Sistema:** `src/dictionaries/es.json`, `en.json` + `getDictionary(lang)` en `src/dictionaries/index.ts`.
- **Contenido actual:** Solo `siteName` y `nav` (home, projects, contact, etc.). No hay claves para formulario de contacto ni mensajes de lead.

### Email / Resend
- **No** hay integración de email ni dependencia Resend en `package.json`.

### Menú flotante (mobile)
- **FloatingDock** (`src/components/Dock/FloatingDock.tsx`): en mobile muestra 3 píldoras (menú, logo, contexto). El contexto viene de `getMobileContextAction(pathname, locale)` en `src/lib/dock-config.ts`.
- **Comportamiento actual:** En **home** el tercer pill es "whatsapp" (enlace a `wa.me/34619526784`). En **proyectos/projects** es "filtros". En el resto (incl. contacto) es "—".
- **NavSheet:** Drawer con enlaces (proyectos, áreas, enblanco, notas, contacto). No incluye enlace a WhatsApp.

### Servicios (para multi-select Proyecto)
- Lista de servicios en `src/lib/services-slugs.ts` (EN_SERVICE_PAGE_SLUGS, ES_SERVICE_PAGE_SLUGS). Nombres para UI pueden derivarse o definirse en diccionario (Branding, Naming, Dirección de arte, etc.).

---

## 2) Qué existe y qué no

| Elemento | Existe | Notas |
|----------|--------|--------|
| Página contacto ES/EN | Sí | Rutas correctas; formulario no funcional |
| API de envío de leads | No | Crear `app/api/lead/route.ts` |
| Resend / email | No | Añadir dependencia y env |
| Diccionarios para contacto | No | Ampliar es.json / en.json |
| Honeypot / rate limit | No | Implementar en API |
| Fallback si falla email | No | Implementar (fichero o doc para serverless) |
| WhatsApp en mobile | Parcial | Solo en home como contexto; añadir en contacto y en NavSheet |

---

## 3) Riesgos

- **Serverless (Vercel):** El filesystem no es persistente. Un fallback a `data/failed-leads.json` no persistirá entre invocaciones. Opciones: intentar escribir y capturar error; documentar uso de Vercel KV/Blob o similar para producción; o al menos devolver mensaje claro y log.
- **Resend:** Requiere dominio verificado y API key. Sin key válida el envío fallará; el fallback debe capturar y no perder el lead.
- **Rate limit in-memory:** En serverless cada invocación puede tener memoria distinta; el rate limit por IP será efectivo solo dentro del mismo proceso. Para límite fiable en producción haría falta Redis/KV; se deja in-memory como primera capa y se documenta.

---

## 4) Propuesta de implementación mínima

1. **Diccionarios:** Añadir sección `contact` (o `lead`) en `es.json` y `en.json`: títulos, opciones (Proyecto/Contacto/Talento), labels, placeholders, errores, éxito, pasos, legal.
2. **API `POST /api/lead`:**
   - Body: tipo (project|contact|talent), nombre, email, teléfono?, servicios[]? (solo proyecto), mensaje, acceptPrivacyPolicy, honeypot (company), lang, pageUrl.
   - Validación estricta server-side; honeypot si `company` no vacío → 400.
   - Rate limit por IP (Map en memoria: máx 5 cada 10 min); 429 si se excede.
   - Resend: enviar a hola@agenciaenblanco.com, subject según tipo, body estructurado.
   - Si Resend falla: intentar append a `data/failed-leads.json` (con try/catch); si falla (ej. serverless), log + respuesta 500 con mensaje de reintentar.
3. **UI contacto:** Componente cliente (p. ej. `ContactGuidedFlow`) que reciba `lang` y `pageUrl`, con estado para paso y tipo seleccionado. Flujo: selector 3 opciones → pasos según tipo (datos básicos → servicios si proyecto → mensaje → legal + enviar). Botones Atrás y "Cambiar tipo de consulta". Llamada `fetch` a `/api/lead` con loading y mensajes de éxito/error inline.
4. **Páginas contacto/contact:** Sustituir el formulario actual por `<ContactGuidedFlow lang={lang} pageUrl={...} />` y mantener el resto (datos, oficinas, enlaces). Las páginas pueden ser server components que pasen `lang` desde params.
5. **WhatsApp:** En `dock-config.ts`, hacer que `getMobileContextAction` devuelva WhatsApp también para rutas contacto/contacto (con `text` en idioma). En `NavSheet`, añadir un enlace "WhatsApp" (o "Contactar por WhatsApp") que abra wa.me con texto por idioma. Número/URL desde constante o env (ej. `NEXT_PUBLIC_WHATSAPP_NUMBER` o constante en dock-config).
6. **Env y docs:** `.env.example`: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (o `LEAD_EMAIL_FROM`). Documentar en README o docs que en Vercel el fallback a fichero no persiste y recomendar KV/Blob para no perder leads.

---

## 5) Archivos a tocar

| Acción | Archivo |
|--------|---------|
| Modificar | `src/dictionaries/es.json` |
| Modificar | `src/dictionaries/en.json` |
| Crear | `src/app/api/lead/route.ts` |
| Crear | `src/components/contact/ContactGuidedFlow.tsx` (y quizá subcomponentes) |
| Modificar | `src/app/[lang]/(site)/contacto/page.tsx` |
| Modificar | `src/app/[lang]/(site)/contact/page.tsx` |
| Modificar | `src/lib/dock-config.ts` (WhatsApp en contacto + URL con text) |
| Modificar | `src/components/Dock/NavSheet.tsx` (enlace WhatsApp) |
| Modificar | `package.json` (resend) |
| Crear/modificar | `.env.example` |
| Crear | `scripts/append-failed-lead.js` o lógica en route (append seguro) |

Implementación a continuación por fases: diccionarios → API → UI → WhatsApp → docs.

---

## Fallback en serverless (Vercel)

En Vercel el filesystem no es persistente entre invocaciones. El endpoint intenta escribir en `data/failed-leads.json` si el envío por Resend falla; en entornos serverless esa escritura puede fallar o no persistir. Opciones recomendadas para producción:

- **Vercel KV** o **Vercel Blob**: guardar el lead en KV o Blob cuando falle el envío.
- **Logging**: al menos registrar el fallo (y el payload sanitizado) en el log de la función para poder recuperar leads.

El código actual hace `console.error` del lead cuando falla la persistencia a fichero, de modo que en Vercel Logs puede verse el fallo. Para no perder leads, configurar Resend correctamente y, si se desea redundancia, integrar un store persistente (KV/Blob) en `persistFailedLead`.

---

## Anti-spam: mejora opcional (Turnstile)

Por defecto el formulario usa honeypot + rate limit + validación server-side. Si en el futuro se necesita más protección (p. ej. bots más agresivos), se puede añadir **Cloudflare Turnstile** (captcha invisible): widget en el formulario, token en el payload del lead y verificación server-side con la API de Turnstile antes de aceptar el envío. No está implementado a propósito; solo documentado como upgrade posible.

---

## Checklist de pruebas manuales

- [ ] **Rutas:** `/es/contacto` y `/en/contact` cargan y muestran el hero "Hablemos" / "Let's talk" y el selector de 3 opciones.
- [ ] **Camino Proyecto:** Elegir Proyecto → Paso 1 (datos básicos) → Paso 2 (servicios multi-select) → Paso 3 (mensaje) → Paso 4 (legal + enviar). Validaciones: nombre/email obligatorios; al menos un servicio; mensaje mínimo; checkbox privacidad. Envío correcto muestra mensaje de éxito inline.
- [ ] **Camino Contacto:** Elegir Contacto → Paso 1 (datos) → Paso 2 (mensaje) → Paso 3 (legal + enviar). Validaciones y éxito igual.
- [ ] **Camino Talento:** Elegir Talento → Paso 1 (datos) → Paso 2 (mensaje) → Paso 3 (legal + enviar). Validaciones y éxito igual.
- [ ] **Idioma:** En `/en/contact` todos los labels, botones y mensajes en inglés; en `/es/contacto` en español.
- [ ] **Atrás / Cambiar tipo:** Botón "Atrás" vuelve al paso anterior; "Cambiar tipo de consulta" vuelve al selector. Los datos introducidos se mantienen al volver.
- [ ] **Honeypot:** Si se rellena el campo oculto "company" (p. ej. con devTools), el servidor responde 400 y no se envía el email.
- [ ] **Rate limit:** Tras 5 envíos desde la misma IP en 10 minutos, el servidor devuelve 429 y la UI muestra el mensaje de error correspondiente al idioma.
- [ ] **Fallo de email:** Con `RESEND_API_KEY` inválida o vacía, al enviar: se intenta guardar en fallback (`data/failed-leads.json` en entornos con filesystem escribible), se devuelve 500 y la UI muestra el mensaje de error (sin stack trace).
- [ ] **Build:** `npm run build` termina sin errores.
- [ ] **Routing e i18n:** No se ha roto la navegación ni los alternates; `/es/contacto` y `/en/contact` siguen siendo las rutas canónicas.
- [ ] **WhatsApp en mobile:** En vista móvil, el menú flotante (dock) muestra en home y en contacto el tercer pill como "whatsapp"; al pulsar abre wa.me con mensaje pre-rellenado en el idioma actual. El drawer (NavSheet) incluye un enlace "WhatsApp" que abre wa.me en nueva pestaña.
