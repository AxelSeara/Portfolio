import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import folderCloseIcon from '../../icons/folder_close.svg';
import folderOpenIcon from '../../icons/folder_open.svg';
import Modal from '../Modal/Modal';

const Folder = ({ initialOpen, className, style, name }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleDoubleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDoubleClick();
    }
  };

  const handlePointerDown = () => {
    setIsClicked(true);
  };

  return (
    <>
      <motion.div
        className={`flex flex-col items-center justify-center w-24 p-2 ${className}`}
        style={style}
        drag
        dragMomentum={false}
        onDoubleClick={handleDoubleClick}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={() => setIsClicked(false)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img
          src={isOpen ? folderOpenIcon : folderCloseIcon}
          alt={isOpen ? "Folder Open" : "Folder Close"}
          className={isOpen ? "w-full h-full pointer-events-none" : "w-[105%] h-[105%] pointer-events-none"}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          style={{ cursor: 'move' }}
        />
        <span className={`mt-2 text-center w-full ${isClicked ? 'bg-accent text-white ' : 'text-accent'}`}>
          {name}
        </span>
      </motion.div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={name}>
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
  name: PropTypes.string.isRequired,
};

Folder.defaultProps = {
  initialOpen: false,
  className: '',
  style: {},
};

export default Folder;
