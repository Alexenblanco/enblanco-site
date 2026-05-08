"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
import HomeBrandUniverseLines from "@/components/home/HomeBrandUniverseLines";
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
    ctaAria: "Ver todos los proyectos destacados",
    featuredCardTargetAria: (title: string) => `Ver el proyecto ${title}`,
    cardVerVisible: "Ver",
  },
  en: {
    title: "Selected works",
    cta: "See all projects",
    sectionAria: "Featured work on the home page",
    ctaAria: "See all featured projects",
    featuredCardTargetAria: (title: string) => `View project ${title}`,
    cardVerVisible: "View",
  },
} satisfies Record<
  Locale,
  {
    title: string;
    cta: string;
    sectionAria: string;
    ctaAria: string;
    featuredCardTargetAria: (title: string) => string;
    cardVerVisible: string;
  }
>;

const HEADING_ID_MOBILE = "home-featured-heading";
const HEADING_ID_DESKTOP = "home-featured-heading-desktop";
const FEATURED_BATCH_SIZE = 3;
const FEATURED_ROTATION_INTERVAL_MS = 9000;
const FEATURED_REVEAL_DURATION = 0.75;
const FEATURED_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const FEATURED_REVEAL_BLUR_PX = 6;
const FEATURED_REVEAL_OFFSET_Y = 8;
const FEATURED_REVEAL_VIEWPORT = { once: true, amount: 0.28 } as const;
const FEATURED_SWAP_DURATION = 0.2;
const FEATURED_SWAP_EASE = [0.22, 1, 0.36, 1] as const;
const FEATURED_SWAP_OFFSET_X = 8;
const FEATURED_SWAP_STAGGER = 0.045;
const FEATURED_CARD_META_DELAY = 0.02;
const FEATURED_CARD_COVER_DELAY = 0.09;
const STACKED_CARD_OFFSET = 328;

/** Flecha junto al texto del enlace (sin <span>: así hereda color/hover/active del <a> pese a `.page * { color: … !important }`). */
const LINK_ARROW = " →";

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

function chunkFeaturedProjects(
  projects: HomeFeaturedProjectCard[],
  chunkSize = FEATURED_BATCH_SIZE,
): HomeFeaturedProjectCard[][] {
  const chunks: HomeFeaturedProjectCard[][] = [];

  for (let index = 0; index < projects.length; index += chunkSize) {
    const chunk = projects.slice(index, index + chunkSize);
    if (chunk.length === chunkSize) chunks.push(chunk);
  }

  return chunks;
}

function getRevealAnimation(delay: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return {
      initial: false as const,
      whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
      viewport: FEATURED_REVEAL_VIEWPORT,
      transition: { duration: 0 },
    };
  }

  return {
    initial: {
      opacity: 0,
      filter: `blur(${FEATURED_REVEAL_BLUR_PX}px)`,
      y: FEATURED_REVEAL_OFFSET_Y,
    },
    whileInView: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
    viewport: FEATURED_REVEAL_VIEWPORT,
    transition: {
      duration: FEATURED_REVEAL_DURATION,
      ease: FEATURED_REVEAL_EASE,
      delay,
    },
  };
}

function getCardPartAnimation(delay: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1, filter: "blur(0px)", y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: {
      opacity: 0,
      filter: "blur(4px)",
      y: 5,
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
    transition: {
      duration: 0.34,
      ease: FEATURED_SWAP_EASE,
      delay,
    },
  };
}

function getSwapAnimation(slotIndex: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1, x: 0 },
      exit: undefined,
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, x: -FEATURED_SWAP_OFFSET_X },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: FEATURED_SWAP_OFFSET_X },
    transition: {
      duration: FEATURED_SWAP_DURATION,
      ease: FEATURED_SWAP_EASE,
      delay: slotIndex * FEATURED_SWAP_STAGGER,
    },
  };
}

