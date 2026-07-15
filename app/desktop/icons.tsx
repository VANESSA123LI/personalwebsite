"use client";

/*
 * Dock icon set — pure inline SVG recreations of the macOS Sequoia app icons.
 * Every icon shares the same squircle base (16px transparent margin) and a
 * 512x512 viewBox so the dock can size them freely. Gradient ids are prefixed
 * per icon so several icons can render on the same page without collisions.
 *
 * To add an icon: extend DockIconId in ./config, add a component below, and
 * register it in the ICONS map at the bottom.
 */

import type { ReactElement } from "react";
import type { DockIconId } from "./config";

/* Shared squircle geometry (Apple app-icon shape). */
const SQ = { x: 16, y: 16, width: 480, height: 480, rx: 112 } as const;

/** The base app-icon squircle. */
function Squircle({ fill }: { fill: string }) {
  return <rect {...SQ} fill={fill} />;
}

/* ---- Finder: split blue face ------------------------------------------- */
function FinderIcon() {
  return (
    <>
      <defs>
        <linearGradient id="finder-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4dc6fa" />
          <stop offset="1" stopColor="#1ea7f2" />
        </linearGradient>
        <linearGradient id="finder-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2492f5" />
          <stop offset="1" stopColor="#0b6ff0" />
        </linearGradient>
        <clipPath id="finder-clip">
          <rect {...SQ} />
        </clipPath>
      </defs>
      <g clipPath="url(#finder-clip)">
        <rect x="16" y="16" width="240" height="480" fill="url(#finder-left)" />
        <rect x="256" y="16" width="240" height="480" fill="url(#finder-right)" />
      </g>
      {/* Face: two eyes + wide smile crossing both halves */}
      <g stroke="#123a66" strokeWidth="24" strokeLinecap="round" fill="none">
        <line x1="163" y1="170" x2="163" y2="252" />
        <line x1="349" y1="170" x2="349" y2="252" />
        <path d="M 108 316 Q 256 428 404 316" />
      </g>
    </>
  );
}

/* ---- Safari: compass dial + needle -------------------------------------- */
function SafariIcon() {
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15); // 12 big + 12 small
  return (
    <>
      <defs>
        <linearGradient id="safari-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e9e9ee" />
        </linearGradient>
        <radialGradient id="safari-dial" cx="0.5" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#1c9cf6" />
          <stop offset="1" stopColor="#0663e5" />
        </radialGradient>
      </defs>
      <Squircle fill="url(#safari-base)" />
      <circle cx="256" cy="256" r="196" fill="url(#safari-dial)" />
      {/* Rim tick marks: long every 30deg, short in between */}
      <g stroke="#ffffff" strokeLinecap="round">
        {ticks.map((deg) => (
          <line
            key={deg}
            x1="256"
            y1="74"
            x2="256"
            y2={deg % 30 === 0 ? 102 : 90}
            strokeWidth={deg % 30 === 0 ? 7 : 5}
            opacity={deg % 30 === 0 ? 0.95 : 0.6}
            transform={`rotate(${deg} 256 256)`}
          />
        ))}
      </g>
      {/* Needle: red north half, white south half, tilted 45deg */}
      <g transform="rotate(45 256 256)">
        <polygon points="256,92 290,256 222,256" fill="#ff3b30" />
        <polygon points="256,420 290,256 222,256" fill="#ffffff" />
      </g>
    </>
  );
}

/* ---- Mail: white envelope on blue ---------------------------------------- */
function MailIcon() {
  return (
    <>
      <defs>
        <linearGradient id="mail-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e8ff7" />
          <stop offset="1" stopColor="#0b60ee" />
        </linearGradient>
      </defs>
      <Squircle fill="url(#mail-bg)" />
      <rect x="92" y="148" width="328" height="216" rx="26" fill="#ffffff" />
      <g stroke="#2a8cf0" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Flap: V fold from the top corners to center */}
        <path d="M 100 162 L 256 284 L 412 162" />
        {/* Lower diagonal creases */}
        <path d="M 100 350 L 204 264" />
        <path d="M 412 350 L 308 264" />
      </g>
    </>
  );
}

