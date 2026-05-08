import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getDictionary } from "@/dictionaries";
import ContactLandingPage from "@/components/contact/ContactLandingPage";
import { getSiteUrl } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const siteUrl = getSiteUrl();

/** Literal paths for Link hrefs to avoid Next 15 client router resolution errors (is-dynamic). */
const EN_PRIVACY = "/en/privacy";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  return {
    title: "Contact — enblanco",
    description:
      "Get in touch with enblanco: Murcia and Madrid. Email, phone, and contact form for projects and collaborations.",
    alternates: {
      canonical: "/en/contact",
      languages: { es: "/es/contacto", en: "/en/contact", "x-default": "/es/contacto" },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "contacto"));

  const dict = getDictionary("en");

  return (
    <ContactLandingPage
      dict={dict.contact}
      lang="en"
      privacyHref={EN_PRIVACY}
      pageUrl={`${siteUrl}/en/contact`}
    />
  );
}
