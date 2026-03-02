import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso legal — enblanco",
  description: "Aviso legal y condiciones de uso del sitio web de enblanco.",
  alternates: {
    canonical: "/es/aviso-legal",
    languages: {
      es: "/es/aviso-legal",
      en: "/en/legal-notice",
      "x-default": "/es/aviso-legal",
    },
  },
};

export default function AvisoLegalPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Aviso legal</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>
          Este aviso legal regula el uso del sitio web de enblanco. El titular del sitio es la entidad que figura como responsable en el pie de página. El acceso y uso del sitio implica la aceptación de las presentes condiciones.
        </p>
        <p>
          Contenido placeholder. Sustituir por el texto legal definitivo redactado o revisado por un profesional.
        </p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href="/es/privacidad" className="underline">privacidad</Link>
        {" · "}
        <Link href="/es/cookies" className="underline">cookies</Link>
        {" · "}
        <Link href="/es" className="underline">inicio</Link>
      </p>
    </main>
  );
}
