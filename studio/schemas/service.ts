import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
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
    defineField({ name: "order", type: "number", title: "Order (optional)" }),
  ],
});
