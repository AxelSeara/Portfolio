import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ name, links }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const intervalId = setInterval(updateClock, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      <nav className="flex justify-between items-center p-1 px-6 bg-tertiary text-accent font-mono">
        <div className="relative flex items-center space-x-4">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="font-bold text-accent hover:bg-accent hover:text-white px-2 py-1 focus:outline-none"
          >
            {name}
          </button>
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:bg-accent hover:text-white px-2 py-1"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="group w-6 h-6 flex items-center justify-center hover:bg-accent hover:text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              id="Capa_2" 
              data-name="Capa 2" 
              viewBox="0 0 49 42.09"
              className="w-5 h-5 stroke-current text-accent group-hover:text-white fill-accent ">
              <g id="Capa_1-2" data-name="Capa 1">
                <path d="M30 10.29H4.92M44.46 31.03H18" className="stroke-current" strokeWidth="6"/>
                <circle cx="37.94" cy="11.06" r="8.06" className="stroke-current" strokeWidth="6"/>
                <circle cx="10.96" cy="31.13" r="7.96" className="stroke-current" strokeWidth="6"/>
              </g>
            </svg>
          </div>
          <div className="group w-6 h-6 flex items-center justify-center hover:bg-accent hover:text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              id="Capa_2" 
              data-name="Capa 2" 
              viewBox="0 0 45.43 34"
              className="w-5 h-5 stroke-current stroke-4 text-accent group-hover:text-white fill-none">
              <g id="Capa_1-2" data-name="Capa 1">
                <path d="M3 3h39.43v28H3zM17.95 17.53 3.53 27.61M41.49 27.57l-13.54-9.71" className="stroke-current" strokeWidth="4"/>
                <path d="m3.86 3.57 15.79 15.5a4.75 4.75 0 0 0 6.71 0l15.5-14.93" className="stroke-current" strokeWidth="4"/>
              </g>
            </svg>
          </div>
          <span>{currentTime}</span>
        </div>
      </nav>
      {dropdownOpen && (
        <div
          id="dropdown"
          className="absolute left-6 mt-2 z-10 bg-tertiary divide-y shadow w-44"
        >
          <ul className="py-2 text-sm text-accent" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-white">
                ABOUT
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-white">
                VERSION
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-white">
                ME
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-white">
                HOLA
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Navbar;
