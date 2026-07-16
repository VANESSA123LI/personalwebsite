"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DOCK_APPS, WALLPAPER, type AppId } from "./config";
import { clearDesktopStorage, loadJSON, PERSIST, saveJSON, STORAGE_KEYS } from "./storage";
import AboutThisMac from "./AboutThisMac";
import Dock from "./Dock";
import MenuBar from "./MenuBar";
import Window, { type WinGeom } from "./Window";
import ClaudeApp from "./apps/Claude";
import MessagesApp from "./apps/Messages";
import NotesApp from "./apps/Notes";
import PhotosApp from "./apps/Photos";
import RemindersApp from "./apps/Reminders";

/*
 * The desktop shell: wallpaper, menu bar, dock, and the window manager.
 * Each window tracks { open, minimized, maximized, z, geom }; the whole
 * layout (plus the theme) persists to localStorage and is re-clamped to the
 * viewport on load. Dock clicks open, restore, or focus; the menu bar's app
 * name follows the frontmost non-minimized window.
 */

type WindowKey = AppId | "about";

interface WinDef {
  title: string;
  geom: WinGeom;
  minW: number;
  minH: number;
  resizable: boolean;
  maximizable: boolean;
  openByDefault?: boolean;
}

/** Default geometry per window — offset so windows don't perfectly overlap. */
const WINDOW_DEFS: Record<WindowKey, WinDef> = {
  notes: {
    title: "Notes",
    geom: { x: 110, y: 56, w: 760, h: 500 },
    minW: 560,
    minH: 380,
    resizable: true,
    maximizable: true,
    openByDefault: true,
  },
  messages: {
    title: "Messages",
    geom: { x: 190, y: 96, w: 720, h: 480 },
    minW: 540,
    minH: 360,
    resizable: true,
    maximizable: true,
  },
  reminders: {
    title: "Reminders",
    geom: { x: 270, y: 76, w: 620, h: 440 },
    minW: 460,
    minH: 330,
    resizable: true,
    maximizable: true,
  },
  photos: {
    title: "Photos",
    geom: { x: 230, y: 64, w: 800, h: 540 },
    minW: 560,
    minH: 380,
    resizable: true,
    maximizable: true,
  },
  claude: {
    title: "Claude",
    geom: { x: 170, y: 48, w: 880, h: 560 },
    minW: 660,
    minH: 420,
    resizable: true,
    maximizable: true,
  },
  // About This Mac is fixed-size and not zoomable, like the real one.
  about: {
    title: "",
    geom: { x: 560, y: 110, w: 300, h: 470 },
    minW: 300,
    minH: 470,
    resizable: false,
    maximizable: false,
  },
};

const WINDOW_KEYS = Object.keys(WINDOW_DEFS) as WindowKey[];

interface WinState {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
  geom: WinGeom;
}

interface PersistedWindows {
  wins: Record<WindowKey, WinState>;
  zTop: number;
}

const APP_CONTENT: Record<WindowKey, React.ReactNode> = {
  notes: <NotesApp />,
  messages: <MessagesApp />,
  reminders: <RemindersApp />,
  photos: <PhotosApp />,
  claude: <ClaudeApp />,
  about: <AboutThisMac />,
};

function clampNum(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), Math.max(lo, hi));
}

/** Keep a persisted geometry sane and on-screen for the current viewport.
    Floors guarantee positive sizes even if the area measures absurdly small. */
function clampGeom(g: WinGeom, def: WinDef, aw: number, ah: number): WinGeom {
  const maxW = Math.max(aw - 16, 240);
  const maxH = Math.max(ah - 16, 200);
  const w = clampNum(g.w, Math.min(def.minW, maxW), maxW);
  const h = clampNum(g.h, Math.min(def.minH, maxH), maxH);
  const x = clampNum(g.x, 8, Math.max(8, aw - w - 8));
  const y = clampNum(g.y, 0, Math.max(0, ah - 60));
  return { x, y, w, h };
}

/** Fresh closed-window state — the fallback whenever a key is missing from
    `wins` (e.g. in-memory state from before a new window was added, kept
    alive across a Fast Refresh). */
function defaultWinState(k: WindowKey): WinState {
  return {
    open: false,
    minimized: false,
    maximized: false,
    z: 0,
    geom: { ...WINDOW_DEFS[k].geom },
  };
}

function isValidWinState(s: unknown): s is WinState {
  if (typeof s !== "object" || s === null) return false;
  const c = s as WinState;
  return (
    typeof c.open === "boolean" &&
    typeof c.minimized === "boolean" &&
    typeof c.maximized === "boolean" &&
    typeof c.z === "number" &&
    typeof c.geom === "object" &&
    c.geom !== null &&
    [c.geom.x, c.geom.y, c.geom.w, c.geom.h].every(Number.isFinite) &&
    // self-heal from any previously persisted degenerate geometry
    c.geom.w >= 120 &&
    c.geom.h >= 120
  );
}

