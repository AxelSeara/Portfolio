import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    
    <div className="min-h-screen  bg-quaternary">
        
        
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
