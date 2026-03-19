import type { Metadata } from "next";
import { absoluteUrl, alternatesLanguages } from "@/lib/seo";

type BuildLegalMetadataArgs = {
  title: string;
  description: string;
  canonicalPath: string;
  esPath: string;
  enPath: string;
};

export function buildLegalMetadata({
  title,
  description,
  canonicalPath,
  esPath,
  enPath,
}: BuildLegalMetadataArgs): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: alternatesLanguages(esPath, enPath),
    },
    openGraph: {
      title: `${title} — enblanco`,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: "enblanco",
      images: [
        {
          url: absoluteUrl("/og-default.jpg"),
          width: 1200,
          height: 630,
          alt: "enblanco",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
