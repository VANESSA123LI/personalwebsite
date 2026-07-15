"use client";

import { useEffect, useState } from "react";
import { BATTERY, WIFI } from "./config";

/*
 * The translucent macOS menu bar: Apple menu (with a working "About This
 * Mac"), the frontmost app's name, standard menu titles, and right-side
 * status items — dark-mode toggle, Control Center popover, wifi, battery,
 * live clock (1s tick). Popovers close on outside click and Escape.
 */

interface MenuBarProps {
  appName: string;
  dark: boolean;
  onToggleDark: () => void;
  onAboutClick: () => void;
}

const MENU_TITLES = ["File", "Edit", "View", "Window", "Help"];

export default function MenuBar({ appName, dark, onToggleDark, onAboutClick }: MenuBarProps) {
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [ccOpen, setCcOpen] = useState(false);
  // Which status icon is being hovered — its panel shows while the mouse
  // stays over the icon or the panel itself.
  const [hoverPanel, setHoverPanel] = useState<"wifi" | "battery" | null>(null);

  // Escape dismisses any open popover, like macOS.
  useEffect(() => {
    if (!appleMenuOpen && !ccOpen && !hoverPanel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAppleMenuOpen(false);
        setCcOpen(false);
        setHoverPanel(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [appleMenuOpen, ccOpen, hoverPanel]);

  return (
    <header className="relative z-[9000] flex h-7 items-center gap-1 bg-white/40 px-2 text-[13px] text-black/85 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl dark:bg-black/30 dark:text-white/90">
      {/* ---- Apple menu ---- */}
      <button
        aria-label="Apple menu"
        onClick={() => setAppleMenuOpen((v) => !v)}
        className={`rounded px-2.5 py-0.5 transition-colors ${
          appleMenuOpen ? "bg-black/10 dark:bg-white/15" : "hover:bg-black/5 dark:hover:bg-white/10"
        }`}
      >
        <AppleLogo />
      </button>
      {appleMenuOpen && (
        <AppleMenu
          onAbout={() => {
            setAppleMenuOpen(false);
            onAboutClick();
          }}
          onDismiss={() => setAppleMenuOpen(false)}
        />
      )}

      <span className="px-2 font-semibold">{appName}</span>
      <nav className="hidden gap-0 sm:flex">
        {MENU_TITLES.map((t) => (
          <span key={t} className="cursor-default rounded px-2 py-0.5">
            {t}
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      {/* ---- Status items ---- */}
      <button
        aria-label="Toggle dark mode"
        onClick={onToggleDark}
        className="rounded px-1.5 py-0.5 hover:bg-black/5 dark:hover:bg-white/10"
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {dark ? <MoonIcon /> : <SunIcon />}
      </button>
      {/* Wi-Fi: hover shows nearby networks (data from WIFI in config.ts) */}
      <div
        className="relative flex items-center"
        onMouseEnter={() => setHoverPanel("wifi")}
        onMouseLeave={() => setHoverPanel((p) => (p === "wifi" ? null : p))}
      >
        <span className="px-1.5" aria-label="Wi-Fi">
          <WifiIcon />
        </span>
        {hoverPanel === "wifi" && <WifiPanel />}
      </div>
      {/* Battery: hover shows charge, energy modes + hungry apps (BATTERY in config.ts) */}
      <div
        className="relative flex items-center"
        onMouseEnter={() => setHoverPanel("battery")}
        onMouseLeave={() => setHoverPanel((p) => (p === "battery" ? null : p))}
      >
        <span className="px-1.5" aria-label="Battery">
          <BatteryIcon />
        </span>
        {hoverPanel === "battery" && <BatteryPanel />}
      </div>
      <button
        aria-label="Control Center"
        onClick={() => setCcOpen((v) => !v)}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          ccOpen ? "bg-black/10 dark:bg-white/15" : "hover:bg-black/5 dark:hover:bg-white/10"
        }`}
      >
        <ControlCenterIcon />
      </button>
      {ccOpen && <ControlCenter onDismiss={() => setCcOpen(false)} />}
      <Clock />
    </header>
  );
}

/* ---- Control Center ----
   Compact macOS-style popover: placeholder wifi/bluetooth/do-not-disturb
   toggles plus Display and Sound sliders. Everything is visual-only session
   state — nothing persists or affects the page. */
function ControlCenter({ onDismiss }: { onDismiss: () => void }) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(55);

  return (
    <>
      {/* click-away layer */}
      <div className="fixed inset-0 z-[9001]" onClick={onDismiss} />
      <div className="absolute right-2 top-[30px] z-[9002] w-[300px] rounded-2xl border border-black/10 bg-white/80 p-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#2a2a2c]/85">
        <div className="grid grid-cols-3 gap-2">
          <CCToggle label="Wi-Fi" on={wifi} onToggle={() => setWifi((v) => !v)} icon={<WifiIcon />} />
          <CCToggle
            label="Bluetooth"
            on={bluetooth}
            onToggle={() => setBluetooth((v) => !v)}
            icon={<BluetoothIcon />}
          />
          <CCToggle
            label="Do Not Disturb"
            on={dnd}
            onToggle={() => setDnd((v) => !v)}
            icon={<MoonIcon />}
          />
        </div>
        <CCSlider label="Display" value={brightness} onChange={setBrightness} icon={<SunIcon />} />
        <CCSlider label="Sound" value={volume} onChange={setVolume} icon={<SpeakerIcon />} />
      </div>
    </>
  );
}

function CCToggle({
  label,
  on,
  onToggle,
  icon,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex flex-col items-center gap-1 rounded-xl bg-black/5 px-1 py-2 dark:bg-white/10"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          on
            ? "bg-[#007aff] text-white"
            : "bg-black/15 text-black/60 dark:bg-white/20 dark:text-white/70"
        }`}
      >
        {icon}
      </span>
      <span className="text-center text-[10px] leading-tight text-black/75 dark:text-white/80">
        {label}
      </span>
    </button>
  );
}

/* ---- Hover panels for the wifi + battery status icons ----
   The pt-1.5 wrapper bridges the gap under the menu bar so the pointer can
   travel from the icon into the panel without the hover state dropping. */
function HoverPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 top-full z-[9002] pt-1.5">
      <div className="w-[280px] rounded-xl border border-black/10 bg-white/85 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#2a2a2c]/90">
        {children}
      </div>
    </div>
  );
}

function PanelHeader({ label, right }: { label: string; right?: string }) {
  return (
    <div className="flex items-baseline justify-between px-2.5 pb-1 pt-1.5">
      <span className="text-[13px] font-bold text-black/85 dark:text-white/90">{label}</span>
      {right && <span className="text-[12px] text-black/45 dark:text-white/45">{right}</span>}
    </div>
  );
}

function PanelSection({ label }: { label: string }) {
  return (
    <div className="px-2.5 pb-0.5 pt-2 text-[11px] font-semibold text-black/40 dark:text-white/40">
      {label}
    </div>
  );
}

function PanelDivider() {
  return <div className="mx-2.5 my-1 h-px bg-black/10 dark:bg-white/15" />;
}

/* Everything in these panels is decorative — rows don't respond to clicks. */
function WifiPanel() {
  return (
    <HoverPanel>
      <PanelHeader label="Wi-Fi" />
      <PanelSection label="Known Network" />
      <NetworkRow name={WIFI.connected} connected />
      <PanelSection label="Other Networks" />
      {WIFI.otherNetworks.map((name) => (
        <NetworkRow key={name} name={name} />
      ))}
      <PanelDivider />
      <div className="cursor-default rounded-md px-2.5 py-1 text-[13px] text-black/80 dark:text-white/85">
        Wi-Fi Settings…
      </div>
    </HoverPanel>
  );
}

function NetworkRow({ name, connected }: { name: string; connected?: boolean }) {
  return (
    <div className="flex cursor-default items-center gap-2 rounded-md px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          connected
            ? "bg-[#007aff] text-white"
            : "bg-black/10 text-black/60 dark:bg-white/15 dark:text-white/70"
        }`}
      >
        <WifiIcon />
      </span>
      <span className="min-w-0 flex-1 truncate text-[13px] text-black/85 dark:text-white/90">
        {name}
      </span>
      <LockIcon />
      <WifiIcon />
    </div>
  );
}

function BatteryPanel() {
  const modes: (typeof BATTERY.energyMode)[] = ["Low Power", "Automatic", "High Power"];
  return (
    <HoverPanel>
      <PanelHeader label="Battery" right={`${BATTERY.percent}%`} />
      <div className="px-2.5 pb-1 text-[12px] text-black/45 dark:text-white/45">
        Power Source: {BATTERY.powerSource}
      </div>
      <PanelDivider />
      <PanelSection label="Energy Mode" />
      {modes.map((mode) => (
        <div
          key={mode}
          className="flex cursor-default items-center gap-2 rounded-md px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10"
        >
          <span className="w-4 text-center text-[12px] text-[#007aff]">
            {mode === BATTERY.energyMode ? "✓" : ""}
          </span>
          <span className="text-[13px] text-black/85 dark:text-white/90">{mode}</span>
        </div>
      ))}
      <PanelDivider />
      <PanelSection label="Using Significant Energy" />
      {BATTERY.significantEnergyApps.map((app) => (
        <div
          key={app}
          className="flex cursor-default items-center gap-2 rounded-md px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10"
        >
          <EnergyAppIcon app={app} />
          <span className="text-[13px] text-black/85 dark:text-white/90">{app}</span>
        </div>
      ))}
      <PanelDivider />
      <div className="cursor-default rounded-md px-2.5 py-1 text-[13px] text-black/80 dark:text-white/85">
        Battery Settings…
      </div>
    </HoverPanel>
  );
}

/* Tiny recognizable glyphs for the energy-hungry apps. */
function EnergyAppIcon({ app }: { app: string }) {
  if (app.toLowerCase().includes("chrome")) return <ChromeGlyph />;
  if (app.toLowerCase().includes("claude")) return <ClaudeGlyph />;
  return <span className="h-4 w-4 rounded bg-black/15 dark:bg-white/20" />;
}

function ClaudeGlyph() {
  // Claude's starburst, simplified to an 8-ray asterisk
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <g stroke="#d97757" strokeWidth="2.6" strokeLinecap="round">
        <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
      </g>
    </svg>
  );
}

function ChromeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <path d="M12 2a10 10 0 0 1 8.66 5H12a5 5 0 0 0-4.6 3.03L4.07 5.98A10 10 0 0 1 12 2z" fill="#ea4335" />
      <path d="M21.95 11A10 10 0 0 1 12 22l4.33-7.5A5 5 0 0 0 17 12c0-.34-.03-.67-.1-1h5.05z" fill="#fbbc05" />
      <path d="M11.5 21.99A10 10 0 0 1 3.34 7.3l4.06 7.03a5 5 0 0 0 4.42 2.66z" fill="#34a853" />
      <circle cx="12" cy="12" r="4" fill="#fff" />
      <circle cx="12" cy="12" r="3.1" fill="#4285f4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[11px] w-[11px] fill-none stroke-current opacity-50" strokeWidth="2">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" className="fill-current" strokeWidth="0" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function CCSlider({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="mt-2 rounded-xl bg-black/5 px-2.5 py-2 dark:bg-white/10">
      <div className="mb-1 text-[11px] font-medium text-black/75 dark:text-white/80">{label}</div>
      <div className="flex items-center gap-2 text-black/50 dark:text-white/60">
        {icon}
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="h-1 w-full accent-[#007aff]"
        />
      </div>
    </div>
  );
}

/* Live clock ticking every second, formatted like macOS: "Sat Jul 12  9:41 AM".
   Rendered only after mount to avoid a server/client hydration mismatch. */
function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) return <span className="w-32" />;
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return (
    <span className="cursor-default whitespace-nowrap px-2 tabular-nums">
      {date}&ensp;{time}
    </span>
  );
}

function AppleMenu({ onAbout, onDismiss }: { onAbout: () => void; onDismiss: () => void }) {
  return (
    <>
      {/* click-away layer */}
      <div className="fixed inset-0 z-[9001]" onClick={onDismiss} />
      <div className="absolute left-2 top-[30px] z-[9002] w-56 rounded-lg border border-black/10 bg-white/80 p-1 text-[13px] shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#2a2a2c]/85 dark:text-white/90">
        <MenuItem label="About This Mac" onClick={onAbout} />
        <MenuSeparator />
        <MenuItem label="System Settings…" disabled />
        <MenuItem label="App Store…" disabled />
        <MenuSeparator />
        <MenuItem label="Sleep" disabled />
        <MenuItem label="Restart…" disabled />
        <MenuItem label="Shut Down…" disabled />
        <MenuSeparator />
        <MenuItem label="Lock Screen" disabled />
      </div>
    </>
  );
}

function MenuItem({ label, onClick, disabled }: { label: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`block w-full rounded-md px-2.5 py-1 text-left ${
        disabled
          ? "cursor-default text-black/35 dark:text-white/35"
          : "hover:bg-[#007aff] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function MenuSeparator() {
  return <div className="mx-2.5 my-1 h-px bg-black/10 dark:bg-white/15" />;
}

/* ---- Status icons (13-15px inline SVGs) ---- */

function AppleLogo() {
  return (
    <svg viewBox="0 0 814 1000" className="h-[13px] w-[13px] fill-current">
      <path d="M788 341c-6 4-109 62-109 190 0 148 130 200 134 202-1 3-21 71-69 141-43 61-88 122-156 122s-86-40-165-40c-77 0-104 41-167 41s-107-57-157-126C41 788 0 665 0 548c0-187 122-286 242-286 64 0 117 42 157 42 38 0 97-45 170-45 27 0 127 3 219 82zM554 172c32-38 55-90 55-143 0-7-1-15-2-21-52 2-114 35-152 78-29 33-57 86-57 139 0 8 1 16 2 19 3 1 9 1 14 1 47 0 106-31 140-73z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current">
      <path d="M20.6 14.6A8.6 8.6 0 0 1 9.4 3.4 8.9 8.9 0 1 0 20.6 14.6z" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round">
      <path d="M2.5 9.2a14.5 14.5 0 0 1 19 0" />
      <path d="M5.8 12.9a9.6 9.6 0 0 1 12.4 0" />
      <path d="M9.1 16.5a4.8 4.8 0 0 1 5.8 0" />
      <circle cx="12" cy="19.5" r="1.15" className="fill-current" strokeWidth="0" />
    </svg>
  );
}

function ControlCenterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-current" strokeWidth="1.7">
      <rect x="2" y="4.2" width="20" height="6.6" rx="3.3" />
      <circle cx="6.2" cy="7.5" r="1.7" className="fill-current" strokeWidth="0" />
      <rect x="2" y="13.2" width="20" height="6.6" rx="3.3" />
      <circle cx="17.8" cy="16.5" r="1.7" className="fill-current" strokeWidth="0" />
    </svg>
  );
}

function BluetoothIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[14px] w-[14px] fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7.5l10 9L12 21V3l5 4.5-10 9" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[14px] w-[14px] fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" className="fill-current" strokeWidth="0" />
      <path d="M15 9a4.2 4.2 0 0 1 0 6M17.5 6.8a7.6 7.6 0 0 1 0 10.4" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 28 14" className="h-[13px] w-[26px]">
      <rect x="0.75" y="0.75" width="23" height="12.5" rx="3.2" className="fill-none stroke-current opacity-50" strokeWidth="1.1" />
      <path d="M25.5 4.8v4.4a2.4 2.4 0 0 0 0-4.4z" className="fill-current opacity-50" />
      <rect x="2.4" y="2.4" width="16.5" height="9.2" rx="1.8" className="fill-current" />
    </svg>
  );
}
