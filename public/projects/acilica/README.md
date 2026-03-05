# Assets Acilica

Carpetas según la skill **create-project-detail-page-enblanco**:

- `desktop/` — hero (`cover-desktop.jpg`) y medios para viewport grande.
- `mobile/` — `cover-mobile.png` y variantes móviles; si falta un archivo, se usa el de desktop.

## Optimización (skills)

**Imágenes (optimize-images-web-performance):**

- Usar **next/image** en el código (ya aplicado).
- Preferir **WebP** (o AVIF) para menor peso; convertir JPG/PNG si es posible.
- Comprimir antes de subir; no servir archivos más grandes que el tamaño de visualización.
- Definir `sizes` y `alt` descriptivo (ya aplicado en componentes).

**Vídeos (optimize-videos-web-performance):**

- Comprimir **antes** de añadirlos:
  - Background / loops: **2–3 MB** máximo.
  - Showcase: **5–8 MB** máximo.
- Formato: **MP4 (H.264)** o WebM.
- En datos del proyecto: incluir **poster** (imagen de previsualización) para cada vídeo.
- Los vídeos debajo del pliegue se cargan en lazy (Intersection Observer en `ProjectDetailMedia`).

Resoluciones recomendadas: 1080p hero/showcase, 720p para loops.
