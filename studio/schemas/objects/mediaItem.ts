import { defineField, defineType } from "sanity";

const aspectOptions = [
  { title: "Auto", value: "auto" },
  { title: "16:9", value: "16:9" },
  { title: "4:5", value: "4:5" },
  { title: "1:1", value: "1:1" },
  { title: "3:4", value: "3:4" },
  { title: "9:16", value: "9:16" },
];

export const mediaItem = defineType({
  name: "mediaItem",
  title: "Media item",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      hidden: ({ parent }) => !!parent?.video,
    }),
    defineField({
      name: "video",
      type: "file",
      title: "Video",
      options: { accept: "video/*" },
      hidden: ({ parent }) => !!parent?.image,
    }),
    defineField({
      name: "kind",
      type: "string",
      title: "Kind",
      description: "Optional; can be derived from image/video presence if omitted.",
      options: { list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }] },
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      description: "For accessibility (image).",
      hidden: ({ parent }) => !!parent?.video,
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
    defineField({
      name: "poster",
      type: "image",
      title: "Poster",
      description: "Poster image for video.",
      options: { hotspot: true },
      hidden: ({ parent }) => !!parent?.image,
    }),
    defineField({
      name: "aspect",
      type: "string",
      title: "Aspect ratio",
      options: { list: aspectOptions },
    }),
    defineField({
      name: "priority",
      type: "boolean",
      title: "Priority",
      description: "Hint for lazy loading (e.g. above-the-fold).",
    }),
  ],
  validation: (Rule) =>
    Rule.custom((obj) => {
      if (obj?.image || obj?.video) return true;
      return "Add either an image or a video.";
    }),
});
