import { groq } from "next-sanity";
import { sanityFetch } from "./fetch";
import { buildImageUrl } from "./image";

// —— Existing (unchanged) ——

export const projectsByLangQuery = groq`
  *[_type == "project" && language == $lang] | order(order asc, _createdAt desc) {
    title,
    "slug": slug.current,
    coverDesktop,
    coverMobile
  }
`;

export type ProjectByLangResult = {
  title: string | null;
  slug: string | null;
  coverDesktop: { _type: string; asset: { _ref: string } } | null;
  coverMobile: { _type: string; asset: { _ref: string } } | null;
}[];

export async function getProjectsByLang(lang: "es" | "en"): Promise<ProjectByLangResult> {
  return sanityFetch<ProjectByLangResult>(projectsByLangQuery, { lang }, {
    tags: [`projects-${lang}`],
    revalidate: 60,
  });
}

// —— Projects index (new fields; safe when missing) ——

export const projectsIndexQuery = groq`
  *[_type == "project" && language == $lang] | order(order asc, _createdAt desc) {
    title,
    "slug": slug.current,
    featured,
    year,
    tagline,
    excerpt,
    coverVertical,
    heroDesktop,
    heroMobile,
    coverDesktop,
    "services": services[]->{ title, "slug": slug.current, order },
    "industries": industries[]->{ title, "slug": slug.current, order },
    order
  }
`;

export type ProjectsIndexItem = {
  title: string | null;
  slug: string | null;
  featured?: boolean | null;
  year?: number | null;
  tagline?: string | null;
  excerpt?: string | null;
  coverVertical?: { _type: string; asset?: { _ref: string } } | null;
  heroDesktop?: { _type: string; asset?: { _ref: string } } | null;
  heroMobile?: { _type: string; asset?: { _ref: string } } | null;
  coverDesktop?: { _type: string; asset?: { _ref: string } } | null;
  services?: { title: string | null; slug: string | null; order?: number | null }[] | null;
  industries?: { title: string | null; slug: string | null; order?: number | null }[] | null;
  order?: number | null;
};

export async function getProjectsIndex(lang: "es" | "en"): Promise<ProjectsIndexItem[]> {
  return sanityFetch<ProjectsIndexItem[]>(projectsIndexQuery, { lang }, {
    tags: [`projects-index-${lang}`],
    revalidate: 60,
  });
}

const HOME_FEATURED_PROJECTS_LIMIT = 9;

// —— Home featured works (max 9; CMS flags) ——

export const homeFeaturedProjectsQuery = groq`
  *[
    _type == "project"
    && language == $lang
    && featuredOnHome == true
    && defined(slug.current)
  ] | order(coalesce(featuredHomeOrder, 999) asc, _createdAt desc)[0...${HOME_FEATURED_PROJECTS_LIMIT}] {
    title,
    "slug": slug.current,
    tagline,
    excerpt,
    coverVertical,
    heroDesktop,
    heroMobile,
    coverDesktop,
    coverMobile,
    featuredHomeOrder,
    "services": services[]->{ title, "slug": slug.current, order },
    "industries": industries[]->{ title, "slug": slug.current, order }
  }
`;

export type HomeFeaturedProjectRaw = {
  title: string | null;
  slug: string | null;
  tagline?: string | null;
  excerpt?: string | null;
  coverVertical?: { _type: string; asset?: { _ref: string } } | null;
  heroDesktop?: { _type: string; asset?: { _ref: string } } | null;
  heroMobile?: { _type: string; asset?: { _ref: string } } | null;
  coverDesktop?: { _type: string; asset?: { _ref: string } } | null;
  coverMobile?: { _type: string; asset?: { _ref: string } } | null;
  featuredHomeOrder?: number | null;
  services?: { title: string | null; slug: string | null; order?: number | null }[] | null;
  industries?: { title: string | null; slug: string | null; order?: number | null }[] | null;
};

/** Tarjeta lista para la home (imagen resuelta a URL en el servidor). */
export type HomeFeaturedProjectCard = {
  slug: string;
  title: string;
  label: string;
  imageUrl: string | null;
  imageAlt: string;
  href?: string;
};

export async function getHomeFeaturedProjects(
  lang: "es" | "en",
): Promise<HomeFeaturedProjectCard[]> {
  const rows = await sanityFetch<HomeFeaturedProjectRaw[]>(
    homeFeaturedProjectsQuery,
    { lang },
    {
      tags: [`home-featured-${lang}`, `projects-index-${lang}`],
      // Home featured needs to reflect CMS edits immediately while shaping the block.
      revalidate: 0,
    },
  );

  const cards: HomeFeaturedProjectCard[] = [];

  for (const row of rows) {
    const slug = typeof row.slug === "string" && row.slug.length > 0 ? row.slug : null;
    if (!slug) continue;

    const title =
      typeof row.title === "string" && row.title.trim().length > 0 ? row.title.trim() : slug;

    const serviceTitles = (row.services ?? [])
      .filter((s): s is NonNullable<typeof s> => s != null && typeof s.title === "string")
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((s) => s.title as string);

    const industryTitles = (row.industries ?? [])
      .filter((s): s is NonNullable<typeof s> => s != null && typeof s.title === "string")
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((s) => s.title as string);

    let label = serviceTitles.join(" · ");
    if (!label) label = industryTitles.join(" · ");
    if (!label && typeof row.tagline === "string" && row.tagline.trim()) {
      label = row.tagline.trim();
    }
    if (!label && typeof row.excerpt === "string" && row.excerpt.trim()) {
      label = row.excerpt.trim().split(/\s+/).slice(0, 6).join(" ");
      if (row.excerpt.length > label.length) label = `${label}…`;
    }
    if (!label) label = lang === "en" ? "Project" : "Proyecto";

    const cover =
      row.coverVertical ??
      row.heroDesktop ??
      row.coverDesktop ??
      row.heroMobile ??
      row.coverMobile ??
      null;

    const imageUrl =
      cover?.asset?._ref != null ? buildImageUrl(cover, { width: 960, height: 1200, fit: "max" }) : null;

    const imageAlt = `${title} — ${label}`;

    cards.push({ slug, title, label, imageUrl, imageAlt });
  }

  return cards;
}

