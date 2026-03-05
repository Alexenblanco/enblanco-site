"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const BLUR_DURATION = 0.9;
const BLUR_EASE = [0.25, 0.1, 0.25, 1] as const;
const BLUR_PX = 12;

type ProjectDetailBlurWrapperProps = {
  children: React.ReactNode;
};

export default function ProjectDetailBlurWrapper({
  children,
}: ProjectDetailBlurWrapperProps) {
  const [isSharp, setIsSharp] = useState(false);
  const [willChangeActive, setWillChangeActive] = useState(true);

  const handleAnimationComplete = useCallback(() => {
    setWillChangeActive(false);
  }, []);

  // Un solo rAF: primer frame pintado con blur, siguiente frame arranca la animación (mínimo retraso)
  useEffect(() => {
    const id = requestAnimationFrame(() => setIsSharp(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div
      initial={{
        filter: `blur(${BLUR_PX}px)`,
        opacity: 0.97,
      }}
      animate={
        isSharp
          ? {
              filter: "blur(0px)",
              opacity: 1,
            }
          : undefined
      }
      transition={{
        duration: BLUR_DURATION,
        ease: BLUR_EASE,
      }}
      style={{
        willChange: willChangeActive ? "filter, opacity" : "auto",
        contain: "paint",
      }}
      onAnimationComplete={isSharp ? handleAnimationComplete : undefined}
    >
      {children}
    </motion.div>
  );
}
