import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy — enblanco",
  description: "Privacy and data protection policy of enblanco.",
  alternates: {
    canonical: "/en/privacy",
    languages: {
      es: "/es/privacidad",
      en: "/en/privacy",
      "x-default": "/es/privacidad",
    },
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Privacy</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>
          At enblanco we process the information you provide in accordance with applicable data protection law. This policy describes what data we collect, how we use it, and your rights.
        </p>
        <p>
          Placeholder content. Replace with the full privacy policy and, if applicable, information on the data protection officer and security measures.
        </p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href="/en/legal-notice" className="underline">legal notice</Link>
        {" · "}
        <Link href="/en/cookies" className="underline">cookies</Link>
        {" · "}
        <Link href="/en" className="underline">home</Link>
      </p>
    </main>
  );
}
