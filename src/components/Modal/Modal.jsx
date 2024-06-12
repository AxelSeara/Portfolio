import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, zIndex, onClick }) => {
  const controls = useDragControls();
  const [isDraggable, setIsDraggable] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsDraggable(false); // Disable drag on small screens
      } else {
        setIsDraggable(true); // Enable drag on larger screens
      }
    };

    handleResize(); // Check screen size on mount
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  if (!isOpen) return null;

  const startDrag = (event) => {
    if (isDraggable) {
      controls.start(event);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex }} onClick={onClick}>
      <motion.div
        className="relative bg-tertiary text-accent w-full h-full md:w-1/2 md:h-auto shadow-no-blur pointer-events-auto border-4 border-accent rounded-md"
        style={{ maxHeight: '100vh md:90vh' }}  // fix for modal height on mobile
        drag={isDraggable}
        dragListener={false}
        dragControls={controls}
        dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
      >
        <div
          className={`flex justify-between items-center py-1 px-4 border-b-4 border-accent bg-gradient-to-r from-tertiary to-sky-200 ${isDraggable ? 'cursor-move' : ''}`}
          onPointerDown={startDrag}
          style={{ touchAction: 'none' }}
        >
          <h2 className={`text-lg font-bold ${isDraggable ? 'cursor-move' : ''}`}>
            {title}
          </h2>
          <button
            className="text-lg font-bold px-2 hover:bg-accent hover:text-white hover:shadow-none transition-colors duration-200"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="p-2 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 48px)' }}> 
          {children}
        </div>
      </motion.div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  zIndex: PropTypes.number,
  onClick: PropTypes.func,
};

Modal.defaultProps = {
  children: null,
  zIndex: 50,
  onClick: () => {},
};

export default Modal;