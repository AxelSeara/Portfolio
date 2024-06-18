import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import bg2Icon from './icons/bg2_icon.png';
import bg3Icon from './icons/bg3_icon.png';

const DropdownAdjust = ({ buttonContent, onRefreshFolders, switchBackground }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBgClick = (bgName) => {
    console.log("Changing background to:", bgName);
    switchBackground(bgName); // Use the passed switchBackground function
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {buttonContent}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-8 bg-tertiary shadow-lg w-44 py-2 text-accent z-20"
          >
            <ul>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-white" onClick={onRefreshFolders}>
                  Refresh Folders
                </a>
              </li>
              <li className="mt-4 px-4">
                <h3 className="font-bold mb-2">Background</h3>
                <div className="flex items-center justify-between">
                  <div className="text-center group">
                    <motion.img
                      src={bg2Icon}
                      alt="Classic"
                      className="w-10 h-10 border-2 hover:border-accent rounded"
                      whileTap={{ scale: 1.1 }}
                      onClick={() => handleBgClick('Classic')}
                    />
                    <p>Classic</p>
                  </div>
                  <div className="text-center group">
                    <motion.img
                      src={bg3Icon}
                      alt="Nighty"
                      className="w-10 h-10 border-2 hover:border-accent rounded"
                      whileTap={{ scale: 1.1 }}
                      onClick={() => handleBgClick('Nighty')}
                    />
                    <p>Nighty</p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

DropdownAdjust.propTypes = {
  buttonContent: PropTypes.node.isRequired,
  onRefreshFolders: PropTypes.func.isRequired,
  switchBackground: PropTypes.func.isRequired // Ensure this prop is required
};

export default DropdownAdjust;