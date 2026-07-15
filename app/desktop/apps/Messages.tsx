"use client";

/*
 * Messages — iMessage clone.
 * Left: conversation list (semi-transparent so the Window vibrancy shows).
 * Right: chat thread with grey/blue bubbles and a disabled iMessage input.
 * All conversation data comes from CONVERSATIONS in config.ts — edit there.
 */

import { useEffect, useRef, useState } from "react";
import { CONVERSATIONS, type Conversation } from "../config";

/** Small gradient avatar circle with white initials. */
function Avatar({ conv, size }: { conv: Conversation; size: number }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b text-white ${conv.avatarClass}`}
      style={{ width: size, height: size }}
    >
      <span className="text-[13px] font-medium" style={{ fontSize: size < 30 ? 10 : 13 }}>
        {conv.initials}
      </span>
    </div>
  );
}

export default function MessagesApp() {
  const [selectedId, setSelectedId] = useState(CONVERSATIONS[0]?.id);
  const selected: Conversation | undefined =
    CONVERSATIONS.find((c) => c.id === selectedId) ?? CONVERSATIONS[0];

  // keep the thread pinned to the newest message, like real Messages
  const threadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [selectedId]);

  // Stay renderable if CONVERSATIONS is emptied while editing config.ts.
  if (!selected) {
    return <div className="h-full bg-white dark:bg-[#1e1e1e]" />;
  }

  return (
    <div className="flex h-full min-h-0 text-black dark:text-white">
      {/* ---- Conversation list (vibrancy sidebar) ---- */}
      <div className="macos-scroll w-[224px] shrink-0 overflow-y-auto border-r border-black/10 p-2 dark:border-white/10">
        {CONVERSATIONS.map((conv) => {
          const isSelected = conv.id === selectedId;
          const lastText = conv.messages[conv.messages.length - 1]?.text ?? "";
          return (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left ${
                isSelected
                  ? "bg-[#007aff] text-white"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Avatar conv={conv} size={36} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold">{conv.name}</span>
                  <span
                    className={`shrink-0 text-[11px] ${
                      isSelected ? "text-white/80" : "opacity-60"
                    }`}
                  >
                    {conv.time}
                  </span>
                </div>
                <p
                  className={`line-clamp-2 text-[11px] leading-tight ${
                    isSelected ? "text-white/80" : "text-black/50 dark:text-white/50"
                  }`}
                >
                  {lastText}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ---- Chat pane (opaque) ---- */}
      <div className="flex min-w-0 flex-1 flex-col bg-white dark:bg-[#1e1e1e]">
        {/* Header: "To: {name}" */}
        <div className="flex items-center justify-center gap-1.5 border-b border-black/10 bg-white/60 py-2 dark:border-white/10 dark:bg-white/5">
          <span className="text-[12px] text-black/50 dark:text-white/50">To:</span>
          <Avatar conv={selected} size={20} />
          <span className="text-[12px] font-medium">{selected.name}</span>
        </div>

        {/* Bubble thread */}
        <div ref={threadRef} className="macos-scroll flex flex-1 flex-col gap-[3px] overflow-y-auto px-4 py-3">
          {/* Centered service + timestamp label, like macOS */}
          <div className="mb-1 text-center text-[10px] text-black/40 dark:text-white/40">
            <span className="font-semibold">iMessage</span>
            <span> · {selected.time}</span>
          </div>

          {selected.messages.map((msg, i) => {
            const prev = selected.messages[i - 1];
            const groupGap = prev && prev.from !== msg.from ? "mt-2" : "";
            const bubble =
              msg.from === "me"
                ? "self-end bg-[#007aff] text-white"
                : "self-start bg-[#e9e9eb] text-black dark:bg-[#3b3b3d] dark:text-white";
            return (
              <div
                key={i}
                className={`max-w-[70%] rounded-[18px] px-3.5 py-1.5 text-[13px] leading-snug ${bubble} ${groupGap}`}
              >
                {msg.text}
              </div>
            );
          })}
        </div>

        {/* Input bar (disabled — decorative, like an idle compose field) */}
        <div className="border-t border-black/10 px-4 py-3 dark:border-white/10">
          <input
            type="text"
            placeholder="iMessage"
            disabled
            className="w-full cursor-default rounded-full border border-black/15 bg-transparent px-3.5 py-1 text-[13px] placeholder:text-black/40 dark:border-white/15 dark:placeholder:text-white/40"
          />
        </div>
      </div>
    </div>
  );
}
