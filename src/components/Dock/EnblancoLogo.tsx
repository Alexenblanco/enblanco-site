"use client";

type EnblancoLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export default function EnblancoLogo({ className = "", width = 110, height = 20 }: EnblancoLogoProps) {
  return (
    <span
      aria-hidden
      className={`inline-block ${className}`}
      style={{
        width,
        height,
        backgroundColor: "var(--color-text)",
        maskImage: 'url("/logo-enblanco.svg")',
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: 'url("/logo-enblanco.svg")',
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
