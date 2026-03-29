import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getCopy } from './copy';
import { trackEvent } from '../lib/metrics';

const RETRO_PALETTE = [
  '#0f0f0f',
  '#3a3a3a',
  '#7a7a7a',
  '#f5f2e8',
  '#9b2226',
  '#e76f51',
  '#f4a261',
  '#e9c46a',
  '#2a9d8f',
  '#75bebe',
  '#225095',
  '#264653',
  '#6a4c93',
  '#a44a3f',
  '#588157',
  '#ff6b6b',
];

const TOOLS = {
  PIXEL: 'pixel',
  SPRAY: 'spray',
  ERASER: 'eraser',
};

const PaintContent = () => {
  const t = getCopy();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);

  const [brushColor, setBrushColor] = useState('#0f0f0f');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState(TOOLS.PIXEL);

  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = Math.max(320, Math.floor(container.clientWidth));
    const height = 360;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
    context.imageSmoothingEnabled = false;
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
  };

  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, []);

  const pixelStep = useMemo(() => Math.max(2, brushSize * 2), [brushSize]);
  const activeColor = tool === TOOLS.ERASER ? '#ffffff' : brushColor;

  const snap = (value) => Math.floor(value / pixelStep) * pixelStep;

  const getPointerPosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: snap(event.clientX - rect.left),
      y: snap(event.clientY - rect.top),
    };
  };

  const drawPixelBlock = (context, x, y, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, pixelStep, pixelStep);
  };

  const drawLinePixelated = (context, from, to, color) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy)) / Math.max(1, pixelStep);

    if (steps <= 1) {
      drawPixelBlock(context, to.x, to.y, color);
      return;
    }

    for (let i = 0; i <= steps; i += 1) {
      const x = snap(from.x + (dx * i) / steps);
      const y = snap(from.y + (dy * i) / steps);
      drawPixelBlock(context, x, y, color);
    }
  };

  const sprayAt = (context, point, color) => {
    const density = 22;
    const radius = pixelStep * 2.8;

    for (let i = 0; i < density; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius;
      const x = snap(point.x + Math.cos(angle) * distance);
      const y = snap(point.y + Math.sin(angle) * distance);
      drawPixelBlock(context, x, y, color);
    }
  };

  const startDrawing = (event) => {
    const context = getContext();
    if (!context) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const { x, y } = getPointerPosition(event);
    isDrawingRef.current = true;
    lastPointRef.current = { x, y };

    if (tool === TOOLS.SPRAY) {
      sprayAt(context, { x, y }, activeColor);
      return;
    }

    drawPixelBlock(context, x, y, activeColor);
  };

  const draw = (event) => {
    if (!isDrawingRef.current) return;
    const context = getContext();
    if (!context) return;

    const point = getPointerPosition(event);

    if (tool === TOOLS.SPRAY) {
      sprayAt(context, point, activeColor);
      lastPointRef.current = point;
      return;
    }

    drawLinePixelated(context, lastPointRef.current || point, point, activeColor);
    lastPointRef.current = point;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = getContext();
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `paint-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    trackEvent('paint_export_png', { tool });
  };

  return (
    <div className="retro-app-shell mx-auto max-w-5xl">
      <div className="retro-app-header">
        <h2 className="retro-app-title">{t.content.paint.title}</h2>
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent/80">
          {t.content.paint.badge}
        </span>
      </div>

      <div className="retro-app-toolbar">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={`retro-btn ${tool === TOOLS.PIXEL ? 'active' : ''}`}
            onClick={() => setTool(TOOLS.PIXEL)}
          >
            {t.content.paint.actions.pixel}
          </button>
          <button
            type="button"
            className={`retro-btn ${tool === TOOLS.SPRAY ? 'active' : ''}`}
            onClick={() => setTool(TOOLS.SPRAY)}
          >
            {t.content.paint.actions.spray}
          </button>
          <button
            type="button"
            className={`retro-btn ${tool === TOOLS.ERASER ? 'active' : ''}`}
            onClick={() => setTool(TOOLS.ERASER)}
          >
            {t.content.paint.actions.eraser}
          </button>
          <button type="button" className="retro-btn" onClick={clearCanvas}>
            {t.content.paint.actions.clear}
          </button>
          <button type="button" className="retro-btn" onClick={saveImage}>
            {t.content.paint.actions.savePng}
          </button>
        </div>
      </div>

      <div className="retro-app-body grid gap-3 md:grid-cols-[260px_1fr]">
        <div className="retro-app-panel">
          <div className="mb-3 font-mono text-xs leading-relaxed text-accent/90">
            {t.content.paint.intro}
          </div>

          <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-accent">
            {t.content.paint.activeToolLabel}:{' '}
            <span className="text-accent/80">{t.content.paint.toolNames[tool]}</span>
          </div>

          <div className="mt-3 border-t-2 border-accent pt-3 font-mono text-xs font-bold uppercase tracking-wide text-accent">
            {t.content.paint.brushColor}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {RETRO_PALETTE.map((color) => (
              <button
                key={color}
                type="button"
                className={`h-7 border-2 border-accent ${
                  brushColor === color && tool !== TOOLS.ERASER ? 'ring-2 ring-accent' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setBrushColor(color);
                  if (tool === TOOLS.ERASER) setTool(TOOLS.PIXEL);
                }}
                aria-label={t.content.paint.colorAria.replace('{color}', color)}
              />
            ))}
          </div>

          <div className="mt-4 border-t-2 border-accent pt-3 font-mono text-xs text-accent">
            {t.content.paint.brushSize}: <strong>{pixelStep}px</strong>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            value={brushSize}
            onChange={(event) => setBrushSize(parseInt(event.target.value, 10))}
            className="mt-2 w-full"
          />

          <div className="retro-app-panel mt-3 bg-quaternary/60 p-2 font-mono text-[11px] leading-relaxed text-accent">
            {t.content.paint.tip}
          </div>
        </div>

        <div ref={containerRef} className="retro-app-panel bg-white p-2">
          <canvas
            ref={canvasRef}
            className="touch-none cursor-crosshair border-2 border-accent bg-white"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default PaintContent;
