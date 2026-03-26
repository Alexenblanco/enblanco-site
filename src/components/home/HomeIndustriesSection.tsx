"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
import { objectSansThin } from "@/app/fonts";
import { AREA_META_EN, AREA_META_ES } from "@/data/areas-meta";
import type { EnAreaSlug, EsAreaSlug } from "@/lib/areas-slugs";
import { EN_AREA_SLUGS, ES_AREA_SLUGS } from "@/lib/areas-slugs";
import type { Locale } from "@/lib/i18n/path";
import { withLang } from "@/lib/i18n/path";
import { useMemo, useState } from "react";

type Props = {
  lang: Locale;
};

const COPY = {
  es: {
    title: "Industrias",
    intro:
      "Nuestro portfolio recoge proyectos destacados en distintos sectores, pero en enblanco trabajamos con marcas de ámbitos muy diversos a través de servicios de branding, comunicación y digital.",
  },
  en: {
    title: "Industries",
    intro:
      "Our portfolio includes selected work across different sectors, but at enblanco we work with brands from very diverse fields through branding, communication, and digital services.",
  },
} satisfies Record<Locale, { title: string; intro: string }>;

const HOVER_VIDEO_BY_SLUG: {
  es: Partial<Record<EsAreaSlug, string>>;
  en: Partial<Record<EnAreaSlug, string>>;
} = {
  es: {
    industria: "/home/industry-hover.mp4",
    alimentacion: "/home/food-hover.mp4",
  },
  en: {
    industry: "/home/industry-hover.mp4",
    food: "/home/food-hover.mp4",
  },
};

const LIST_ITEM_GAP = "28px";
const BRACKET_GAP_IDLE = "0.55em";
const BRACKET_GAP_HOVER = "1.35em";
const SECTION_ID = "home-industries-heading";
const LINK_TEXT_COLOR = "var(--color-text)";
const BRACKET_COLOR = "#FFFFFF";
const PREVIEW_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

function capitalizeFirst(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getIndustryEntries(lang: Locale) {
  if (lang === "es") {
    return ES_AREA_SLUGS.map((slug) => ({
      slug,
      label: capitalizeFirst(AREA_META_ES[slug].title),
      href: withLang("es", `areas/${slug}`),
      videoSrc: HOVER_VIDEO_BY_SLUG.es[slug],
    }));
  }

  return EN_AREA_SLUGS.map((slug) => ({
    slug,
    label: capitalizeFirst(AREA_META_EN[slug].title),
    href: withLang("en", `areas/${slug}`),
    videoSrc: HOVER_VIDEO_BY_SLUG.en[slug],
  }));
}

function BracketGlyph({
  glyph,
  size,
  className,
}: {
  glyph: "[" | "]";
  size: number;
  className: string;
}) {
  const width = Math.max(18, Math.round(size * 0.34));
  const height = Math.max(28, Math.round(size * 1.16));

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-flex",
        width: `${width}px`,
        height: `${height}px`,
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible", display: "block" }}
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill={BRACKET_COLOR}
          stroke={BRACKET_COLOR}
          strokeWidth="0.7"
          paintOrder="stroke fill"
          style={{
            fontFamily: objectSansThin.style.fontFamily,
            fontSize: `${size}px`,
            fontWeight: 400,
          }}
        >
          {glyph}
        </text>
      </svg>
    </span>
  );
}

function IndustriesList({
  lang,
  activeSlug,
  setActiveSlug,
}: {
  lang: Locale;
  activeSlug: string | null;
  setActiveSlug: (slug: string | null) => void;
}) {
  const items = useMemo(() => getIndustryEntries(lang), [lang]);

  return (
    <div className="flex flex-col items-start" style={{ gap: LIST_ITEM_GAP }}>
      {items.map((item) => {
        const isActive = activeSlug === item.slug;

        return (
          <div
            key={item.slug}
            className="inline-flex items-center"
            onMouseEnter={() => setActiveSlug(item.videoSrc ? item.slug : null)}
            onMouseLeave={() => setActiveSlug(null)}
            onFocusCapture={() => setActiveSlug(item.videoSrc ? item.slug : null)}
            onBlurCapture={() => setActiveSlug(null)}
          >
            <BracketGlyph
              glyph="["
              size={32}
              className="home-industries-bracket"
            />
            <span
              aria-hidden="true"
              style={{
                marginRight: isActive ? BRACKET_GAP_HOVER : BRACKET_GAP_IDLE,
                transition: "margin 180ms ease",
              }}
            />
            <Link
              href={item.href}
              className="home-industries-link no-underline"
              style={{ fontSize: "32px", lineHeight: "1.08", textDecoration: "none" }}
            >
              <span
                className="home-industries-link-text"
                style={{
                  color: LINK_TEXT_COLOR,
                  WebkitTextFillColor: LINK_TEXT_COLOR,
                  textDecoration: "none",
                }}
              >
                {item.label}
              </span>
            </Link>
            <span
              aria-hidden="true"
              style={{
                marginLeft: isActive ? BRACKET_GAP_HOVER : BRACKET_GAP_IDLE,
                transition: "margin 180ms ease",
              }}
            />
            <BracketGlyph
              glyph="]"
              size={32}
              className="home-industries-bracket"
            />
          </div>
        );
      })}
    </div>
  );
}

