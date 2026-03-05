import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectsByLang } from "@/lib/sanity/queries";
import { buildImageUrl } from "@/lib/sanity/image";

type Props = { params: Promise<{ lang: string }> };

const VALID_LANGS = ["es", "en"] as const;

export default async function DevSanityPage({ params }: Props) {
  const { lang } = await params;
  if (!VALID_LANGS.includes(lang as (typeof VALID_LANGS)[number])) {
    notFound();
  }
  const projects = await getProjectsByLang(lang as "es" | "en");

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-xl font-semibold">Sanity projects ({lang})</h1>
      <ul className="space-y-4">
        {projects.map((p, i) => (
          <li key={i} className="flex flex-col gap-2 border-b pb-4">
            <span className="font-medium">{p.title ?? "(no title)"}</span>
            <span className="text-sm text-zinc-600">{p.slug ?? "(no slug)"}</span>
            {p.coverDesktop?.asset?._ref && (
              <div className="relative h-40 w-full overflow-hidden rounded bg-zinc-100">
                <Image
                  src={buildImageUrl(p.coverDesktop, { width: 400, quality: 75 })}
                  alt={p.title ?? ""}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {projects.length === 0 && (
        <p className="text-sm text-zinc-600">No projects for this language in Sanity.</p>
      )}
    </main>
  );
}
