import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return {};
  return {
    title: "Legal notice — enblanco",
    description: "Legal notice and terms of use for the enblanco website.",
    alternates: {
      canonical: "/en/legal-notice",
      languages: { es: "/es/aviso-legal", en: "/en/legal-notice", "x-default": "/es/aviso-legal" },
    },
  };
}

export default async function LegalNoticePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang) || lang !== "en") notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Legal notice</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>This legal notice governs use of the enblanco website. The site owner is the entity listed as responsible in the footer. Access and use of the site implies acceptance of these terms. Placeholder content. Replace with definitive legal text.</p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href={withLang("en", "privacy")} className="underline">privacy</Link>
        {" · "}
        <Link href={withLang("en", "cookies")} className="underline">cookies</Link>
        {" · "}
        <Link href={withLang("en", "")} className="underline">home</Link>
      </p>
    </main>
  );
}
