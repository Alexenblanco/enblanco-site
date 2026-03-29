import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import ServicesIndexView from "@/components/services/ServicesIndexView";
import { isValidLang, withLang } from "@/lib/i18n/path";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();
const canonicalPath = "/en/services";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "es") return {};

  return {
    title: "services",
    description:
      "enblanco creative, strategic, and digital services presented through an editorial base for capabilities, examples, and next steps.",
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: "/es/servicios",
        en: "/en/services",
        "x-default": "/es/servicios",
      },
    },
    openGraph: {
      title: "Services — enblanco",
      description:
        "enblanco creative, strategic, and digital services presented through an editorial base for capabilities, examples, and next steps.",
      url: `${siteUrl}${canonicalPath}`,
      siteName: "enblanco",
      images: [
        {
          url: `${siteUrl}/og-default.jpg`,
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

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "servicios"));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "services", item: `${siteUrl}${canonicalPath}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ServicesIndexView lang="en" />
    </>
  );
}
