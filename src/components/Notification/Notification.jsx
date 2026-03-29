import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mypcIcon from '../../icons/mypc.svg';
import { getCopy } from '../../content/copy';

const Notification = ({ message, onClose }) => {
  const t = getCopy();
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-3 right-3 z-50 p-2 pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.55 }}
          className="relative w-[88vw] border-2 border-accent bg-tertiary text-accent shadow-no-blur pointer-events-auto md:w-[360px]"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-tertiary to-secondary/70 px-3 py-2">
            <div className="flex items-center font-mono text-xs md:text-sm">
              <img src={mypcIcon} alt={t.notification.iconAlt} className="mr-3 h-9 w-9" />
              {message}
            </div>
            <button
              className="border-2 border-accent px-2 py-0.5 font-mono text-xs font-bold hover:bg-accent hover:text-white"
              onClick={onClose}
              aria-label={t.notification.close}
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
