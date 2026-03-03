"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getLocaleFromPathname, MOBILE_MENU_ITEMS } from "@/lib/dock-config";

type NavSheetProps = {
  open: boolean;
  onClose: () => void;
};

export default function NavSheet({ open, onClose }: NavSheetProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const items = MOBILE_MENU_ITEMS[locale];

  useEffect(() => {
    if (open) {
      const onEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      document.addEventListener("keydown", onEscape);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onEscape);
        document.body.style.overflow = "";
      };
    }
  }, [open, onClose]);

  const handleLinkClick = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            className="fixed left-0 top-0 bottom-0 z-50 w-[min(280px,85vw)] bg-[#FFFFFF]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            aria-label="Menú de navegación"
            role="dialog"
          >
            <nav className="flex flex-col gap-1 p-6 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="dock-pill block py-3 px-4 text-left text-[18px] no-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
