"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { Project } from "@/data/projects";

const GAP = 8;
const CARD_ASPECT_RATIO = 4 / 5; // width / height (4:5)
const CENTER_SCALE = 1.96;
const SPRING = { type: "spring" as const, stiffness: 120, damping: 24 };
/** Si el movimiento total del gesto es menor que esto, se vuelve al valor inicial (evitar saltos accidentales). */
const SNAP_BACK_THRESHOLD = 0.08;
/** Pasada la mitad del step (0.5) se va al siguiente; antes de la mitad se queda en el actual. Así no vuelve al anterior cuando ya te habías acercado al siguiente. */
const SNAP_HALFWAY = 0.5;
/** Sin eventos de rueda durante este tiempo = gesto terminado → aplicar snap. */
const GESTURE_END_MS = 100;

/** Escala según distancia al centro: crece de forma continua mientras se acerca (simultáneo al movimiento). */
function scaleFromDistance(d: number): number {
  const abs = Math.abs(d);
  if (abs >= 1) return 1;
  return CENTER_SCALE + (1 - CENTER_SCALE) * abs;
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

/** Normaliza offset a [n, 2n) para que la ruleta sea infinita (sin freno al repetir). */
function normalizeOffset(v: number, n: number): number {
  if (n <= 0) return v;
  const d = (v - n) % n;
  return n + (d < 0 ? d + n : d);
}

function CardWithPosition({
  index,
  project,
  offset,
  n,
  activeIndex,
  baseHeightRef,
  baseHeight,
  onGoToCard,
}: {
  index: number;
  project: Project;
  offset: ReturnType<typeof useMotionValue<number>>;
  n: number;
  activeIndex: number;
  baseHeightRef: React.RefObject<number>;
  baseHeight: number;
  onGoToCard: (logicalIndex: number) => void;
}) {
  const top = useTransform(offset, (v) =>
    cardTopInterp(index, normalizeOffset(v, n), baseHeightRef.current)
  );
  const scale = useTransform(offset, (v) =>
    scaleFromDistance(index - normalizeOffset(v, n))
  );
  const logicalIndex = index % n;
  const isCentered = activeIndex === logicalIndex;
  const baseWidth = baseHeight * CARD_ASPECT_RATIO;

  return (
    <motion.div
      className={`slot absolute left-1/2 flex -translate-x-1/2 items-center justify-center overflow-hidden rounded-[7px] bg-[#FFFFFF] ${!isCentered ? "cursor-pointer" : ""}`}
      style={{
        top,
        width: baseWidth,
        height: baseHeight,
        scale,
        borderRadius: "var(--radius)",
        transformOrigin: "center center",
      }}
      onClick={() => {
        if (!isCentered) onGoToCard(logicalIndex);
      }}
      role={!isCentered ? "button" : undefined}
      tabIndex={!isCentered ? 0 : undefined}
      onKeyDown={
        !isCentered
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onGoToCard(logicalIndex);
              }
            }
          : undefined
      }
      aria-label={!isCentered ? `Centrar proyecto ${project.title}` : undefined}
    >
      <Image
        src={project.coverImage}
        alt={project.coverAlt}
        fill
        sizes={`${Math.round(baseWidth * CENTER_SCALE)}px`}
        className="pointer-events-none object-cover"
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
  const initialOffset = n;
  const containerRef = useRef<HTMLDivElement>(null);
  const gestureStartPositionRef = useRef(initialOffset);
  const gestureEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [baseHeight, setBaseHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const baseHeightRef = useRef(0);
  baseHeightRef.current = baseHeight;

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
      const rounded = (Math.round(v) % n + n) % n;
      onActiveChange(rounded);
    });
    return unsub;
  }, [n, onActiveChange]);

  /** Snap: si casi no te moviste, vuelve al inicio. Si no, según dirección y posición: pasada la mitad del step (0.5) en la dirección del movimiento, se va a ese step; si no, se queda. Así no vuelve al anterior cuando ya estabas casi a la mitad del siguiente. */
  const snapToNearestStep = useCallback(() => {
    const current = offsetRef.current;
    const start = gestureStartPositionRef.current;
    const movement = Math.abs(current - start);
    let nearest: number;
    if (movement < SNAP_BACK_THRESHOLD) {
      nearest = Math.round(start);
    } else {
      const floorCur = Math.floor(current);
      const frac = current - floorCur;
      if (current >= start) {
        nearest = frac >= SNAP_HALFWAY ? Math.ceil(current) : floorCur;
      } else {
        nearest = frac <= SNAP_HALFWAY ? floorCur : Math.ceil(current);
      }
    }
    const targetInRange = n + (((nearest - n) % n + n) % n);
    animate(offset, nearest, {
      ...SPRING,
      onComplete: () => {
        if (nearest < n || nearest >= 2 * n) offset.set(targetInRange);
      },
    });
  }, [n, offset]);

  const go = useCallback(
    (delta: number) => {
      if (n === 0 || baseHeight <= 0) return;
      const current = offsetRef.current;
      const logicalIndex = Math.round(current);
      const target = logicalIndex + delta;

      if (target >= 2 * n) {
        animate(offset, 2 * n, {
          ...SPRING,
          onComplete: () => offset.set(n),
        });
      } else if (target < n) {
        animate(offset, n - 1, {
          ...SPRING,
          onComplete: () => offset.set(2 * n - 1),
        });
      } else {
        animate(offset, target, SPRING);
      }
    },
    [n, offset, baseHeight]
  );

  /** Centra en la card del proyecto con índice lógico 0..n-1 (p. ej. al hacer clic en una card no centrada). */
  const goToCard = useCallback(
    (logicalIndex: number) => {
      if (n === 0) return;
      const target = n + ((logicalIndex % n + n) % n);
      animate(offset, target, SPRING);
    },
    [n, offset]
  );

  /* Scroll continuo tipo rueda; al terminar gesto, snap al step con dead zone. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const stepHeightPx = baseHeight + GAP;
    if (stepHeightPx <= 0) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cur = offsetRef.current;
      if (gestureEndTimeoutRef.current === null) {
        gestureStartPositionRef.current = cur;
      }
      if (gestureEndTimeoutRef.current) {
        clearTimeout(gestureEndTimeoutRef.current);
        gestureEndTimeoutRef.current = null;
      }
      const deltaSteps = e.deltaY / stepHeightPx;
      const next = cur + deltaSteps;
      offset.set(next);
      gestureEndTimeoutRef.current = setTimeout(() => {
        gestureEndTimeoutRef.current = null;
        snapToNearestStep();
      }, GESTURE_END_MS);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (gestureEndTimeoutRef.current) {
        clearTimeout(gestureEndTimeoutRef.current);
        gestureEndTimeoutRef.current = null;
      }
    };
  }, [baseHeight, offset, n, snapToNearestStep]);

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
    const norm = normalizeOffset(v, n);
    const n0 = Math.floor(norm);
    const n1 = Math.ceil(norm);
    const f = norm - n0;
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
                n={n}
                activeIndex={activeIndex}
                baseHeightRef={baseHeightRef}
                baseHeight={baseHeight}
                onGoToCard={goToCard}
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
