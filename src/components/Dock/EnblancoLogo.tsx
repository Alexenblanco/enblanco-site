"use client";

import Image from "next/image";

type EnblancoLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export default function EnblancoLogo({ className = "", width = 100, height = 18 }: EnblancoLogoProps) {
  return (
    <Image
      src="/logo-enblanco.svg"
      alt="enblanco"
      width={width}
      height={height}
      className={`h-[18px] w-auto ${className}`}
      style={{ color: "var(--color-text)" }}
    />
  );
}
