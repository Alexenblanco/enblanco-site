import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getDictionary } from "@/dictionaries";
import ContactLandingPage from "@/components/contact/ContactLandingPage";
import { getSiteUrl } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const siteUrl = getSiteUrl();

/** Literal paths for Link hrefs to avoid Next 15 client router resolution errors (is-dynamic). */
const ES_PRIVACIDAD = "/es/privacidad";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return {
    title: "Contacto — enblanco",
    description:
      "Contacta con enblanco: Murcia y Madrid. Email, teléfono y formulario para proyectos y colaboraciones.",
    alternates: {
      canonical: "/es/contacto",
      languages: { es: "/es/contacto", en: "/en/contact", "x-default": "/es/contacto" },
    },
  };
}

export default async function ContactoPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "contact"));

  const dict = getDictionary("es");

  return (
    <ContactLandingPage
      dict={dict.contact}
      lang="es"
      privacyHref={ES_PRIVACIDAD}
      pageUrl={`${siteUrl}/es/contacto`}
    />
  );
}
