"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function EditorialGuidesDebugMode() {
  const searchParams = useSearchParams();
  const isEnabled =
    searchParams.get("guides") === "1" ||
    searchParams.get("grid") === "1" ||
    searchParams.get("layout") === "debug";

  useEffect(() => {
    const root = document.documentElement;

    if (isEnabled) {
      root.dataset.editorialGuides = "1";
      return;
    }

    delete root.dataset.editorialGuides;
  }, [isEnabled]);

  return null;
}
