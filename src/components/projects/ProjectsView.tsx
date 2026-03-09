"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { projects as dataProjects, filterProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { useProjectTransition } from "@/contexts/ProjectTransitionContext";
import ProjectsRail from "./ProjectsRail";
import ProjectMeta from "./ProjectMeta";
import Filters from "./Filters";

type ProjectsViewProps = {
  /** When provided, used as the project list (e.g. from getListingProjects()); otherwise falls back to data/projects. */
  listingProjects?: Project[];
  /** Base path for project detail links (e.g. /es/proyectos). Pass from server to avoid usePathname() being null during hydration. */
  projectDetailBasePath?: string;
};

export default function ProjectsView({ listingProjects, projectDetailBasePath: basePathFromServer }: ProjectsViewProps = {}) {
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /** Prefer server-provided base path to avoid Link href "null/slug" when pathname is null during hydration (Next.js). */
  const projectDetailBasePath = basePathFromServer ?? pathname ?? "";

  const serviceFromUrl = searchParams.get("service");
  const industryFromUrl = searchParams.get("industry");

  const service = serviceFromUrl;
  const industry = industryFromUrl;
  const [activeIndex, setActiveIndex] = useState(0);

  const updateUrl = useCallback(
    (newService: string | null, newIndustry: string | null) => {
      const params = new URLSearchParams();
      if (newService) params.set("service", newService);
      if (newIndustry) params.set("industry", newIndustry);
      const q = params.toString();
      const base = pathname ?? projectDetailBasePath ?? "/";
      const href = q ? `${base}?${q}` : base;
      router.push(href, { scroll: false });
    },
    [pathname, projectDetailBasePath, router]
  );

  const setService = useCallback(
    (value: string | null) => {
      updateUrl(value, industry);
    },
    [industry, updateUrl]
  );

  const setIndustry = useCallback(
    (value: string | null) => {
      updateUrl(service, value);
    },
    [service, updateUrl]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const sourceProjects = listingProjects ?? dataProjects;
  const filtered = useMemo(
    () => filterProjects(sourceProjects, { service, industry }),
    [sourceProjects, service, industry]
  );

  const safeActiveIndex = activeIndex >= filtered.length ? 0 : activeIndex;
  const activeProject = filtered[safeActiveIndex] ?? filtered[0] ?? null;
  const { setTransitionTarget } = useProjectTransition();

  const detailHref = activeProject && projectDetailBasePath
    ? `${projectDetailBasePath}/${activeProject.detailSlug ?? activeProject.slug}`
    : null;
  useEffect(() => {
    if (detailHref) router.prefetch(detailHref);
  }, [detailHref, router]);

  const handleDetailClick = useCallback(
    (project: (typeof filtered)[number], href: string, originRect: DOMRect) => {
      setTransitionTarget({ phase: "phase1", project, href, originRect });
    },
    [setTransitionTarget]
  );

  return (
    <>
      <div
        className="proyectos-bg relative h-[100vh] overflow-x-hidden overflow-y-visible"
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
      >
        <section
          className="relative flex h-full flex-col overflow-visible"
          aria-label="Proyectos"
        >
          <div className="relative flex-1 min-h-0 overflow-visible">
            <ProjectsRail
              projects={filtered}
              activeIndex={safeActiveIndex}
              onActiveChange={setActiveIndex}
              projectDetailBasePath={projectDetailBasePath}
              onDetailClick={handleDetailClick}
            />
          </div>

          <ProjectMeta
            project={activeProject}
            reducedMotion={!!reducedMotion}
            detailBasePath={projectDetailBasePath}
          />
        </section>
      </div>

      {/* Filtros con position:fixed; sin padding en la page; la barra se separa del borde con margin para no solaparse con el dock */}
      <div className="fixed left-0 right-0 bottom-0 w-full pointer-events-none z-20">
        <div
          className="pointer-events-auto w-full pt-4 mb-[calc(env(safe-area-inset-bottom,0px)+124px)]"
          style={{ paddingLeft: "max(7%, 64px)", paddingRight: "max(7%, 64px)" }}
          aria-label="Filtros de proyectos"
        >
          <Filters
            service={service}
            industry={industry}
            onServiceChange={setService}
            onIndustryChange={setIndustry}
            reducedMotion={!!reducedMotion}
          />
        </div>
      </div>
    </>
  );
}
