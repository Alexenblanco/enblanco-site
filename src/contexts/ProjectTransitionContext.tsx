"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Project } from "@/data/projects";
import ProjectTransitionOverlay from "@/components/projects/ProjectTransitionOverlay";

export type TransitionTarget = {
  project: Project;
  href: string;
  originRect: DOMRect;
};

type ContextValue = {
  setTransitionTarget: (target: TransitionTarget | null) => void;
  transitionTarget: TransitionTarget | null;
};

const ProjectTransitionContext = createContext<ContextValue | null>(null);

export function useProjectTransition(): ContextValue {
  const ctx = useContext(ProjectTransitionContext);
  if (!ctx) return { setTransitionTarget: () => {}, transitionTarget: null };
  return ctx;
}

export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const [transitionTarget, setTransitionTargetState] =
    useState<TransitionTarget | null>(null);

  const setTransitionTarget = useCallback((target: TransitionTarget | null) => {
    setTransitionTargetState(target);
  }, []);

  const onClose = useCallback(() => setTransitionTargetState(null), []);

  return (
    <ProjectTransitionContext.Provider
      value={{ transitionTarget, setTransitionTarget }}
    >
      {children}
      {transitionTarget && (
        <ProjectTransitionOverlay
          target={transitionTarget}
          onClose={onClose}
        />
      )}
    </ProjectTransitionContext.Provider>
  );
}
