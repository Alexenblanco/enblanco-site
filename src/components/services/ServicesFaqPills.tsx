"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EditorialShell, {
  EditorialBlock,
} from "@/components/layout/EditorialShell";
import type { ServicesIndexQuestion } from "@/data/services-index-content";

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

type ServicesFaqPillsProps = {
  questions: ServicesIndexQuestion[];
  reduceMotion: boolean;
};

export default function ServicesFaqPills({
  questions,
  reduceMotion,
}: ServicesFaqPillsProps) {
  return (
    <section style={{ marginTop: "120px" }}>
      <EditorialShell className="py-0">
        <EditorialBlock start="frame-start" end="frame-end">
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
            {questions.map((question, index) => (
              <motion.div
                key={question.label}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(5px)" }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.45,
                  ease: REVEAL_EASE,
                  delay: reduceMotion ? 0 : index * 0.04,
                }}
              >
                <Link
                  href={question.href}
                  className="dock-pill inline-flex items-center justify-center text-center no-underline"
                  style={{
                    fontSize: "clamp(16px, 1.2vw, 20px)",
                    lineHeight: "1.05",
                    padding: "15px 22px",
                  }}
                >
                  {question.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </EditorialBlock>
      </EditorialShell>
    </section>
  );
}
