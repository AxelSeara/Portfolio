import React, { useEffect } from 'react';
import './mondrianStyles.css';

const MondrianApp = ({ horizontalValue, verticalValue }) => {
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
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
  
    let totalCells = columnas * filas;
    const maxCellSize = Math.ceil((columnas * filas) / (colores.length * 2));
  
    while (totalCells > 0) {
      const cell = document.createElement('div');
      cell.className = 'grid-item';
      cell.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
  
      let spanCols = Math.min(Math.ceil(Math.random() * 3), columnas);
      let spanRows = Math.min(Math.ceil(Math.random() * 3), filas);
  
      if (spanCols * spanRows > maxCellSize) {
        spanCols = Math.max(1, Math.floor(maxCellSize / spanRows));
        spanRows = Math.max(1, Math.floor(maxCellSize / spanCols));
      }
  
      totalCells -= spanCols * spanRows;
  
      cell.style.gridColumn = `span ${spanCols}`;
      cell.style.gridRow = `span ${spanRows}`;
  
      container.appendChild(cell);
    }
  };

  return (
    <div className="grid-container"></div>
  );
};

export default MondrianApp;