"use client";

import Image from "next/image";

type EnblancoLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export default function EnblancoLogo({ className = "", width = 110, height = 20 }: EnblancoLogoProps) {
  return (
    <Image
      src="/logo-enblanco.svg"
      alt="enblanco"
      width={width}
      height={height}
      className={`h-[20px] w-auto ${className}`}
      style={{ color: "var(--color-text)" }}
    />
  );
}
