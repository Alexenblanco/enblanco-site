import {
  getOtherNotes,
  type NoteItem,
} from "@/data/notes-index";
import { withLang, type Locale } from "@/lib/i18n/path";
import NoteDetailReveal from "./NoteDetailReveal";
import NoteDetailTopNav from "./NoteDetailTopNav";
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
    emptyBody: "Contenido de la nota pendiente de publicar.",
  },
  en: {
    backToList: "back to list",
    navigation: "note navigation",
    previous: "previous note",
    next: "next note",
    random: "random note",
    emptyBody: "Note content pending publication.",
  },
} as const;

export default async function NoteDetailView({
  lang,
  note,
  previousNote,
  nextNote,
}: NoteDetailViewProps) {
  const copy = COPY[lang];
  const noteBasePath = lang === "es" ? "notas" : "notes";
  const listHref = withLang(lang, noteBasePath);
  const randomNotes = await getOtherNotes(lang, note.slug);
  const randomNoteHrefs = randomNotes.map((item) =>
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
      <NoteDetailReveal className={styles.topBlock} delay={0.02}>
        <NoteDetailTopNav
          lang={lang}
          noteBasePath={noteBasePath}
          listHref={listHref}
          previousNote={previousNote}
          nextNote={nextNote}
          randomNoteHrefs={randomNoteHrefs}
          copy={copy}
        />
      </NoteDetailReveal>

      <div className={styles.middleBlock}>
        <NoteDetailReveal className={styles.ruleMetaRow} delay={0.06}>
          <p className={`${styles.meta} ${styles.indexMeta}`} data-note-detail-index>
            [ {note.index} ]
          </p>
          <p className={`${styles.meta} ${styles.typeMeta}`} data-note-detail-type>
            {note.type}
          </p>
        </NoteDetailReveal>
        <div className={styles.contentGrid}>
          <NoteDetailReveal className={styles.titleColumn} delay={0.1}>
            <h1 className={styles.title} data-note-detail-title>
              {note.title}
            </h1>
          </NoteDetailReveal>

          <section className={styles.bodyColumn} aria-label={lang === "es" ? "contenido de la nota" : "note content"}>
            <div className={styles.bodyCard} data-note-detail-card>
              <NoteDetailReveal className={styles.bodyInner} delay={0.16}>
                {bodyParagraphs.map((paragraph, index) => (
                  <p key={`${note.slug}-paragraph-${index}`} className={styles.bodyText}>
                    {paragraph}
                  </p>
                ))}
              </NoteDetailReveal>
            </div>
          </section>

          <NoteDetailReveal className={styles.metaColumn} delay={0.22}>
            <p className={styles.meta}>
              <time dateTime={note.date}>{note.displayDate}</time>
            </p>
            <p className={styles.meta}>{note.author}</p>
          </NoteDetailReveal>
        </div>
      </div>

      <NoteDetailReveal className={styles.ruleBottom} delay={0.28} aria-hidden />

      <NoteDetailReveal className={styles.bottomBlock} delay={0.28} aria-hidden />
    </article>
  );
}
