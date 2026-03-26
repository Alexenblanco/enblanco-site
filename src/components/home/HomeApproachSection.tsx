"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
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
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const sceneHeight = "240svh";
const blockGap = 48;
const initialOffsetY = 128;
const block2Start = 0.18;
const block2End = 0.42;
const block3Start = 0.5;
const block3End = 0.76;
const DEFAULT_CARD_HEIGHTS = [128, 152, 140] as const;

function ApproachCard({
  title,
  body,
  className = "",
  style,
}: {
  title: string;
  body: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const heights = useMeasuredHeights([card1Ref, card2Ref, card3Ref]);
  const totalStackHeight = heights[0] + heights[1] + heights[2] + blockGap * 2;
  const card2FinalTop = heights[0] + blockGap;
  const card3FinalTop = heights[0] + heights[1] + blockGap * 2;
  const hiddenStartTop = totalStackHeight + initialOffsetY;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const card2Top = useTransform(
    scrollYProgress,
    [block2Start, block2End],
    reduceMotion ? [card2FinalTop, card2FinalTop] : [hiddenStartTop, card2FinalTop],
  );
  const card3Top = useTransform(
    scrollYProgress,
    [block3Start, block3End],
    reduceMotion ? [card3FinalTop, card3FinalTop] : [hiddenStartTop, card3FinalTop],
  );
  const card2Opacity = useTransform(
    scrollYProgress,
    [block2Start, block2End],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const card3Opacity = useTransform(
    scrollYProgress,
    [block3Start, block3End],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const card2BlurValue = useTransform(
    scrollYProgress,
    [block2Start, block2End],
    reduceMotion ? [0, 0] : [5, 0],
  );
  const card3BlurValue = useTransform(
    scrollYProgress,
    [block3Start, block3End],
    reduceMotion ? [0, 0] : [5, 0],
  );
  const card2Filter = useMotionTemplate`blur(${card2BlurValue}px)`;
  const card3Filter = useMotionTemplate`blur(${card3BlurValue}px)`;

  return (
    <section
      ref={sectionRef}
      aria-labelledby={SECTION_ID}
      style={{ marginTop: "110px", minHeight: reduceMotion ? "auto" : sceneHeight }}
    >
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

      <EditorialShell className="hidden py-0 md:grid" style={{ minHeight: reduceMotion ? "auto" : sceneHeight }}>
        <EditorialSubgrid
          start="frame-start"
          end="frame-end"
          style={{
            minHeight: "100svh",
            alignItems: "center",
            position: reduceMotion ? "relative" : "sticky",
            top: 0,
          }}
        >
          <motion.div
            style={{
              gridColumn: "guide-1 / guide-4",
              alignSelf: "center",
            }}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(6px)", y: 8 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: REVEAL_EASE }}
          >
            <h2
              id={SECTION_ID}
              className="font-normal text-[var(--color-text)]"
              style={{ fontSize: "20px", lineHeight: "1.2" }}
            >
              {copy.title}
            </h2>
            <motion.div
              style={{ marginTop: "24px" }}
              initial={reduceMotion ? false : { opacity: 0, filter: "blur(6px)", y: 8 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.78, ease: REVEAL_EASE, delay: 0.06 }}
            >
              <HomeBrandUniverseLines lang={lang} />
            </motion.div>
          </motion.div>

          <div
            style={{
              gridColumn: "guide-4 / guide-6",
              alignSelf: "center",
              width: "100%",
              maxWidth: "36rem",
              height: `${totalStackHeight}px`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div ref={card1Ref} style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
              <ApproachCard title={copy.cards[0].title} body={copy.cards[0].body} />
            </div>

            <motion.div
              ref={card2Ref}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: card2Top,
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
                left: 0,
                right: 0,
                top: card3Top,
                opacity: card3Opacity,
                filter: card3Filter,
              }}
            >
              <ApproachCard title={copy.cards[2].title} body={copy.cards[2].body} />
            </motion.div>
          </div>
        </EditorialSubgrid>
      </EditorialShell>
    </section>
  );
}
