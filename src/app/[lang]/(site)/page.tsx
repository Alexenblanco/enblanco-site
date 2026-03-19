import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeHero from "@/components/home/HomeHero";
import { isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const isEn = lang === "en";
  return {
    title: isEn
      ? "enblanco creative agency: branding, design, and direction with clear judgment"
      : "Agencia creativa enblanco: branding, diseño y dirección con criterio",
    description: isEn
      ? "enblanco is a creative agency for branding, design, and art direction that works with clear judgment and systems that hold up."
      : "enblanco es una agencia creativa de branding, diseño y dirección que trabaja con criterio: sistemas claros, ejecutados sin ruido.",
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      title: isEn
        ? "enblanco creative agency: branding, design, and direction with clear judgment"
        : "Agencia creativa enblanco: branding, diseño y dirección con criterio",
      description: isEn
        ? "enblanco is a creative agency for branding, design, and art direction that works with clear judgment and systems that hold up."
        : "enblanco es una agencia creativa de branding, diseño y dirección que trabaja con criterio: sistemas claros, ejecutados sin ruido.",
    },
  };
}

export default async function LangHomePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  return <HomeHero lang={lang} />;
}
