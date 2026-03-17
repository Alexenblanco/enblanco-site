import { defineField, defineType } from "sanity";

export const note = defineType({
  name: "note",
  title: "Note",
  type: "document",
  preview: {
    select: {
      title: "title",
      language: "language",
      publishedAt: "publishedAt",
      author: "author",
      type: "type",
      media: "cover",
    },
    prepare({ title, language, publishedAt, author, type, media }) {
      const parts = [language, type, author, publishedAt]
        .filter((value): value is string => typeof value === "string" && value.length > 0);

      return {
        title: title || "Untitled note",
        subtitle: parts.join(" · "),
        media,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      type: "string",
      title: "Language",
      options: { list: [{ title: "Español", value: "es" }, { title: "English", value: "en" }] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "translationOf",
      type: "reference",
      title: "Translation of",
      description:
        "Link this note to its counterpart in the other language. Leave empty for the primary/base version.",
      to: [{ type: "note" }],
      options: {
        filter: ({ document }) => {
          const language = typeof document?.language === "string" ? document.language : null;
          return language
            ? {
                filter: '_type == "note" && language != $language',
                params: { language },
              }
            : { filter: '_type == "note"' };
        },
      },
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      description:
        'Displayed in the UI as the note category, e.g. "reflexión", "observación", "thought", "decision".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      title: "Author",
      options: {
        list: [
          { title: "alex", value: "alex" },
          { title: "clara", value: "clara" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description:
        "Used as the note summary/SEO description fallback when there is no full body.",
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Body",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "cover",
      type: "image",
      title: "Cover",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
