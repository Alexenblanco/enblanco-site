"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { withLang, type Locale } from "@/lib/i18n/path";
import type { NoteItem } from "@/data/notes-index";
import { useNoteTransition, type RectSnapshot } from "@/contexts/NoteTransitionContext";
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

const SOURCE_FADE_DURATION = 1.62;
const SOURCE_HIDE_BUFFER_MS = 140;
const SOURCE_FADE_EASE = [0.18, 0.8, 0.28, 1] as const;

function readRect(element: Element | null): RectSnapshot | null {
  if (!(element instanceof HTMLElement)) return null;
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function buildFallbackCardRect(rowRect: RectSnapshot): RectSnapshot {
  const height = Math.max(84, Math.min(104, rowRect.height * 0.8));
  const width = height * 0.8;
  return {
    left: rowRect.left + rowRect.width / 2 - width / 2,
    top: rowRect.top + rowRect.height / 2 - height / 2,
    width,
    height,
  };
}

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
  const router = useRouter();
  const hideSourceTimerRef = useRef<number | null>(null);
  const [isSourceHidden, setIsSourceHidden] = useState(false);
  const { transitionTarget, setTransitionTarget } = useNoteTransition();

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

  useEffect(() => {
    notes.forEach((note) => {
      router.prefetch(withLang(lang, `${noteBasePath}/${note.slug}`));
    });
  }, [lang, noteBasePath, notes, router]);

  useEffect(() => {
    return () => {
      if (hideSourceTimerRef.current !== null) {
        window.clearTimeout(hideSourceTimerRef.current);
      }
    };
  }, []);

  const handleNoteClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, note: NoteItem, href: string) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();
      setIsSourceHidden(false);
      if (hideSourceTimerRef.current !== null) {
        window.clearTimeout(hideSourceTimerRef.current);
      }

      const link = event.currentTarget;
      const row = link.closest("[data-note-row]");
      const centerRect = row?.querySelector("[data-note-card]");
      const indexMeta = row?.querySelector("[data-note-index]");
      const typeMeta = row?.querySelector("[data-note-type]");

      const rowRect = readRect(row);
      const titleRect = readRect(link);
      const indexRect = readRect(indexMeta ?? null);
      const typeRect = readRect(typeMeta ?? null);
      const cardRect = readRect(centerRect ?? null);

      if (!rowRect || !titleRect || !indexRect || !typeRect) {
        router.push(href);
        return;
      }

      const originCardRect =
        cardRect && cardRect.height > 16 ? cardRect : buildFallbackCardRect(rowRect);

      const nextTarget = {
        phase: "phase1" as const,
        href,
        note: {
          slug: note.slug,
          index: note.index,
          type: note.type,
          title: note.title,
        },
        originCardRect,
        originTitleRect: titleRect,
        originIndexRect: indexRect,
        originTypeRect: typeRect,
      };

      setTransitionTarget(nextTarget);
      hideSourceTimerRef.current = window.setTimeout(() => {
        setIsSourceHidden(true);
      }, reduceMotion ? 0 : SOURCE_FADE_DURATION * 1000 + SOURCE_HIDE_BUFFER_MS);
    },
    [reduceMotion, router, setTransitionTarget]
  );

  return (
    <>
      <motion.header
        className={styles.header}
        initial={headerInitial}
        animate={
          transitionTarget
            ? { opacity: 0, y: 0, filter: reduceMotion ? "blur(0px)" : "blur(10px)" }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={
          transitionTarget
            ? {
                duration: reduceMotion ? 0 : SOURCE_FADE_DURATION,
                ease: SOURCE_FADE_EASE,
              }
            : containerTransition
        }
        style={{ visibility: isSourceHidden ? "hidden" : "visible" }}
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
        animate={
          transitionTarget
            ? { opacity: 0, y: 0, filter: reduceMotion ? "blur(0px)" : "blur(10px)" }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{
          ...(transitionTarget
            ? {
                duration: reduceMotion ? 0 : SOURCE_FADE_DURATION,
                ease: SOURCE_FADE_EASE,
                delay: 0,
              }
            : containerTransition),
          delay: transitionTarget ? 0 : reduceMotion ? 0 : 0.14,
        }}
        style={{ visibility: isSourceHidden ? "hidden" : "visible" }}
      >
        <h2 id={`notes-list-heading-${lang}`} className="sr-only">
          {listHeading}
        </h2>

        <ul className={styles.list}>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <motion.li
                key={note.slug}
                className={`${styles.item} ${
                  transitionTarget?.note.slug === note.slug ? styles.itemActive : ""
                } ${
                  transitionTarget?.note.slug === note.slug &&
                  transitionTarget.phase === "phase1"
                    ? styles.itemFocus
                    : ""
                } ${
                  transitionTarget && transitionTarget.note.slug !== note.slug
                    ? styles.itemInactive
                    : ""
                }`}
                initial={rowInitial}
                animate={
                  transitionTarget
                    ? transitionTarget.note.slug === note.slug
                      ? {
                          opacity: 0,
                          filter: reduceMotion ? "blur(0px)" : "blur(8px)",
                        }
                      : {
                          opacity: 0,
                          filter: reduceMotion ? "blur(0px)" : "blur(10px)",
                        }
                    : { opacity: 1, filter: "blur(0px)" }
                }
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : transitionTarget?.phase === "phase1"
                        ? SOURCE_FADE_DURATION
                        : 0.42,
                  ease: SOURCE_FADE_EASE,
                  delay:
                    reduceMotion || transitionTarget
                      ? 0
                      : 0.2 + index * 0.025,
                }}
              >
                <article className={styles.row} data-note-row>
                  <span aria-hidden className={styles.centerRect} data-note-card />

                  <div className={styles.leftMeta}>
                    <p className={`${styles.meta} ${styles.index}`} data-note-index>
                      [ {note.index} ]
                    </p>
                    <p className={styles.meta} data-note-type>
                      {note.type}
                    </p>
                  </div>

                  <h2 className={styles.title}>
                    <Link
                      href={withLang(lang, `${noteBasePath}/${note.slug}`)}
                      className={styles.titleLink}
                      onClick={(event) =>
                        handleNoteClick(
                          event,
                          note,
                          withLang(lang, `${noteBasePath}/${note.slug}`)
                        )
                      }
                    >
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
