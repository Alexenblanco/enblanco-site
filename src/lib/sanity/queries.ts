import { groq } from "next-sanity";
import { sanityFetch } from "./fetch";

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
