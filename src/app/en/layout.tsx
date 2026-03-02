import JsonLd from "@/components/Seo/JsonLd";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Enblanco",
  url: "https://enblanco-site.vercel.app/en",
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
