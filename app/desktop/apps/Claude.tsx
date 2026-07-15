"use client";

/*
 * ClaudeApp — a photorealistic claude.ai interface for the desktop.
 * Rendered inside the reusable Window component (which supplies the macOS
 * title bar, traffic lights, drag/resize and shadow), so this file is just
 * the app interior:
 *   - a left nav sidebar (Home/Code toggle, New, menu items, profile)
 *   - a main view that shows the greeting + a "Recents" grid of chats, and
 *     switches to a conversation thread when a chat is opened.
 *
 * The interior is always dark to match claude.ai's design — it deliberately
 * ignores the desktop's light/dark toggle.
 *
 * All editable content (greeting, name, plan, model, menu labels, and the
 * conversations) lives in CLAUDE_APP in ../config.ts. A chat with an empty
 * `messages` array renders as grey skeleton bubbles when opened. The
 * composer is decorative.
 */

import { useState } from "react";
import { CLAUDE_APP, type ClaudeChat } from "../config";

/* claude.ai dark palette */
const C = {
  main: "#262624",
  sidebar: "#1f1e1c",
  composer: "#30302e",
  accent: "#d97757",
  userBubble: "#f0eee6",
  userText: "#1d1d1b",
} as const;

export default function ClaudeApp() {
  // null = home view; otherwise the opened conversation's id
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const openChat = CLAUDE_APP.chats.find((c) => c.id === openChatId) ?? null;

  return (
    <div className="flex h-full min-h-0 text-white" style={{ background: C.main }}>
      <Sidebar />
      {openChat ? (
        <ChatView chat={openChat} onBack={() => setOpenChatId(null)} />
      ) : (
        <HomeView onOpen={setOpenChatId} />
      )}
    </div>
  );
}

/* ---- Sidebar ------------------------------------------------------------- */

function Sidebar() {
  const [tab, setTab] = useState<"Home" | "Code">("Home");
  return (
    <div
      className="flex w-[250px] shrink-0 flex-col border-r border-white/10"
      style={{ background: C.sidebar }}
    >
      {/* Home / Code toggle */}
      <div className="p-3">
        <div className="flex gap-0.5 rounded-lg bg-black/25 p-0.5">
          <TabButton active={tab === "Home"} onClick={() => setTab("Home")} icon={<HomeIcon />} label="Home" />
          <TabButton active={tab === "Code"} onClick={() => setTab("Code")} icon={<CodeIcon />} label="Code" />
        </div>
      </div>

      {/* + New */}
      <button className="mx-3 flex cursor-default items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium text-white/90 hover:bg-white/5">
        <span style={{ color: C.accent }}>
          <PlusIcon />
        </span>
        New
      </button>

      {/* Menu */}
      <nav className="mt-1.5 flex flex-col px-2">
        {CLAUDE_APP.menu.map((label) => (
          <button
            key={label}
            className="flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] text-white/70 hover:bg-white/5 hover:text-white/90"
          >
            <span className="text-white/50">{menuIcon(label)}</span>
            {label}
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Profile card */}
      <div className="border-t border-white/10 p-2">
        <div className="flex cursor-default items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-white/5">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
            style={{ background: C.accent }}
          >
            {CLAUDE_APP.userName.charAt(0)}
          </span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[13px] text-white/85">{CLAUDE_APP.userName}</div>
            <div className="truncate text-[11px] text-white/40">{CLAUDE_APP.userPlan}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[12.5px] font-medium transition-colors ${
        active ? "bg-white/10 text-white/90 shadow-sm" : "text-white/50 hover:text-white/75"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ---- Home view: greeting + Recents ------------------------------------- */

function HomeView({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {/* greeting */}
      <div className="flex items-center gap-3 px-8 pb-2 pt-8">
        <ClaudeMark className="h-7 w-7" />
        <h1 className="font-serif text-[25px] tracking-tight text-white/90">
          {CLAUDE_APP.greeting}
        </h1>
      </div>

      {/* Recents grid */}
      <div className="macos-scroll min-h-0 flex-1 overflow-y-auto px-8 py-3">
        <div className="mb-2.5 flex items-center gap-1.5 text-[12px] font-medium text-white/45">
          <ClockIcon /> Recents
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {CLAUDE_APP.chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onOpen(chat.id)}
              className="cursor-default rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-left transition-colors hover:border-white/15 hover:bg-white/[0.06]"
            >
              <div className="line-clamp-2 text-[13px] font-medium leading-snug text-white/90">
                {chat.title}
              </div>
              <div className="mt-1.5 line-clamp-1 text-[11px] text-white/40">{chat.preview}</div>
              <div className="mt-2 text-[10px] text-white/30">{chat.time}</div>
            </button>
          ))}
        </div>
      </div>

      <Composer />
    </div>
  );
}

/* ---- Conversation thread view ------------------------------------------ */

function ChatView({ chat, onBack }: { chat: ClaudeChat; onBack: () => void }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-center border-b border-white/5 px-4 py-2">
        <button
          onClick={onBack}
          className="flex cursor-default items-center gap-1 rounded-md px-2 py-1 text-[13px] text-white/55 hover:bg-white/5 hover:text-white/90"
        >
          <BackIcon /> Recents
        </button>
        <span className="mx-auto max-w-[60%] truncate pr-14 text-[13px] text-white/60">
          {chat.title}
        </span>
      </div>

      <div className="macos-scroll min-h-0 flex-1 overflow-y-auto px-6 py-5">
        <div className="mx-auto flex w-full max-w-[600px] flex-col gap-5">
          {chat.messages.length > 0 ? (
            chat.messages.map((msg, i) =>
              msg.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div
                    className="max-w-[78%] rounded-2xl rounded-br-md px-3.5 py-2 text-[13px] leading-relaxed"
                    style={{ background: C.userBubble, color: C.userText }}
                  >
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-2.5">
                  <ClaudeMark className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="max-w-[88%] text-[13.5px] leading-relaxed text-white/85">
                    {msg.text}
                  </p>
                </div>
              ),
            )
          ) : (
            <SkeletonThread />
          )}
        </div>
      </div>

      <Composer />
    </div>
  );
}

