/**
 * Professional project media system — single source of truth for listing and detail.
 * Each project has a typed manifest; no runtime folder scanning.
 */

/** Responsive source: desktop required, mobile optional (use only on small screens when provided). */
export type ResponsiveSource = {
  desktop: string;
  mobile?: string;
};

export type GalleryImageItem = {
  type: "image";
  src: ResponsiveSource;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** When mobile shows different type (e.g. video); omit to use same as desktop. */
  typeMobile?: "image" | "video";
};

export type GalleryVideoItem = {
  type: "video";
  src: ResponsiveSource;
  /** Poster image path; recommended for performance. */
  poster?: string;
  preload?: "none" | "metadata";
  autoplay?: boolean;
  alt?: string;
  /** When mobile shows different type (e.g. image); omit to use same as desktop. */
  typeMobile?: "image" | "video";
};

export type GalleryItem = GalleryImageItem | GalleryVideoItem;

export type Project = {
  slug: string;
  title: string;
  year?: string;
  services?: string[];
  industries?: string[];
  cover: ResponsiveSource;
  hero: ResponsiveSource;
  gallery: GalleryItem[];
};