/* ---- Photos: 8-petal pinwheel -------------------------------------------- */
const PHOTOS_PETALS = [
  "#ffcc00", // yellow
  "#ff9500", // orange
  "#ff2d55", // red-pink
  "#af52de", // purple
  "#007aff", // blue
  "#5ac8fa", // teal
  "#34c759", // green
  "#a8e05f", // lime
];

function PhotosIcon() {
  return (
    <>
      <Squircle fill="#ffffff" />
      {PHOTOS_PETALS.map((color, i) => (
        <ellipse
          key={color}
          cx="256"
          cy="163"
          rx="52"
          ry="92"
          fill={color}
          opacity="0.85"
          transform={`rotate(${i * 45} 256 256)`}
        />
      ))}
    </>
  );
}

/* ---- Notes: yellow header band + ruled paper ------------------------------ */
function NotesIcon() {
  return (
    <>
      <defs>
        <linearGradient id="notes-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd40a" />
          <stop offset="1" stopColor="#ffc300" />
        </linearGradient>
        <clipPath id="notes-clip">
          <rect {...SQ} />
        </clipPath>
      </defs>
      <Squircle fill="#ffffff" />
      <g clipPath="url(#notes-clip)">
        <rect x="16" y="16" width="480" height="134" fill="url(#notes-band)" />
        <rect x="16" y="146" width="480" height="5" fill="#e8ad00" />
      </g>
      {/* Binding perforation dots along the top of the band */}
      <g fill="#b98e00" opacity="0.55">
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={100 + i * 39} cy="46" r="7" />
        ))}
      </g>
      {/* Ruled text hints */}
      <g stroke="#d6d6db" strokeWidth="16" strokeLinecap="round">
        <line x1="84" y1="212" x2="428" y2="212" />
        <line x1="84" y1="272" x2="428" y2="272" />
        <line x1="84" y1="332" x2="428" y2="332" />
        <line x1="84" y1="392" x2="330" y2="392" />
      </g>
    </>
  );
}

/* ---- Messages: white iMessage bubble on green ----------------------------- */
function MessagesIcon() {
  return (
    <>
      <defs>
        <linearGradient id="messages-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#67e86a" />
          <stop offset="1" stopColor="#14ba2b" />
        </linearGradient>
      </defs>
      <Squircle fill="url(#messages-bg)" />
      {/* Fat rounded bubble with a tail curving to the bottom-left */}
      <path
        d="M 256 116
           C 355 116 420 174 420 252
           C 420 330 355 388 256 388
           C 233 388 211 385 191 378
           C 170 397 139 408 108 408
           C 127 392 141 371 146 349
           C 111 324 92 290 92 252
           C 92 174 157 116 256 116
           Z"
        fill="#ffffff"
      />
    </>
  );
}

/* ---- Reminders: checklist rows -------------------------------------------- */
function RemindersIcon() {
  return (
    <>
      <defs>
        <linearGradient id="reminders-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f5f5f7" />
        </linearGradient>
      </defs>
      <Squircle fill="url(#reminders-bg)" />
      {/* Row 1 — blue dot + wider/darker title line */}
      <circle cx="132" cy="160" r="36" fill="#007aff" />
      <line x1="204" y1="160" x2="416" y2="160" stroke="#8e8e93" strokeWidth="26" strokeLinecap="round" />
      {/* Row 2 — orange dot */}
      <circle cx="132" cy="264" r="36" fill="#ff9500" />
      <line x1="204" y1="264" x2="396" y2="264" stroke="#c7c7cc" strokeWidth="22" strokeLinecap="round" />
      {/* Row 3 — empty (outline) dot */}
      <circle cx="132" cy="368" r="32" fill="none" stroke="#c7c7cc" strokeWidth="9" />
      <line x1="204" y1="368" x2="376" y2="368" stroke="#c7c7cc" strokeWidth="22" strokeLinecap="round" />
    </>
  );
}