/* ---- Composer (decorative) --------------------------------------------- */

function Composer() {
  return (
    <div className="px-6 pb-5 pt-2">
      <div
        className="mx-auto w-full max-w-[600px] rounded-2xl border border-white/15 px-3 pb-2 pt-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.28)]"
        style={{ background: C.composer }}
      >
        <input
          type="text"
          disabled
          placeholder={CLAUDE_APP.inputPlaceholder}
          className="w-full cursor-default bg-transparent px-1 text-[13.5px] text-white/85 outline-none placeholder:text-white/35"
        />
        <div className="mt-2 flex items-center justify-between">
          <button className="cursor-default text-white/40 hover:text-white/70" aria-label="Attach (decorative)">
            <PlusIcon />
          </button>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] text-white/40">
              {CLAUDE_APP.model}
              <ChevronDownIcon />
            </span>
            <button
              className="flex h-7 w-7 cursor-default items-center justify-center rounded-lg opacity-80"
              style={{ background: C.accent }}
              aria-label="Send (decorative)"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Placeholder conversation: grey skeleton bubbles until real content lands. */
function SkeletonThread() {
  return (
    <>
      <div className="flex justify-end">
        <div className="h-9 w-52 rounded-2xl rounded-br-md bg-white/10" />
      </div>
      <div className="flex gap-2.5">
        <ClaudeMark className="mt-0.5 h-5 w-5 shrink-0 opacity-50" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3 w-4/5 rounded bg-white/10" />
          <div className="h-3 w-3/5 rounded bg-white/10" />
          <div className="h-3 w-2/3 rounded bg-white/[0.07]" />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="h-9 w-40 rounded-2xl rounded-br-md bg-white/10" />
      </div>
      <div className="flex gap-2.5">
        <ClaudeMark className="mt-0.5 h-5 w-5 shrink-0 opacity-50" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3 w-3/4 rounded bg-white/10" />
          <div className="h-3 w-1/2 rounded bg-white/[0.07]" />
        </div>
      </div>
    </>
  );
}

/* ---- Claude sunburst mark ---------------------------------------------- */

/** Claude's radiating sunburst — 12 straight-sided darts with softly rounded
    tips (a small quadratic curve caps each point) and deliberately varying
    lengths, same recipe as the dock icon (icons.tsx), scaled to a 24-unit
    viewBox. A filled center circle plugs the hollow the offset bases would
    otherwise leave. Terracotta (#d97757) on transparent, for the greeting
    + replies. */
const RAY_LENGTHS = [10.1, 4.7, 8.4, 6.6, 9.6, 4.5, 7.7, 5.6, 9.1, 4.0, 7.0, 8.2];
const RAY_BASE_R = 1; // distance from center to each ray's flat base
const RAY_HALF_W = 0.7; // half-width at that base
const TIP_ROUND = 0.35; // radius of the rounded tip cap

function rayPath(len: number): string {
  const cx = 12;
  const baseY = cx - RAY_BASE_R;
  const tipY = cx - len;
  const shoulderY = tipY + TIP_ROUND * 1.4;
  return `M${cx - RAY_HALF_W} ${baseY} L${(cx - TIP_ROUND).toFixed(2)} ${shoulderY.toFixed(2)} Q${cx} ${tipY.toFixed(2)} ${(cx + TIP_ROUND).toFixed(2)} ${shoulderY.toFixed(2)} L${cx + RAY_HALF_W} ${baseY} Z`;
}

function ClaudeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill={C.accent}>
        {/* solid hub — plugs the hollow the offset ray bases would leave */}
        <circle cx={12} cy={12} r={RAY_BASE_R + 0.2} />
        {RAY_LENGTHS.map((len, i) => (
          <path key={i} d={rayPath(len)} transform={`rotate(${i * 30} 12 12)`} />
        ))}
      </g>
    </svg>
  );
}

