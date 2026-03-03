"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectMetaProps = {
  project: Project | null;
  reducedMotion?: boolean;
};

const transition = { duration: 0.2 };

export default function ProjectMeta({ project, reducedMotion }: ProjectMetaProps) {
  if (!project) return null;

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-[min(5vw,72px)] md:px-12">
      {/* Izquierda: título + industria */}
      <div className="max-w-[min(40vw,320px)] text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={reducedMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: 8 }}
            transition={transition}
            className="text-[clamp(1.25rem,2.5vw,1.75rem)] leading-tight"
            style={{
              color: "var(--color-text)",
              letterSpacing: "-0.05em",
            }}
          >
            <span className="block">{project.title}</span>
            <span className="mt-1 block text-sm opacity-90">{project.industry}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Derecha: Ver proyecto + año */}
      <div className="flex max-w-[min(40vw,280px)] items-center justify-end gap-6 text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={reducedMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
            transition={transition}
            className="flex items-center gap-6"
            style={{ color: "var(--color-text)" }}
          >
            <Link
              href={`/es/proyectos/${project.slug}`}
              className="pointer-events-auto underline"
              style={{
                color: "var(--color-link)",
                letterSpacing: "-0.05em",
              }}
            >
              Ver proyecto
            </Link>
            <span className="text-sm" style={{ letterSpacing: "-0.05em" }}>
              {project.year}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
