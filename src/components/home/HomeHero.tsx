import Link from "next/link";
import InteractiveLogo from "@/components/logo/InteractiveLogo";
import HomeScrollBlurVideo from "@/components/home/HomeScrollBlurVideo";
import { withLang, type Locale } from "@/lib/i18n/path";
import { CONTACT_EMAIL } from "@/lib/site-config";

type HomeHeroProps = {
  lang: Locale;
};

const COPY = {
  es: {
    otherLangHref: withLang("en", ""),
    h1Line1: "Branding, publicidad y dirección creativa",
    h1Line2: "para marcas con ambición",
    claim: "Creatividad enfocada en negocio",
  },
  en: {
    otherLangHref: withLang("es", ""),
    h1Line1: "Branding, advertising and creative direction",
    h1Line2: "for ambitious brands",
    claim: "Business-minded creativity",
  },
} satisfies Record<
  Locale,
  {
    otherLangHref: string;
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
          className="relative min-h-[100svh] px-8 pb-0 pt-6 [--interactive-logo-top:44px] [--interactive-logo-width:calc(100vw-64px)] [--interactive-logo-height:calc(var(--interactive-logo-width)*18.3/99.4)] [--home-logo-copy-gap:clamp(180px,26vw,500px)] [--home-video-gap:28px] md:[--interactive-logo-top:54px] md:[--home-logo-copy-gap:clamp(260px,calc(90svh-var(--interactive-logo-top)-var(--interactive-logo-height)-72px),520px)] xl:[--interactive-logo-top:58px]"
        >
          <header className="absolute inset-x-8 top-6 z-20 text-[13px] leading-[1.15] md:text-[14px]">
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 md:hidden">
              <div className="flex justify-start gap-6 whitespace-nowrap !text-[var(--color-text)]">
                {lang === "es" ? (
                  <>
                    <span aria-current="true">es</span>
                    <Link
                      href={copy.otherLangHref}
                      className="no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-link-hover)] focus-visible:!text-[var(--color-link-hover)]"
                    >
                      en
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={copy.otherLangHref}
                      className="no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-link-hover)] focus-visible:!text-[var(--color-link-hover)]"
                    >
                      es
                    </Link>
                    <span aria-current="true">en</span>
                  </>
                )}
              </div>

              <p className="justify-self-end whitespace-nowrap !text-[var(--color-text)]">Murcia | Madrid</p>

              <p className="justify-self-start whitespace-nowrap !text-[var(--color-text)]">©2026</p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="justify-self-end whitespace-nowrap no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-text)] focus-visible:!text-[var(--color-link-hover)]"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="relative hidden h-[20px] md:block">
              <div className="absolute left-0 top-[2px] flex items-baseline gap-6 whitespace-nowrap !text-[var(--color-text)]">
                {lang === "es" ? (
                  <>
                    <span aria-current="true">es</span>
                    <Link
                      href={copy.otherLangHref}
                      className="no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-link-hover)] focus-visible:!text-[var(--color-link-hover)]"
                    >
                      en
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={copy.otherLangHref}
                      className="no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-link-hover)] focus-visible:!text-[var(--color-link-hover)]"
                    >
                      es
                    </Link>
                    <span aria-current="true">en</span>
                  </>
                )}
              </div>

              <p
                className="absolute top-0 whitespace-nowrap !text-[var(--color-text)]"
                style={{ left: "calc(var(--interactive-logo-width) * 0.307042 - 30px - 24px - 6px)" }}
              >
                Murcia | Madrid
              </p>

              <p
                className="absolute top-0 whitespace-nowrap !text-[var(--color-text)]"
                style={{ left: "calc(var(--interactive-logo-width) * 0.568511 - 2px)" }}
              >
                ©2026
              </p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="absolute right-0 top-0 whitespace-nowrap no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-text)] focus-visible:!text-[var(--color-link-hover)]"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </header>

          <InteractiveLogo />

          <div className="relative z-10 grid gap-6 pt-[calc(var(--interactive-logo-top)+var(--interactive-logo-height)+var(--home-logo-copy-gap))] md:grid-cols-[minmax(0,1fr)_minmax(180px,240px)] md:items-end">
            <div className="max-w-[620px]">
              <h1 className="!text-[20px] !leading-[1.2] !text-[var(--color-text)]">
                <span className="block md:whitespace-nowrap">{copy.h1Line1}</span>
                <span className="block">{copy.h1Line2}</span>
              </h1>
            </div>

            <p className="max-w-[220px] text-left !text-[14px] !leading-[1.2] !text-[var(--color-text)] md:max-w-none md:justify-self-end md:whitespace-nowrap md:text-right">
              {copy.claim}
            </p>
          </div>

          <div
            className="relative z-10"
            style={{ marginTop: "var(--home-video-gap)" }}
          >
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
