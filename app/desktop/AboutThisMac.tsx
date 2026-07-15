"use client";

import { SYSTEM_INFO } from "./config";

/*
 * "About This Mac" panel content (rendered inside a small Window).
 * All specs come from SYSTEM_INFO in config.ts.
 */

export default function AboutThisMac() {
  const s = SYSTEM_INFO;
  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-6 pb-5 pt-2 text-center macos-scroll">
      <LaptopArt />

      <h2 className="mt-4 text-[19px] font-semibold text-black/90 dark:text-white/90">
        {s.deviceName}
      </h2>
      <p className="mt-0.5 text-[12px] text-black/45 dark:text-white/45">{s.deviceSubtitle}</p>

      <dl className="mt-4 grid grid-cols-[auto_auto] justify-center gap-x-3 gap-y-[3px] text-[12px]">
        <SpecRow label="Chip" value={s.chip} />
        <SpecRow label="Memory" value={s.memory} />
        <SpecRow label="Startup disk" value={s.startupDisk} />
        <SpecRow label="Serial number" value={s.serial} />
        <SpecRow label={s.osName} value={s.osVersion} />
      </dl>

      <button className="mt-5 cursor-default rounded-md bg-black/[0.07] px-3.5 py-1 text-[12px] text-black/80 shadow-sm dark:bg-white/15 dark:text-white/85">
        More Info…
      </button>

      <p className="mt-4 text-[10px] leading-relaxed text-black/35 dark:text-white/35">
        Regulatory Certification
        <br />™ and © 1983–2026 Apple Inc.
        <br />
        All Rights Reserved.
      </p>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-right font-semibold text-black/85 dark:text-white/85">{label}</dt>
      <dd className="text-left text-black/55 dark:text-white/55">{value}</dd>
    </>
  );
}

/* A simple MacBook illustration with the wallpaper's gradient on screen. */
function LaptopArt() {
  return (
    <svg viewBox="0 0 180 110" className="mt-1 w-[170px]">
      <defs>
        <linearGradient id="about-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ea6da" />
          <stop offset="55%" stopColor="#c4b3d9" />
          <stop offset="100%" stopColor="#e2af97" />
        </linearGradient>
      </defs>
      {/* lid */}
      <rect x="34" y="8" width="112" height="76" rx="6" className="fill-[#3a3a3c] dark:fill-[#0f0f10]" />
      <rect x="39" y="13" width="102" height="66" rx="2.5" fill="url(#about-screen)" />
      {/* base */}
      <rect x="16" y="86" width="148" height="7" rx="3.5" className="fill-[#b9bcc2] dark:fill-[#5a5a5e]" />
      <rect x="76" y="86" width="28" height="3" rx="1.5" className="fill-[#9a9da3] dark:fill-[#3f3f43]" />
    </svg>
  );
}