function FeaturedProjectCard({
  card,
  lang,
  imagePriority = false,
  metaPosition = "below",
  articleOffsetTop = 0,
  reduceMotion = false,
}: {
  card: HomeFeaturedProjectCard;
  lang: Locale;
  imagePriority?: boolean;
  metaPosition?: "above" | "below";
  articleOffsetTop?: number;
  reduceMotion?: boolean;
}) {
  const copy = COPY[lang];
  const href = card.href ?? projectHref(lang, card.slug);
  const tags = getProjectTags(card.label);
  const targetAria = copy.featuredCardTargetAria(card.title);

  const coverLink = (
    <Link
      href={href}
      aria-label={targetAria}
      className="block no-underline decoration-transparent outline-none hover:no-underline focus-visible:no-underline focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
    >
      <div
        className="relative h-[407px] w-[328px] overflow-hidden bg-[var(--color-bg)]"
        style={{ borderRadius: "7px", clipPath: "inset(0 round 7px)" }}
      >
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt=""
            width={328}
            height={407}
            priority={imagePriority}
            sizes="328px"
            unoptimized
            aria-hidden
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
  );

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
          aria-label={targetAria}
          className="inline-flex shrink-0 items-baseline justify-self-end text-[var(--color-link)] no-underline decoration-transparent transition-colors hover:text-[var(--color-link-hover)] hover:no-underline active:text-[var(--color-link-active)] focus-visible:text-[var(--color-link-hover)] focus-visible:no-underline"
          style={{ fontSize: "16px", lineHeight: "1.2" }}
        >
          {copy.cardVerVisible}
          {LINK_ARROW}
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
        <motion.div
          style={{ marginBottom: "24px", willChange: "opacity, filter, transform" }}
          {...getCardPartAnimation(FEATURED_CARD_META_DELAY, reduceMotion)}
        >
          {meta}
        </motion.div>
      ) : null}

      <motion.div
        style={{ willChange: "opacity, filter, transform" }}
        {...getCardPartAnimation(
          metaPosition === "above" ? FEATURED_CARD_COVER_DELAY : FEATURED_CARD_META_DELAY,
          reduceMotion,
        )}
      >
        {coverLink}
      </motion.div>

      {metaPosition === "below" ? (
        <motion.div
          style={{ marginTop: "32px", willChange: "opacity, filter, transform" }}
          {...getCardPartAnimation(FEATURED_CARD_COVER_DELAY, reduceMotion)}
        >
          {meta}
        </motion.div>
      ) : null}
    </article>
  );
}

function IntroTitle({ lang, headingId }: { lang: Locale; headingId?: string }) {
  const copy = COPY[lang];
  return headingId ? (
    <h2
      id={headingId}
      className="select-text font-normal text-[var(--color-text)]"
      style={{ fontSize: "20px", lineHeight: "1.2", userSelect: "text" }}
    >
      {copy.title}
    </h2>
  ) : (
    <h2
      className="select-text font-normal text-[var(--color-text)]"
      style={{ fontSize: "20px", lineHeight: "1.2", userSelect: "text" }}
    >
      {copy.title}
    </h2>
  );
}

function IntroCtaLink({ lang, className }: { lang: Locale; className?: string }) {
  const copy = COPY[lang];
  return (
    <Link
      href={projectsIndexHref(lang)}
      aria-label={copy.ctaAria}
      className={
        className ??
        "inline-flex items-center justify-center gap-0 text-[14px] leading-snug text-[var(--color-link)] no-underline decoration-transparent transition-colors hover:text-[var(--color-link-hover)] hover:no-underline active:text-[var(--color-link-active)] focus-visible:text-[var(--color-link-hover)] focus-visible:no-underline"
      }
    >
      {copy.cta}
      {LINK_ARROW}
    </Link>
  );
}

function FeaturedWorksIntro({
  lang,
  headingId,
  reduceMotion,
}: {
  lang: Locale;
  headingId?: string;
  reduceMotion: boolean;
}) {
  const titleReveal = getRevealAnimation(0.08, reduceMotion);
  const descriptionReveal = getRevealAnimation(0.16, reduceMotion);
  const ctaReveal = getRevealAnimation(0.24, reduceMotion);

  return (
    <header
      className="relative z-[20] max-w-none min-w-0 self-start"
      style={{
        gridColumn: "guide-1 / guide-3",
        gridRow: "1 / 4",
        display: "grid",
        gridTemplateColumns: "subgrid",
        pointerEvents: "auto",
      }}
    >
      <motion.div style={{ gridColumn: "1 / 3", willChange: "opacity, filter, transform" }} {...titleReveal}>
        <IntroTitle lang={lang} headingId={headingId} />
      </motion.div>
      <motion.div
        style={{ gridColumn: "1 / 3", marginTop: "24px", willChange: "opacity, filter, transform" }}
        {...descriptionReveal}
      >
        <HomeBrandUniverseLines lang={lang} />
      </motion.div>
      <motion.div
        className="relative z-[21] min-w-0"
        style={{
          gridColumn: "1 / 2",
          marginTop: "64px",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "auto",
          willChange: "opacity, filter, transform",
        }}
        {...ctaReveal}
      >
        <IntroCtaLink lang={lang} />
      </motion.div>
    </header>
  );
}

