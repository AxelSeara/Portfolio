import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Navbar = ({ name, links, onClickLink, activeLink }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

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

  const handleIconClick = () => {
    setIsSwitched(!isSwitched);
  };

  return (
    <div className="relative">
      <nav className="flex justify-between items-center p-1 px-2 bg-tertiary text-accent font-mono m-4 border-2 border-accent shadow-no-blur rounded-md ">
        <div className="relative flex items-center space-x-4">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="font-bold text-accent hover:bg-accent hover:text-white px-2 py-1 focus:outline-none"
          >
            {name}
          </button>
          {links && links.map((link, index) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`px-2 py-1 ${link === activeLink ? 'bg-accent text-white' : ''}`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => onClickLink(link)}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="group w-6 h-6 flex items-center justify-center hover:bg-accent hover:text-white" onClick={handleIconClick}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              id="Capa_2" 
              data-name="Capa 2" 
              viewBox="0 0 49 42.09"
              className="w-5 h-5 stroke-current text-accent group-hover:text-white fill-accent "
            >
              <g id="Capa_1-2" data-name="Capa 1">
                <path d="M49 10.29H0M49 31.03H0" className="stroke-current" strokeWidth="6"/>
                <motion.circle 
                  cx={isSwitched ? "10.96" : "37.94"} 
                  cy="11.06" 
                  r="8.06" 
                  className="stroke-current" 
                  strokeWidth="6"
                  initial={false}
                  animate={{ x: isSwitched ? 27 : -27 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.circle 
                  cx={isSwitched ? "37.94" : "10.96"} 
                  cy="31.13" 
                  r="7.96" 
                  className="stroke-current" 
                  strokeWidth="6"
                  initial={false}
                  animate={{ x: isSwitched ? -27 : 27 }}
                  transition={{ duration: 0.5 }}
                />
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
  onClickLink: PropTypes.func.isRequired,
  activeLink: PropTypes.string.isRequired,
};

export default Navbar;