/* ---- Nav + toolbar glyphs ---------------------------------------------- */

function menuIcon(label: string): React.ReactNode {
  switch (label) {
    case "Projects":
      return <FolderIcon />;
    case "Artifacts":
      return <ArtifactsIcon />;
    case "Schedule":
      return <CalendarIcon />;
    case "Dispatch":
      return <DispatchIcon />;
    case "Customize":
      return <SlidersIcon />;
    default:
      return <DotIcon />;
  }
}

const nav = "h-[17px] w-[17px] fill-none stroke-current";
const tab = "h-[14px] w-[14px] fill-none stroke-current";

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" className={tab} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M3.5 9.5 10 4l6.5 5.5M5.5 8.5v7h9v-7" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg viewBox="0 0 20 20" className={tab} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 6 4 10l3.5 4M12.5 6 16 10l-3.5 4" />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg viewBox="0 0 20 20" className={nav} strokeWidth="1.5" strokeLinejoin="round">
      <path d="M2.5 6.5A1.5 1.5 0 0 1 4 5h3l1.5 2h6A1.5 1.5 0 0 1 16 8.5v5A1.5 1.5 0 0 1 14.5 15h-11A1.5 1.5 0 0 1 2 13.5z" />
    </svg>
  );
}
function ArtifactsIcon() {
  return (
    <svg viewBox="0 0 20 20" className={nav} strokeWidth="1.5" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="13" height="13" rx="2.5" />
      <path d="M10 6.3l.95 2.25L13.2 9.5l-2.25.95L10 12.7l-.95-2.25L6.8 9.5l2.25-.95z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className={nav} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <rect x="3" y="4.5" width="14" height="12" rx="2" />
      <path d="M3 8.5h14M7 3v3M13 3v3" />
    </svg>
  );
}
function DispatchIcon() {
  return (
    <svg viewBox="0 0 20 20" className={nav} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M16.5 3.5 9 11M16.5 3.5l-5 13-2.2-5.3L4 9z" />
    </svg>
  );
}
function SlidersIcon() {
  return (
    <svg viewBox="0 0 20 20" className={nav} strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 6h11M3 10h11M3 14h11" />
      {/* knobs filled with the sidebar bg so the lines appear to pass behind */}
      <circle cx="9" cy="6" r="1.7" fill={C.sidebar} />
      <circle cx="6" cy="10" r="1.7" fill={C.sidebar} />
      <circle cx="12" cy="14" r="1.7" fill={C.sidebar} />
    </svg>
  );
}
function DotIcon() {
  return (
    <svg viewBox="0 0 20 20" className={nav} strokeWidth="1.5">
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-[14px] w-[14px] fill-none stroke-current" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 5v3l2 1.3" />
    </svg>
  );
}
function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3.5 5.5 8l4.5 4.5" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6.5 8 10l4-3.5" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 13V4M4 8l4-4 4 4" />
    </svg>
  );
}
