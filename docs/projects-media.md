# Project media: structure, naming, and manifests

Developer-facing policy for project assets (images/videos) under `/public/projects/`. No runtime folder scanning; use manifests in code.

---

## Folder structure

```
/public/projects/
  <project-slug>/           e.g. acilica, branding-acilica-studio
    desktop/
      cover-desktop.(jpg|webp|avif)   hero, horizontal
      01.(jpg|webp|avif)
      02.(jpg|webp|avif)
      ...
      01.mp4   (optional video)
    mobile/
      cover-mobile.(jpg|webp|avif)
      01.(jpg|webp|avif)
      ...
      01.mp4   (optional)
    poster/                 optional; posters for videos
      01.jpg
```

- **Strict:** Use `desktop/` and `mobile/`; numbered assets `01`, `02`, … (zero-padded). Hero: `cover-desktop` / `cover-mobile`.
- **Flexible:** Extensions can be jpg, webp, or avif per file. Video optional per slot.
- Existing projects may keep legacy names (e.g. `acilica-1.mp4`); new projects should follow `01`, `02`.

---

## Naming convention

| Asset        | Desktop              | Mobile               |
|-------------|----------------------|----------------------|
| Hero        | `cover-desktop.*`    | `cover-mobile.*`     |
| Gallery #n  | `NN.*` (01, 02, …)   | `NN.*` (same number) |
| Video poster| —                    | `poster/NN.jpg`      |

Order in the UI follows numeric order (01, 02, 03, …).

---

## Recommended formats

- **Images:** Prefer **AVIF** or **WebP** for smaller size; **JPG** is fine. Avoid PNG except for transparency.
- **Videos:** **MP4 (H.264)** for compatibility; keep files under 12MB (warn) / 20MB (fail) — see size-check script.
- **Export sizes:** Hero width target ~1600–2400px for desktop; mobile cover can be ~800–1200px. Gallery images ~1200–1600px wide.

---

## Media manifest (no folder scanning)

Each project with a detail page has a **manifest** in `src/content/projects/<slug>.ts` (or one index that exports by slug).

Manifest exports:

- `title`, `year` (optional), `services` / `industry` (optional)
- **Covers:** `coverDesktop`, `coverMobile` (paths under `/projects/...`)
- **Gallery:** array of `{ type: 'image' | 'video', desktopSrc, mobileSrc?, posterSrc?, width?, height?, alt? }`

The same manifest drives:

- **Projects list:** cover for the card (desktop or single cover).
- **Project detail page:** hero (desktop + mobile) and gallery (ordered list).

Types and index live in `src/content/projects/` (see `index.ts` and `types.ts`).

---

## How to add a new project manifest

1. Add assets under `/public/projects/<slug>/desktop/` and `.../mobile/` (and optional `poster/`).
2. Create `src/content/projects/<slug>.ts` (slug = route slug, e.g. `branding-acilica-studio`).
3. Export a manifest object matching `ProjectMediaManifest`: `title`, `coverDesktop`, `coverMobile`, `gallery: GalleryItem[]`. Use paths like `/projects/<slug>/desktop/01.jpg`.
4. Register the slug in `src/content/projects/index.ts` (add to the map or list so `getProjectManifest(slug)` returns it).
5. In `src/data/project-details.ts`, add a `ProjectDetail` entry with the same `slug` and set section blocks to use `mediaRef: 0`, `mediaRef: 1`, … for gallery indices (or keep inline `media` if not using manifest for that project).
6. Run `npm run check:project-assets` and fix any size failures before committing.

---

## Size-check script

Run:

```bash
npm run check:project-assets
```

From repo root (or from `enblanco-site` if the script lives there).

Behavior:

- Scans `/public/projects/**` (images and `.mp4`).
- **Images:** warn if > 500KB, **fail** if > 900KB.
- **Videos (mp4):** warn if > 12MB, **fail** if > 20MB.
- Prints a report with path and size; exit code 1 on any hard fail.

No external dependencies (Node `fs` only). Script path: `scripts/check-project-asset-sizes.js`.
