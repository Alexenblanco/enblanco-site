"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const LENIS_DURATION = 1.1;
const LENIS_EASING = (t: number) => 1 - Math.pow(1 - t, 3);

function shouldEnableLenis() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    document.body.dataset.contactFlowActive !== "1"
  );
}

export default function SmoothScrollProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;
    let rafId = 0;

    const stop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }

      lenis?.destroy();
      lenis = null;
    };

    const start = () => {
      if (lenis || !shouldEnableLenis()) return;

      lenis = new Lenis({
        duration: LENIS_DURATION,
        easing: LENIS_EASING,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);
    };

    const sync = () => {
      if (shouldEnableLenis()) {
        start();
        return;
      }

      stop();
    };

    sync();
    pointerQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    const bodyObserver = new MutationObserver(sync);
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-contact-flow-active"],
    });

    return () => {
      pointerQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
      bodyObserver.disconnect();
      stop();
    };
  }, []);

  return null;
}
