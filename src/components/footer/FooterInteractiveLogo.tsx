"use client";

import { useEffect, useId, useRef } from "react";

type FooterInteractiveLogoProps = {
  className?: string;
};

const VIEWBOX_WIDTH = 99.4;
const VIEWBOX_HEIGHT = 18.3;
const MASK_RADIUS = 6;
const BASE_LERP = 0.14;
const BASE_OPACITY_LERP = 0.16;

export default function FooterInteractiveLogo({
  className = "",
}: FooterInteractiveLogoProps) {
  const id = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<SVGCircleElement | null>(null);
  const blurGroupRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;
    if (!canHover) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const root = rootRef.current;
    const mask = maskRef.current;
    const blurGroup = blurGroupRef.current;
    if (!root || !mask || !blurGroup) return;
    const lerp = reducedMotion ? 1 : BASE_LERP;
    const opacityLerp = reducedMotion ? 1 : BASE_OPACITY_LERP;

    let rafId = 0;
    let running = false;
    let currentU = 0.5;
    let currentV = 0.5;
    let targetU = 0.5;
    let targetV = 0.5;
    let currentOpacity = 0;
    let targetOpacity = 0;
    let cursorHidden = false;

    const syncStyles = () => {
      const cx = currentU * VIEWBOX_WIDTH;
      const cy = currentV * VIEWBOX_HEIGHT;
      mask.setAttribute("cx", String(cx));
      mask.setAttribute("cy", String(cy));
      blurGroup.style.opacity = String(currentOpacity);
    };

    const setCursorHidden = (hidden: boolean) => {
      if (cursorHidden === hidden) return;
      cursorHidden = hidden;
      document.body.style.cursor = hidden ? "none" : "";
    };

    const stopIfSettled = () =>
      Math.abs(currentU - targetU) < 0.0018 &&
      Math.abs(currentV - targetV) < 0.0018 &&
      Math.abs(currentOpacity - targetOpacity) < 0.01;

    const tick = () => {
      currentU += (targetU - currentU) * lerp;
      currentV += (targetV - currentV) * lerp;
      currentOpacity += (targetOpacity - currentOpacity) * opacityLerp;
      syncStyles();

      if (stopIfSettled()) {
        currentU = targetU;
        currentV = targetV;
        currentOpacity = targetOpacity;
        syncStyles();
        running = false;
        rafId = 0;
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const ensureLoop = () => {
      if (running) return;
      running = true;
      rafId = window.requestAnimationFrame(tick);
    };

    const updateFromPointer = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect();
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (!inside) {
        targetOpacity = 0;
        setCursorHidden(false);
        ensureLoop();
        return;
      }

      setCursorHidden(true);
      targetU = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      targetV = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      if (currentOpacity === 0 && targetOpacity === 0) {
        currentU = targetU;
        currentV = targetV;
      }
      targetOpacity = 1;
      ensureLoop();
    };

    const handlePointerMove = (event: PointerEvent) => {
      updateFromPointer(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      targetOpacity = 0;
      setCursorHidden(false);
      ensureLoop();
    };

    syncStyles();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
      setCursorHidden(false);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute left-1/2 top-[var(--footer-logo-top)] z-0 aspect-[99.4/18.3] w-[var(--footer-logo-width)] max-w-[var(--footer-logo-width)] -translate-x-1/2 overflow-visible ${className}`}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter
            id={`footer-logo-blur-${id}`}
            x="-12%"
            y="-60%"
            width="124%"
            height="220%"
            colorInterpolationFilters="sRGB"
          >
            <feMorphology in="SourceGraphic" operator="dilate" radius="0.3" result="expanded" />
            <feGaussianBlur in="expanded" stdDeviation="0.2" />
          </filter>
          <radialGradient id={`footer-logo-gradient-${id}`}>
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="65%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`footer-logo-mask-${id}`} maskUnits="userSpaceOnUse">
            <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="black" />
            <circle
              ref={maskRef}
              cx={VIEWBOX_WIDTH / 2}
              cy={VIEWBOX_HEIGHT / 2}
              r={MASK_RADIUS}
              fill={`url(#footer-logo-gradient-${id})`}
            />
          </mask>
        </defs>

        <g fill="#F9F9F9">
          <path d="m0,11.64c0-3.86,2.68-6.47,6.47-6.47s6.31,2.63,6.31,6.52c0,.31,0,.82-.05,1.09H3.51c.28,1.74,1.44,2.87,3.12,2.87,1.31,0,2.32-.68,2.82-1.69l2.89.77c-.73,2.22-3,3.57-5.85,3.57-3.81,0-6.49-2.68-6.49-6.66Zm9.31-1.09c-.21-1.57-1.35-2.73-2.94-2.73s-2.61,1.09-2.89,2.73h5.82Z" />
          <path d="m13.94,5.55h3.39v1.74h.23c.87-1.4,2-2.1,3.42-2.1,2.66,0,4.43,2.17,4.43,5.14v7.58h-3.39v-7.07c0-1.52-.83-2.58-2.2-2.58s-2.48,1.13-2.48,2.7v6.95h-3.39V5.55Z" />
          <path d="m30.52,16.35h-.23v1.57h-3.39V0h3.39v7.1h.23c.83-1.23,2.11-1.93,3.72-1.93,3.21,0,5.55,2.66,5.55,6.57s-2.32,6.57-5.55,6.57c-1.67,0-2.89-.7-3.72-1.96Zm5.85-4.61c0-1.98-1.28-3.5-3.1-3.5s-3.12,1.52-3.12,3.5,1.31,3.52,3.12,3.52,3.1-1.52,3.1-3.52Z" />
          <path d="m40.94,0h3.39v17.91h-3.39V0Z" />
          <path d="m56.51,5.55h3.39v1.74h.23c.87-1.4,2-2.1,3.42-2.1,2.66,0,4.43,2.17,4.43,5.14v7.58h-3.39v-7.07c0-1.52-.83-2.58-2.2-2.58s-2.48,1.13-2.48,2.7v6.95h-3.39V5.55Z" />
          <path d="m68.97,11.73c0-3.94,2.59-6.57,6.38-6.57,3.19,0,5.62,1.88,6.01,4.8l-3.16.43c-.3-1.35-1.49-2.29-2.8-2.29-1.72,0-3.03,1.5-3.03,3.62s1.28,3.62,3,3.62c1.35,0,2.5-.94,2.82-2.27l3.19.41c-.44,2.92-2.89,4.8-6.03,4.8-3.74,0-6.38-2.66-6.38-6.57Z" />
          <path d="m82.09,11.73c0-3.98,2.59-6.57,6.51-6.57s6.51,2.58,6.51,6.57-2.61,6.57-6.51,6.57-6.51-2.58-6.51-6.57Zm9.61,0c0-2.05-1.28-3.5-3.1-3.5s-3.12,1.45-3.12,3.5,1.28,3.52,3.12,3.52,3.1-1.47,3.1-3.52Z" />
          <path d="m95.43,16.18c0-1.18.85-2.03,2-2.03s1.97.85,1.97,2.03-.83,2.03-1.97,2.03-2-.84-2-2.03Z" />
        </g>

        <g
          ref={blurGroupRef}
          mask={`url(#footer-logo-mask-${id})`}
          filter={`url(#footer-logo-blur-${id})`}
          opacity="0"
          fill="#F9F9F9"
        >
          <path d="m0,11.64c0-3.86,2.68-6.47,6.47-6.47s6.31,2.63,6.31,6.52c0,.31,0,.82-.05,1.09H3.51c.28,1.74,1.44,2.87,3.12,2.87,1.31,0,2.32-.68,2.82-1.69l2.89.77c-.73,2.22-3,3.57-5.85,3.57-3.81,0-6.49-2.68-6.49-6.66Zm9.31-1.09c-.21-1.57-1.35-2.73-2.94-2.73s-2.61,1.09-2.89,2.73h5.82Z" />
          <path d="m13.94,5.55h3.39v1.74h.23c.87-1.4,2-2.1,3.42-2.1,2.66,0,4.43,2.17,4.43,5.14v7.58h-3.39v-7.07c0-1.52-.83-2.58-2.2-2.58s-2.48,1.13-2.48,2.7v6.95h-3.39V5.55Z" />
          <path d="m30.52,16.35h-.23v1.57h-3.39V0h3.39v7.1h.23c.83-1.23,2.11-1.93,3.72-1.93,3.21,0,5.55,2.66,5.55,6.57s-2.32,6.57-5.55,6.57c-1.67,0-2.89-.7-3.72-1.96Zm5.85-4.61c0-1.98-1.28-3.5-3.1-3.5s-3.12,1.52-3.12,3.5,1.31,3.52,3.12,3.52,3.1-1.52,3.1-3.52Z" />
          <path d="m40.94,0h3.39v17.91h-3.39V0Z" />
          <path d="m56.51,5.55h3.39v1.74h.23c.87-1.4,2-2.1,3.42-2.1,2.66,0,4.43,2.17,4.43,5.14v7.58h-3.39v-7.07c0-1.52-.83-2.58-2.2-2.58s-2.48,1.13-2.48,2.7v6.95h-3.39V5.55Z" />
          <path d="m68.97,11.73c0-3.94,2.59-6.57,6.38-6.57,3.19,0,5.62,1.88,6.01,4.8l-3.16.43c-.3-1.35-1.49-2.29-2.8-2.29-1.72,0-3.03,1.5-3.03,3.62s1.28,3.62,3,3.62c1.35,0,2.5-.94,2.82-2.27l3.19.41c-.44,2.92-2.89,4.8-6.03,4.8-3.74,0-6.38-2.66-6.38-6.57Z" />
          <path d="m82.09,11.73c0-3.98,2.59-6.57,6.51-6.57s6.51,2.58,6.51,6.57-2.61,6.57-6.51,6.57-6.51-2.58-6.51-6.57Zm9.61,0c0-2.05-1.28-3.5-3.1-3.5s-3.12,1.45-3.12,3.5,1.28,3.52,3.12,3.52,3.1-1.47,3.1-3.52Z" />
          <path d="m95.43,16.18c0-1.18.85-2.03,2-2.03s1.97.85,1.97,2.03-.83,2.03-1.97,2.03-2-.84-2-2.03Z" />
        </g>
      </svg>
    </div>
  );
}
