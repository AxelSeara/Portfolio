import React, { useState, useEffect } from 'react';
import './mondrianStyles.css';

const MondrianContent = () => {
  const [horizontalValue, setHorizontalValue] = useState(5);
  const [verticalValue, setVerticalValue] = useState(5);

  useEffect(() => {
    generateGrid(horizontalValue, verticalValue);
  }, [horizontalValue, verticalValue]);

  const generateGrid = (columnas, filas) => {
    const colores = ['#fac901', '#ffffff', '#225095', '#dd0100'];
    const container = document.querySelector('.grid-container');
    if (!container) {
      console.error('Grid container not found');
      return;
    }
    container.innerHTML = ''; // Limpia el contenedor antes de generar nueva cuadrícula
    container.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${filas}, 1fr)`; // Ajustado para controlar filas también

    let espaciosRestantes = columnas * filas;
    console.log('Generating grid with', columnas, 'columns and', filas, 'rows');

    while (espaciosRestantes > 0) {
      const cell = document.createElement('div');
      cell.className = 'grid-item';
      cell.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

      let spanCols = Math.ceil(Math.random() * Math.min(3, columnas));
      let spanRows = Math.ceil(Math.random() * Math.min(3, filas));

      let espacioUsado = spanCols * spanRows;
      if (espacioUsado > espaciosRestantes || espaciosRestantes - espacioUsado < columnas) {
        // Ajusta las celdas finales para evitar sobreextensión
        spanRows = 1;
        spanCols = 1;
      }

      cell.style.gridColumn = `span ${spanCols}`;
      cell.style.gridRow = `span ${spanRows}`;

      container.appendChild(cell);
      espaciosRestantes -= espacioUsado;
    }
  };

  return (
    <div className="p-2 md:p-4 bg-red-200 border-2 border-quaternary rounded h-full md:h-auto">
      <div className="flex flex-col md:flex-row p-2 md:p-4 bg-black text-white items-center justify-between">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 md:mr-4">
          <div className="flex items-center mb-4">
            <h3 className="text-lg">Vertical cells:</h3>
            <p className="ml-2" id="verticalValueDisplay">{verticalValue}</p>
          </div>
          <input
            type="range"
            min="2"
            max="8"
            value={verticalValue}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            id="verticalValue"
            onChange={(e) => setVerticalValue(parseInt(e.target.value))}
          />
        </div>

        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="flex items-center mb-4">
            <h3 className="text-lg">Horizontal cells:</h3>
            <p className="ml-2" id="horizontalValueDisplay">{horizontalValue}</p>
          </div>
          <input
            type="range"
            min="2"
            max="8"
            value={horizontalValue}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            id="horizontalValue"
            onChange={(e) => setHorizontalValue(parseInt(e.target.value))}
          />
        </div>

        <button
          id="generate"
          className="bg-primary hover:bg-secondary text-black font-bold py-2 px-4 mt-4 md:mt-0"
          onClick={() => generateGrid(horizontalValue, verticalValue)}
        >
          Generate
        </button>
      </div>
      <div className="grid-container mt-4 h-60 md:h-96 overflow-y-auto"></div>
    </div>
  );
};

export default MondrianContent;