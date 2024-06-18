import React, { useState, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, zIndex, onClick }) => {
  const controls = useDragControls();
  const [isDraggable, setIsDraggable] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsDraggable(false); // Disable drag on small screens (phones and tablets)
      } else {
        setIsDraggable(true); // Enable drag on larger screens
      }
    };

    // Check screen size on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isOpen) return null;

  const startDrag = (event) => {
    if (isDraggable) {
      controls.start(event);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center p-4 md:p-6" style={{ zIndex }} onClick={onClick}>
      <motion.div
        className="relative bg-tertiary text-accent w-full h-full md:h-auto md:w-1/2 shadow-no-blur pointer-events-auto border-4 border-accent rounded-md flex flex-col"
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
            className="border-accent text-lg font-bold px-2 hover:bg-accent hover:text-white hover:shadow-none transition-colors duration-200"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div
          style={{
            maxHeight: 'calc(90vh - 48px)',
            overflowY: 'auto',
            paddingTop: '1rem',
            marginTop: '0.04rem',
          }}
          className="p-2 flex flex-grow items-center justify-center overflow-y-auto"
        >
          <AnimatePresence>
            <motion.div
              key={children.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
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