function HoverIndustryPreview({
  lang,
  activeSlug,
}: {
  lang: Locale;
  activeSlug: string | null;
}) {
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => getIndustryEntries(lang), [lang]);
  const activeItem = items.find((item) => item.slug === activeSlug);
  const activeVideoSrc = activeItem?.videoSrc ?? null;

  return (
    <div
      className="relative self-center"
      style={{
        gridColumn: "guide-4 / guide-5",
        minHeight: "420px",
      }}
    >
      {activeVideoSrc ? (
        <div
          className="absolute inset-0"
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(260px, 1fr) auto",
            alignItems: "center",
            columnGap: "20px",
          }}
        >
          <motion.span
            style={{ justifySelf: "start" }}
            initial={reduceMotion ? false : { opacity: 0, x: -12, scale: 1.04 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -6, scale: 1.01 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.34, ease: PREVIEW_REVEAL_EASE, delay: 0.03 }
            }
          >
            <BracketGlyph glyph="[" size={110} className="home-industries-preview-bracket" />
          </motion.span>

          <div
            className="pointer-events-none relative flex min-h-[320px] items-center justify-center"
            style={{
              width: "100%",
              justifySelf: "center",
              background: "transparent",
              mixBlendMode: "darken",
            }}
          >
            <video
              key={activeVideoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="block h-[320px] w-auto max-w-full object-contain"
              style={{
                display: "block",
                background: "transparent",
              }}
            >
              <source src={activeVideoSrc} type="video/mp4" />
            </video>
          </div>

          <motion.span
            style={{ justifySelf: "end" }}
            initial={reduceMotion ? false : { opacity: 0, x: 12, scale: 1.04 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: 6, scale: 1.01 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.34, ease: PREVIEW_REVEAL_EASE, delay: 0.03 }
            }
          >
            <BracketGlyph glyph="]" size={110} className="home-industries-preview-bracket" />
          </motion.span>
        </div>
      ) : null}
    </div>
  );
}

export default function HomeIndustriesSection({ lang }: Props) {
  const copy = COPY[lang];
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section aria-labelledby={SECTION_ID} style={{ marginTop: "140px" }}>
      <EditorialShell className="py-0">
        <EditorialBlock start="frame-start" end="frame-end" className="md:hidden">
          <h2
            id={SECTION_ID}
            className="font-normal text-[var(--color-text)]"
            style={{ fontSize: "20px", lineHeight: "1.2" }}
          >
            {copy.title}
          </h2>
          <p
            className="font-normal text-[var(--color-text)]"
            style={{ marginTop: "48px", fontSize: "16px", lineHeight: "1.2", maxWidth: "16rem" }}
          >
            {copy.intro}
          </p>
          <div style={{ marginTop: "48px" }}>
            <IndustriesList lang={lang} activeSlug={activeSlug} setActiveSlug={setActiveSlug} />
          </div>
        </EditorialBlock>
      </EditorialShell>

      <EditorialShell className="hidden py-0 md:grid">
        <EditorialSubgrid
          start="frame-start"
          end="frame-end"
          className="items-start"
          style={{ minHeight: "620px" }}
        >
          <div style={{ gridColumn: "guide-1 / guide-2" }}>
            <h2
              id={SECTION_ID}
              className="font-normal text-[var(--color-text)]"
              style={{ fontSize: "20px", lineHeight: "1.2" }}
            >
              {copy.title}
            </h2>
            <p
              className="font-normal text-[var(--color-text)]"
              style={{ marginTop: "48px", fontSize: "16px", lineHeight: "1.2", maxWidth: "16rem" }}
            >
              {copy.intro}
            </p>
          </div>

          <div style={{ gridColumn: "guide-2 / guide-4", alignSelf: "start" }}>
            <IndustriesList lang={lang} activeSlug={activeSlug} setActiveSlug={setActiveSlug} />
          </div>

          <HoverIndustryPreview lang={lang} activeSlug={activeSlug} />
        </EditorialSubgrid>
      </EditorialShell>
    </section>
  );
}
