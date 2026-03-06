import type { ContentSection } from "@/data/project-details";

/** Block shape after grouping sections by heading. Used by project detail pages (ES/EN). */
export type GroupedSectionBlock = {
  eyebrow?: string;
  body: string;
  media?: ContentSection["media"];
  mediaRef?: number;
};

export type GroupedSection = {
  heading: string;
  blocks: GroupedSectionBlock[];
};

/**
 * Groups content sections by heading. Consecutive sections with the same heading
 * become one group with multiple blocks. Used by proyectos/[slug] and projects/[slug].
 */
export function groupSections(sections: ContentSection[]): GroupedSection[] {
  const groups: GroupedSection[] = [];
  let current: GroupedSection | null = null;
  for (const s of sections) {
    if (!current || current.heading !== s.heading) {
      current = { heading: s.heading, blocks: [] };
      groups.push(current);
    }
    current.blocks.push({
      eyebrow: s.eyebrow,
      body: s.body,
      media: s.media,
      mediaRef: s.mediaRef,
    });
  }
  return groups;
}
