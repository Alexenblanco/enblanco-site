import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";
import EditorialGuidesDebugMode from "./EditorialGuidesDebugMode";

type EditorialLine =
  | "bleed-start"
  | "frame-start"
  | "guide-1"
  | "guide-2"
  | "guide-3"
  | "guide-4"
  | "guide-5"
  | "guide-6"
  | "frame-end"
  | "bleed-end";

type BreakoutDirection = "left" | "right" | "both";

type EditorialShellProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

type EditorialBlockProps<T extends ElementType> = {
  as?: T;
  start?: EditorialLine;
  end?: EditorialLine;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  breakout?: BreakoutDirection;
  breakoutSize?: string;
};

const GUIDE_LINES = [
  { line: "guide-1", position: "var(--editorial-guide-ratio-1)" },
  { line: "guide-2", position: "var(--editorial-guide-ratio-2)" },
  { line: "guide-3", position: "var(--editorial-guide-ratio-3)" },
  { line: "guide-4", position: "var(--editorial-guide-ratio-4)" },
  { line: "guide-5", position: "var(--editorial-guide-ratio-5)" },
  { line: "guide-6", position: "var(--editorial-guide-ratio-6)" },
] satisfies ReadonlyArray<{ line: EditorialLine; position: string }>;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function getBreakoutStyle(
  breakout?: BreakoutDirection,
  breakoutSize = "0px",
): CSSProperties | undefined {
  if (!breakout) return undefined;

  return {
    "--editorial-overflow-inline-start":
      breakout === "left" || breakout === "both" ? breakoutSize : "0px",
    "--editorial-overflow-inline-end":
      breakout === "right" || breakout === "both" ? breakoutSize : "0px",
  } as CSSProperties;
}

export function EditorialBlock<T extends ElementType = "div">({
  as,
  start = "frame-start",
  end = "frame-end",
  children,
  className,
  style,
  breakout,
  breakoutSize,
  ...props
}: EditorialBlockProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof EditorialBlockProps<T>>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cx("editorial-block", breakout && "editorial-block--breakout", className)}
      style={{
        gridColumn: `${start} / ${end}`,
        ...getBreakoutStyle(breakout, breakoutSize),
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function EditorialSubgrid<T extends ElementType = "div">({
  as,
  start = "frame-start",
  end = "frame-end",
  children,
  className,
  style,
  ...props
}: EditorialBlockProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof EditorialBlockProps<T>>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cx("editorial-subgrid", className)}
      style={{ gridColumn: `${start} / ${end}`, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default function EditorialShell<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: EditorialShellProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof EditorialShellProps<T>>) {
  const Component = as ?? "div";

  return (
    <Component className={cx("editorial-shell", className)} {...props}>
      <EditorialGuidesDebugMode />
      <div aria-hidden="true" className="editorial-guides-overlay">
        {GUIDE_LINES.map(({ line, position }) => (
          <div
            key={line}
            className="editorial-guides-overlay__line"
            style={{ left: `calc(var(--editorial-overlay-frame-start) + (var(--editorial-frame-width) * ${position}))` }}
          />
        ))}
      </div>
      {children}
    </Component>
  );
}
