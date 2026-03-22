"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type {
  NoteTransitionTarget,
  RectSnapshot,
} from "@/contexts/NoteTransitionContext";

const PHASE1_DURATION = 0.32;
const CARD_DURATION = 0.85;
const EXIT_FADE_MS = 200;
const ROUTE_PUSH_DELAY_MS = 80;
const BLUR_PX = 6;
const DOCK_REVEAL_DELAY_MS = 1050;
const EASE = [0.22, 1, 0.36, 1] as const;
const EXPANSION_EASE = [0.16, 1, 0.3, 1] as const;

export const NOTE_DETAIL_READY_EVENT = "note-detail-ready";
export const NOTE_DETAIL_REVEAL_EVENT = "note-detail-reveal";

type NoteDetailReadyPayload = {
  cardRect: RectSnapshot;
  titleRect: RectSnapshot;
  indexRect: RectSnapshot;
  typeRect: RectSnapshot;
};

type NoteTransitionOverlayProps = {
  target: NoteTransitionTarget;
  onClose: () => void;
  onPhase1Complete: () => void;
};

function formatRect(rect: RectSnapshot) {
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function getPredictedTargetRect(): RectSnapshot {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardWidth = Math.min(viewportWidth * 0.38, 664);
  const cardHeight = Math.max(280, (viewportHeight - 4) * 0.776);

  return {
    left: viewportWidth / 2 - cardWidth / 2,
    top: Math.max(0, (viewportHeight - 4) * 0.112 + 2),
    width: cardWidth,
    height: cardHeight,
  };
}

export function emitNoteDetailReady(detail: NoteDetailReadyPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NOTE_DETAIL_READY_EVENT, { detail }));
}

export function emitNoteDetailReveal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NOTE_DETAIL_REVEAL_EVENT));
}

export default function NoteTransitionOverlay({
  target,
  onClose,
  onPhase1Complete,
}: NoteTransitionOverlayProps) {
  const router = useRouter();
  const hasNavigated = useRef(false);
  const phase1CompletedRef = useRef(false);
  const readyTimerRef = useRef<number | null>(null);
  const dockRevealTimerRef = useRef<number | null>(null);
  const [predictedTargetRect, setPredictedTargetRect] = useState<RectSnapshot | null>(null);
  const [detailRects, setDetailRects] = useState<NoteDetailReadyPayload | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const clearReadyTimer = useCallback(() => {
    if (readyTimerRef.current !== null) {
      window.clearTimeout(readyTimerRef.current);
      readyTimerRef.current = null;
    }
  }, []);

  const clearDockRevealTimer = useCallback(() => {
    if (dockRevealTimerRef.current !== null) {
      window.clearTimeout(dockRevealTimerRef.current);
      dockRevealTimerRef.current = null;
    }
  }, []);

  const handleExitComplete = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleReady = (event: Event) => {
      const customEvent = event as CustomEvent<NoteDetailReadyPayload>;
      setDetailRects(customEvent.detail);
      clearReadyTimer();
      readyTimerRef.current = window.setTimeout(() => {
        emitNoteDetailReveal();
        setIsExiting(true);
        clearDockRevealTimer();
        dockRevealTimerRef.current = window.setTimeout(() => {
          delete document.body.dataset.noteTransitionDockHidden;
        }, DOCK_REVEAL_DELAY_MS);
      }, CARD_DURATION * 1000 - 40);
    };

    window.addEventListener(NOTE_DETAIL_READY_EVENT, handleReady as EventListener);
    return () => {
      window.removeEventListener(
        NOTE_DETAIL_READY_EVENT,
        handleReady as EventListener
      );
      clearReadyTimer();
      clearDockRevealTimer();
    };
  }, [clearDockRevealTimer, clearReadyTimer]);

  useLayoutEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setPredictedTargetRect(getPredictedTargetRect());
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (target.phase !== "phase1") {
      phase1CompletedRef.current = false;
    }
  }, [target.phase]);

  useLayoutEffect(() => {
    if (target.phase !== "phase2" || hasNavigated.current) return;

    const timer = window.setTimeout(() => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;
      window.sessionStorage.setItem("note-detail-reveal-pending", "1");
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      router.push(target.href, { scroll: false });
    }, ROUTE_PUSH_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [router, target.href, target.phase]);

  const cardTarget =
    detailRects?.cardRect ?? predictedTargetRect ?? target.originCardRect;

  return (
    <motion.div
      className="fixed inset-0 z-[110] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: EXIT_FADE_MS / 1000, ease: "easeOut" }}
      onAnimationComplete={isExiting ? handleExitComplete : undefined}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${BLUR_PX}px)`,
          WebkitBackdropFilter: `blur(${BLUR_PX}px)`,
          backgroundColor: "rgba(242, 241, 241, 1)",
          contain: "paint",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isExiting ? 0 : 1,
        }}
        transition={{
          duration: isExiting ? 0.18 : target.phase === "phase1" ? PHASE1_DURATION : CARD_DURATION,
          ease: EASE,
        }}
      />

      <motion.div
        className="absolute left-0 top-0 bg-white"
        style={{
          borderRadius: 0,
          transformOrigin: "50% 50%",
          boxShadow: "none",
          filter: "none",
          willChange: "transform, width, height, opacity",
        }}
        initial={{
          ...formatRect(target.originCardRect),
          scale: 1,
          opacity: 1,
        }}
        animate={{
          ...(target.phase === "phase1"
            ? formatRect(target.originCardRect)
            : formatRect(cardTarget)),
          scale: target.phase === "phase1" ? 0.94 : 1,
          opacity: 1,
        }}
        transition={{
          x: {
            duration: target.phase === "phase1" ? PHASE1_DURATION : CARD_DURATION,
            ease: target.phase === "phase1" ? EASE : EXPANSION_EASE,
          },
          y: {
            duration: target.phase === "phase1" ? PHASE1_DURATION : CARD_DURATION,
            ease: target.phase === "phase1" ? EASE : EXPANSION_EASE,
          },
          width: {
            duration: target.phase === "phase1" ? PHASE1_DURATION : CARD_DURATION,
            ease: target.phase === "phase1" ? EASE : EXPANSION_EASE,
          },
          height: {
            duration: target.phase === "phase1" ? PHASE1_DURATION : CARD_DURATION,
            ease: target.phase === "phase1" ? EASE : EXPANSION_EASE,
          },
          scale: {
            duration: target.phase === "phase1" ? PHASE1_DURATION : CARD_DURATION,
            ease: EASE,
          },
        }}
        onAnimationComplete={() => {
          if (target.phase !== "phase1" || phase1CompletedRef.current) return;
          phase1CompletedRef.current = true;
          onPhase1Complete();
        }}
      />
    </motion.div>
  );
}
