"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import ProjectVideo from "./ProjectVideo";
import { getResponsiveSources } from "@/content/projects";
import type { GalleryItem } from "@/content/projects";

const innerClass =
  "relative overflow-hidden rounded-[8px] w-full aspect-[3/2] bg-[var(--color-bg)] md:aspect-video";

type ProjectGalleryItemProps = {
  item: GalleryItem;
  /** When true, full width (parent provides padding). */
  fullWidth?: boolean;
  className?: string;
};

export default function ProjectGalleryItem({
  item,
  fullWidth = true,
  className = "",
}: ProjectGalleryItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const typeDesktop = item.type;
  const typeMobile = item.typeMobile ?? item.type;
  const hasVideo = typeDesktop === "video" || typeMobile === "video";

  useEffect(() => {
    if (!hasVideo || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShouldLoadVideo(true);
      },
      { rootMargin: "200px", threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasVideo]);

  const alt = item.type === "image" ? item.alt : (item.type === "video" ? item.alt : undefined) ?? "";
  const sizes = item.type === "image" && item.sizes
    ? item.sizes
    : "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1600px";

  const desktopSrc = getResponsiveSources(item.src).desktop;
  const mobileSrc = getResponsiveSources(item.src).mobile;

  const posterDesktop = item.type === "video" ? item.poster : undefined;
  const posterMobile = posterDesktop;

  const figureClass = `${className} mx-auto w-full max-w-full`;
  const paddingStyle = fullWidth ? undefined : { paddingLeft: 32, paddingRight: 32 };

  return (
    <figure className={figureClass} style={paddingStyle}>
      <div ref={containerRef} className={innerClass}>
        <div className="absolute inset-0 hidden md:block">
          {typeDesktop === "image" ? (
            <Image
              src={desktopSrc}
              alt={alt}
              fill
              sizes={sizes}
              className="object-cover"
              priority={item.type === "image" && item.priority}
              placeholder="empty"
            />
          ) : (
            <ProjectVideo
              src={desktopSrc}
              poster={posterDesktop}
              alt={alt}
              load={shouldLoadVideo}
              preload={item.type === "video" ? item.preload : undefined}
              autoplay={item.type === "video" ? item.autoplay : false}
              className="absolute inset-0"
            />
          )}
        </div>
        <div className="absolute inset-0 md:hidden">
          {typeMobile === "image" ? (
            <Image
              src={mobileSrc}
              alt={alt}
              fill
              sizes={sizes}
              className="object-cover"
              placeholder="empty"
            />
          ) : (
            <ProjectVideo
              src={mobileSrc}
              poster={posterMobile}
              alt={alt}
              load={shouldLoadVideo}
              preload={item.type === "video" ? item.preload : undefined}
              autoplay={item.type === "video" ? item.autoplay : false}
              className="absolute inset-0"
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
