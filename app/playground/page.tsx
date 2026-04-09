"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

const COLS = 20;
const ROWS = 12;
const CELL = 34;

type BlockType = "air" | "grass" | "dirt" | "stone" | "sand" | "water" | "wood" | "leaves" | "bedrock";

const BLOCK_BG: Record<BlockType, string> = {
  air:     "linear-gradient(180deg, #7BC8E8 0%, #5AAAD4 100%)",
  grass:   "linear-gradient(180deg, #5D9E2F 24%, #8B6332 24%)",
  dirt:    "#96602E",
  stone:   "radial-gradient(circle at 35% 35%, #929292 0%, #727272 100%)",
  sand:    "#E2C96B",
  water:   "linear-gradient(180deg, #5BAEE8 0%, #2E6DB4 100%)",
  wood:    "#7D5A2B",
  leaves:  "radial-gradient(circle at 40% 40%, #4AAA25 0%, #3A8C1F 70%)",
  bedrock: "radial-gradient(circle at 25% 75%, #4A4A4A 0%, #333 60%, #444 100%)",
};

const LABELS: Record<BlockType, string> = {
  air: "Air", grass: "Grass", dirt: "Dirt", stone: "Stone",
  sand: "Sand", water: "Water", wood: "Wood", leaves: "Leaves", bedrock: "Bedrock",
};

const HOTBAR: BlockType[] = ["grass", "dirt", "stone", "sand", "water", "wood", "leaves", "bedrock", "air"];

function makeWorld(): BlockType[][] {
  const SURFACE = 7;
  const poolStart = 7 + Math.floor(Math.random() * 4);
  const poolEnd = poolStart + 2;
  const tree1 = 2 + Math.floor(Math.random() * 3);
  const tree2 = 14 + Math.floor(Math.random() * 4);

  const g: BlockType[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, (): BlockType => "air")
  );

  for (let c = 0; c < COLS; c++) {
    const inPool = c >= poolStart && c <= poolEnd;
    const h = inPool ? SURFACE + 1 : SURFACE;
    for (let r = h; r < ROWS; r++) {
      if (r === h) g[r][c] = inPool ? "sand" : "grass";
      else if (r < h + 3) g[r][c] = "dirt";
      else g[r][c] = "stone";
    }
  }

  for (let c = 0; c < COLS; c++) g[ROWS - 1][c] = "bedrock";

  for (let c = poolStart; c <= poolEnd; c++) g[SURFACE][c] = "water";
  if (poolStart > 0) g[SURFACE][poolStart - 1] = "sand";
  if (poolEnd < COLS - 1) g[SURFACE][poolEnd + 1] = "sand";

  const addTree = (col: number) => {
    if (col < 2 || col >= COLS - 2) return;
    for (let r = SURFACE - 4; r < SURFACE; r++) if (r >= 0) g[r][col] = "wood";
    for (let r = SURFACE - 6; r <= SURFACE - 3; r++)
      for (let dc = -2; dc <= 2; dc++) {
        const nc = col + dc;
        if (r >= 0 && nc >= 0 && nc < COLS && g[r][nc] === "air") g[r][nc] = "leaves";
      }
  };

  addTree(tree1);
  addTree(tree2);

  return g;
}

export default function Playground() {
  const [grid, setGrid] = useState<BlockType[][]>(makeWorld);
  const [selected, setSelected] = useState<BlockType>("grass");
  const painting = useRef(false);

  const paint = useCallback((r: number, c: number) => {
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = selected;
      return next;
    });
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const i = parseInt(e.key) - 1;
      if (i >= 0 && i < HOTBAR.length) setSelected(HOTBAR[i]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const gridW = COLS * CELL;

  return (
    <main
      onMouseUp={() => { painting.current = false; }}
      onMouseLeave={() => { painting.current = false; }}
      style={{
        minHeight: "100vh",
        background: "#1a1a2e",
        fontFamily: "monospace",
        padding: "2rem 1rem",
        userSelect: "none",
      }}
    >
      <div style={{ width: gridW, margin: "0 auto 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>← Home</Link>
        <span style={{ color: "#fff", fontSize: 20, letterSpacing: "0.25em", fontWeight: 700 }}>PLAYGROUND</span>
        <button
          onClick={() => setGrid(makeWorld())}
          style={{ color: "#888", fontSize: 13, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace" }}
        >
          New World
        </button>
      </div>

      <div
        style={{
          width: gridW,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          border: "3px solid #111",
          boxShadow: "0 0 0 1px #333, 0 12px 40px rgba(0,0,0,0.9)",
          cursor: "crosshair",
        }}
      >
        {grid.map((row, r) =>
          row.map((block, c) => (
            <div
              key={`${r}-${c}`}
              onMouseDown={() => { painting.current = true; paint(r, c); }}
              onMouseEnter={() => { if (painting.current) paint(r, c); }}
              style={{
                width: CELL,
                height: CELL,
                background: BLOCK_BG[block],
                border: block === "air" ? "1px solid rgba(100,180,220,0.08)" : "1px solid rgba(0,0,0,0.45)",
                boxShadow: block !== "air"
                  ? "inset 4px 4px 0 rgba(255,255,255,0.25), inset -4px -4px 0 rgba(0,0,0,0.28)"
                  : undefined,
              }}
            />
          ))
        )}
      </div>

      <div
        style={{
          width: "fit-content",
          margin: "1.5rem auto 0",
          display: "flex",
          gap: 8,
          padding: "8px 12px",
          background: "rgba(0,0,0,0.7)",
          border: "2px solid #444",
          borderRadius: 4,
        }}
      >
        {HOTBAR.map((block, i) => (
          <button
            key={block}
            onClick={() => setSelected(block)}
            title={`[${i + 1}] ${LABELS[block]}`}
            style={{
              width: 48,
              height: 48,
              background: BLOCK_BG[block],
              border: selected === block ? "2px solid #fff" : "2px solid #444",
              boxShadow: block !== "air"
                ? "inset 2px 2px 0 rgba(255,255,255,0.25), inset -2px -2px 0 rgba(0,0,0,0.3)"
                : "none",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <span style={{ position: "absolute", bottom: 2, right: 3, fontSize: 10, color: "#fff", textShadow: "1px 1px 0 #000", pointerEvents: "none" }}>
              {i + 1}
            </span>
          </button>
        ))}
      </div>

      <p style={{ textAlign: "center", color: "#ccc", fontSize: 13, marginTop: 10 }}>{LABELS[selected]}</p>
      <p style={{ textAlign: "center", color: "#555", fontSize: 11, marginTop: 4 }}>click or drag to place · 1–9 to select</p>
    </main>
  );
}
