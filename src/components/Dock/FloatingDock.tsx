"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import DockItem from "./DockItem";
import EnblancoLogo from "./EnblancoLogo";
import NavSheet from "./NavSheet";
import { withLang } from "@/lib/i18n/path";
import {
  getLocaleFromPathname,
  getMobileContextAction,
  DESKTOP_ITEMS,
} from "@/lib/dock-config";

const STAGGER_DELAY_MS = 50;
const EXIT_DURATION_MS = 250;

function getStaggerIndex(index: number, clickedIndex: number, _total: number): number {
  if (index === clickedIndex) return 0;
  return index < clickedIndex ? index : index - 1;
}

export default function FloatingDock() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const runAfterAnimation = useCallback(
    (countOther: number, href: string | null, external: boolean) => {
      const delay = reducedMotion ? 0 : countOther * STAGGER_DELAY_MS + EXIT_DURATION_MS;
      setTimeout(() => {
        if (external && href) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else if (href) {
          router.push(href);
        }
        setClickedId(null);
        setIsAnimating(false);
      }, delay);
    },
    [reducedMotion, router]
  );

  const handleItemClick = useCallback(
    (e: React.MouseEvent, item: { id: string; href?: string; external?: boolean }, index: number, total: number) => {
      if (item.id === "menu") {
        setMenuOpen(true);
        return;
      }
      if (item.id === "context" && getMobileContextAction(pathname, locale).type === "filtros") {
        // Panel de filtros: placeholder (abrir estado o modal en el futuro)
        return;
      }
      const href = item.href ?? null;
      if (!href) return;
      const external = !!item.external;
      e.preventDefault();
      setClickedId(item.id);
      setIsAnimating(true);
      const otherCount = total - 1;
      runAfterAnimation(otherCount, href, external);
    },
    [pathname, locale, runAfterAnimation]
  );

  const desktopItems = DESKTOP_ITEMS[locale];
  const contextAction = getMobileContextAction(pathname, locale);
  const desktopClickedIndex = clickedId ? desktopItems.findIndex((i) => i.id === clickedId) : -1;

  return (
    <>
      <NavSheet open={menuOpen} onClose={() => setMenuOpen(false)} />

      <nav
        className="dock"
        aria-label="Navegación principal"
      >
        {/* Desktop: 5 pills */}
        <div className="hidden md:flex md:items-stretch md:gap-0">
          {desktopItems.map((item, index) => (
            <DockItem
              key={item.id}
              id={item.id}
              href={item.href}
              isCentral={item.isLogo}
              animateOut={isAnimating && clickedId !== null && clickedId !== item.id}
              staggerIndex={getStaggerIndex(index, desktopClickedIndex, desktopItems.length)}
              reducedMotion={reducedMotion}
              ariaLabel={item.isLogo ? "enblanco, ir a inicio" : item.label}
              onClick={(e) => handleItemClick(e, item, index, desktopItems.length)}
            >
              {item.isLogo ? <EnblancoLogo /> : item.label}
            </DockItem>
          ))}
        </div>

        {/* Mobile: 3 pills */}
        <div className="flex items-stretch gap-0 md:hidden">
          <DockItem
            id="menu"
            ariaLabel="Abrir menú"
            onClick={() => setMenuOpen(true)}
          >
            menu
          </DockItem>
          <DockItem
            id="logo"
            href={withLang(locale, "")}
            isCentral
            animateOut={isAnimating && clickedId !== "logo"}
            staggerIndex={getStaggerIndex(1, clickedId === "logo" ? 1 : clickedId === "context" ? 2 : 0, 3)}
            reducedMotion={reducedMotion}
            ariaLabel="enblanco, ir a inicio"
            onClick={(e) => {
              const homeHref = withLang(locale, "");
              const isHome = pathname === homeHref || pathname === homeHref + "/";
              if (isHome) return;
              handleItemClick(e, { id: "logo", href: homeHref }, 1, 3);
            }}
          >
            <EnblancoLogo />
          </DockItem>
          {contextAction.type === "link" && contextAction.href ? (
            <DockItem
              id="context"
              href={contextAction.href}
              external
              animateOut={isAnimating && clickedId !== "context"}
              staggerIndex={getStaggerIndex(2, clickedId === "context" ? 2 : clickedId === "logo" ? 1 : 0, 3)}
              reducedMotion={reducedMotion}
              ariaLabel={contextAction.label}
              onClick={(e) => handleItemClick(e, { id: "context", href: contextAction.href, external: true }, 2, 3)}
            >
              {contextAction.label}
            </DockItem>
          ) : contextAction.type === "filtros" ? (
            <DockItem
              id="context"
              ariaLabel="Filtros"
              onClick={() => {}}
            >
              filtros
            </DockItem>
          ) : (
            <DockItem id="context" ariaLabel="" disabled>
              —
            </DockItem>
          )}
        </div>
      </nav>
    </>
  );
}
