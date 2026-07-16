"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";

/*
 * Reusable macOS window chrome with real window management:
 * - drag by the title bar, resize from any edge/corner (manual pointer
 *   gestures on motion values — no re-render churn while dragging)
 * - red closes, yellow minimizes into the dock, green toggles maximize
 * - geometry is committed to the parent at gesture end so it can persist
 * - unfocused windows dim slightly and grey their traffic lights
 * Open/close enter/exit animation is handled by <AnimatePresence> in the
 * parent; minimize/restore animates on the transform channel (scale + x/y)
 * while position/size live on left/top/width/height, so they never fight.
 */

export interface WinGeom {
  x: number;
  y: number;
  w: number;
  h: number;
}

type Dir = "move" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

/** Resize hit areas: thin strips on edges, small squares on corners. */
const HANDLES: { dir: Dir; cls: string }[] = [
  { dir: "n", cls: "-top-1 left-2 right-2 h-2 cursor-ns-resize" },
  { dir: "s", cls: "-bottom-1 left-2 right-2 h-2 cursor-ns-resize" },
  { dir: "w", cls: "-left-1 top-2 bottom-2 w-2 cursor-ew-resize" },
  { dir: "e", cls: "-right-1 top-2 bottom-2 w-2 cursor-ew-resize" },
  { dir: "nw", cls: "-left-1 -top-1 h-3.5 w-3.5 cursor-nwse-resize" },
  { dir: "ne", cls: "-right-1 -top-1 h-3.5 w-3.5 cursor-nesw-resize" },
  { dir: "sw", cls: "-left-1 -bottom-1 h-3.5 w-3.5 cursor-nesw-resize" },
  { dir: "se", cls: "-right-1 -bottom-1 h-3.5 w-3.5 cursor-nwse-resize" },
];

const SPRING = { type: "spring", stiffness: 430, damping: 34, mass: 0.8 } as const;

/** Usable desktop-area bounds. Real measurements are trusted even when
    phone-small; the desktop-ish floor applies only while every measurement
    is implausible (some environments briefly report 0-size rects/viewports
    while settling). */
function areaBounds(area: DOMRect | undefined) {
  const w = Math.max(area?.width ?? 0, window.innerWidth);
  const h = Math.max(area?.height ?? 0, window.innerHeight - 28);
  return { aw: w >= 240 ? w : 640, ah: h >= 200 ? h : 480 };
}

export interface WindowProps {
  title: string;
  /** Committed geometry in desktop-area coordinates. */
  geom: WinGeom;
  minW: number;
  minH: number;
  resizable: boolean;
  maximizable: boolean;
  maximized: boolean;
  minimized: boolean;
  /** Transform offset toward the dock icon, computed at minimize time. */
  minimizeDelta: { dx: number; dy: number } | null;
  zIndex: number;
  focused: boolean;
  /** The desktop area element — drag bounds + maximize target. */
  desktopRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
  /** Called at the end of a drag/resize gesture with the final geometry. */
  onGeomChange: (geom: WinGeom) => void;
  children: ReactNode;
}

