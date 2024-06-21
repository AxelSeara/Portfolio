import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button/Button'; // Ensure this path is correct

const PaintContent = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
    setDrawing(false);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleColorSelect = (newColor) => {
    setColor(newColor);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <div className="flex justify-center space-x-2 mb-4">
        {['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000'].map((paintColor) => (
          <motion.button
            key={paintColor}
            whileHover={{ scale: 1.1 }}
            className={`w-8 h-8 rounded-sm ${color === paintColor ? 'ring-4 ring-accent' : 'ring-2 ring-transparent'}`}
            style={{ backgroundColor: paintColor }}
            onClick={() => handleColorSelect(paintColor)}
          />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        width={640}
        height={360}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
        className="canvas bg-white border border-gray-500 max-w-full"
      />
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center space-x-2">
          <label className="text-gray-700 font-medium">Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="w-32"
          />
          <div
            className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center"
            style={{ backgroundColor: color === '#000000' ? '#FFFFFF' : color }}
          >
            <div className="rounded-full bg-white" style={{ width: lineWidth, height: lineWidth, backgroundColor: color === '#000000' ? '#FFFFFF' : '#000000' }} />
          </div>
        </div>
        <Button text="Clear" onClick={clearCanvas} />
      </div>
    </div>
  );
};

export default PaintContent;