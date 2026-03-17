"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type RandomNoteLinkProps = {
  hrefs: string[];
  label: string;
  ariaLabel: string;
  className?: string;
};

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
const SCRAMBLE_DURATION_MS = 360;
const SCRAMBLE_STEP_MS = 42;
const SEARCHING_DURATION_MS = 200;

function getRandomChar() {
  const index = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
  return SCRAMBLE_CHARS[index] ?? "a";
}

export default function RandomNoteLink({
  hrefs,
  label,
  ariaLabel,
  className = "",
}: RandomNoteLinkProps) {
  const router = useRouter();
  const [displayText, setDisplayText] = useState(label);
  const canScrambleRef = useRef(false);
  const isNavigatingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const clearScrambleInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const clearNavigateTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopScramble = useCallback((restoreLabel: boolean) => {
    clearScrambleInterval();
    if (restoreLabel && !isNavigatingRef.current) {
      setDisplayText(label);
    }
  }, [clearScrambleInterval, label]);

  const buildScrambledText = useCallback((progress: number) => {
    const chars = Array.from(label);
    const candidateIndexes = chars.reduce<number[]>((indexes, char, index) => {
      if (/[a-z]/i.test(char)) indexes.push(index);
      return indexes;
    }, []);

    if (candidateIndexes.length === 0) return label;

    const scrambleCount = progress < 0.55 ? 2 : 1;
    const nextChars = [...chars];
    const chosen = new Set<number>();

    while (
      chosen.size < Math.min(scrambleCount, candidateIndexes.length)
    ) {
      const randomIndex = candidateIndexes[
        Math.floor(Math.random() * candidateIndexes.length)
      ];
      if (randomIndex === undefined) break;
      chosen.add(randomIndex);
    }

    chosen.forEach((index) => {
      nextChars[index] = getRandomChar();
    });

    return nextChars.join("");
  }, [label]);

  const runScramble = useCallback((durationMs: number, restoreLabel: boolean) => {
    if (!canScrambleRef.current || hrefs.length === 0) {
      if (restoreLabel) setDisplayText(label);
      return;
    }

    clearScrambleInterval();
    const startedAt = window.performance.now();
    setDisplayText(buildScrambledText(0));

    intervalRef.current = window.setInterval(() => {
      const elapsed = window.performance.now() - startedAt;
      if (elapsed >= durationMs) {
        clearScrambleInterval();
        if (restoreLabel && !isNavigatingRef.current) {
          setDisplayText(label);
        }
        return;
      }

      setDisplayText(buildScrambledText(elapsed / durationMs));
    }, SCRAMBLE_STEP_MS);
  }, [buildScrambledText, clearScrambleInterval, hrefs.length, label]);

  const startScramble = useCallback(() => {
    if (isNavigatingRef.current) return;
    runScramble(SCRAMBLE_DURATION_MS, true);
  }, [runScramble]);

  const handlePointerLeave = useCallback(() => {
    stopScramble(true);
  }, [stopScramble]);

  const handleClick = useCallback(() => {
    if (hrefs.length === 0 || isNavigatingRef.current) return;

    stopScramble(false);
    clearNavigateTimeout();
    isNavigatingRef.current = true;
    runScramble(SEARCHING_DURATION_MS, false);

    const nextHref = hrefs[Math.floor(Math.random() * hrefs.length)];
    if (!nextHref) {
      isNavigatingRef.current = false;
      setDisplayText(label);
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      router.push(nextHref);
    }, SEARCHING_DURATION_MS);
  }, [clearNavigateTimeout, hrefs, label, router, runScramble, stopScramble]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncCapabilities = () => {
      canScrambleRef.current = canHover.matches && !reducedMotion.matches;
    };

    syncCapabilities();
    canHover.addEventListener("change", syncCapabilities);
    reducedMotion.addEventListener("change", syncCapabilities);

    return () => {
      canHover.removeEventListener("change", syncCapabilities);
      reducedMotion.removeEventListener("change", syncCapabilities);
      clearScrambleInterval();
      clearNavigateTimeout();
    };
  }, [clearNavigateTimeout, clearScrambleInterval]);

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      title={ariaLabel}
      onPointerEnter={startScramble}
      onPointerLeave={handlePointerLeave}
      onBlur={handlePointerLeave}
      onClick={handleClick}
    >
      <span aria-hidden="true" data-random-note-measure>
        {label}
      </span>
      <span aria-hidden="true" data-random-note-text>
        {displayText}
      </span>
    </button>
  );
}
