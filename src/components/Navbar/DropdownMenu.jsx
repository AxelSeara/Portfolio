import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const DropdownMenu = ({ folders, onOpenModal }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (menu) => {
    setActiveSubmenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  const submenuItems = {
    ABOUT: ["Welcome to my portfolio. Here Axel former graphic designer jumping into the front end world. This page was entirely developed by me from assets to features and the small apps containing. Hope you to have a good time visiting it :D"],
    VERSION: ["We are still on 0.1 wishing to drop the bomb soon"]
  };

  return (
    <AnimatePresence>
      {activeSubmenu && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-full mt-0 bg-tertiary shadow-lg w-44 py-2 text-accent"
          ref={dropdownRef}
        >
          <ul>
            {submenuItems[activeSubmenu]?.map((item, index) => (
              <li key={index}>
                <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-white" onClick={(e) => e.preventDefault()}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;