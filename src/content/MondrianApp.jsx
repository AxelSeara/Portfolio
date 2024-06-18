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
    container.innerHTML = ''; // Clear the container before generating a new grid
    container.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${filas}, 1fr)`; // Adjusted to control rows as well

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
    <div className="grid-container"></div>
  );
};

export default MondrianApp;