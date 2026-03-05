import Image from "next/image";
import { getResponsiveSources } from "@/content/projects";
import type { ResponsiveSource } from "@/content/projects";

type ProjectHeroProps = {
  hero: ResponsiveSource;
  alt: string;
  title?: string;
  year?: string;
  industry?: string;
  /** Container padding (e.g. 32). */
  padding?: number;
};

export default function ProjectHero({
  hero,
  alt,
  title,
  year,
  industry,
  padding = 32,
}: ProjectHeroProps) {
  const { desktop, mobile } = getResponsiveSources(hero);
  const hasMobile = mobile !== desktop;

  return (
    <header
      className="relative mx-auto mt-0 w-full"
      style={{ paddingLeft: padding, paddingRight: padding, paddingTop: padding }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-[var(--color-bg)] md:aspect-[16/9]">
        {hasMobile ? (
          <>
            <Image
              src={mobile}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover md:hidden"
              priority
              placeholder="empty"
            />
            <Image
              src={desktop}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover hidden md:block"
              priority
              placeholder="empty"
            />
          </>
        ) : (
          <Image
            src={desktop}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
            priority
            placeholder="empty"
          />
        )}
        {(title != null || year != null || industry != null) && (
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              {title != null && (
                <h1 className="text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl">
                  {title}
                </h1>
              )}
              {year != null && (
                <span className="text-base opacity-90 md:text-lg">{year}</span>
              )}
            </div>
            {industry != null && (
              <div className="flex justify-center md:justify-end">
                <span className="text-base opacity-90 md:text-lg">{industry}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
