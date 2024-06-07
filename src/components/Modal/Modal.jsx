import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, zIndex }) => {
  const controls = useDragControls();

  if (!isOpen) return null;

  const startDrag = (event) => {
    controls.start(event);
  };

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex }}>
      <motion.div
        className="relative bg-red-200 text-accent w-full h-full md:w-1/2 md:h-auto shadow-no-blur pointer-events-auto border-t-4 border-l-4 border-white"
        drag
        dragListener={false}
        dragControls={controls}
        dragConstraints={{ top: -200, left: -200, right: 200, bottom: 200 }}
      >
        <div
          className="flex justify-between items-center p-2 px-4 cursor-move"
          onPointerDown={startDrag}
          style={{ touchAction: 'none' }}
        >
          <h2 className="text-lg font-bold cursor-move">
            {title}
          </h2>
          <button
            className="text-lg font-bold px-2 hover:bg-accent hover:text-white hover:shadow-none transition-colors duration-200"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="p-2 overflow-y-auto">
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
};

Modal.defaultProps = {
  children: null,
  zIndex: 50,
};

export default Modal;