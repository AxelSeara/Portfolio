import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children, backgroundImage }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden relative bg-gray-800">
      <AnimatePresence>
        <motion.div
          key={backgroundImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }} // Adjust opacity level during exit to prevent full transparency
          transition={{ duration: 0.5, ease: "easeInOut" }} // Use easeInOut for a smoother transition
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default MainLayout;