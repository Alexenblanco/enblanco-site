import Link from "next/link";
import InteractiveLogo from "@/components/logo/InteractiveLogo";
import HomeScrollBlurVideo from "@/components/home/HomeScrollBlurVideo";
import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
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

const copyOffsetStyle = {
  paddingTop:
    "calc(var(--interactive-logo-top) + var(--interactive-logo-height) + var(--home-logo-copy-gap))",
};

export default function HomeHero({ lang }: HomeHeroProps) {
  const copy = COPY[lang];
  const copyrightYearLabel = `© ${new Date().getFullYear()}`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900"
      >
        {lang === "en" ? "Skip to main content" : "Saltar al contenido principal"}
      </a>

      <main id="main" className="overflow-x-hidden bg-[var(--color-bg)]">
        <EditorialShell
          as="section"
          aria-label={lang === "en" ? "Home introduction" : "Introducción principal"}
          className="relative min-h-[100svh] pb-0 pt-0 [--interactive-logo-top:44px] [--interactive-logo-width:var(--editorial-frame-width)] [--interactive-logo-height:calc(var(--interactive-logo-width)*18.3/99.4)] [--home-logo-copy-gap:clamp(180px,26vw,500px)] md:[--interactive-logo-top:54px] md:[--home-logo-copy-gap:clamp(200px,calc(100svh-var(--home-hero-visible-video-svh)-var(--interactive-logo-top)-var(--interactive-logo-height)-var(--home-hero-text-row-estimate)-var(--home-video-gap)),680px)] xl:[--interactive-logo-top:58px]"
        >
          <InteractiveLogo className="z-10" />

          <EditorialBlock
            start="frame-start"
            end="frame-end"
            className="relative z-20 grid grid-cols-2 gap-x-5 gap-y-2 px-0 pt-6 text-[13px] leading-[1.15] md:hidden"
          >
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

            <p className="justify-self-end whitespace-nowrap !text-[var(--color-text)]">
              Murcia | Madrid
            </p>

            <p className="justify-self-start whitespace-nowrap !text-[var(--color-text)]">{copyrightYearLabel}</p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="justify-self-end whitespace-nowrap no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-text)] focus-visible:!text-[var(--color-link-hover)]"
            >
              {CONTACT_EMAIL}
            </a>
          </EditorialBlock>

          <EditorialSubgrid
            start="frame-start"
            end="frame-end"
            className="relative z-20 hidden items-start pt-6 text-[14px] leading-[1.15] md:grid"
          >
            <div
              className="flex items-baseline gap-6 whitespace-nowrap !text-[var(--color-text)]"
              style={{ gridColumn: "guide-1 / guide-2" }}
            >
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
              className="whitespace-nowrap !text-[var(--color-text)]"
              style={{ gridColumn: "guide-2 / guide-3" }}
            >
              Murcia | Madrid
            </p>

            <p
              className="whitespace-nowrap !text-[var(--color-text)]"
              style={{ gridColumn: "guide-4 / guide-5" }}
            >
              {copyrightYearLabel}
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="justify-self-end whitespace-nowrap no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-text)] focus-visible:!text-[var(--color-link-hover)]"
              style={{ gridColumn: "guide-5 / guide-6" }}
            >
              {CONTACT_EMAIL}
            </a>
          </EditorialSubgrid>

          <EditorialBlock
            start="guide-1"
            end="guide-3"
            className="relative z-10 max-w-none"
            style={copyOffsetStyle}
          >
            <h1 className="!text-[20px] !leading-[1.2] !text-[var(--color-text)]">
              <span className="block whitespace-normal xl:whitespace-nowrap">{copy.h1Line1}</span>
              <span className="block">{copy.h1Line2}</span>
            </h1>
          </EditorialBlock>

          <EditorialBlock
            start="guide-4"
            end="guide-6"
            className="relative z-10 self-end"
            style={copyOffsetStyle}
          >
            <p className="ml-auto max-w-[240px] text-left !text-[14px] !leading-[1.2] !text-[var(--color-text)] md:text-right">
              {copy.claim}
            </p>
          </EditorialBlock>

          <EditorialBlock
            start="frame-start"
            end="frame-end"
            className="relative z-10"
            style={{ marginTop: "var(--home-video-gap, 28px)" }}
          >
            <HomeScrollBlurVideo src="/home/video-home.mp4" className="w-full" />
          </EditorialBlock>
        </EditorialShell>
      </main>
    </>
  );
}
