"use client";

import Image from "next/image";
import Link from "next/link";
import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
import type { HomeFeaturedProjectCard } from "@/lib/sanity/queries";
import type { Locale } from "@/lib/i18n/path";
import { withLang } from "@/lib/i18n/path";

type Props = {
  lang: Locale;
  projects: HomeFeaturedProjectCard[];
};

const COPY = {
  es: {
    title: "Proyectos destacados",
    cta: "Ver todos los proyectos",
    sectionAria: "Trabajos destacados en la home",
  },
  en: {
    title: "Selected works",
    cta: "See all projects",
    sectionAria: "Featured work on the home page",
  },
} satisfies Record<Locale, { title: string; cta: string; sectionAria: string }>;

const HEADING_ID_MOBILE = "home-featured-heading";
const STACKED_CARD_OFFSET = 328;

function projectHref(lang: Locale, slug: string): string {
  return lang === "es"
    ? withLang("es", `proyectos/${slug}`)
    : withLang("en", `projects/${slug}`);
}

function projectsIndexHref(lang: Locale): string {
  return lang === "es" ? withLang("es", "proyectos") : withLang("en", "projects");
}

function getProjectTags(label: string): string[] {
  return label
    .split(/\||·/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function pickSingleFeaturedProject(
  projects: HomeFeaturedProjectCard[],
): HomeFeaturedProjectCard | null {
  return projects[0] ?? null;
}

function pickSecondaryFeaturedProject(
  projects: HomeFeaturedProjectCard[],
): HomeFeaturedProjectCard | null {
  return projects[1] ?? null;
}

function pickTertiaryFeaturedProject(
  projects: HomeFeaturedProjectCard[],
): HomeFeaturedProjectCard | null {
  return projects[2] ?? null;
}

function FeaturedProjectCard({
  card,
  lang,
  imagePriority = false,
  metaPosition = "below",
  articleOffsetTop = 0,
}: {
  card: HomeFeaturedProjectCard;
  lang: Locale;
  imagePriority?: boolean;
  metaPosition?: "above" | "below";
  articleOffsetTop?: number;
}) {
  const href = card.href ?? projectHref(lang, card.slug);
  const tags = getProjectTags(card.label);

  const meta = (
    <div className="w-[328px] max-w-full min-w-0">
      <h3
        className="w-[328px] max-w-full min-w-0 text-left font-normal text-[var(--color-text)] break-words"
        style={{ fontSize: "24px", lineHeight: "1.1" }}
      >
        {card.title}
      </h3>

      <div
        className="grid w-[328px] max-w-full min-w-0 items-start"
        style={{
          marginTop: "10px",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          columnGap: "32px",
        }}
      >
        <div className="flex min-w-0 flex-wrap justify-end gap-x-2 gap-y-1 text-right justify-self-end">
          {tags.map((tag) => (
            <span
              key={tag}
              className="shrink-0 text-[var(--color-text)]"
              style={{ fontSize: "12px", lineHeight: "1.2" }}
            >
              [{` ${tag} `}]
            </span>
          ))}
        </div>

        <Link
          href={href}
          className="shrink-0 justify-self-end text-[var(--color-text)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--color-link-hover)]"
          style={{ fontSize: "16px", lineHeight: "1.2" }}
        >
          Ver-&gt;
        </Link>
      </div>
    </div>
  );

  return (
    <article
      className="inline-block w-[328px] max-w-full min-w-0 align-top"
      style={
        articleOffsetTop > 0
          ? { transform: `translateY(${articleOffsetTop}px)` }
          : undefined
      }
    >
      {metaPosition === "above" ? (
        <div style={{ marginBottom: "24px" }}>{meta}</div>
      ) : null}

      <Link
        href={href}
        className="group block no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
      >
        <div
          className="relative h-[407px] w-[328px] overflow-hidden bg-[var(--color-bg)]"
          style={{ borderRadius: "7px", clipPath: "inset(0 round 7px)" }}
        >
          {card.imageUrl ? (
            <Image
              src={card.imageUrl}
              alt={card.imageAlt}
              width={328}
              height={407}
              priority={imagePriority}
              unoptimized
              className="block rounded-none object-cover"
              style={{
                borderRadius: 0,
                width: "330px",
                height: "409px",
                maxWidth: "none",
                marginLeft: "-1px",
                marginTop: "-1px",
              }}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-xs text-zinc-500">
              {card.title}
            </span>
          )}
        </div>
      </Link>

      {metaPosition === "below" ? (
        <div style={{ marginTop: "32px" }}>{meta}</div>
      ) : null}
    </article>
  );
}

function IntroTitle({ lang, headingId }: { lang: Locale; headingId?: string }) {
  const copy = COPY[lang];
  return headingId ? (
    <h2
      id={headingId}
      className="font-normal text-[var(--color-text)]"
      style={{ fontSize: "20px", lineHeight: "1.2" }}
    >
      {copy.title}
    </h2>
  ) : (
    <h2
      className="font-normal text-[var(--color-text)]"
      style={{ fontSize: "20px", lineHeight: "1.2" }}
    >
      {copy.title}
    </h2>
  );
}

function IntroDescriptionLines({ lang }: { lang: Locale }) {
  const fixedStyle = { fontSize: "32px", lineHeight: "33px" } as const;

  if (lang === "es") {
    return (
      <p className="font-normal text-zinc-600" style={fixedStyle}>
        <span className="block">Mediante creatividad, estrategia y dirección</span>
        <span className="block">re-de-construimos el universo visual, verbal</span>
        <span className="block">y conceptual de marcas.</span>
      </p>
    );
  }
  return (
    <p className="font-normal text-zinc-600" style={fixedStyle}>
      <span className="block">Through creativity, strategy, and direction,</span>
      <span className="block">we re-de-construct the visual, verbal,</span>
      <span className="block">and conceptual universe of brands.</span>
    </p>
  );
}

function IntroCtaLink({ lang, className }: { lang: Locale; className?: string }) {
  const copy = COPY[lang];
  return (
    <Link
      href={projectsIndexHref(lang)}
      className={
        className ??
        "inline-flex items-center justify-center gap-1 text-[14px] leading-snug text-[var(--color-text)] underline decoration-zinc-400 underline-offset-4 transition-colors hover:text-[var(--color-link-hover)] hover:decoration-[var(--color-link-hover)] focus-visible:text-[var(--color-link-hover)]"
      }
    >
      {copy.cta}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function HomeFeaturedWorksClient({ lang, projects }: Props) {
  const copy = COPY[lang];
  const selectedProject = pickSingleFeaturedProject(projects);
  const secondaryProject = pickSecondaryFeaturedProject(projects);
  const tertiaryProject = pickTertiaryFeaturedProject(projects);

  return (
    <div className="overflow-x-clip" style={{ marginTop: "200px" }}>
      <section
        aria-labelledby={HEADING_ID_MOBILE}
        className="bg-[var(--color-bg)] md:hidden"
      >
        <EditorialShell className="py-16">
          <EditorialBlock start="frame-start" end="frame-end" className="mb-10">
            <IntroTitle lang={lang} headingId={HEADING_ID_MOBILE} />
            <div style={{ marginTop: "24px" }}>
              <IntroDescriptionLines lang={lang} />
            </div>
            <div className="text-center" style={{ marginTop: "64px" }}>
              <IntroCtaLink lang={lang} />
            </div>
          </EditorialBlock>
          <EditorialBlock start="frame-start" end="frame-end">
            {selectedProject ? (
              <FeaturedProjectCard card={selectedProject} lang={lang} imagePriority />
            ) : null}
          </EditorialBlock>
        </EditorialShell>
      </section>

      <EditorialShell
        as="section"
        aria-label={copy.sectionAria}
        className="hidden overflow-x-clip py-16 xl:py-24 md:grid"
        style={{ paddingBottom: `${STACKED_CARD_OFFSET}px` }}
      >
        <EditorialSubgrid start="frame-start" end="frame-end" className="items-start">
          <div
            className="max-w-none min-w-0 self-start"
            style={{
              gridColumn: "guide-1 / guide-3",
              gridRow: "1 / 4",
              display: "grid",
              gridTemplateColumns: "subgrid",
            }}
          >
            <div style={{ gridColumn: "1 / 3" }}>
              <IntroTitle lang={lang} />
            </div>
            <div style={{ gridColumn: "1 / 3", marginTop: "24px" }}>
              <IntroDescriptionLines lang={lang} />
            </div>
            <div
              className="min-w-0"
              style={{
                gridColumn: "1 / 2",
                marginTop: "64px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IntroCtaLink lang={lang} />
            </div>
          </div>

          <div
            className="min-w-0 self-start"
            style={{ gridColumn: "guide-1 / guide-3", gridRow: "1 / 4" }}
          >
            <div className="flex justify-end">
              {tertiaryProject ? (
                <FeaturedProjectCard
                  card={tertiaryProject}
                  lang={lang}
                  metaPosition="above"
                  articleOffsetTop={STACKED_CARD_OFFSET}
                />
              ) : null}
            </div>
          </div>

          <div
            className="min-w-0 self-start"
            style={{ gridColumn: "guide-4 / guide-6", gridRow: "1 / 4" }}
          >
            <div
              className="min-w-0"
              style={{
                display: "grid",
                gridTemplateColumns: "328px 328px",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <div className="min-w-0">
                {selectedProject ? (
                  <FeaturedProjectCard card={selectedProject} lang={lang} imagePriority />
                ) : null}
              </div>

              <div className="min-w-0 justify-self-end">
                {secondaryProject ? (
                  <FeaturedProjectCard
                    card={secondaryProject}
                    lang={lang}
                    metaPosition="above"
                    articleOffsetTop={STACKED_CARD_OFFSET}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </EditorialSubgrid>
      </EditorialShell>
    </div>
  );
}
