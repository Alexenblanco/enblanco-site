"use client";

import { useEffect } from "react";
import { emitNoteDetailReady } from "./NoteTransitionOverlay";

function readRect(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return null;

  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

export default function NoteDetailReady() {
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      const cardRect = readRect("[data-note-detail-card]");
      const titleRect = readRect("[data-note-detail-title]");
      const indexRect = readRect("[data-note-detail-index]");
      const typeRect = readRect("[data-note-detail-type]");

      if (!cardRect || !titleRect || !indexRect || !typeRect) return;

      emitNoteDetailReady({
        cardRect,
        titleRect,
        indexRect,
        typeRect,
      });
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  return null;
}
