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
          className="relative overflow-hidden pb-0 pt-0"
          style={{ minHeight: "clamp(460px, 44vw, 670px)" }}
        >
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

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: "min(100vw, 1728px)",
              height: "670px",
              background: "#FFFFFF",
              filter: "blur(50px)",
              opacity: 0.92,
            }}
          />

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
            className="relative z-10 md:pl-24"
            style={{
              paddingTop: "clamp(220px, 21vw, 360px)",
              paddingBottom: "clamp(84px, 8vw, 146px)",
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
              key={capability.number}
              capability={capability}
              eyebrow={content.capabilitiesEyebrow}
              showEyebrow={index === 0}
              isLast={index === content.capabilities.length - 1}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </EditorialShell>
      </section>

      <ServicesFaqPills questions={content.questions} reduceMotion={!!reduceMotion} />
      <HomeContactCtaSection lang={lang} />
    </main>
  );
}
