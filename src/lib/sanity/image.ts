import imageUrlBuilder from "@sanity/image-url";
import { getSanityClient } from "./client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const client = getSanityClient({ preview: false });
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type ImageUrlOptions = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
};

export function buildImageUrl(
  source: SanityImageSource,
  options: ImageUrlOptions = {}
): string {
  const { width, height, quality = 80, fit = "max" } = options;
  let url = urlFor(source).fit(fit).quality(quality);
  if (typeof width === "number") url = url.width(width);
  if (typeof height === "number") url = url.height(height);
  return url.url();
}
