"use client";

/*
 * RemindersApp — functional Apple Reminders clone.
 * Sidebar lists (names/colors) stay config-driven from REMINDER_LISTS in
 * config.ts; the items themselves are seeded from config once, then live in
 * localStorage (STORAGE_KEYS.reminders) as Record<listId, StoredReminder[]>.
 * Supports checking off (with a 500ms pending animation before the item moves
 * to Completed), adding, deleting, and un-completing reminders.
 */

import { useEffect, useRef, useState } from "react";
import { REMINDER_LISTS } from "../config";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../storage";

/** Persisted reminder item. `due` is data-driven only — no UI sets it. */
interface StoredReminder {
  id: string;
  text: string;
  done: boolean;
  due?: string;
}

type RemindersState = Record<string, StoredReminder[]>;

/** Initial state built from config — only items; lists stay config-driven. */
function seed(): RemindersState {
  const state: RemindersState = {};
  for (const list of REMINDER_LISTS) {
    state[list.id] = list.items.map((i) => ({
      id: i.id,
      text: i.text,
      done: i.done,
    }));
  }
  return state;
}

/** Maps a list's colorClass (bg-*) to the matching text color for headers/counts. */
const TEXT_COLOR: Record<string, string> = {
  "bg-orange-500": "text-orange-500",
  "bg-blue-500": "text-blue-500",
  "bg-red-500": "text-red-500",
  "bg-green-500": "text-green-500",
  "bg-yellow-500": "text-yellow-500",
  "bg-purple-500": "text-purple-500",
};

/** Maps a list's colorClass (bg-*) to the matching border color for checked circles. */
const BORDER_COLOR: Record<string, string> = {
  "bg-orange-500": "border-orange-500",
  "bg-blue-500": "border-blue-500",
  "bg-red-500": "border-red-500",
  "bg-green-500": "border-green-500",
  "bg-yellow-500": "border-yellow-500",
  "bg-purple-500": "border-purple-500",
};

/** Tiny white "list" glyph (three hairlines) shown inside each sidebar circle. */
function ListGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <rect x="1" y="2" width="8" height="1" rx="0.5" fill="white" />
      <rect x="1" y="4.5" width="8" height="1" rx="0.5" fill="white" />
      <rect x="1" y="7" width="8" height="1" rx="0.5" fill="white" />
    </svg>
  );
}

function BackGlyph() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7.5 2 3.5 6l4 4" />
    </svg>
  );
}

