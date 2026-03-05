import { groq } from "next-sanity";

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

import { sanityFetch } from "./fetch";

export async function getProjectsByLang(lang: "es" | "en"): Promise<ProjectByLangResult> {
  return sanityFetch<ProjectByLangResult>(projectsByLangQuery, { lang }, {
    tags: [`projects-${lang}`],
    revalidate: 60,
  });
}
