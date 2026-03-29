import React, { useState, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { getCopy } from '../../content/copy';

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
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.3, ease: createStepFunction(4) },
  },
  exit: {
    scale: 0.7,
    opacity: 0,
    x: 50,
    y: 50,
    transition: { duration: 0.25, ease: createStepFunction(3) },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: createStepFunction(3) },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: createStepFunction(3) },
  },
};

const Modal = ({
  isOpen,
  isMinimized = false,
  isMaximized = false,
  isMobile = false,
  isActive = false,
  onClose,
  onMinimize,
  onToggleMaximize,
  title,
  children,
  zIndex = 50,
  useTerminalStyle = false,
  onFocus,
}) => {
  const t = getCopy();
  const controls = useDragControls();
  const [isDraggable, setIsDraggable] = useState(true);
  const [dragBounds, setDragBounds] = useState({
    top: -20,
    left: -220,
    right: 220,
    bottom: 220,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDraggable(window.innerWidth > 768);
      const widthPad = Math.max(160, Math.floor(window.innerWidth * 0.28));
      const heightPad = Math.max(120, Math.floor(window.innerHeight * 0.22));
      setDragBounds({
        top: -heightPad,
        left: -widthPad,
        right: widthPad,
        bottom: heightPad,
      });
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
      {isOpen && !isMinimized && (
        <div
          className={`fixed inset-0 pointer-events-none flex ${
            isMobile || isMaximized
              ? 'items-stretch justify-stretch p-0'
              : 'items-center justify-center p-4 md:p-6'
          }`}
          style={{ zIndex }}
        >
          <motion.div
            className={`relative pointer-events-auto border-2 border-accent flex flex-col shadow-[2px_2px_0_0_var(--retro-border)] ${
              isMobile || isMaximized
                ? 'h-full w-full rounded-none'
                : 'h-full w-full rounded-md md:h-auto md:w-auto'
            } 
              ${useTerminalStyle ? 'bg-black text-green-400' : 'bg-tertiary text-accent'}
              ${isActive ? 'ring-2 ring-accent' : 'saturate-[0.88] contrast-[0.92]'}`}
            onPointerDown={onFocus}
            drag={isDraggable && !isMaximized && !isMobile}
            dragListener={false}
            dragControls={controls}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={dragBounds}
            variants={win95Variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="flex justify-between items-center py-1 px-2 border-b-2 border-accent bg-gradient-to-r from-tertiary to-secondary/70"
              onPointerDown={startDrag}
              style={{ touchAction: 'none' }}
            >
              <h2 className="px-1 font-mono text-sm font-bold uppercase tracking-wide md:text-base">
                {title}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className={`border border-accent font-mono font-bold leading-none hover:bg-accent hover:text-white ${
                    isMobile ? 'h-10 min-w-10 px-2 text-base' : 'h-7 min-w-7 px-2 text-sm'
                  }`}
                  onClick={onMinimize}
                  aria-label={t.modal.controls.minimize.replace('{title}', title)}
                >
                  _
                </button>
                <button
                  type="button"
                  className={`border border-accent font-mono font-bold leading-none hover:bg-accent hover:text-white ${
                    isMobile ? 'h-10 min-w-10 px-2 text-base' : 'h-7 min-w-7 px-2 text-sm'
                  }`}
                  onClick={onToggleMaximize}
                  aria-label={
                    isMaximized
                      ? t.modal.controls.restore.replace('{title}', title)
                      : t.modal.controls.maximize.replace('{title}', title)
                  }
                >
                  {isMaximized ? '❐' : '□'}
                </button>
                <button
                  type="button"
                  className={`border border-accent font-mono font-bold leading-none hover:bg-accent hover:text-white ${
                    isMobile ? 'h-10 min-w-10 px-2 text-base' : 'h-7 min-w-7 px-2 text-sm'
                  }`}
                  onClick={onClose}
                  aria-label={t.modal.controls.close.replace('{title}', title)}
                >
                  X
                </button>
              </div>
            </div>

            <div
              className="modal-content p-2 flex flex-grow items-center justify-center overflow-y-auto"
              style={{
                maxHeight: isMobile || isMaximized ? 'calc(100vh - 72px)' : 'calc(90vh - 72px)',
              }}
            >
              <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                {children}
              </motion.div>
            </div>
            <div className="border-t border-accent bg-quaternary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
              {isMobile ? t.modal.status.phoneMode : t.modal.status.desktopMode} ·{' '}
              {isActive ? t.modal.status.active : t.modal.status.background}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isMinimized: PropTypes.bool,
  isMaximized: PropTypes.bool,
  isMobile: PropTypes.bool,
  isActive: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onMinimize: PropTypes.func,
  onToggleMaximize: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  zIndex: PropTypes.number,
  useTerminalStyle: PropTypes.bool,
  onFocus: PropTypes.func,
};

export default Modal;
