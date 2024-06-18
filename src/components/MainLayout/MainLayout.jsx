import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children, backgroundImage }) => {
  return (
    <div
      className="h-screen flex flex-col overflow-hidden bg-no-repeat bg-cover bg-center transition-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        transition: 'background-image 0.5s ease-in-out' // Add this line for the transition
      }}
    >
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default MainLayout;