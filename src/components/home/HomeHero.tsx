import Link from "next/link";
import FooterInteractiveLogo from "@/components/footer/FooterInteractiveLogo";
import HomeScrollBlurVideo from "@/components/home/HomeScrollBlurVideo";
import { withLang, type Locale } from "@/lib/i18n/path";
import { CONTACT_EMAIL } from "@/lib/site-config";

type HomeHeroProps = {
  lang: Locale;
};

const COPY = {
  es: {
    languageLabel: "EN",
    languageHref: withLang("en", ""),
    h1Line1: "Branding, publicidad y dirección creativa",
    h1Line2: "para marcas con ambición",
    claim: "Business-minded\ncreativity",
  },
  en: {
    languageLabel: "ES",
    languageHref: withLang("es", ""),
    h1Line1: "branding, advertising and creative direction",
    h1Line2: "for ambitious brands",
    claim: "Business-minded\ncreativity",
  },
} satisfies Record<
  Locale,
  {
    languageLabel: string;
    languageHref: string;
    h1Line1: string;
    h1Line2: string;
    claim: string;
  }
>;

export default function HomeHero({ lang }: HomeHeroProps) {
  const copy = COPY[lang];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900"
      >
        {lang === "en" ? "Skip to main content" : "Saltar al contenido principal"}
      </a>

      <main id="main" className="overflow-x-hidden bg-[var(--color-bg)]">
        <section
          aria-label={lang === "en" ? "Home introduction" : "Introducción principal"}
          className="relative min-h-[100svh] px-8 pb-0 pt-6 [--footer-logo-top:42px] [--footer-logo-width:calc(100vw-64px)] [--footer-logo-height:calc(var(--footer-logo-width)*18.3/99.4)] [--home-logo-copy-gap:clamp(180px,26vw,500px)] md:[--footer-logo-top:52px] md:[--home-logo-copy-gap:clamp(210px,min(24svh,22vw),420px)] xl:[--footer-logo-top:56px]"
        >
          <header className="absolute inset-x-8 top-6 z-20 text-[13px] leading-[1.15] md:text-[14px]">
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 md:hidden">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="justify-self-start whitespace-nowrap no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-text)] focus-visible:!text-[var(--color-link-hover)]"
              >
                {CONTACT_EMAIL}
              </a>

              <Link
                href={copy.languageHref}
                className="justify-self-end whitespace-nowrap no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-link-hover)] focus-visible:!text-[var(--color-link-hover)]"
              >
                {copy.languageLabel}
              </Link>

              <p className="justify-self-start whitespace-nowrap !text-[var(--color-text)]">
                Murcia | Madrid
              </p>

              <p className="justify-self-end whitespace-nowrap !text-[var(--color-text)]">©2026</p>
            </div>

            <div className="relative hidden h-[18px] md:block">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="absolute left-0 top-0 whitespace-nowrap no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-text)] focus-visible:!text-[var(--color-link-hover)]"
              >
                {CONTACT_EMAIL}
              </a>

              <Link
                href={copy.languageHref}
                className="absolute top-[2px] whitespace-nowrap no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-link-hover)] focus-visible:!text-[var(--color-link-hover)]"
                style={{ left: "calc(var(--footer-logo-width) * 0.307042 - 30px)" }}
              >
                {copy.languageLabel}
              </Link>

              <p
                className="absolute top-0 whitespace-nowrap !text-[var(--color-text)]"
                style={{ left: "calc(var(--footer-logo-width) * 0.568511)" }}
              >
                Murcia | Madrid
              </p>

              <p className="absolute right-0 top-0 whitespace-nowrap !text-[var(--color-text)]">©2026</p>
            </div>
          </header>

          <FooterInteractiveLogo />

          <div className="relative z-10 grid gap-6 pt-[calc(var(--footer-logo-top)+var(--footer-logo-height)+var(--home-logo-copy-gap))] md:grid-cols-[minmax(0,1fr)_minmax(180px,240px)] md:items-end">
            <div className="max-w-[620px]">
              <h1 className="!text-[18px] !leading-[1.2] !text-[var(--color-text)]">
                <span className="block md:whitespace-nowrap">{copy.h1Line1}</span>
                <span className="block">{copy.h1Line2}</span>
              </h1>
            </div>

            <p className="max-w-[180px] whitespace-pre-line text-left !text-[18px] !leading-[1.2] !text-[var(--color-text)] md:justify-self-end md:text-right">
              {copy.claim}
            </p>
          </div>

          <div className="relative z-10 mt-16">
            <HomeScrollBlurVideo
              src="/home/video-home.mp4"
              className="w-full"
            />
          </div>
        </section>
      </main>
    </>
  );
}
