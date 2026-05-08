import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getDictionary } from "@/dictionaries";
import ContactLandingPage from "@/components/contact/ContactLandingPage";
import JsonLd from "@/components/Seo/JsonLd";
import { getSiteUrl } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const siteUrl = getSiteUrl();
const description =
  "Get in touch with enblanco: Murcia and Madrid. Email, phone, and contact form for projects and collaborations.";

/** Literal paths for Link hrefs to avoid Next 15 client router resolution errors (is-dynamic). */
const EN_PRIVACY = "/en/privacy";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  return {
    title: "Contact",
    description,
    alternates: {
      canonical: "/en/contact",
      languages: { es: "/es/contacto", en: "/en/contact", "x-default": "/es/contacto" },
    },
    openGraph: {
      title: "Contact — enblanco",
      description,
      url: `${siteUrl}/en/contact`,
      siteName: "enblanco",
      images: [{ url: `${siteUrl}/og-default.jpg`, width: 1200, height: 630, alt: "enblanco" }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "contacto"));

  const dict = getDictionary("en");
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "contact", item: `${siteUrl}/en/contact` },
    ],
  };
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — enblanco",
    url: `${siteUrl}/en/contact`,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "enblanco", url: siteUrl },
    about: { "@type": "Organization", name: "enblanco", url: siteUrl },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={contactPageJsonLd} />
      <ContactLandingPage
        dict={dict.contact}
        lang="en"
        privacyHref={EN_PRIVACY}
        pageUrl={`${siteUrl}/en/contact`}
      />
    </>
  );
}