export default function Window({
  title,
  geom,
  minW,
  minH,
  resizable,
  maximizable,
  maximized,
  minimized,
  minimizeDelta,
  zIndex,
  focused,
  desktopRef,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onGeomChange,
  children,
}: WindowProps) {
  // live geometry — gestures write these directly for 60fps drag/resize
  const x = useMotionValue(geom.x);
  const y = useMotionValue(geom.y);
  const w = useMotionValue(geom.w);
  const h = useMotionValue(geom.h);
  const inGesture = useRef(false);
  const firstSync = useRef(true);

  // Sync motion values whenever committed geometry or maximize state changes
  // (restore-from-maximize, hydration). Skipped mid-gesture; instant on the
  // first run so a reloaded maximized window doesn't visibly animate.
  useEffect(() => {
    if (inGesture.current) return;
    const area = desktopRef.current?.getBoundingClientRect();
    const { aw, ah } = areaBounds(area);
    const target = maximized ? { x: 0, y: 0, w: aw, h: ah } : geom;
    const opts = firstSync.current ? { duration: 0 } : SPRING;
    firstSync.current = false;
    if (x.get() !== target.x) animate(x, target.x, opts);
    if (y.get() !== target.y) animate(y, target.y, opts);
    if (w.get() !== target.w) animate(w, target.w, opts);
    if (h.get() !== target.h) animate(h, target.h, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geom.x, geom.y, geom.w, geom.h, maximized]);

  // A maximized window must track browser resizes — the sync effect above
  // only re-runs when geom/maximized change, not when the viewport does.
  useEffect(() => {
    if (!maximized) return;
    const onResize = () => {
      if (inGesture.current) return;
      const area = desktopRef.current?.getBoundingClientRect();
      const { aw, ah } = areaBounds(area);
      w.set(aw);
      h.set(ah);
      x.set(0);
      y.set(0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximized]);

  /** Shared drag/resize gesture. Captures the pointer on the handle. */
  const beginGesture = (e: React.PointerEvent, dir: Dir) => {
    if (maximized || e.button !== 0) return;
    if (dir !== "move" && !resizable) return;
    e.preventDefault();
    const area = desktopRef.current?.getBoundingClientRect();
    const { aw, ah } = areaBounds(area);
    // the declared minimums can exceed a phone screen — never let a resize
    // force the window wider/taller than what fits
    const minWEff = Math.min(minW, aw - 16);
    const minHEff = Math.min(minH, ah - 16);
    const start = { px: e.clientX, py: e.clientY, x: x.get(), y: y.get(), w: w.get(), h: h.get() };
    const pointerId = e.pointerId;
    inGesture.current = true;
    const el = e.currentTarget as HTMLElement;
    // best-effort — capture keeps fast drags on-target, but the listeners
    // below live on window, so the gesture works without it
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic or already-released pointer */
    }

    const onMove = (ev: PointerEvent) => {
      // ignore other pointers (e.g. a second finger on a touchscreen)
      if (ev.pointerId !== pointerId) return;
      const dx = ev.clientX - start.px;
      const dy = ev.clientY - start.py;
      if (dir === "move") {
        // keep at least 100px of the window reachable, title bar on-screen
        x.set(clamp(start.x + dx, 100 - start.w, aw - 100));
        y.set(clamp(start.y + dy, 0, ah - 40));
        return;
      }
      if (dir.includes("e")) w.set(clamp(start.w + dx, minWEff, aw - start.x));
      if (dir.includes("s")) h.set(clamp(start.h + dy, minHEff, ah - start.y));
      if (dir.includes("w")) {
        const nw = clamp(start.w - dx, minWEff, start.x + start.w);
        x.set(start.x + start.w - nw);
        w.set(nw);
      }
      if (dir.includes("n")) {
        // north edge also may not push the window above the menu bar
        const nh = clamp(start.h - dy, minHEff, start.y + start.h);
        y.set(start.y + start.h - nh);
        h.set(nh);
      }
    };
    const onUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      try {
        el.releasePointerCapture(ev.pointerId);
      } catch {
        /* not captured */
      }
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      inGesture.current = false;
      onGeomChange({ x: x.get(), y: y.get(), w: w.get(), h: h.get() });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  // Minimize animates on the transform channel toward the dock icon;
  // normal state also carries the subtle unfocused dim.
  const pose = minimized
    ? {
        x: minimizeDelta?.dx ?? 0,
        y: minimizeDelta?.dy ?? 300,
        scale: 0.06,
        opacity: 0,
      }
    : { x: 0, y: 0, scale: 1, opacity: focused ? 1 : 0.97 };

  return (
    <motion.div
      className={`absolute rounded-xl border bg-[#f6f6f6]/80 backdrop-blur-2xl dark:bg-[#2a2a2c]/75 ${
        focused
          ? "border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.35),0_2px_10px_rgba(0,0,0,0.2)] dark:border-white/15"
          : "border-black/[0.08] shadow-[0_8px_28px_rgba(0,0,0,0.22)] dark:border-white/10"
      }`}
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        zIndex,
        pointerEvents: minimized ? "none" : "auto",
      }}
      initial={minimized ? false : { opacity: 0, scale: 0.92, y: 12 }}
      animate={pose}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.16 } }}
      transition={
        minimized !== undefined && minimized
          ? { duration: 0.3, ease: [0.45, 0, 0.7, 0.2] }
          : SPRING
      }
      onPointerDown={onFocus}
    >
      {/* rounded clip for title bar + content; resize handles stay outside it */}
      <div className="flex h-full flex-col overflow-hidden rounded-[inherit]">
        {/* ---- Title bar (drag handle) ---- */}
        <div
          className="relative flex h-10 shrink-0 cursor-default touch-none items-center border-b border-black/5 px-3 dark:border-white/5"
          onPointerDown={(e) => beginGesture(e, "move")}
        >
          <TrafficLights
            focused={focused}
            maximizable={maximizable}
            onClose={onClose}
            onMinimize={onMinimize}
            onToggleMaximize={onToggleMaximize}
          />
          <span
            className={`pointer-events-none absolute inset-x-0 text-center text-[13px] font-semibold ${
              focused ? "text-black/70 dark:text-white/70" : "text-black/35 dark:text-white/35"
            }`}
          >
            {title}
          </span>
        </div>

        {/* ---- App content ----
            @container lets app layouts respond to the WINDOW's width (not
            the viewport's) — panes collapse when the window itself is
            narrow, whether from a phone screen or a desktop resize. */}
        <div className="@container flex min-h-0 flex-1 flex-col">{children}</div>
      </div>

      {/* ---- Resize handles ---- */}
      {resizable &&
        !maximized &&
        HANDLES.map(({ dir, cls }) => (
          <div
            key={dir}
            className={`absolute touch-none ${cls}`}
            onPointerDown={(e) => {
              e.stopPropagation();
              onFocus();
              beginGesture(e, dir);
            }}
          />
        ))}
    </motion.div>
  );
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), Math.max(lo, hi));
}

