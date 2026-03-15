"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type {
  NoteTransitionTarget,
  RectSnapshot,
} from "@/contexts/NoteTransitionContext";

const CARD_DURATION = 0.56;
const EXIT_FADE_MS = 220;
const ROUTE_PUSH_DELAY_MS = 70;
const BLUR_PX = 6;
const EASE = [0.22, 1, 0.36, 1] as const;

export const NOTE_DETAIL_READY_EVENT = "note-detail-ready";

type NoteDetailReadyPayload = {
  cardRect: RectSnapshot;
  titleRect: RectSnapshot;
  indexRect: RectSnapshot;
  typeRect: RectSnapshot;
};

type NoteTransitionOverlayProps = {
  target: NoteTransitionTarget;
  onClose: () => void;
};

function formatRect(rect: RectSnapshot) {
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

export function emitNoteDetailReady(detail: NoteDetailReadyPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NOTE_DETAIL_READY_EVENT, { detail }));
}

export default function NoteTransitionOverlay({
  target,
  onClose,
}: NoteTransitionOverlayProps) {
  const router = useRouter();
  const hasNavigated = useRef(false);
  const readyTimerRef = useRef<number | null>(null);
  const [detailRects, setDetailRects] = useState<NoteDetailReadyPayload | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const clearReadyTimer = useCallback(() => {
    if (readyTimerRef.current !== null) {
      window.clearTimeout(readyTimerRef.current);
      readyTimerRef.current = null;
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
        setIsExiting(true);
      }, CARD_DURATION * 1000 - 40);
    };

    window.addEventListener(NOTE_DETAIL_READY_EVENT, handleReady as EventListener);
    return () => {
      window.removeEventListener(
        NOTE_DETAIL_READY_EVENT,
        handleReady as EventListener
      );
      clearReadyTimer();
    };
  }, [clearReadyTimer]);

  useLayoutEffect(() => {
    if (hasNavigated.current) return;

    const timer = window.setTimeout(() => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      router.push(target.href, { scroll: false });
    }, ROUTE_PUSH_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [router, target.href]);

  const cardTarget = detailRects?.cardRect ?? target.originCardRect;
  const titleTarget = detailRects?.titleRect ?? target.originTitleRect;
  const indexTarget = detailRects?.indexRect ?? target.originIndexRect;
  const typeTarget = detailRects?.typeRect ?? target.originTypeRect;

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
          backgroundColor: "rgba(237, 236, 235, 0.34)",
          contain: "paint",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: detailRects ? 0.18 : 0.72 }}
        transition={{ duration: CARD_DURATION, ease: EASE }}
      />

      <motion.div
        className="absolute left-0 top-0 bg-white"
        style={{
          borderRadius: 0,
          willChange: "transform, width, height, filter, opacity",
        }}
        initial={{
          ...formatRect(target.originCardRect),
          filter: "blur(0px)",
          opacity: 1,
        }}
        animate={{
          ...formatRect(cardTarget),
          filter: detailRects ? "blur(0px)" : `blur(${BLUR_PX}px)`,
          opacity: 1,
        }}
        transition={{
          x: { duration: CARD_DURATION, ease: EASE },
          y: { duration: CARD_DURATION, ease: EASE },
          width: { duration: CARD_DURATION, ease: EASE },
          height: { duration: CARD_DURATION, ease: EASE },
          filter: { duration: CARD_DURATION, ease: EASE },
        }}
      />

      <motion.p
        className="absolute m-0 text-[14px] leading-none tracking-[var(--letter-spacing-base)] text-[var(--color-text)]"
        style={{ willChange: "transform, width, height, opacity" }}
        initial={formatRect(target.originIndexRect)}
        animate={formatRect(indexTarget)}
        transition={{
          x: { duration: CARD_DURATION, ease: EASE },
          y: { duration: CARD_DURATION, ease: EASE },
          width: { duration: CARD_DURATION, ease: EASE },
          height: { duration: CARD_DURATION, ease: EASE },
        }}
      >
        {`[ ${target.note.index} ]`}
      </motion.p>

      <motion.p
        className="absolute m-0 text-[14px] leading-none tracking-[var(--letter-spacing-base)] text-[var(--color-text)]"
        style={{ willChange: "transform, width, height, opacity" }}
        initial={formatRect(target.originTypeRect)}
        animate={formatRect(typeTarget)}
        transition={{
          x: { duration: CARD_DURATION, ease: EASE },
          y: { duration: CARD_DURATION, ease: EASE },
          width: { duration: CARD_DURATION, ease: EASE },
          height: { duration: CARD_DURATION, ease: EASE },
        }}
      >
        {target.note.type}
      </motion.p>

      <motion.h2
        className="absolute m-0 flex items-center justify-center text-[14px] leading-[1.1] tracking-[var(--letter-spacing-base)] text-[var(--color-text)]"
        style={{ willChange: "transform, width, height, opacity" }}
        initial={formatRect(target.originTitleRect)}
        animate={formatRect(titleTarget)}
        transition={{
          x: { duration: CARD_DURATION, ease: EASE },
          y: { duration: CARD_DURATION, ease: EASE },
          width: { duration: CARD_DURATION, ease: EASE },
          height: { duration: CARD_DURATION, ease: EASE },
        }}
      >
        {`‘${target.note.title}’`}
      </motion.h2>
    </motion.div>
  );
}
