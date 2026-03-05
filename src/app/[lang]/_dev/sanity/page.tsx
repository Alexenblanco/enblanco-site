import { notFound } from "next/navigation";
import { getProjectsIndex } from "@/lib/sanity/queries";
import { buildImageUrl } from "@/lib/sanity/image";
import { isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

export default async function DevSanityPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const projects = await getProjectsIndex(lang);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-xl font-semibold">Sanity projects ({lang})</h1>
      <ul className="space-y-4">
        {projects.map((p, i) => {
          const cover = p.coverVertical ?? p.coverDesktop;
          const coverUrl = cover ? buildImageUrl(cover, { width: 320 }) : null;
          return (
            <li key={i} className="border-b pb-4">
              <div className="flex gap-3">
                {coverUrl && (
                  <img
                    src={coverUrl}
                    alt={p.title ?? ""}
                    className="h-20 w-20 shrink-0 object-cover"
                  />
                )}
                <div>
                  <span className="font-medium">{p.title ?? "(no title)"}</span>
                  <span className="ml-2 text-sm text-zinc-600">{p.slug ?? "(no slug)"}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {projects.length === 0 && (
        <p className="text-sm text-zinc-600">No projects for this language in Sanity.</p>
      )}
    </main>
  );
}
