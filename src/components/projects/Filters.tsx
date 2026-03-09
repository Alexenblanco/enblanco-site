"use client";

import { useState, useRef, useEffect, useMemo, useId, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  projects,
  getServiceCounts,
  getIndustryCounts,
} from "@/data/projects";

type FiltersProps = {
  service: string | null;
  industry: string | null;
  onServiceChange: (value: string | null) => void;
  onIndustryChange: (value: string | null) => void;
  reducedMotion?: boolean;
};

function toLabel(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/** Icono doble caret (dobe-caret): mismo color que el enlace, escala similar al texto del filtro */
function FilterCaretIcon({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const clip0 = `filter-caret-clip0-${id}`;
  const clip1 = `filter-caret-clip1-${id}`;
  return (
    <span
      className={className}
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 0,
        color: "var(--color-link)",
      }}
    >
      <svg
        width="10"
        height="14"
        viewBox="0 0 13 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <g clipPath={`url(#${clip0})`}>
          <path
            d="M6.3323 19L6.86844 18.5648L12.6667 13.8604L11.5923 12.6667L6.3323 16.9359L1.07436 12.6667L0 13.8604L5.79615 18.5648L6.3323 19Z"
            fill="currentColor"
          />
        </g>
        <g clipPath={`url(#${clip1})`}>
          <path
            d="M6.33567 1.05412e-05L5.79953 0.43517L0.00130142 5.1396L1.07566 6.33334L6.33567 2.06408L11.5936 6.33334L12.668 5.1396L6.87181 0.43517L6.33567 1.05412e-05Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id={clip0}>
            <rect width="12.6667" height="6.33333" fill="white" transform="translate(0 12.6667)" />
          </clipPath>
          <clipPath id={clip1}>
            <rect width="12.6667" height="6.33333" fill="white" transform="translate(12.668 6.33334) rotate(180)" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}

export default function Filters({
  service,
  industry,
  onServiceChange,
  onIndustryChange,
  reducedMotion,
}: FiltersProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  const serviceOptions = useMemo(() => getServiceCounts(projects), []);
  const industryOptions = useMemo(() => getIndustryCounts(projects), []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        servicesRef.current &&
        !servicesRef.current.contains(target) &&
        industriesRef.current &&
        !industriesRef.current.contains(target)
      ) {
        setServicesOpen(false);
        setIndustriesOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const openOne = useCallback((which: "services" | "industries") => {
    if (which === "services") {
      setServicesOpen((o) => !o);
      setIndustriesOpen(false);
    } else {
      setIndustriesOpen((o) => !o);
      setServicesOpen(false);
    }
  }, []);

  const serviceLabel = service ? toLabel(service) : "Services";
  const industryLabel = industry ? industry : "Industries";

  return (
    <div
      className="w-full pb-2"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 40px 1fr 40px 1fr",
        alignItems: "center",
        maxWidth: "1600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div ref={servicesRef} className="relative flex justify-end" style={{ gridColumn: 1 }}>
        <button
          type="button"
          onClick={() => openOne("services")}
          className="flex cursor-pointer items-center gap-1 text-[16px] transition-opacity duration-150 hover:opacity-80 active:opacity-70"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.04em",
          }}
          aria-expanded={servicesOpen}
          aria-haspopup="listbox"
          aria-label={servicesOpen ? "Cerrar filtro servicios" : "Filtrar por servicio"}
        >
          {servicesOpen ? "Close ×" : (
            <>
              {serviceLabel}
              <FilterCaretIcon className="ml-1.5" />
            </>
          )}
        </button>
        <AnimatePresence>
          {servicesOpen && (
            <motion.ul
              initial={reducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              role="listbox"
              className="absolute bottom-full right-0 mb-2 flex flex-wrap gap-x-3 gap-y-1 justify-end px-0 py-1"
              style={{ minWidth: "10rem" }}
            >
              <li role="option" aria-selected={service === null}>
                <button
                  type="button"
                  onClick={() => {
                    onServiceChange(null);
                    setServicesOpen(false);
                  }}
                  className="cursor-pointer px-1 py-0.5 text-sm rounded transition-opacity duration-150 hover:opacity-80 active:opacity-70"
                  style={{
                    color: service === null ? "var(--color-link)" : "var(--color-text)",
                    letterSpacing: "-0.04em",
                  }}
                  aria-pressed={service === null}
                >
                  Todos
                </button>
              </li>
              {serviceOptions.map(({ value, count }) => (
                <li key={value} role="option" aria-selected={service === value}>
                  <button
                    type="button"
                    onClick={() => {
                      onServiceChange(value);
                      setServicesOpen(false);
                    }}
                    className="cursor-pointer px-1 py-0.5 text-sm rounded transition-opacity duration-150 hover:opacity-80 active:opacity-70"
                    style={{
                      color: service === value ? "var(--color-link)" : "var(--color-text)",
                      letterSpacing: "-0.04em",
                    }}
                    aria-pressed={service === value}
                  >
                    {toLabel(value)}
                    <sup>{count}</sup>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div ref={industriesRef} className="relative flex justify-start" style={{ gridColumn: 5 }}>
        <button
          type="button"
          onClick={() => openOne("industries")}
          className="flex cursor-pointer items-center gap-1 text-[16px] transition-opacity duration-150 hover:opacity-80 active:opacity-70"
          style={{
            color: "var(--color-text)",
            letterSpacing: "-0.04em",
          }}
          aria-expanded={industriesOpen}
          aria-haspopup="listbox"
          aria-label={industriesOpen ? "Cerrar filtro industrias" : "Filtrar por industria"}
        >
          {industriesOpen ? "Close ×" : (
            <>
              {industryLabel}
              <FilterCaretIcon className="ml-1.5" />
            </>
          )}
        </button>
        <AnimatePresence>
          {industriesOpen && (
            <motion.ul
              initial={reducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              role="listbox"
              className="absolute bottom-full left-0 mb-2 flex flex-wrap gap-x-3 gap-y-1 justify-start px-0 py-1"
              style={{ minWidth: "10rem" }}
            >
              <li role="option" aria-selected={industry === null}>
                <button
                  type="button"
                  onClick={() => {
                    onIndustryChange(null);
                    setIndustriesOpen(false);
                  }}
                  className="cursor-pointer px-1 py-0.5 text-sm rounded transition-opacity duration-150 hover:opacity-80 active:opacity-70"
                  style={{
                    color: industry === null ? "var(--color-link)" : "var(--color-text)",
                    letterSpacing: "-0.04em",
                  }}
                  aria-pressed={industry === null}
                >
                  Todas
                </button>
              </li>
              {industryOptions.map(({ value, count }) => (
                <li key={value} role="option" aria-selected={industry === value}>
                  <button
                    type="button"
                    onClick={() => {
                      onIndustryChange(value);
                      setIndustriesOpen(false);
                    }}
                    className="cursor-pointer px-1 py-0.5 text-sm rounded transition-opacity duration-150 hover:opacity-80 active:opacity-70"
                    style={{
                      color: industry === value ? "var(--color-link)" : "var(--color-text)",
                      letterSpacing: "-0.04em",
                    }}
                    aria-pressed={industry === value}
                  >
                    {value}
                    <sup>{count}</sup>
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
