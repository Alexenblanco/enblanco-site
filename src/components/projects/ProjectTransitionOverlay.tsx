"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { TransitionTarget } from "@/contexts/ProjectTransitionContext";

const HERO_PADDING = 32;
const HERO_RADIUS = 8;
const HERO_ASPECT = 9 / 16;

const BLUR_IN_MS = 320;
const CARD_DURATION = 0.7;
const EASE = [0.33, 1, 0.68, 1] as const;
const EXIT_FADE_MS = 280;
const BLUR_PX = 12;

export const EVENT_READY = "project-detail-ready";

type TargetRect = { left: number; top: number; width: number; height: number };

function getTargetRect(): TargetRect {
  if (typeof window === "undefined")
    return { left: HERO_PADDING, top: HERO_PADDING, width: 0, height: 0 };
  const w = window.innerWidth;
  const h = window.innerHeight;
  const width = w - HERO_PADDING * 2;
  const height = Math.min(width * HERO_ASPECT, h - HERO_PADDING * 2);
  return { left: HERO_PADDING, top: HERO_PADDING, width, height };
}

type ProjectTransitionOverlayProps = {
  target: TransitionTarget;
  onClose: () => void;
};

export default function ProjectTransitionOverlay({
  target,
  onClose,
}: ProjectTransitionOverlayProps) {
  const router = useRouter();
  const hasNavigated = useRef(false);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [willChangeActive, setWillChangeActive] = useState(true);

  useLayoutEffect(() => {
    setTargetRect(getTargetRect());
  }, []);

  const handleReady = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
  }, [isExiting]);

  const handleExitComplete = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handler = () => handleReady();
    window.addEventListener(EVENT_READY, handler);
    return () => window.removeEventListener(EVENT_READY, handler);
  }, [handleReady]);

  const totalTransitionMs = BLUR_IN_MS + CARD_DURATION * 1000;
  useLayoutEffect(() => {
    if (!targetRect || hasNavigated.current) return;
    const timer = setTimeout(() => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;
      router.push(target.href, { scroll: false });
    }, totalTransitionMs);
    return () => clearTimeout(timer);
  }, [targetRect, target.href, router, totalTransitionMs]);

  const { project, originRect } = target;

  if (!targetRect || targetRect.width <= 0) {
    return (
      <div
        className="fixed inset-0 z-[100]"
        style={{ background: "var(--color-bg)" }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: EXIT_FADE_MS / 1000, ease: "easeOut" }}
      onAnimationComplete={isExiting ? handleExitComplete : undefined}
    >
      {/* 1. Fondo se difumina primero; la card sigue nítida */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: `blur(${BLUR_PX}px)`,
          WebkitBackdropFilter: `blur(${BLUR_PX}px)`,
          backgroundColor: "rgba(237, 236, 235, 0.4)",
          contain: "paint",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: BLUR_IN_MS / 1000, ease: "easeOut" }}
      />
      {/* 2. Tras el blur del fondo: el contenedor crece (sin deformar) y la imagen hace fill; luego se difumina */}
      <motion.div
        className="absolute left-0 top-0 z-10 overflow-hidden rounded-[var(--radius)] bg-[var(--color-bg)]"
        style={{
          willChange: willChangeActive ? "transform, filter" : "auto",
        }}
        initial={{
          x: originRect.left,
          y: originRect.top,
          width: originRect.width,
          height: originRect.height,
          borderRadius: 7,
          filter: "blur(0px)",
        }}
        animate={{
          x: targetRect.left,
          y: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius: HERO_RADIUS,
          filter: `blur(${BLUR_PX}px)`,
        }}
        transition={{
          duration: CARD_DURATION,
          delay: BLUR_IN_MS / 1000,
          ease: EASE,
        }}
        onAnimationComplete={() => setWillChangeActive(false)}
      >
        <Image
          src={project.coverImage}
          alt={project.coverAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

export function emitProjectDetailReady() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_READY));
}