/** One reminder row — used for both active and completed sections. */
function ReminderRow({
  item,
  colorClass,
  checked,
  onToggle,
  onDelete,
}: {
  item: StoredReminder;
  colorClass: string;
  checked: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group flex items-center gap-3 py-2">
      <button
        onClick={onToggle}
        aria-label={checked ? "Mark as not done" : "Mark as done"}
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
          checked
            ? BORDER_COLOR[colorClass] ?? "border-black/25 dark:border-white/30"
            : "border-black/25 dark:border-white/30"
        }`}
      >
        {/* Inner dot stays mounted so checking animates a scale-in fill. */}
        <span
          className={`h-[10px] w-[10px] rounded-full transition-transform duration-150 ${colorClass} ${
            checked ? "scale-100" : "scale-0"
          }`}
        />
      </button>
      {item.text ? (
        <span
          className={`text-[13px] transition-opacity duration-150 ${
            checked ? "line-through opacity-40" : ""
          }`}
        >
          {item.text}
        </span>
      ) : (
        // Blank items render as a skeleton bar, like an empty row.
        <span className="h-[9px] w-36 rounded bg-black/8 dark:bg-white/10" />
      )}
      {/* Due chip is purely visual — `due` only comes from stored data. */}
      {item.due && (
        <span className="shrink-0 rounded bg-black/5 px-1.5 py-px text-[11px] text-black/40 dark:bg-white/10 dark:text-white/45">
          {item.due}
        </span>
      )}
      <button
        onClick={onDelete}
        aria-label="Delete reminder"
        className="ml-auto hidden shrink-0 text-[14px] leading-none text-black/35 hover:text-red-500 group-hover:flex dark:text-white/35"
      >
        ×
      </button>
    </div>
  );
}

/** Accept stored data only where it's well-shaped, per config list:
    a stored array (even empty — the owner cleared the list) is kept after
    dropping malformed items; a missing or invalid entry falls back to that
    list's config seed, which also merges in lists added to config later. */
function sanitizeReminders(raw: unknown): RemindersState {
  const stored =
    typeof raw === "object" && raw !== null && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const seeded = seed();
  const state: RemindersState = {};
  for (const list of REMINDER_LISTS) {
    const value = stored[list.id];
    state[list.id] = Array.isArray(value)
      ? value.filter(
          (i): i is StoredReminder =>
            typeof i === "object" &&
            i !== null &&
            typeof (i as StoredReminder).id === "string" &&
            typeof (i as StoredReminder).text === "string" &&
            typeof (i as StoredReminder).done === "boolean"
        )
      : seeded[list.id] ?? [];
  }
  return state;
}

export default function RemindersApp() {
  const [selectedListId, setSelectedListId] = useState(REMINDER_LISTS[0]?.id);
  const [data, setData] = useState<RemindersState | null>(null);
  // Ids mid-check: rendered as checked, committed done after 500ms.
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [showCompleted, setShowCompleted] = useState(false);
  const [draft, setDraft] = useState("");
  // Narrow windows (container < @md) show one pane at a time: the sidebar of
  // lists, or — after a list is tapped — its reminders with a back button.
  // Wide windows always show both; this flag is ignored there.
  const [compactShowItems, setCompactShowItems] = useState(false);
  const pendingTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  // Hydrate from localStorage after mount (never during render — SSR safety).
  // Sanitized so hand-edited/corrupt data can't crash the app, and lists
  // added to config.ts later still get their seed items merged in.
  useEffect(() => {
    setData(sanitizeReminders(loadJSON<unknown>(STORAGE_KEYS.reminders, null)));
  }, []);

  // Debounced autosave on every change.
  useEffect(() => {
    if (!data) return;
    const t = setTimeout(() => saveJSON(STORAGE_KEYS.reminders, data), 300);
    return () => clearTimeout(t);
  }, [data]);

  // Closing the window (or hiding the tab) must not lose work: flush the
  // latest state — with any mid-check items committed as done — and only
  // then drop the in-flight timers.
  const dataRef = useRef<RemindersState | null>(null);
  dataRef.current = data;
  useEffect(() => {
    const timers = pendingTimers.current;
    const flush = () => {
      let d = dataRef.current;
      if (!d) return;
      const midCheck = new Set(timers.keys());
      if (midCheck.size > 0) {
        d = Object.fromEntries(
          Object.entries(d).map(([listId, items]) => [
            listId,
            items.map((i) => (midCheck.has(i.id) ? { ...i, done: true } : i)),
          ])
        );
      }
      saveJSON(STORAGE_KEYS.reminders, d);
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onHide);
      flush();
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const selected =
    REMINDER_LISTS.find((list) => list.id === selectedListId) ??
    REMINDER_LISTS[0];

  // Stay renderable if REMINDER_LISTS is emptied while editing config.ts.
  if (!selected) {
    return <div className="h-full bg-white dark:bg-[#1e1e1e]" />;
  }

  // Empty opaque placeholder until localStorage has been read.
  if (data === null) {
    return <div className="h-full bg-white dark:bg-[#1e1e1e]" />;
  }

  const removePending = (itemId: string) => {
    setPending((prev) => {
      const next = new Set(prev);
      next.delete(itemId);
      return next;
    });
  };

  const setDone = (listId: string, itemId: string, done: boolean) => {
    setData((prev) =>
      prev === null
        ? prev
        : {
            ...prev,
            [listId]: (prev[listId] ?? []).map((i) =>
              i.id === itemId ? { ...i, done } : i
            ),
          }
    );
  };

  /** Active-row circle click: pend for 500ms (animated), then commit done. */
  const toggleCheck = (listId: string, itemId: string) => {
    const timers = pendingTimers.current;
    const existing = timers.get(itemId);
    if (existing !== undefined) {
      // Clicked again while pending — cancel the check.
      clearTimeout(existing);
      timers.delete(itemId);
      removePending(itemId);
      return;
    }
    setPending((prev) => new Set(prev).add(itemId));
    timers.set(
      itemId,
      setTimeout(() => {
        timers.delete(itemId);
        removePending(itemId);
        setDone(listId, itemId, true);
      }, 500)
    );
  };

  const deleteItem = (listId: string, itemId: string) => {
    const timer = pendingTimers.current.get(itemId);
    if (timer !== undefined) {
      clearTimeout(timer);
      pendingTimers.current.delete(itemId);
      removePending(itemId);
    }
    setData((prev) =>
      prev === null
        ? prev
        : {
            ...prev,
            [listId]: (prev[listId] ?? []).filter((i) => i.id !== itemId),
          }
    );
  };

  const addDraft = () => {
    const text = draft.trim();
    if (!text) return;
    setData((prev) =>
      prev === null
        ? prev
        : {
            ...prev,
            [selected.id]: [
              ...(prev[selected.id] ?? []),
              { id: crypto.randomUUID(), text, done: false },
            ],
          }
    );
    setDraft("");
  };

  const items = data[selected.id] ?? [];
  const active = items.filter((i) => !i.done);
  const completed = items.filter((i) => i.done);
  const headerColor =
    TEXT_COLOR[selected.colorClass] ?? "text-black dark:text-white";

  return (
    <div className="flex h-full min-h-0 text-black dark:text-white">
      {/* Sidebar: list of reminder lists (semi-transparent for vibrancy) */}
      <div
        className={`macos-scroll w-[190px] shrink-0 overflow-y-auto border-r border-black/10 p-2 @max-md:w-full @max-md:border-r-0 dark:border-white/10 ${
          compactShowItems ? "@max-md:hidden" : ""
        }`}
      >
        {REMINDER_LISTS.map((list) => {
          const isSelected = list.id === selected.id;
          const notDone = (data[list.id] ?? []).filter((i) => !i.done).length;
          return (
            <button
              key={list.id}
              onClick={() => {
                setSelectedListId(list.id);
                setDraft("");
                setCompactShowItems(true);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left ${
                isSelected
                  ? "bg-black/10 dark:bg-white/15"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${list.colorClass}`}
              >
                <ListGlyph />
              </span>
              <span className="truncate text-[13px]">{list.name}</span>
              <span className="ml-auto text-[12px] opacity-50">{notDone}</span>
            </button>
          );
        })}
      </div>

      {/* Main pane: selected list's reminders */}
      <div
        className={`macos-scroll min-w-0 flex-1 overflow-y-auto bg-white px-5 py-4 dark:bg-[#1e1e1e] ${
          compactShowItems ? "" : "@max-md:hidden"
        }`}
      >
        <button
          onClick={() => setCompactShowItems(false)}
          aria-label="Back to reminder lists"
          className="-ml-2 mb-1 hidden rounded-md p-1.5 text-[#007aff] hover:bg-black/5 @max-md:flex dark:hover:bg-white/10"
        >
          <BackGlyph />
        </button>
        {/* Header: list name + live not-done count, both in the list color */}
        <div className={`flex items-baseline justify-between ${headerColor}`}>
          <h1 className="text-[22px] font-bold">{selected.name}</h1>
          <span className="text-[22px] font-bold">{active.length}</span>
        </div>

        {/* Active reminders */}
        <div className="mt-2 divide-y divide-black/10 dark:divide-white/10">
          {active.map((item) => (
            <ReminderRow
              key={item.id}
              item={item}
              colorClass={selected.colorClass}
              checked={pending.has(item.id)}
              onToggle={() => toggleCheck(selected.id, item.id)}
              onDelete={() => deleteItem(selected.id, item.id)}
            />
          ))}

          {/* Add row: always-visible quick entry */}
          <div className="flex items-center gap-3 py-2">
            <span className="h-[18px] w-[18px] shrink-0 rounded-full border border-dashed border-black/20 dark:border-white/20" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addDraft();
              }}
              onBlur={addDraft}
              placeholder="New Reminder"
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-black/30 dark:placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Completed section */}
        {completed.length > 0 && (
          <>
            <div className="flex items-baseline justify-between pt-3">
              <span className="text-[12px] text-black/40 dark:text-white/45">
                {completed.length} Completed
              </span>
              <button
                onClick={() => setShowCompleted((v) => !v)}
                className="text-[12px] font-medium text-[#007aff]"
              >
                {showCompleted ? "Hide" : "Show"}
              </button>
            </div>
            {showCompleted && (
              <div className="divide-y divide-black/10 dark:divide-white/10">
                {completed.map((item) => (
                  <ReminderRow
                    key={item.id}
                    item={item}
                    colorClass={selected.colorClass}
                    checked
                    onToggle={() => setDone(selected.id, item.id, false)}
                    onDelete={() => deleteItem(selected.id, item.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
