import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import folderCloseIcon from '../../icons/folder_close.svg';
import folderOpenIcon from '../../icons/folder_open.svg';
import Modal from '../Modal/Modal';

const Folder = ({ initialOpen, className, style }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDoubleClick = () => {
    setIsOpen(!isOpen);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
          onDoubleClick={handleDoubleClick}
          onPointerDown={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Folder Name">
        <div className="border-4 border-accent p-4">
          <p>Folder content goes here...</p>
        </div>
      </Modal>
    </>
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
