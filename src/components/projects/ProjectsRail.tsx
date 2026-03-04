"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { Project } from "@/data/projects";

const GAP = 8;
const CARD_ASPECT_RATIO = 4 / 5; // width / height (4:5)
const CENTER_SCALE = 1.12;
const SPRING = { type: "spring" as const, stiffness: 120, damping: 24 };
const WHEEL_COOLDOWN_MS = 1000;

/** Solo la card del centro escala (1.12); el resto 1. Interpolación suave para que la transición no sea brusca. */
function scaleFromDistance(d: number): number {
  const abs = Math.abs(d);
  if (abs >= 0.5) return 1;
  const t = abs / 0.5;
  return CENTER_SCALE - (CENTER_SCALE - 1) * t;
}

/** Overflow de la card central hacia el gap (mitad por arriba/abajo) */
function centerOverflow(baseHeight: number): number {
  return ((CENTER_SCALE - 1) * baseHeight) / 2;
}

/** Posición Y (top) de la card i cuando el centro está en índice n. Gap normal 8px; junto al centro 8+overflow para que el hueco visual sea 8px. */
function cardTop(i: number, n: number, baseHeight: number): number {
  const delta = centerOverflow(baseHeight);
  const largeGap = GAP + delta;
  if (i <= 0) return 0;
  let top = 0;
  for (let j = 0; j < i; j++) {
    const isGapBeforeCenter = j === n - 1 || j === n;
    top += baseHeight + (isGapBeforeCenter ? largeGap : GAP);
  }
  return top;
}

type ProjectsRailProps = {
  projects: Project[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
};

function cardTopInterp(
  i: number,
  offset: number,
  baseHeight: number
): number {
  const n0 = Math.floor(offset);
  const n1 = Math.ceil(offset);
  const f = offset - n0;
  if (n0 === n1) return cardTop(i, n0, baseHeight);
  return (1 - f) * cardTop(i, n0, baseHeight) + f * cardTop(i, n1, baseHeight);
}

function CardWithPosition({
  index,
  project,
  offset,
  baseHeightRef,
  baseHeight,
}: {
  index: number;
  project: Project;
  offset: ReturnType<typeof useMotionValue<number>>;
  baseHeightRef: React.RefObject<number>;
  baseHeight: number;
}) {
  const top = useTransform(offset, (v) =>
    cardTopInterp(index, v, baseHeightRef.current)
  );
  const scale = useTransform(offset, (v) => scaleFromDistance(index - v));
  const baseWidth = baseHeight * CARD_ASPECT_RATIO;

  return (
    <motion.div
      className="slot absolute left-1/2 flex -translate-x-1/2 items-center justify-center overflow-hidden rounded-[7px] bg-[#FFFFFF]"
      style={{
        top,
        width: baseWidth,
        height: baseHeight,
        scale,
        borderRadius: "var(--radius)",
        transformOrigin: "center center",
      }}
    >
      <Image
        src={project.coverImage}
        alt={project.coverAlt}
        fill
        sizes={`${Math.round(baseWidth * CENTER_SCALE)}px`}
        className="object-cover"
      />
    </motion.div>
  );
}

export default function ProjectsRail({
  projects,
  activeIndex,
  onActiveChange,
}: ProjectsRailProps) {
  const n = projects.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const lastStepAt = useRef(0);
  const [baseHeight, setBaseHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const baseHeightRef = useRef(0);
  baseHeightRef.current = baseHeight;

  const initialOffset = n;
  const offset = useMotionValue(initialOffset);
  const offsetRef = useRef(initialOffset);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const h = el.getBoundingClientRect().height;
      setContainerHeight(h);
      const overflowRatio = (CENTER_SCALE - 1) / 2;
      const baseH = (h - 32) / (5 + 2 * overflowRatio);
      setBaseHeight(baseH);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const unsub = offset.on("change", (v) => {
      offsetRef.current = v;
      onActiveChange(Math.round(v) % n);
    });
    return unsub;
  }, [n, onActiveChange]);

  const go = useCallback(
    (delta: number) => {
      if (n === 0 || baseHeight <= 0) return;
      const current = offsetRef.current;
      const target = current + delta;

      if (target >= 2 * n) {
        animate(offset, 2 * n, {
          ...SPRING,
          onComplete: () => {
            offset.set(n);
          },
        });
      } else if (target < n) {
        animate(offset, n - 1, {
          ...SPRING,
          onComplete: () => {
            offset.set(2 * n - 1);
          },
        });
      } else {
        animate(offset, target, SPRING);
      }
    },
    [n, offset, baseHeight]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastStepAt.current < WHEEL_COOLDOWN_MS) return;
      lastStepAt.current = now;
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

  const listTranslateY = useTransform(offset, (v) => {
    const b = baseHeightRef.current;
    const n0 = Math.floor(v);
    const n1 = Math.ceil(v);
    const f = v - n0;
    const c0 = cardTop(n0, n0, b);
    const c1 = n0 !== n1 ? cardTop(n1, n1, b) : c0;
    return -(c0 * (1 - f) + c1 * f);
  });

  if (n === 0) return null;

  const listTop = containerHeight / 2 - baseHeight / 2;
  const listHeight =
    baseHeight > 0
      ? cardTop(3 * n - 1, n, baseHeight) + baseHeight
      : 0;

  return (
    <div
      ref={containerRef}
      className="projects-rail-container relative h-[100vh] w-full overflow-visible"
      style={{ touchAction: "pan-y", zIndex: 10 }}
    >
      {baseHeight > 0 && listHeight > 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: listTop }}
        >
          <motion.div
            className="relative"
            style={{ y: listTranslateY, width: baseHeight * CARD_ASPECT_RATIO, height: listHeight }}
          >
            {Array.from({ length: 3 * n }, (_, i) => (
              <CardWithPosition
                key={`${i}-${projects[i % n].id}`}
                index={i}
                project={projects[i % n]}
                offset={offset}
                baseHeightRef={baseHeightRef}
                baseHeight={baseHeight}
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
