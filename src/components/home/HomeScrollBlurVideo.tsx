"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type HomeScrollBlurVideoProps = {
  src: string;
  className?: string;
  poster?: string;
};

export default function HomeScrollBlurVideo({
  src,
  className = "",
  poster,
}: HomeScrollBlurVideoProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const wrapperBlurValue = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [10, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [18, 0]);
  const wrapperFilter = useMotionTemplate`blur(${wrapperBlurValue}px)`;
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-[7px] ${className}`.trim()}
      aria-hidden="true"
      style={{
        borderRadius: "7px",
        filter: reduceMotion ? "none" : wrapperFilter,
        willChange: "filter",
      }}
    >
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="block h-auto w-full"
        style={{
          filter: reduceMotion ? "none" : filter,
          willChange: "filter",
        }}
      >
        <source src={src} type="video/mp4" />
      </motion.video>
    </motion.div>
  );
}
