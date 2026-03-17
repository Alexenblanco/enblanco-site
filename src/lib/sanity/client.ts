import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export type SanityClientOptions = {
  preview?: boolean;
};

export function getSanityClient(options: SanityClientOptions = {}) {
  const { preview = false } = options;
  const token = process.env.SANITY_API_READ_TOKEN;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: preview ? "previewDrafts" : "published",
    ...(preview && token ? { token } : {}),
  });
}
