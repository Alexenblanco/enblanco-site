import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h1 className="text-xl font-semibold tracking-tight">404</h1>
      <p className="mt-2 text-sm text-zinc-600">
        No encontramos la página que buscas.
      </p>
      <Link
        href="/es"
        className="mt-6 text-sm underline underline-offset-2 hover:no-underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
