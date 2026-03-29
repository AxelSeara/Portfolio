import React, { useMemo, useState } from 'react';
import './mondrianStyles.css';
import { getCopy } from './copy';

const palette = ['#F5F5F0', '#F5F5F0', '#F5F5F0', '#DD0100', '#225095', '#FAC901'];

const createGrid = (columns, rows, seedValue) => {
  const seedOffset = seedValue % 7;
  const occupied = Array.from({ length: rows }, () => Array(columns).fill(false));
  const cells = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      if (occupied[row][col]) continue;

      const maxColSpan = Math.min(3, columns - col);
      const maxRowSpan = Math.min(3, rows - row);

      let colSpan = Math.floor(Math.random() * maxColSpan) + 1;
      let rowSpan = Math.floor(Math.random() * maxRowSpan) + 1;

      for (let r = row; r < row + rowSpan; r += 1) {
        for (let c = col; c < col + colSpan; c += 1) {
          if (occupied[r][c]) {
            rowSpan = 1;
            colSpan = 1;
          }
        }
      }

      for (let r = row; r < row + rowSpan; r += 1) {
        for (let c = col; c < col + colSpan; c += 1) {
          occupied[r][c] = true;
        }
      }

      cells.push({
        id: `${row}-${col}`,
        rowStart: row + 1,
        colStart: col + 1,
        rowSpan,
        colSpan,
        color: palette[(Math.floor(Math.random() * palette.length) + seedOffset) % palette.length],
      });
    }
  }

  return cells;
};

const MondrianContent = () => {
  const t = getCopy();
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(5);
  const [seed, setSeed] = useState(0);
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  const cells = useMemo(() => createGrid(columns, rows, seed), [columns, rows, seed]);

  return (
    <div className="retro-app-shell max-w-5xl">
      <div className="retro-app-header">
        <h2 className="retro-app-title">{t.content.mondrian.title}</h2>
        <div className="flex items-center gap-2">
          <button type="button" className="retro-btn" onClick={() => setSeed((prev) => prev + 1)}>
            {t.content.mondrian.actions.remix}
          </button>
          <button
            type="button"
            className="retro-btn"
            onClick={() => {
              setColumns(5);
              setRows(5);
              setSeed((prev) => prev + 1);
            }}
          >
            {t.content.mondrian.actions.reset}
          </button>
        </div>
      </div>

      <div className="retro-app-body grid gap-3 md:grid-cols-[280px_1fr]">
        {showInfoPanel && (
          <div className="retro-app-panel md:col-span-2">
            <div className="flex items-start justify-between gap-3 font-mono text-xs leading-relaxed text-accent">
              <p>{t.content.mondrian.info}</p>
              <button
                type="button"
                className="retro-btn shrink-0"
                onClick={() => setShowInfoPanel(false)}
              >
                {t.content.mondrian.actions.close}
              </button>
            </div>
          </div>
        )}

        <div className="retro-app-panel p-3">
          <div className="mb-4 border-b border-accent/30 pb-2 font-mono text-[11px] uppercase tracking-wide text-accent/80">
            {t.content.mondrian.controlsTitle}
          </div>
          <div className="space-y-5">
            <label className="block font-mono text-xs text-accent">
              {t.content.mondrian.columns}: <strong>{columns}</strong>
              <input
                type="range"
                min="3"
                max="9"
                value={columns}
                className="mondrian-range mt-2 w-full"
                onChange={(event) => setColumns(parseInt(event.target.value, 10))}
              />
            </label>

            <label className="block font-mono text-xs text-accent">
              {t.content.mondrian.rows}: <strong>{rows}</strong>
              <input
                type="range"
                min="3"
                max="9"
                value={rows}
                className="mondrian-range mt-2 w-full"
                onChange={(event) => setRows(parseInt(event.target.value, 10))}
              />
            </label>
            <div className="rounded border border-accent/30 bg-white/60 p-2 font-mono text-[11px] leading-relaxed text-accent/80">
              {t.content.mondrian.tip}
            </div>
          </div>
        </div>

        <div className="mondrian-stage retro-app-panel bg-white p-2 md:p-3">
          <div
            className="mondrian-board"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
          >
            {cells.map((cell) => (
              <div
                key={cell.id}
                className="mondrian-cell"
                style={{
                  gridColumn: `${cell.colStart} / span ${cell.colSpan}`,
                  gridRow: `${cell.rowStart} / span ${cell.rowSpan}`,
                  backgroundColor: cell.color,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MondrianContent;