export default function Desktop() {
  const [dark, setDark] = useState(false);
  // null until hydrated from localStorage — windows render after that tick.
  const [wins, setWins] = useState<Record<WindowKey, WinState> | null>(null);
  // Per-window transform offset toward its dock icon, set at minimize time.
  const [minDeltas, setMinDeltas] = useState<
    Partial<Record<WindowKey, { dx: number; dy: number }>>
  >({});
  const zRef = useRef(10);
  const desktopRef = useRef<HTMLDivElement>(null);
  // Dock icons register themselves here so minimize can aim at them.
  const dockIconRefs = useRef(new Map<string, HTMLElement>());

  /* ---- Hydrate theme + window layout (client-only) ---- */
  useEffect(() => {
    // With persistence off, wipe any leftover session data up front so a
    // refresh always starts from the default display.
    if (!PERSIST) clearDesktopStorage();
    const storedTheme = loadJSON<"light" | "dark" | null>(STORAGE_KEYS.theme, null);
    if (storedTheme) setDark(storedTheme === "dark");
    else setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);

    const stored = loadJSON<PersistedWindows | null>(STORAGE_KEYS.windows, null);
    // Clamp against the viewport, not a DOM measurement — this effect can
    // beat the stylesheet load, when element rects are still meaningless.
    // A viewport reporting an implausible size (embedded browsers can claim
    // 0×0 while settling) isn't trusted at all: geometry stays as-is and the
    // resize listener below re-clamps once real numbers arrive.
    // (28px ≈ menu bar height.)
    const trustViewport = window.innerWidth >= 320 && window.innerHeight >= 240;
    const aw = window.innerWidth;
    const ah = Math.max(window.innerHeight - 28, 240);
    // Phone-sized viewports show open windows maximized — free-floating
    // desktop-sized windows aren't usable on a small touch screen.
    const compact = trustViewport && aw < 640;
    const next = {} as Record<WindowKey, WinState>;
    for (const k of WINDOW_KEYS) {
      const def = WINDOW_DEFS[k];
      const s = stored?.wins?.[k];
      const base: WinState =
        s && isValidWinState(s)
          ? { ...s, geom: { ...s.geom } }
          : {
              open: !!def.openByDefault,
              minimized: false,
              maximized: false,
              z: def.openByDefault ? 10 : 0,
              geom: { ...def.geom },
            };
      if (trustViewport) base.geom = clampGeom(base.geom, def, aw, ah);
      if (compact && base.open && def.maximizable) base.maximized = true;
      next[k] = base;
    }
    zRef.current = Math.max(stored?.zTop ?? 10, ...Object.values(next).map((w) => w.z));
    setWins(next);
  }, []);

  /* ---- Re-clamp window geometry when the viewport changes ----
     Keeps windows reachable after a browser resize, and self-heals layouts
     hydrated while the viewport was still settling. */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        // ignore implausible viewport reports (see hydration note above)
        if (window.innerWidth < 320 || window.innerHeight < 240) return;
        setWins((ws) => {
          if (!ws) return ws;
          const aw = window.innerWidth;
          const ah = Math.max(window.innerHeight - 28, 240);
          const next = { ...ws };
          for (const k of WINDOW_KEYS) {
            const st = next[k] ?? defaultWinState(k);
            next[k] = { ...st, geom: clampGeom(st.geom, WINDOW_DEFS[k], aw, ah) };
          }
          return next;
        });
      }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ---- Persist layout (debounced; geometry only commits at gesture end) ---- */
  useEffect(() => {
    if (!wins) return;
    const t = setTimeout(
      () => saveJSON(STORAGE_KEYS.windows, { wins, zTop: zRef.current }),
      250
    );
    return () => clearTimeout(t);
  }, [wins]);

  // Flush the layout when the tab hides/closes so a drag followed by an
  // immediate tab-close isn't lost to the debounce window.
  const winsRef = useRef<Record<WindowKey, WinState> | null>(null);
  winsRef.current = wins;
  useEffect(() => {
    const flush = () => {
      if (winsRef.current)
        saveJSON(STORAGE_KEYS.windows, { wins: winsRef.current, zTop: zRef.current });
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  const toggleDark = () =>
    setDark((d) => {
      saveJSON(STORAGE_KEYS.theme, d ? "light" : "dark");
      return !d;
    });

  /* ---- Window operations ---- */

  const patchWin = (k: WindowKey, patch: Partial<WinState>) =>
    setWins((ws) =>
      ws ? { ...ws, [k]: { ...(ws[k] ?? defaultWinState(k)), ...patch } } : ws
    );

  /** Open if closed, restore if minimized, raise to front otherwise. */
  const focusWindow = (k: WindowKey) =>
    setWins((ws) => {
      if (!ws) return ws;
      const st = ws[k] ?? defaultWinState(k);
      const topZ = Math.max(
        0,
        ...Object.values(ws).filter((w) => w?.open).map((w) => w.z)
      );
      if (st.open && !st.minimized && st.z === topZ) return ws; // already front
      // Windows opened on a phone-sized viewport start maximized (see the
      // hydration note); restoring a minimized one keeps its existing state.
      const compact = window.innerWidth < 640 && window.innerWidth >= 320;
      const maximized =
        st.maximized || (!st.open && compact && WINDOW_DEFS[k].maximizable);
      return {
        ...ws,
        [k]: { ...st, open: true, minimized: false, maximized, z: ++zRef.current },
      };
    });

  const closeWindow = (k: WindowKey) => patchWin(k, { open: false });

  const toggleMaximize = (k: WindowKey) =>
    setWins((ws) => {
      if (!ws) return ws;
      const st = ws[k] ?? defaultWinState(k);
      return { ...ws, [k]: { ...st, maximized: !st.maximized } };
    });

  /** Minimize toward the app's dock icon (bottom-center fallback). */
  const minimizeWindow = (k: WindowKey) => {
    const st = wins?.[k];
    const area = desktopRef.current?.getBoundingClientRect();
    if (st && area) {
      const g = st.maximized
        ? { x: 0, y: 0, w: area.width, h: area.height }
        : st.geom;
      const winCx = area.left + g.x + g.w / 2;
      const winCy = area.top + g.y + g.h / 2;
      const icon = dockIconRefs.current.get(k)?.getBoundingClientRect();
      const tx = icon ? icon.left + icon.width / 2 : area.left + area.width / 2;
      const ty = icon ? icon.top + icon.height / 2 : area.bottom - 30;
      setMinDeltas((d) => ({ ...d, [k]: { dx: tx - winCx, dy: ty - winCy } }));
    }
    patchWin(k, { minimized: true });
  };

  /* ---- Derived state ---- */

  const openKeys = wins ? WINDOW_KEYS.filter((k) => wins[k]?.open) : [];
  // Dock dots include minimized apps (they're still "running").
  const openApps = openKeys.filter((k): k is AppId => k !== "about");

  // Frontmost visible window drives focus styling + the menu bar app name
  // (the About panel doesn't claim the menu bar, like real macOS).
  const visibleByZ = wins
    ? openKeys
        .filter((k) => !wins[k].minimized)
        .sort((a, b) => wins[b].z - wins[a].z)
    : [];
  const frontKey = visibleByZ[0];
  const frontApp = visibleByZ.find((k) => k !== "about");
  const frontAppName = frontApp
    ? DOCK_APPS.find((a) => a.id === frontApp)?.name ?? "Finder"
    : "Finder";

  return (
    <div className={`macos-root ${dark ? "dark" : ""}`}>
      <div className="relative flex h-dvh w-full flex-col overflow-hidden">
        {/* ---- Wallpaper (two layers crossfade on theme change) ---- */}
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-700"
          style={{ background: WALLPAPER.light, opacity: dark ? 0 : 1 }}
        />
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-700"
          style={{ background: WALLPAPER.dark, opacity: dark ? 1 : 0 }}
        />

        <div className="select-none">
          <MenuBar
            appName={frontAppName}
            dark={dark}
            onToggleDark={toggleDark}
            onAboutClick={() => focusWindow("about")}
          />
        </div>

        {/* ---- Desktop area: windows live (and drag) inside this box ---- */}
        <div ref={desktopRef} className="relative min-h-0 flex-1">
          <AnimatePresence>
            {wins &&
              openKeys.map((key) => {
                const def = WINDOW_DEFS[key];
                const st = wins[key];
                return (
                  <Window
                    key={key}
                    title={def.title}
                    geom={st.geom}
                    minW={def.minW}
                    minH={def.minH}
                    resizable={def.resizable}
                    maximizable={def.maximizable}
                    maximized={st.maximized}
                    minimized={st.minimized}
                    minimizeDelta={minDeltas[key] ?? null}
                    zIndex={st.z}
                    focused={key === frontKey}
                    desktopRef={desktopRef}
                    onClose={() => closeWindow(key)}
                    onMinimize={() => minimizeWindow(key)}
                    onToggleMaximize={() => toggleMaximize(key)}
                    onFocus={() => focusWindow(key)}
                    onGeomChange={(g) => patchWin(key, { geom: g })}
                  >
                    {APP_CONTENT[key]}
                  </Window>
                );
              })}
          </AnimatePresence>
        </div>

        <div className="select-none">
          <Dock
            openApps={openApps}
            onAppClick={focusWindow}
            iconRefs={dockIconRefs}
          />
        </div>
      </div>
    </div>
  );
}