/* Red closes, yellow minimizes, green toggles maximize (inert + greyed when
   the window isn't maximizable, like real macOS). Glyphs appear on group
   hover; all three grey out on unfocused windows. */
function TrafficLights({
  focused,
  maximizable,
  onClose,
  onMinimize,
  onToggleMaximize,
}: {
  focused: boolean;
  maximizable: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
}) {
  const inactive = "bg-black/15 dark:bg-white/20";
  return (
    <div
      className="group z-10 flex items-center gap-2"
      // don't let button presses start a window drag
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        aria-label="Close window"
        onClick={onClose}
        className={`traffic-light relative flex h-3 w-3 items-center justify-center rounded-full border border-black/[0.12] ${
          focused ? "bg-[#ff5f57]" : inactive
        }`}
      >
        <Glyph d="M3 3l4 4m0-4L3 7" />
      </button>
      <button
        aria-label="Minimize window"
        onClick={onMinimize}
        className={`traffic-light relative flex h-3 w-3 items-center justify-center rounded-full border border-black/[0.12] ${
          focused ? "bg-[#febc2e]" : inactive
        }`}
      >
        <Glyph d="M2.5 5h5" />
      </button>
      <button
        aria-label={maximizable ? "Zoom window" : "Zoom (unavailable)"}
        onClick={maximizable ? onToggleMaximize : undefined}
        className={`traffic-light relative flex h-3 w-3 items-center justify-center rounded-full border border-black/[0.12] ${
          maximizable ? (focused ? "bg-[#28c840]" : inactive) : `cursor-default ${inactive}`
        }`}
      >
        {maximizable && <Glyph d="M3.5 6.5L6.5 3.5M4 3.5h2.5V6" />}
      </button>
    </div>
  );
}

function Glyph({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className="h-2 w-2 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
    >
      <path d={d} stroke="rgba(0,0,0,0.55)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </svg>
  );
}
