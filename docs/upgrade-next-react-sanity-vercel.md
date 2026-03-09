# Upgrade controlado: Next + React + Sanity + Vercel

## Stack inicial

- Next.js: `15.5.9`
- React: `18.3.1`
- react-dom: `18.3.1`
- next-sanity: `9.12.3`
- sanity (root): `3.69.0`
- sanity (studio): `3.79.0`
- resend: `6.9.3`

## Plan aplicado (orden real)

1. Alineación runtime Node para Vercel/Next moderno (`engines.node`).
2. Upgrade React y tipos en app raíz.
3. Upgrade Next.js + `eslint-config-next` y fix mínimo de compatibilidad (`revalidateTag`).
4. Upgrade Sanity + next-sanity en raíz y Studio; ajustes mínimos de esquema para Sanity 5.
5. Revisión de Resend (sin cambios, ya estaba en latest).

## Stack final alcanzado

- Next.js: `16.1.6`
- React: `19.2.4`
- react-dom: `19.2.4`
- next-sanity: `12.1.1`
- sanity (root): `5.13.0`
- sanity (studio): `5.13.0`
- @sanity/vision (studio): `5.13.0`
- resend: `6.9.3` (se mantiene)
- Node engines (root + studio): `>=20.10.0`

## Paquetes actualizados

### App raíz
- `next` -> `^16.1.6`
- `eslint-config-next` -> `^16.1.6`
- `react` -> `^19.2.4`
- `react-dom` -> `^19.2.4`
- `@types/react` -> `^19.2.14`
- `@types/react-dom` -> `^19.2.3`
- `next-sanity` -> `^12.1.1`
- `sanity` -> `^5.13.0` (devDependency)
- `@sanity/client` -> `^7.16.0`

### Studio
- `sanity` -> `^5.13.0`
- `@sanity/vision` -> `^5.13.0`
- `react` -> `^19.2.4`
- `react-dom` -> `^19.2.4`
- `engines.node` -> `>=20.10.0`

## Cambios de código mínimos aplicados

1. **Compatibilidad Next 16**
   - `src/app/api/revalidate/route.ts`
   - `revalidateTag(tag)` -> `revalidateTag(tag, "max")`

2. **Compatibilidad Sanity 5 (Studio schemas)**
   - `studio/schemas/project.ts`
     - `of: [mediaItem]` -> `of: [{ type: "mediaItem" }]`
   - `studio/schemas/index.ts`
     - añade `mediaItem` a `schemaTypes`
   - `studio/schemas/siteSettings.ts`
     - elimina `options: { singleton: true }` (no soportado por tipado actual)

3. **Lint runtime compatible con Next 16 / ESLint 9**
   - añade `eslint.config.mjs` (flat config con `eslint-config-next/core-web-vitals`)
   - nota: no se ha hecho refactor de componentes para resolver reglas nuevas de React Hooks

## Incompatibilidades encontradas y resolución

1. **Ruptura de API de cache en Next 16**
   - Error: `revalidateTag` requería 2 argumentos.
   - Resolución: ajuste mínimo a `revalidateTag(tag, "max")`.

2. **Tipado de schemas en Sanity 5**
   - Error en arrays con `mediaItem` y en `singleton` de `siteSettings`.
   - Resolución: referencia por tipo en `of` + retirar propiedad `singleton` incompatible.

3. **Lint script legacy**
   - Con ESLint 9 + Next 16, `.eslintrc` deja de ser flujo recomendado.
   - Resolución: config flat nueva en `eslint.config.mjs`.
   - Estado: el comando lint ejecuta, pero reporta errores/warnings existentes en componentes (no se tocan en este lote por alcance).

4. **Sanity typegen en entorno sandbox**
   - Error observado: `SchemaExtractionError ... statusCode=403` al ejecutar `sanity:typegen`.
   - Causa probable: restricción de red/túnel del entorno de ejecución.
   - Estado: build de Studio y typecheck sí validados; typegen pendiente de ejecutar en entorno con red plena.

## Validación ejecutada

