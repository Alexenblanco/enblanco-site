import type { Metadata } from "next";
import HomeApproachSection from "@/components/home/HomeApproachSection";
import { notFound } from "next/navigation";
import HomeFeaturedWorks from "@/components/home/HomeFeaturedWorks";
import HomeHero from "@/components/home/HomeHero";
import HomeIndustriesSection from "@/components/home/HomeIndustriesSection";
import HomeOfficeVideoBand from "@/components/home/HomeOfficeVideoBand";
import HomeServicesOrbit from "@/components/home/HomeServicesOrbit";
import { isValidLang } from "@/lib/i18n/path";
import { getHomeFeaturedProjects } from "@/lib/sanity/queries";

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

  const featuredProjects = await getHomeFeaturedProjects(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900"
      >
        {lang === "en" ? "Skip to main content" : "Saltar al contenido principal"}
      </a>
      <main id="main" className="overflow-x-hidden bg-[var(--color-bg)]">
        <HomeHero lang={lang} />
        <HomeFeaturedWorks lang={lang} projects={featuredProjects} />
        <HomeServicesOrbit lang={lang} />
        <HomeApproachSection lang={lang} />
        <HomeOfficeVideoBand />
        <HomeIndustriesSection lang={lang} />
      </main>
    </>
  );
}
