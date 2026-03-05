import { notFound } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { ProjectTransitionProvider } from "@/contexts/ProjectTransitionContext";
import { isValidLang } from "@/lib/i18n/path";
import { getDictionary } from "@/dictionaries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const dict = getDictionary(lang);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dict.siteName,
    url: `${siteUrl}/${lang}`,
  };

  return (
    <ProjectTransitionProvider>
      <JsonLd data={organizationJsonLd} />
      {children}
    </ProjectTransitionProvider>
  );
}
