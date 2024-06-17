import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import folderCloseIcon from '../../icons/folder_close.svg';
import folderOpenIcon from '../../icons/folder_open.svg';
import documentIcon from '../../icons/document.svg';
import dailyBloomIcon from '../../icons/dailybloom.svg';
import weatherIcon from '../../icons/weather3.svg';
import contactIcon from '../../icons/letter_close.svg';
import mondrianIcon from '../../icons/mondrian.svg';
import aboutIcon from '../../icons/mypc.svg';
import Modal from '../Modal/Modal';

const iconMapping = {
  'CV': documentIcon,
  'DailyBloom': dailyBloomIcon,
  'Weather': weatherIcon,
  'Contact': contactIcon,
  'Mondrian Generator': mondrianIcon,
  'About': aboutIcon,
};

const Folder = ({
  initialOpen = false,
  className = '',
  style = {},
  name,
  content,
  disableDoubleClick = false,
  onOpen,
  onClose,
  onClick,
  zIndex,
  id,
  isOpen
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const touchTimeout = useRef(null);

  useEffect(() => {
    setIsModalOpen(isOpen);  // Control modal visibility directly from props
  }, [isOpen]);

  const handleDoubleClick = () => {
    if (!disableDoubleClick) {
      setIsModalOpen(true);
      onOpen(id); // This will update the state in App which should pass down new props
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose(name);
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

  const handleTouchStart = (e) => {
    touchTimeout.current = setTimeout(() => {
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      e.target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    }, 200);
  };

  const handleTouchEnd = (e) => {
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
      touchTimeout.current = null;
    }
    handleDoubleClick();
  };

  return (
    <div className="m-3">
      <motion.div
        className={` flex flex-col items-center justify-center w-24 p-2 ${className}`}
        style={{ ...style, cursor: 'move' }}
        drag
        dragMomentum={false}
        onDoubleClick={handleDoubleClick}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={() => setIsClicked(false)}
        whileTap={{ scale: 0.95 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.img
          src={iconMapping[name] || (isOpen ? folderOpenIcon : folderCloseIcon)}
          alt={name}
          className={isOpen ? "w-full h-full pointer-events-none" : "w-[105%] h-[105%] pointer-events-none"}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <span className={`mt-2 text-center w-full ${isClicked ? 'bg-accent text-white ' : 'text-accent'}`}>
          {name}
        </span>
      </motion.div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={name}
        zIndex={zIndex}
        onClick={() => onClick && onClick(name)} // Safeguarding the onClick call
      >
        {content}
      </Modal>
    </div>
  );
};

Folder.propTypes = {
  initialOpen: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  disableDoubleClick: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  zIndex: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Folder;