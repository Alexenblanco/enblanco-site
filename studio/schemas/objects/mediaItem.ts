import { defineArrayMember, defineField, defineType } from "sanity";

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
  ],
  validation: (Rule) =>
    Rule.custom((obj) => {
      if (obj?.image || obj?.video) return true;
      return "Add either an image or a video.";
    }),
});
