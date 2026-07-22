"use client";

/*
 * PhotosApp — Apple Photos clone with a switchable album sidebar.
 * All content comes from PHOTO_ALBUMS in config.ts: "Photoshoots" references
 * the same assets as the old /photoshoots page (nothing is duplicated), and
 * "Life" is served from Supabase Storage.
 * Layout mirrors macOS Photos: a vibrancy sidebar (Library / Albums), a
 * dense square-cropped grid, and a click-to-view detail pane with a back
 * button. An album's reel video sits in the grid like a media item.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { PHOTO_ALBUMS } from "../config";

/** What the detail pane is showing: a photo index, the video, or nothing. */
type Detail = { kind: "photo"; index: number } | { kind: "video" } | null;

/** Supabase-hosted images load straight from the CDN (long-cached there);
    routing them through /_next/image would proxy full-size originals on
    Cloudflare, which has no image-resizing binding. */
const isRemote = (src: string) => src.startsWith("http");

export default function PhotosApp() {
  const [albumId, setAlbumId] = useState(PHOTO_ALBUMS[0].id);
  const [detail, setDetail] = useState<Detail>(null);
  const album = PHOTO_ALBUMS.find((a) => a.id === albumId) ?? PHOTO_ALBUMS[0];

  // Escape steps back out of the detail view, like macOS.
  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setDetail(null);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [detail]);

  const count = album.video
    ? `${album.photos.length} Photos, 1 Video`
    : `${album.photos.length} Photos`;

  return (
    <div className="flex h-full min-h-0 text-black dark:text-white">
      {/* ---- Sidebar (vibrancy) ----
          Album switcher — hidden entirely in narrow windows. */}
      <div className="macos-scroll w-[170px] shrink-0 overflow-y-auto border-r border-black/10 p-2 @max-md:hidden dark:border-white/10">
        <SidebarLabel label="Photos" />
        <SidebarRow name="Library" icon={<LibraryIcon />} />
        <SidebarLabel label="Albums" />
        {PHOTO_ALBUMS.map((a) => (
          <SidebarRow
            key={a.id}
            name={a.name}
            icon={<AlbumIcon />}
            selected={a.id === album.id}
            onSelect={() => {
              setAlbumId(a.id);
              setDetail(null);
            }}
          />
        ))}
      </div>

      {/* ---- Main pane ---- */}
      <div className="relative flex min-w-0 flex-1 flex-col bg-white dark:bg-[#1e1e1e]">
        {/* Compact album switcher — only when the sidebar is hidden. */}
        <div className="flex gap-1.5 px-4 pt-3 @md:hidden">
          {PHOTO_ALBUMS.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setAlbumId(a.id);
                setDetail(null);
              }}
              className={`rounded-full px-3 py-1 text-[12px] ${
                a.id === album.id
                  ? "bg-[#007aff] text-white"
                  : "bg-black/5 text-black/70 dark:bg-white/10 dark:text-white/70"
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
        <div className="px-4 pb-2 pt-3">
          <h1 className="text-[20px] font-bold">{album.name}</h1>
          <p className="text-[12px] text-black/45 dark:text-white/45">
            {album.description ? `${album.description} · ${count}` : count}
          </p>
        </div>

        {/* Square-cropped media grid, macOS Photos style */}
        <div className="macos-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] gap-[3px]">
            {album.photos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => setDetail({ kind: "photo", index: i })}
                className="relative aspect-square overflow-hidden bg-black/5 dark:bg-white/5"
                aria-label={`${photo.alt} ${i + 1}`}
              >
                <Image
                  src={photo.thumb ?? photo.src}
                  alt={photo.alt}
                  fill
                  sizes="160px"
                  unoptimized={isRemote(photo.thumb ?? photo.src)}
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </button>
            ))}
            {/* the album's reel, as a video tile */}
            {album.video && (
              <button
                onClick={() => setDetail({ kind: "video" })}
                className="relative aspect-square overflow-hidden bg-black/80"
                aria-label={`${album.name} reel video`}
              >
                <video
                  src={album.video.src}
                  preload="metadata"
                  muted
                  className="pointer-events-none h-full w-full object-cover"
                />
                <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/55 text-white">
                  <PlayGlyph />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* ---- Detail view (click a tile; back or Escape returns) ---- */}
        {detail && (
          <div className="absolute inset-0 z-10 flex flex-col bg-white dark:bg-[#151515]">
            <div className="flex items-center px-3 py-2">
              <button
                onClick={() => setDetail(null)}
                className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[13px] text-[#007aff] hover:bg-black/5 dark:hover:bg-white/10"
              >
                <BackGlyph /> {album.name}
              </button>
            </div>
            <div className="relative min-h-0 flex-1 px-3 pb-2">
              {detail.kind === "photo" ? (
                <Image
                  src={album.photos[detail.index].src}
                  alt={album.photos[detail.index].alt}
                  fill
                  sizes="900px"
                  unoptimized={isRemote(album.photos[detail.index].src)}
                  className="object-contain"
                />
              ) : (
                album.video && (
                  <video
                    src={album.video.src}
                    controls
                    playsInline
                    className="h-full w-full object-contain"
                  />
                )
              )}
            </div>
            <p className="pb-2 text-center text-[11px] text-black/45 dark:text-white/45">
              {detail.kind === "video"
                ? album.video?.caption
                : `${album.photos[detail.index].date ?? album.photos[detail.index].alt} · ${detail.index + 1} of ${album.photos.length}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Sidebar bits ---- */

function SidebarLabel({ label }: { label: string }) {
  return (
    <div className="px-2 pb-1 pt-3 text-[11px] font-semibold text-black/40 first:pt-1 dark:text-white/40">
      {label}
    </div>
  );
}

function SidebarRow({
  name,
  icon,
  selected,
  onSelect,
}: {
  name: string;
  icon: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const className = `flex w-full cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] ${
    selected ? "bg-black/10 dark:bg-white/15" : "hover:bg-black/5 dark:hover:bg-white/5"
  }`;
  const content = (
    <>
      <span className="text-[#007aff]">{icon}</span>
      <span className="truncate">{name}</span>
    </>
  );
  // Rows that switch albums are real buttons (keyboard + screen readers);
  // decorative rows like Library stay plain.
  return onSelect ? (
    <button type="button" onClick={onSelect} className={className}>
      {content}
    </button>
  ) : (
    <div className={className}>{content}</div>
  );
}

function LibraryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M3.5 12h17M6 6l12 12M18 6L6 18" strokeWidth="1" />
    </svg>
  );
}

function AlbumIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="M3.5 15.5l4.5-4 4 3.5 3.5-3 5 4.5" strokeLinejoin="round" />
      <circle cx="9" cy="9.5" r="1.2" className="fill-current" strokeWidth="0" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="ml-px h-2.5 w-2.5 fill-current">
      <path d="M3 1.8v8.4L10 6z" />
    </svg>
  );
}

function BackGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round">
      <path d="M7.5 2 3.5 6l4 4" />
    </svg>
  );
}
