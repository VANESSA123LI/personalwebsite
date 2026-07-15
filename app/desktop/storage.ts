/*
 * Tiny localStorage layer for the desktop.
 *
 * PERSIST is the master switch for cross-refresh persistence.
 *   false (current) — the desktop always starts from its default seeded
 *     state: reads return the caller's fallback and writes clear any
 *     previously-saved value, so every page load reverts all user input and
 *     shows the site the way it first displays. In-session interactivity
 *     (dragging, editing notes, checking reminders, dark mode) still works;
 *     it just doesn't survive a refresh.
 *   true — window layout, theme, notes, and reminders are saved to
 *     localStorage and restored on the next load.
 * Flip this one flag to switch behavior. Bump a key's version suffix below
 * if its stored shape changes.
 */

export const PERSIST = false;

export const STORAGE_KEYS = {
  windows: "desktop:windows:v1",
  theme: "desktop:theme:v1",
  // v2: placeholder notes replaced by the real bio + blog posts
  notes: "desktop:notes:v2",
  reminders: "desktop:reminders:v1",
} as const;

/** Remove every desktop-namespaced key, including stale ones from old key
 *  versions. Called once on load when PERSIST is off so no user data from a
 *  previous session lingers in localStorage. */
export function clearDesktopStorage(): void {
  if (typeof window === "undefined") return;
  try {
    for (const k of Object.keys(window.localStorage)) {
      if (k.startsWith("desktop:")) window.localStorage.removeItem(k);
    }
  } catch {
    /* ignore */
  }
}

export function loadJSON<T>(key: string, fallback: T): T {
  // With persistence off, never read stored data — always seed fresh.
  if (!PERSIST || typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  if (!PERSIST) {
    // Persistence off: drop any value left over from a previous session so a
    // refresh always starts from the default display.
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked — persistence is best-effort
  }
}
