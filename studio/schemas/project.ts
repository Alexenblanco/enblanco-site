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
    // —— Legacy cover / hero (unchanged) ——
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
    // —— Explicit hero + cover (new) ——
    defineField({
      name: "coverVertical",
      type: "image",
      title: "Cover (vertical)",
      description: "Original vertical cover. Use for cards or mobile-first layouts.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroDesktop",
      type: "image",
      title: "Hero (desktop)",
      description: "Horizontal hero image for desktop. Primary hero above the fold.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroMobile",
      type: "image",
      title: "Hero (mobile)",
      description: "Optional. If missing, the frontend falls back to hero (desktop).",
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
    // —— Metadata (new) ——
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured",
      initialValue: false,
    }),
    defineField({ name: "year", type: "number", title: "Year" }),
    defineField({ name: "clientName", type: "string", title: "Client name" }),
    defineField({ name: "location", type: "string", title: "Location" }),
    defineField({ name: "tagline", type: "string", title: "Tagline" }),
    defineField({ name: "excerpt", type: "text", title: "Excerpt", description: "Short text for listings." }),
    // —— Rich content (new) ——
    defineField({
      name: "body",
      type: "array",
      title: "Body",
      of: [{ type: "block" }],
    }),
    // —— Credits (new) ——
    defineField({
      name: "credits",
      type: "array",
      title: "Credits",
      of: [
        {
          type: "object",
          name: "creditEntry",
          title: "Credit",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "role", type: "string", title: "Role" },
          ],
        },
      ],
    }),
    // —— External links (new) ——
    defineField({
      name: "externalLinks",
      type: "array",
      title: "External links",
      of: [
        {
          type: "object",
          name: "externalLinkEntry",
          title: "Link",
          fields: [
            { name: "label", type: "string", title: "Label" },
            {
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) =>
                Rule.uri({ scheme: ["http", "https", "mailto"] }),
            },
          ],
        },
      ],
    }),
    // —— SEO (new) ——
    defineField({
      name: "seo",
      type: "object",
      title: "SEO",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
        {
          name: "ogImage",
          type: "image",
          title: "OG image",
          options: { hotspot: true },
        },
        {
          name: "noIndex",
          type: "boolean",
          title: "No index",
          initialValue: false,
        },
      ],
    }),
  ],
});
