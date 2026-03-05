import { getProjectsByLang } from "@/lib/sanity/queries";

export default async function DevSanityPageEs() {
  const projects = await getProjectsByLang("es");

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-xl font-semibold">Sanity projects (es)</h1>
      <ul className="space-y-2">
        {projects.map((p, i) => (
          <li key={i} className="border-b pb-2">
            <span className="font-medium">{p.title ?? "(no title)"}</span>
            <span className="ml-2 text-sm text-zinc-600">{p.slug ?? "(no slug)"}</span>
          </li>
        ))}
      </ul>
      {projects.length === 0 && (
        <p className="text-sm text-zinc-600">No projects for this language in Sanity.</p>
      )}
    </main>
  );
}
