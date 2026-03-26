"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n/path";
import { withLang } from "@/lib/i18n/path";

type Props = {
  lang: Locale;
};

const COPY = {
  es: {
    title: "Pura creatividad aplicada a negocio",
    cta: "Ver todos los servicios",
    sectionAria: "Servicios destacados en órbita",
    services: [
      "Branding y Naming",
      "Consultoría y Estrategia",
      "Marketing y publicidad",
      "Diseño web y digital",
      "Aplicación de marca",
    ],
  },
  en: {
    title: "Pure creativity applied to business",
    cta: "See all services",
    sectionAria: "Orbiting featured services",
    services: [
      "Branding and Naming",
      "Strategy and Consulting",
      "Marketing and Advertising",
      "Web and Digital Design",
      "Brand Application",
    ],
  },
} satisfies Record<
  Locale,
  {
    title: string;
    cta: string;
    sectionAria: string;
    services: string[];
  }
>;

const SECTION_ID = "home-services-orbit-heading";
const LINK_ARROW = " →";
const ORBIT_DURATION_S = 112;
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const ORBIT_PATH = "ellipse(42% 32% at 50% 50%)";
const ORBIT_ITEMS = [
  { key: "branding", progress: 0.8 },
  { key: "strategy", progress: 0.0 },
  { key: "marketing", progress: 0.2 },
  { key: "web", progress: 0.6 },
  { key: "brand-application", progress: 0.4 },
] as const;

function servicesIndexHref(lang: Locale): string {
  return lang === "es" ? withLang("es", "servicios") : withLang("en", "services");
}

function OrbitingServiceLabel({
  label,
  startProgress,
  reduceMotion,
}: {
  label: string;
  startProgress: number;
  reduceMotion: boolean;
}) {
  const orbitTransition = {
    duration: ORBIT_DURATION_S,
    ease: "linear" as const,
    repeat: Infinity,
  };

  return (
    <motion.div
      className="absolute left-0 top-0 h-px w-px"
      style={{
        offsetPath: ORBIT_PATH,
        offsetRotate: "0deg",
        willChange: "offset-distance",
      }}
      initial={
        reduceMotion
          ? { offsetDistance: `${startProgress * 100}%` }
          : { offsetDistance: `${startProgress * 100}%` }
      }
      animate={
        reduceMotion
          ? undefined
          : { offsetDistance: `${(startProgress + 1) * 100}%` }
      }
      transition={reduceMotion ? undefined : { ...orbitTransition, repeatDelay: 0 }}
    >
      <span
        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-normal text-[var(--color-text)]"
        style={{ fontSize: "clamp(18px, 1.25vw, 32px)", lineHeight: "1.1" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function HomeServicesOrbit({ lang }: Props) {
  const copy = COPY[lang];
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby={SECTION_ID}
      aria-label={copy.sectionAria}
      className="relative isolate overflow-visible"
      style={{
        marginTop: "110px",
        minHeight: "max(78svh, 900px)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.58) 14%, rgba(255,255,255,0.86) 26%, #FFFFFF 40%, #FFFFFF 60%, rgba(255,255,255,0.86) 74%, rgba(255,255,255,0.58) 86%, rgba(255,255,255,0) 100%)",
      }}
    >
      <div
        className="relative mx-auto flex w-full items-center justify-center overflow-visible px-6"
        style={{ maxWidth: "100vw", minHeight: "max(78svh, 900px)" }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
          initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)" }}
          whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: REVEAL_EASE, delay: 0.12 }}
        >
          <motion.div
            className="relative overflow-visible"
            style={{
              width: "min(94vw, 1720px)",
              height: "clamp(420px, 54vh, 760px)",
            }}
          >
            {copy.services.map((service, index) => {
              const orbitItem = ORBIT_ITEMS[index];
              return (
                <OrbitingServiceLabel
                  key={orbitItem.key}
                  label={service}
                  startProgress={orbitItem.progress}
                  reduceMotion={!!reduceMotion}
                />
              );
            })}
          </motion.div>
        </motion.div>

        <div className="relative z-10 flex max-w-[760px] flex-col items-center justify-center text-center">
          <motion.h2
            id={SECTION_ID}
            className="font-normal text-[var(--color-text)]"
            style={{ fontSize: "32px", lineHeight: "1.08" }}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(6px)", y: 8 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, ease: REVEAL_EASE }}
          >
            {copy.title}
          </motion.h2>

          <motion.div
            style={{ marginTop: "12px" }}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(4px)", y: 6 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, ease: REVEAL_EASE, delay: 0.08 }}
          >
            <Link
              href={servicesIndexHref(lang)}
              className="inline-flex items-center justify-center gap-0 text-[var(--color-link)] no-underline decoration-transparent transition-colors hover:text-[var(--color-link-hover)] hover:no-underline active:text-[var(--color-link-active)] focus-visible:text-[var(--color-link-hover)] focus-visible:no-underline"
              style={{ fontSize: "16px", lineHeight: "1.2" }}
            >
              {copy.cta}
              {LINK_ARROW}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
