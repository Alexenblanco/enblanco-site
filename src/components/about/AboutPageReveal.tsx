"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.02,
    },
  },
} as const;

const ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

type AboutPageRevealProps = {
  children: ReactNode;
  className?: string;
};

export function AboutRevealItem({ children, className }: AboutPageRevealProps) {
  return (
    <motion.div
      className={className}
      variants={ITEM_VARIANTS}
      style={{ willChange: "opacity, filter, transform" }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPageReveal({ children }: AboutPageRevealProps) {
  return (
    <motion.div
      className="contents"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
