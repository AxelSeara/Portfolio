import React, { useState, useEffect } from 'react';
import './mondrianStyles.css';

const MondrianContent = () => {
  const [horizontalValue, setHorizontalValue] = useState(5);
  const [verticalValue, setVerticalValue] = useState(5);
  const [view, setView] = useState('explanatory'); // 'explanatory', 'loading', 'content'

  useEffect(() => {
    if (view === 'content') {
      generateGrid(horizontalValue, verticalValue);
    }
  }, [view, horizontalValue, verticalValue]);

  const generateGrid = (columnas, filas) => {
    const colores = ['#fac901', '#ffffff', '#225095', '#dd0100'];
    const container = document.querySelector('.grid-container');
    if (!container) {
      console.error('Grid container not found');
      return;
    }
    container.innerHTML = ''; 
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
        spanRows = 1;
        spanCols = 1;
      }

      cell.style.gridColumn = `span ${spanCols}`;
      cell.style.gridRow = `span ${spanRows}`;

      container.appendChild(cell);
      espaciosRestantes -= espacioUsado;
    }
  };

  const handleLaunch = () => {
    setView('loading');
    setTimeout(() => {
      setView('content');
    }, 2000); // 2 seconds loading
  };



  if (view === 'explanatory') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-2 md:p-4 text-center min-w-xl min-h-xl">
        <h1 className="text-3xl font-bold text-accent mb-4">Welcome to Mondrian Creator</h1>
        <h2 className="text-xl font-semibold text-accent mb-4">A Flexbox-based Tool</h2>
        <p className="text-accent mb-6 max-w-xl">
          Here is a tool I developed, playing with CSS flexbox values and JavaScript, to create a Mondrian style art generator. Click below to launch and try it. You can adjust the columns and rows and trigger the generator as much as you want! Enjoy.
        </p>
        <button
          className="bg-primary hover:bg-secondary text-black font-bold py-2 px-4 border-2 border-accent rounded transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          onClick={handleLaunch}
        >
          Launch
        </button>
      </div>
    );
  }
  
  if (view === 'loading') {
    return (
      <div className="flex items-center justify-center h-full">
        <div role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accent" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="p-2 md:p-4 bg-white w-full h-full flex flex-col border-quaternary">
      <div className="flex flex-col md:flex-row p-2 md:p-4 bg-black text-white items-center justify-between flex-shrink-0">
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
            className="w-30 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-200"
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
            className="w-30 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-200"
            id="horizontalValue"
            onChange={(e) => setHorizontalValue(parseInt(e.target.value))}
          />
        </div>
  
        <button
          id="generate"
          className="bg-primary hover:bg-secondary text-black font-bold ml-4 m-3 py-2 px-4 mt-4"
          onClick={() => generateGrid(horizontalValue, verticalValue)}
        >
          Generate
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center w-full h-full">
  <div className="grid-container w-full h-full">
    {/* Celdas del grid aquí */}
  </div>
</div>
    </div>
  );
};

export default MondrianContent;