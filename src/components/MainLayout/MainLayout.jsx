import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children, backgroundImage }) => {
  const resolvedBackground = backgroundImage.startsWith('/')
    ? `${process.env.PUBLIC_URL}${backgroundImage}`
    : backgroundImage;

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-accent">
      <AnimatePresence>
        <motion.div
          key={backgroundImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${resolvedBackground})`,
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
