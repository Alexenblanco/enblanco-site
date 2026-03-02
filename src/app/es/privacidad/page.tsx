import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidad — enblanco",
  description: "Política de privacidad y protección de datos de enblanco.",
  alternates: {
    canonical: "/es/privacidad",
    languages: {
      es: "/es/privacidad",
      en: "/en/privacy",
      "x-default": "/es/privacidad",
    },
  },
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Privacidad</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>
          En enblanco tratamos la información que nos facilitas de acuerdo con la normativa aplicable en protección de datos. Esta política describe qué datos recogemos, para qué los usamos y cuáles son tus derechos.
        </p>
        <p>
          Contenido placeholder. Sustituir por la política de privacidad completa y, si aplica, información sobre el delegado de protección de datos y medidas de seguridad.
        </p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href="/es/aviso-legal" className="underline">aviso legal</Link>
        {" · "}
        <Link href="/es/cookies" className="underline">cookies</Link>
        {" · "}
        <Link href="/es" className="underline">inicio</Link>
      </p>
    </main>
  );
}
