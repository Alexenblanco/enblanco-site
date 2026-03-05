import JsonLd from "@/components/Seo/JsonLd";
import { ProjectTransitionProvider } from "@/contexts/ProjectTransitionContext";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Enblanco",
  url: "https://enblanco-site.vercel.app/es",
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
