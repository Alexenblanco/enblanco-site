"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

type ProjectVideoProps = {
  src: string;
  poster?: string;
  alt?: string;
  /** When true, load and render video; otherwise show poster only. */
  load: boolean;
  preload?: "none" | "metadata";
  autoplay?: boolean;
  className?: string;
};

export default function ProjectVideo({
  src,
  poster,
  alt = "",
  load,
  preload = "none",
  autoplay = false,
  className = "",
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!load || !autoplay || !videoRef.current) return;
    const el = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        setInView(e.isIntersecting);
      },
      { rootMargin: "10%", threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [load, autoplay]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (autoplay && inView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [autoplay, inView]);

  if (!load) {
    return poster ? (
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 1600px"
        className={`object-cover ${className}`}
        placeholder="empty"
      />
    ) : (
      <div className={`h-full w-full bg-[var(--color-bg)] ${className}`} aria-hidden />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      preload={preload}
      muted
      playsInline
      loop
      autoPlay={autoplay}
      controls={false}
      className={`h-full w-full object-cover ${className}`}
    >
      Your browser does not support video.
    </video>
  );
}
