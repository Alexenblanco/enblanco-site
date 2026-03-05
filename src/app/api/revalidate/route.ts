import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.SANITY_PREVIEW_SECRET || process.env.SANITY_REVALIDATE_SECRET;

function tagsForDocument(type: string, lang?: string): string[] {
  const tags: string[] = [];
  if (type === "project" && lang) {
    tags.push(`projects-${lang}`);
  }
  if (type === "note" && lang) {
    tags.push(`notes-${lang}`);
  }
  if (type === "service" && lang) {
    tags.push(`services-${lang}`);
  }
  if (type === "industry" && lang) {
    tags.push(`industries-${lang}`);
  }
  if (type === "project") {
    tags.push("projects-es", "projects-en");
  }
  if (type === "note") {
    tags.push("notes-es", "notes-en");
  }
  if (type === "service") {
    tags.push("services-es", "services-en");
  }
  if (type === "industry") {
    tags.push("industries-es", "industries-en");
  }
  return [...new Set(tags)];
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string; language?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const type = body._type;
  const lang = body.language;

  if (!type || typeof type !== "string") {
    return NextResponse.json({ revalidated: false, message: "Missing _type" }, { status: 400 });
  }

  const allowedTypes = ["project", "note", "service", "industry"];
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ revalidated: false, message: "Invalid _type" }, { status: 400 });
  }

  const tags = tagsForDocument(type, lang);
  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, tags });
}
