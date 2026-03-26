 "use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import EditorialShell, {
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
import type { Locale } from "@/lib/i18n/path";
import { withLang } from "@/lib/i18n/path";

type Props = {
  lang: Locale;
};

const COPY = {
  es: {
    ariaLabel: "Ir a contacto",
    trigger: "Cuéntanos",
    what: "qué",
    areYou: "estás",
    creating: "creando",
  },
  en: {
    ariaLabel: "Go to contact",
    trigger: "Tell us",
    what: "what",
    areYou: "you're",
    creating: "creating",
  },
} satisfies Record<
  Locale,
  {
    ariaLabel: string;
    trigger: string;
    what: string;
    areYou: string;
    creating: string;
  }
>;

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const REVEAL_DURATION = 0.36;
const REVEAL_STAGGER = 0.055;
const REVEAL_OFFSET_Y = 8;
const REVEAL_BLUR_PX = 5;

function getContactHref(lang: Locale) {
  return lang === "es" ? withLang("es", "contacto") : withLang("en", "contact");
}

function HiddenWord({
  children,
  gridColumn,
  gridRow,
  align,
  revealed,
  delay,
  reduceMotion,
}: {
  children: ReactNode;
  gridColumn: string;
  gridRow: string;
  align: "left" | "right";
  revealed: boolean;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none"
      initial={false}
      animate={
        reduceMotion
          ? { opacity: revealed ? 1 : 0, y: 0, filter: "blur(0px)" }
          : {
              opacity: revealed ? 1 : 0,
              y: revealed ? 0 : REVEAL_OFFSET_Y,
              filter: revealed ? "blur(0px)" : `blur(${REVEAL_BLUR_PX}px)`,
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: REVEAL_DURATION,
              ease: REVEAL_EASE,
              delay: revealed ? delay : 0,
            }
      }
      style={{
        gridColumn,
        gridRow,
        justifySelf: align === "left" ? "start" : "end",
        lineHeight: "0.96",
        color: "var(--color-text)",
        WebkitTextFillColor: "var(--color-text)",
      }}
    >
      {children}
    </motion.span>
  );
}

export default function HomeContactCtaSection({ lang }: Props) {
  const copy = COPY[lang];
  const href = getContactHref(lang);
  const [isRevealed, setIsRevealed] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section style={{ marginTop: "120px", marginBottom: "120px" }}>
      <EditorialShell className="py-0">
        <EditorialSubgrid
          start="frame-start"
          end="frame-end"
          style={{ minHeight: "clamp(140px, 18svh, 220px)", alignItems: "center" }}
        >
          <Link
            href={href}
            aria-label={copy.ariaLabel}
            className="mx-auto block text-center no-underline md:hidden"
            style={{
              fontSize: "clamp(36px, 9vw, 52px)",
              lineHeight: "0.96",
              color: "var(--color-text)",
              WebkitTextFillColor: "var(--color-text)",
              textDecoration: "none",
            }}
          >
            {copy.trigger}
          </Link>

          <Link
            href={href}
            aria-label={copy.ariaLabel}
            className="hidden no-underline outline-none focus-visible:no-underline md:grid"
            onFocus={() => setIsRevealed(true)}
            onBlur={() => setIsRevealed(false)}
            style={{
              gridColumn: "guide-1 / guide-6",
              display: "grid",
              gridTemplateColumns: "subgrid",
              gridTemplateRows: "auto auto",
              rowGap: "0.08em",
              alignSelf: "center",
              fontSize: "52px",
              lineHeight: "0.96",
              color: "var(--color-text)",
              WebkitTextFillColor: "var(--color-text)",
              textDecoration: "none",
            }}
          >
            <span
              className="w-fit"
              onMouseEnter={() => setIsRevealed(true)}
              onMouseLeave={() => setIsRevealed(false)}
              style={{
                gridColumn: "guide-2 / guide-3",
                gridRow: "1",
                justifySelf: "start",
                lineHeight: "0.96",
                color: "var(--color-text)",
                WebkitTextFillColor: "var(--color-text)",
              }}
            >
              {copy.trigger}
            </span>

            <HiddenWord
              gridColumn="guide-4 / guide-5"
              gridRow="1"
              align="left"
              revealed={isRevealed}
              delay={REVEAL_STAGGER}
              reduceMotion={!!reduceMotion}
            >
              {copy.what}
            </HiddenWord>

            <HiddenWord
              gridColumn="guide-2 / guide-3"
              gridRow="2"
              align="right"
              revealed={isRevealed}
              delay={REVEAL_STAGGER * 2}
              reduceMotion={!!reduceMotion}
            >
              {copy.areYou}
            </HiddenWord>

            <HiddenWord
              gridColumn="guide-4 / guide-5"
              gridRow="2"
              align="left"
              revealed={isRevealed}
              delay={REVEAL_STAGGER * 3}
              reduceMotion={!!reduceMotion}
            >
              {copy.creating}
            </HiddenWord>
          </Link>
        </EditorialSubgrid>
      </EditorialShell>
    </section>
  );
}
