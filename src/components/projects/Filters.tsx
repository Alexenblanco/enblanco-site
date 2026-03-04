"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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

/** Icono doble flecha arriba/abajo (desplegable) */
function ArrowUpDown({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden style={{ display: "inline-flex", alignItems: "center", gap: "2px", lineHeight: 0 }}>
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0L0 5H8L4 0Z" fill="currentColor" />
      </svg>
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1L4 6L8 1" fill="currentColor" />
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

  const openOne = (which: "services" | "industries") => {
    if (which === "services") {
      setServicesOpen((o) => !o);
      setIndustriesOpen(false);
    } else {
      setIndustriesOpen((o) => !o);
      setServicesOpen(false);
    }
  };

  const serviceLabel = service ? toLabel(service) : "Services";
  const industryLabel = industry ? industry : "Industries";

  return (
    <div
      className="w-full pb-2"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 64px 1fr 64px 1fr",
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
            letterSpacing: "-0.05em",
          }}
          aria-expanded={servicesOpen}
          aria-haspopup="listbox"
          aria-label={servicesOpen ? "Cerrar filtro servicios" : "Filtrar por servicio"}
        >
          {servicesOpen ? "Close ×" : (
            <>
              {serviceLabel}
              <ArrowUpDown className="ml-1.5" />
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
              <li role="option">
                <button
                  type="button"
                  onClick={() => {
                    onServiceChange(null);
                    setServicesOpen(false);
                  }}
                  className="cursor-pointer px-1 py-0.5 text-sm rounded transition-opacity duration-150 hover:opacity-80 active:opacity-70"
                  style={{
                    color: service === null ? "var(--color-link)" : "var(--color-text)",
                    letterSpacing: "-0.05em",
                  }}
                  aria-pressed={service === null}
                >
                  Todos
                </button>
              </li>
              {serviceOptions.map(({ value, count }) => (
                <li key={value} role="option">
                  <button
                    type="button"
                    onClick={() => {
                      onServiceChange(value);
                      setServicesOpen(false);
                    }}
                    className="cursor-pointer px-1 py-0.5 text-sm rounded transition-opacity duration-150 hover:opacity-80 active:opacity-70"
                    style={{
                      color: service === value ? "var(--color-link)" : "var(--color-text)",
                      letterSpacing: "-0.05em",
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
            letterSpacing: "-0.05em",
          }}
          aria-expanded={industriesOpen}
          aria-haspopup="listbox"
          aria-label={industriesOpen ? "Cerrar filtro industrias" : "Filtrar por industria"}
        >
          {industriesOpen ? "Close ×" : (
            <>
              {industryLabel}
              <ArrowUpDown className="ml-1.5" />
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
              <li role="option">
                <button
                  type="button"
                  onClick={() => {
                    onIndustryChange(null);
                    setIndustriesOpen(false);
                  }}
                  className="cursor-pointer px-1 py-0.5 text-sm rounded transition-opacity duration-150 hover:opacity-80 active:opacity-70"
                  style={{
                    color: industry === null ? "var(--color-link)" : "var(--color-text)",
                    letterSpacing: "-0.05em",
                  }}
                  aria-pressed={industry === null}
                >
                  Todas
                </button>
              </li>
              {industryOptions.map(({ value, count }) => (
                <li key={value} role="option">
                  <button
                    type="button"
                    onClick={() => {
                      onIndustryChange(value);
                      setIndustriesOpen(false);
                    }}
                    className="cursor-pointer px-1 py-0.5 text-sm rounded transition-opacity duration-150 hover:opacity-80 active:opacity-70"
                    style={{
                      color: industry === value ? "var(--color-link)" : "var(--color-text)",
                      letterSpacing: "-0.05em",
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
