"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_CATEGORIES, PROJECT_INDUSTRIES } from "@/data/projects";

type FiltersProps = {
  category: string | null;
  industry: string | null;
  onCategoryChange: (value: string | null) => void;
  onIndustryChange: (value: string | null) => void;
  reducedMotion?: boolean;
};

export default function Filters({
  category,
  industry,
  onCategoryChange,
  onIndustryChange,
  reducedMotion,
}: FiltersProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        catRef.current && !catRef.current.contains(e.target as Node) &&
        indRef.current && !indRef.current.contains(e.target as Node)
      ) {
        setCategoryOpen(false);
        setIndustryOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const categoryLabel = category && category !== "All projects" ? category : "All projects";
  const industryLabel = industry && industry !== "All industries" ? industry : "All industries";

  return (
    <div className="flex items-center justify-center gap-8 pb-2">
      <div ref={catRef} className="relative">
        <button
          type="button"
          onClick={() => {
            setCategoryOpen((o) => !o);
            setIndustryOpen(false);
          }}
          className="flex items-center gap-1 text-[16px]"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.05em",
          }}
          aria-expanded={categoryOpen}
          aria-haspopup="listbox"
          aria-label={categoryOpen ? "Cerrar filtro categoría" : "Filtrar por categoría"}
        >
          {categoryOpen ? "Close ×" : categoryLabel}
          <span className="ml-1 inline-block text-[10px]" aria-hidden>^</span>
        </button>
        <AnimatePresence>
          {categoryOpen && (
            <motion.ul
              initial={reducedMotion ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              role="listbox"
              className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-wrap justify-center gap-2 rounded-[7px] bg-[#FFFFFF] px-3 py-2 shadow-none"
              style={{ borderRadius: "var(--radius)" }}
            >
              <li role="option">
                <button
                  type="button"
                  onClick={() => {
                    onCategoryChange(null);
                    setCategoryOpen(false);
                  }}
                  className="px-2 py-1 text-sm"
                  style={{
                    color: category === null ? "var(--color-link)" : "var(--color-text)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  All projects
                </button>
              </li>
              {PROJECT_CATEGORIES.map((c) => (
                <li key={c} role="option">
                  <button
                    type="button"
                    onClick={() => {
                      onCategoryChange(c);
                      setCategoryOpen(false);
                    }}
                    className="px-2 py-1 text-sm"
                    style={{
                      color: category === c ? "var(--color-link)" : "var(--color-text)",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div ref={indRef} className="relative">
        <button
          type="button"
          onClick={() => {
            setIndustryOpen((o) => !o);
            setCategoryOpen(false);
          }}
          className="flex items-center gap-1 text-[16px]"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.05em",
          }}
          aria-expanded={industryOpen}
          aria-haspopup="listbox"
          aria-label={industryOpen ? "Cerrar filtro industria" : "Filtrar por industria"}
        >
          {industryOpen ? "Close ×" : industryLabel}
          <span className="ml-1 inline-block text-[10px]" aria-hidden>^</span>
        </button>
        <AnimatePresence>
          {industryOpen && (
            <motion.ul
              initial={reducedMotion ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              role="listbox"
              className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-wrap justify-center gap-2 rounded-[7px] bg-[#FFFFFF] px-3 py-2 shadow-none"
              style={{ borderRadius: "var(--radius)" }}
            >
              <li role="option">
                <button
                  type="button"
                  onClick={() => {
                    onIndustryChange(null);
                    setIndustryOpen(false);
                  }}
                  className="px-2 py-1 text-sm"
                  style={{
                    color: industry === null ? "var(--color-link)" : "var(--color-text)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  All industries
                </button>
              </li>
              {PROJECT_INDUSTRIES.map((i) => (
                <li key={i} role="option">
                  <button
                    type="button"
                    onClick={() => {
                      onIndustryChange(i);
                      setIndustryOpen(false);
                    }}
                    className="px-2 py-1 text-sm"
                    style={{
                      color: industry === i ? "var(--color-link)" : "var(--color-text)",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {i}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
