"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { CSSProperties, RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import EditorialShell, { EditorialBlock, EditorialSubgrid } from "@/components/layout/EditorialShell";
import type { Locale } from "@/lib/i18n/path";
import HomeBrandUniverseLines from "./HomeBrandUniverseLines";

type Props = {
  lang: Locale;
};

const COPY = {
  es: {
    title: "Nuestro enfoque",
    cards: [
      {
        title: "Pensar antes de diseñar",
        body: "Las decisiones visuales tienen más fuerza cuando nacen de una estrategia y no de una ocurrencia.",
      },
      {
        title: "Unir estética y negocio",
        body: "La marca debe emocionar, sí, pero también sostener objetivos reales de posicionamiento, percepción y crecimiento.",
      },
      {
        title: "Construir sistemas",
        body: "Buscamos identidades y lenguajes que puedan mantenerse con coherencia en web, campañas, contenido, packaging y tiempo.",
      },
    ],
  },
  en: {
    title: "Our approach",
    cards: [
      {
        title: "Think before designing",
        body: "Visual decisions are stronger when they come from strategy rather than from a passing idea.",
      },
      {
        title: "Bring aesthetics and business together",
        body: "A brand should move people, yes, but it should also support real goals of positioning, perception, and growth.",
      },
      {
        title: "Build systems",
        body: "We look for identities and languages that can remain coherent across web, campaigns, content, packaging, and time.",
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    title: string;
    cards: Array<{ title: string; body: string }>;
  }
>;

const SECTION_ID = "home-approach-heading";
const BLOCK_GAP = 48;
const INITIAL_OFFSET_Y = 120;
const BLOCK_2_START = 0.18;
const BLOCK_2_END = 0.5;
const BLOCK_3_START = 0.56;
const BLOCK_3_END = 0.92;
const SCENE_BOTTOM_PADDING = 24;
const DESKTOP_STICKY_PADDING_TOP = 24;
const DEFAULT_CARD_HEIGHTS = [128, 152, 140] as const;

function ApproachCard({
  title,
  body,
  style,
}: {
  title: string;
  body: string;
  style?: CSSProperties;
}) {
  return (
    <div style={style}>
      <h3 className="font-normal text-[var(--color-text)]" style={{ fontSize: "24px", lineHeight: "1.08" }}>
        {title}
      </h3>
      <p
        className="font-normal text-[var(--color-text)]"
        style={{ marginTop: "14px", fontSize: "16px", lineHeight: "1.2", maxWidth: "33rem" }}
      >
        {body}
      </p>
    </div>
  );
}

function useMeasuredHeights(refs: Array<RefObject<HTMLDivElement | null>>) {
  const [heights, setHeights] = useState<number[]>([...DEFAULT_CARD_HEIGHTS]);

  useEffect(() => {
    const updateHeights = () => {
      const next = refs.map((ref, index) => ref.current?.offsetHeight ?? DEFAULT_CARD_HEIGHTS[index]);
      setHeights((current) =>
        current.every((value, index) => value === next[index]) ? current : next,
      );
    };

    updateHeights();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(updateHeights);
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [refs]);

  return heights;
}

export default function HomeApproachSection({ lang }: Props) {
  const copy = COPY[lang];
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const cardRefs = useMemo(() => [card1Ref, card2Ref, card3Ref], []);
  const heights = useMeasuredHeights(cardRefs);

  const stackHeight = heights[0] + heights[1] + heights[2] + BLOCK_GAP * 2;
  const card2Top = heights[0] + BLOCK_GAP;
  const card3Top = heights[0] + heights[1] + BLOCK_GAP * 2;
  const card2Travel = stackHeight - card2Top + INITIAL_OFFSET_Y;
  const card3Travel = stackHeight - card3Top + INITIAL_OFFSET_Y;
  const sceneTravel = Math.max(card2Travel, card3Travel) + SCENE_BOTTOM_PADDING;
  const desktopSceneHeight = reduceMotion
    ? "auto"
    : `calc(100svh + ${Math.round(sceneTravel)}px)`;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const card2Y = useTransform(
    scrollYProgress,
    [BLOCK_2_START, BLOCK_2_END],
    reduceMotion ? [0, 0] : [card2Travel, 0],
  );
  const card3Y = useTransform(
    scrollYProgress,
    [BLOCK_3_START, BLOCK_3_END],
    reduceMotion ? [0, 0] : [card3Travel, 0],
  );
  const card2Opacity = useTransform(
    scrollYProgress,
    [BLOCK_2_START, BLOCK_2_END],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const card3Opacity = useTransform(
    scrollYProgress,
    [BLOCK_3_START, BLOCK_3_END],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const card2Blur = useTransform(
    scrollYProgress,
    [BLOCK_2_START, BLOCK_2_END],
    reduceMotion ? [0, 0] : [6, 0],
  );
  const card3Blur = useTransform(
    scrollYProgress,
    [BLOCK_3_START, BLOCK_3_END],
    reduceMotion ? [0, 0] : [6, 0],
  );
  const card2Filter = useMotionTemplate`blur(${card2Blur}px)`;
  const card3Filter = useMotionTemplate`blur(${card3Blur}px)`;

  return (
    <section aria-labelledby={SECTION_ID} style={{ marginTop: "110px" }}>
      <EditorialShell className="py-0">
        <EditorialBlock
          start="frame-start"
          end="frame-end"
          className="md:hidden"
          style={{ minHeight: "auto" }}
        >
          <h2
            id={SECTION_ID}
            className="font-normal text-[var(--color-text)]"
            style={{ fontSize: "20px", lineHeight: "1.2" }}
          >
            {copy.title}
          </h2>
          <div style={{ marginTop: "24px" }}>
            <HomeBrandUniverseLines lang={lang} />
          </div>
          <div className="flex flex-col" style={{ marginTop: "72px", gap: "40px" }}>
            {copy.cards.map((card) => (
              <ApproachCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </EditorialBlock>
      </EditorialShell>

      <div
        ref={sceneRef}
        className="hidden md:block"
        style={{ position: "relative", height: desktopSceneHeight }}
      >
        <div
          style={{
            position: reduceMotion ? "relative" : "sticky",
            top: 0,
            height: "100svh",
            overflow: "hidden",
          }}
        >
          <EditorialShell className="h-full py-0" style={{ height: "100%" }}>
            <EditorialSubgrid
              start="frame-start"
              end="frame-end"
              className="items-start"
              style={{ height: "100%", paddingTop: `${DESKTOP_STICKY_PADDING_TOP}px` }}
            >
              <div
                style={{
                  gridColumn: "guide-1 / guide-4",
                  alignSelf: "start",
                }}
              >
                <h2
                  id={SECTION_ID}
                  className="font-normal text-[var(--color-text)]"
                  style={{ fontSize: "20px", lineHeight: "1.2" }}
                >
                  {copy.title}
                </h2>
                <div style={{ marginTop: "24px" }}>
                  <HomeBrandUniverseLines lang={lang} />
                </div>
              </div>

              <div
                style={{
                  gridColumn: "guide-4 / guide-6",
                  alignSelf: "start",
                  position: "relative",
                  height: `${stackHeight}px`,
                  width: "100%",
                  maxWidth: "36rem",
                  overflow: "hidden",
                }}
              >
                <div ref={card1Ref} style={{ position: "absolute", insetInline: 0, top: 0 }}>
                  <ApproachCard title={copy.cards[0].title} body={copy.cards[0].body} />
                </div>

                <motion.div
                  ref={card2Ref}
                  style={{
                    position: "absolute",
                    insetInline: 0,
                    top: card2Top,
                    y: card2Y,
                    opacity: card2Opacity,
                    filter: card2Filter,
                  }}
                >
                  <ApproachCard title={copy.cards[1].title} body={copy.cards[1].body} />
                </motion.div>

                <motion.div
                  ref={card3Ref}
                  style={{
                    position: "absolute",
                    insetInline: 0,
                    top: card3Top,
                    y: card3Y,
                    opacity: card3Opacity,
                    filter: card3Filter,
                  }}
                >
                  <ApproachCard title={copy.cards[2].title} body={copy.cards[2].body} />
                </motion.div>
              </div>
            </EditorialSubgrid>
          </EditorialShell>
        </div>
      </div>
    </section>
  );
}
