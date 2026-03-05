import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Root URL must redirect to default language (es).
 * All locale routes are under app/[lang]/.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
