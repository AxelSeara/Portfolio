import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <motion.div
        className="relative bg-quaternary text-accent border-t-4 border-l-4 border-white w-1/2 shadow-no-blur"
        drag
        dragConstraints={{ top: -200, left: -200, right: 200, bottom: 200 }}
      >
        <div className="flex justify-between items-center p-2 px-4 cursor-move">
          <h2 className="text-lg">{title}</h2>
          <button
            className="text-lg font-bold px-2 hover:bg-accent hover:text-white hover:shadow-none transition-colors duration-200"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="p-2">
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
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
