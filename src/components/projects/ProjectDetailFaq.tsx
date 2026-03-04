"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/project-details";

type ProjectDetailFaqProps = {
  items: FaqItem[];
  id?: string;
};

export default function ProjectDetailFaq({ items, id = "faq" }: ProjectDetailFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-auto max-w-4xl px-8 py-10"
      style={{ paddingLeft: 32, paddingRight: 32 }}
    >
      <h2 id={`${id}-heading`} className="mb-6 text-xl font-normal tracking-tight">
        Preguntas frecuentes sobre el proyecto
      </h2>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const btnId = `${id}-q-${index}`;
          const panelId = `${id}-a-${index}`;
          return (
            <li key={index} className="border-b border-[var(--color-border)] pb-2">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left text-base font-normal tracking-tight"
              >
                {item.question}
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!isOpen}
                className="mt-2 text-sm opacity-90"
              >
                {item.answer}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
