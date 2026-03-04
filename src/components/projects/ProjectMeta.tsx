"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectMetaProps = {
  project: Project | null;
  reducedMotion?: boolean;
};

const transition = { duration: 0.2 };

function MetaBlockLeft({
  project,
  reducedMotion,
  transition: t,
}: {
  project: Project;
  reducedMotion: boolean;
  transition: { duration: number };
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, x: 8 }}
      transition={t}
      className="flex items-baseline gap-3"
    >
      <span
        className="font-normal leading-tight"
        style={{ fontSize: "28px" }}
      >
        {project.title}
      </span>
      <span className="opacity-90" style={{ fontSize: "16px" }}>
        {project.industry}
      </span>
    </motion.div>
  );
}

function MetaBlockRight({
  project,
  reducedMotion,
  transition: t,
}: {
  project: Project;
  reducedMotion: boolean;
  transition: { duration: number };
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
      transition={t}
      className="flex items-center gap-6"
      style={{ fontSize: "16px" }}
    >
      <Link
        href={`/es/proyectos/${project.slug}`}
        className="pointer-events-auto underline"
        style={{ letterSpacing: "-0.05em" }}
      >
        Ver proyecto
      </Link>
      <span style={{ letterSpacing: "-0.05em" }}>{project.year}</span>
    </motion.div>
  );
}

export default function ProjectMeta({ project, reducedMotion }: ProjectMetaProps) {
  if (!project) return null;

  return (
    <div
      className="proyectos-meta pointer-events-none absolute left-0 right-0 top-1/2 z-10 w-full -translate-y-1/2"
      style={{
        display: "grid",
        gridTemplateColumns: "12.5% 25% 25% 25% 12.5%",
        alignItems: "center",
        boxSizing: "border-box",
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {/* Columna izquierda 12.5%–37.5%: título (28px) + industria (16px) en una fila */}
      <div
        className="proyectos-meta-left col-start-2 flex items-baseline gap-3 text-left"
        style={{ letterSpacing: "-0.05em" }}
      >
        <AnimatePresence mode="wait">
          <MetaBlockLeft
            key={project.id}
            project={project}
            reducedMotion={!!reducedMotion}
            transition={transition}
          />
        </AnimatePresence>
      </div>

      {/* Columna central 37.5%–62.5%: card centrada en 50% */}

      {/* Columna derecha 62.5%–87.5%: Ver proyecto (16px) + año (16px) */}
      <div
        className="proyectos-meta-right col-start-4 flex items-center justify-end gap-6 text-right"
        style={{ letterSpacing: "-0.05em" }}
      >
        <AnimatePresence mode="wait">
          <MetaBlockRight
            key={project.id}
            project={project}
            reducedMotion={!!reducedMotion}
            transition={transition}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
