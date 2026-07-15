"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type MutableRefObject } from "react";
import { DOCK_APPS, type AppId, type DockIconId } from "./config";
import { DockIcon } from "./icons";

/*
 * The macOS dock: centered glass shelf with hover magnification and a small
 * dot under each running app. Icon order/contents come from DOCK_APPS in
 * config.ts. Apps with `opens: false` are decorative — they show a tooltip
 * but do nothing when clicked. Clicking an openable app opens, restores
 * (if minimized), or focuses it — the parent decides via onAppClick.
 * Icons register their elements in `iconRefs` so the window minimize
 * animation can aim at them.
 */

const BASE_SIZE = 48; // icon size at rest, px
const MAX_SIZE = 76; // icon size directly under the cursor
const REACH = 140; // how far (px) the magnification effect spreads

interface DockProps {
  openApps: AppId[];
  onAppClick: (id: AppId) => void;
  iconRefs: MutableRefObject<Map<string, HTMLElement>>;
}

export default function Dock({ openApps, onAppClick, iconRefs }: DockProps) {
  // cursor x-position across the dock; Infinity = mouse not over the dock
  const mouseX = useMotionValue(Infinity);
  // Hovered icon's label + viewport x. The tooltip renders on the outer
  // wrapper, NOT inside the shelf — the shelf's overflow-x-auto (mobile
  // scrolling) would clip anything poking above it.
  const [tip, setTip] = useState<{ name: string; x: number } | null>(null);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-[8000] flex justify-center">
      {/* tooltip with the app name, floating above the shelf */}
      {tip && (
        <div
          className="pointer-events-none absolute bottom-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap rounded-md border border-black/10 bg-[#f6f6f6]/90 px-2.5 py-1 text-[12px] text-black/80 shadow-md backdrop-blur-xl dark:border-white/15 dark:bg-[#2a2a2c]/90 dark:text-white/85"
          style={{ left: tip.x }}
        >
          {tip.name}
        </div>
      )}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          setTip(null);
        }}
        className="pointer-events-auto flex max-w-[96vw] items-end gap-2 overflow-x-auto rounded-[22px] border border-white/40 bg-white/30 px-2.5 pb-1.5 pt-2 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:border-white/15 dark:bg-[#1c1c1e]/40"
      >
        {DOCK_APPS.map((app) => (
          <DockItem
            key={app.id}
            id={app.id}
            name={app.name}
            mouseX={mouseX}
            isOpen={app.opens && openApps.includes(app.id as AppId)}
            onClick={() => app.opens && onAppClick(app.id as AppId)}
            decorative={!app.opens}
            iconRefs={iconRefs}
            onTip={setTip}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DockItem({
  id,
  name,
  mouseX,
  isOpen,
  onClick,
  decorative,
  iconRefs,
  onTip,
}: {
  id: DockIconId;
  name: string;
  mouseX: MotionValue<number>;
  isOpen: boolean;
  onClick: () => void;
  decorative: boolean;
  iconRefs: MutableRefObject<Map<string, HTMLElement>>;
  onTip: (tip: { name: string; x: number } | null) => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  // distance from cursor to this icon's center → target size, smoothed by a spring
  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return x - (bounds.left + bounds.width / 2);
  });
  const targetSize = useTransform(distance, [-REACH, 0, REACH], [BASE_SIZE, MAX_SIZE, BASE_SIZE]);
  const size = useSpring(targetSize, { mass: 0.1, stiffness: 180, damping: 14 });

  // Report this icon's live center to the dock-level tooltip. Measured on
  // every mouse move so the label keeps tracking the icon while
  // magnification shifts it (the size spring animates without re-rendering).
  const reportTip = () => {
    const bounds = ref.current?.getBoundingClientRect();
    if (bounds) onTip({ name, x: bounds.left + bounds.width / 2 });
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        ref={(el: HTMLButtonElement | null) => {
          // used for magnification math AND registered for the window
          // minimize animation to aim at
          ref.current = el;
          if (el) iconRefs.current.set(id, el);
          else iconRefs.current.delete(id);
        }}
        aria-label={name}
        style={{ width: size, height: size }}
        onClick={onClick}
        onMouseEnter={reportTip}
        onMouseMove={reportTip}
        onMouseLeave={() => onTip(null)}
        className={`shrink-0 ${decorative ? "cursor-default" : ""}`}
      >
        <DockIcon id={id} className="h-full w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
      </motion.button>
      {/* running-app indicator */}
      <div
        className={`mt-[3px] h-1 w-1 rounded-full ${
          isOpen ? "bg-black/50 dark:bg-white/70" : "bg-transparent"
        }`}
      />
    </div>
  );
}