### App
- `npm install` -> OK
- `npm run typecheck` -> OK
- `npm run build` -> OK (Next 16)
- `npm run test` (smoke) -> OK
- Rutas clave presentes en build:
  - Home
  - Proyectos ES/EN (`/proyectos/[slug]`, `/projects/[slug]`)
  - Áreas ES/EN (`/areas/[areaSlug]`)
  - Notas ES/EN (`/notas/[slug]`, `/notes/[slug]`)
  - Servicios ES/EN (`/servicios/[slug]`, `/services/[slug]`)
  - Contacto (`/contacto`, `/contact`)
  - APIs (`/api/lead`, `/api/draft/*`, `/api/revalidate`)
  - `/sitemap.xml` y `/robots.txt`

### Studio
- `npm install` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK

## Riesgos residuales

1. `npm run lint` reporta errores/warnings preexistentes en componentes (reglas de React Hooks más estrictas en la configuración actual).
2. `sanity:typegen` no validado de extremo a extremo en este entorno por error de red 403.
3. `tsconfig.json` fue ajustado por Next (`jsx: react-jsx`) durante build; cambio esperado y compatible.

## Checklist final de validación funcional (estado)

- Home: **Validado** (build OK)
- Proyectos ES/EN: **Validado** (rutas SSG generadas)
- Áreas ES/EN: **Validado** (rutas SSG generadas)
- Notas ES/EN: **Validado** (rutas SSG generadas)
- Servicios ES/EN: **Validado** (rutas SSG generadas)
- Contacto: **Validado** (rutas incluidas)
- API de lead: **Validado por compilación/tipos** (sin test e2e de envío real)
- Sitemap: **Validado** (`/sitemap.xml` generado)
- Metadata/canonical/alternates: **Validado por build/typecheck** (sin regressions de compilación)
- Draft mode / preview: **Validado por compilación de handlers**
- Studio Sanity: **Validado** (build + typecheck)
- Resend: **Dependencia estable**; no cambio de versión

## Recomendaciones posteriores (fuera de este lote)

1. Ejecutar `sanity:typegen` en entorno sin restricciones de red y confirmar salida en `src/lib/sanity/types.ts`.
2. Decidir estrategia de lint:
   - corregir errores actuales en componentes, o
   - ajustar severidad temporal de reglas nuevas para evitar bloquear CI.
3. Añadir una prueba e2e mínima para `/api/lead` con entorno de test (mock de Resend).

## Tabla final (paquete/archivo, cambio, motivo, riesgo, validado)

| Paquete o archivo | Cambio aplicado | Motivo | Riesgo | Validado |
|---|---|---|---|---|
| `package.json` (root) | Next/React/next-sanity/sanity/@types actualizados + `engines.node` | Compatibilidad con stack objetivo moderno | Medio | Sí |
| `package-lock.json` (root) | Regenerado por instalación | Resolver árbol real de dependencias | Bajo | Sí |
| `studio/package.json` | Sanity 5 + vision 5 + React 19 + `engines.node` | Compatibilidad Studio con stack objetivo | Medio | Sí |
| `studio/package-lock.json` | Regenerado por instalación | Resolver árbol real Studio | Bajo | Sí |
| `src/app/api/revalidate/route.ts` | `revalidateTag(tag, "max")` | Compatibilidad API Next 16 | Bajo | Sí |
| `studio/schemas/project.ts` | `mediaItem` referenciado por `type` en arrays | Compatibilidad de tipos Sanity 5 | Bajo | Sí |
| `studio/schemas/index.ts` | `mediaItem` añadido al registro de tipos | Resolver referencia de schema | Bajo | Sí |
| `studio/schemas/siteSettings.ts` | Eliminado `options.singleton` | Propiedad incompatible en tipado actual | Bajo | Sí |
| `eslint.config.mjs` | Nueva configuración flat | Compatibilidad ESLint 9 + Next 16 | Bajo | Sí (ejecuta) |
| `tsconfig.json` | `jsx: react-jsx` (autoajuste Next) | Requisito de toolchain actual | Bajo | Sí |
