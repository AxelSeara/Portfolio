import React, { useState, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/** Función para crear un easing “retro” con saltos (step function) */
function createStepFunction(steps) {
  return (t) => {
    const stepSize = 1 / steps;
    return Math.floor(t / stepSize) * stepSize;
  };
}

/** Variants para la ventana */
const win95Variants = {
  hidden: {
    scale: 0.7,
    opacity: 0,
    x: -50,
    y: -50,
  },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.3,              // Duración de la entrada
      ease: createStepFunction(4),// 4 pasos al abrir
    },
  },
  exit: {
    scale: 0.7,
    opacity: 0,
    x: 50,
    y: 50,
    transition: {
      duration: 0.2,             // Duración de la salida
      ease: createStepFunction(3),// 3 pasos al cerrar
    },
  },
};

/** Variants para el contenido interno (fade con steps) */
const contentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: createStepFunction(3),
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: createStepFunction(3),
    },
  },
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children = null,
  zIndex = 50,
  onClick = () => {},
  useTerminalStyle = false,
}) => {
  const controls = useDragControls();
  const [isDraggable, setIsDraggable] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsDraggable(false);
      } else {
        setIsDraggable(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  const startDrag = (event) => {
    if (isDraggable) {
      controls.start(event);
    }
  };

  // Si se activa "useTerminalStyle", usamos fondo negro + texto verde
  const containerClasses = useTerminalStyle
    ? 'bg-black text-green-400'
    : 'bg-tertiary text-accent';

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center p-4 md:p-6"
      style={{ zIndex }}
      onClick={onClick}
    >
      <AnimatePresence>
        <motion.div
          className={`
            relative
            w-full h-full md:h-auto md:w-auto
            shadow-no-blur pointer-events-auto
            border-4 border-accent
            rounded-md flex flex-col
            ${containerClasses}
          `}
          drag={isDraggable}
          dragListener={false}
          dragControls={controls}
          dragConstraints={{ top: -20, left: -300, right: 300, bottom: 500 }}
          style={{
            padding: '0',
            margin: 'auto',
            maxWidth: '100%',
          }}
          // Ventana: animación de steps para abrir/cerrar
          variants={win95Variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Barra de título */}
          <div
            className={`
              flex justify-between items-center
              py-1 px-4 border-b-4 border-accent
              bg-gradient-to-r from-tertiary to-sky-200
              ${isDraggable ? 'cursor-move' : ''}
            `}
            onPointerDown={startDrag}
            style={{ touchAction: 'none' }}
          >
            <h2 className={`text-lg font-bold ${isDraggable ? 'cursor-move' : ''}`}>
              {title}
            </h2>
            <button
              className="
                border-accent text-lg font-bold px-2
                hover:bg-accent hover:text-white hover:shadow-none
                transition-colors duration-200
              "
              onClick={onClose}
            >
              X
            </button>
          </div>

          {/* Contenido (fade con steps) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 'calc(90vh - 48px)',
              overflowY: 'auto',
              paddingTop: '1rem',
              marginTop: '0.04rem',
              width: '100%',
            }}
            className="p-2 flex flex-grow items-center justify-center overflow-y-auto"
          >
            <AnimatePresence>
              <motion.div
                key={children?.key}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
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
  useTerminalStyle: PropTypes.bool,
};

export default Modal;