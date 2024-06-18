import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownAdjust = ({ buttonContent, onRefreshFolders }) => {
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
              {/* Add more items as needed */}
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
};

export default DropdownAdjust;