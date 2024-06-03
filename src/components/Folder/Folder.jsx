import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import folderCloseIcon from '../../icons/folder_close.svg';
import folderOpenIcon from '../../icons/folder_open.svg';

const Folder = ({ initialOpen, className, style }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className={`flex items-center justify-center w-24 h-24 cursor-move p-2 ${className}`}
      style={style}
      drag
      dragMomentum={false}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={isOpen ? folderOpenIcon : folderCloseIcon}
        alt={isOpen ? "Folder Open" : "Folder Close"}
        className={isOpen ? "w-full h-full" : "w-[105%] h-[105%]"}
        onPointerDown={handlePointerDown}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

Folder.propTypes = {
  initialOpen: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

Folder.defaultProps = {
  initialOpen: false,
  className: '',
  style: {},
};

export default Folder;
