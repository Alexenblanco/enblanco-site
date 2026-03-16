"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const BLUR_DURATION = 0.76;
const BLUR_EASE = [0.22, 1, 0.36, 1] as const;
const BLUR_PX = 6;

type NoteDetailBlurWrapperProps = {
  children: React.ReactNode;
};

export default function NoteDetailBlurWrapper({
  children,
}: NoteDetailBlurWrapperProps) {
  const [isSharp, setIsSharp] = useState(false);
  const [willChangeActive, setWillChangeActive] = useState(true);

  const handleAnimationComplete = useCallback(() => {
    setWillChangeActive(false);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsSharp(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div
      initial={{
        filter: `blur(${BLUR_PX}px)`,
        opacity: 0.985,
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
