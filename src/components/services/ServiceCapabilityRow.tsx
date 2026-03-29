"use client";

import { motion } from "framer-motion";
import FooterRevealLink from "@/components/footer/FooterRevealLink";
import { EditorialSubgrid } from "@/components/layout/EditorialShell";
import type { ServicesIndexCapability } from "@/data/services-index-content";

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const BULLET_STEP_DESKTOP = 23;
const BULLET_STEP_MOBILE = 14;
const BULLET_GROUP_OFFSET_DESKTOP = 58;
const TITLE_BLOCK_WIDTH = 194;
const DIVIDER_OFFSET = 95;
const ACTIONS_WIDTH = 190;

type ServiceCapabilityRowProps = {
  capability: ServicesIndexCapability;
  eyebrow?: string;
  showEyebrow?: boolean;
  isLast?: boolean;
  reduceMotion: boolean;
  renderMobile?: boolean;
  renderDesktop?: boolean;
};

function CapabilityTitle({ lines }: { lines: string[] }) {
  return (
    <h2
      className="font-normal text-[var(--color-text)]"
      style={{ fontSize: "24px", lineHeight: "1.2" }}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
  );
}

function SteppedBulletList({
  items,
  step,
  baseOffset = 0,
}: {
  items: string[];
  step: number;
  baseOffset?: number;
}) {
  return (
    <ul style={{ fontSize: "16px", lineHeight: "1.225" }}>
      {items.map((item, index) => (
        <li
          key={item}
          className="flex items-start"
          style={{ marginLeft: `${baseOffset + index * step}px` }}
        >
          <span
            aria-hidden="true"
            className="mt-[0.42rem] block shrink-0 rounded-full bg-white"
            style={{ width: "7.5px", height: "6px", marginRight: "15px" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CapabilityGroupsMobile({ groups }: Pick<ServicesIndexCapability, "groups">) {
  return (
    <div
      className="flex flex-col gap-6"
      style={{ marginTop: "28px" }}
    >
      {groups.map((group, groupIndex) => (
        <SteppedBulletList
          key={`${group[0]}-${groupIndex}`}
          items={group}
          step={BULLET_STEP_MOBILE}
        />
      ))}
    </div>
  );
}

function CapabilityGroupsDesktop({ groups }: Pick<ServicesIndexCapability, "groups">) {
  return (
    <div className="flex flex-col gap-0" style={{ marginTop: "19px" }}>
      {groups.map((group, groupIndex) => (
        <SteppedBulletList
          key={`${group[0]}-${groupIndex}`}
          items={group}
          step={BULLET_STEP_DESKTOP}
          baseOffset={groupIndex * BULLET_GROUP_OFFSET_DESKTOP}
        />
      ))}
    </div>
  );
}

function CapabilityActions({
  interestLink,
  examplesLink,
}: Pick<ServicesIndexCapability, "interestLink" | "examplesLink">) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-8 gap-y-2 md:w-[190px] md:flex-nowrap md:justify-between md:gap-x-0"
      style={{
        fontSize: "14px",
        lineHeight: "1.1",
        marginTop: "22px",
        width: `${ACTIONS_WIDTH}px`,
      }}
    >
      <FooterRevealLink href={interestLink.href}>{interestLink.label}</FooterRevealLink>
      <FooterRevealLink href={examplesLink.href}>{examplesLink.label}</FooterRevealLink>
    </div>
  );
}

export default function ServiceCapabilityRow({
  capability,
  eyebrow,
  showEyebrow = false,
  isLast = false,
  reduceMotion,
  renderMobile = true,
  renderDesktop = true,
}: ServiceCapabilityRowProps) {
  const animation = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 12, filter: "blur(6px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: true, amount: 0.24 },
        transition: { duration: 0.7, ease: REVEAL_EASE },
      };

  return (
    <>
      {renderMobile ? (
        <motion.article
          className="border-t border-white/70 px-[var(--editorial-mobile-padding)] py-7 md:hidden"
          style={{ borderTopWidth: "2px" }}
          {...animation}
        >
          {showEyebrow ? (
            <p
              className="mb-8 font-normal text-[var(--color-text)]"
              style={{ fontSize: "20px", lineHeight: "1.1" }}
            >
              {eyebrow}
            </p>
          ) : null}

          <p
            className="mb-4 font-normal !text-[#FFFFFF]"
            style={{
              fontSize: "20px",
              lineHeight: "1.1",
              color: "#FFFFFF",
              WebkitTextFillColor: "#FFFFFF",
              textShadow: "0 0 0.8px #FFFFFF",
            }}
          >
            {capability.number}
          </p>
          <CapabilityTitle lines={capability.titleLines} />
          <p
            className="mt-5 max-w-[42rem] text-[var(--color-text)]"
            style={{ fontSize: "20px", lineHeight: "1.1" }}
          >
            {capability.description}
          </p>
          <CapabilityGroupsMobile groups={capability.groups} />
          <CapabilityActions
            interestLink={capability.interestLink}
            examplesLink={capability.examplesLink}
          />
        </motion.article>
      ) : null}

      {renderDesktop ? (
        <EditorialSubgrid
          as={motion.article}
          start="frame-start"
          end="frame-end"
          className="hidden items-start py-10 md:grid"
          {...animation}
        >
          <div
            style={{
              gridColumn: "guide-2 / guide-3",
              width: `${TITLE_BLOCK_WIDTH}px`,
              justifySelf: "end",
            }}
          >
            <div className="flex items-start justify-between">
              <p
                className="font-normal"
                style={{
                  fontSize: "20px",
                  lineHeight: "1.1",
                  color: "#FFFFFF",
                  WebkitTextFillColor: "#FFFFFF",
                  textShadow: "0 0 0.8px #FFFFFF",
                }}
              >
                {capability.number}
              </p>

              <div className="w-[138px]">
                <CapabilityTitle lines={capability.titleLines} />
              </div>
            </div>
          </div>

          <div style={{ gridColumn: "guide-4 / guide-5" }}>
            <p
              className="text-[var(--color-text)]"
              style={{ fontSize: "20px", lineHeight: "1.1", maxWidth: "646px" }}
            >
              {capability.description}
            </p>
            <div className="flex justify-end" style={{ marginTop: "19px" }}>
              <CapabilityActions
                interestLink={capability.interestLink}
                examplesLink={capability.examplesLink}
              />
            </div>

            <CapabilityGroupsDesktop groups={capability.groups} />
          </div>

          {!isLast ? (
            <div
              aria-hidden="true"
              className="mt-10 h-[2px] bg-white/70"
              style={{
                gridColumn: "guide-2 / frame-end",
                marginInlineStart: `${DIVIDER_OFFSET}px`,
              }}
            />
          ) : null}
        </EditorialSubgrid>
      ) : null}
    </>
  );
}
