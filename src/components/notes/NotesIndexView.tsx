"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();

  const containerTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const };

  const headerInitial = reduceMotion
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 12, filter: "blur(6px)" };

  const sectionInitial = reduceMotion
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 10, filter: "blur(4px)" };

  const rowInitial = reduceMotion
    ? { opacity: 1, filter: "blur(0px)" }
    : { opacity: 0, filter: "blur(3px)" };

  return (
    <>
      <motion.header
        className={styles.header}
        initial={headerInitial}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={containerTransition}
      >
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
      </motion.header>

      <motion.section
        aria-labelledby={`notes-list-heading-${lang}`}
        className={styles.listSection}
        initial={sectionInitial}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          ...containerTransition,
          delay: reduceMotion ? 0 : 0.14,
        }}
      >
        <h2 id={`notes-list-heading-${lang}`} className="sr-only">
          {listHeading}
        </h2>

        <ul className={styles.list}>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <motion.li
                key={note.slug}
                className={styles.item}
                initial={rowInitial}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.42,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduceMotion ? 0 : 0.2 + index * 0.025,
                }}
              >
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
              </motion.li>
            ))
          ) : (
            <motion.li
              className={styles.item}
              initial={rowInitial}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: reduceMotion ? 0 : 0.42,
                ease: [0.22, 1, 0.36, 1],
                delay: reduceMotion ? 0 : 0.2,
              }}
            >
              <article className={styles.row}>
                <p className={`${styles.meta} ${styles.empty}`}>{emptyText}</p>
              </article>
            </motion.li>
          )}
        </ul>
      </motion.section>
    </>
  );
}
