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
  "Contacta con enblanco: Murcia y Madrid. Email, teléfono y formulario para proyectos y colaboraciones.";

/** Literal paths for Link hrefs to avoid Next 15 client router resolution errors (is-dynamic). */
const ES_PRIVACIDAD = "/es/privacidad";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return {
    title: "Contacto",
    description,
    alternates: {
      canonical: "/es/contacto",
      languages: { es: "/es/contacto", en: "/en/contact", "x-default": "/es/contacto" },
    },
    openGraph: {
      title: "Contacto — enblanco",
      description,
      url: `${siteUrl}/es/contacto`,
      siteName: "enblanco",
      images: [{ url: `${siteUrl}/og-default.jpg`, width: 1200, height: 630, alt: "enblanco" }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ContactoPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "contact"));

  const dict = getDictionary("es");
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
      { "@type": "ListItem", position: 2, name: "contacto", item: `${siteUrl}/es/contacto` },
    ],
  };
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto — enblanco",
    url: `${siteUrl}/es/contacto`,
    inLanguage: "es",
    isPartOf: { "@type": "WebSite", name: "enblanco", url: siteUrl },
    about: { "@type": "Organization", name: "enblanco", url: siteUrl },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={contactPageJsonLd} />
      <ContactLandingPage
        dict={dict.contact}
        lang="es"
        privacyHref={ES_PRIVACIDAD}
        pageUrl={`${siteUrl}/es/contacto`}
      />
    </>
  );
}
