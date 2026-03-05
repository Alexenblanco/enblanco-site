import { defineField, defineType } from "sanity";

export const note = defineType({
  name: "note",
  title: "Note",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "language",
      type: "string",
      title: "Language",
      options: { list: [{ title: "Español", value: "es" }, { title: "English", value: "en" }] },
    }),
    defineField({ name: "excerpt", type: "text", title: "Excerpt" }),
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
    }),
  ],
});
