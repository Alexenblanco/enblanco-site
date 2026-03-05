"use client";

import { useEffect } from "react";
import { emitProjectDetailReady } from "./ProjectTransitionOverlay";

export default function ProjectDetailReady() {
  useEffect(() => {
    emitProjectDetailReady();
  }, []);
  return null;
}
