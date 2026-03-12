import Link from "next/link";
import { withLang, type Locale } from "@/lib/i18n/path";
import type { NoteItem } from "@/data/notes-index";
import styles from "./NotesIndexView.module.css";

type NotesIndexViewProps = {
  lang: Locale;
  notes: NoteItem[];
  headingLead: string;
  headingFirstLineRemainder: string;
  headingLines: [string, string];
  introLines: [string, string, string, string];
  listHeading: string;
  emptyText: string;
};

export default function NotesIndexView({
  lang,
  notes,
  headingLead,
  headingFirstLineRemainder,
  headingLines,
  introLines,
  listHeading,
  emptyText,
}: NotesIndexViewProps) {
  const noteBasePath = lang === "es" ? "notas" : "notes";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.heading}>
            <span className={styles.headingLead}>{headingLead}</span>
            <span className={styles.headingRest}> {headingFirstLineRemainder}</span>
            <br />
            <span className={styles.headingRest}>{headingLines[0]}</span>
            <br />
            <span className={styles.headingRest}>{headingLines[1]}</span>
          </h1>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.intro}>
            {introLines[0]}
            <br />
            {introLines[1]}
            <br />
            {introLines[2]}
            <br />
            {introLines[3]}
          </p>
        </div>
      </header>

      <section aria-labelledby={`notes-list-heading-${lang}`} className={styles.listSection}>
        <h2 id={`notes-list-heading-${lang}`} className="sr-only">
          {listHeading}
        </h2>

        <ul className={styles.list}>
          {notes.length > 0 ? (
            notes.map((note) => (
              <li key={note.slug} className={styles.item}>
                <article className={styles.row}>
                  <span aria-hidden className={styles.centerRect} />

                  <div className={styles.leftMeta}>
                    <p className={`${styles.meta} ${styles.index}`}>[ {note.index} ]</p>
                    <p className={styles.meta}>{note.type}</p>
                  </div>

                  <h2 className={styles.title}>
                    <Link href={withLang(lang, `${noteBasePath}/${note.slug}`)} className={styles.titleLink}>
                      {note.title}
                    </Link>
                  </h2>

                  <div className={styles.rightMeta}>
                    <p className={`${styles.meta} ${styles.date}`}>
                      <time dateTime={note.date}>{note.displayDate}</time>
                    </p>
                    <p className={`${styles.meta} ${styles.author}`}>{note.author}</p>
                  </div>
                </article>
              </li>
            ))
          ) : (
            <li className={styles.item}>
              <article className={styles.row}>
                <p className={`${styles.meta} ${styles.empty}`}>{emptyText}</p>
              </article>
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
