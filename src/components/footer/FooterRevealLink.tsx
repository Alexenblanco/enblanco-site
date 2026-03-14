"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type FooterRevealLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  openInNewTab?: boolean;
};

function updatePointerX(el: HTMLElement, clientX: number) {
  const rect = el.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  el.style.setProperty("--footer-reveal-x", `${Math.max(0, Math.min(100, x))}%`);
}

export default function FooterRevealLink({
  href,
  children,
  className = "",
  external = false,
  openInNewTab = false,
}: FooterRevealLinkProps) {
  const classes = `footer-link-pill footer-link-reveal inline-block cursor-pointer whitespace-nowrap !text-[#1A1C1F] ${className}`.trim();

  const handlers = {
    onPointerEnter: (e: React.PointerEvent<HTMLElement>) => {
      updatePointerX(e.currentTarget, e.clientX);
    },
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      updatePointerX(e.currentTarget, e.clientX);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.setProperty("--footer-reveal-x", "50%");
    },
  };

  const content = (
    <span className="footer-link-reveal__text">{children}</span>
  );

  if (external) {
    return (
      <a
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noreferrer noopener" : undefined}
        className={classes}
        {...handlers}
      >
        {content}
      </a>
    );
  }

  return <Link href={href} className={classes} {...handlers}>{content}</Link>;
}

