import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mypcIcon from '../../icons/mypc.svg';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 15000); // Auto-close after 15 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 pointer-events-none">
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
          className="relative rounded-md bg-tertiary text-accent w-full md:max-w-xs shadow-none pointer-events-auto"
        >
          <div className="flex justify-between items-center py-2 px-4 bg-gradient-to-r from-tertiary to-sky-200 rounded-md">
            <div className="flex items-center text-sm font-normal">
              <img src={mypcIcon} alt="PC Icon" className="mr-4 w-12 h-12" /> {/* Icon to the left */}
              Explore my portfolio! Drag icons, switch backgrounds, explore the content and enjoy the experience.
            </div>
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