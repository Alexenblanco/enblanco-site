import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
import type { Locale } from "@/lib/i18n/path";
import HomeBrandUniverseLines from "./HomeBrandUniverseLines";

type Props = {
  lang: Locale;
};

const COPY = {
  es: {
    title: "Nuestro enfoque",
  },
  en: {
    title: "Our approach",
  },
} satisfies Record<Locale, { title: string }>;

const SECTION_ID = "home-approach-heading";

export default function HomeApproachSection({ lang }: Props) {
  const copy = COPY[lang];

  return (
    <section
      aria-labelledby={SECTION_ID}
      style={{ marginTop: "110px", minHeight: "88svh" }}
    >
      <EditorialShell className="py-0">
        <EditorialBlock
          start="frame-start"
          end="frame-end"
          className="md:hidden"
          style={{ minHeight: "88svh" }}
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
        </EditorialBlock>
      </EditorialShell>

      <EditorialShell className="hidden py-0 md:grid" style={{ minHeight: "88svh" }}>
        <EditorialSubgrid start="frame-start" end="frame-end">
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
        </EditorialSubgrid>
      </EditorialShell>
    </section>
  );
}
