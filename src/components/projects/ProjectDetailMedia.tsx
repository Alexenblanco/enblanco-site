"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { ContentMedia } from "@/data/project-details";

type ProjectDetailMediaProps = {
  media: ContentMedia;
  className?: string;
};

const PADDING = 32;

export default function ProjectDetailMedia({ media, className = "" }: ProjectDetailMediaProps) {
  const [imageError, setImageError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const figureClass = `${className} mx-auto max-w-full`;
  const innerClass = "relative overflow-hidden rounded-[8px] w-full aspect-video bg-[var(--color-bg)]";

  useEffect(() => {
    if (media.type !== "video" || !videoContainerRef.current) return;
    const el = videoContainerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShouldLoadVideo(true);
      },
      { rootMargin: "100px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [media.type]);

  if (media.type === "video") {
    return (
      <figure className={figureClass} style={{ paddingLeft: PADDING, paddingRight: PADDING }}>
        <div ref={videoContainerRef} className={innerClass}>
          {shouldLoadVideo ? (
            <video
              src={media.src}
              poster={media.poster}
              controls
              muted
              playsInline
              className="h-full w-full object-cover"
              preload="metadata"
            >
              Tu navegador no soporta la reproducción de vídeo.
            </video>
          ) : (
            media.poster ? (
              <Image
                src={media.poster}
                alt={media.alt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[var(--color-bg)]" aria-hidden />
            )
          )}
        </div>
        {media.alt && (
          <figcaption className="mt-2 text-sm opacity-90">{media.alt}</figcaption>
        )}
      </figure>
    );
  }

  if (imageError) return null;

  return (
    <figure className={figureClass} style={{ paddingLeft: PADDING, paddingRight: PADDING }}>
      <div className={innerClass}>
        <Image
          src={media.src}
          alt={media.alt ?? ""}
          fill
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      {media.alt && (
        <figcaption className="mt-2 text-sm opacity-90">{media.alt}</figcaption>
      )}
    </figure>
  );
}