/* ---- System Settings: silver gear on dark grey ----------------------------- */
function SettingsIcon() {
  return (
    <>
      <defs>
        <linearGradient id="settings-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8e8e93" />
          <stop offset="1" stopColor="#48484a" />
        </linearGradient>
        <linearGradient id="settings-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f2f7" />
          <stop offset="1" stopColor="#aeaeb2" />
        </linearGradient>
      </defs>
      <Squircle fill="url(#settings-bg)" />
      {/* 8 gear teeth as rotated rounded rects behind the ring */}
      <g fill="url(#settings-metal)">
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x="230"
            y="80"
            width="52"
            height="72"
            rx="16"
            transform={`rotate(${i * 45} 256 256)`}
          />
        ))}
        <circle cx="256" cy="256" r="126" />
      </g>
      {/* Punched inner hole */}
      <circle cx="256" cy="256" r="58" fill="#48484a" />
    </>
  );
}

/* ---- Claude: clay tile + cream sunburst (the Claude app icon) ------------
   Each ray is a straight-sided dart with a softly ROUNDED tip (a small
   quadratic curve caps the point instead of a sharp corner). Lengths
   deliberately vary ray to ray — not a uniform mechanical sunburst — so the
   mark reads as the slightly organic, hand-cut asterisk of the real Claude
   app icon. A filled circle at the center plugs the hollow that the darts'
   offset bases would otherwise leave showing the background through. */
const CLAUDE_RAY_LENGTHS_512 = [215, 100, 180, 140, 205, 95, 165, 120, 195, 85, 150, 175];
const CLAUDE_CENTER_512 = 256;
const CLAUDE_RAY_BASE_R_512 = 22; // distance from center to each ray's flat base
const CLAUDE_RAY_HALF_W_512 = 15; // half-width at that base
const CLAUDE_TIP_ROUND_512 = 8; // radius of the rounded tip cap

/** One ray's path, tip rounded via a single quadratic curve. */
function claudeRayPath512(len: number): string {
  const cx = CLAUDE_CENTER_512;
  const bw = CLAUDE_RAY_HALF_W_512;
  const baseY = cx - CLAUDE_RAY_BASE_R_512;
  const tipR = CLAUDE_TIP_ROUND_512;
  const tipY = cx - len;
  const shoulderY = tipY + tipR * 1.4;
  return `M${cx - bw} ${baseY} L${cx - tipR} ${shoulderY} Q${cx} ${tipY} ${cx + tipR} ${shoulderY} L${cx + bw} ${baseY} Z`;
}

function ClaudeIcon() {
  return (
    <>
      <defs>
        <linearGradient id="claude-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d97e5c" />
          <stop offset="1" stopColor="#c96a4a" />
        </linearGradient>
      </defs>
      <Squircle fill="url(#claude-bg)" />
      <g fill="#faf1e6">
        {/* solid hub — plugs the hollow the offset ray bases would leave */}
        <circle cx={CLAUDE_CENTER_512} cy={CLAUDE_CENTER_512} r={CLAUDE_RAY_BASE_R_512 + 4} />
        {CLAUDE_RAY_LENGTHS_512.map((len, i) => (
          <path
            key={i}
            d={claudeRayPath512(len)}
            transform={`rotate(${i * 30} 256 256)`}
          />
        ))}
      </g>
    </>
  );
}

/* ---- Public API ------------------------------------------------------------ */

const ICONS: Record<DockIconId, () => ReactElement> = {
  finder: FinderIcon,
  safari: SafariIcon,
  mail: MailIcon,
  photos: PhotosIcon,
  notes: NotesIcon,
  messages: MessagesIcon,
  reminders: RemindersIcon,
  claude: ClaudeIcon,
  settings: SettingsIcon,
};

/** Renders the dock icon for a given app id. Size it via `className`. */
export function DockIcon({ id, className }: { id: DockIconId; className?: string }) {
  const Art = ICONS[id];
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <Art />
    </svg>
  );
}
