"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { projects, filterProjects } from "@/data/projects";
import ProjectsRail from "./ProjectsRail";
import ProjectMeta from "./ProjectMeta";
import Filters from "./Filters";

export default function ProjectsView() {
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const serviceFromUrl = searchParams.get("service");
  const industryFromUrl = searchParams.get("industry");

  const [service, setServiceState] = useState<string | null>(() => serviceFromUrl);
  const [industry, setIndustryState] = useState<string | null>(() => industryFromUrl);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setServiceState(serviceFromUrl);
    setIndustryState(industryFromUrl);
  }, [serviceFromUrl, industryFromUrl]);

  const updateUrl = useCallback(
    (newService: string | null, newIndustry: string | null) => {
      const params = new URLSearchParams();
      if (newService) params.set("service", newService);
      if (newIndustry) params.set("industry", newIndustry);
      const q = params.toString();
      const href = q ? `${pathname}?${q}` : pathname;
      router.push(href, { scroll: false });
    },
    [pathname, router]
  );

  const setService = useCallback(
    (value: string | null) => {
      setServiceState(value);
      updateUrl(value, industry);
    },
    [industry, updateUrl]
  );

  const setIndustry = useCallback(
    (value: string | null) => {
      setIndustryState(value);
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

  const filtered = useMemo(
    () => filterProjects(projects, { service, industry }),
    [service, industry]
  );

  useEffect(() => {
    if (activeIndex >= filtered.length && filtered.length > 0) {
      setActiveIndex(0);
    }
  }, [filtered.length, activeIndex]);

  const activeProject = filtered[activeIndex] ?? filtered[0] ?? null;

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
          style={{ height: "100%" }}
          aria-label="Proyectos"
        >
          <div className="relative flex-1 min-h-0 overflow-visible">
            <ProjectsRail
              projects={filtered}
              activeIndex={activeIndex}
              onActiveChange={setActiveIndex}
              projectDetailBasePath={pathname}
            />
          </div>

          <ProjectMeta project={activeProject} reducedMotion={!!reducedMotion} />
        </section>
      </div>

      {/* Filtros con position:fixed; sin padding en la page; la barra se separa del borde con margin para no solaparse con el dock */}
      <div className="fixed left-0 right-0 bottom-0 w-full pointer-events-none z-20">
        <div
          className="pointer-events-auto w-full pt-4 mb-[calc(env(safe-area-inset-bottom,0px)+100px)]"
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
