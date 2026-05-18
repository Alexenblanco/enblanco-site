"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const REVEAL_DURATION = 0.36;
const REVEAL_STAGGER = 0.055;

type AboutContactCtaProps = {
  href: string;
  ariaLabel: string;
  trigger: string;
  what: string;
  areYou: string;
  creating: string;
};

function HiddenWord({
  children,
  className,
  revealed,
  delay,
  align = "left",
}: {
  children: string;
  className: string;
  revealed: boolean;
  delay: number;
  align?: "left" | "right";
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={className}
      initial={false}
      animate={
        reduceMotion
          ? { opacity: revealed ? 1 : 0, y: 0, filter: "blur(0px)" }
          : {
              opacity: revealed ? 1 : 0,
              y: revealed ? 0 : 8,
              filter: revealed ? "blur(0px)" : "blur(5px)",
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay: revealed ? delay : 0 }
      }
      style={{ justifySelf: align === "left" ? "start" : "end" }}
    >
      {children}
    </motion.span>
  );
}

export default function AboutContactCta({
  href,
  ariaLabel,
  trigger,
  what,
  areYou,
  creating,
}: AboutContactCtaProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <Link href={href} aria-label={ariaLabel} className="about-cta-mobile">
        <span>{trigger}</span>
        <span>{what}</span>
        <span>{areYou} {creating}</span>
      </Link>

      <Link
        href={href}
        aria-label={ariaLabel}
        className="about-cta-desktop"
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
      >
        <span
          className="about-cta-desktop__trigger"
          onMouseEnter={() => setRevealed(true)}
          onMouseLeave={() => setRevealed(false)}
        >
          {trigger}
        </span>
        <HiddenWord
          className="about-cta-desktop__what"
          revealed={revealed}
          delay={REVEAL_STAGGER}
        >
          {what}
        </HiddenWord>
        <HiddenWord
          className="about-cta-desktop__are"
          revealed={revealed}
          delay={REVEAL_STAGGER * 2}
          align="right"
        >
          {areYou}
        </HiddenWord>
        <HiddenWord
          className="about-cta-desktop__creating"
          revealed={revealed}
          delay={REVEAL_STAGGER * 3}
        >
          {creating}
        </HiddenWord>
      </Link>
    </>
  );
}
