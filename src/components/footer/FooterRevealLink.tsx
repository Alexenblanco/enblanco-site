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

function updatePointerVars(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--footer-reveal-x", `${Math.max(0, Math.min(100, x))}%`);
  el.style.setProperty("--footer-reveal-y", `${Math.max(0, Math.min(100, y))}%`);
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
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      updatePointerVars(e.currentTarget, e.clientX, e.clientY);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.setProperty("--footer-reveal-x", "50%");
      e.currentTarget.style.setProperty("--footer-reveal-y", "50%");
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

