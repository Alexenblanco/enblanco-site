import Link from "next/link";
import {
  getOtherNotes,
  type NoteItem,
} from "@/data/notes-index";
import { withLang, type Locale } from "@/lib/i18n/path";
import NoteDetailReveal from "./NoteDetailReveal";
import RandomNoteLink from "./RandomNoteLink";
import styles from "./NoteDetailView.module.css";

type NoteDetailViewProps = {
  lang: Locale;
  note: NoteItem;
  previousNote: NoteItem | null;
  nextNote: NoteItem | null;
};

const COPY = {
  es: {
    backToList: "volver al listado",
    navigation: "navegación entre notas",
    previous: "nota anterior",
    next: "siguiente nota",
    random: "nota aleatoria",
    searching: "buscando...",
    emptyBody: "Contenido de la nota pendiente de publicar.",
  },
  en: {
    backToList: "back to list",
    navigation: "note navigation",
    previous: "previous note",
    next: "next note",
    random: "random note",
    searching: "searching...",
    emptyBody: "Note content pending publication.",
  },
} as const;

export default function NoteDetailView({
  lang,
  note,
  previousNote,
  nextNote,
}: NoteDetailViewProps) {
  const copy = COPY[lang];
  const noteBasePath = lang === "es" ? "notas" : "notes";
  const listHref = withLang(lang, noteBasePath);
  const randomNoteHrefs = getOtherNotes(lang, note.slug).map((item) =>
    withLang(lang, `${noteBasePath}/${item.slug}`)
  );
  const bodyParagraphs =
    note.body && note.body.length > 0
      ? note.body
      : note.description
        ? [note.description]
        : [copy.emptyBody];

  return (
    <article className={styles.page}>
      <NoteDetailReveal className={styles.topBlock} delay={0.08}>
        <div className={styles.topNavRow}>
          <Link href={listHref} className={`${styles.navLink} ${styles.backLink}`}>
            {copy.backToList}
          </Link>
          <nav className={styles.navTop} aria-label={copy.navigation}>
            <div className={styles.navCell}>
              <div className={styles.navTopInner}>
                {previousNote ? (
                  <Link
                    href={withLang(lang, `${noteBasePath}/${previousNote.slug}`)}
                    className={styles.navLink}
                    aria-label={`${copy.previous}: ${previousNote.title}`}
                  >
                    {copy.previous}
                  </Link>
                ) : (
                  <span className={styles.navPlaceholder} aria-hidden>
                    {copy.previous}
                  </span>
                )}
                {nextNote ? (
                  <Link
                    href={withLang(lang, `${noteBasePath}/${nextNote.slug}`)}
                    className={`${styles.navLink} ${styles.navLinkEnd}`}
                    aria-label={`${copy.next}: ${nextNote.title}`}
                  >
                    {copy.next}
                  </Link>
                ) : (
                  <span className={`${styles.navPlaceholder} ${styles.navLinkEnd}`} aria-hidden>
                    {copy.next}
                  </span>
                )}
              </div>
            </div>
          </nav>
          <RandomNoteLink
            hrefs={randomNoteHrefs}
            label={copy.random}
            searchingLabel={copy.searching}
            ariaLabel={copy.random}
            className={`${styles.navLink} ${styles.navButton} ${styles.randomLink}`}
          />
        </div>
      </NoteDetailReveal>

      <div className={styles.middleBlock}>
        <NoteDetailReveal className={styles.ruleMetaRow} delay={0.08}>
          <p className={`${styles.meta} ${styles.indexMeta}`} data-note-detail-index>
            [ {note.index} ]
          </p>
          <p className={`${styles.meta} ${styles.typeMeta}`} data-note-detail-type>
            {note.type}
          </p>
        </NoteDetailReveal>
        <div className={styles.contentGrid}>
          <NoteDetailReveal className={styles.titleColumn} delay={0.08}>
            <h1 className={styles.title} data-note-detail-title>
              {note.title}
            </h1>
          </NoteDetailReveal>

          <section className={styles.bodyColumn} aria-label={lang === "es" ? "contenido de la nota" : "note content"}>
            <div className={styles.bodyCard} data-note-detail-card>
              <NoteDetailReveal className={styles.bodyInner} delay={0.08}>
                {bodyParagraphs.map((paragraph, index) => (
                  <p key={`${note.slug}-paragraph-${index}`} className={styles.bodyText}>
                    {paragraph}
                  </p>
                ))}
              </NoteDetailReveal>
            </div>
          </section>

          <NoteDetailReveal className={styles.metaColumn} delay={0.08}>
            <p className={styles.meta}>
              <time dateTime={note.date}>{note.displayDate}</time>
            </p>
            <p className={styles.meta}>{note.author}</p>
          </NoteDetailReveal>
        </div>
      </div>

      <NoteDetailReveal className={styles.ruleBottom} delay={0.08} aria-hidden />

      <NoteDetailReveal className={styles.bottomBlock} delay={0.08} aria-hidden />
    </article>
  );
}
