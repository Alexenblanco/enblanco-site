"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectMetaProps = {
  project: Project | null;
  reducedMotion?: boolean;
};

const transition = { duration: 0.2 };

const META_GRID_COLUMNS = "2.37% 26.04% 44.04% 22.97% 4.57%";

function MetaCell({
  children,
  reducedMotion,
  exitX,
  initialX,
  transition: t,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
  exitX: number;
  initialX: number;
  transition: { duration: number };
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, x: exitX }}
      transition={t}
      className="text-left"
      style={{ letterSpacing: "-0.04em" }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectMeta({ project, reducedMotion }: ProjectMetaProps) {
  if (!project) return null;

  return (
    <div
      className="proyectos-meta pointer-events-none absolute left-0 right-0 top-1/2 z-10 w-full -translate-y-1/2 overflow-visible"
      style={{
        display: "grid",
        gridTemplateColumns: META_GRID_COLUMNS,
        alignItems: "center",
        boxSizing: "border-box",
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {/* Col 1: vacía */}
      <div />

      {/* Col 2: título, alineado a la izquierda */}
      <div className="flex items-center">
        <AnimatePresence mode="wait">
          <MetaCell
            key={`title-${project.id}`}
            reducedMotion={!!reducedMotion}
            exitX={8}
            initialX={-8}
            transition={transition}
          >
            <span
              className="font-normal leading-tight"
              style={{ fontSize: "28px" }}
            >
              {project.title}
            </span>
          </MetaCell>
        </AnimatePresence>
      </div>

      {/* Col 3: industria, alineada a la izquierda */}
      <div className="flex items-center">
        <AnimatePresence mode="wait">
          <MetaCell
            key={`industry-${project.id}`}
            reducedMotion={!!reducedMotion}
            exitX={8}
            initialX={-8}
            transition={transition}
          >
            <span className="opacity-90" style={{ fontSize: "16px" }}>
              {project.industry}
            </span>
          </MetaCell>
        </AnimatePresence>
      </div>

      {/* Col 4: Ver proyecto, alineado a la izquierda */}
      <div className="flex items-center">
        <AnimatePresence mode="wait">
          <MetaCell
            key={`link-${project.id}`}
            reducedMotion={!!reducedMotion}
            exitX={-8}
            initialX={8}
            transition={transition}
          >
            <Link
              href={`/es/proyectos/${project.slug}`}
              className="pointer-events-auto no-underline"
              style={{ fontSize: "16px" }}
            >
              Ver proyecto
            </Link>
          </MetaCell>
        </AnimatePresence>
      </div>

      {/* Col 5: año, alineado a la izquierda */}
      <div className="flex items-center">
        <AnimatePresence mode="wait">
          <MetaCell
            key={`year-${project.id}`}
            reducedMotion={!!reducedMotion}
            exitX={-8}
            initialX={8}
            transition={transition}
          >
            <span style={{ fontSize: "16px" }}>{project.year}</span>
          </MetaCell>
        </AnimatePresence>
      </div>
    </div>
  );
}
