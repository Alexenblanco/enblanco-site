import { defineField, defineType } from "sanity";
import { mediaItem } from "./objects/mediaItem";

export const project = defineType({
  name: "project",
  title: "Project",
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
    defineField({
      name: "coverDesktop",
      type: "image",
      title: "Cover (desktop)",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverMobile",
      type: "image",
      title: "Cover (mobile)",
      options: { hotspot: true },
    }),
    defineField({
      name: "mediaDesktop",
      type: "array",
      title: "Media (desktop)",
      of: [mediaItem],
    }),
    defineField({
      name: "mediaMobile",
      type: "array",
      title: "Media (mobile)",
      of: [mediaItem],
    }),
    defineField({
      name: "services",
      type: "array",
      title: "Services",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "industries",
      type: "array",
      title: "Industries",
      of: [{ type: "reference", to: [{ type: "industry" }] }],
    }),
    defineField({ name: "order", type: "number", title: "Order (optional)" }),
  ],
});
