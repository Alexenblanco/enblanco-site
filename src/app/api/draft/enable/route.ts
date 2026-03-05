import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.SANITY_PREVIEW_SECRET;

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const redirect = request.nextUrl.searchParams.get("redirect") ?? "/";

  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(redirect, request.url));
}
