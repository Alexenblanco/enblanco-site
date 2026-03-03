"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";

const CARD_WIDTH = 280;
const CARD_HEIGHT = 380;
const SLOT_GAP = 24;
const SLOT_HEIGHT = CARD_HEIGHT + SLOT_GAP;
const CENTER_SCALE = 1.12;
const NEAR_SCALE = 0.92;
const FAR_SCALE = 0.86;
const SPRING = { type: "spring" as const, stiffness: 180, damping: 22 };
const WHEEL_THROTTLE_MS = 600;

type ProjectsRailProps = {
  projects: Project[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
};

function getScale(distance: number): number {
  if (distance === 0) return CENTER_SCALE;
  if (Math.abs(distance) === 1) return NEAR_SCALE;
  return FAR_SCALE;
}

export default function ProjectsRail({
  projects,
  activeIndex,
  onActiveChange,
}: ProjectsRailProps) {
  const reducedMotion = useReducedMotion();
  const lastWheelRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (delta: number) => {
      const next = Math.max(0, Math.min(projects.length - 1, activeIndex + delta));
      if (next !== activeIndex) onActiveChange(next);
    },
    [activeIndex, projects.length, onActiveChange]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < WHEEL_THROTTLE_MS) return;
      lastWheelRef.current = now;
      go(e.deltaY > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [go]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go]);

  if (projects.length === 0) return null;

  const transition = reducedMotion
    ? { duration: 0.15 }
    : SPRING;

  const offsetY = activeIndex * SLOT_HEIGHT;

  return (
    <div
      ref={containerRef}
      className="relative flex h-[70vh] max-h-[720px] min-h-[420px] items-center justify-center overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
      <motion.div
        className="flex flex-col items-center"
        style={{ gap: SLOT_GAP }}
        animate={{
          translateY: `calc(50% - ${CARD_HEIGHT / 2}px - ${offsetY}px)`,
        }}
        transition={transition}
      >
        {projects.map((project, i) => {
          const distance = i - activeIndex;
          const scale = getScale(distance);

          return (
            <motion.div
              key={project.id}
              className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-[#FFFFFF]"
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: "var(--radius)",
              }}
              initial={false}
              animate={{
                scale,
                opacity: reducedMotion ? 1 : (Math.abs(distance) <= 2 ? 1 : 0.4),
              }}
              transition={transition}
            >
              <Image
                src={project.coverImage}
                alt={project.coverAlt}
                fill
                sizes={`${CARD_WIDTH}px`}
                className="object-cover"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
