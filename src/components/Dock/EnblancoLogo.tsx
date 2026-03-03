"use client";

import Image from "next/image";

type EnblancoLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export default function EnblancoLogo({ className = "", width = 143, height = 26 }: EnblancoLogoProps) {
  return (
    <Image
      src="/logo-enblanco.svg"
      alt="enblanco"
      width={width}
      height={height}
      className={`h-[26px] w-auto ${className}`}
      style={{ color: "var(--color-text)" }}
    />
  );
}
