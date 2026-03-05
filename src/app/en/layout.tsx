import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "enblanco",
  url: `${siteUrl}/en`,
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      {children}
    </>
  );
}