function FeaturedProjectSlot({
  card,
  slotIndex,
  initialDelay,
  reduceMotion,
  children,
}: {
  card: HomeFeaturedProjectCard | null;
  slotIndex: number;
  initialDelay: number;
  reduceMotion: boolean;
  children: (currentCard: HomeFeaturedProjectCard) => ReactNode;
}) {
  const revealAnimation = getRevealAnimation(initialDelay, reduceMotion);

  return (
    <motion.div
      style={{ willChange: "opacity, filter, transform" }}
      {...revealAnimation}
    >
      <AnimatePresence initial={false} mode="wait">
        {card ? (
          <motion.div
            key={card.slug}
            style={{ willChange: "opacity, transform" }}
            {...getSwapAnimation(slotIndex, reduceMotion)}
          >
            {children(card)}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HomeFeaturedWorksClient({ lang, projects }: Props) {
  const reduceMotion = useReducedMotion();
  const desktopProjectBatches = useMemo(() => chunkFeaturedProjects(projects), [projects]);
  const [activeBatchIndex, setActiveBatchIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || desktopProjectBatches.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveBatchIndex((currentIndex) => (currentIndex + 1) % desktopProjectBatches.length);
    }, FEATURED_ROTATION_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [desktopProjectBatches.length, reduceMotion]);

  const normalizedActiveBatchIndex =
    desktopProjectBatches.length > 0 ? activeBatchIndex % desktopProjectBatches.length : 0;
  const activeDesktopBatch =
    desktopProjectBatches[normalizedActiveBatchIndex] ?? projects.slice(0, FEATURED_BATCH_SIZE);
  const selectedProject = pickSingleFeaturedProject(activeDesktopBatch);
  const secondaryProject = pickSecondaryFeaturedProject(activeDesktopBatch);
  const tertiaryProject = pickTertiaryFeaturedProject(activeDesktopBatch);
  const mobileSelectedProject = pickSingleFeaturedProject(projects);

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
              <HomeBrandUniverseLines lang={lang} />
            </div>
            <div className="text-center" style={{ marginTop: "64px" }}>
              <IntroCtaLink lang={lang} />
            </div>
          </EditorialBlock>
          <EditorialBlock start="frame-start" end="frame-end">
            {mobileSelectedProject ? (
              <FeaturedProjectCard
                card={mobileSelectedProject}
                lang={lang}
                imagePriority
                reduceMotion={!!reduceMotion}
              />
            ) : null}
          </EditorialBlock>
        </EditorialShell>
      </section>

      <EditorialShell
        as="section"
        aria-labelledby={HEADING_ID_DESKTOP}
        className="hidden overflow-x-clip py-16 xl:py-24 md:grid"
        style={{ paddingBottom: `${STACKED_CARD_OFFSET}px` }}
      >
        <EditorialSubgrid
          start="frame-start"
          end="frame-end"
          className="items-start"
          style={{ isolation: "isolate" }}
        >
          <FeaturedWorksIntro
            lang={lang}
            headingId={HEADING_ID_DESKTOP}
            reduceMotion={!!reduceMotion}
          />

          <div
            className="pointer-events-none relative z-[1] min-w-0 self-start"
            style={{ gridColumn: "guide-1 / guide-3", gridRow: "1 / 4" }}
          >
            <div className="pointer-events-none flex justify-end">
              {tertiaryProject ? (
                <div className="pointer-events-auto w-fit">
                  <FeaturedProjectSlot
                    card={tertiaryProject}
                    slotIndex={0}
                    initialDelay={0.34}
                    reduceMotion={!!reduceMotion}
                  >
                    {(currentCard) => (
                      <FeaturedProjectCard
                        card={currentCard}
                        lang={lang}
                        metaPosition="above"
                        articleOffsetTop={STACKED_CARD_OFFSET}
                        reduceMotion={!!reduceMotion}
                      />
                    )}
                  </FeaturedProjectSlot>
                </div>
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
                  <FeaturedProjectSlot
                    card={selectedProject}
                    slotIndex={1}
                    initialDelay={0.42}
                    reduceMotion={!!reduceMotion}
                  >
                    {(currentCard) => (
                      <FeaturedProjectCard
                        card={currentCard}
                        lang={lang}
                        imagePriority={normalizedActiveBatchIndex === 0}
                        reduceMotion={!!reduceMotion}
                      />
                    )}
                  </FeaturedProjectSlot>
                ) : null}
              </div>

              <div className="min-w-0 justify-self-end">
                {secondaryProject ? (
                  <FeaturedProjectSlot
                    card={secondaryProject}
                    slotIndex={2}
                    initialDelay={0.5}
                    reduceMotion={!!reduceMotion}
                  >
                    {(currentCard) => (
                      <FeaturedProjectCard
                        card={currentCard}
                        lang={lang}
                        metaPosition="above"
                        articleOffsetTop={STACKED_CARD_OFFSET}
                        reduceMotion={!!reduceMotion}
                      />
                    )}
                  </FeaturedProjectSlot>
                ) : null}
              </div>
            </div>
          </div>
        </EditorialSubgrid>
      </EditorialShell>
    </div>
  );
}
