import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Site title" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      hidden: true,
    }),
    defineField({
      name: "language",
      type: "string",
      title: "Language",
      options: { list: [{ title: "Español", value: "es" }, { title: "English", value: "en" }] },
      hidden: true,
    }),
  ],
});
