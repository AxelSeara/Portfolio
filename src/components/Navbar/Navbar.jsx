import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ name, links, onClickLink, activeLink, folders, onOpenModal }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleIconClick = () => {
    setIsSwitched(!isSwitched);
  };

  const handleMouseEnter = (menu) => {
    setActiveSubmenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  const submenuItems = {
    ABOUT: [
      "Welcome to my portfolio. Here Axel former graphic designer jumping into the front end world. This page was entirely developed by me from assets to features and the small apps containing. Hope you to have a good time visiting it :D"
    ],
    VERSION: ["We are still on 0.1 wishing to drop the bomb soon"]
  };

  const handleFolderClick = (e) => {
    e.preventDefault();
    const folderName = e.currentTarget.getAttribute('data-name');
    const folder = folders.find(f => f.name === folderName);
    console.log("Clicked folder:", folder);  // This should log the correct folder object
    if (folder) {
      onOpenModal(folder.id);
    }
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <nav className="flex justify-between items-center p-1 px-2 bg-tertiary text-accent font-mono m-4 border-2 border-accent shadow-no-blur rounded-md">
        <div className="relative flex items-center space-x-4">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="font-bold text-accent hover:bg-accent hover:text-white px-2 py-1 focus:outline-none"
          >
            {name}
          </button>
          {links && links.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`px-2 py-1 ${link === activeLink ? 'bg-accent text-white' : ''}`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.preventDefault();
                onClickLink(link);
              }}
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
          ref={dropdownRef}
        >
          <ul className="py-2 text-sm text-accent" aria-labelledby="dropdownDefaultButton">
            {['ABOUT', 'VERSION', 'FILES'].map((menu) => (
              <li
                key={menu}
                onMouseEnter={() => handleMouseEnter(menu)}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-white" onClick={(e) => e.preventDefault()}>
                  {menu}
                </a>
                <AnimatePresence>
                  {activeSubmenu === menu && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-full mt-0 bg-tertiary shadow-lg w-44 py-2 text-accent"
                    >
                      <ul>
                        {menu === 'FILES' ? (
                          folders.map((folder) => (
                            <li key={folder.id}>
                              <a
                                href="#"
                                data-name={folder.name}
                                className="block px-4 py-2 hover:bg-accent hover:text-white"
                                onClick={handleFolderClick}
                              >
                                {folder.name}
                              </a>
                            </li>
                          ))
                        ) : (
                          submenuItems[menu]?.map((submenuItem) => (
                            <li key={submenuItem}>
                              <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-white" onClick={(e) => e.preventDefault()}>
                                {submenuItem}
                              </a>
                            </li>
                          ))
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
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
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Navbar;