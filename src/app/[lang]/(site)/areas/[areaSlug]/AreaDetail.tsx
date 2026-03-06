import JsonLd from "@/components/Seo/JsonLd";
import { getSiteUrl } from "@/lib/seo";
import type { EnAreaSlug, EsAreaSlug } from "@/lib/areas-slugs";
import { getAreaContent } from "@/data/areas-content";
import { renderAreaSectionBody } from "@/lib/areas-render";

const siteUrl = getSiteUrl();

type Lang = "en" | "es";

type Props = { lang: Lang; areaSlug: EnAreaSlug | EsAreaSlug };

export function AreaDetail({ lang, areaSlug }: Props) {
  const isEn = lang === "en";
  const homeLabel = isEn ? "home" : "inicio";
  const areasLabel = isEn ? "areas" : "áreas";

  const baseUrl = `${siteUrl}/${lang}`;
  const areasUrl = `${baseUrl}/areas`;
  const areaUrl = `${areasUrl}/${areaSlug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: baseUrl },
      { "@type": "ListItem", position: 2, name: areasLabel, item: areasUrl },
      { "@type": "ListItem", position: 3, name: areaSlug, item: areaUrl },
    ],
  };

  const content = getAreaContent(lang, areaSlug);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">{content.h1}</h1>
      </header>
      {content.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="mb-8"
        >
          <h2 id={`${section.id}-heading`} className="text-base font-semibold tracking-tight">
            {section.heading}
          </h2>
          <div className="mt-2 text-sm text-zinc-700">
            {renderAreaSectionBody(section.body, lang)}
          </div>
        </section>
      ))}
    </main>
  );
}
