import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000); // Auto-close after 10 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 pointer-events-none flex items-end justify-center md:justify-end md:items-end md:p-6 p-4 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.8
          }}
          className="relative bg-tertiary text-accent w-full md:max-w-xs shadow-none pointer-events-auto rounded-lg"
        >
          <div className="flex justify-between items-center py-2 px-4 bg-gradient-to-r from-tertiary to-sky-200">
            <div className="text-sm font-normal">{message}</div>
            <button
              className="text-lg font-bold px-2 hover:bg-accent hover:text-white transition-colors duration-200 rounded-lg focus:ring-2 focus:ring-gray-300"
              onClick={onClose}
              aria-label="Close"
            >
              X
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Notification;