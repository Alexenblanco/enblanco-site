import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};
  return {
    title: "Privacidad — enblanco",
    description: "Política de privacidad del sitio web de enblanco.",
    alternates: {
      canonical: "/es/privacidad",
      languages: { es: "/es/privacidad", en: "/en/privacy", "x-default": "/es/privacidad" },
    },
  };
}

export default async function PrivacidadPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang) || lang !== "es") notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Privacidad</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>Política de privacidad y protección de datos. Contenido placeholder.</p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href={withLang("es", "aviso-legal")} className="underline">aviso legal</Link>
        {" · "}
        <Link href={withLang("es", "cookies")} className="underline">cookies</Link>
        {" · "}
        <Link href={withLang("es", "")} className="underline">inicio</Link>
      </p>
    </main>
  );
}
