import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * CANDIDATE FOR REMOVAL — Not used by any middleware.
 * Root redirect / → /es is handled in app/page.tsx. No middleware.ts in app or src imports this.
 * Safe to delete after confirming no custom server or deploy pipeline uses it.
 *
 * Root URL must redirect to default language (es).
 * All locale routes are under app/[lang]/.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
