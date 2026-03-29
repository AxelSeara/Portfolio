import React, { useEffect, useRef, useState } from 'react';
import { getCopy } from './copy';

const colors = ['#111111', '#DD0100', '#225095', '#FAC901', '#75BEBE', '#FFFFFF'];

const PaintContent = () => {
  const t = getCopy();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);

  const [brushColor, setBrushColor] = useState('#111111');
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);

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
    const height = 320;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    context.scale(dpr, dpr);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
  };

  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, []);

  const getPointerPosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event) => {
    const context = getContext();
    if (!context) return;
    const { x, y } = getPointerPosition(event);
    isDrawingRef.current = true;
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (event) => {
    if (!isDrawingRef.current) return;
    const context = getContext();
    if (!context) return;
    const { x, y } = getPointerPosition(event);
    context.strokeStyle = isEraser ? '#ffffff' : brushColor;
    context.lineWidth = brushSize;
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = getContext();
    if (!context) return;
    isDrawingRef.current = false;
    context.closePath();
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
            className={`retro-btn ${isEraser ? 'active' : ''}`}
            onClick={() => setIsEraser((prev) => !prev)}
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

      <div className="retro-app-body grid gap-3 md:grid-cols-[220px_1fr]">
        <div className="retro-app-panel">
          <div className="mb-3 font-mono text-xs leading-relaxed text-accent/90">
            {t.content.paint.intro}
          </div>

          <div className="font-mono text-xs font-bold uppercase tracking-wide text-accent">
            {t.content.paint.brushColor}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`h-8 border-2 border-accent ${brushColor === color && !isEraser ? 'ring-2 ring-accent' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setBrushColor(color);
                  setIsEraser(false);
                }}
                aria-label={t.content.paint.colorAria.replace('{color}', color)}
              />
            ))}
          </div>

          <div className="mt-4 font-mono text-xs text-accent">
            {t.content.paint.brushSize}: <strong>{brushSize}px</strong>
          </div>
          <input
            type="range"
            min="1"
            max="24"
            value={brushSize}
            onChange={(event) => setBrushSize(parseInt(event.target.value, 10))}
            className="mt-2 w-full"
          />
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
