import Link from "next/link";
import type { NoteItem } from "@/data/notes-index";
import { withLang, type Locale } from "@/lib/i18n/path";
import RandomNoteLink from "./RandomNoteLink";
import styles from "./NoteDetailTopNav.module.css";

type NoteDetailTopNavCopy = {
  backToList: string;
  navigation: string;
  previous: string;
  next: string;
  random: string;
};

type NoteDetailTopNavProps = {
  lang: Locale;
  noteBasePath: string;
  listHref: string;
  previousNote: NoteItem | null;
  nextNote: NoteItem | null;
  randomNoteHrefs: string[];
  copy: NoteDetailTopNavCopy;
};

export default function NoteDetailTopNav({
  lang,
  noteBasePath,
  listHref,
  previousNote,
  nextNote,
  randomNoteHrefs,
  copy,
}: NoteDetailTopNavProps) {
  return (
    <div className={styles.topNavRow}>
      <div className={`${styles.navSide} ${styles.navSideStart}`}>
        <Link href={listHref} className={`${styles.navLink} ${styles.backLink}`}>
          {copy.backToList}
        </Link>
      </div>

      <nav className={styles.navTop} aria-label={copy.navigation}>
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
      </nav>

      <div className={`${styles.navSide} ${styles.navSideEnd}`}>
        <RandomNoteLink
          hrefs={randomNoteHrefs}
          label={copy.random}
          ariaLabel={copy.random}
          className={`${styles.navLink} ${styles.navButton} ${styles.randomLink}`}
        />
      </div>
    </div>
  );
}
