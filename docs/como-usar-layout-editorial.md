# Cómo usar el Layout Editorial

Guía rápida para referirse a las guías verticales y al frame al pedir cambios de composición o al implementar bloques. Los nombres coinciden con el tipo `EditorialLine` y con las líneas nombradas de la CSS Grid del shell.

## Dónde está definido

- Componentes: `src/components/layout/EditorialShell.tsx` (`EditorialBlock`, `EditorialSubgrid`, `EditorialShell`).
- Tokens y retícula: `src/app/globals.css` (variables `--editorial-*`, clase `.editorial-shell`).
- Modo debug de guías: URL con `?guides=1`, `?grid=1` o `?layout=debug` (visible en tablet/desktop; en móvil el sistema editorial no replica la misma retícula).

## Nombres de las guías verticales

Hay **seis guías** principales:

| Nombre     | Rol |
|-----------|-----|
| `guide-1` | Inicio del área útil editorial (en la grid coincide con `frame-start`). |
| `guide-2` | — |
| `guide-3` | — |
| `guide-4` | — |
| `guide-5` | — |
| `guide-6` | Fin del área útil editorial (en la grid coincide con `frame-end`). |

## Otras líneas útiles

| Nombre         | Uso |
|----------------|-----|
| `frame-start` / `frame-end` | Ancho del “marco” editorial entre márgenes laterales del sistema (equivalente a `guide-1` … `guide-6` como bloque completo). |
| `bleed-start` / `bleed-end` | Para contenido **full bleed** respecto al ancho del shell (llega más allá del frame interno, hacia los bordes del viewport dentro del bloque). |

## Cómo pedir alineaciones (frases que mapean bien al código)

1. **Entre dos guías**  
   Ejemplo: *“El título va de `guide-1` a `guide-3`”* o *“El claim de `guide-4` a `guide-6`”*.

2. **Desde una guía hasta otra**  
   Ejemplo: *“Empieza en `guide-2` y termina en `guide-5`”*.

3. **Ancho completo del frame (márgenes del sistema en desktop)**  
   *“Va de `frame-start` a `frame-end`”*.

4. **Full bleed**  
   *“Va de `bleed-start` a `bleed-end`”*.

5. **Overflow controlado**  
   Ejemplo: *“Anclado a `guide-3` pero que desborde a la derecha X px”* — en implementación suele usarse el patrón `breakout` + `breakoutSize` en `EditorialBlock`.

## Orden visual (de izquierda a derecha)

En desktop/tablet, el overlay y la grid siguen este orden:

`guide-1` → `guide-2` → `guide-3` → `guide-4` → `guide-5` → `guide-6`

Las proporciones base vienen de las variables globales `--editorial-guide-ratio-*` (y los tramos entre guías de `--editorial-guide-span-*`) en `:root` dentro de `globals.css`.

## Utilidades CSS opcionales

En `globals.css` existen clases de ayuda como:

- `.editorial-span-g1-g2` → `guide-1 / guide-2`
- `.editorial-span-g2-g3` → `guide-2 / guide-3`
- `.editorial-span-g3-g5` → `guide-3 / guide-5`
- `.editorial-align-guide-3` → inicio en `guide-3`
- `.editorial-full-bleed` → `bleed-start / bleed-end`

Puedes pedir cambios usando estos mismos nombres; así la petición coincide 1:1 con el código.
