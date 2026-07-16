"use client";

/*
 * Notes — read-only Apple Notes clone (a reader, not an editor).
 *
 * Two panes inside the shared Window shell:
 *   1. Sidebar: a search field, then Pinned / World / Personal category
 *      sections. Rows select a note; there is no create / pin / delete.
 *   2. Reading pane: the note title and its rendered markdown body. Nothing
 *      here is editable — the content is fixed to the config seed.
 *
 * Seeded from NOTES in config.ts. Content cannot be modified in the UI.
 */

import { useEffect, useReducer, useState } from "react";
import { NOTES } from "../config";
import { loadJSON, STORAGE_KEYS } from "../storage";

interface StoredNote {
  id: string;
  title: string;
  /** Raw markdown. */
  body: string;
  pinned: boolean;
  /** Category section this note lives under (e.g. "World", "Personal"). */
  folder: string;
  /** Last-edited timestamp, ms. */
  editedAt: number;
}

/** Folder used for user-created notes (the "New note" button). */
const DEFAULT_FOLDER = "Notes";

/** Section order in the sidebar. Any folder not listed here is appended
    after these, in first-seen order. */
const FOLDER_ORDER = ["Personal", "World"];

/** Initial notes from config. `folder === "Pinned"` seeds the note pinned;
    otherwise the folder is its category section. A note's `date`
    (YYYY-MM-DD) becomes its edited-at timestamp so blog posts keep their
    real dates; notes without one are staggered a day apart from now. */
function seed(): StoredNote[] {
  return NOTES.map((note, i) => ({
    id: note.id,
    title: note.title,
    body: note.body.join("\n\n"),
    pinned: note.folder === "Pinned",
    folder: note.folder === "Pinned" ? DEFAULT_FOLDER : note.folder,
    editedAt: note.date
      ? new Date(`${note.date}T12:00:00`).getTime()
      : Date.now() - i * 86_400_000,
  }));
}

