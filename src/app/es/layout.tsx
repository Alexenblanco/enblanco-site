import JsonLd from "@/components/Seo/JsonLd";
import { ProjectTransitionProvider } from "@/contexts/ProjectTransitionContext";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "enblanco",
  url: `${siteUrl}/es`,
};

export default function EsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectTransitionProvider>
      <JsonLd data={organizationJsonLd} />
      {children}
    </ProjectTransitionProvider>
  );
}
