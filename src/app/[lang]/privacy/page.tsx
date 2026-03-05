import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return {};
  return {
    title: "Privacy — enblanco",
    description: "Privacy policy for the enblanco website.",
    alternates: {
      canonical: "/en/privacy",
      languages: { es: "/es/privacidad", en: "/en/privacy", "x-default": "/es/privacidad" },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang) || lang !== "en") notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Privacy</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>Privacy and data protection policy. Placeholder content.</p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href={withLang("en", "legal-notice")} className="underline">legal notice</Link>
        {" · "}
        <Link href={withLang("en", "cookies")} className="underline">cookies</Link>
        {" · "}
        <Link href={withLang("en", "")} className="underline">home</Link>
      </p>
    </main>
  );
}
