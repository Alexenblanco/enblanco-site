"use client";

import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { motion } from "framer-motion";

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.022,
      delayChildren: 0.015,
    },
  },
} as const;

const ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 6,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

type LegalPageRevealProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

function flattenContent(nodes: ReactNode): ReactNode[] {
  return Children.toArray(nodes).flatMap((node) => {
    if (isValidElement<{ children?: ReactNode }>(node) && node.type === Fragment) {
      return flattenContent(node.props.children);
    }

    return [node];
  });
}

function getNodeKey(node: ReactNode, index: number) {
  return isValidElement(node) && node.key != null ? String(node.key) : `legal-reveal-${index}`;
}

export default function LegalPageReveal({
  title,
  className,
  children,
}: LegalPageRevealProps) {
  const content = flattenContent(children);

  return (
    <motion.article
      className={className}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={ITEM_VARIANTS}
        style={{ willChange: "opacity, filter, transform" }}
      >
        {title}
      </motion.h1>

      {content.map((node, index) => (
        <motion.div
          key={getNodeKey(node, index)}
          variants={ITEM_VARIANTS}
          style={{ willChange: "opacity, filter, transform" }}
        >
          {node}
        </motion.div>
      ))}
    </motion.article>
  );
}
