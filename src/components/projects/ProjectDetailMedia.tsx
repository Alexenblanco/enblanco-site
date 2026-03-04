"use client";

import { useState } from "react";
import Image from "next/image";
import type { ContentMedia } from "@/data/project-details";

type ProjectDetailMediaProps = {
  media: ContentMedia;
  className?: string;
};

const PADDING = 32;

export default function ProjectDetailMedia({ media, className = "" }: ProjectDetailMediaProps) {
  const [imageError, setImageError] = useState(false);
  const figureClass = `${className} mx-auto max-w-full`;
  const innerClass = "overflow-hidden rounded-[8px] w-full aspect-video bg-[var(--color-bg)]";

  if (media.type === "video") {
    return (
      <figure className={figureClass} style={{ paddingLeft: PADDING, paddingRight: PADDING }}>
        <div className={innerClass}>
          <video
            src={media.src}
            poster={media.poster}
            controls
            className="h-full w-full object-cover"
            preload="metadata"
          >
            Tu navegador no soporta la reproducción de vídeo.
          </video>
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
      <div className={`relative ${innerClass}`}>
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
