import React, { useState, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/** Animación estilo Windows 95 con steps */
function createStepFunction(steps) {
  return (t) => {
    const stepSize = 1 / steps;
    return Math.floor(t / stepSize) * stepSize;
  };
}

const win95Variants = {
  hidden: { scale: 0.7, opacity: 0, x: -50, y: -50 },
  visible: { 
    scale: 1, opacity: 1, x: 0, y: 0,
    transition: { duration: 0.3, ease: createStepFunction(4) },
  },
  exit: { 
    scale: 0.7, opacity: 0, x: 50, y: 50,
    transition: { duration: 0.25, ease: createStepFunction(3) },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: createStepFunction(3) }},
  exit: { opacity: 0, transition: { duration: 0.2, ease: createStepFunction(3) }},
};

const Modal = ({ isOpen, onClose, title, children, zIndex = 50, useTerminalStyle = false }) => {
  const controls = useDragControls();
  const [isDraggable, setIsDraggable] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDraggable(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrag = (event) => {
    if (isDraggable) {
      controls.start(event);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center p-4 md:p-6" style={{ zIndex }}>
          <motion.div
            key={isOpen} // 🔹 Esto asegura que AnimatePresence detecte cambios
            className={`relative w-full h-full md:h-auto md:w-auto shadow-no-blur pointer-events-auto border-4 border-accent rounded-md flex flex-col 
              ${useTerminalStyle ? 'bg-black text-green-400' : 'bg-tertiary text-accent'}`}
            drag={isDraggable}
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ top: -20, left: -300, right: 300, bottom: 500 }}
            variants={win95Variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center py-1 px-4 border-b-4 border-accent bg-gradient-to-r from-tertiary to-sky-200"
              onPointerDown={startDrag} style={{ touchAction: 'none' }}>
              <h2 className="text-lg font-bold">{title}</h2>
              <button className="border-accent text-lg font-bold px-2 hover:bg-accent hover:text-white"
                onClick={onClose}>X</button>
            </div>

            <div className="p-2 flex flex-grow items-center justify-center overflow-y-auto" style={{ maxHeight: 'calc(90vh - 48px)' }}>
              <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                {children}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  zIndex: PropTypes.number,
  useTerminalStyle: PropTypes.bool,
};

export default Modal;