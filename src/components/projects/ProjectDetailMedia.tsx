"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { ContentMedia } from "@/data/project-details";

type ProjectDetailMediaProps = {
  media: ContentMedia;
  className?: string;
  /** Si true, el media ocupa todo el ancho del contenedor (márgenes 32px los da el padre) */
  fullWidth?: boolean;
};

const innerClass =
  "relative overflow-hidden rounded-[8px] w-full aspect-[3/2] bg-[var(--color-bg)] md:aspect-video";

function MediaImage({
  src,
  alt,
  className,
  onError,
}: {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
}) {
  const [err, setErr] = useState(false);
  const handleError = () => {
    setErr(true);
    onError?.();
  };
  if (err) return null;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1600px"
      className={`object-cover ${className ?? ""}`}
      onError={handleError}
    />
  );
}

function MediaVideo({
  src,
  poster,
  alt,
  className,
  load,
}: {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
  load: boolean;
}) {
  if (!load) {
    return poster ? (
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 1600px"
        className="object-cover"
      />
    ) : (
      <div className="h-full w-full bg-[var(--color-bg)]" aria-hidden />
    );
  }
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover"
      preload="metadata"
    >
      Tu navegador no soporta la reproducción de vídeo.
    </video>
  );
}

export default function ProjectDetailMedia({
  media,
  className = "",
  fullWidth = true,
}: ProjectDetailMediaProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const typeDesktop = media.type;
  const typeMobile = media.typeMobile ?? media.type;
  const srcDesktop = media.src;
  const srcMobile = media.srcMobile ?? media.src;
  const posterDesktop = media.poster;
  const posterMobile = media.posterMobile ?? media.poster;
  const alt = media.alt ?? "Acilica Studio";

  const hasVideo = typeDesktop === "video" || typeMobile === "video";

  useEffect(() => {
    if (!hasVideo || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShouldLoadVideo(true);
      },
      { rootMargin: "100px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideo]);

  const figureClass = `${className} mx-auto w-full max-w-full`;
  const paddingStyle = fullWidth ? undefined : { paddingLeft: 32, paddingRight: 32 };

  return (
    <figure className={figureClass} style={paddingStyle}>
      <div ref={containerRef} className={innerClass}>
        {/* Desktop: visible md and up */}
        <div className="hidden md:block absolute inset-0">
          {typeDesktop === "image" ? (
            <MediaImage src={srcDesktop} alt={alt} />
          ) : (
            <MediaVideo
              src={srcDesktop}
              poster={posterDesktop}
              alt={alt}
              load={shouldLoadVideo}
            />
          )}
        </div>
        {/* Mobile: visible below md */}
        <div className="absolute inset-0 md:hidden">
          {typeMobile === "image" ? (
            <MediaImage src={srcMobile} alt={alt} />
          ) : (
            <MediaVideo
              src={srcMobile}
              poster={posterMobile}
              alt={alt}
              load={shouldLoadVideo}
            />
          )}
        </div>
      </div>
      {alt && (
        <figcaption className="mt-2 text-sm opacity-90">{alt}</figcaption>
      )}
    </figure>
  );
}
