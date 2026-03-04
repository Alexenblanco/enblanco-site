"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { Project } from "@/data/projects";

const GAP = 8;
const CARD_ASPECT_RATIO = 4 / 5; // width / height (4:5, imagen más alta que ancha)
const CENTER_SCALE = 1.12;
const NEAR_SCALE = 0.92;
const FAR_SCALE = 0.86;
const SPRING = { type: "spring" as const, stiffness: 180, damping: 22 };
const WHEEL_COOLDOWN_MS = 1000;

function scaleFromDistance(d: number): number {
  if (d <= -2) return FAR_SCALE;
  if (d < -1) return FAR_SCALE + (NEAR_SCALE - FAR_SCALE) * (d + 2);
  if (d < 0) return NEAR_SCALE + (CENTER_SCALE - NEAR_SCALE) * (d + 1);
  if (d < 1) return CENTER_SCALE + (NEAR_SCALE - CENTER_SCALE) * d;
  if (d < 2) return NEAR_SCALE + (FAR_SCALE - NEAR_SCALE) * (d - 1);
  return FAR_SCALE;
}

type ProjectsRailProps = {
  projects: Project[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
};

function CardWithScale({
  index,
  project,
  offset,
  baseHeight,
}: {
  index: number;
  project: Project;
  offset: ReturnType<typeof useMotionValue<number>>;
  baseHeight: number;
}) {
  const scale = useTransform(offset, (v) => scaleFromDistance(index - v));
  const baseWidth = baseHeight * CARD_ASPECT_RATIO;

  return (
    <motion.div
      className="slot relative flex shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-[#FFFFFF]"
      style={{
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
  const [stepHeight, setStepHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const baseHeight = stepHeight - GAP;
  const stepHeightRef = useRef(stepHeight);
  stepHeightRef.current = stepHeight;

  const initialOffset = n;
  const offset = useMotionValue(initialOffset);
  const offsetRef = useRef(initialOffset);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const h = el.getBoundingClientRect().height;
      setContainerHeight(h);
      const baseH = (h - 4 * GAP) / 5;
      setStepHeight(baseH + GAP);
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
      if (n === 0 || stepHeight <= 0) return;
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
    [n, offset, stepHeight]
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

  const y = useTransform(offset, (v) => -v * stepHeight);

  if (n === 0) return null;

  const listTop = containerHeight / 2 - baseHeight / 2;

  return (
    <div
      ref={containerRef}
      className="projects-rail-container relative h-[100vh] w-full overflow-visible"
      style={{ touchAction: "pan-y", zIndex: 10 }}
    >
      {baseHeight > 0 && (
        <div
          className="absolute left-1/2 flex flex-col items-center"
          style={{
            top: listTop,
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            className="flex flex-col items-center"
            style={{
              y,
              gap: GAP,
            }}
          >
            {Array.from({ length: 3 * n }, (_, i) => (
              <CardWithScale
                key={`${i}-${projects[i % n].id}`}
                index={i}
                project={projects[i % n]}
                offset={offset}
                baseHeight={baseHeight}
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
