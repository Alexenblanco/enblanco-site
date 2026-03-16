"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NOTE_DETAIL_REVEAL_EVENT } from "./NoteTransitionOverlay";

const REVEAL_DURATION = 1.55;
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const REVEAL_BLUR_PX = 10;

type NoteDetailRevealProps = {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function NoteDetailReveal({
  children,
  className,
  delay = 0,
}: NoteDetailRevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasPendingTransition =
      window.sessionStorage.getItem("note-detail-reveal-pending") === "1";

    if (!hasPendingTransition) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const handleReveal = () => {
      window.sessionStorage.removeItem("note-detail-reveal-pending");
      setVisible(true);
    };

    window.addEventListener(NOTE_DETAIL_REVEAL_EVENT, handleReveal);
    return () => {
      window.removeEventListener(NOTE_DETAIL_REVEAL_EVENT, handleReveal);
    };
  }, []);

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        filter: `blur(${REVEAL_BLUR_PX}px)`,
      }}
      animate={
        visible
          ? {
              opacity: 1,
              filter: "blur(0px)",
            }
          : undefined
      }
      transition={{
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
        delay,
      }}
      style={{ willChange: "opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}
