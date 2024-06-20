import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownAdjust from '../DropdownAdjust/DropdownAdjust';

const Navbar = ({ name, links, onClickLink, activeLink, folders, onOpenModal, onRefreshFolders, switchBackground }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);

  const openContactModal = () => {
    const contactFolder = folders.find(folder => folder.name === "Contact");
    if (contactFolder) {
      onOpenModal(contactFolder.id);
    }
  };

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

  const handleMouseEnter = (menu) => {
    setActiveSubmenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  const submenuItems = {
    ABOUT: [
      "This project was created by Axel, a designer, developer, and UX/UI master. Using React, Tailwind CSS, and Framer Motion.",
    ],
    VERSION: ["Version 1.0 - July 2024"],
  };

  const handleFolderClick = (e) => {
    e.preventDefault();
    const folderName = e.currentTarget.getAttribute('data-name');
    const folder = folders.find(f => f.name === folderName);
    console.log("Clicked folder:", folder); 
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
        <DropdownAdjust
  buttonContent={
    <div className="group w-6 h-6 flex items-center justify-center hover:bg-accent hover:text-white" id="adjust">
      <svg xmlns="http://www.w3.org/2000/svg" id="Capa_2" data-name="Capa 2" viewBox="0 0 49 42.09" className="w-5 h-5 stroke-current text-accent group-hover:text-white fill-accent">
        <defs>
          <style>{'.cls-1{fill:none;stroke:#243b40;stroke-miterlimit:10;stroke-width:6px}'}</style>
        </defs>
        <g id="Capa_1-2" data-name="Capa 1">
          <path d="M30 10.29H4.92M44.46 31.03H18" className="cls-1 stroke-current group-hover:stroke-white"/>
          <circle cx="37.94" cy="11.06" r="8.06" className="cls-1 stroke-current group-hover:stroke-white"/>
          <circle cx="10.96" cy="31.13" r="7.96" className="cls-1 stroke-current group-hover:stroke-white"/>
        </g>
      </svg>
    </div>
  }
  onRefreshFolders={onRefreshFolders} //refresh icons
  switchBackground={switchBackground} // Pass the switchBackground function to DropdownAdjust
/>
          <div className="group w-6 h-6 flex items-center justify-center hover:bg-accent hover:text-white" onClick={openContactModal}>
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

export default Navbar;