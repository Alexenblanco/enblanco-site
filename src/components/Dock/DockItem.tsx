"use client";

import { motion } from "framer-motion";

type DockItemProps = {
  id: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  isCentral?: boolean;
  /** Cuando está animando salida, este ítem se oculta con fade + scale */
  animateOut?: boolean;
  staggerIndex?: number;
  reducedMotion?: boolean;
  ariaLabel: string;
  disabled?: boolean;
};


export default function DockItem({
  id,
  children,
  href,
  external,
  onClick,
  isCentral,
  animateOut,
  staggerIndex = 0,
  reducedMotion,
  ariaLabel,
  disabled,
}: DockItemProps) {
  const animate = animateOut && !reducedMotion
    ? { opacity: 0, scale: 0.96 }
    : { opacity: 1, scale: 1 };
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeOut" as const, delay: animateOut ? staggerIndex * 0.05 : 0 };

  const content = (
    <span className="inline-flex items-center justify-center whitespace-nowrap">
      {children}
    </span>
  );

  const className = `dock-pill inline-flex items-center justify-center ${isCentral ? "dock-pill--central" : ""} ${disabled ? "opacity-50 pointer-events-none" : ""}`;

  const motionProps = {
    initial: false,
    animate,
    transition,
  };

  if (disabled) {
    return (
      <motion.span
        key={id}
        className={className}
        role="presentation"
        aria-hidden
        {...motionProps}
      >
        {content}
      </motion.span>
    );
  }

  if (href && external) {
    return (
      <motion.a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
        {...motionProps}
        onClick={onClick}
      >
        {content}
      </motion.a>
    );
  }

  if (href) {
    return (
      <motion.a
        key={id}
        href={href}
        className={className}
        aria-label={ariaLabel}
        {...motionProps}
        onClick={onClick}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      key={id}
      type="button"
      className={className}
      aria-label={ariaLabel}
      {...motionProps}
      onClick={onClick}
    >
      {content}
    </motion.button>
  );
}
