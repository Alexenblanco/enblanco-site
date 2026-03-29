"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import HomeContactCtaSection from "@/components/home/HomeContactCtaSection";
import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
import type { Locale } from "@/lib/i18n/path";
import { withLang } from "@/lib/i18n/path";
import { getServicesIndexContent } from "@/data/services-index-content";
import ServiceCapabilityRow from "./ServiceCapabilityRow";
import ServicesFaqPills from "./ServicesFaqPills";

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const HERO_STAGE_HEIGHT = "60svh";
const HERO_STAGE_MIN_HEIGHT = "560px";
const HERO_COPY_BOTTOM_OFFSET = "48px";
const HERO_FADE_HEIGHT = "240px";

type ServicesIndexViewProps = {
  lang: Locale;
};

export default function ServicesIndexView({ lang }: ServicesIndexViewProps) {
  const content = getServicesIndexContent(lang);
  const reduceMotion = useReducedMotion();
  const currentPageLabel = lang === "es" ? "servicios" : "services";

  return (
    <main>
      <h1 className="sr-only">{lang === "es" ? "servicios" : "services"}</h1>

      <section aria-label={lang === "es" ? "Introducción de servicios" : "Services introduction"}>
        <EditorialShell
          className="relative overflow-visible pb-0 pt-0"
          style={{ minHeight: `max(${HERO_STAGE_HEIGHT}, ${HERO_STAGE_MIN_HEIGHT})` }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{
              height: `max(${HERO_STAGE_HEIGHT}, ${HERO_STAGE_MIN_HEIGHT})`,
              background: "#FFFFFF",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2"
            style={{
              top: `calc(max(${HERO_STAGE_HEIGHT}, ${HERO_STAGE_MIN_HEIGHT}) - 24px)`,
              width: "140vw",
              height: HERO_FADE_HEIGHT,
              background: "#FFFFFF",
              borderRadius: "9999px",
              filter: "blur(78px)",
              opacity: 0.95,
            }}
          />

          <EditorialBlock
            start="frame-start"
            end="frame-end"
            className="relative z-10 grid grid-cols-3 items-start pt-6 text-[14px] leading-[1.2] md:hidden"
          >
            <Link
              href={withLang(lang, "")}
              className="justify-self-start no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-link-hover)]"
            >
              home
            </Link>
            <span className="justify-self-center !text-[var(--color-text)]">
              {currentPageLabel}
            </span>
            <span className="justify-self-end !text-[var(--color-text)]">
              enblanco
            </span>
          </EditorialBlock>

          <EditorialSubgrid
            start="frame-start"
            end="frame-end"
            className="relative z-10 hidden items-start pt-6 text-[14px] leading-[1.2] md:grid"
          >
            <Link
              href={withLang(lang, "")}
              className="no-underline !text-[var(--color-text)] transition-colors hover:!text-[var(--color-link-hover)]"
              style={{ gridColumn: "guide-1 / guide-2" }}
            >
              home
            </Link>
            <span
              className="!text-[var(--color-text)]"
              style={{ gridColumn: "guide-4 / guide-5" }}
            >
              {currentPageLabel}
            </span>
            <span
              className="justify-self-end !text-[var(--color-text)]"
              style={{ gridColumn: "guide-5 / guide-6" }}
            >
              enblanco
            </span>
          </EditorialSubgrid>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: "min(var(--editorial-frame-width), 1664px)",
              aspectRatio: "99.4 / 18.3",
              backgroundColor: "#F9F9F9",
              maskImage: 'url("/logo-enblanco.svg")',
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
              WebkitMaskImage: 'url("/logo-enblanco.svg")',
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              WebkitMaskSize: "contain",
            }}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: REVEAL_EASE, delay: 0.08 }}
          />

          <EditorialBlock
            start="frame-start"
            end="guide-3"
            className="relative z-10 flex items-end md:pl-24"
            style={{
              minHeight: `max(${HERO_STAGE_HEIGHT}, ${HERO_STAGE_MIN_HEIGHT})`,
              paddingBottom: HERO_COPY_BOTTOM_OFFSET,
            }}
          >
            <motion.p
              className="max-w-[646px] font-normal text-[var(--color-text)]"
              style={{ fontSize: "clamp(24px, 2.25vw, 32px)", lineHeight: "1.03" }}
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.72, ease: REVEAL_EASE, delay: 0.16 }}
            >
              {content.heroIntro}
            </motion.p>
          </EditorialBlock>
        </EditorialShell>
      </section>

      <section
        aria-labelledby="services-capabilities-heading"
        style={{ marginTop: "clamp(40px, 7vw, 128px)" }}
      >
        <h2 id="services-capabilities-heading" className="sr-only">
          {lang === "es" ? "Capacidades y servicios" : "Capabilities and services"}
        </h2>

        <EditorialShell className="py-0">
          {content.capabilities.map((capability, index) => (
            <ServiceCapabilityRow
              key={`mobile-${capability.number}`}
              capability={capability}
              eyebrow={content.capabilitiesEyebrow}
              showEyebrow={index === 0}
              isLast={index === content.capabilities.length - 1}
              reduceMotion={!!reduceMotion}
              renderDesktop={false}
            />
          ))}

          <EditorialSubgrid
            start="frame-start"
            end="frame-end"
            className="hidden items-start md:grid"
          >
            <div
              style={{
                gridColumn: "frame-start / guide-2",
                position: "sticky",
                top: "24px",
                alignSelf: "start",
              }}
            >
              <p
                className="font-normal text-[var(--color-text)]"
                style={{ fontSize: "20px", lineHeight: "1.1" }}
              >
                {content.capabilitiesEyebrow}
              </p>
            </div>

            <div style={{ gridColumn: "frame-start / frame-end" }} />
          </EditorialSubgrid>

          {content.capabilities.map((capability, index) => (
            <ServiceCapabilityRow
              key={`desktop-${capability.number}`}
              capability={capability}
              isLast={index === content.capabilities.length - 1}
              reduceMotion={!!reduceMotion}
              renderMobile={false}
            />
          ))}
        </EditorialShell>
      </section>

      <ServicesFaqPills questions={content.questions} reduceMotion={!!reduceMotion} />
      <HomeContactCtaSection lang={lang} />
    </main>
  );
}