// —— Single project by slug (full; legacy + new) ——

const projectBySlugQuery = groq`
  *[_type == "project" && language == $lang && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    language,
    coverDesktop,
    coverMobile,
    coverVertical,
    heroDesktop,
    heroMobile,
    mediaDesktop,
    mediaMobile,
    "services": services[]->{ title, "slug": slug.current, order },
    "industries": industries[]->{ title, "slug": slug.current, order },
    order,
    featured,
    year,
    clientName,
    location,
    tagline,
    excerpt,
    body,
    credits,
    externalLinks,
    seo
  }
`;

export type ProjectBySlugResult = {
  title: string | null;
  slug: string | null;
  language: string | null;
  coverDesktop: { _type: string; asset?: { _ref: string } } | null;
  coverMobile: { _type: string; asset?: { _ref: string } } | null;
  coverVertical?: { _type: string; asset?: { _ref: string } } | null;
  heroDesktop?: { _type: string; asset?: { _ref: string } } | null;
  heroMobile?: { _type: string; asset?: { _ref: string } } | null;
  mediaDesktop?: unknown[] | null;
  mediaMobile?: unknown[] | null;
  services?: { title: string | null; slug: string | null; order?: number | null }[] | null;
  industries?: { title: string | null; slug: string | null; order?: number | null }[] | null;
  order?: number | null;
  featured?: boolean | null;
  year?: number | null;
  clientName?: string | null;
  location?: string | null;
  tagline?: string | null;
  excerpt?: string | null;
  body?: unknown[] | null;
  credits?: { name?: string; role?: string }[] | null;
  externalLinks?: { label?: string; url?: string }[] | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    ogImage?: { _type: string; asset?: { _ref: string } } | null;
    noIndex?: boolean | null;
  } | null;
} | null;

export async function getProjectBySlug(
  lang: "es" | "en",
  slug: string
): Promise<ProjectBySlugResult> {
  return sanityFetch<ProjectBySlugResult>(projectBySlugQuery, { lang, slug }, {
    tags: [`project-${lang}-${slug}`],
    revalidate: 60,
  });
}

// —— Notes ——

type NoteLang = "es" | "en";

type NotePortableTextBlock = {
  _type?: string | null;
  children?: { text?: string | null }[] | null;
}[];

type NoteTranslationReference = {
  language?: NoteLang | null;
  slug?: string | null;
  hasBody?: boolean | null;
} | null;

export type SanityNoteListItem = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  language?: NoteLang | null;
  type?: string | null;
  author?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
};

export type SanityNoteDetailItem = SanityNoteListItem & {
  body?: NotePortableTextBlock | null;
  translation?: NoteTranslationReference;
};

const noteListFields = groq`
  _id,
  title,
  "slug": slug.current,
  language,
  type,
  author,
  excerpt,
  publishedAt
`;

export const notesByLangQuery = groq`
  *[_type == "note" && language == $lang && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    ${noteListFields}
  }
`;

const noteTranslationProjection = `
  language,
  "slug": slug.current,
  "hasBody": defined(body[0])
`;

export const noteBySlugQuery = groq`
  *[_type == "note" && language == $lang && slug.current == $slug][0] {
    ${noteListFields},
    body,
    "translation": select(
      defined(translationOf->_id) => translationOf->{${noteTranslationProjection}},
      *[_type == "note" && references(^._id)][0]{${noteTranslationProjection}}
    )
  }
`;

export const noteSlugsByLangQuery = groq`
  *[_type == "note" && language == $lang && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    "slug": slug.current
  }
`;

export const indexableNoteSlugsByLangQuery = groq`
  *[_type == "note" && language == $lang && defined(slug.current) && defined(body[0])] | order(publishedAt desc, _createdAt desc) {
    "slug": slug.current
  }
`;

export async function getNotesByLangFromSanity(
  lang: NoteLang
): Promise<SanityNoteListItem[]> {
  return sanityFetch<SanityNoteListItem[]>(notesByLangQuery, { lang }, {
    tags: [`notes-index-${lang}`],
    revalidate: 60,
  });
}

export async function getNoteBySlugFromSanity(
  lang: NoteLang,
  slug: string
): Promise<SanityNoteDetailItem | null> {
  return sanityFetch<SanityNoteDetailItem | null>(noteBySlugQuery, { lang, slug }, {
    tags: [`note-${lang}-${slug}`],
    revalidate: 60,
  });
}

export async function getNoteSlugsByLangFromSanity(
  lang: NoteLang
): Promise<string[]> {
  const rows = await sanityFetch<{ slug?: string | null }[]>(
    noteSlugsByLangQuery,
    { lang },
    {
      tags: [`note-slugs-${lang}`],
      revalidate: 60,
    }
  );

  return rows
    .map((row) => row.slug)
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
}

export async function getIndexableNoteSlugsByLangFromSanity(
  lang: NoteLang
): Promise<string[]> {
  const rows = await sanityFetch<{ slug?: string | null }[]>(
    indexableNoteSlugsByLangQuery,
    { lang },
    {
      tags: [`indexable-note-slugs-${lang}`],
      revalidate: 60,
    }
  );

  return rows
    .map((row) => row.slug)
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
}
