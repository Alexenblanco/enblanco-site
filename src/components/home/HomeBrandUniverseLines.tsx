import type { Locale } from "@/lib/i18n/path";

type Props = {
  lang: Locale;
  className?: string;
};

const TEXT_STYLE = { fontSize: "32px", lineHeight: "33px", userSelect: "text" } as const;

export default function HomeBrandUniverseLines({ lang, className }: Props) {
  if (lang === "es") {
    return (
      <p className={className ?? "select-text font-normal text-zinc-600"} style={TEXT_STYLE}>
        <span className="block">Mediante creatividad, estrategia y dirección</span>
        <span className="block">re-de-construimos el universo visual, verbal</span>
        <span className="block">y conceptual de marcas.</span>
      </p>
    );
  }

  return (
    <p className={className ?? "select-text font-normal text-zinc-600"} style={TEXT_STYLE}>
      <span className="block">Through creativity, strategy, and direction,</span>
      <span className="block">we re-de-construct the visual, verbal,</span>
      <span className="block">and conceptual universe of brands.</span>
    </p>
  );
}