/* ---- Relative time ----------------------------------------------------- */

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`;
}

/* ---- Markdown renderer --------------------------------------------------
   Tiny in-file renderer: escapes HTML entities first, then transforms
   headings, bullet lists, blockquotes, images, rules, bold/italic/code/
   links, and paragraphs into an HTML string. Input is the owner's own
   escaped text — safe to inject. */

function escapeHTML(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(s: string): string {
  return s
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      // !underline beats the desktop-wide `.macos-root a { text-decoration: none }`
      '<a href="$2" target="_blank" rel="noreferrer" class="text-[#007aff] !underline underline-offset-2">$1</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-black/[0.06] px-1 py-px font-mono text-[12px] dark:bg-white/10">$1</code>',
    );
}

function renderMarkdown(src: string): string {
  const headingClass: Record<number, string> = {
    1: "text-[19px] font-bold mt-3 mb-1",
    2: "text-[16px] font-bold mt-3 mb-1",
    3: "text-[14px] font-semibold mt-2 mb-1",
  };
  const out: string[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let quote: string[] = [];

  const flushPara = () => {
    if (para.length === 0) return;
    out.push(
      `<p class="mb-2 text-[13px] leading-relaxed">${para.map(inlineMarkdown).join("<br/>")}</p>`,
    );
    para = [];
  };
  const flushList = () => {
    if (list.length === 0) return;
    out.push(
      `<ul class="list-disc pl-5 mb-2 text-[13px] leading-relaxed">${list
        .map((item) => `<li>${inlineMarkdown(item)}</li>`)
        .join("")}</ul>`,
    );
    list = [];
  };
  const flushQuote = () => {
    if (quote.length === 0) return;
    out.push(
      `<blockquote class="my-3 border-l-2 border-black/20 pl-3 text-[13px] italic leading-relaxed text-black/70 dark:border-white/25 dark:text-white/70">${quote
        .map(inlineMarkdown)
        .join("<br/>")}</blockquote>`,
    );
    quote = [];
  };

  for (const line of escapeHTML(src).split("\n")) {
    const bullet = line.match(/^[-*] (.*)$/);
    if (bullet) {
      flushPara();
      flushQuote();
      list.push(bullet[1]);
      continue;
    }
    flushList();
    const quoted = line.match(/^&gt; ?(.*)$/);
    if (quoted) {
      flushPara();
      quote.push(quoted[1]);
      continue;
    }
    flushQuote();
    // standalone image line: ![alt](/local/path.jpg or https://…)
    const image = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (image) {
      flushPara();
      out.push(
        `<img src="${image[2]}" alt="${image[1]}" loading="lazy" class="my-3 w-full max-w-[440px] rounded-lg" />`,
      );
      continue;
    }
    if (/^-{3,}$/.test(line.trim())) {
      flushPara();
      out.push('<hr class="my-4 border-black/10 dark:border-white/15" />');
      continue;
    }
    const heading = line.match(/^(#{1,3}) (.*)$/);
    if (heading) {
      flushPara();
      const level = heading[1].length;
      out.push(
        `<h${level} class="${headingClass[level]}">${inlineMarkdown(heading[2])}</h${level}>`,
      );
      continue;
    }
    if (line.trim() === "") {
      flushPara();
      continue;
    }
    para.push(line);
  }
  flushPara();
  flushList();
  flushQuote();
  return out.join("");
}

/* ---- Small inline glyphs ------------------------------------------------ */

function MagnifierIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5 L14 14" />
    </svg>
  );
}

// (compose / pin / delete glyphs removed — the reader has no mutating actions)

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

/* ---- Component ---------------------------------------------------------- */

/** Accept stored data only if it's an array; keep only well-shaped entries.
    A stored empty array is respected (the owner deleted every note) — the
    seed is used only when the stored value isn't a notes array at all. */
function sanitizeNotes(raw: unknown): StoredNote[] {
  if (!Array.isArray(raw)) return seed();
  return raw.filter(
    (n): n is StoredNote =>
      typeof n === "object" &&
      n !== null &&
      typeof (n as StoredNote).id === "string" &&
      typeof (n as StoredNote).title === "string" &&
      typeof (n as StoredNote).body === "string" &&
      typeof (n as StoredNote).pinned === "boolean" &&
      typeof (n as StoredNote).folder === "string" &&
      Number.isFinite((n as StoredNote).editedAt),
  );
}

export default function NotesApp() {
  // Read-only reader: notes are seeded from config and can be browsed and
  // searched, but not edited, created, pinned, or deleted.
  const [notes, setNotes] = useState<StoredNote[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  // Narrow windows (container < @md) show one pane at a time: the note list,
  // or the reading pane with a back button. Starts on the reading pane so a
  // phone visitor lands directly on the pinned bio note (selected by
  // default). Wide windows always show both; this flag is ignored there.
  const [compactShowNote, setCompactShowNote] = useState(true);

  // Rerender every 30s so relative-time labels stay fresh.
  const [, tickRelativeTime] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    const interval = setInterval(tickRelativeTime, 30_000);
    return () => clearInterval(interval);
  }, []);

  // Seed after mount (never in useState — SSR mismatch). sanitizeNotes falls
  // back to the config seed for any missing/corrupt stored value.
  useEffect(() => {
    const loaded = sanitizeNotes(loadJSON<unknown>(STORAGE_KEYS.notes, null));
    setNotes(loaded);
    const ordered = orderNotes(loaded);
    setSelectedId(ordered[0]?.id ?? null);
  }, []);

  /** Full display order: pinned first, then by editedAt descending. */
  function orderNotes(list: StoredNote[]): StoredNote[] {
    return [...list].sort(
      (a, b) => Number(b.pinned) - Number(a.pinned) || b.editedAt - a.editedAt,
    );
  }

  if (!notes) {
    return <div className="flex h-full min-h-0 bg-white dark:bg-[#1e1e1e]" />;
  }

  const selected = notes.find((n) => n.id === selectedId) ?? null;

  const q = query.trim().toLowerCase();
  const visible = notes.filter(
    (n) =>
      q === "" ||
      n.title.toLowerCase().includes(q) ||
      n.body.toLowerCase().includes(q),
  );
  const pinnedRows = orderNotes(visible.filter((n) => n.pinned));
  // Unpinned notes grouped into category sections (World, Personal, then any
  // other folder in first-seen order — e.g. "Notes" for user-created ones).
  const unpinned = visible.filter((n) => !n.pinned);
  const folders = [
    ...FOLDER_ORDER.filter((f) => unpinned.some((n) => n.folder === f)),
    ...unpinned
      .map((n) => n.folder)
      .filter((f, i, arr) => !FOLDER_ORDER.includes(f) && arr.indexOf(f) === i),
  ];
  const folderGroups = folders.map((folder) => ({
    folder,
    rows: orderNotes(unpinned.filter((n) => n.folder === folder)),
  }));

  const selectRow = (id: string) => {
    setSelectedId(id);
    setCompactShowNote(true);
  };

  // First non-empty body line with markdown syntax stripped, like Notes'
  // plain-text previews.
  const previewLine = (body: string) => {
    const line = body.split("\n").find((l) => l.trim() !== "");
    if (!line) return "No additional text";
    return (
      line
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images → alt text
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → text
        .replace(/^#{1,3} /, "")
        .replace(/^&?gt;|^> ?/, "")
        .replace(/[*_`]/g, "")
        .trim() || "No additional text"
    );
  };

  const renderRow = (note: StoredNote) => {
    const isSelected = note.id === selectedId;
    return (
      <div
        key={note.id}
        onClick={() => selectRow(note.id)}
        className={`cursor-default rounded-lg px-3 py-2 ${
          isSelected
            ? "bg-[#ffd60a]/25 dark:bg-[#ffd60a]/20"
            : "hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        <div className="truncate text-[13px] font-semibold">{note.title}</div>
        <div className="truncate text-[11px]">
          <span className="text-black/50 dark:text-white/50">
            {relativeTime(note.editedAt)}
          </span>{" "}
          <span className="text-black/40 dark:text-white/40">
            {previewLine(note.body)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full min-h-0 text-black dark:text-white">
      {/* Sidebar — semi-transparent so the Window vibrancy shows through */}
      <div
        className={`flex w-[220px] shrink-0 flex-col border-r border-black/10 dark:border-white/10 @max-md:w-full @max-md:border-r-0 ${
          compactShowNote ? "@max-md:hidden" : ""
        }`}
      >
        {/* Search (read-only reader — no compose/new-note button) */}
        <div className="p-2">
          <div className="flex min-w-0 items-center gap-1 rounded-md bg-black/5 px-2 py-1 dark:bg-white/10">
            <span className="text-black/40 dark:text-white/40">
              <MagnifierIcon />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full min-w-0 bg-transparent text-[12px] outline-none placeholder:text-black/40 dark:placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Note list */}
        <div className="macos-scroll flex-1 overflow-y-auto px-2 pb-2">
          {visible.length === 0 ? (
            <div className="pt-6 text-center text-[12px] text-black/35 dark:text-white/35">
              No Results
            </div>
          ) : (
            <>
              {pinnedRows.length > 0 && (
                <>
                  <div className="px-2 pt-3 pb-1 text-[11px] font-semibold text-black/40 dark:text-white/40">
                    Pinned
                  </div>
                  {pinnedRows.map(renderRow)}
                </>
              )}
              {folderGroups.map(({ folder, rows }) => (
                <div key={folder}>
                  <div className="px-2 pt-3 pb-1 text-[11px] font-semibold text-black/40 dark:text-white/40">
                    {folder}
                  </div>
                  {rows.map(renderRow)}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Reading pane — opaque main content */}
      <div
        className={`flex min-w-0 flex-1 flex-col bg-white dark:bg-[#1e1e1e] ${
          compactShowNote ? "" : "@max-md:hidden"
        }`}
      >
        {selected ? (
          <>
            <div className="relative pt-3 text-center text-[11px] text-black/40 dark:text-white/40">
              <button
                onClick={() => setCompactShowNote(false)}
                aria-label="Back to note list"
                className="absolute left-2 top-1.5 hidden rounded-md p-1.5 text-[#007aff] hover:bg-black/5 @max-md:flex dark:hover:bg-white/10"
              >
                <BackGlyph />
              </button>
              {relativeTime(selected.editedAt)}
            </div>
            <div className="flex min-h-0 flex-1 flex-col px-6 pb-4">
              <h1 className="py-1 text-xl font-bold">{selected.title}</h1>
              {selected.body.trim() === "" ? (
                <p className="text-[13px] leading-relaxed opacity-35">
                  No additional text
                </p>
              ) : (
                <div
                  className="macos-scroll min-h-0 flex-1 overflow-y-auto"
                  // Own escaped text only — see renderMarkdown.
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(selected.body) }}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-black/30 dark:text-white/30">
            No Note Selected
          </div>
        )}
      </div>
    </div>
  );
}
