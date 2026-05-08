import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.SANITY_PREVIEW_SECRET;

function getSafeRedirectPath(value: string | null): string {
  const candidate = value?.trim() || "/";

  // Allow only internal relative paths (e.g. "/es/proyectos?x=1").
  if (!candidate.startsWith("/") || candidate.startsWith("//")) return "/";
  if (candidate.includes("\\")) return "/";

  return candidate;
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const redirectPath = getSafeRedirectPath(request.nextUrl.searchParams.get("redirect"));

  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(redirectPath, request.url));
}
