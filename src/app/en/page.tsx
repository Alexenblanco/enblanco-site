import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branding & Design Agency",
  description:
    "Enblanco: branding, web design and digital strategy studio based in Spain.",
  alternates: {
    canonical: "/en",
    languages: {
      es: "/es",
      en: "/en",
      "x-default": "/es",
    },
  },
  openGraph: {
    title: "Branding & Design Agency",
    description:
      "Enblanco: branding, web design and digital strategy studio based in Spain.",
  },
};

export default function Home() {
  return (
    <div>
      <h1>Home EN</h1>
    </div>
  );
}
