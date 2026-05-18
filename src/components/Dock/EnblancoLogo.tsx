"use client";

type EnblancoLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
};

export default function EnblancoLogo({
  className = "",
  width = 110,
  height = 20,
  color = "var(--color-text)",
}: EnblancoLogoProps) {
  return (
    <span
      aria-hidden
      className={`inline-block ${className}`}
      style={{
        width,
        height,
        backgroundColor: color,
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
