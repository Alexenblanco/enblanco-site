"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  email?: string;
  textToCopy?: string;
  copiedLabel?: string;
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  buttonClassName?: string;
};

type BubblePosition = {
  x: number;
  y: number;
  side: "left" | "right";
};

export default function CopyEmailButton({
  email,
  textToCopy,
  copiedLabel = "Copiado",
  ariaLabel = "Copiar al portapapeles",
  children,
  className = "",
  buttonClassName,
}: Props) {
  const copyValue = textToCopy ?? email ?? "";
  const [copied, setCopied] = useState(false);
  const [bubblePosition, setBubblePosition] = useState<BubblePosition>({
    x: 0,
    y: 0,
    side: "right",
  });
  const resetTimerRef = useRef<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current == null) return;
    window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = null;
  }, []);

  const copyEmail = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    const fallbackRect = buttonRef.current?.getBoundingClientRect();
    const anchorX = event.clientX || fallbackRect?.left || 0;
    const anchorY = event.clientY || fallbackRect?.top || 0;
    const side: BubblePosition["side"] =
      anchorX < window.innerWidth * 0.55 ? "right" : "left";

    setBubblePosition({
      x:
        side === "right"
          ? Math.min(anchorX + 14, window.innerWidth - 96)
          : Math.max(anchorX - 14, 96),
      y: Math.max(anchorY - 14, 24),
      side,
    });

    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      clearResetTimer();
      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        resetTimerRef.current = null;
      }, 1400);
    } catch {
      setCopied(false);
    }
  }, [clearResetTimer, copyValue]);

  useEffect(() => {
    return () => {
      clearResetTimer();
    };
  }, [clearResetTimer]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={copyEmail}
        className={buttonClassName ?? "contact-muted-link cursor-pointer no-underline"}
        aria-label={ariaLabel}
      >
        {children ?? copyValue}
      </button>

      <AnimatePresence>
        {copied ? (
          <motion.span
            key="copied-bubble"
            role="status"
            aria-live="polite"
            initial={{
              opacity: 0,
              y: 4,
              filter: "blur(4px)",
              x: bubblePosition.side === "right" ? -6 : 6,
            }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", x: 0 }}
            exit={{
              opacity: 0,
              y: -4,
              filter: "blur(4px)",
              x: bubblePosition.side === "right" ? 6 : -6,
            }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed z-[70] rounded-full px-3 py-1 text-[12px] leading-none !text-[#8a8a8a] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white before:blur-[4px] before:content-['']"
            style={{
              left: `${bubblePosition.x}px`,
              top: `${bubblePosition.y}px`,
              transform: `translate(${bubblePosition.side === "right" ? "0%" : "-100%"}, -100%)`,
            }}
          >
            {copiedLabel}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
