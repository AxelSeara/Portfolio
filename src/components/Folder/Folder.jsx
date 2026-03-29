import React, { useState, useRef } from 'react';
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
import paintIcon from '../../icons/image.svg';
import Modal from '../Modal/Modal';
const iconMapping = {
  1: aboutIcon,
  2: dailyBloomIcon,
  6: documentIcon,
  7: contactIcon,
  8: paintIcon,
  9: mondrianIcon,
  10: weatherIcon,
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
  onMinimize,
  onToggleMaximize,
  onContextMenu,
  onClick,
  zIndex,
  id,
  isOpen,
  isMinimized,
  isMaximized,
  isActive = false,
  dragConstraints,
  isMobile = false,
  openOnSingleClick = false,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const touchTimeout = useRef(null);

  const handleDoubleClick = () => {
    if (!disableDoubleClick) {
      onOpen(id); // This will update the state in App which should pass down new props
    }
  };

  const closeModal = () => {
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
    setIsDragging(false);
  };

  const handlePointerUp = () => {
    setIsClicked(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsClicked(false);
  };

  const handleTouchStart = (e) => {
    if (isMobile) return;
    touchTimeout.current = setTimeout(() => {
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      e.target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      setIsDragging(true);
    }, 1200);
  };

  const handleTouchEnd = (e) => {
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
      touchTimeout.current = null;
    }
    if (!isDragging) {
      handleDoubleClick();
    }
    setIsDragging(false);
  };

  return (
    <div className="m-1 sm:m-2">
      <motion.div
        className={`flex flex-col items-center justify-center w-20 p-2 sm:w-20 sm:p-2 md:w-24 ${className}`}
        style={{ ...style, cursor: isMobile ? 'pointer' : 'grab' }}
        drag={!isMobile}
        dragConstraints={dragConstraints}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDoubleClick={handleDoubleClick}
        onClick={() => {
          if (openOnSingleClick) {
            handleDoubleClick();
          }
        }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onContextMenu={(event) => onContextMenu(name, event)}
        whileTap={{ scale: 0.95 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.img
          src={iconMapping[id] || (isOpen ? folderOpenIcon : folderCloseIcon)}
          alt={name}
          className={`retro-folder-icon ${
            isOpen ? 'w-full h-full pointer-events-none' : 'w-[105%] h-[105%] pointer-events-none'
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <span
          className={`retro-folder-label mt-1 w-full max-w-full border px-1 py-[3px] text-center text-[11px] leading-tight break-words sm:mt-2 sm:text-sm ${
            isClicked || isActive
              ? 'border-accent bg-accent text-white font-semibold'
              : 'border-white/60 bg-black/45 text-white font-semibold text-shadow-sm'
          }`}
          style={{ minHeight: '2.4em' }}
        >
          {name}
        </span>
      </motion.div>
      <Modal
        isOpen={isOpen}
        isMinimized={isMinimized}
        isMaximized={isMaximized}
        isMobile={isMobile}
        isActive={isActive}
        onClose={closeModal}
        onMinimize={() => onMinimize(name)}
        onToggleMaximize={() => onToggleMaximize(name)}
        title={name}
        zIndex={zIndex}
        onFocus={() => onClick && onClick(name)}
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
  content: PropTypes.node,
  disableDoubleClick: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onMinimize: PropTypes.func.isRequired,
  onToggleMaximize: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  zIndex: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isMinimized: PropTypes.bool.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  isActive: PropTypes.bool,
  dragConstraints: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  openOnSingleClick: PropTypes.bool,
};

export default Folder;
