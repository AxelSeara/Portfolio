import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <motion.div
        className="relative bg-quaternary text-accent w-1/2 shadow-lg" 
        drag
        dragConstraints={{ top: -200, left: -200, right: 200, bottom: 200 }}
      >
        <div className="flex justify-between items-center p-1 px-4  border-b-4 border-accent cursor-move">
          <h2 className="text-lg">{title}</h2>
          <button className="text-lg font-bold" onClick={onClose}>X</button>
        </div>
        <div className="p-2 border">
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
