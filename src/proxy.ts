import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isStaticAsset(pathname: string): boolean {
  return /\.(?:avif|css|gif|ico|jpg|jpeg|js|json|map|mp4|png|svg|txt|webm|webmanifest|woff2?|xml)$/i.test(
    pathname
  );
}

const SPANISH_PUBLIC_SECTIONS = new Set([
  "contacto",
  "servicios",
  "notas",
  "proyectos",
  "areas",
  "enblanco",
  "privacidad",
  "aviso-legal",
  "cookies",
]);

function shouldRedirectToSpanish(pathname: string): boolean {
  if (pathname === "/") return false;
  const [, firstSegment] = pathname.split("/");
  return SPANISH_PUBLIC_SECTIONS.has(firstSegment ?? "");
}

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname === "/" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/es") ||
    pathname.startsWith("/en") ||
    isStaticAsset(pathname) ||
    !shouldRedirectToSpanish(pathname)
  ) {
    return withSecurityHeaders(NextResponse.next());
  }

  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  url.search = search;
  return withSecurityHeaders(NextResponse.redirect(url, 308));
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
