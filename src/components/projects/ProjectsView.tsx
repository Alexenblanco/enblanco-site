"use client";

import { useState, useEffect, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { projects, filterProjects } from "@/data/projects";
import ProjectsRail from "./ProjectsRail";
import ProjectMeta from "./ProjectMeta";
import Filters from "./Filters";

export default function ProjectsView() {
  const reducedMotion = useReducedMotion();
  const [category, setCategory] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const filtered = useMemo(
    () => filterProjects(projects, { category, industry }),
    [category, industry]
  );

  useEffect(() => {
    if (activeIndex >= filtered.length && filtered.length > 0) {
      setActiveIndex(0);
    }
  }, [filtered.length, activeIndex]);

  const activeProject = filtered[activeIndex] ?? filtered[0] ?? null;

  return (
    <div
      className="proyectos-bg relative min-h-[100vh] overflow-x-hidden"
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
        className="relative flex min-h-[85vh] flex-col"
        aria-label="Proyectos"
      >
        <div className="relative flex-1">
          <ProjectsRail
            projects={filtered}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />
        </div>

        <ProjectMeta project={activeProject} reducedMotion={!!reducedMotion} />
      </section>

      <footer className="flex justify-center pb-8 pt-4">
        <Filters
          category={category}
          industry={industry}
          onCategoryChange={setCategory}
          onIndustryChange={setIndustry}
          reducedMotion={!!reducedMotion}
        />
      </footer>
    </div>
  );
}
