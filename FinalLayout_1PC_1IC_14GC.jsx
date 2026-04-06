import React from "react";
import "./StageLayout.css";

export default function FinalLayout_1PC_1IC_14GC({ PC, IC, GC }) {
  // GC Distribution: 14 total modules
  const leftGC = GC.slice(0, 7);   // GC1–GC7
  const rightGC = GC.slice(7, 14); // GC8–GC14

  return (
    <div className="stage-background">
      {/* 2. TOP BANNER MODULE */}
      <div className="top-banner" />

      {/* 3. THE 3-COLUMN MODULAR GRID */}
      <div className="grid-layout">
        {/* Left column: GC1–GC7 (rows 1–7) */}
        {leftGC.map((gc, i) => (
          <div
            key={`left-gc-${i}`}
            className="tile"
            style={{ gridColumn: 1, gridRow: i + 1 }}
          >
            {gc}
          </div>
        ))}

        {/* Center column, row 1: IC MODULE */}
        <div
          className="tile ic-tile"
          style={{ gridColumn: 2, gridRow: 1 }}
        >
          {IC}
        </div>

        {/* Center column, rows 2–7: PC MODULE */}
        <div className="tile pc-tile">
          {PC}
        </div>

        {/* Right column: GC8–GC14 (rows 1–7) */}
        {rightGC.map((gc, i) => (
          <div
            key={`right-gc-${i}`}
            className="tile"
            style={{ gridColumn: 3, gridRow: i + 1 }}
          >
            {gc}
          </div>
        ))}
      </div>
    </div>
  );
}
