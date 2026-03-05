import { draftMode } from "next/headers";
import { getSanityClient } from "./client";

export type SanityFetchOptions = {
  preview?: boolean;
  revalidate?: number;
  tags?: string[];
};

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, options: SanityFetchOptions = {}): Promise<T> {
  const { preview: optionPreview, revalidate, tags } = options;
  const { isEnabled: draftEnabled } = await draftMode();
  const preview = optionPreview ?? draftEnabled;

  const client = getSanityClient({ preview });

  if (preview) {
    return client.fetch<T>(query, params);
  }

  return client.fetch<T>(query, params, {
    next: {
      ...(typeof revalidate === "number" && { revalidate }),
      ...(Array.isArray(tags) && tags.length > 0 && { tags }),
    },
  });
}
