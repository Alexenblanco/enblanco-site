"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { NoteItem } from "@/data/notes-index";
import NoteTransitionOverlay from "@/components/notes/NoteTransitionOverlay";

export type RectSnapshot = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type NoteTransitionTarget = {
  phase: "phase1" | "phase2";
  note: Pick<NoteItem, "slug" | "index" | "type" | "title">;
  href: string;
  originCardRect: RectSnapshot;
  originTitleRect: RectSnapshot;
  originIndexRect: RectSnapshot;
  originTypeRect: RectSnapshot;
};

type ContextValue = {
  setTransitionTarget: (target: NoteTransitionTarget | null) => void;
  transitionTarget: NoteTransitionTarget | null;
};

const NoteTransitionContext = createContext<ContextValue | null>(null);

export function useNoteTransition(): ContextValue {
  const ctx = useContext(NoteTransitionContext);
  if (!ctx) return { setTransitionTarget: () => {}, transitionTarget: null };
  return ctx;
}

export function NoteTransitionProvider({ children }: { children: ReactNode }) {
  const [transitionTarget, setTransitionTargetState] =
    useState<NoteTransitionTarget | null>(null);

  const setTransitionTarget = useCallback((target: NoteTransitionTarget | null) => {
    setTransitionTargetState(target);
  }, []);

  const onClose = useCallback(() => setTransitionTargetState(null), []);

  useEffect(() => {
    if (!transitionTarget) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [transitionTarget]);

  return (
    <NoteTransitionContext.Provider
      value={{ transitionTarget, setTransitionTarget }}
    >
      {children}
      {transitionTarget && transitionTarget.phase === "phase2" && (
        <NoteTransitionOverlay
          target={transitionTarget}
          onClose={onClose}
        />
      )}
    </NoteTransitionContext.Provider>
  );
}
