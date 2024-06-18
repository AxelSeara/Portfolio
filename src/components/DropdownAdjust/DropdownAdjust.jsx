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
              <li 
                className="flex items-center px-4 py-2 hover:bg-accent hover:text-white transition-colors duration-200 group"
                onClick={onRefreshFolders}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-4 w-8 h-8 text-accent group-hover:text-white"
                >
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4a8 8 0 0 0 0 16c4.41 0 8-3.59 8-8h-2c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6c1.66 0 3.14.69 4.24 1.76L13 11h7V4l-2.35 2.35z"/>
                </svg>
                <span className="flex-grow">Refresh Folders</span>
              </li>
              <li className="mt-4 px-4">
                <h3 className="font-bold mb-2">Backgrounds</h3>
                <div className="flex items-center justify-between">

                  <div className="text-center group">
                    <motion.img
                      src={bg3Icon}
                      alt="Nighty"
                      className="w-12 h-12 border-2 hover:border-accent rounded"
                      whileTap={{ scale: 1.1, border: '2px solid #000' }}
                      onClick={() => handleBgClick('Nighty')}
                      initial={{ borderColor: '#fff' }}
                      whileHover={{ borderColor: '#000' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                    <p className="mt-2 text-sm">Classic</p>
                  </div>
                  <div className="text-center group">
                    <motion.img
                      src={bg2Icon}
                      alt="Classic"
                      className="w-12 h-12 border-2 hover:border-accent rounded"
                      whileTap={{ scale: 1.1, border: '2px solid #000' }}
                      onClick={() => handleBgClick('Classic')}
                      initial={{ borderColor: '#fff' }}
                      whileHover={{ borderColor: '#000' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                    <p className="mt-2 text-sm">Nighty</p>
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